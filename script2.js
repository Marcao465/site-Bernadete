// Aguarda o DOM (Document Object Model) estar completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function() {

    /* =========================================
     * 1. SCROLL SUAVE PARA LINKS DE NAVEGAÇÃO
     * ========================================= */
    
    // Seleciona todos os "links" do menu (são divs com data-target)
    const navLinks = document.querySelectorAll('nav div'); 

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Impede o comportamento padrão

            // Pega o ID da seção a ser rolada, vindo do atributo data-target
            const targetId = this.getAttribute('data-target');

            if (targetId) {
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70, // Move até a seção com leve offset
                        behavior: 'smooth'
                    });
                }
            } else {
                console.warn(`Link de navegação sem atributo 'data-target'.`);
            }
        });
    });



    /* =========================================
     * 2. ANIMAÇÃO DE ELEMENTOS AO SCROLL
     * ========================================= */
    
    // Seleciona todas as sections, o título principal, e o botão "Agendar Consulta"
    const fadeInElements = document.querySelectorAll('section, h1, .btn-agendar');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Quando 10% do elemento estiver visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";

                observer.unobserve(entry.target); // Executa somente 1x
            }
        });
    }, observerOptions);

    // Configuração inicial: começa invisível e levemente deslocado
    fadeInElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        observer.observe(el);
    });

});
