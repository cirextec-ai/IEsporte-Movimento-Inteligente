"""
Padrão de Projeto: FACADE

O Facade fornece uma interface simplificada para subsistemas complexos.
Neste caso, centralizamos operações de:
- Gerenciamento de Exercícios
- Autenticação de Usuários
- Operações de Usuário
"""

from django.contrib.auth import authenticate, login, logout, get_user_model
from django.shortcuts import redirect
from typing import Dict, List, Optional, Tuple, Any

User = get_user_model()


class ExercicioFacade:
    """
    Facade para gerenciar exercícios.
    Encapsula a lógica de obtenção, filtragem e manipulação de exercícios.
    """
    
    @staticmethod
    def get_exercicios_database():
        """Retorna o banco de dados de exercícios"""
        return [
            {
                'nome': 'Gato-Vaca',
                'tipo': 'Aquecimento',
                'foco': ['Coluna'],
                'objetivo': 'Aumentar a mobilidade da coluna.',
                'execucao': 'Em quatro apoios, inspire para arquear a coluna para baixo (Vaca) e expire para arredondar a coluna para cima (Gato).',
                'imagem': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
            },
            {
                'nome': 'Pássaro-Cachorro',
                'tipo': 'Aquecimento',
                'foco': ['Coordenação', 'Core', 'Coluna'],
                'objetivo': 'Melhorar a estabilidade do core e a coordenação.',
                'execucao': 'Em quatro apoios, estenda o braço direito à frente e a perna esquerda para trás simultaneamente.',
                'imagem': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop'
            },
            {
                'nome': 'Inseto Morto',
                'tipo': 'Aquecimento',
                'foco': ['Core', 'Estabilidade'],
                'objetivo': 'Fortalecer o core profundo.',
                'execucao': 'Deitado, levante braços e pernas. Desça o braço e a perna opostos lentamente.',
                'imagem': 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop'
            },
            {
                'nome': 'Retração do Queixo',
                'tipo': 'Treinamento',
                'foco': ['Pescoço'],
                'objetivo': 'Corrigir a postura de pescoço anteriorizado.',
                'execucao': 'Encostado na parede, puxe suavemente o queixo para trás.',
                'imagem': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
            },
            {
                'nome': 'Prancha Lateral',
                'tipo': 'Treinamento',
                'foco': ['Coluna', 'Core'],
                'objetivo': 'Fortalecer os músculos oblíquos.',
                'execucao': 'Apoie-se no antebraço e na lateral do pé, mantendo o corpo em linha reta.',
                'imagem': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
            },
            {
                'nome': 'Elevação de Glúteo',
                'tipo': 'Treinamento',
                'foco': ['Quadril', 'Pernas'],
                'objetivo': 'Fortalecer os glúteos e a estabilidade do quadril.',
                'execucao': 'Deitado, flexione os joelhos. Levante o quadril do chão, contraindo os glúteos.',
                'imagem': 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=300&fit=crop'
            },
        ]
    
    @staticmethod
    def get_todos_exercicios():
        """Retorna todos os exercícios disponíveis"""
        return ExercicioFacade.get_exercicios_database()
    
    @staticmethod
    def filtrar_por_tipo(tipo):
        """Filtra exercícios por tipo (Aquecimento, Treinamento)"""
        exercicios = ExercicioFacade.get_exercicios_database()
        return [ex for ex in exercicios if ex['tipo'].lower() == tipo.lower()]
    
    @staticmethod
    def filtrar_por_foco(area_foco):
        """Filtra exercícios por área de foco (Coluna, Core, etc.)"""
        exercicios = ExercicioFacade.get_exercicios_database()
        return [ex for ex in exercicios if area_foco in ex['foco']]
    
    @staticmethod
    def buscar_por_nome(nome):
        """Busca um exercício específico pelo nome"""
        exercicios = ExercicioFacade.get_exercicios_database()
        for ex in exercicios:
            if ex['nome'].lower() == nome.lower():
                return ex
        return None


