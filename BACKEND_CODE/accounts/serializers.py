from rest_framework import serializers
from .models import User

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['email']

class LoginSerializer(serializers.Serializer):
    email=serializers.EmailField()
    def validate(self,data):
        email=data["email"]
        try:
            user=User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("Account does not exist")
        data["user"]=user
        return data


class ProfileSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "bio",
            "avatar_url",
            "followers_count",
            "following_count",
        ]
        read_only_fields = [
            "id",
            "email",
            "followers_count",
            "following_count",
        ]
    def get_followers_count(self, obj):
        return obj.followers_users.count()
    def get_following_count(self, obj):
        return obj.following_users.count()    