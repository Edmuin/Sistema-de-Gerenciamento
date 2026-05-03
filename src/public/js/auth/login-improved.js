/**
 * Script de Autenticação - Login
 * Integra com API de autenticação JWT
 */

class LoginManager {
  constructor() {
    this.form = document.getElementById('loginForm');
    this.emailInput = document.getElementById('email');
    this.passwordInput = document.getElementById('password');
    this.submitBtn = this.form?.querySelector('button[type="submit"]');
    
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleLogin(e));
      this.setupValidation();
      this.setupPasswordToggle();
    }
    
    this.checkExistingToken();
  }

  /**
   * Verifica se já há token válido
   */
  checkExistingToken() {
    const token = localStorage.getItem('token');
    if (token) {
      // Redireciona para página principal se já tem token
      window.location.href = '/';
    }
  }

  /**
   * Setup de validação em tempo real
   */
  setupValidation() {
    this.emailInput?.addEventListener('blur', () => this.validateEmail());
    this.passwordInput?.addEventListener('blur', () => this.validatePassword());
  }

  /**
   * Validar email
   */
  validateEmail() {
    const email = this.emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      this.showError(this.emailInput, 'Email inválido');
      return false;
    }
    
    this.clearError(this.emailInput);
    return true;
  }

  /**
   * Validar password
   */
  validatePassword() {
    const password = this.passwordInput.value;
    
    if (password.length < 6) {
      this.showError(this.passwordInput, 'Password deve ter pelo menos 6 caracteres');
      return false;
    }
    
    this.clearError(this.passwordInput);
    return true;
  }

  /**
   * Setup toggle de password
   */
  setupPasswordToggle() {
    const toggleBtns = document.querySelectorAll('.password-toggle');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        if (input.type === 'password') {
          input.type = 'text';
          btn.textContent = '👁️‍🗨️';
        } else {
          input.type = 'password';
          btn.textContent = '👁️';
        }
      });
    });
  }

  /**
   * Handle do formulário de login
   */
  async handleLogin(e) {
    e.preventDefault();

    // Validar
    if (!this.validateEmail() || !this.validatePassword()) {
      alert('Por favor, corrija os erros no formulário');
      return;
    }

    const email = this.emailInput.value.trim();
    const password = this.passwordInput.value;

    // Desabilitar botão enquanto processa
    this.setSubmitLoading(true);

    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

        if (response.ok && data.data.token) {
        // Guardar token e dados do usuário
        const roleId = data.data.user?.role_id;
        const roleNames = {
          1: 'Admin',
          2: 'Coordenador',
          2.5: 'Orientador',
          3: 'Aluno'
        };
        const normalizedRoleId = roleId !== undefined ? String(roleId) : '3';
        const userRole = data.data.user?.role || roleNames[normalizedRoleId] || 'Usuário';
        const userWithRole = {
          ...data.data.user,
          role_id: normalizedRoleId,
          role: userRole,
        };
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(userWithRole));
        console.log('✅ Login bem-sucedido!', userWithRole);
        
        // Mostrar sucesso e redirecionar
        this.showSuccess('Login realizado com sucesso! Redirecionando...');
        
        // Redirecionar para o dashboard específico do papel
        const role = userWithRole.role || roleNames[String(userWithRole.role_id)] || 'Usuário';
        const dashboards = {
          'Aluno': '/aluno/dashboard',
          'Orientador': '/orientador/dashboard',
          'Coordenador': '/coordenador/dashboard',
          'Admin': '/admin/dashboard'
        };
        
        const redirectUrl = dashboards[role] || '/dashboard';
        
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 1500);
      } else {
        // Erro de autenticação
        const errorMsg = data.message || 'Falha ao fazer login';
        this.showFormError(errorMsg);
        console.error('❌ Erro de login:', data);
      }
    } catch (error) {
      console.error('❌ Erro na requisição:', error);
      this.showFormError('Erro ao conectar ao servidor. Tente novamente.');
    } finally {
      this.setSubmitLoading(false);
    }
  }

  /**
   * Mostrar erro em campo específico
   */
  showError(element, message) {
    element.classList.add('input-error');
    
    let errorDiv = element.parentElement.querySelector('.error-message');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      element.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
  }

  /**
   * Limpar erro de campo
   */
  clearError(element) {
    element.classList.remove('input-error');
    const errorDiv = element.parentElement.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  /**
   * Mostrar erro de formulário
   */
  showFormError(message) {
    let errorDiv = document.querySelector('.form-error');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'form-error';
      this.form.insertBefore(errorDiv, this.form.firstChild);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Remover após 5 segundos
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 5000);
  }

  /**
   * Mostrar mensagem de sucesso
   */
  showSuccess(message) {
    let successDiv = document.querySelector('.form-success');
    if (!successDiv) {
      successDiv = document.createElement('div');
      successDiv.className = 'form-success';
      this.form.insertBefore(successDiv, this.form.firstChild);
    }
    
    successDiv.textContent = message;
    successDiv.style.display = 'block';
  }

  /**
   * Setar estado de loading do botão
   */
  setSubmitLoading(loading) {
    if (loading) {
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = '<span class="spinner"></span> Entrando...';
    } else {
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = 'Entrar';
    }
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.loginManager = new LoginManager();
});
