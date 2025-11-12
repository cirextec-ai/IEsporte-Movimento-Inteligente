
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json

# Importar o Facade
from .facade import IEsporteFacade

# Instância global do Facade
facade = IEsporteFacade()


def home(request):
    """
    View principal - agora usa o Facade para obter dados
    """
    context = facade.obter_contexto_pagina_inicial(request)
    return render(request, 'index.html', context)

def contato(request):
    return render(request, "contato.html")

def fale_conosco(request):
    return render(request, "fale_conosco.html")

def login_view(request):
   
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        redirect_response, erro = facade.processar_login(request, email, password)
        
        if redirect_response:
            return redirect_response
        else:
            context = facade.obter_contexto_pagina_inicial(request)
            context['error'] = erro
            return render(request, 'index.html', context)
    
    return render(request, 'index.html')


def signup_view(request):
    """View de cadastro - usa Facade para criação de usuário"""
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        aceite_termos = request.POST.get('aceite_termos')
        
        redirect_response, erro = facade.processar_cadastro(
            request, 
            email, 
            password, 
            bool(aceite_termos)
        )
        
        if redirect_response:
            return redirect_response
        else:
            context = facade.obter_contexto_pagina_inicial(request)
            context['error'] = erro
            return render(request, 'index.html', context)
    
    return render(request, 'index.html')


@csrf_exempt
@require_http_methods(["POST"])
def api_signin(request):
    """API de login (AJAX/JavaScript) - usa Facade"""
    try:
        # Ler dados do request
        if request.content_type == 'application/json':
            data = json.loads(request.body)
            email = data.get('email', '').strip()
            password = data.get('password', '').strip()
        else:
            email = request.POST.get('email', '').strip()
            password = request.POST.get('password', '').strip()
        
        sucesso, mensagem, user = facade.autenticacao.fazer_login(request, email, password)
        
        if sucesso:
            return JsonResponse({
                'success': True,
                'message': mensagem,
                'user': {
                    'email': user.email,
                    'username': user.username
                }
            }, status=200)
        else:
            return JsonResponse({
                'success': False,
                'message': mensagem
            }, status=401)
                
    except Exception as e:
        print(f"❌ ERRO na api_signin: {e}")
        import traceback
        traceback.print_exc()
        return JsonResponse({
            'success': False,
            'message': f'Erro no servidor: {str(e)}'
        }, status=500)


def logout_view(request):
    """View de logout - usa Facade"""
    facade.autenticacao.fazer_logout(request)
    return redirect('home')

def delete_account(request):
    """View de exclusão de conta - usa Facade"""
    if request.method == 'POST':
        sucesso, mensagem = facade.excluir_conta(request)
        
        if sucesso:
            # Adicionar mensagem de sucesso para ser exibida na home
            # (requer configuração de messages framework no Django)
            return redirect('home')
        else:
            # Adicionar mensagem de erro
            context = facade.obter_contexto_pagina_inicial(request)
            context['error'] = mensagem
            return render(request, 'index.html', context)
            
    return redirect('home')
