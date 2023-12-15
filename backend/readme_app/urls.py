from django.urls import path
from .views import Post_readme, GetAllReadmes,GetReadmeByID, GetLatestReadme, UpdateReadme, DeleteReadme

urlpatterns = [
     path('latest-readme/', GetLatestReadme.as_view(), name='get_latest_readme'),
    path('<str:username>/', GetAllReadmes.as_view(), name='get_readme'),
    path('get/<int:readme_id>/', GetReadmeByID.as_view(), name='get_readme_by_id'),
    path('', Post_readme.as_view(), name='post-readme'),
    path('update/<int:readme_id>/', UpdateReadme.as_view(), name='update-readme'),
    path('delete/<int:readme_id>/', DeleteReadme.as_view(), name='delete-readme'),
]