from django.urls import path
from .views import SignupView,ProfileView,LoginView

urlpatterns = [
    path("signup/",SignupView.as_view(),name="signup"),
    path("profile/",ProfileView.as_view(),name="profile"),
    path("login/",LoginView.as_view(),name="login")
]
