document.addEventListener('DOMContentLoaded', () => {

            // --- 1. DADOS DE EXERCÍCIOS ---
            const exerciseData = [{
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

            const allFocusAreas = ['Todos', ...new Set(exerciseData.flatMap(ex => ex.focus))];
            let activeExerciseFilter = 'Todos';


            // --- 2. FUNÇÕES DE RENDERIZAÇÃO DE GRÁFICOS (SUBSISTEMA) ---
            const renderOverviewChart = () => {
                const ctx = document.getElementById('overviewChart').getContext('2d');
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Análise Clínica', 'Educação do Paciente', 'Posicionamento de Mercado'],
                        datasets: [{
                            data: [45, 35, 20],
                            backgroundColor: ['#6B8E23', '#4A7C59', '#A3B18A'],
                            borderColor: '#F9F7F3',
                            borderWidth: 4,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    font: {
                                        family: 'Inter'
                                    }
                                }
                            }
                        }
                    }
                });
            };

            const renderMarketChart = () => {
                const ctx = document.getElementById('marketChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['HealthTrack', 'AccessControl', 'RetailGuard', 'IEsporte'],
                        datasets: [{
                            label: 'Eficácia Clínica',
                            data: [99, 97, 92, 95],
                            backgroundColor: '#6B8E23',
                        }, {
                            label: 'Performance Técnica',
                            data: [60, 95, 88, 75],
                            backgroundColor: '#A3B18A',
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                suggestedMax: 100,
                                title: {
                                    display: true,
                                    text: 'Pontuação Normalizada (0-100)'
                                }
                            },
                        },
                        plugins: {
                            legend: {
                                position: 'top'
                            }
                        }
                    }
                });
            };


            // --- 3. FUNÇÕES DE EXERCÍCIOS E MODAL (SUBSISTEMA) ---
            const renderExerciseFilters = () => {
                const container = document.getElementById('exercise-filters');
                container.innerHTML = allFocusAreas.map(focus => `
            <button class="filter-btn px-4 py-2 text-sm font-semibold rounded-full transition bg-white shadow-sm hover:bg-gray-100 ${activeExerciseFilter === focus ? 'active' : ''}" data-filter="${focus}">
                ${focus}
            </button>
        `).join('');

                container.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        activeExerciseFilter = btn.dataset.filter;
                        renderExerciseFilters();
                        renderExerciseGrid();
                    });
                });
            };

            const renderExerciseGrid = () => {
                    const grid = document.getElementById('exercise-grid');
                    const filteredData = activeExerciseFilter === 'Todos' ?
                        exerciseData :
                        exerciseData.filter(ex => ex.focus.includes(activeExerciseFilter));

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

    // Variáveis e Funções do Modal de Exercícios
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    const openModal = (exercise) => {
        modalTitle.textContent = exercise.name;
        modalBody.innerHTML = `
            <div>
                <h4 class="font-bold text-lg mb-2 text-[#6B8E23]">Objetivo</h4>
                <p>${exercise.details.objective}</p>
            </div>
            <div>
                <h4 class="font-bold text-lg mb-2 text-[#6B8E23]">Execução</h4>
                <p>${exercise.details.execution}</p>
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


    // --- 4. PADRÃO DE PROJETO FACADE (Interface Simplificada) ---
    class PanelInitializerFacade {
        
        // O Facade encapsula as chamadas de inicialização dos subsistemas
        initializeInteractiveComponents() {
            // Inicializa componentes que dependem apenas do DOM (filtros e grade)
            renderExerciseFilters(); 
            renderExerciseGrid();
        }

        initializeCharts() {
            // Inicializa componentes que dependem do 'main-content' estar visível (gráficos)
            renderOverviewChart();
            renderMarketChart();
        }
    }
    // Instanciando o Facade
    const initializerFacade = new PanelInitializerFacade();


    // --- 5. LÓGICA DE LOGIN E LGPD ---
    const loginScreen = document.getElementById('login-screen');
    const mainContent = document.getElementById('main-content');
    const loginForm = document.getElementById('login-form');
    const openTermsBtn = document.getElementById('open-terms');
    const termsModal = document.getElementById('terms-modal');
    const termsCloseBtn = document.getElementById('terms-close');
    const termosUsoCheckbox = document.getElementById('termos-uso');

    // Funções do Modal de Termos de Uso (LGPD)
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

    // Lógica de Login e Transição de Tela
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // VALIDAÇÃO LGPD: Checa se os termos foram aceitos
        if (!termosUsoCheckbox.checked) {
            alert("É obrigatório aceitar os Termos de Uso e a Política de Privacidade (LGPD) para acessar o painel.");
            return;
        }

        // Simulação de autenticação bem-sucedida
        loginScreen.style.opacity = 0;
        loginScreen.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            loginScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');

            // Chamada Única do FACADE para iniciar os gráficos
            initializerFacade.initializeCharts();
        }, 500);
    });


    // --- 6. FUNCIONALIDADE DE SCROLL DA NAVEGAÇÃO ---
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

    // --- 7. CHAMADA DE INICIALIZAÇÃO (FORA DO LOGIN) ---
    // O Facade é chamado aqui para inicializar os filtros e a grade 
    // antes que o usuário faça o login, garantindo que o DOM esteja pronto.
    initializerFacade.initializeInteractiveComponents();
});