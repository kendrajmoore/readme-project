from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from github import Github
import os
from .models import GitHubRepository
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND,
    HTTP_500_INTERNAL_SERVER_ERROR
)

class GetUserGitHubProfile(APIView):
    def get(self, request, username):
        token = os.getenv('GITHUB_TOKEN')
        if not token:
            return Response({'error': 'GitHub token not found'}, status=status.HTTP_403_FORBIDDEN)

        try:
            g = Github(token)
            user = g.get_user(username)
            profile = {
                'name': user.name,
                'bio': user.bio,
                'location': user.location,
                'public_repos': user.public_repos

            }
            return Response(profile)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)

class PushReadme(APIView):
    def post(self, request, repo_id):
        try:
            repo_obj = GitHubRepository.objects.get(id=repo_id)
            token = os.getenv('GITHUB_TOKEN')
            
            if not token:
                return Response({'error': 'GitHub token not found'}, status=HTTP_403_FORBIDDEN)

            g = Github(token)
            repo = g.get_repo(f"{repo_obj.owner}/{repo_obj.name}")

            try:
                readme_file = repo.get_contents("README.md")
                repo.update_file(readme_file.path, "Update README", repo_obj.readme_content, readme_file.sha)
            except Exception:
                repo.create_file("README.md", "Create README", repo_obj.readme_content)

            return Response({'message': 'Readme updated successfully'}, status=HTTP_200_OK)

        except GitHubRepository.DoesNotExist:
            return Response({'error': 'Repository not found'}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=HTTP_500_INTERNAL_SERVER_ERROR)


