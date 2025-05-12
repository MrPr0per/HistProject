// Плавная прокрутка для навигации
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Плавная прокрутка для главной кнопки
document.getElementById('begin-button').addEventListener('click', function (e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    section.scrollIntoView({ behavior: 'smooth' });
})

// Открытие модальных окон
document.querySelectorAll('[data-modal]').forEach(item => {
    item.addEventListener('click', () => {
        const modalId = item.dataset.modal;
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
    });
});

// Закрытие модальных окон
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').classList.remove('active');
        // Сброс ответов теста при закрытии результата
        if (closeBtn.closest('.modal').id === 'quiz-result-modal') {
            document.querySelectorAll('.question input').forEach(input => {
                input.checked = false;
            });
        }
    });
});

// Закрытие модального окна при клике вне контента
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('active');
            // Сброс ответов теста при закрытии результата
            if (modal.id === 'quiz-result-modal') {
                document.querySelectorAll('.question input').forEach(input => {
                    input.checked = false;
                });
            }
        }
    });
});

// Тест
const quizBtn = document.querySelector('.quiz-btn');
const resultModal = document.getElementById('quiz-result-modal');
const errorModal = document.getElementById('quiz-error-modal');
const resultText = document.getElementById('result-text');
const resultImage = document.getElementById('result-image');

quizBtn.addEventListener('click', () => {
    const answers = {};
    document.querySelectorAll('.question').forEach(question => {
        const selected = question.querySelector('input:checked');
        if (selected) answers[question.dataset.question] = selected.value;
    });

    if (Object.keys(answers).length < 5) {
        errorModal.classList.add('active');
        return;
    }

    const counts = {
        '1940s': 0,
        '1950s-60s': 0,
        '1960s': 0,
        '1970s-80s': 0,
        '1980s': 0,
        '2000s': 0,
        '2020s': 0
    };

    for (let key in answers) {
        counts[answers[key]]++;
    }

    let max = 0;
    let result = '1940s';
    for (let era in counts) {
        if (counts[era] > max) {
            max = counts[era];
            result = era;
        }
    }

    const results = {
        '1940s': {
            text: '1940-е: Эра зарождения компьютеров. Ты восхищаешься пионерами, которые создали первые вычислительные машины, такие как ENIAC, и заложили основы цифровой эры. Твоя страсть к истокам технологий делает тебя исследователем фундаментальных открытий, которые изменили мир.',
            image: 'https://ethnomir.ru/upload/medialibrary/e69/comp.jpg'
        },
        '1950s-60s': {
            text: '1950-е–1960-е: Эпоха транзисторов и первых сетей. Ты ценишь переход от громоздких ламп к компактным транзисторам и рождение сетей, таких как ARPANET. Твое любопытство к инновациям, связавшим мир, делает тебя мечтателем о глобальной связности.',
            image: 'https://hi-news.ru/wp-content/uploads/2012/11/ibm_7090.jpeg'
        },
        '1960s': {
            text: '1960-е: Время миниатюризации и сетей. Ты вдохновляешься изобретением интегральных схем и первыми шагами интернета. Твоя любовь к компактным технологиям и сетевым решениям говорит о твоем стремлении к эффективности и связи.',
            image: 'https://i.pinimg.com/736x/57/fe/ab/57feab662a3ca237f113ff3e48193458.jpg'
        },
        '1970s-80s': {
            text: '1970-е–1980-е: Золотой век персональных компьютеров. Ты увлечен эпохой, когда ПК, такие как IBM PC и Macintosh, стали доступны каждому. Твой интерес к массовым технологиям и интерфейсам делает тебя сторонником демократизации инноваций.',
            image: 'https://www.digitaltrends.com/wp-content/uploads/2020/01/applemacintoshhello.jpg?fit=720%2C480&p=1'
        },
        '1980s': {
            text: '1980-е: Эра персональных компьютеров. Ты обожаешь время, когда компьютеры вошли в дома и офисы, а графические интерфейсы сделали их удобными. Твоя страсть к доступным технологиям показывает твое желание сделать мир проще и продуктивнее.',
            image: 'https://www.holistic.it/wp-content/uploads/2021/07/bigstock-Istanbul-Turkey-March-314053039.jpg'
        },
        '2000s': {
            text: '2000-е: Мобильная революция и интернет. Ты живешь в ритме смартфонов, соцсетей и облачных технологий. Твой энтузиазм к iPhone и Facebook отражает твое стремление к мобильности, общению и мгновенному доступу к информации.',
            image: 'https://cdn.prod.website-files.com/5d249063a5dbec3c6f57a8d4/63a47e722f6c099cb1761466_Smartphone%20History.jpg'
        },
        '2020s': {
            text: '2020-е: Эпоха ИИ и квантовых технологий. Ты устремлен в будущее, где ИИ и квантовые компьютеры переопределяют возможности. Твоя страсть к автоматизации и интеллектуальным системам делает тебя визионером, готовым к новым горизонтам технологий.',
            image: 'https://www.researchgate.net/publication/332170881/figure/fig1/AS:743484197724163@1554271854842/sualization-of-intermediate-outputs-generated-by-the-trained-CNN-Image-of-tomato-leaf.png'
        }
    };

    resultText.textContent = results[result].text;
    resultImage.src = results[result].image;
    resultModal.classList.add('active');
});

// Анимация появления секций
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});