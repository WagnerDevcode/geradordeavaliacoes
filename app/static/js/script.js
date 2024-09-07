document.addEventListener("DOMContentLoaded", function () {
  fetch("/questoes")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("questoes-container");
      data.forEach((questao, index) => {
        const div = document.createElement("div");
        div.classList.add("questao");
        div.innerHTML = `
                  <input type="checkbox" name="questoes" value="${questao.id}">
                  <h3>${questao.enunciado}</h3>
                  <p><strong>Alternativas:</strong> ${questao.alternativas.join(
                    ", "
                  )}</p>
              `;
        container.appendChild(div);
      });
    })
    .catch((error) => console.error("Erro ao carregar as questões:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os cards e caixas de seleção
  const cards = document.querySelectorAll(".visualizador-card");

  cards.forEach((card) => {
    const checkbox = card.querySelector('input[type="checkbox"]');

    // Adiciona um evento de alteração à caixa de seleção
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        card.classList.add("selected");
      } else {
        card.classList.remove("selected");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const alertMessage =
    "{{ get_flashed_messages(category_filter=['danger'])|first }}";
  if (alertMessage) {
    document.getElementById("alertMessage").textContent = alertMessage;
    $("#alertModal").modal("show"); // Use o modal do Bootstrap para exibir o alerta
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastro-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = new URLSearchParams();

    formData.forEach((value, key) => {
      data.append(key, value);
    });

    fetch(form.action, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // Handle success here
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error here
      });
  });
  // JavaScript
  function showOptions(name) {
    document.getElementById("evaluation-name").value = name;
    document.getElementById("options-modal").style.display = "block";
  }

  function closeModal() {
    document.getElementById("options-modal").style.display = "none";
  }

  function generateFile(type) {
    const name = document.getElementById("evaluation-name").value;

    // Requisição para o backend para gerar o arquivo
    fetch(`/gerar_arquivo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: name,
        tipo: type,
      }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Cria um link temporário para o download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${name.split(".")[0]}.${type}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Erro ao gerar o arquivo:", error);
      });

    closeModal();
  }
});

function gerarArquivo(tipo) {
  // Obtém os dados da avaliação
  const nomeAvaliacao = document.getElementById("nomeAvaliacao").value;
  const imagemCabecalho = document.getElementById("imagemCabecalho").files[0]; // Obtém o arquivo de imagem
  const formato = tipo === "pdf" ? "pdf" : "docx";

  const formData = new FormData();
  formData.append("nome", nomeAvaliacao);
  formData.append("imagemCabecalho", imagemCabecalho);
  formData.append("formato", formato);

  fetch("/gerar_arquivo", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${nomeAvaliacao}.${formato}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch((error) => console.error("Erro ao gerar o arquivo:", error));
}
