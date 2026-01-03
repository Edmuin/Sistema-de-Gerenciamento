const link_login = document.getElementById("link_login");

document.addEventListener("DOMContentLoaded", async () => {
  const roleList = document.getElementById("role");

  // podes criar esta rota JSON
  const response = await fetch("/role"); 
  const roles = await response.json();

  roles.forEach(role => {
    const newOption = document.createElement("option");
    newOption.setAttribute("value", `${role.nome}`);
    newOption.innerHTML = `${role.nome}`;
    roleList.append(newOption);
  })
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const role = document.getElementById('roles').value;

    if (usuario && role) {
        // Guardar login localmente
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('role', role);

        // Redirecionar
        window.location.href = '/';
    } else {
        alert("Preencha todos os campos.");
    }
});

link_login.addEventListener("click", (ev) => {
  ev.preventDefault();
  window.location.href = "/auth/form-login";
});