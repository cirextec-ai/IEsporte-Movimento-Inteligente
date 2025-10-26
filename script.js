// script.js (Atualizado)
import { IEsporteDBFacade } from './db_facade.js';

// Inicializa a fachada do banco de dados (o 'backend' do frontend)
const dbFacade = new IEsporteDBFacade();

// Variável para armazenar os dados carregados do 'DB'
let exercisesData = [];

document.addEventListener('DOMContentLoaded', async() => {

    // 1. CARREGAR DADOS VIA FACADE (Substitui a declaração hardcoded)
    try {
        exercisesData = await dbFacade.fetchAllExercises();
        console.log(`Dados carregados: ${exercisesData.length} exercícios.`);
    } catch (error) {
        console.error("Falha ao carregar dados iniciais:", error);
    }

    // As funções restantes agora usam a variável 'exercisesData' preenchida

    // --- MÓDULO INTERATIVO DE EXERCÍCIOS ---

    // ... (O resto das suas funções JS permanecem aqui, adaptadas para usar exercisesData) ...
    // Note que as funções precisam ser adaptadas para usar a nova estrutura de dados carregada

    // Renderiza os botões de filtro
    const renderExerciseFilters = () => {
        const filtersContainer = document.getElementById('exercise-filters');
        // Agora 'exercisesData' é preenchido pelo Facade
        if (exercisesData.length === 0) return;
        const categories = ['Todos', ...new Set(exercisesData.map(e => e.category))];
        filtersContainer.innerHTML = categories.map(category => `
            <button class="filter-btn bg-white text-gray-700 px-4 py-2 rounded-full font-semibold border border-gray-300 hover:border-[#6B8E23] transition-colors ${category === 'Todos' ? 'active' : ''}" data-category="${category}">
                ${category}
            </button>
        `).join('');
        // Adiciona o listener de clique
        filtersContainer.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                filtersContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                filterExercises(category);
            });
        });
    };

    // Renderiza a grade de exercícios com base no filtro
    const renderExerciseGrid = (filteredData = exercisesData) => {
        const grid = document.getElementById('exercise-grid');
        grid.innerHTML = filteredData.map(exercise => `
            <div class="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02] border-2 border-transparent hover:border-[#6B8E23] p-4" data-exercise-id="${exercise.id}">
                <img src="${exercise.image}" alt="${exercise.name}" class="w-full h-36 object-cover rounded-lg mb-4">
                <h3 class="text-xl font-bold text-[#3D3B3A] mb-1">${exercise.name}</h3>
                <p class="text-sm text-gray-500">${exercise.category} | Foco: ${exercise.focus}</p>
            </div>
        `).join('');
        // Adiciona listener para abrir modal de detalhes
        grid.querySelectorAll('[data-exercise-id]').forEach(item => {
            item.addEventListener('click', (e) => openModal(e, 'exercise', parseInt(item.getAttribute('data-exercise-id'))));
        });
    };

    // Filtra os exercícios
    const filterExercises = (category) => {
        if (category === 'Todos') {
            renderExerciseGrid(exercisesData);
        } else {
            const filtered = exercisesData.filter(e => e.category === category);
            renderExerciseGrid(filtered);
        }
    };

    // Implementação do DELETE - USA O FACADE!
    const handleDeleteAccount = async() => {
        const userEmail = "usuario.logado@iesporte.com"; // Simulação de obtenção do email do usuário logado
        const success = await dbFacade.deleteUserAccount(userEmail);

        if (success) {
            alert(`A conta de ${userEmail} e todos os dados foram excluídos com sucesso do 'servidor' (simulação via Facade).`);
            closeModal();
            // Lógica de deslogar e ir para a tela de login
            // toggleMainView(false); 
        } else {
            alert("Falha na exclusão da conta. Tente novamente.");
            closeModal();
        }
    };

    // --- FUNÇÕES DE MODAL ---
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    const openModal = async(e, type, id = null) => { // Tornar async para o fetch de detalhes
        e.preventDefault();
        // ... (lógica de abertura e transição do modal) ...
        modal.classList.add('opacity-100', 'visible');
        modal.classList.remove('invisible', 'opacity-0');
        modal.querySelector('.modal-content').classList.remove('scale-95');
        modal.querySelector('.modal-content').classList.add('scale-100');
        modalBody.innerHTML = '';

        if (type === 'exercise' && id !== null) {
            // USA O FACADE PARA OBTER DETALHES
            const exercise = await dbFacade.getExerciseDetails(id);

            if (exercise) {
                modalTitle.textContent = exercise.name;
                modalBody.innerHTML = `
                    <img src="${exercise.image}" alt="${exercise.name}" class="w-full h-auto object-cover rounded-lg mb-4">
                    <div class="bg-gray-50 p-4 rounded-lg space-y-2">
                        <p class="text-sm"><strong>Categoria:</strong> ${exercise.category}</p>
                        <p class="text-sm"><strong>Foco Principal:</strong> ${exercise.focus}</p>
                        <p class="text-sm"><strong>Duração/Séries:</strong> ${exercise.duration}</p>
                        <p class="text-sm"><strong>Dificuldade:</strong> ${exercise.difficulty}</p>
                    </div>
                    <p class="mt-4">${exercise.description}</p>
                `;
            }
        } else if (type === 'delete') {
            // ... (lógica do modal de delete - permanece a mesma) ...
            modalTitle.textContent = "Confirmação de Exclusão de Conta";
            modalBody.innerHTML = `
                <p class="text-lg font-semibold text-red-600">Atenção: Esta ação não pode ser desfeita.</p>
                <p>Ao confirmar, todos os seus dados serão removidos. Você será deslogado e precisará criar uma nova conta para acessar.</p>
                <div class="mt-6 flex justify-end space-x-4">
                    <button id="cancel-delete" class="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button id="confirm-delete" class="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700">Sim, Excluir Minha Conta</button>
                </div>
            `;
            document.getElementById('cancel-delete').addEventListener('click', closeModal);
            document.getElementById('confirm-delete').addEventListener('click', handleDeleteAccount);
        }
    };

    // ... (Função closeModal permanece inalterada) ...
    const closeModal = () => {
        modal.querySelector('.modal-content').classList.remove('scale-100');
        modal.querySelector('.modal-content').classList.add('scale-95');
        modal.classList.add('invisible', 'opacity-0');
        modal.classList.remove('opacity-100', 'visible');

        const confirmBtn = document.getElementById('confirm-delete');
        if (confirmBtn) {
            confirmBtn.removeEventListener('click', handleDeleteAccount);
        }
        const cancelBtn = document.getElementById('cancel-delete');
        if (cancelBtn) {
            cancelBtn.removeEventListener('click', closeModal);
        }
    };

    // ... (event listeners de modal e inicialização de view) ...
    document.getElementById('modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Início da Renderização do Módulo de Exercícios (Após o carregamento de dados)
    renderExerciseFilters();
    renderExerciseGrid();
    renderImportantRecommendations();

    // A função de login (login-form) deve ser adaptada para interagir com a função de autenticação
    // E, após o login, chamar a inicialização dos exercícios.

    // Exemplo de adaptação de login (ASSUMINDO que a autenticação foi bem sucedida)
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulação de login bem-sucedido
        // toggleMainView(true); // Esta função não está no seu snippet, mas é necessária
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        // Redraw charts, etc.
    });

    // Nova função para renderizar recomendações importantes
    const renderImportantRecommendations = () => {
        const recommendationsContainer = document.createElement('div');
        recommendationsContainer.classList.add('max-w-3xl', 'mx-auto', 'mt-12', 'p-8', 'bg-white', 'rounded-2xl', 'shadow-lg', 'border-t-4', 'border-[#6B8E23]');
        recommendationsContainer.innerHTML = `
            <h3 class="text-2xl font-bold text-[#6B8E23] mb-4">Recomendações Importantes</h3>
            <ul class="space-y-3 text-gray-700">
                <li class="flex items-start">
                    <span class="text-[#6B8E23] text-xl mr-3">⚠️</span>
                    <div>
                        <strong class="text-[#3D3B3A]">Não force:</strong> Se sentir dor, desconforto ou dúvida sobre a execução, pare imediatamente.
                    </div>
                </li>
                <li class="flex items-start">
                    <span class="text-[#6B8E23] text-xl mr-3">✅</span>
                    <div>
                        <strong class="text-[#3D3B3A]">Mantenha a postura:</strong> Mantenha a cabeça e a coluna eretas durante os exercícios.
                    </div>
                </li>
                <li class="flex items-start">
                    <span class="text-[#6B8E23] text-xl mr-3">✅</span>
                    <div>
                        <strong class="text-[#3D3B3A]">Respire:</strong> Respire continuamente e evite prender o ar durante o movimento.
                    </div>
                </li>
                <li class="flex items-start">
                    <span class="text-[#6B8E23] text-xl mr-3">✅</span>
                    <div>
                        <strong class="text-[#3D3B3A]">Priorize a segurança:</strong> Se necessário, apoie-se em um local seguro caso o exercício seja feito em pé.
                    </div>
                </li>
                <li class="flex items-start">
                    <span class="text-[#6B8E23] text-xl mr-3">✅</span>
                    <div>
                        <strong class="text-[#3D3B3A]">Varie os treinos:</strong> O ideal é treinar no mínimo duas vezes por semana, alternando os dias de descanso para recuperação.
                    </div>
                </li>
            </ul>
        `;
        const exercisesSection = document.getElementById('exercises');
        exercisesSection.appendChild(recommendationsContainer);
    };

});