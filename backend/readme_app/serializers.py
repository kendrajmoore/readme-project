from rest_framework import serializers 
from .models import Readme 

class ReadmeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Readme 
        fields = ['project_name', 'repo_name', 'description', 'tools', 'reason', 'content', 'github_handle']