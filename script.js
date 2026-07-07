// ===============================
// MISSÃO METABOLISMO ENERGÉTICO
// Desenvolvido por ChatGPT
// ===============================

// ---------- VARIÁVEIS ----------

let perguntaAtual = 0;
let respostaSelecionada = null;

let atp = 0;
let vidas = 3;
let pontos = 0;

const ATP_MAX = 100;

// ---------- ELEMENTOS ----------

const fase = document.getElementById("fase");
const pergunta = document.getElementById("pergunta");
const alternativas = document.getElementById("alternativas");

const explicacao = document.getElementById("explicacao");

const atpTexto = document.getElementById("atp");
const vidasTexto = document.getElementById("vidas");
const pontosTexto = document.getElementById("pontos");

const barra = document.getElementById("progresso");

const botao = document.getElementById("btnResponder");

// ----------------------------

function iniciarJogo(){

    perguntaAtual = 0;

    atp = 0;

    vidas = 3;

    pontos = 0;

    atualizarPainel();

    carregarPergunta();

}

// ----------------------------

function atualizarPainel(){

    atpTexto.innerHTML = atp;

    vidasTexto.innerHTML = vidas;

    pontosTexto.innerHTML = pontos;

    barra.style.width = atp + "%";

}

// ----------------------------

function carregarPergunta(){

    respostaSelecionada = null;

    explicacao.innerHTML = "";

    const p = perguntas[perguntaAtual];

    fase.innerHTML = "🧬 " + p.fase;

    pergunta.innerHTML = p.pergunta;

    alternativas.innerHTML = "";

    p.alternativas.forEach((texto,index)=>{

        const botaoAlt = document.createElement("button");

        botaoAlt.className = "alternativa";

        botaoAlt.innerHTML = texto;

        botaoAlt.onclick = ()=>{

            selecionar(index);

        };

        alternativas.appendChild(botaoAlt);

    });

}

// ----------------------------

function selecionar(indice){

    respostaSelecionada = indice;

    const botoes = document.querySelectorAll(".alternativa");

    botoes.forEach(btn=>{

        btn.classList.remove("selecionada");

    });

    botoes[indice].classList.add("selecionada");

}

// ----------------------------

botao.addEventListener("click", verificarResposta);

// ----------------------------

iniciarJogo();