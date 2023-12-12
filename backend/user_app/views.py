from django.shortcuts import render
from rest_framework.authtoken.models import Token
from .serializers import User, UserSerializer
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_403_FORBIDDEN,
    HTTP_404_NOT_FOUND
)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate


class Sign_up(APIView):
    def post(self, request):
        try:
            data = request.data.copy()
            data["username"] = request.data["username"]
            data["email"] = request.data["email"]
            new_user = User.objects.create_user(**data)
            new_token = Token.objects.create(user=new_user)
            return Response(
                {"email": new_user.email, "token": new_token.key, "username": new_user.username},
                status=HTTP_201_CREATED,
            )
        except Exception as e:
            print(e)
            return Response("Something went Wrong", status=HTTP_400_BAD_REQUEST)


class Log_in(APIView):
    def post(self, request):
        try:
            email = request.data["email"]
            username = request.data["username"]
            password = request.data["password"]
            user = authenticate(username=username, password=password, email=email)
            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({"email": email, "useername": username, "token": token.key},status=HTTP_201_CREATED)
            return Response(
                "Something went wrong creating a token", status=HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
    
class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
        
class Info(UserPermissions):
    def get(self, request):
        user = UserSerializer(request.user)
        return Response(user.data)
    
    def put(self, request):
        user = UserSerializer(request.user, data=request.data, partial = True)
        if user.is_valid():
            user.save()
            return Response(user.data, status=HTTP_201_CREATED)
        return Response(user.errors, status=HTTP_400_BAD_REQUEST)
    

class Log_out(UserPermissions):
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)

class Update(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
class Delete(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request, username):
        try:
            if request.user.username == username or request.user.is_superuser:
                user = User.objects.get(username=username)
                user.delete()
                return Response({"message": "User deleted successfully"}, status=HTTP_200_OK)
            else:
                return Response({"error": "You do not have permission to delete this user"}, status=HTTP_403_FORBIDDEN)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=HTTP_400_BAD_REQUEST)