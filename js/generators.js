const Generators = {
    // Список доступных генераторов
    list: ['password', 'color', 'name', 'number', 'fact', 'compliment', 'toast', 'nickname', 'recipe', 'task', 'movie'],

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
                    <div style="width:50px; height:50px; background:${color}; border:1px solid #000; margin-top:10px;"></div>
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
                const maleNames = ['Александр', 'Дмитрий', 'Максим', 'Иван', 'Сергей', 'Алексей', 'Владимир', 'Андрей'];
                const femaleNames = ['Анна', 'Елена', 'Ольга', 'Татьяна', 'Мария', 'Екатерина', 'Наталья', 'Ирина'];
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
    },

    fact: {
        render(container) {
            container.innerHTML = `
                <h2>${I18n.t('generators.fact.name')}</h2>
                <p>${I18n.t('generators.fact.description')}</p>
                <button id="generate-fact">${I18n.t('fact.generate_button')}</button>
                <div class="result" id="fact-result"></div>
            `;
            document.getElementById('generate-fact').addEventListener('click', () => {
                const facts = [
                    I18n.t('fact.list.0'),
                    I18n.t('fact.list.1'),
                    I18n.t('fact.list.2'),
                    I18n.t('fact.list.3'),
                    I18n.t('fact.list.4'),
                    I18n.t('fact.list.5'),
                    I18n.t('fact.list.6'),
                    I18n.t('fact.list.7'),
                    I18n.t('fact.list.8'),
                    I18n.t('fact.list.9')
                ];
                const fact = facts[Math.floor(Math.random() * facts.length)];
                document.getElementById('fact-result').innerHTML = `<strong>${I18n.t('fact.result_label')}</strong> ${fact}`;
            });
        }
    },

    compliment: {
        render(container) {
            container.innerHTML = `
                <h2>${I18n.t('generators.compliment.name')}</h2>
                <p>${I18n.t('generators.compliment.description')}</p>
                <button id="generate-compliment">${I18n.t('compliment.generate_button')}</button>
                <div class="result" id="compliment-result"></div>
            `;
            document.getElementById('generate-compliment').addEventListener('click', () => {
                const compliments = [
                    I18n.t('compliment.list.0'),
                    I18n.t('compliment.list.1'),
                    I18n.t('compliment.list.2'),
                    I18n.t('compliment.list.3'),
                    I18n.t('compliment.list.4'),
                    I18n.t('compliment.list.5'),
                    I18n.t('compliment.list.6'),
                    I18n.t('compliment.list.7'),
                    I18n.t('compliment.list.8'),
                    I18n.t('compliment.list.9')
                ];
                const compliment = compliments[Math.floor(Math.random() * compliments.length)];
                document.getElementById('compliment-result').innerHTML = `<strong>${I18n.t('compliment.result_label')}</strong> ${compliment}`;
            });
        }
    },

    toast: {
        render(container) {
            container.innerHTML = `
                <h2>${I18n.t('generators.toast.name')}</h2>
                <p>${I18n.t('generators.toast.description')}</p>
                <button id="generate-toast">${I18n.t('toast.generate_button')}</button>
                <div class="result" id="toast-result"></div>
            `;
            document.getElementById('generate-toast').addEventListener('click', () => {
                const toasts = [
                    I18n.t('toast.list.0'),
                    I18n.t('toast.list.1'),
                    I18n.t('toast.list.2'),
                    I18n.t('toast.list.3'),
                    I18n.t('toast.list.4'),
                    I18n.t('toast.list.5'),
                    I18n.t('toast.list.6'),
                    I18n.t('toast.list.7'),
                    I18n.t('toast.list.8'),
                    I18n.t('toast.list.9')
                ];
                const toast = toasts[Math.floor(Math.random() * toasts.length)];
                document.getElementById('toast-result').innerHTML = `<strong>${I18n.t('toast.result_label')}</strong> ${toast}`;
            });
        }
    },

    nickname: {
        render(container) {
            container.innerHTML = `
                <h2>${I18n.t('generators.nickname.name')}</h2>
                <p>${I18n.t('generators.nickname.description')}</p>
                <div class="generator-form">
                    <label>${I18n.t('nickname.style_label')}</label>
                    <select id="nickname-style">
                        <option value="gamer">${I18n.t('nickname.gamer')}</option>
                        <option value="fantasy">${I18n.t('nickname.fantasy')}</option>
                        <option value="funny">${I18n.t('nickname.funny')}</option>
                    </select><br>
                    <button id="generate-nickname">${I18n.t('nickname.generate_button')}</button>
                </div>
                <div class="result" id="nickname-result"></div>
            `;
            document.getElementById('generate-nickname').addEventListener('click', () => {
                const style = document.getElementById('nickname-style').value;
                let nicknames = [];
                if (style === 'gamer') {
                    nicknames = ['Shadow', 'Killer', 'Wizard', 'Ghost', 'Dragon', 'Phoenix', 'Viper', 'Titan'];
                } else if (style === 'fantasy') {
                    nicknames = ['Elf', 'Dwarf', 'Mage', 'Knight', 'Ranger', 'Sorcerer', 'Paladin', 'Druid'];
                } else {
                    nicknames = ['FunnyBunny', 'LOLman', 'CrazyCat', 'Joker', 'Panda', 'Unicorn', 'Cookie', 'Muffin'];
                }
                const nickname = nicknames[Math.floor(Math.random() * nicknames.length)] + Utils.randomInt(1, 999);
                document.getElementById('nickname-result').innerHTML = `<strong>${I18n.t('nickname.result_label')}</strong> ${nickname}`;
            });
        }
    },

    recipe: {
        render(container) {
            container.innerHTML = `
                <h2>${I18n.t('generators.recipe.name')}</h2>
                <p>${I18n.t('generators.recipe.description')}</p>
                <button id="generate-recipe">${I18n.t('recipe.generate_button')}</button>
                <div class="result" id="recipe-result"></div>
            `;
            document.getElementById('generate-recipe').addEventListener('click', () => {
                const recipes = [
                    I18n.t('recipe.list.0'),
                    I18n.t('recipe.list.1'),
                    I18n.t('recipe.list.2'),
                    I18n.t('recipe.list.3'),
                    I18n.t('recipe.list.4'),
                    I18n.t('recipe.list.5'),
                    I18n.t('recipe.list.6'),
                    I18n.t('recipe.list.7'),
                    I18n.t('recipe.list.8'),
                    I18n.t('recipe.list.9')
                ];
                const recipe = recipes[Math.floor(Math.random() * recipes.length)];
                document.getElementById('recipe-result').innerHTML = `<strong>${I18n.t('recipe.result_label')}</strong> ${recipe}`;
            });
        }
    },

    task: {
        render(container) {
            container.innerHTML = `
                <h2>${I18n.t('generators.task.name')}</h2>
                <p>${I18n.t('generators.task.description')}</p>
                <button id="generate-task">${I18n.t('task.generate_button')}</button>
                <div class="result" id="task-result"></div>
            `;
            document.getElementById('generate-task').addEventListener('click', () => {
                const tasks = [
                    I18n.t('task.list.0'),
                    I18n.t('task.list.1'),
                    I18n.t('task.list.2'),
                    I18n.t('task.list.3'),
                    I18n.t('task.list.4'),
                    I18n.t('task.list.5'),
                    I18n.t('task.list.6'),
                    I18n.t('task.list.7'),
                    I18n.t('task.list.8'),
                    I18n.t('task.list.9')
                ];
                const task = tasks[Math.floor(Math.random() * tasks.length)];
                document.getElementById('task-result').innerHTML = `<strong>${I18n.t('task.result_label')}</strong> ${task}`;
            });
        }
    },

    movie: {
        render(container) {
            container.innerHTML = `
                <h2>${I18n.t('generators.movie.name')}</h2>
                <p>${I18n.t('generators.movie.description')}</p>
                <div class="generator-form">
                    <label>${I18n.t('movie.genre_label')}</label>
                    <select id="movie-genre">
                        <option value="any">${I18n.t('movie.any')}</option>
                        <option value="comedy">${I18n.t('movie.comedy')}</option>
                        <option value="drama">${I18n.t('movie.drama')}</option>
                        <option value="action">${I18n.t('movie.action')}</option>
                        <option value="sci-fi">${I18n.t('movie.sci-fi')}</option>
                    </select><br>
                    <button id="generate-movie">${I18n.t('movie.generate_button')}</button>
                </div>
                <div class="result" id="movie-result"></div>
            `;
            document.getElementById('generate-movie').addEventListener('click', () => {
                const genre = document.getElementById('movie-genre').value;
                const movies = {
                    any: ['Inception', 'The Matrix', 'Pulp Fiction', 'The Godfather', 'Star Wars'],
                    comedy: ['The Hangover', 'Superbad', 'Step Brothers', 'Bridesmaids', 'Borat'],
                    drama: ['The Shawshank Redemption', 'Forrest Gump', 'Fight Club', 'The Green Mile', 'Gladiator'],
                    action: ['Die Hard', 'Mad Max', 'John Wick', 'The Dark Knight', 'Terminator'],
                    'sci-fi': ['Blade Runner', 'Interstellar', 'The Martian', 'Avatar', 'Dune']
                };
                const list = movies[genre] || movies.any;
                const movie = list[Math.floor(Math.random() * list.length)];
                document.getElementById('movie-result').innerHTML = `<strong>${I18n.t('movie.result_label')}</strong> ${movie}`;
            });
        }
    }
};