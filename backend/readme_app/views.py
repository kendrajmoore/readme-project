from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from .models import Readme
from userapp.models import User
from readme_proj.settings import env
from openai import OpenAI
from dotenv import dotenv_values
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)


class Post_readme(APIView):
    def post(self, request):
        project_name = request.data.get('projectName')
        repo_name = request.data.get('repoName')
        description = request.data.get('description')
        tools = request.data.get('tools')
        reason = request.data.get('reason')
        prompt = request.data.get('prompt')
        github_handle = request.data.get('githubHandle')
        if not all([project_name, repo_name, description, tools, reason, prompt, github_handle]):
            return Response(
                {"error": "All fields are required."},
                status=HTTP_400_BAD_REQUEST
            )
        user, created = User.objects.get_or_create(
            github_handle=github_handle
        )
        client = OpenAI(api_key=env.get("OPENAI_API_KEY"))
        response = client.chat.completions.create(
            model="gpt-4",
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
                github_handle=user
            )
        print(readme_text)
        return JsonResponse({'readme': readme_text}, status=HTTP_201_CREATED)
