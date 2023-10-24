from rest_framework import serializers
from .models import App

class AppSerializer(serializers.ModelSerializer):
    class Meta:
        model = App
        fields = '__all__'
from django.contrib.auth.models import User

class UserRegistrationSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
from django.contrib.auth.models import User

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

from .models import UploadedImage

class UploadedImageSerializerMain(serializers.ModelSerializer):
    
    class Meta:
        model = UploadedImage
        fields = ('image','app')
       
    def validate(self, data):
        # Manually set the user field before saving
        data['user'] = self.context['request'].user

        return data
class UploadedImageSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    class Meta:
        model = UploadedImage
        fields = ('id','image','app','user')
        depth = 1

from rest_framework import serializers
from .models import UserPoints

class UserPointsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPoints
        fields = ('id', 'user', 'points')
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('points',) 