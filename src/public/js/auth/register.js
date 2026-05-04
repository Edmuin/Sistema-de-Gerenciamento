/**
 * Script de Autenticação - Registro
 * Integra com API de registro de novos usuários
 */

class RegisterManager {
  constructor() {
    this.form = document.querySelector('form[data-validate]');
    this.init();
  }

  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleRegister(e));
      this.setupInputs();
    }
  }

  /**
   * Setup dos campos de entrada
   */
  setupInputs() {
    const inputs = this.form.querySelectorAll('input[required]');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  /**
   * Validar campo individual
   */
  validateField(field) {
    const name = field.getAttribute('name') || field.id;
    const value = field.value.trim();

    switch (name) {
      case 'fullname':
      case 'name':
        return this.validateName(field);
      case 'email':
        return this.validateEmail(field);
      case 'password':
        return this.validatePassword(field);
      case 'password_confirm':
        return this.validatePasswordConfirm(field);
      default:
        return true;
    }
  }

  /**
   * Validar nome
   */
  validateName(field) {
    const name = field.value.trim();
    
    if (name.length < 3) {
      this.showError(field, 'Nome deve ter pelo menos 3 caracteres');
      return false;
    }
    
    if (!/^[a-zA-ZáéíóúãõüçÁÉÍÓÚÃÕÜÇ\s]+$/.test(name)) {
      this.showError(field, 'Nome deve conter apenas letras');
      return false;
    }
    
    this.clearError(field);
    return true;
  }

  /**
   * Validar email
   */
  validateEmail(field) {
    const email = field.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      this.showError(field, 'Email inválido');
      return false;
    }
    
    this.clearError(field);
    return true;
  }

  /**
   * Validar password
   */
  validatePassword(field) {
    const password = field.value;
    
    if (password.length < 6) {
      this.showError(field, 'Password deve ter pelo menos 6 caracteres');
      return false;
    }
    
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      this.showError(field, 'Password deve conter maiúscula, minúscula e número');
      return false;
    }
    
    this.clearError(field);
    
    // Validar confirmação se preenchida
    const confirmField = this.form.querySelector('input[name="password_confirm"], input[name="confirm_password"]');
    if (confirmField && confirmField.value) {
      this.validatePasswordConfirm(confirmField);
    }
    
    return true;
  }

  /**
   * Validar confirmação de password
   */
  validatePasswordConfirm(field) {
    const password = this.form.querySelector('input[name="password"], input[id="password"]')?.value || '';
    const confirm = field.value;
    
    if (confirm && password !== confirm) {
      this.showError(field, 'Passwords não coincidem');
      return false;
    }
    
    if (confirm) {
      this.clearError(field);
    }
    return true;
  }

  /**
   * Handle do formulário de registro
   */
  async handleRegister(e) {
    e.preventDefault();

    // Validar todos os campos
    const inputs = this.form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      alert('Por favor, corrija os erros no formulário');
      return;
    }

    // Coletar dados
    const name = this.form.querySelector('input[name="fullname"], input[id="fullname"]')?.value.trim() ||
                 this.form.querySelector('input[name="name"]')?.value.trim();
    const email = this.form.querySelector('input[name="email"], input[id="email"]')?.value.trim();
    const password = this.form.querySelector('input[name="password"], input[id="password"]')?.value;
    const roleId = this.form.querySelector('select[name="role_id"]')?.value;

    // Desabilitar botão enquanto processa
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Criando conta...';

    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirm: this.form.querySelector('input[name="password_confirm"], input[id="password_confirm"]')?.value || password,
          role_id: roleId
        })
      });

      const data = await response.json();

      if (response.ok && data.data) {
        console.log('✅ Registro bem-sucedido!', data.data);
        
        this.showSuccess('Conta criada com sucesso! Redirecionando para login...');
        
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 2000);
      } else {
        const errorMsg = data.message || 'Falha ao criar conta';
        this.showFormError(errorMsg);
        console.error('❌ Erro de registro:', data);
      }
    } catch (error) {
      console.error('❌ Erro na requisição:', error);
      this.showFormError('Erro ao conectar ao servidor. Tente novamente.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  /**
   * Mostrar erro em campo
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
   * Limpar erro
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
    
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 5000);
  }

  /**
   * Mostrar sucesso
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
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  window.registerManager = new RegisterManager();
});
