from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin
from django.db import models
from django.conf import settings


class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("Email is required")
        email = self.normalize_email(email)
        user = self.model(email=email)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None):
        user = self.create_user(
            email=email,
            password=password
        )
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        unique=True
    )
    username = models.CharField(
        max_length=100,
        unique=True,
        null=True,
        blank=True
    )
    bio = models.TextField(
        blank=True
    )
    avatar_url = models.URLField(
        blank=True
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    is_active = models.BooleanField(
        default=True
    )
    is_staff = models.BooleanField(
        default=False
    )
    objects = UserManager()
    USERNAME_FIELD = "email"
    def __str__(self):
        return self.email


class UserFollow(models.Model):
    follower = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="following_users"
    )
    following = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="followers_users"
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    class Meta:
        unique_together = (
            "follower",
            "following"
        )
    def __str__(self):
        return f"{self.follower.email} follows {self.following.email}"    