from django.urls import path
from .views import Post_readme, GetAllReadmes,GetReadmeByID, GetLatestReadme, DeleteReadme

urlpatterns = [
     path('latest-readme/', GetLatestReadme.as_view(), name='get_latest_readme'),
    path('<str:username>/', GetAllReadmes.as_view(), name='get_readme'),
    path('<int:readme_id>/', GetReadmeByID.as_view(), name='get_one_readme'),
    path('', Post_readme.as_view(), name='post-readme'),
     path('delete/<int:readme_id>/', DeleteReadme.as_view(), name='delete-readme'),
]