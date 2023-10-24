import requests
from django.http import JsonResponse
import json
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .models import App
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .serializers import AppSerializer

def get_app_icon(request):
    app_link = request.GET.get('url')

    if not app_link:
        return JsonResponse({'error': 'URL parameter missing'}, status=400)

    try:
        response = requests.get(app_link)
        response.raise_for_status()
        data = response.text

        # Parse the JSON response
        json_data = json.loads(data)

        # Check if 'icons' key exists in the JSON response
        if 'icons' in json_data:
            # Assuming you want the URL of the first icon
            icon_url =''
            if json_data['icons']:
                icon_url = json_data['icons'][0]['url']
            print(icon_url)
            return JsonResponse({'icon_url': icon_url})
        else:
            return JsonResponse({'error': 'No icons found in the response'})

    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': str(e)}, status=500)
from django.http import JsonResponse

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_app_view(request):
    if request.method == 'POST':
       
        serializer = AppSerializer(data=request.data)
    
        if not serializer.is_valid():
            print("Validation errors:", serializer.errors)

        if serializer.is_valid():
           
            serializer.save()
            return Response({'message': 'App added successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_apps(request):
    if request.method == 'GET':
        apps = App.objects.all()
        serializer = AppSerializer(apps, many=True)
        return Response(serializer.data)



from django.contrib.auth.models import User
from django.contrib.auth import login
from django.http import JsonResponse
from .serializers import UserRegistrationSerializer
from .models import UserProfile
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save() # Replace "username" with the user's actual username
            user.userprofile.role = "customer"  # or "admin" for an admin user
            user.userprofile.save()
            return Response({'message': 'User registered successfully'}, status=201)
        return Response(serializer.errors, status=400)

    return Response({'error': 'Invalid request method'}, status=400)

from django.contrib.auth import authenticate, login
from .serializers import UserLoginSerializer
from rest_framework_simplejwt.tokens import AccessToken

@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)

                # Access the user's role if available in the user's profile
                user_role = user.userprofile.role if hasattr(user, 'userprofile') else None
                token = AccessToken.for_user(user)
                token['name'] = user.username
                response_data = {
                    'username': username,
                    'role': user_role,
                    # Include user role in response data
                }
                return Response({'message': f'User {username} logged in successfully', 'data': response_data,'token':str(token)},
                                status=status.HTTP_200_OK)

            else:
                return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_app_by_id(request, app_id):
    try:
        print(app_id)
        app = App.objects.get(pk=app_id)
        serializer = AppSerializer(app)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except App.DoesNotExist:
        return Response({'error': 'App does not exist'}, status=status.HTTP_404_NOT_FOUND)
    


from .models import UploadedImage
from .serializers import UploadedImageSerializerMain

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    if request.method == 'POST':
        serializer = UploadedImageSerializerMain(data=request.data, context={'request': request})
        if not serializer.is_valid():
            print(serializer.errors)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)

from .models import UploadedImage
from django.contrib.auth.decorators import login_required

from django.db.models import Q

    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_task_completion(request, app_id):
    # Check if the user is authenticated
    if request.user.is_authenticated:
        # Get the current user from the request
        user = request.user

        try:
            # Check if an entry exists in the UploadImage model for the user and app
            upload_image = UploadedImage.objects.get(Q(user=user) & Q(app=app_id))

            # Task has been completed
            return Response({'completed': True}, status=status.HTTP_200_OK)
        except UploadedImage.DoesNotExist:
            # Task has not been completed
            return Response({'completed': False}, status=status.HTTP_200_OK)
    else:
        # User is not authenticated
        return Response({'error': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    






from .serializers import UserPointsSerializer
from django.db.models import Q

@api_view(['GET'])

def admin_view_images(request):
    
    # Filter UploadedImage objects where is_accepted is 'P' (Pending)
    pending_images = UploadedImage.objects.filter(is_accepted='P').select_related('user', 'app')
    
    # Serialize the data for pending images
    serializer = UploadedImageSerializer(pending_images, many=True)
    print(serializer)
    return Response(serializer.data, status=status.HTTP_200_OK)
    





from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status as st
from rest_framework.response import Response
from .models import UploadedImage, App
from .serializers import UploadedImageSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_image(request, image_id, status):
    try:
        # Get the uploaded image by ID
        uploaded_image = get_object_or_404(UploadedImage, id=image_id)
        
        if status == "accept":
            # Mark the image as accepted
            uploaded_image.is_accepted = UploadedImage.ACCEPTED
            uploaded_image.save()

            # Update the user's points based on the app
            app = uploaded_image.app
            user = uploaded_image.user
           
            user_profile = UserProfile.objects.get(user=user)
            user_profile.points += app.app_point
            user_profile.save()
            
        elif status == "reject":
            # Mark the image as rejected
            uploaded_image.is_accepted = UploadedImage.REJECTED
            uploaded_image.save()
            
        else:
            return Response({'error': 'Invalid status'}, status=st.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Image verification successful'}, status=st.HTTP_200_OK)
    except UploadedImage.DoesNotExist:
        return Response({'error': 'Image not found'}, status=st.HTTP_404_NOT_FOUND)
    


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .serializers import UserProfileSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_points(request):
    user = request.user  # The authenticated user
    try:
        # Retrieve the user's profile and fetch their points
        user_profile = user.userprofile  # Assuming you have a UserProfile model related to the User model
        user_points = user_profile.points

        # Serialize the points data
        serializer = UserProfileSerializer(user_profile)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)


from django.contrib.auth import logout as django_logout



from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserProfileSerializer
from .models import UserProfile
from .models import UploadedImage

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user  # The authenticated user
    try:
        # Retrieve the user's profile and fetch their points
        user_profile = user.userprofile  # Assuming you have a UserProfile model related to the User model
        user_points = user_profile.points

        # Count the number of tasks completed by the user
        num_completed_tasks = UploadedImage.objects.filter(user=user, is_accepted='A').count()

        # Serialize the user's information
        serializer = UserProfileSerializer(user_profile)
        data = serializer.data
        data['user_name'] = user.username
        data['user_points'] = user_points
        data['num_completed_tasks'] = num_completed_tasks
        
        return Response(data, status=status.HTTP_200_OK)
    except UserProfile.DoesNotExist:
        return Response({'error': 'User profile not found'}, status=status.HTTP_404_NOT_FOUND)
    

@api_view(['POST'])
def LogoutView(request):
    django_logout(request)
    return Response(status=status.HTTP_200_OK)