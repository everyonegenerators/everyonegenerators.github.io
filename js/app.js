// ========== Управление темой ==========
function applyTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeButton();
}

function updateThemeButton() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const isDark = document.body.classList.contains('dark-theme');
    // Используем переводы – они уже загружены
    btn.textContent = isDark ? I18n.t('theme_toggle_light') : I18n.t('theme_toggle_dark');
}

// ========== Основная логика ==========
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Сначала загружаем язык (чтобы переводы были доступны)
    const savedLang = localStorage.getItem('lang') || 'ru';
    await I18n.loadLanguage(savedLang);

    // 2. Применяем тему (класс и текст кнопки с переводами)
    applyTheme();
    updateThemeButton();

    // 3. Обновляем остальной текст интерфейса
    updateUILanguage();

    // 4. Строим меню генераторов
    const menu = document.getElementById('generators-menu');
    Generators.list.forEach(generatorKey => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.dataset.generator = generatorKey;
        a.textContent = I18n.t(`generators.${generatorKey}.name`);
        a.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('#generators-menu a').forEach(link => link.classList.remove('active'));
            a.classList.add('active');
            loadGenerator(generatorKey);
        });
        li.appendChild(a);
        menu.appendChild(li);
    });

    // 5. Загружаем первый генератор
    if (Generators.list.length) {
        document.querySelector(`#generators-menu a[data-generator="${Generators.list[0]}"]`).classList.add('active');
        loadGenerator(Generators.list[0]);
    }

    // 6. Обработчики переключения языка
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const lang = e.target.dataset.lang;
            localStorage.setItem('lang', lang);
            await I18n.loadLanguage(lang);
            updateUILanguage();
            const activeGenerator = document.querySelector('#generators-menu a.active')?.dataset.generator;
            if (activeGenerator) loadGenerator(activeGenerator);
            updateThemeButton(); // обновить текст кнопки темы
        });
    });

    // 7. Обработчик переключения темы
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }
});

function updateUILanguage() {
    document.getElementById('site-title').textContent = I18n.t('site_title');
    document.querySelectorAll('#generators-menu a').forEach(a => {
        const gen = a.dataset.generator;
        a.textContent = I18n.t(`generators.${gen}.name`);
    });
}

function loadGenerator(generatorKey) {
    const container = document.getElementById('generator-container');
    container.innerHTML = `<p>${I18n.t('loading')}</p>`;
    if (Generators[generatorKey] && Generators[generatorKey].render) {
        setTimeout(() => Generators[generatorKey].render(container), 50);
    } else {
        container.innerHTML = '<p>Generator not found</p>';
    }
}