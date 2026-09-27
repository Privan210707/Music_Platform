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

    