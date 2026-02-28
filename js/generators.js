const Generators = {
    // Список доступных генераторов (ключи должны совпадать с ключами в locales)
    list: ['password', 'color', 'name', 'number'],

    password: {
        render(container) {
            container.innerHTML = `
                <h2>${I18n.t('generators.password.name')}</h2>
                <p>${I18n.t('generators.password.description')}</p>
                <div class="generator-form">
                    <label>${I18n.t('password.length_label')} <input type="number" id="pass-length" min="4" max="64" value="12"></label><br>
                    <label><input type="checkbox" id="pass-numbers" checked> ${I18n.t('password.include_numbers')}</label><br>
                    <label><input type="checkbox" id="pass-symbols" checked> ${I18n.t('password.include_symbols')}</label><br>
                    <button id="generate-password">${I18n.t('password.generate_button')}</button>
                </div>
                <div class="result" id="password-result"></div>
            `;
            document.getElementById('generate-password').addEventListener('click', () => {
                const length = parseInt(document.getElementById('pass-length').value, 10);
                const useNumbers = document.getElementById('pass-numbers').checked;
                const useSymbols = document.getElementById('pass-symbols').checked;
                const pwd = Utils.randomPassword(length, useNumbers, useSymbols);
                document.getElementById('password-result').innerHTML = `<strong>${I18n.t('password.result_label')}</strong> ${pwd}`;
            });
        }
    },

    color: {
        render(container) {
            container.innerHTML = `
                <h2>${I18n.t('generators.color.name')}</h2>
                <p>${I18n.t('generators.color.description')}</p>
                <button id="generate-color">${I18n.t('color.generate_button')}</button>
                <div class="result" id="color-result"></div>
            `;
            document.getElementById('generate-color').addEventListener('click', () => {
                const color = Utils.randomHexColor();
                document.getElementById('color-result').innerHTML = `
                    <strong>${I18n.t('color.result_label')}</strong> ${color}
                    <div style="width:50px; height:50px; background:${color}; border:1px solid #000;"></div>
                `;
            });
        }
    },

    name: {
        render(container) {
            container.innerHTML = `
                <h2>${I18n.t('generators.name.name')}</h2>
                <p>${I18n.t('generators.name.description')}</p>
                <div class="generator-form">
                    <label>${I18n.t('name.gender_label')}</label>
                    <select id="name-gender">
                        <option value="male">${I18n.t('name.male')}</option>
                        <option value="female">${I18n.t('name.female')}</option>
                    </select><br>
                    <button id="generate-name">${I18n.t('name.generate_button')}</button>
                </div>
                <div class="result" id="name-result"></div>
            `;
            document.getElementById('generate-name').addEventListener('click', () => {
                const gender = document.getElementById('name-gender').value;
                // Простая логика: возьмём случайные имена из заранее подготовленных массивов (можно вынести в переводы или отдельный JSON)
                const maleNames = ['Александр', 'Дмитрий', 'Максим', 'Иван', 'Сергей'];
                const femaleNames = ['Анна', 'Елена', 'Ольга', 'Татьяна', 'Мария'];
                const names = gender === 'male' ? maleNames : femaleNames;
                const name = names[Math.floor(Math.random() * names.length)];
                document.getElementById('name-result').innerHTML = `<strong>${I18n.t('name.result_label')}</strong> ${name}`;
            });
        }
    },

    number: {
        render(container) {
            container.innerHTML = `
                <h2>${I18n.t('generators.number.name')}</h2>
                <p>${I18n.t('generators.number.description')}</p>
                <div class="generator-form">
                    <label>${I18n.t('number.min_label')} <input type="number" id="num-min" value="1"></label><br>
                    <label>${I18n.t('number.max_label')} <input type="number" id="num-max" value="100"></label><br>
                    <button id="generate-number">${I18n.t('number.generate_button')}</button>
                </div>
                <div class="result" id="number-result"></div>
            `;
            document.getElementById('generate-number').addEventListener('click', () => {
                const min = parseInt(document.getElementById('num-min').value, 10);
                const max = parseInt(document.getElementById('num-max').value, 10);
                const num = Utils.randomInt(min, max);
                document.getElementById('number-result').innerHTML = `<strong>${I18n.t('number.result_label')}</strong> ${num}`;
            });
        }
    }
};