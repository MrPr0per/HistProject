// Плавная прокрутка для навигации
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Универсальный обработчик открытия модальных окон
document.querySelectorAll('[data-modal]').forEach(item => {
    item.addEventListener('click', () => {
        const modalId = item.dataset.modal;
        document.getElementById(modalId).classList.add('active');
    });
});

// Закрытие модальных окон
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        modal.classList.remove('active');
        
        // Сброс ответов теста при закрытии результата
        if (modal.id === 'quiz-result-modal') {
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

    region.addEventListener('touchstart', e => {
        e.preventDefault();
        tooltip.style.display = 'block';
        tooltip.textContent = region.dataset.tooltip;
        const touch = e.touches[0];
        tooltip.style.left = `${touch.pageX + 10}px`;
        tooltip.style.top = `${touch.pageY + 10}px`;
        setTimeout(() => {
            tooltip.style.display = 'none';
        }, 2000);
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
        '1950s': 0,
        '1960s': 0,
        '1970s': 0,
        '1980s': 0,
        '1990s': 0,
        '2000s': 0,
        '2010s': 0,
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
            text: '1940-е: Эра первых компьютеров. Вы цените фундаментальные основы цифрового мира и восхищаетесь инженерами, создававшими первые вычислительные машины размером с комнату.',
            image: 'https://via.placeholder.com/300x200?text=1940s+ENIAC'
        },
        '1950s': {
            text: '1950-е: Эпоха транзисторов. Вам близки инновации, сделавшие электронику компактнее и надежнее, что открыло путь к созданию современных компьютеров.',
            image: 'https://via.placeholder.com/300x200?text=1950s+Transistors'
        },
        '1960s': {
            text: '1960-е: Время интегральных схем и сетей. Вы вдохновляетесь технологиями, которые позволили компьютерам "разговаривать" друг с другом и заложили основы интернета.',
            image: 'https://via.placeholder.com/300x200?text=1960s+ARPANET'
        },
        '1970s': {
            text: '1970-е: Зарождение персональных компьютеров. Вам нравится эпоха, когда компьютеры начали появляться в домах и офисах, перестав быть прерогативой крупных организаций.',
            image: 'https://via.placeholder.com/300x200?text=1970s+Altair'
        },
        '1980s': {
            text: '1980-е: Расцвет ПК. Вы цените время, когда компьютеры стали по-настоящему массовыми благодаря IBM PC и Macintosh, а графические интерфейсы сделали их доступными для всех.',
            image: 'https://via.placeholder.com/300x200?text=1980s+Macintosh'
        },
        '1990s': {
            text: '1990-е: Интернет-революция. Вам близка эпоха, когда Всемирная паутина соединила мир, а поисковые системы сделали информацию доступной в один клик.',
            image: 'https://via.placeholder.com/300x200?text=1990s+WWW'
        },
        '2000s': {
            text: '2000-е: Мобильная и социальная революция. Вы живете в ритме смартфонов и соцсетей, которые изменили способ нашего общения и потребления информации.',
            image: 'https://via.placeholder.com/300x200?text=2000s+iPhone'
        },
        '2010s': {
            text: '2010-е: Эра больших данных и IoT. Вам интересны технологии, которые научили машины понимать мир вокруг нас и соединили миллиарды устройств в единую сеть.',
            image: 'https://via.placeholder.com/300x200?text=2010s+AI'
        },
        '2020s': {
            text: '2020-е: Век искусственного интеллекта. Вы устремлены в будущее, где ИИ становится неотъемлемой частью нашей жизни, а квантовые компьютеры открывают новые горизонты.',
            image: 'https://via.placeholder.com/300x200?text=2020s+Quantum'
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