class AutenticacaoFacade:
    """
    Facade para operações de autenticação.
    Simplifica login, logout e verificação de autenticação.
    """
    
    @staticmethod
    def fazer_login(request, email, password):
        """
        Realiza login do usuário.
        
        Returns:
            Tuple: (sucesso: bool, mensagem: str, usuario: User ou None)
        """
        print(f"[FACADE] Tentando login: {email}")
        
        if not email or not password:
            return False, "Email e senha são obrigatórios", None
        
        user = authenticate(request, username=email, password=password)
        
        if user is not None:
            if user.is_active:
                login(request, user)
                print(f"[FACADE] ✅ Login bem-sucedido: {user.username}")
                return True, "Login realizado com sucesso", user
            else:
                print(f"[FACADE] ❌ Usuário inativo: {email}")
                return False, "Conta desativada", None
        else:
            user_exists = User.objects.filter(username=email).exists()
            if not user_exists:
                print(f"[FACADE] ❌ Usuário não encontrado: {email}")
                return False, "Usuário não encontrado. Cadastre-se primeiro.", None
            else:
                print(f"[FACADE] ❌ Senha incorreta: {email}")
                return False, "Senha incorreta", None
    
    @staticmethod
    def fazer_logout(request):
        """Realiza logout do usuário"""
        print("[FACADE] ✅ Logout realizado")
        logout(request)
        return True
    
    @staticmethod
    def esta_autenticado(request):
        """Verifica se o usuário está autenticado"""
        return request.user.is_authenticated
    
    @staticmethod
    def obter_usuario_atual(request):
        """Retorna o usuário atual ou None"""
        if request.user.is_authenticated:
            return request.user
        return None


class UsuarioFacade:
    """
    Facade para operações de gerenciamento de usuários.
    Simplifica criação, verificação e manipulação de usuários.
    """
    
    @staticmethod
    def criar_usuario(email, password, aceite_termos=False):
        """
        Cria um novo usuário.
        
        Returns:
            Tuple: (sucesso: bool, mensagem: str, usuario: User ou None)
        """
        print(f"[FACADE] Criando usuário: {email}")
        
        if not aceite_termos:
            return False, "Você deve aceitar os termos de uso", None
        
        if not email or not password:
            return False, "Email e senha são obrigatórios", None
        
        if len(password) < 6:
            return False, "A senha deve ter no mínimo 6 caracteres", None
        
        try:
            # Verificar se usuário já existe
            if User.objects.filter(username=email).exists():
                print(f"[FACADE] ❌ Email já cadastrado: {email}")
                return False, "Email já cadastrado", None
            
            # Criar novo usuário
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password
            )
            print(f"[FACADE] ✅ Usuário criado: {user.username}")
            return True, "Conta criada com sucesso", user
            
        except Exception as e:
            print(f"[FACADE] ❌ Erro ao criar usuário: {e}")
            return False, f"Erro ao criar conta: {str(e)}", None
    
    @staticmethod
    def usuario_existe(email):
        """Verifica se um usuário existe pelo email"""
        return User.objects.filter(username=email).exists()
    
    @staticmethod
    def obter_usuario_por_email(email):
        """Retorna um usuário pelo email"""
        try:
            return User.objects.get(username=email)
        except User.DoesNotExist:
            return None


class IEsporteFacade:
    """
    Facade principal do sistema IEsporte.
    Integra todos os subsistemas (Exercícios, Autenticação, Usuários).
    """
    
    def __init__(self):
        self.exercicios = ExercicioFacade()
        self.autenticacao = AutenticacaoFacade()
        self.usuarios = UsuarioFacade()
    
    def obter_contexto_pagina_inicial(self, request):
        """
        Retorna o contexto completo para a página inicial.
        Centraliza toda a lógica de preparação de dados.
        """
        return {
            'user_authenticated': self.autenticacao.esta_autenticado(request),
            'user': self.autenticacao.obter_usuario_atual(request),
            'exercicios': self.exercicios.get_todos_exercicios()
        }
    
    def processar_login(self, request, email, password):
        """Processa login e retorna redirect ou erro"""
        sucesso, mensagem, user = self.autenticacao.fazer_login(request, email, password)
        
        if sucesso:
            return redirect('home'), None
        else:
            return None, mensagem
    
    def processar_cadastro(self, request, email, password, aceite_termos):
        """Processa cadastro, faz login automático e retorna redirect ou erro"""
        sucesso, mensagem, user = self.usuarios.criar_usuario(email, password, aceite_termos)
        
        if sucesso:
            # Login automático após cadastro
            login(request, user)
            return redirect('home'), None
        else:
            return None, mensagem
