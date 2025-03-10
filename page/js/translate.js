document.addEventListener('DOMContentLoaded', () => {
  async function translatePage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    const keys = Array.from(elements).map((el) => el.getAttribute('data-translate'));

    try {
      const response = await fetch(`${window.location.origin}/translations?lang=${lang}`);
      const translations = await response.json();

      elements.forEach((element) => {
        const key = element.getAttribute('data-translate');
        if (translations[key]) {
          let translation = translations[key];
          let placeholders = [];

          // Substitui tags <code>, <strong> e <i> por placeholders temporários
          element.childNodes.forEach((node, index) => {
            if (node.nodeType === Node.ELEMENT_NODE && ['CODE', 'STRONG', 'I'].includes(node.tagName)) {
              placeholders.push(node.outerHTML);
              translation = translation.replace(`{${placeholders.length - 1}}`, placeholders[placeholders.length - 1]);
            }
          });

          element.innerHTML = translation;
        }
      });

      updateSelectedFlag(lang);
    } catch (error) {
      console.error('Erro ao buscar traduções:', error);
    }
  }

  function updateSelectedFlag(lang) {
    document.querySelectorAll('[data-selected-flag]').forEach(flagElement => {
      let flagImage = '';

      switch (lang) {
        case 'pt':
          flagImage = '<img src="/page/img/br.svg" width="25">';
          break;
        case 'en':
          flagImage = '<img src="/page/img/us.svg" width="25">';
          break;
        case 'es':
          flagImage = '<img src="/page/img/es.svg" width="25">';
          break;
        default:
          flagImage = '';
      }

      flagElement.innerHTML = flagImage;
    });
  }

  function detectUserLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('pt')) return 'pt';
    if (userLang.startsWith('es')) return 'es';
    return 'en';
  }

  function loadLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage') || detectUserLanguage();
    translatePage(savedLang);

    document.querySelectorAll('[data-lang-select]').forEach(menu => {
      const defaultLanguageItem = menu.querySelector(`[data-lang="${savedLang}"]`);
      if (defaultLanguageItem) defaultLanguageItem.classList.add('selected');
    });

    updateSelectedFlag(savedLang);
  }

  document.querySelectorAll('[data-lang-select]').forEach(menu => {
    menu.querySelectorAll('a').forEach(item => {
      item.addEventListener('click', () => {
        const selectedLanguage = item.getAttribute('data-lang');

        localStorage.setItem('preferredLanguage', selectedLanguage);
        translatePage(selectedLanguage);

        menu.querySelectorAll('a').forEach(li => li.classList.remove('selected'));
        item.classList.add('selected');
      });
    });
  });

  window.addEventListener('load', loadLanguage);
});
