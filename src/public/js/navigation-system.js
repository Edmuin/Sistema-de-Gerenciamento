/**
 * NavigacaoSistema - Sistema de Navegação Centralizado
 * Gerencia a navegação entre páginas baseado em autenticação e papel de usuário
 */
class NavigacaoSistema {
    constructor() {
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
        this.init();
    }

    /**
     * Inicializa o sistema de navegação
     */
    init() {
        // Redirecionar usuário não autenticado para login
        if (!this.isAuthenticated() && !this.isAuthPage()) {
            window.location.href = '/auth/login';
            return;
        }

        // Redirecionar usuário autenticado da página de login
        if (this.isAuthenticated() && this.isAuthPage()) {
            this.redirectToDashboard();
            return;
        }

        // Atualizar interface com informações do usuário
        this.updateUI();

        // Adicionar listener para logout
        this.setupLogout();
    }

    /**
     * Verifica se o usuário está autenticado
     */
    isAuthenticated() {
        return !!this.token && !!this.user;
    }

    /**
     * Verifica se está na página de autenticação
     */
    isAuthPage() {
        const pathname = window.location.pathname;
         return pathname.includes('/auth/') || 
               pathname.includes('/auth/login') || 
               pathname === '/' ||
               pathname.includes('/register');
    }

    /**
     * Redireciona para o dashboard específico do usuário
     */
    redirectToDashboard() {
        const role = this.user?.role;
        const dashboards = {
            'Aluno': '/aluno/dashboard',
            'Orientador': '/orientador/dashboard',
            'Coordenador': '/coordenador/dashboard',
            'Admin': '/admin/dashboard'
        };

        const target = dashboards[role] || '/dashboard';
        window.location.href = target;
    }

    /**
     * Atualiza a interface com informações do usuário
     */
    updateUI() {
        const userInfo = document.getElementById('userInfo');
        const welcomeTitle = document.getElementById('welcomeTitle');

        if (userInfo) {
            userInfo.innerHTML = `
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="text-align: right;">
                        <div style="font-weight: 600; color: #333;">${this.user?.name || this.user?.email}</div>
                        <div style="font-size: 0.85rem; color: #666;">${this.user?.role || 'Usuário'}</div>
                    </div>
                    <div style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">
                        ${this.getInitials(this.user?.name || this.user?.email)}
                    </div>
                </div>
            `;
        }

        if (welcomeTitle) {
            welcomeTitle.textContent = `Bem-vindo, ${this.user?.name || this.user?.email}!`;
        }
    }

    /**
     * Obtém as iniciais do nome do usuário
     */
    getInitials(name) {
        if (!name) return 'U';
        const parts = name.split(' ');
        return parts.map(p => p[0]).join('').substring(0, 2).toUpperCase();
    }

    /**
     * Configura o logout
     */
    setupLogout() {
        const logoutBtns = document.querySelectorAll('.logout-btn, [onclick="logout()"]');
        logoutBtns.forEach(btn => {
            btn.addEventListener('click', () => this.logout());
        });
    }

    /**
     * Realiza logout do usuário
     */
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
    }

    /**
     * Obtém headers de autenticação
     */
    getAuthHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        };
    }

    /**
     * Faz requisição autenticada
     */
    async fetchAuth(url, options = {}) {
        return fetch(url, {
            ...options,
            headers: {
                ...this.getAuthHeaders(),
                ...options.headers
            }
        });
    }

    /**
     * Verifica se o usuário tem uma role específica
     */
    hasRole(role) {
        return this.user?.role === role;
    }

    /**
     * Verifica se o usuário tem qualquer uma das roles especificadas
     */
    hasAnyRole(roles) {
        return roles.includes(this.user?.role);
    }

    /**
     * Navega para uma página (com verificação de autenticação)
     */
    navigate(url) {
        if (this.isAuthenticated()) {
            window.location.href = url;
        } else {
            window.location.href = '/auth/login';
        }
    }

    /**
     * Exibe notificação ao usuário
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#667eea'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            animation: slideIn 0.3s ease-in;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar no carregamento
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new NavigacaoSistema();
    });
} else {
    new NavigacaoSistema();
}
