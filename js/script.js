// Ativar Links do Menu

const links = document.querySelectorAll(".header-menu a")

function ativarLink(link) {
  const url = location.href
  const href = link.href
  if (url.includes(href)) {
    link.classList.add("ativo")
  }
}

links.forEach(ativarLink)

// Ativar Items do Orçamento

const parametros = new URLSearchParams(location.search)

function ativarProduto(parametro) {
  const elemento = document.getElementById(parametro)
  if (elemento) {
    elemento.checked = true
  }
}

parametros.forEach(ativarProduto)

// Perguntas Frequentes

const perguntas = document.querySelectorAll(".perguntas button")

function ativarPergunta(event) {
  const pergunta = event.currentTarget
  const controls = pergunta.getAttribute("aria-controls")
  const resposta = document.getElementById(controls)

  resposta.classList.toggle("ativa")
  const ativa = resposta.classList.contains("ativa")
  pergunta.setAttribute("aria-expanded", ativa)
}

function eventosPerguntas(pergunta) {
  pergunta.addEventListener("click", ativarPergunta)
}

perguntas.forEach(eventosPerguntas)

// Galeria de Bicicleta

const galeria = document.querySelectorAll(".bicicleta-imagens img")
const galeriaContainer = document.querySelector(".bicicleta-imagens")

function trocarImagem(event) {
  const img = event.currentTarget
  const media = matchMedia("(min-width: 1000px)").matches
  if (media) {
    galeriaContainer.prepend(img)
  }
}

function eventosGaleria(img) {
  img.addEventListener("click", trocarImagem)
}

galeria.forEach(eventosGaleria)

// Animação

if (window.SimpleAnime) {
  new SimpleAnime()
}

// Cidades & Estados

const urlES = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
const cidade = document.getElementById("cidade")
const estado = document.getElementById("estado")
const optionRemove = document.getElementById("optionRemove")

estado.addEventListener("change", async function () {
  const urlCidades =
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" +
    estado.value +
    "/municipios"
  const request = await fetch(urlCidades)
  const response = await request.json()

  let options = ""
  response.forEach(function (cidades) {
    options += "<option>" + cidades.nome + "</option>"
  })

  cidade.innerHTML = options
})

window.addEventListener("load", async () => {
  const request = await fetch(urlES)
  const response = await request.json()

  const options = document.createElement("optgroup")
  optionRemove.remove()
  options.setAttribute("label", "Escolha seu Estado")
  response.forEach(function (estado) {
    options.innerHTML +=
      `<option value="${estado.sigla}">` + estado.nome + `</option>`
  })

  estado.append(options)
})