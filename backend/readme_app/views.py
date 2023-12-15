from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from .models import Readme
from user_app.models import User
from github_app.models import GitHubRepository
from readme_proj.settings import env
from openai import OpenAI
from dotenv import dotenv_values
from .serializers import ReadmeSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED,
    HTTP_404_NOT_FOUND
)
class GetAllReadmes(APIView):
    def get(self, request, username):
        try:
            readmes = Readme.objects.filter(username__username=username).order_by('-id')
            if readmes.exists():
                serializer = ReadmeSerializer(readmes, many=True)
                return Response(serializer.data)
            return Response({'error': 'No READMEs found for the user'}, status=HTTP_404_NOT_FOUND)
        except Readme.DoesNotExist:
            return Response({'error': 'Readme not found'}, status=HTTP_404_NOT_FOUND)
        
class GetReadmeByID(APIView):
    def get(self, request, readme_id):
        try:
            readme = Readme.objects.get(id=readme_id)
            serializer = ReadmeSerializer(readme)
            print(serializer)
            return Response(serializer.data, status=HTTP_200_OK)
        except Readme.DoesNotExist:
            print(serializer.data)
            return Response({'error': 'Readme not found'}, status=HTTP_404_NOT_FOUND)
        
class GetLatestReadme(APIView):
    def get(self, request):
        latest_readme = Readme.objects.all().order_by('-id').first()
        if latest_readme:
            serializer = ReadmeSerializer(latest_readme)
            print(serializer)
            return Response(serializer.data)
        else:
            return Response({'error': 'No READMEs found'}, status=HTTP_404_NOT_FOUND)
        
class Post_readme(APIView):
    def post(self, request):
        client = OpenAI(api_key=env.get("OPENAI_API_KEY"))
        user = request.user
        project_name = request.data.get('projectName')
        description = request.data.get('description')
        tools = request.data.get('tools')
        reason = request.data.get('reason')
        prompt = request.data.get('prompt')
        repo_name = request.data.get('repoName')
        image_response = client.images.generate(
            model="dall-e-3",
            prompt=f"Create a logo for {description} without written text",
            n=1,
            size="1024x1024",
            quality="standard",
        )
        first_image = image_response.data[0]
        image_url = first_image.url
        prompt = f"create a detailed readme for a github repo named {repo_name} for an open source project called {project_name}. The project uses the following tools: {tools}. It description: {description}. {reason}. Sections include badges, project title, about the project, built with, getting started, usage, roadmap, contributing, license, contact, and acknowledgments. For the badges make one for a MIT license using badgen.net. Language counts Badge should be display first. Undernearth the badges add the logo using similar code img src={image_url} alt=Logo width=80 height=80. For about the project include two paragraphs. For built with add badges for each tools used using img.shields.io. For getting started include any prerequisites installation. For roadmap include steps to make project open source and make the steps have checkboxes.For contributing include similar numbered steps fork the project, create your feature branch, git checkout -b , commit your changes, git commit -m, push to the branch, git push origin, open a pull request. For contact use github.com/{user}/{repo_name}/issuses. Acknowledgments thank open source community and github."
        print(prompt)
        if not all([project_name, description, tools, reason, repo_name]):
            return Response(
                {"error": "All fields are required."},
                status=HTTP_400_BAD_REQUEST
            )
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
        )
        print(response)
        readme_text = response.choices[0].message.content
        readme_instance = Readme.objects.create(
                project_name=project_name,
                repo_name=repo_name,
                description=description,
                tools=tools,
                reason=reason,
                content=readme_text,
                username=user,
                logo_url=image_url
        )
        github_repo = GitHubRepository(
            name=repo_name,
            owner=request.user
        )
        github_repo.save()
        return JsonResponse({'readme': readme_text}, status=HTTP_201_CREATED)
    
class UpdateReadme(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, readme_id):
        try:
            readme = Readme.objects.get(id=readme_id)
            serializer = ReadmeSerializer(readme)
            print(Response(serializer.data))
            return Response(serializer.data, status=HTTP_200_OK)
        except Readme.DoesNotExist:
            return Response({"error": "Not Found"}, status=HTTP_404_NOT_FOUND)

    def put(self, request, readme_id):
        try:
            readme = Readme.objects.get(id=readme_id)
            serializer = ReadmeSerializer(readme, data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=HTTP_200_OK)
            else:
                return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

        except Readme.DoesNotExist:
            return Response({"error": "Not Found"}, status=HTTP_404_NOT_FOUND)


class DeleteReadme(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, readme_id):
        try:
            readme = Readme.objects.get(id=readme_id)
            readme.delete()
            return Response(status=HTTP_204_NO_CONTENT)
        except Readme.DoesNotExist:
            return Response({"error": "Not Found"}, status=HTTP_404_NOT_FOUND)