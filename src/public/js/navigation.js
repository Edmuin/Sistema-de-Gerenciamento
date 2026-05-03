/**
 * Sistema de Navegação e Autenticação
 * Gerencia links entre login, registro e páginas principais
 */

class NavegacaoSistema {
  constructor() {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
    this.init();
  }

  init() {
    this.setupNavigation();
    this.checkAuth();
    this.setupLogout();
  }

  /**
   * Verifica se usuário está autenticado
   */
  checkAuth() {
    const publicPages = ['/auth/login', '/auth/register', '/'];
    const currentPage = window.location.pathname;
    
    // Se não tem token e não está em página pública, redireciona para login
    if (!this.token && !publicPages.includes(currentPage)) {
      window.location.href = '/auth/login';
    }
  }

  /**
   * Setup da navegação principal
   */
  setupNavigation() {
    // Botão de logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }

    // Breadcrumb de página
    this.updatePageInfo();
  }

  /**
   * Atualiza informações da página com rol do usuário
   */
  updatePageInfo() {
    if (!this.user) return;

    const header = document.querySelector('header');
    if (header) {
      const userInfo = document.createElement('div');
      userInfo.className = 'user-info';
      userInfo.innerHTML = `
        <span class="user-role">${this.getRoleName(this.user.role_id)}</span>
        <span class="user-name">${this.user.name || this.user.email}</span>
      `;
      header.appendChild(userInfo);
    }
  }

  /**
   * Converte ID de role para nome legível
   */
  getRoleName(roleId) {
    const roles = {
      1: 'Admin',
      2: 'Coordenador',
      2.5: 'Orientador',
      3: 'Aluno'
    };
    return roles[roleId] || 'Usuário';
  }

  /**
   * Faz logout e limpa dados
   */
  logout() {
    if (confirm('Tem a certeza que deseja sair?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }
  }

  /**
   * Navega para página com base em role
   */
  navigateByRole() {
    if (!this.user) {
      window.location.href = '/auth/login';
      return;
    }

    const rolePages = {
      1: '/admin/dashboard',      // Admin
      2: '/coordenador/dashboard', // Coordenador
      2.5: '/orientador/dashboard', // Orientador
      3: '/aluno/dashboard'        // Aluno
    };

    const page = rolePages[this.user.role_id] || '/';
    window.location.href = page;
  }

  /**
   * Obtém headers com autenticação
   */
  getAuthHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    };
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.nav = new NavegacaoSistema();
});

// Exportar para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavegacaoSistema;
}
