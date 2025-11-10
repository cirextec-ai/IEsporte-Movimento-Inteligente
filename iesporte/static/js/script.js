// ==============================
// VARIÁVEIS GLOBAIS
// ==============================
let exercisesData = [];

// ==============================
// MÓDULO DOM
// ==============================
const DOM = {
    loadingIndicator: document.getElementById('loading-indicator'),
    authView: document.getElementById('auth-view'),
    mainContent: document.getElementById('main-content'),
    authMessage: document.getElementById('auth-message'),
    userDisplay: document.getElementById('user-display'),
    signOutButton: document.getElementById('sign-out-btn'),
    deleteAccountBtn: document.getElementById('delete-account-btn'),
    modal: document.getElementById('modal'),
    modalTitle: document.getElementById('modal-title'),
    modalBody: document.getElementById('modal-body'),
};

// ==============================
// MÓDULO UI
// ==============================
class UIManager {
    static showMessage(msg, isError = true) {
        DOM.authMessage.textContent = msg;
        DOM.authMessage.classList.remove('hidden');
        DOM.authMessage.classList.toggle('text-red-500', isError);
        DOM.authMessage.classList.toggle('text-green-500', !isError);
    }

    static toggleView(isLoggedIn) {
        if (isLoggedIn) {
            DOM.authView.classList.add('hidden');
            DOM.mainContent.classList.remove('hidden');
            DOM.userDisplay.textContent = "Logado";
        } else {
            DOM.mainContent.classList.add('hidden');
            DOM.authView.classList.remove('hidden');
            DOM.userDisplay.textContent = '';
        }
        DOM.loadingIndicator.classList.add('hidden');
    }
}

// ==============================
// MÓDULO EXERCÍCIOS
// ==============================
class ExerciseManager {
    constructor(data = []) {
        this.exercises = data;
    }

    async loadFromAPI() {
        try {
            const response = await fetch('/api/exercises/');
            if (!response.ok) throw new Error('Falha ao carregar dados de exercícios.');
            this.exercises = await response.json();
            console.log("Exercícios carregados:", this.exercises);
        } catch (err) {
            console.error(err);
            this.exercises = [];
        }
    }

    renderFilters() {
        const container = document.getElementById('exercise-filters');
        const categories = ['Todos', ...new Set(this.exercises.map(e => e.category))];
        container.innerHTML = categories.map(cat => `
            <button class="filter-btn ${cat==='Todos'?'active':''}" data-category="${cat}">${cat}</button>
        `).join('');

        container.querySelectorAll('.filter-btn').forEach(btn =>
            btn.addEventListener('click', () => this.filter(btn.getAttribute('data-category')))
        );
    }

    renderGrid(filtered = this.exercises) {
        const grid = document.getElementById('exercise-grid');
        grid.innerHTML = filtered.map(ex => `
            <div class="exercise-card" data-exercise-id="${ex.id}">
                <img src="${ex.image}" alt="${ex.name}" />
                <h3>${ex.name}</h3>
                <p>${ex.category} | Foco: ${ex.focus}</p>
            </div>
        `).join('');

        grid.querySelectorAll('[data-exercise-id]').forEach(item =>
            item.addEventListener('click', e => ModalManager.open('exercise', parseInt(item.dataset.exerciseId)))
        );
    }

    filter(category) {
        this.renderGrid(category === 'Todos' ? this.exercises : this.exercises.filter(e => e.category === category));
    }

    renderRecommendations() {
        const container = document.getElementById('exercises');
        const rec = document.createElement('div');
        rec.classList.add('recommendations');
        rec.innerHTML = `
            <h3>Recomendações Importantes</h3>
            <ul>
                <li><strong>Não force:</strong> Se sentir dor ou desconforto, pare imediatamente.</li>
                <li><strong>Mantenha a postura:</strong> Cabeça e coluna eretas.</li>
                <li><strong>Respire:</strong> Evite prender o ar.</li>
                <li><strong>Segurança:</strong> Apoie-se se necessário.</li>
                <li><strong>Varie os treinos:</strong> Treine no mínimo duas vezes por semana.</li>
            </ul>
        `;
        container.appendChild(rec);
    }
}

// ==============================
// MÓDULO MODAL
// ==============================
class ModalManager {
    static open(type, id = null) {
        DOM.modal.classList.add('opacity-100', 'visible');
        DOM.modal.classList.remove('invisible', 'opacity-0');
        DOM.modal.querySelector('.modal-content').classList.replace('scale-95', 'scale-100');
        DOM.modalBody.innerHTML = '';

        if (type === 'exercise' && id !== null) this.showExercise(id);
        if (type === 'delete') this.showDelete();
    }

    static close() {
        DOM.modal.querySelector('.modal-content').classList.replace('scale-100', 'scale-95');
        DOM.modal.classList.add('invisible', 'opacity-0');
        DOM.modal.classList.remove('opacity-100', 'visible');
    }

