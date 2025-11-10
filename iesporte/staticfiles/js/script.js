// ==============================
// VARIÁVEIS GLOBAIS E DOM
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
let exercisesData = [];

// ==============================
// SPINNER E FEEDBACK GLOBAL
// ==============================
function showSpinner() {
    const spinner = document.getElementById("spinner");
    if (spinner) spinner.classList.remove('hidden');
}

function hideSpinner() {
    const spinner = document.getElementById("spinner");
    if (spinner) spinner.classList.add('hidden');
}

function showSnackbar(msg) {
    const bar = document.getElementById('snackbar');
    if (!bar) return;
    document.getElementById('snackbar-message').textContent = msg;
    bar.classList.add('opacity-100');
    setTimeout(() => bar.classList.remove('opacity-100'), 3000);
}

// ==============================
// FALLBACK DE IMAGEM DE EXERCÍCIO
// ==============================
function setupImageFallbacks() {
    document.querySelectorAll('.exercise-image').forEach(img => {
        img.addEventListener('error', function() {
            const placeholder = document.createElement('div');
            placeholder.className = 'exercise-image-placeholder';
            placeholder.innerHTML = '🏃';
            this.style.display = 'none';
            this.parentElement.appendChild(placeholder);
        });
        img.addEventListener('load', function() {
            this.classList.add('loaded');
            const placeholder = this.parentElement.querySelector('.exercise-image-placeholder');
            if (placeholder) placeholder.style.display = 'none';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in';
        if (img.complete) {
            if (img.naturalHeight === 0) {
                img.dispatchEvent(new Event('error'));
            } else {
                img.dispatchEvent(new Event('load'));
            }
        }
    });
}

// ==============================
// TOGGLE DE DETALHES DOS EXERCÍCIOS
// ==============================
function toggleExercise(index) {
    const card = event.currentTarget;
    const details = document.getElementById('exercise-' + index);
    if (!details) return;
    card.classList.toggle('expanded');
    details.classList.toggle('show');
}

// ==============================
// BUSCA/FILTRO DINÂMICO DE CARDS
// ==============================
function filtrarCards() {
    const val = document.getElementById('filtro-exercicio').value.trim().toLowerCase();
    let encontrou = false;

    document.querySelectorAll('.exercise-card').forEach(card => {
        const texto = card.innerText.toLowerCase();
        const exibe = (texto.includes(val) || val === "");
        card.style.display = exibe ? '' : 'none';
        if (exibe) encontrou = true;
    });

    let msg = document.getElementById('nenhum-exercicio-msg');
    if (!msg) {
        msg = document.createElement('div');
        msg.id = 'nenhum-exercicio-msg';
        msg.className = 'text-red-500 text-center mt-6 font-semibold';
        msg.textContent = 'Exercício não encontrado';
        const grid = document.querySelector('.grid');
        grid.parentElement.appendChild(msg);
    }
    msg.style.display = encontrou ? 'none' : '';
}


// ==============================
// TUTORIAL/AJUDA MODAL (primeiro acesso)
// ==============================
window.onload = function() {
    const tutorial = document.getElementById('ajuda-modal');
    if (tutorial && !localStorage.getItem("tutorial-visto")) {
        tutorial.classList.remove('hidden');
        localStorage.setItem("tutorial-visto", "sim");
    }
}

// ==============================
// INICIALIZAÇÃO DOMContentLoaded
// ==============================
document.addEventListener('DOMContentLoaded', function() {
    setupImageFallbacks();

    // Menu mobile toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Fechar sidebar ao clicar em link
    document.querySelectorAll('.exercise-link').forEach(link => {
        link.addEventListener('click', function() {
            if (sidebar) sidebar.classList.remove('active');
        });
    });

    // Saída rápida (eventos de autenticação, se existirem)
    if (DOM.signOutButton) {
        DOM.signOutButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '/logout/';
        });
    }
    if (DOM.deleteAccountBtn) {
        DOM.deleteAccountBtn.addEventListener('click', function() {
            ModalManager.open('delete');
        });
    }
});