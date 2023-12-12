from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from .models import Readme
from user_app.models import User
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
            return Response(serializer.data)
        except Readme.DoesNotExist:
            return Response({'error': 'Readme not found'}, status=HTTP_404_NOT_FOUND)
        
class GetLatestReadme(APIView):
    def get(self, request):
        latest_readme = Readme.objects.all().order_by('-id').first()
        if latest_readme:
            serializer = ReadmeSerializer(latest_readme)
            return Response(serializer.data)
        else:
            return Response({'error': 'No READMEs found'}, status=HTTP_404_NOT_FOUND)
        
class Post_readme(APIView):
    def post(self, request):
        user = request.user
        project_name = request.data.get('projectName')
        repo_name = request.data.get('repoName')
        description = request.data.get('description')
        tools = request.data.get('tools')
        reason = request.data.get('reason')
        prompt = request.data.get('prompt')
        if not all([project_name, repo_name, description, tools, reason, prompt]):
            return Response(
                {"error": "All fields are required."},
                status=HTTP_400_BAD_REQUEST
            )
        client = OpenAI(api_key=env.get("OPENAI_API_KEY"))
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
        )
        readme_text = response.choices[0].message.content
        readme_instance = Readme.objects.create(
                project_name=project_name,
                repo_name=repo_name,
                description=description,
                tools=tools,
                reason=reason,
                content=readme_text,
                username=user
            )
        print(readme_text)
        return JsonResponse({'readme': readme_text}, status=HTTP_201_CREATED)
    
class UpdateReadme(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, readme_id):
        try:
            readme = Readme.objects.get(id=readme_id)
            serializer = ReadmeSerializer(readme)
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
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
        except Readme.DoesNotExist:
            return Response({"error": "Not Found"}, status=HTTP_404_NOT_FOUND)


class DeleteReadme(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, readme_id):
        try:
            readme = Readme.objects.get(id=readme_id)
            if request.user == readme.owner:
                readme.delete()
                return Response(status=HTTP_204_NO_CONTENT)
            else:
                return Response({"error": "Unauthorized"}, status=HTTP_401_UNAUTHORIZED)
        except Readme.DoesNotExist:
            return Response({"error": "Not Found"}, status=HTTP_404_NOT_FOUND)