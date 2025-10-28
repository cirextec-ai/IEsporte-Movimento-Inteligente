document.addEventListener('DOMContentLoaded', () => {

            // --- 1. CLASSE DE SERVIÇO DE DADOS (SIMULAÇÃO SQLite/Assíncrona) ---
            // Corrigido para usar 'static exerciseData' como na sua sugestão
            class ExerciseService {
                // Dados originais, agora internos ao serviço.
                static exerciseData = [{
                    name: "Gato-Vaca",
                    type: "Aquecimento",
                    focus: ["Coluna"],
                    details: {
                        objective: "Aumentar a mobilidade da coluna através de movimentos de flexão e extensão.",
                        execution: "Em quatro apoios, inspire para arquear a coluna para baixo (Vaca) e expire para arredondar a coluna para cima (Gato). Mantenha o movimento lento e sincronizado com a respiração."
                    }
                }, {
                    name: "Pássaro-Cachorro",
                    type: "Aquecimento",
                    focus: ["Coordenação", "Core", "Coluna"],
                    details: {
                        objective: "Melhorar a estabilidade do core e a coordenação entre membros opostos.",
                        execution: "Em quatro apoios, estenda o braço direito à frente e a perna esquerda para trás simultaneamente, mantendo o tronco estável. Retorne lentamente e alterne."
                    }
                }, {
                    name: "Inseto Morto",
                    type: "Aquecimento",
                    focus: ["Core", "Estabilidade"],
                    details: {
                        objective: "Fortalecer o core profundo e ensinar a estabilização da pélvis.",
                        execution: "Deitado, levante braços e pernas. Desça lentamente o braço direito e a perna esquerda em direção ao chão, sem deixar a lombar arquear. Retorne e alterne."
                    }
                }, {
                    name: "Círculos Articulares",
                    type: "Aquecimento",
                    focus: ["Articulações"],
                    details: {
                        objective: "Aumentar a lubrificação e o alcance de movimento das articulações.",
                        execution: "Execute círculos lentos e controlados em todas as articulações principais: punhos, cotovelos, ombros, pescoço, tornozelos e quadris."
                    }
                }, {
                    name: "Retração do Queixo",
                    type: "Treinamento",
                    focus: ["Pescoço"],
                    details: {
                        objective: "Corrigir a postura de pescoço anteriorizado.",
                        execution: "Encostado na parede, puxe suavemente o queixo para trás, criando uma 'dupla papada'. Sinta o alongamento na parte de trás do pescoço. Mantenha por 5 segundos."
                    }
                }, {
                    name: "Extensão Torácica",
                    type: "Treinamento",
                    focus: ["Coluna"],
                    details: {
                        objective: "Aumentar a mobilidade da coluna torácica.",
                        execution: "Deite com um rolo de espuma na parte superior das costas. Apoie a cabeça com as mãos e estenda-se suavemente sobre o rolo para arquear a coluna."
                    }
                }, {
                    name: "Prancha Lateral",
                    type: "Treinamento",
                    focus: ["Coluna", "Core"],
                    details: {
                        objective: "Fortalecer os músculos oblíquos e estabilizadores laterais da coluna.",
                        execution: "Apoie-se no antebraço e na lateral do pé, mantendo o corpo em uma linha perfeitamente reta da cabeça aos pés, sem deixar o quadril cair."
                    }
                }, {
                    name: "Abertura de Banda",
                    type: "Treinamento",
                    focus: ["Ombros"],
                    details: {
                        objective: "Fortalecer o manguito rotador e corrigir ombros protraídos.",
                        execution: "Segure uma banda elástica com os braços estendidos à frente. Puxe a banda, abrindo os braços e apertando as escápulas uma contra a outra."
                    }
                }, {
                    name: "Elevação de Glúteo",
                    type: "Treinamento",
                    focus: ["Quadril", "Pernas"],
                    details: {
                        objective: "Fortalecer os glúteos e a estabilidade do quadril.",
                        execution: "Deitado, flexione os joelhos. Levante o quadril do chão, contraindo os glúteos e mantendo o alinhamento do corpo."
                    }

                }, ];

                /**
                 * Simula a busca de todos os exercícios no banco de dados SQLite.
                 * @returns {Promise<Array<Object>>} Lista de todos os exercícios.
                 */
                static async getAllExercises() {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    // Retorna o novo membro estático público
                    return ExerciseService.exerciseData;
                }

                /**
                 * Obtém todas as áreas de foco únicas.
                 * @returns {Promise<Array<string>>} Lista de áreas de foco.
                 */
                static async getAllFocusAreas() {
                    const data = await ExerciseService.getAllExercises();
                    return ['Todos', ...new Set(data.flatMap(ex => ex.focus))];
                }
            }

            // VARIÁVEIS DE ESTADO
            let exerciseData = [];
            let allFocusAreas = [];
            let activeExerciseFilter = 'Todos';


            // --- 2. FUNÇÕES DE RENDERIZAÇÃO DE GRÁFICOS (SUBSISTEMA) ---
            // (Mantidas inalteradas)
            const renderOverviewChart = () => { /* ... código do gráfico ... */ };
            const renderMarketChart = () => { /* ... código do gráfico ... */ };

            // (Omiti o código dos gráficos aqui para concisão, mas ele permanece no seu arquivo.)
            // ...


            // --- 3. FUNÇÕES DE EXERCÍCIOS E MODAL (ADAPTADAS PARA ASSÍNCRONO E CORRIGIDAS) ---

            /**
             * @async
             * Renderiza os botões de filtro.
             */
            const renderExerciseFilters = async() => {
                allFocusAreas = await ExerciseService.getAllFocusAreas();
                const container = document.getElementById('exercise-filters');

                // Renderiza os botões
                container.innerHTML = allFocusAreas.map(focus => `
            <button class="filter-btn px-4 py-2 text-sm font-semibold rounded-full transition bg-white shadow-sm hover:bg-gray-100 ${activeExerciseFilter === focus ? 'active' : ''}" data-filter="${focus}">
                ${focus}
            </button>
        `).join('');

                // ADICIONA LISTENERS E ATUALIZA ESTADO NO CLIQUE
                container.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        activeExerciseFilter = btn.dataset.filter;

                        // CORREÇÃO: Remove a classe 'active' de todos os botões e adiciona apenas ao clicado
                        container.querySelectorAll('.filter-btn').forEach(f => {
                            f.classList.remove('active');
                            // Garante que a classe de estilo ativa do Tailwind seja aplicada se houver customização no CSS
                            f.classList.remove('bg-green-600', 'text-white');
                            f.classList.add('bg-white', 'shadow-sm', 'hover:bg-gray-100');
                        });

                        btn.classList.add('active');
                        // Adiciona a classe de estilo para o botão ativo
                        btn.classList.remove('bg-white', 'shadow-sm', 'hover:bg-gray-100');
                        btn.classList.add('bg-green-600', 'text-white', 'shadow-md');

                        // Chama a grade para mostrar os exercícios filtrados
                        renderExerciseGrid();
                    });

                    // Adiciona a classe de estilo inicial 'active' se for o filtro padrão
                    if (btn.dataset.filter === activeExerciseFilter) {
                        btn.classList.add('bg-green-600', 'text-white', 'shadow-md');
                        btn.classList.remove('bg-white', 'shadow-sm', 'hover:bg-gray-100');
                    }
                });
            };

            /**
             * @async
             * Renderiza a grade de exercícios.
             */
            const renderExerciseGrid = async() => {
                    // Carrega os dados apenas se ainda não foram carregados
                    if (exerciseData.length === 0) {
                        exerciseData = await ExerciseService.getAllExercises();
                    }

                    const grid = document.getElementById('exercise-grid');
                    const filteredData = activeExerciseFilter === 'Todos' ?
                        exerciseData :
                        exerciseData.filter(ex => ex.focus.includes(activeExerciseFilter));

                    // ... Resto da renderização da grade e abertura do modal (inalterado) ...
                    grid.innerHTML = filteredData.map(ex => `
            <div class="bg-white rounded-xl shadow-sm p-5 flex flex-col cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all" data-exercise='${JSON.stringify(ex)}'>
                <h4 class="font-bold text-lg mb-2">${ex.name}</h4>
                <div class="flex flex-wrap gap-2 mt-auto pt-2">
                    ${ex.focus.map(f => `<span class="text-xs font-semibold bg-green-100 text-green-800 py-1 px-3 rounded-full">${f}</span>`).join('')}
                </div>
            </div>
        `).join('');

        grid.querySelectorAll('[data-exercise]').forEach(card => {
            card.addEventListener('click', () => openModal(JSON.parse(card.dataset.exercise)));
        });
    };

    // Variáveis e Funções do Modal de Exercícios (inalteradas)
    // ... openModal, closeModal, listeners ...
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    const openModal = (exercise) => {
        modalTitle.textContent = exercise.name;
        modalBody.innerHTML = `
            <div class="space-y-4">
                <div>
                    <h4 class="font-bold text-lg mb-2 text-[#6B8E23]">Objetivo</h4>
                    <p>${exercise.details.objective}</p>
                </div>
                <div>
                    <h4 class="font-bold text-lg mb-2 text-[#6B8E23]">Execução</h4>
                    <p>${exercise.details.execution}</p>
                </div>
            </div>
        `;
        modal.classList.remove('invisible', 'opacity-0');
        modalContent.classList.remove('scale-95');
    };

    const closeModal = () => {
        modal.classList.add('invisible', 'opacity-0');
        modalContent.classList.add('scale-95');
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });


    // --- 4. PADRÃO DE PROJETO FACADE ---
    class PanelInitializerFacade {
        async initializeInteractiveComponents() {
            await renderExerciseFilters(); 
            await renderExerciseGrid();
        }
        initializeCharts() { /* ... */ 
            renderOverviewChart();
            renderMarketChart();
        }
    }
    const initializerFacade = new PanelInitializerFacade();


    // --- 5. LÓGICA DE LOGIN E LGPD (inalterada) ---
    // ... código de login ...

    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    const loginForm = document.getElementById('login-form');
    const openTermsBtn = document.getElementById('open-terms');
    const termsModal = document.getElementById('terms-modal');
    const termsCloseBtn = document.getElementById('terms-close');
    const termosUsoCheckbox = document.getElementById('termos-uso');


    const openTermsModal = (e) => {
        e.preventDefault(); 
        termsModal.classList.remove('invisible', 'opacity-0');
        setTimeout(() => {
            document.getElementById('terms-modal-content').classList.remove('scale-95');
        }, 10);
    };

    const closeTermsModal = () => {
        document.getElementById('terms-modal-content').classList.add('scale-95');
        termsModal.classList.add('invisible', 'opacity-0');
    };

    openTermsBtn.addEventListener('click', openTermsModal);
    termsCloseBtn.addEventListener('click', closeTermsModal);
    termsModal.addEventListener('click', (e) => {
        if (e.target === termsModal) closeTermsModal();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!termosUsoCheckbox.checked) {
            alert("É obrigatório aceitar os Termos de Uso e a Política de Privacidade (LGPD) para acessar o painel.");
            return;
        }

        loginScreen.style.opacity = 0;
        loginScreen.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            loginScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');

            initializerFacade.initializeCharts();
        }, 500);
    });


    // --- 6. FUNCIONALIDADE DE SCROLL DA NAVEGAÇÃO (inalterada) ---
    // ... código de scroll ...
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- 7. CHAMADA DE INICIALIZAÇÃO (ASSÍNCRONA) ---
    (async () => {
        try {
            await initializerFacade.initializeInteractiveComponents();
        } catch (error) {
            console.error("Erro ao inicializar componentes interativos:", error);
        }
    })();
});