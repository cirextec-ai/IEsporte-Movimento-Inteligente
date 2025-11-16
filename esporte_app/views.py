from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from django.http import HttpRequest, HttpResponse, JsonResponse
from typing import List, Dict, Any

# Obter o modelo de usuário configurado
User = get_user_model()


def home(request):
    """Página inicial"""
    context = {
        'user_authenticated': request.user.is_authenticated,
        'user': request.user if request.user.is_authenticated else None
    }
    return render(request, 'index.html', context)
def trabalhe_conosco(request):
    return render(request, 'trabalhe_conosco.html')

def login_view(request):
    """View de login tradicional (formulário Django)"""
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        print(f"--- LOGIN VIEW ---")
        print(f"Email: {email}")
        
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            login(request, user)
            print(f"✅ Login bem-sucedido: {user.username}")
            return redirect('home')
        else:
            print(f"❌ Login falhou para: {email}")
            return render(request, 'index.html', {'error': 'Credenciais inválidas'})
    
    return render(request, 'index.html')

# Nova função para Contato
def contato(request):
    return render(request, 'contato.html', {}) # Você pode criar este arquivo depois

# Nova função para Fale Conosco
def fale_conosco(request):
    return render(request, 'fale_conosco.html', {}) # Você pode criar este arquivo depois


def signup(request):
    """View de cadastro"""
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        aceite_termos = request.POST.get('aceite_termos')
        
        print(f"--- SIGNUP VIEW ---")
        print(f"Email: {email}, Termos: {aceite_termos}")
        
        if not aceite_termos:
            print("❌ Termos não aceitos")
            return render(request, 'index.html', {'error': 'Você deve aceitar os termos de uso'})
        
        try:
            # Verificar se usuário já existe
            if User.objects.filter(username=email).exists():
                print(f"❌ Email já cadastrado: {email}")
                return render(request, 'index.html', {'error': 'Email já cadastrado'})
            
            # Criar novo usuário
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password
            )
            print(f"✅ Usuário criado: {user.username}")
            
            # Login automático após cadastro
            login(request, user)
            return redirect('home')
            
        except Exception as e:
            print(f"❌ Erro ao criar usuário: {e}")
            import traceback
            traceback.print_exc()
            return render(request, 'index.html', {'error': 'Erro ao criar conta. Tente novamente.'})
    
    return render(request, 'index.html')


@csrf_exempt
@require_http_methods(["POST"])
def api_signin(request):
    """API de login (AJAX/JavaScript)"""
    try:
        # Ler dados do request
        if request.content_type == 'application/json':
            data = json.loads(request.body)
            email = data.get('email', '').strip()
            password = data.get('password', '').strip()
        else:
            email = request.POST.get('email', '').strip()
            password = request.POST.get('password', '').strip()
        
        print(f"--- API SIGNIN ---")
        print(f"Email lido: {email}")
        print(f"Senha lida: {password}")
        
        # Validar campos
        if not email or not password:
            print("❌ Campos vazios")
            return JsonResponse({
                'success': False,
                'message': 'Email e senha são obrigatórios'
            }, status=400)
        
        # Autenticar
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            if user.is_active:
                login(request, user)
                print(f"✅ Login bem-sucedido: {user.username}")
                return JsonResponse({
                    'success': True,
                    'message': 'Login realizado com sucesso',
                    'user': {
                        'email': user.email,
                        'username': user.username
                    }
                }, status=200)
            else:
                print(f"❌ Usuário inativo: {email}")
                return JsonResponse({
                    'success': False,
                    'message': 'Conta desativada'
                }, status=401)
        else:
            # Debug: verificar se usuário existe
            user_exists = User.objects.filter(username=email).exists()
            
            if not user_exists:
                print(f"❌ Usuário não encontrado: {email}")
                return JsonResponse({
                    'success': False,
                    'message': 'Usuário não encontrado. Cadastre-se primeiro.'
                }, status=401)
            else:
                print(f"❌ Senha incorreta para: {email}")
                return JsonResponse({
                    'success': False,
                    'message': 'Senha incorreta'
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
    """View de logout"""
    logout(request)
    print("✅ Logout realizado")
    return redirect('home')

# Estrutura de dados mockada (simulando resultados de um banco de dados).
# Os nomes e tags são relevantes para a busca do usuário.
EXERCISES: List[Dict[str, Any]] = [
    {"nome": "Gato-Vaca", "categoria": "Aquecimento", "tags": ["coluna", "mobilidade", "yoga"]},
    {"nome": "Natação no Chão", "categoria": "Treinamento", "tags": ["core", "estabilidade", "postura"]},
    {"nome": "Prancha Lateral", "categoria": "Core", "tags": ["força", "lateral", "abdomen"]},
    {"nome": "Ponte de Glúteo", "categoria": "Treinamento", "tags": ["gluteo", "postura", "quadril"]},
    {"nome": "Superman", "categoria": "Coordenação", "tags": ["lombar", "extensão", "postura", "fortalecimento"]},
    {"nome": "Corrida Estacionária", "categoria": "Aquecimento", "tags": ["cardio", "preparação", "dinâmico"]},
]

def buscar_exercicios(request: HttpRequest) -> HttpResponse:
    """
    Processa o termo de busca (query) e filtra a lista de exercícios.

    A busca é realizada de forma case-insensitive no 'nome' do exercício
    e em suas 'tags'.
    """
    query = request.GET.get('q', '').strip()

    if query:
        search_term = query.lower()
        
        # Filtra os exercícios usando list comprehension.
        # Verifica se o termo está no nome OU em alguma das tags.
        filtered_exercises = [
            ex for ex in EXERCISES
            if search_term in ex["nome"].lower() or
               any(search_term in tag.lower() for tag in ex["tags"])
        ]
    else:
        # Se a busca estiver vazia, retorna todos os exercícios
        filtered_exercises = EXERCISES

    context = {
        'exercises': filtered_exercises,
        'search_query': query,
        'results_count': len(filtered_exercises)
    }
    
    # Renderiza o template com o contexto (lista filtrada e termo de busca)
    return render(request, 'esporte_app/lista_exercicios.html', context)


    
   
