// ========================================
// ATP QUEST - SALVE A CÉLULA
// Desenvolvido por ChatGPT
// ========================================

// -------------------------
// BANCO DE ELEMENTOS
// -------------------------

const audioAcerto=document.getElementById("audioAcerto");

const audioErro=document.getElementById("audioErro");

const audioVitoria=document.getElementById("audioVitoria");

const musica=document.getElementById("musica");
const fase = document.getElementById("fase");
const pergunta = document.getElementById("pergunta");
const alternativas = document.getElementById("alternativas");

const explicacao = document.getElementById("explicacao");

const atpTexto = document.getElementById("atp");
const vidasTexto = document.getElementById("vidas");
const pontosTexto = document.getElementById("pontos");

const barraATP = document.getElementById("progresso");
const barraPerguntas = document.getElementById("progressoPerguntas");

const cronometro = document.getElementById("cronometro");

const botaoResponder = document.getElementById("btnResponder");

// -------------------------
// VARIÁVEIS
// -------------------------

let indicePergunta = 0;

let respostaSelecionada = null;

let atp = 0;

let vidas = 3;

let pontos = 0;

let tempo = 120;

let intervalo;

// -------------------------
// INICIAR JOGO
// -------------------------

function iniciarJogo(){

    indicePergunta = 0;

    respostaSelecionada = null;

    atp = 0;

    vidas = 3;

    pontos = 0;

let acertos = 0;

let erros = 0;

let medalha = "";

const recorde = Number(localStorage.getItem("recordeATP")) || 0;

    tempo = 120;

    atualizarPainel();

    iniciarCronometro();

    carregarPergunta();

}

window.onload=()=>{

setTimeout(()=>{

document.getElementById("loading").style.display="none";

},2000);

}

// -------------------------
// PAINEL
// -------------------------

function atualizarPainel(){

    atpTexto.innerHTML = atp;

    vidasTexto.innerHTML = vidas;

    pontosTexto.innerHTML = pontos;

    barraATP.style.width = atp + "%";

    barraPerguntas.style.width =
    ((indicePergunta/perguntas.length)*100)+"%";

}

// -------------------------
// CRONÔMETRO
// -------------------------

function iniciarCronometro(){

    clearInterval(intervalo);

    intervalo = setInterval(()=>{

        tempo--;

        let minutos=Math.floor(tempo/60);

        let segundos=tempo%60;

        if(segundos<10){

            segundos="0"+segundos;

        }

        cronometro.innerHTML=

        minutos+":"+segundos;

        if(tempo<=0){

            clearInterval(intervalo);

            derrota();

        }

    },1000);

}

if(tempo<=30){

    cronometro.style.color="red";

}

// -------------------------
// CARREGAR PERGUNTA
// -------------------------

function carregarPergunta(){

    respostaSelecionada=null;

    explicacao.innerHTML="";

    const atual=perguntas[indicePergunta];

    fase.innerHTML="🧬 "+atual.fase;

    pergunta.innerHTML=atual.pergunta;

    alternativas.innerHTML="";

    atual.alternativas.forEach((texto,indice)=>{

        const botao=document.createElement("button");

        botao.className="alternativa";

        botao.innerHTML=texto;

        botao.onclick=()=>selecionar(indice);

        alternativas.appendChild(botao);

    });

}

// -------------------------
// SELECIONAR
// -------------------------

function selecionar(indice){

    respostaSelecionada=indice;

    document.querySelectorAll(".alternativa")

    .forEach(botao=>{

        botao.classList.remove("selecionada");

    });

    document.querySelectorAll(".alternativa")[indice]

    .classList.add("selecionada");

}

function animacao(texto, cor){

    const efeito = document.createElement("div");

    efeito.innerHTML = texto;

    efeito.style.position = "fixed";
    efeito.style.left = "50%";
    efeito.style.top = "45%";
    efeito.style.transform = "translate(-50%,-50%)";
    efeito.style.fontSize = "48px";
    efeito.style.fontWeight = "bold";
    efeito.style.color = cor;
    efeito.style.zIndex = "9999";
    efeito.style.pointerEvents = "none";
    efeito.style.transition = "all .8s";

    document.body.appendChild(efeito);

    setTimeout(()=>{

        efeito.style.top="20%";
        efeito.style.opacity="0";

    },50);

    setTimeout(()=>{

        efeito.remove();

    },900);

}

// =======================================
// VERIFICAR RESPOSTA
// =======================================

