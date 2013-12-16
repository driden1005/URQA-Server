# Create your views here.
# -*- coding: utf-8 -*-

from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.template import Context, loader
from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseRedirect

from urqa.models import AuthUser
from urqa.models import Viewer
from urqa.models import Projects
from urqa.models import Comments

import projectmanage.views


def registration(request):
    #print request

    username = request.POST['username']
    password = request.POST['password']
    email = username
    first_name = request.POST['usernickname']

    print username
    #print password
    print email
    print first_name


    if User.objects.filter(username__exact=username).exists():
        return HttpResponseRedirect('/urqa/')
        #return HttpResponse('%s already exists' % username)

    user = User.objects.create_user(username,email,password)
    user.first_name = first_name
    user.save()

    #default이미지 삽
    user = AuthUser.objects.get(username = username)
    user.image_path = './images/user_profiles/noimage.jpg'

    user.save()

    return HttpResponseRedirect('/urqa/')

def delete_req(request):

    print request.user
    try:
        user = AuthUser.objects.get(username = request.user)
    except ObjectDoesNotExist:
        return HttpResponse('%s not exists' % request.user)

    #Viewerr관계 지우기
    viewers = Viewer.objects.filter(uid=user)
    viewers.delete()

    #Comments 지우기
    comments = Comments.objects.filter(uid=user)
    comments.delete()

    #Project owner관계 지우기
    projects = Projects.objects.filter(owner_uid=user)
    for p in projects:
        projectmanage.views.delete_req(request,p.apikey)

    user = User.objects.get(username__exact=request.user)
    user.delete()

    return HttpResponse('delete success')

def login_req(request):
    #print request.user
    #print request
    username = request.POST['username']
    password = request.POST['password']

    print username
    print password

    user = authenticate(username=username, password=password)
    print user
    if user is not None:
        if user.is_active:
            login(request, user)
            return HttpResponseRedirect('/urqa/projects')
        else:
            return HttpResponse('disable account')
    else:
        return HttpResponseRedirect('/urqa')
    return HttpResponse('login')

def logout_req(request):
    print request.user
    if request.user.is_authenticated():
        logout(request)
    print 'logout'
    return HttpResponseRedirect('/urqa/')

