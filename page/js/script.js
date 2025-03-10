document.addEventListener('DOMContentLoaded', function () {

document.querySelectorAll('.copy-button').forEach(button => {
    button.addEventListener('click', () => {
      const code = button.nextElementSibling;
      navigator.clipboard.writeText(code.textContent).then(() => {
        button.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          button.innerHTML = '<i class="fas fa-copy"></i>';
        }, 1000);
      });
    });
  });

    // Script para alternar ícones dos botões e fechar collapses de outros grupos
    document.querySelectorAll('.toggleButton').forEach(button => {
      button.addEventListener('click', function() {
        const icon = this.querySelector('.bi');

        // Fecha todos os outros collapses e reseta os ícones
        document.querySelectorAll('.collapse').forEach(collapse => {
          if (collapse !== document.querySelector(this.dataset.bsTarget)) {
            const collapseInstance = bootstrap.Collapse.getInstance(collapse);
            if (collapseInstance && collapseInstance._isShown) {
              collapseInstance.hide();
            }
          }
        });

        document.querySelectorAll('.toggleButton').forEach(otherButton => {
          if (otherButton !== this) {
            const otherIcon = otherButton.querySelector('.bi');
            otherIcon.classList.remove('bi-chevron-down');
            otherIcon.classList.add('bi-chevron-right');
          }
        });

        // Alterna o ícone do botão clicado
        if (icon.classList.contains('bi-chevron-right')) {
          icon.classList.replace('bi-chevron-right', 'bi-chevron-down');
        } else {
          icon.classList.replace('bi-chevron-down', 'bi-chevron-right');
        }
      });
    });
  

const buttons = document.querySelectorAll('.all-200', ".all-400");

// Adiciona um evento de clique para cada botão
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const group = button.getAttribute('data-group'); // Pega o grupo do botão
    
    // Remove a classe 'active' de todos os botões do grupo
    document.querySelectorAll(`[data-group="${group}"]`).forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Adiciona a classe 'active' ao botão clicado
    button.classList.add('active');
  })
});

    // Seleciona todos os links com a classe 'sublink'
    const sublinks = document.querySelectorAll('.nav-link.sublink');

    // Verifica se há um link ativo salvo no localStorage
    const activeLinkId = localStorage.getItem('activeLink');
    if (activeLinkId) {
        const activeLink = document.querySelector(`.nav-link.sublink[href="${activeLinkId}"]`);
        if (activeLink) {
            // Remove a classe 'active' de todos os links
            sublinks.forEach(link => link.classList.remove('active'));
            // Adiciona a classe 'active' ao link salvo
            activeLink.classList.add('active');
            // Faz o scroll suave para o elemento correspondente
            document.querySelector(activeLinkId).scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Adiciona um evento de clique a cada link
    sublinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Evita o comportamento padrão do link

            // Remove a classe 'active' de todos os links
            sublinks.forEach(sub => sub.classList.remove('active'));

            // Adiciona a classe 'active' apenas ao link clicado
            this.classList.add('active');

            // Salva o link ativo no localStorage
            const targetId = this.getAttribute('href');
            localStorage.setItem('activeLink', targetId);

            // Faz o scroll suave para o elemento correspondente
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

});