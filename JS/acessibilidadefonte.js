// ======= CONFIGURAÇÕES =======
const TAMANHO_PADRAO = 16;
let tamanhoAtual = TAMANHO_PADRAO;
const TAMANHO_MAX = 24;
const TAMANHO_MIN = 10;
const PASSO = 2;

// ======= APLICA O TAMANHO =======
function aplicarTamanho(novoTamanho) {
    document.body.style.fontSize = `${novoTamanho}px`;
    tamanhoAtual = novoTamanho;
}
aplicarTamanho(TAMANHO_PADRAO);

// ======= BOTÕES DO MENU =======
document.getElementById('btnAumentar').onclick = () => {
    if (tamanhoAtual < TAMANHO_MAX) aplicarTamanho(tamanhoAtual + PASSO);
};

document.getElementById('btnDiminuir').onclick = () => {
    if (tamanhoAtual > TAMANHO_MIN) aplicarTamanho(tamanhoAtual - PASSO);
};

document.getElementById('btnResetar').onclick = () => {
    aplicarTamanho(TAMANHO_PADRAO);
};

// ======= ABRIR/FECHAR MENU =======
const menu = document.getElementById("acessibilidade-menu");
const botao = document.getElementById("acessibilidade-btn");

botao.addEventListener("click", (e) => {
    e.stopPropagation(); // impede conflito com arrastar
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// ======= FUNÇÃO DE ARRASTAR =======
const widget = document.getElementById("acessibilidade-widget");
let offsetX = 0, offsetY = 0, arrastando = false;

widget.addEventListener("mousedown", (e) => {
    if (e.target === botao) {
        arrastando = true;
        offsetX = e.clientX - widget.offsetLeft;
        offsetY = e.clientY - widget.offsetTop;
    }
});

document.addEventListener("mousemove", (e) => {
    if (arrastando) {
        widget.style.left = (e.clientX - offsetX) + "px";
        widget.style.top = (e.clientY - offsetY) + "px";
    }
});

document.addEventListener("mouseup", () => {
    arrastando = false;
});
