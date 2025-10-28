from django.http import JsonResponse
from .serviços.facade import MovimentoInteligenteFacade

def cadastrar_atleta(request):
    if request.method == 'POST':
        data = request.POST
        facade = MovimentoInteligenteFacade()
        atleta = facade.cadastrar_atleta(data['nome'], int(data['idade']), data['email'])
        return JsonResponse({'id': atleta.id, 'nome': atleta.nome})
    return JsonResponse({'error': 'Método não permitido'}, status=405)
  

# Create your views here.
