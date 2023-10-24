from django.db import models
from django.contrib.auth.models import User

class App(models.Model):
    app_name = models.CharField(max_length=255)
    app_link = models.URLField()
    app_category = models.CharField(max_length=50)
    sub_category = models.CharField(max_length=50)
    logo = models.CharField(max_length=1000)
    app_point = models.IntegerField()

    def __str__(self):
        return self.app_name

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=[("customer", "Customer"), ("admin", "Admin")], default="customer")
    points = models.PositiveIntegerField(default=0)


from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()

from django.contrib.auth.models import User  # Assuming you are using Django's built-in User model

class UploadedImage(models.Model):
    image = models.ImageField(upload_to='uploads/')
    app = models.ForeignKey(App, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    PENDING = 'P'
    ACCEPTED = 'A'
    REJECTED = 'R'
    
    ACCEPTANCE_CHOICES = [
        (PENDING, 'Pending'),
        (ACCEPTED, 'Accepted'),
        (REJECTED, 'Rejected'),
    ]
    
    is_accepted = models.CharField(max_length=1, choices=ACCEPTANCE_CHOICES, default=PENDING)


from django.db import models
from django.contrib.auth.models import User

class UserPoints(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - Points: {self.points}"