function verificarResposta() {

    // Verifica se o jogador selecionou uma alternativa
    if (respostaSelecionada === null) {

        alert("Selecione uma alternativa!");

        return;

    }

    const atual = perguntas[indicePergunta];

    const botoes = document.querySelectorAll(".alternativa");

    // Desabilita os botões para impedir múltiplos cliques
    botoes.forEach(botao => {

        botao.disabled = true;

    });

    // -------------------------
    // RESPOSTA CORRETA
    // -------------------------

acertos++;

animacao("+10 ATP", "#00ff88");

    if (respostaSelecionada === atual.correta) {

        botoes[respostaSelecionada].style.background = "#16a34a";

        atp += 10;

        pontos += 10;

        if (atp > 100) {

            atp = 100;

        }

        explicacao.innerHTML = `
            <h3>✅ Correto!</h3>
            <p>${atual.explicacao}</p>
        `;

    }

audioAcerto.play();

    // -------------------------
    // RESPOSTA ERRADA
    // -------------------------

erros++;

animacao("-1 Vida", "#ff3b3b");

    else {

        vidas--;

        botoes[respostaSelecionada].style.background = "#dc2626";

        botoes[atual.correta].style.background = "#16a34a";

        explicacao.innerHTML = `
            <h3>❌ Resposta incorreta</h3>

            <p><strong>Resposta correta:</strong>
            ${atual.alternativas[atual.correta]}</p>

            <br>

            <p>${atual.explicacao}</p>
        `;

    }

    atualizarPainel();

    // Aguarda 3 segundos antes da próxima pergunta
    setTimeout(proximaPergunta, 3000);

}

audioErro.play();

// =======================================
// PRÓXIMA PERGUNTA
// =======================================

function proximaPergunta() {

    indicePergunta++;

    // Vitória por ATP máximo
    if (atp >= 100) {

        vitoria();

        return;

    }

    // Derrota por vidas
    if (vidas <= 0) {

        derrota();

        return;

    }

    // Acabaram as perguntas
    if (indicePergunta >= perguntas.length) {

        vitoria();

        return;

    }

    atualizarPainel();

    carregarPergunta();

}

// -------------------------

botaoResponder.addEventListener("click",verificarResposta);

// -------------------------

iniciarJogo();

// =======================================
// VITÓRIA
// =======================================

function vitoria() {

    clearInterval(intervalo);

if(pontos>recorde){

    localStorage.setItem("recordeATP",pontos);

}

document.getElementById("quiz").innerHTML=`

<div class="resultado">

<h1>🏆 MISSÃO CONCLUÍDA</h1>

<h2>ATP Restaurado!</h2>

<br>

<p>⚡ ATP: ${atp}</p>

<p>🏆 Pontos: ${pontos}</p>

<p>✅ Acertos: ${acertos}</p>

<p>❌ Erros: ${erros}</p>

<p>🏅 Medalha: ${calcularMedalha()}</p>

<p>⭐ Recorde: ${Math.max(recorde,pontos)}</p>

<br>

<button onclick="location.reload()">

Jogar Novamente

</button>

</div>

`;

confete();

audioVitoria.play();

musica.pause();

<div class="certificado">

<h1>

CERTIFICADO

</h1>

<p>

Parabéns!

</p>

<p>

Você concluiu com sucesso a missão sobre

Metabolismo Energético.

</p>

<p>

Pontuação:

${pontos}

</p>

<p>

ATP Produzido:

${atp}

</p>

</div>

// =======================================
// DERROTA
// =======================================

function derrota() {

    clearInterval(intervalo);

    document.getElementById("quiz").innerHTML = `

        <div class="resultado">

            <h1>💀 GAME OVER</h1>

            <h2>A célula ficou sem energia.</h2>

            <br>

            <button onclick="location.reload()">

                Tentar Novamente

            </button>

        </div>

    `;

}

function calcularMedalha(){

    if(pontos>=100){

        return "🥇 OURO";

    }

    if(pontos>=70){

        return "🥈 PRATA";

    }

    if(pontos>=40){

        return "🥉 BRONZE";

    }

    return "📖 PARTICIPANTE";

}

function confete(){

    for(let i=0;i<120;i++){

        const c=document.createElement("div");

        c.innerHTML="🎉";

        c.style.position="fixed";

        c.style.left=Math.random()*100+"vw";

        c.style.top="-30px";

        c.style.fontSize=(15+Math.random()*25)+"px";

        c.style.transition="3s linear";

        document.body.appendChild(c);

        setTimeout(()=>{

            c.style.top="100vh";

        },50);

        setTimeout(()=>{

            c.remove();

        },3200);

    }

}

document.getElementById("btnComecar")

.addEventListener("click",()=>{

musica.volume=.25;

musica.play();

});

let ligado=true;

document.getElementById("som")

.onclick=()=>{

ligado=!ligado;

musica.muted=!ligado;

audioAcerto.muted=!ligado;

audioErro.muted=!ligado;

audioVitoria.muted=!ligado;

document.getElementById("som").innerHTML=

ligado?"🔊":"🔇";

}

let ranking=

JSON.parse(localStorage.getItem("rankingATP"))||[];

ranking.push(pontos);

ranking.sort((a,b)=>b-a);

ranking=ranking.slice(0,5);

localStorage.setItem(

"rankingATP",

JSON.stringify(ranking)

);