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

// Интерактивная карта
const regions = document.querySelectorAll('.region');
const tooltip = document.querySelector('.tooltip');

regions.forEach(region => {
    region.addEventListener('mousemove', e => {
        tooltip.style.display = 'block';
        tooltip.textContent = region.dataset.tooltip;
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
    });

    region.addEventListener('mouseleave', () => {
        tooltip.style.display = 'none';
    });

    // Поддержка касаний для мобильных устройств
    region.addEventListener('touchstart', e => {
        e.preventDefault();
        tooltip.style.display = 'block';
        tooltip.textContent = region.dataset.tooltip;
        const touch = e.touches[0];
        tooltip.style.left = `${touch.pageX + 10}px`;
        tooltip.style.top = `${touch.pageY + 10}px`;
        setTimeout(() => {
            tooltip.style.display = 'none';
        }, 2000); // Подсказка исчезает через 2 секунды
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
            image: 'https://via.placeholder.com/300x200'
        },
        '1950s-60s': {
            text: '1950-е–1960-е: Эпоха транзисторов и первых сетей. Ты ценишь переход от громоздких ламп к компактным транзисторам и рождение сетей, таких как ARPANET. Твое любопытство к инновациям, связавшим мир, делает тебя мечтателем о глобальной связности.',
            image: 'https://via.placeholder.com/300x200'
        },
        '1960s': {
            text: '1960-е: Время миниатюризации и сетей. Ты вдохновляешься изобретением интегральных схем и первыми шагами интернета. Твоя любовь к компактным технологиям и сетевым решениям говорит о твоем стремлении к эффективности и связи.',
            image: 'https://via.placeholder.com/300x200'
        },
        '1970s-80s': {
            text: '1970-е–1980-е: Золотой век персональных компьютеров. Ты увлечен эпохой, когда ПК, такие как IBM PC и Macintosh, стали доступны каждому. Твой интерес к массовым технологиям и интерфейсам делает тебя сторонником демократизации инноваций.',
            image: 'https://via.placeholder.com/300x200'
        },
        '1980s': {
            text: '1980-е: Эра персональных компьютеров. Ты обожаешь время, когда компьютеры вошли в дома и офисы, а графические интерфейсы сделали их удобными. Твоя страсть к доступным технологиям показывает твое желание сделать мир проще и продуктивнее.',
            image: 'https://via.placeholder.com/300x200'
        },
        '2000s': {
            text: '2000-е: Мобильная революция и интернет. Ты живешь в ритме смартфонов, соцсетей и облачных технологий. Твой энтузиазм к iPhone и Facebook отражает твое стремление к мобильности, общению и мгновенному доступу к информации.',
            image: 'https://via.placeholder.com/300x200'
        },
        '2020s': {
            text: '2020-е: Эпоха ИИ и квантовых технологий. Ты устремлен в будущее, где ИИ и квантовые компьютеры переопределяют возможности. Твоя страсть к автоматизации и интеллектуальным системам делает тебя визионером, готовым к новым горизонтам технологий.',
            image: 'https://via.placeholder.com/300x200'
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