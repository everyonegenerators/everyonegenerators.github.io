document.addEventListener('DOMContentLoaded', async () => {
    // 1. Загружаем язык (как в app.js)
    let savedLang = localStorage.getItem('lang');
    if (savedLang !== 'ru' && savedLang !== 'en') {
        savedLang = 'ru';
        localStorage.setItem('lang', 'ru');
    }
    await I18n.loadLanguage(savedLang);

    // 2. Применяем тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }

    // 3. Заполняем тексты
    document.getElementById('site-title').textContent = I18n.t('site_title');
    document.getElementById('404-title').textContent = I18n.t('404.title');
    document.getElementById('404-message').textContent = I18n.t('404.message');
    document.getElementById('404-description').textContent = I18n.t('404.description');
    document.getElementById('404-button').textContent = I18n.t('404.button');
});