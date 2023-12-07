from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from readme_proj.settings import env
from openai import OpenAI
from dotenv import dotenv_values


class Get_readme(APIView):
    def get(self, request):
        # prompt = request.query_params.get('prompt', '')
        prompt='create a detailed readme for a github repo of an open source project that uses django, react, and postgresql to help students pass civil service exam, called Service. The project was created by grad students for their capstone project. Include sections about the badges, project, table of contents, built with, prerequisites, installation, usage, contributing, license.'
        client = OpenAI(api_key=env.get("OPENAI_API_KEY"))
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
        )
        readme_text = response.choices[0].message.content
        print(readme_text)
        return JsonResponse({'readme': readme_text})
   