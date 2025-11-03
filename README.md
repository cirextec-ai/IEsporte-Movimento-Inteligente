# IEsporte - Movimento Inteligente 🧠🏃‍♀️

![Banner do Projeto IEsporte - Movimento Inteligente](https://placehold.co/800x200/6B8E23/ffffff?text=IEsporte+-+An%C3%A1lise+de+Movimento+Inteligente)


## 🎯 Descrição Breve do Sistema

O **IEsporte - Movimento Inteligente** é um protótipo de plataforma digital focada em **fisioterapia** e **análise clínica de movimento**. O sistema visa capacitar fisioterapeutas com ferramentas para diagnóstico preciso e fornecer aos pacientes um guia interativo de exercícios corretivos. O projeto utiliza o poder do Python para lógica de Machine Learning (TensorFlow/visão computacional) e a tríade web (HTML, CSS, JavaScript) para uma interface de usuário dinâmica e acessível.


## 🛠️ Tecnologias Utilizadas

Este projeto integra tecnologias de frontend, backend e inteligência artificial para entregar uma solução completa de saúde digital.

| Categoria | Tecnologia | Ícone |
| :--- | :--- | :--- |
| **Backend / IA** | Python | 🐍 |
| **Estrutura da Interface** | HTML5 | 📄 |
| **Estilização / Design** | CSS3 (com Tailwind CSS) | 🎨 |
| **Interatividade / Dinamismo** | JavaScript (Vanilla + Chart.js) | ⚡ |
| **Modelo de IA** | TensorFlow (Visão Computacional) | |
| **Base de Dados** | Ferramentas SQL (SQL Tools) | |


## 🏗️ Arquitetura Resumida

A arquitetura do IEsporte é desenhada para ser modular, permitindo a separação clara entre a lógica clínica (IA/Python) e a apresentação interativa (Frontend).

* **Camada de IA/Lógica (Backend - 🐍 Python/TensorFlow):** Responsável por processar dados de movimento, fornecer modelos de análise e estruturar o conteúdo clínico.
* **Camada de Persistência (SQL Tools):** Armazenamento de dados de pacientes, histórico de análises e o catálogo de exercícios.
* **Camada de Apresentação (Frontend - 📄 HTML/🎨 CSS/⚡ JavaScript):** O painel interativo (SPA) que permite a exploração do guia de exercícios e a visualização da análise de mercado.

## 📁 Estrutura Simplificada

A organização dos arquivos reflete a divisão das responsabilidades:

Iesporte_Movimento_Inteligente/

├── .venv/                        # Ambiente virtual Python

├── iesporte/

│   ├── manage.py                 # Comando principal do Django

│   ├── db.sqlite3                # Banco de dados SQLite

│   ├── iesporte/                 # Configuração do projeto Django

│   │   ├── __init__.py

│   │   ├── settings.py           # Configurações principais

│   │   ├── urls.py               # Rotas principais

│   │   └── wsgi.py

│   ├── esporte_app/              # App principal do projeto

│   │   ├── __init__.py

│   │   ├── admin.py

│   │   ├── apps.py

│   │   ├── models.py

│   │   ├── views.py              # Controladores (lógica das rotas)

│   │   ├── urls.py               # Rotas do app

│   │   ├── facade.py             # Facade com lógica centralizada

│   │   └── migrations/           # Migrações do banco de dados

│   ├── templates/

│   │   └── index.html            # Template HTML principal

│   └── static/

│       ├── css/

│       │   └── style.css         # Arquivo de estilos

│       └── js/

│           └── script.js         # JS das interações



## 📐 Padrão de Projeto Utilizado

O projeto segue a arquitetura Padrão Facade
Definição (GoF/Design Patterns):
O Facade fornece uma interface unificada e simplificada para um conjunto de interfaces em um subsistema, definindo um ponto de entrada de mais alto nível e tornando o subsistema mais fácil de ser usado.
* **Gerenciamento do Estado:** Seja feito pelo JavaScript para atualizar a interface dinamicamente (simulando um padrão *Flux* ou *Redux* simplificado para o estado da aplicação).

---

## ✨ Funcionalidades do Protótipo

O protótipo do IEsporte demonstra as seguintes capacidades:

| Funcionalidade    | Descrição                                        |
| ----------------- | ------------------------------------------------ |
| Cadastro          | Criação de conta com validação de email único    |
| Login             | Autenticação via formulário ou API REST          |
| Logout            | Encerramento de sessão                           |
| Exercícios        | Listagem interativa de 6 exercícios com detalhes |
| Cards Expansíveis | Clique para ver objetivo e execução              |
| Segurança         | CSRF, validação de dados, hash de senhas         |
| API REST          | Endpoint JSON para integração com frontends      |
| Facade Pattern    | Lógica centralizada e desacoplada                |

1.  **Guia de Exercícios Interativo:** Módulo que permite filtrar e visualizar detalhes de exercícios corretivos por foco corporal (Coluna, Ombros, Core, etc.).
2.  **Análise de Movimento Simulada:** Base para integrar um futuro módulo de visão computacional para avaliar a execução correta dos exercícios pelo paciente.
3.  **Integração Futura com IA Generativa (Gemini API):** Estrutura pronta para gerar relatórios de progresso personalizados e insights clínicos.

---

## 🚀 Como Executar o Sistema

Como Executar o Sistema
Pré-requisitos
Certifique-se de ter instalado:

Python 3.13.7 ou superior

Git (para clonar o repositório)

Git Bash ou terminal compatível (Windows/Linux/Mac)

Passo 1: Clonar o Repositório

bash
cd ~/IdeaProjects

git clone https://github.com/SergioCarmo-ro/IEsporte-Movimento-Inteligente.git

cd IEsporte-Movimento-Inteligente

Passo 2: Criar e Ativar o Ambiente Virtual

Windows (Git Bash):

bash
python -m venv .venv
source .venv/Scripts/activate
Linux/Mac:

bash

python3 -m venv .venv

source .venv/bin/activate
Passo 3: Instalar Dependências
bash
pip install Django==5.2.7
Ou, se houver arquivo requirements.txt:

bash
pip install -r requirements.txt

Passo 4: Configurar o Banco de Dados
Entre na pasta correta do projeto:

bash
cd iesporte
Execute as migrações:

bash
python manage.py makemigrations

python manage.py migrate

Passo 5: Criar Superusuário (Opcional)
Para acessar o painel administrativo do Django:

bash
python manage.py createsuperuser
Preencha email, usuário e senha quando solicitado.

Passo 6: Rodar o Servidor de Desenvolvimento

bash
python manage.py runserver
Saída esperada:

text
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
November 03, 2025 - 03:43:00
Django version 5.2.7, using settings 'iesporte.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.

Passo 7: Acessar o Sistema
Abra o navegador e acesse:

text
http://127.0.0.1:8000/

Passo 8: Testar Funcionalidades
Criar Conta:

Clique em "Criar Conta"

Preencha email, senha e aceite os termos

Cadastro realizado com login automático

Fazer Login:

Informe email e senha

Acesse a lista de exercícios

Visualizar Exercícios:

Clique nos cards para expandir

Veja objetivo e execução de cada exercício

Logout:

Clique em "Sair" para encerrar sessão

Para testar o Painel Interativo e a estrutura de código localmente.

### 🧩 Dependências Utilizadas

Dependências Utilizadas
Backend (Python/Django)
Dependência	Versão	Propósito
Python	3.13.7	Linguagem de programação principal
Django	5.2.7	Framework web para backend
SQLite3	(built-in)	Banco de dados relacional
Frontend
Tecnologia	CDN/Versão	Propósito
Tailwind CSS	CDN (https://cdn.tailwindcss.com)	Framework CSS utilitário para estilização
JavaScript (Vanilla)	ES6+	Interatividade (expansão de cards)
HTML5	-	Estrutura das páginas
Bibliotecas Python (Django)
Módulo	Propósito
django.contrib.auth	Sistema de autenticação (login, logout, authenticate)
django.shortcuts	Funções auxiliares (render, redirect)
django.http	Respostas HTTP (JsonResponse)
django.views.decorators.csrf	Proteção CSRF
django.views.decorators.http	Decoradores de métodos HTTP
json	Manipulação de dados JSON
Estrutura do Ambiente Virtual
bash

.venv/                          # Ambiente virtual Python

├── Lib/site-packages/

│   ├── django/                 # Django framework

│   ├── sqlparse/               # Parser SQL (dependência do Django)

│   ├── asgiref/                # ASGI server (dependência do Django)

│   └── tzdata/                 # Dados de fuso horário

Arquivo requirements.txt (Sugerido)
text
Django==5.2.7
asgiref==3.8.1
sqlparse==0.5.1
tzdata==2024.2
Instalação das Dependências
bash
# Criar ambiente virtual
python -m venv .venv

# Ativar ambiente virtual (Windows Git Bash)
source .venv/Scripts/activate

# Ou instalar manualmente
pip install Django==5.2.7
Dependências de Desenvolvimento (Opcionais)
Ferramenta	Propósito
Git	Controle de versão
VS Code	Editor de código
Git Bash	Terminal Unix-like no Windows

* **Para o Módulo de IA (Desenvolvimento Futuro):** Python (3.9+), `tensorflow`, `opencv-python`.

### ⚠️ Observações Importantes

* A visualização do Painel Interativo (`index.html`) já é totalmente funcional e interativa, usando dados embutidos no JavaScript (Vanilla + Chart.js).
* A integração da análise de movimento em tempo real e a persistência de dados em SQL são funcionalidades planejadas que exigem a configuração do ambiente Python e dos servidores de banco de dados.

## 🟢 Status do Projeto

| Status | Detalhe |
| :--- | :--- |
| **Protótipo de Painel Interativo** 
| **Completo e funcional** (Frontend/SPA). |
| **Módulo de Análise IA** | Em fase de **definição de arquitetura** e desenvolvimento do modelo. |
| **Próximos Passos** | Implementar a comunicação em tempo real entre o modelo de visão computacional (Python/TensorFlow) e a interface web. |

👨‍💻 Autor

Sergio Ademir Rocha do Carmo
GitHub - https://github.com/SergioCarmo-ro/IEsporte-Movimento-Inteligente  

| **Sérgio Ademir Rocha do Carmo** | Desenvolvedor Principal (Frontend, Backend, IA) 
