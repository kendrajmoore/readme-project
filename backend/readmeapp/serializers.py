
from rest_framework import serializers 
from .models import Readme 

class ReadmeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Readme 
        fields = ['id', 'project_name', 'repo_name', 'description', 'tools']