// visual_notifications.js
// Sistema de notificações visuais para surdos (sem dependência de som)

class VisualNotificationSystem {
    constructor() {
        this.notificationContainer = this.createContainer();
    }

    createContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
        `;
        document.body.appendChild(container);
        return container;
    }

    notify(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');

        // Estilos baseados no tipo
        const styles = {
            'success': 'bg-green-100 border-l-4 border-green-500 text-green-700',
            'error': 'bg-red-100 border-l-4 border-red-500 text-red-700',
            'warning': 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700',
            'info': 'bg-blue-100 border-l-4 border-blue-500 text-blue-700'
        };

        const icons = {
            'success': '✓',
            'error': '✗',
            'warning': '⚠',
            'info': 'ℹ'
        };

        notification.className = `${styles[type]} p-4 rounded mb-2 shadow-lg`;
        notification.innerHTML = `
            <div class="flex items-start">
                <span class="text-2xl mr-3">${icons[type]}</span>
                <div>
                    <p class="font-semibold">${message}</p>
                    <p class="text-xs opacity-75 mt-1">Pressione ESC para fechar</p>
                </div>
            </div>
        `;

        // Permitir fechar com ESC
        const closeHandler = (e) => {
            if (e.key === 'Escape') {
                notification.remove();
                document.removeEventListener('keydown', closeHandler);
            }
        };
        document.addEventListener('keydown', closeHandler);

        this.notificationContainer.appendChild(notification);

        // Auto-remover após duração
        setTimeout(() => {
            notification.remove();
            document.removeEventListener('keydown', closeHandler);
        }, duration);

        // Animação de entrada
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.transition = 'opacity 0.3s';
            notification.style.opacity = '1';
        }, 10);
    }

    success(message) {
        this.notify(message, 'success');
    }

    error(message) {
        this.notify(message, 'error');
    }

    warning(message) {
        this.notify(message, 'warning');
    }

    info(message) {
        this.notify(message, 'info');
    }
}

// Instância global
const notificationSystem = new VisualNotificationSystem();

// Exemplos de uso:
// notificationSystem.success('Exercício