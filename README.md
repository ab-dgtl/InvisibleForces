<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Невидимые Опоры — Нумерология и Астрология | Upgrade24k</title>
    <meta name="description" content="Нумерологический и астрологический анализ как инструменты самопознания. Альтернативный взгляд на обстоятельства вашей жизни.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <div class="particles" id="particles"></div>

    <!-- Header -->
    <header class="header" id="header">
        <nav class="nav container">
            <a href="index.html" class="nav__logo">
                <span class="logo-symbol">✦</span>
                <div>
                    <span class="logo-text">Невидимые Опоры</span>
                    <span class="logo-sub">Upgrade24k</span>
                </div>
            </a>
            <ul class="nav__menu" id="navMenu">
                <li><a href="numerology.html" class="nav__link">Нумерология</a></li>
                <li><a href="astrology.html" class="nav__link">Астрология</a></li>
                <li><a href="#about" class="nav__link">Обо мне</a></li>
                <li><a href="https://t.me/upgrade24k" target="_blank" class="nav__link nav__cta">Записаться</a></li>
            </ul>
            <button class="nav__burger" id="navBurger" aria-label="Меню">
                <span></span><span></span><span></span>
            </button>
        </nav>
    </header>

    <!-- Hero -->
    <section class="hero hero--main" id="home">
        <div class="hero__bg">
            <div class="hero__circle hero__circle--1"></div>
            <div class="hero__circle hero__circle--2"></div>
            <div class="hero__circle hero__circle--3"></div>
            <canvas class="hero__starfield" id="starfield"></canvas>
        </div>
        <div class="container hero__content">
            <div class="hero__badge">
                <span class="hero__badge-icon">✦</span>
                <span>Инструменты самопознания</span>
            </div>
            <h1 class="hero__title">
                <span class="hero__title-line">Невидимые</span>
                <span class="hero__title-line hero__title-gold">Опоры</span>
            </h1>
            <p class="hero__subtitle">
                Нумерологический и астрологический анализ —<br>альтернативный взгляд на обстоятельства вашей жизни.
            </p>

            <!-- Direction cards -->
            <div class="direction-cards">
                <a href="numerology.html" class="direction-card direction-card--num">
                    <div class="direction-card__glow"></div>
                    <div class="direction-card__icon">
                        <i class="fas fa-infinity"></i>
                    </div>
                    <div class="direction-card__body">
                        <h2 class="direction-card__title">Нумерология</h2>
                        <p class="direction-card__desc">Раскройте кармические задачи, таланты из прошлых воплощений и своё предназначение через призму цифр</p>
                        <div class="direction-card__tags">
                            <span>Личность</span>
                            <span>Карма</span>
                            <span>Предназначение</span>
                        </div>
                    </div>
                    <div class="direction-card__arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </a>

                <a href="astrology.html" class="direction-card direction-card--astro">
                    <div class="direction-card__glow"></div>
                    <div class="direction-card__icon">
                        <i class="fas fa-star-and-crescent"></i>
                    </div>
                    <div class="direction-card__body">
                        <h2 class="direction-card__title">Астрология</h2>
                        <p class="direction-card__desc">Натальная карта как персональная инструкция — для развития ребёнка и прокачки вашей женской энергии</p>
                        <div class="direction-card__tags">
                            <span>AstroBaby</span>
                            <span>Venera</span>
                            <span>Отношения</span>
                        </div>
                    </div>
                    <div class="direction-card__arrow">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </a>
            </div>

            <div class="hero__stats">
                <div class="hero__stat">
                    <span class="hero__stat-num">7+</span>
                    <span class="hero__stat-label">лет практики</span>
                </div>
                <div class="hero__stat-divider">✦</div>
                <div class="hero__stat">
                    <span class="hero__stat-num">150+</span>
                    <span class="hero__stat-label">разборов проведено</span>
                </div>
                <div class="hero__stat-divider">✦</div>
                <div class="hero__stat">
                    <span class="hero__stat-num">98%</span>
                    <span class="hero__stat-label">довольных клиентов</span>
                </div>
            </div>
        </div>
        <div class="hero__scroll">
            <span>Листай вниз</span>
            <div class="hero__scroll-line"></div>
        </div>
    </section>

    <!-- About Section -->
    <section class="section about" id="about">
        <div class="about__bg"><div class="about__orb"></div></div>
        <div class="container about__container">
            <div class="about__visual" data-aos="fade-right">
                <div class="about__emblem">
                    <div class="about__emblem-ring about__emblem-ring--1"></div>
                    <div class="about__emblem-ring about__emblem-ring--2"></div>
                    <div class="about__emblem-ring about__emblem-ring--3"></div>
                    <div class="about__emblem-center"><i class="fas fa-star"></i></div>
                    <div class="about__zodiac-signs">
                        <span style="--i:0">♈</span><span style="--i:1">♉</span>
                        <span style="--i:2">♊</span><span style="--i:3">♋</span>
                        <span style="--i:4">♌</span><span style="--i:5">♍</span>
                        <span style="--i:6">♎</span><span style="--i:7">♏</span>
                        <span style="--i:8">♐</span><span style="--i:9">♑</span>
                        <span style="--i:10">♒</span><span style="--i:11">♓</span>
                    </div>
                </div>
                <div class="about__name">
                    <span>Ольга</span>
                    <span class="about__title-line">Нумеролог &amp; Астролог</span>
                </div>
            </div>
            <div class="about__content" data-aos="fade-left">
                <span class="section__tag">Обо мне</span>
                <h2 class="section__title section__title--left">Путь к золотым краскам</h2>
                <div class="about__text">
                    <p><strong>Человеческое образование:</strong> музеология и культурное наследие, профориентация и карьерное консультирование, детский коучинг, бесчисленное количество курсов, конференций и семинаров по МАК, детскому и подростковому развитию.</p>
                    <p>Много лет я консультировала, опираясь только на научный, рациональный подход и психологию, но всегда оставались <em>«белые пятна»</em> и понимание, что «человек сам себя не знает».</p>
                    <p>Когда я открыла для себя альтернативные инструменты самопознания — в моей палитре жизни появились новые краски. <strong class="text-gold">Золотые.</strong></p>
                </div>
                <div class="about__interests">
                    <h4 class="about__interests-title">Сферы интересов:</h4>
                    <div class="about__interests-grid">
                        <div class="about__interest"><i class="fas fa-cross"></i><span>Религиозный мистицизм</span></div>
                        <div class="about__interest"><i class="fas fa-book-open"></i><span>Глубинная философия и духовность</span></div>
                        <div class="about__interest"><i class="fas fa-scroll"></i><span>Герметические учения</span></div>
                        <div class="about__interest"><i class="fas fa-calculator"></i><span>Древние вычислительные системы</span></div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer__content">
                <div class="footer__logo">
                    <span class="logo-symbol">✦</span>
                    <div>
                        <span class="logo-text">Невидимые Опоры</span>
                        <span class="logo-sub">Upgrade24k</span>
                    </div>
                </div>
                <p class="footer__tagline">Нумерологический и астрологический анализ как инструменты самопознания</p>
                <div class="footer__links">
                    <a href="numerology.html">Нумерология</a>
                    <a href="astrology.html">Астрология</a>
                    <a href="#about">Обо мне</a>
                    <a href="https://t.me/upgrade24k" target="_blank">Telegram</a>
                </div>
            </div>
            <div class="footer__bottom">
                <p>© 2025 Невидимые Опоры — Upgrade24k. Все права защищены.</p>
            </div>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>
