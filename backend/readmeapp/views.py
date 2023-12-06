from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import openai
from django.conf import settings


openai.api_key = settings.OPENAI_API_KEY

class Get_readme(APIView):
    def get(self, request):
        prompt = request.query_params.get('prompt', '')
        response = openai.Completion.create(
            model="text-davinci-004",
            prompt=prompt,
            max_tokens=500
        )
        readme_text = response.choices[0].text.strip()
        return Response({'readme': readme_text})