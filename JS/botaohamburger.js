// 1. Espera o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    // 2. Encontra o botão hambúrguer e o menu
    const menuHamburger = document.getElementById('menu-hamburger');
    const navMenu = document.querySelector('.holographic-container');

    // 3. Adiciona um "ouvinte de clique" no botão
    menuHamburger.addEventListener('click', () => {
        // 4. Quando clicado, ele adiciona ou remove a classe 'menu-visivel'
        navMenu.classList.toggle('menu-visivel');
    });
});