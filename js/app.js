document.addEventListener('DOMContentLoaded', async () => {
    // Загружаем язык по умолчанию (можно сохранять в localStorage)
    const savedLang = localStorage.getItem('lang') || 'ru';
    await I18n.loadLanguage(savedLang);
    updateUILanguage();

    // Построить меню генераторов
    const menu = document.getElementById('generators-menu');
    Generators.list.forEach(generatorKey => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.dataset.generator = generatorKey;
        a.textContent = I18n.t(`generators.${generatorKey}.name`);
        a.addEventListener('click', (e) => {
            e.preventDefault();
            // Убрать активный класс у всех пунктов
            document.querySelectorAll('#generators-menu a').forEach(link => link.classList.remove('active'));
            a.classList.add('active');
            loadGenerator(generatorKey);
        });
        li.appendChild(a);
        menu.appendChild(li);
    });

    // Загрузить первый генератор
    if (Generators.list.length) {
        document.querySelector(`#generators-menu a[data-generator="${Generators.list[0]}"]`).classList.add('active');
        loadGenerator(Generators.list[0]);
    }

    // Обработчики переключения языка
    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const lang = e.target.dataset.lang;
            localStorage.setItem('lang', lang);
            await I18n.loadLanguage(lang);
            updateUILanguage();
            // Перезагрузить текущий генератор (чтобы обновить текст в его интерфейсе)
            const activeGenerator = document.querySelector('#generators-menu a.active')?.dataset.generator;
            if (activeGenerator) loadGenerator(activeGenerator);
        });
    });
});

function updateUILanguage() {
    document.getElementById('site-title').textContent = I18n.t('site_title');
    // Меню тоже обновляем (текст пунктов)
    document.querySelectorAll('#generators-menu a').forEach(a => {
        const gen = a.dataset.generator;
        a.textContent = I18n.t(`generators.${gen}.name`);
    });
}

function loadGenerator(generatorKey) {
    const container = document.getElementById('generator-container');
    container.innerHTML = `<p>${I18n.t('loading')}</p>`;
    // Вызываем рендер соответствующего генератора
    if (Generators[generatorKey] && Generators[generatorKey].render) {
        // Небольшая задержка для имитации загрузки (можно убрать)
        setTimeout(() => Generators[generatorKey].render(container), 50);
    } else {
        container.innerHTML = '<p>Generator not found</p>';
    }
}