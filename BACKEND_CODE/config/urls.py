
from django.contrib import admin
from django.urls import path,include
from django.http import JsonResponse

def home(request):
    return JsonResponse({
    "message": "Vibe Music Platform Backend is running",
    "status": "success"
    })
    

urlpatterns = [
    path('admin/', admin.site.urls),
    path("",home),
    path('api/',include('accounts.urls')),
    path('api/songs/',include('songs.urls')),
    path('api/library/',include("library.urls"))
]
