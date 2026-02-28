const I18n = (function() {
    let currentLang = 'ru';
    let translations = {};

    async function loadLanguage(lang) {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) throw new Error(`Failed to load ${lang} translations`);
        translations = await response.json();
        currentLang = lang;
        document.documentElement.lang = lang;
        return translations;
    }

    function t(key) {
        // Простой доступ к вложенным ключам через точку, например 'generators.password.name'
        return key.split('.').reduce((obj, k) => obj?.[k], translations) || key;
    }

    function getCurrentLang() {
        return currentLang;
    }

    return {
        loadLanguage,
        t,
        getCurrentLang
    };
})();