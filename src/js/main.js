/* Conexão com banco de dados */
document.getElementById("clienteForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    contato: {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
    },
    cpf: document.getElementById("cpf").value,
    nascimento: document.getElementById("nascimento").value,
    endereco: {
      cep: document.getElementById("cep").value,
      logradouro: document.getElementById("logradouro").value,
      complemento: "",
      bairro: document.getElementById("bairro").value,
      cidade: document.getElementById("cidade").value,
    },
  };

  fetch("http://localhost:8080/liv-api/domain/cliente/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      alert("Cliente cadastrado com sucesso!");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Erro ao cadastrar cliente.");
    });
});

document.getElementById("loadClientes").addEventListener("click", function () {
  fetch("http://localhost:8080/liv-api/domain/cliente")
    .then((response) => response.json())
    .then((data) => {
      const clientesList = document.getElementById("clientesList");
      clientesList.innerHTML = ""; // Limpa a lista antes de preencher

      data.forEach((cliente) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${cliente.contato.nome} - ${cliente.contato.email} - ${cliente.cpf}`;
        clientesList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Erro ao carregar clientes.");
    });
});
