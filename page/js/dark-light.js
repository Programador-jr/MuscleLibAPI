document.addEventListener('DOMContentLoaded', () => {
  function setTheme(theme) {
    const body = document.body;
    const themeIcon = document.querySelectorAll('[data-theme-icon]');
    const themeText = document.querySelectorAll('[data-theme-text]');

    // Remove classes de tema para evitar conflitos
    body.classList.remove('light-theme', 'dark-theme');

    if (theme === 'auto') {
      applySystemTheme(); // Aplica o tema conforme o sistema
    } else {
      body.classList.add(`${theme}-theme`);
      updateThemeIcon(theme);
    }

    // Salva o tema no localStorage
    localStorage.setItem('theme', theme);
  }

  function applySystemTheme() {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.toggle('dark-theme', isDarkMode);
    document.body.classList.toggle('light-theme', !isDarkMode);
    updateThemeIcon(isDarkMode ? 'dark' : 'light');
  }

  function updateThemeIcon(theme) {
    document.querySelectorAll('[data-theme-icon]').forEach(icon => {
      icon.className = theme === 'dark' ? 'bi bi-moon-stars' : 'bi bi-sun';
    });

    document.querySelectorAll('[data-theme-text]').forEach(text => {
      text.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    });
  }

  function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'auto';
    setTheme(savedTheme);

    // Se estiver no modo auto, escuta mudanças do sistema em tempo real
    if (savedTheme === 'auto') {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applySystemTheme);
    }
  }

  document.querySelectorAll('[data-theme]').forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.getAttribute('data-theme');
      setTheme(theme);
    });
  });

  // Carrega o tema salvo ao iniciar a página
  loadSavedTheme();
});
