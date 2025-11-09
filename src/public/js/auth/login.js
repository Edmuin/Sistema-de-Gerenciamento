document.addEventListener("DOMContentLoaded", async () => {
  const roleList = document.getElementById("roles");

  // podes criar esta rota JSON
  const response = await fetch("/roles"); 
  const roles = await response.json();

  roles.forEach(role => {
    const newOption = document.createElement("option");
    newOption.setAttribute("value", `${role.id}`);
    newOption.innerHTML = `${role.nome}`;
    roleList.append(newOption);
  })
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const tipo = document.getElementById('roles').value;

    if (usuario && tipo) {
        // Guardar login localmente
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('tipo', tipo);

        // Redirecionar
        window.location.href = '/';
    } else {
        alert("Preencha todos os campos.");
    }
});