    static showExercise(id) {
        const ex = dashboardFacade.exerciseManager.exercises.find(e => e.id === id);
        if (!ex) return;
        DOM.modalTitle.textContent = ex.name;
        DOM.modalBody.innerHTML = `
            <img src="${ex.image}" alt="${ex.name}" class="w-full h-auto object-cover rounded-lg mb-4"/>
            <div class="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><strong>Categoria:</strong> ${ex.category}</p>
                <p><strong>Foco:</strong> ${ex.focus}</p>
                <p><strong>Duração:</strong> ${ex.duration}</p>
                <p><strong>Dificuldade:</strong> ${ex.difficulty}</p>
            </div>
            <p class="mt-4">${ex.description}</p>
        `;
    }

    static showDelete() {
        DOM.modalTitle.textContent = "Confirmação de Exclusão de Conta";
        DOM.modalBody.innerHTML = `
            <p class="text-lg font-semibold text-red-600">Atenção: Esta ação não pode ser desfeita.</p>
            <div class="mt-6 flex justify-end space-x-4">
                <button id="cancel-delete" class="px-4 py-2 bg-gray-200 rounded-lg">Cancelar</button>
                <button id="confirm-delete" class="px-4 py-2 bg-red-600 text-white rounded-lg">Sim, Excluir</button>
            </div>
        `;
        document.getElementById('cancel-delete').addEventListener('click', () => this.close());
        document.getElementById('confirm-delete').addEventListener('click', dashboardFacade.handleDeleteAccount);
    }
}

DOM.modal.addEventListener('click', e => { if (e.target === DOM.modal) ModalManager.close(); });
document.getElementById('modal-close').addEventListener('click', ModalManager.close);

// ==============================
// MÓDULO CHARTS
// ==============================
class ChartManager {
    constructor() {
        this.colors = { primary: '#6B8E23', secondary: '#4A7C59', tertiary: '#A3B18A', gray: '#3D3B3A' };
    }

    renderOverview() {
        const ctx = document.getElementById('overviewChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Análise Clínica', 'Educação e Engajamento', 'Posicionamento Estratégico'],
                datasets: [{ data: [45, 30, 25], backgroundColor: [this.colors.primary, this.colors.secondary, this.colors.tertiary], hoverOffset: 10, borderWidth: 0 }]
            },
            options: { responsive: true, maintainAspectRatio: false, cutout: '70%' }
        });
    }

    renderMarket() {
        const ctx = document.getElementById('marketChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Eficiência Técnica', 'Eficácia Clínica'],
                datasets: [
                    { label: 'IEsporte', data: [95, 90], backgroundColor: this.colors.primary },
                    { label: 'Concorrente A', data: [70, 50], backgroundColor: this.colors.gray },
                    { label: 'Concorrente B', data: [80, 75], backgroundColor: this.colors.secondary }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
}

// ==============================
// FACHADA - DASHBOARD
// ==============================
class DashboardFacade {
    constructor() {
        this.exerciseManager = new ExerciseManager();
        this.chartManager = new ChartManager();
    }

    async initialize(isAuthenticated) {
        UIManager.toggleView(isAuthenticated);
        if (!isAuthenticated) return;

        await this.exerciseManager.loadFromAPI();
        this.chartManager.renderOverview();
        this.chartManager.renderMarket();
        this.exerciseManager.renderFilters();
        this.exerciseManager.renderGrid();
        this.exerciseManager.renderRecommendations();
    }

    async handleDeleteAccount() {
        ModalManager.close();
        UIManager.showMessage("Processando exclusão de conta. Aguarde...", false);

        try {
            const response = await fetch('/delete-account/', {
                method: 'POST',
                headers: { 'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value }
            });

            if (response.ok) {
                UIManager.showMessage("Conta excluída. Redirecionando...", false);
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                UIManager.showMessage(`Erro ao excluir: ${errorData.error || response.statusText}`, true);
            }
        } catch (err) { UIManager.showMessage(`Erro de rede: ${err.message}`, true); }
    }
}

// ==============================
// INICIALIZAÇÃO
// ==============================
const dashboardFacade = new DashboardFacade();

document.addEventListener('DOMContentLoaded', () => {
    const isAuthenticated = !DOM.mainContent.classList.contains('hidden');
    dashboardFacade.initialize(isAuthenticated);
});

DOM.signOutButton.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = '/logout/';
});
DOM.deleteAccountBtn.addEventListener('click', e => ModalManager.open('delete'));



// Melhorar carregamento de imagens com fallback
document.querySelectorAll('.exercise-image').forEach(img => {
    img.addEventListener('error', function() {
        const placeholder = document.createElement('div');
        placeholder.className = 'exercise-image-placeholder';
        placeholder.innerHTML = '🏃';
        this.style.display = 'none';
        this.parentElement.appendChild(placeholder);
    });

    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });

    // Fade in suave
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease-in';
});

// Toggle das exercise details
function toggleExercise(card) {
    const details = card.querySelector('.exercise-details');
    card.classList.toggle('expanded');
    details.classList.toggle('show');
}

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('active');
    });
}

// Fechar sidebar ao clicar em um link
document.querySelectorAll('.exercise-link').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('sidebar').classList.remove('active');
    });
});