from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import SignupSerializer,LoginSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User 
from django.shortcuts import get_object_or_404
from songs.models import Song
from songs.serializers import SongSerializer
from library.models import RecentlyPlayed


class SignupView(APIView):

    def post(self, request):

        serializer = SignupSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            refresh=RefreshToken.for_user(user)

            return Response(
                {
                    "message": "Account created successfully",
                    "email": user.email,
                    "access":str(refresh.access_token),
                    "refresh":str(refresh)
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class ProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        from .serializers import ProfileSerializer
        from library.models import (
            RecentlyPlayed,
            Playlist
        )
        from library.serializers import (
            RecentlyPlayedSerializer,
            PlaylistSerializer
        )
        recently_played = RecentlyPlayed.objects.filter(
            user=user
        ).order_by("-played_at")[:5]
        playlists = Playlist.objects.filter(
            user=user
        ).order_by("-created_at")[:5]
        profile_data = ProfileSerializer(
            user
        ).data
        return Response({
            "profile": profile_data,
            "recently_played": RecentlyPlayedSerializer(
                recently_played,
                many=True
            ).data,
            "playlists": PlaylistSerializer(
                playlists,
                many=True
            ).data
        })


class EditProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        user = request.user
        username = request.data.get(
            "username"
        )
        bio = request.data.get(
            "bio"
        )
        avatar_url = request.data.get(
            "avatar_url"
        )
        if username is not None:
            existing_user = User.objects.filter(
                username=username
            ).exclude(
                id=user.id
            ).first()
            if existing_user:
                return Response(
                    {
                        "error": "Username already exists"
                    },
                    status=400
                )
            user.username = username
        if bio is not None:
            user.bio = bio
        if avatar_url is not None:
            user.avatar_url = avatar_url
        user.save()
        from .serializers import ProfileSerializer
        return Response(
            ProfileSerializer(user).data,
            status=200
        )


class HomeView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # Greeting
        from datetime import datetime
        hour = datetime.now().hour
        if hour < 12:
            greeting = "Good morning"
        elif hour < 16:
            greeting = "Good afternoon"
        else:
            greeting = "Good evening"
        return Response({
            "message": greeting,
            "email": request.user.email,
        })
    

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "message": "Login successful",
                    "email": user.email,
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_200_OK
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )    


#Follow,Unfollow APIs
class FollowUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def post(self, request, user_id):
        from .models import UserFollow
        if request.user.id == user_id:
            return Response(
                {
                    "error": "You cannot follow yourself"
                },
                status=400
            )
        target_user = get_object_or_404(
            User,
            id=user_id
        )
        follow, created = UserFollow.objects.get_or_create(
            follower=request.user,
            following=target_user
        )
        if not created:
            return Response(
                {
                    "message": "Already following"
                }
            )
        return Response(
            {
                "message": "User followed"
            },
            status=201
        )

class UnfollowUserView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def delete(self, request, user_id):
        from .models import UserFollow
        deleted_count, _ = UserFollow.objects.filter(
            follower=request.user,
            following_id=user_id
        ).delete()
        if deleted_count == 0:
            return Response(
                {
                    "error": "Not following this user"
                },
                status=404
            )
        return Response(
            {
                "message": "User unfollowed"
            }
        )    

class FollowersView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        from .models import UserFollow
        follows = UserFollow.objects.filter(
            following=request.user
        ).select_related(
            "follower"
        )
        data = []
        for follow in follows:
            data.append({
                "id": follow.follower.id,
                "username": follow.follower.username,
                "bio": follow.follower.bio,
                "avatar_url": follow.follower.avatar_url
            })
        return Response(data)    

class FollowingView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        from .models import UserFollow
        follows = UserFollow.objects.filter(
            follower=request.user
        ).select_related(
            "following"
        )
        data = []
        for follow in follows:
            data.append({
                "id": follow.following.id,
                "username": follow.following.username,
                "bio": follow.following.bio,
                "avatar_url": follow.following.avatar_url
            })
        return Response(data)
    