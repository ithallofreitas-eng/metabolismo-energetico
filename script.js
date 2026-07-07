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

function verificarResposta(){

    // Verifica se o jogador escolheu uma alternativa
    if(respostaSelecionada === null){

        alert("Selecione uma alternativa!");

        return;

    }

    const p = perguntas[perguntaAtual];

    // RESPOSTA CORRETA
    if(respostaSelecionada === p.correta){

        atp += 10;

        pontos += 10;

        if(atp > ATP_MAX){

            atp = ATP_MAX;

        }

        explicacao.innerHTML =
        "✅ <b>Correto!</b><br><br>" +
        p.explicacao;

    }

    // RESPOSTA ERRADA
    else{

        vidas--;

        explicacao.innerHTML =
        "❌ <b>Resposta incorreta.</b><br><br>" +
        "Resposta correta: <b>" +
        p.alternativas[p.correta] +
        "</b><br><br>" +
        p.explicacao;

    }

    atualizarPainel();

    // Aguarda 2 segundos antes de passar para a próxima pergunta

    setTimeout(()=>{

        perguntaAtual++;

        // Vitória
        if(atp >= ATP_MAX){

            telaVitoria();

            return;

        }

        // Derrota
        if(vidas <= 0){

            telaDerrota();

            return;

        }

        // Próxima pergunta
        if(perguntaAtual < perguntas.length){

            carregarPergunta();

        }else{

            telaVitoria();

        }

    },2000);

}

// ----------------------------

botao.addEventListener("click", verificarResposta);

// ----------------------------

iniciarJogo();