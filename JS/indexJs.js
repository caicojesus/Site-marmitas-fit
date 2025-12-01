document.addEventListener("DOMContentLoaded", function () {
  const searchToggle = document.getElementById("search-toggle");
  const searchContainer = document.getElementById("search-container");
  const loginBtn = document.getElementById("login-btn");
  const popup = document.getElementById("popup-overlay");
  const popupClose = document.getElementById("popup-close");
  const formLogin = document.getElementById("formLogin");
  const erroLogin = document.getElementById("erroLogin");
  const loginFormContainer = document.getElementById("login-form");
  const btnLimpar = document.getElementById("btn-limpar-login");
  const btnMostrarLogin = document.getElementById("btn-login-popup");
  const btnRegistrar = document.getElementById("btn-registrar-popup");
  const logoutMenu = document.getElementById("logout-menu");
  const logoutOption = document.getElementById("logout-option");

  // Mostra/esconde barra de pesquisa ao clicar na lupa
  searchToggle.addEventListener("click", () => {
    if (searchContainer.style.display === "none" || searchContainer.style.display === "") {
      searchContainer.style.display = "flex";
    } else {
      searchContainer.style.display = "none";
    }
  });

  // Abre popup ao clicar no botão de login, se não estiver logado
  loginBtn.addEventListener("click", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) {
      popup.style.display = "flex";
      erroLogin.style.display = "none";
      loginFormContainer.style.display = "none";
    } else {
      // Mostrar menu de logout
      logoutMenu.style.display = logoutMenu.style.display === "block" ? "none" : "block";
    }
  });

  // Fecha popup ao clicar no X
  popupClose.addEventListener("click", () => {
    popup.style.display = "none";
    loginFormContainer.style.display = "none";
    erroLogin.style.display = "none";
    formLogin.reset();
  });

  // Mostra o formulário de login
  btnMostrarLogin.addEventListener("click", () => {
    loginFormContainer.style.display = "block";
    erroLogin.style.display = "none";
  });

  function registrar() {
    window.location.href = "/html/registrar.html";
  }


  // Redireciona para a página de registro
  btnRegistrar.addEventListener("click", () => {
    window.location.href = "html/registrar.html";
  });

  if (btnRegistrar) {
    btnRegistrar.addEventListener("click", registrar);
  }



  // Limpa campos do formulário
  btnLimpar.addEventListener("click", () => {
    formLogin.reset();
    erroLogin.textContent = "";
    erroLogin.style.display = "none";
  });

  // Submete login
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const loginDigitado = document.getElementById("usuario").value.trim();
    const senhaDigitada = document.getElementById("senhaLogin").value;

    const registros = JSON.parse(localStorage.getItem("registrosUsuarios")) || [];
    const usuarioEncontrado = registros.find(user => user.login === loginDigitado && user.senha === senhaDigitada);

    if (usuarioEncontrado) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
      loginBtn.textContent = `👤 ${usuarioEncontrado.login}`;
      popup.style.display = "none";
      formLogin.reset();
      loginFormContainer.style.display = "none";
      erroLogin.style.display = "none";
    } else {
      erroLogin.textContent = "Login ou senha inválidos!";
      erroLogin.style.display = "block";
    }
  });

  // Mostra nome do usuário logado ao carregar
  function atualizarEstadoLogin() {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (usuarioLogado) {
      loginBtn.textContent = `👤 ${usuarioLogado.login}`;
    } else {
      loginBtn.textContent = "Login ou Registrar-se";
    }
  }

  // Logout
  logoutOption.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    atualizarEstadoLogin();
    logoutMenu.style.display = "none";
  });

  atualizarEstadoLogin();
});
// === DARK MODE ===
document.addEventListener("DOMContentLoaded", () => {

  const darkModeBtn = document.getElementById('darkModeBtn');
  const banner = document.querySelector('.banner'); // só existe no index

  // Se o botão NÃO existir, sair (para não quebrar nada)
  if (!darkModeBtn) {
    console.warn("DarkMode: botão não encontrado nesta página.");
    return;
  }

  // Detecta caminho (index = "", outras páginas = "../")
  const prefix = window.location.pathname.includes("/html/") ? "../" : "";

  // Função para trocar o banner somente no index
  function atualizarBanner(escuro) {
    if (!banner) return; // só executa se existir banner
    banner.src = escuro ? `${prefix}imagens/Rd6.jpg` : `${prefix}imagens/RD5.jpg`;
  }

  // Ativar modo salvo
  const darkSaved = localStorage.getItem("darkMode") === "true";

  if (darkSaved) {
    document.body.classList.add("dark-mode");
    darkModeBtn.textContent = "◑";
    atualizarBanner(true);
  } else {
    darkModeBtn.textContent = "◐";
    atualizarBanner(false);
  }

  // Alternar
  darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");
    const ativo = document.body.classList.contains("dark-mode");

    localStorage.setItem("darkMode", ativo);
    darkModeBtn.textContent = ativo ? "◑" : "◐";
    atualizarBanner(ativo);
  });
});
