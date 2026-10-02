from django.urls import path
from .views import SignupView,ProfileView,LoginView,HomeView

urlpatterns = [
    path("signup/",SignupView.as_view(),name="signup"),
    path("profile/",ProfileView.as_view(),name="profile"),
    path("login/",LoginView.as_view(),name="login"),
    path("home/",HomeView.as_view(),name="home"),
]
