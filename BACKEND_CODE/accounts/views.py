from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import SignupSerializer,LoginSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
 

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
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]   
    def get(self,request):
        return Response({
            "email":request.user.email
        })

class HomeView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response({
            "message": "Welcome to Vibe",
            "email": request.user.email
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