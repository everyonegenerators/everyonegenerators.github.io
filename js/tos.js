document.addEventListener('DOMContentLoaded', async () => {
    // Загружаем язык
    let savedLang = localStorage.getItem('lang');
    if (savedLang !== 'ru' && savedLang !== 'en') {
        savedLang = 'ru';
        localStorage.setItem('lang', 'ru');
    }
    await I18n.loadLanguage(savedLang);

    // Тема
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    // Заполняем заголовок и ссылки в футере
    document.getElementById('site-title').textContent = I18n.t('site_title');
    document.getElementById('footer-terms').textContent = I18n.t('footer.terms');
    document.getElementById('footer-privacy').textContent = I18n.t('footer.privacy');

    // Вставляем контент
    const contentDiv = document.getElementById('legal-content');
    contentDiv.innerHTML = `<h1>${I18n.t('tos.title')}</h1>${I18n.t('tos.content')}`;
});