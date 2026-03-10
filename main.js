/* ==============================
   ROOT VARIABLES
============================== */
:root {
    --gold: #C9A84C;
    --gold-light: #E8C96A;
    --gold-dark: #9A7A30;
    --gold-pale: #F5E8C0;
    --silver: #A8B5C8;
    --silver-light: #D0DCE8;
    --dark: #0D0D14;
    --dark-2: #13131E;
    --dark-3: #1A1A2A;
    --dark-4: #222235;
    --dark-card: #16162A;
    --text: #E8E8F0;
    --text-muted: #8888AA;
    --text-light: #BBBBCC;
    --accent-purple: #7B5EA7;
    --accent-blue: #3A6EA7;
    --radius: 16px;
    --radius-sm: 10px;
    --radius-lg: 24px;
    --shadow: 0 8px 40px rgba(0,0,0,0.4);
    --shadow-gold: 0 8px 40px rgba(201,168,76,0.2);
    --font-serif: 'Cormorant Garamond', Georgia, serif;
    --font-sans: 'Montserrat', sans-serif;
    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ==============================
   RESET & BASE
============================== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
    scroll-behavior: smooth;
    font-size: 16px;
}

body {
    font-family: var(--font-sans);
    background: var(--dark);
    color: var(--text);
    line-height: 1.6;
    overflow-x: hidden;
}

img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

/* ==============================
   PARTICLES
============================== */
.particles {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    overflow: hidden;
}

.particle {
    position: absolute;
    border-radius: 50%;
    background: var(--gold);
    opacity: 0;
    animation: particleFloat linear infinite;
}

@keyframes particleFloat {
    0% { transform: translateY(100vh) scale(0); opacity: 0; }
    10% { opacity: 0.4; }
    90% { opacity: 0.2; }
    100% { transform: translateY(-20px) scale(1); opacity: 0; }
}

/* ==============================
   CONTAINER
============================== */
.container {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 24px;
    position: relative;
    z-index: 1;
}

/* ==============================
   SECTION COMMON
============================== */
.section {
    padding: 100px 0;
    position: relative;
    overflow: hidden;
}

.section__header {
    text-align: center;
    margin-bottom: 64px;
}

.section__tag {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    background: rgba(201,168,76,0.1);
    border: 1px solid rgba(201,168,76,0.3);
    padding: 6px 18px;
    border-radius: 100px;
    margin-bottom: 16px;
}

.section__title {
    font-family: var(--font-serif);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 500;
    color: var(--text);
    margin-bottom: 16px;
    line-height: 1.2;
}

.section__title--left {
    text-align: left;
}

.section__subtitle {
    font-size: 1rem;
    color: var(--text-muted);
    max-width: 520px;
    margin: 0 auto;
}

/* ==============================
   BUTTONS
============================== */
.btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    border-radius: 100px;
    font-family: var(--font-sans);
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: var(--transition);
    border: none;
    text-decoration: none;
}

.btn--primary {
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
    color: #1A1000;
    box-shadow: 0 4px 20px rgba(201,168,76,0.4);
}
.btn--primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(201,168,76,0.5);
}

.btn--ghost {
    background: transparent;
    color: var(--text-light);
    border: 1px solid rgba(255,255,255,0.2);
}
.btn--ghost:hover {
    border-color: var(--gold);
    color: var(--gold);
}

.btn--silver {
    background: linear-gradient(135deg, #7A8BA0 0%, var(--silver-light) 100%);
    color: #0D0D14;
    width: 100%;
    justify-content: center;
    font-size: 0.85rem;
}
.btn--silver:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(168,181,200,0.4);
}

.btn--gold {
    background: linear-gradient(135deg, var(--gold-dark) 0%, var(--gold-light) 100%);
    color: #1A1000;
    width: 100%;
    justify-content: center;
    font-size: 0.85rem;
    box-shadow: var(--shadow-gold);
}
.btn--gold:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(201,168,76,0.5);
}

.btn--astro {
    background: linear-gradient(135deg, var(--accent-blue) 0%, #6AABDF 100%);
    color: #fff;
    width: 100%;
    justify-content: center;
}
.btn--astro:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(58,110,167,0.5);
}

.btn--venera {
    background: linear-gradient(135deg, #8B3A6A 0%, #D967A0 100%);
    color: #fff;
    width: 100%;
    justify-content: center;
}
.btn--venera:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(217,103,160,0.5);
}

/* ==============================
   HEADER
============================== */
.header {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    padding: 18px 0;
    transition: var(--transition);
}

.header.scrolled {
    background: rgba(13,13,20,0.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 12px 0;
    border-bottom: 1px solid rgba(201,168,76,0.15);
}

.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav__logo {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo-symbol {
    color: var(--gold);
    font-size: 1.4rem;
    line-height: 1;
}

.logo-text {
    font-family: var(--font-serif);
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text);
}

.logo-sub {
    font-size: 0.65rem;
    color: var(--gold);
    letter-spacing: 0.15em;
    font-weight: 600;
    text-transform: uppercase;
    display: block;
    line-height: 1;
}

.nav__menu {
    display: flex;
    align-items: center;
    gap: 32px;
}

.nav__link {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--text-muted);
    transition: var(--transition);
    position: relative;
}

.nav__link::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0; right: 0;
    height: 1px;
    background: var(--gold);
    transform: scaleX(0);
    transition: transform 0.3s;
}

.nav__link:hover,
.nav__link.active {
    color: var(--text);
}

.nav__link:hover::after,
.nav__link.active::after {
    transform: scaleX(1);
}

.nav__cta {
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
    color: #1A1000 !important;
    padding: 8px 20px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 0.8rem;
}

.nav__cta::after { display: none; }
.nav__cta:hover { opacity: 0.9; transform: translateY(-1px); }

.nav__burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
}

.nav__burger span {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--text);
    border-radius: 2px;
    transition: var(--transition);
}

/* ==============================
   HERO
============================== */
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: 80px;
}

.hero__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
}

.hero__starfield {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    opacity: 0.7;
}

.hero__circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
}

.hero__circle--1 {
    width: 500px; height: 500px;
    top: -100px; right: -150px;
    background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%);
    animation: pulse 8s ease-in-out infinite;
}

.hero__circle--2 {
    width: 400px; height: 400px;
    bottom: -100px; left: -100px;
    background: radial-gradient(circle, rgba(123,94,167,0.1) 0%, transparent 70%);
    animation: pulse 10s ease-in-out infinite 2s;
}

.hero__circle--3 {
    width: 300px; height: 300px;
    top: 40%; left: 40%;
    background: radial-gradient(circle, rgba(58,110,167,0.08) 0%, transparent 70%);
    animation: pulse 12s ease-in-out infinite 4s;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.15); opacity: 0.7; }
}

.hero__content {
    text-align: center;
    padding: 80px 24px 120px;
}

.hero__badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
    border: 1px solid rgba(201,168,76,0.3);
    padding: 8px 20px;
    border-radius: 100px;
    margin-bottom: 32px;
    backdrop-filter: blur(8px);
    background: rgba(201,168,76,0.05);
}

.hero__badge-icon {
    animation: spin 10s linear infinite;
    display: inline-block;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.hero__title {
    font-family: var(--font-serif);
    font-size: clamp(3.5rem, 10vw, 7rem);
    font-weight: 300;
    line-height: 1;
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.hero__title-line {
    display: block;
    letter-spacing: -0.02em;
}

.hero__title-gold {
    color: transparent;
    background: linear-gradient(135deg, var(--gold-dark), var(--gold-light), var(--gold));
    -webkit-background-clip: text;
    background-clip: text;
    font-weight: 600;
    font-style: italic;
}

.hero__subtitle {
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    color: var(--text-muted);
    max-width: 560px;
    margin: 0 auto 40px;
    line-height: 1.7;
}

.hero__actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 60px;
}

.hero__stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    flex-wrap: wrap;
}

.hero__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
}

.hero__stat-num {
    font-family: var(--font-serif);
    font-size: 2.2rem;
    font-weight: 600;
    color: var(--gold);
    line-height: 1;
}

.hero__stat-label {
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.hero__stat-divider {
    color: rgba(201,168,76,0.3);
    font-size: 1.2rem;
}

.hero__scroll {
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-muted);
}

.hero__scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scrollLine 2s ease-in-out infinite;
}

@keyframes scrollLine {
    0%, 100% { opacity: 1; transform: scaleY(1); }
    50% { opacity: 0.4; transform: scaleY(0.6); }
}

/* ==============================
   SERVICES
============================== */
.services {
    background: var(--dark-2);
}

.services__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 40px;
}

.service-card {
    background: var(--dark-card);
    border-radius: var(--radius-lg);
    padding: 40px;
    border: 1px solid rgba(255,255,255,0.06);
    position: relative;
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;
}

.service-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius-lg);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
    z-index: 0;
}

.service-card--silver::before {
    background: linear-gradient(135deg, rgba(168,181,200,0.03), transparent);
}

.service-card--gold::before {
    background: linear-gradient(135deg, rgba(201,168,76,0.05), transparent);
}

.service-card:hover::before { opacity: 1; }

.service-card:hover {
    transform: translateY(-6px);
    border-color: rgba(255,255,255,0.12);
}

.service-card--silver:hover {
    box-shadow: 0 16px 60px rgba(168,181,200,0.15);
    border-color: rgba(168,181,200,0.3);
}

.service-card--gold:hover {
    box-shadow: 0 16px 60px rgba(201,168,76,0.25);
    border-color: rgba(201,168,76,0.4);
}

.service-card--featured {
    border-color: rgba(201,168,76,0.2);
    background: linear-gradient(160deg, #1C1920 0%, var(--dark-card) 100%);
}

.service-card__popular {
    position: absolute;
    top: 18px; right: 18px;
    background: linear-gradient(90deg, var(--gold-dark), var(--gold-light));
    color: #1A1000;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 100px;
    white-space: nowrap;
}

.service-card__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.service-card__icon {
    width: 52px; height: 52px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
}

.service-card--silver .service-card__icon {
    background: rgba(168,181,200,0.1);
    color: var(--silver-light);
}

.service-card--gold .service-card__icon {
    background: rgba(201,168,76,0.1);
    color: var(--gold-light);
}

.service-card__badge {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 100px;
}

.service-card--silver .service-card__badge {
    color: var(--silver-light);
    border: 1px solid rgba(168,181,200,0.3);
    background: rgba(168,181,200,0.05);
}

.service-card--gold .service-card__badge {
    color: var(--gold-light);
    border: 1px solid rgba(201,168,76,0.3);
    background: rgba(201,168,76,0.08);
}

.service-card__title {
    font-family: var(--font-serif);
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.3;
    color: var(--text);
}

.service-card__desc {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.65;
}

.service-card__features {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
}

.service-card__features li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.875rem;
    color: var(--text-light);
}

.service-card--silver .service-card__features li i {
    color: var(--silver);
    font-size: 0.75rem;
}

.service-card--gold .service-card__features li i {
    color: var(--gold);
    font-size: 0.75rem;
}

.service-card__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.06);
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
}

.service-card__price {
    display: flex;
    align-items: baseline;
    gap: 4px;
}

.price__amount {
    font-family: var(--font-serif);
    font-size: 2rem;
    font-weight: 600;
    line-height: 1;
}

.service-card--silver .price__amount { color: var(--silver-light); }
.service-card--gold .price__amount { color: var(--gold-light); }

.price__currency {
    font-size: 1.1rem;
    color: var(--text-muted);
}

.service-card__note {
    font-size: 0.78rem;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 6px;
}

.services__gift {
    background: rgba(201,168,76,0.05);
    border: 1px solid rgba(201,168,76,0.2);
    border-radius: var(--radius);
    padding: 24px 32px;
    display: flex;
    align-items: center;
    gap: 20px;
}

.gift__icon {
    width: 48px; height: 48px;
    background: rgba(201,168,76,0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gold);
    font-size: 1.2rem;
    flex-shrink: 0;
}

.gift__text {
    font-size: 0.9rem;
    color: var(--text-muted);
    line-height: 1.6;
}

.gift__text strong {
    color: var(--gold);
    display: block;
    margin-bottom: 4px;
}

/* ==============================
   WHY
============================== */
.why {
    background: var(--dark);
}

.why__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
}

.why__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
}

.why__orb--1 {
    width: 400px; height: 400px;
    top: -100px; left: -100px;
    background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
}

.why__orb--2 {
    width: 350px; height: 350px;
    bottom: -100px; right: -50px;
    background: radial-gradient(circle, rgba(123,94,167,0.07) 0%, transparent 70%);
}

.why__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}

.why__card {
    background: var(--dark-card);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: var(--radius);
    padding: 32px 28px;
    transition: var(--transition);
}

.why__card:hover {
    transform: translateY(-4px);
    border-color: rgba(201,168,76,0.2);
    box-shadow: 0 12px 40px rgba(0,0,0,0.3);
}

.why__card-icon {
    width: 50px; height: 50px;
    background: linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.05));
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gold);
    font-size: 1.1rem;
    margin-bottom: 18px;
}

.why__card h4 {
    font-family: var(--font-serif);
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 10px;
    color: var(--text);
}

.why__card p {
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.65;
}

/* ==============================
   ASTROLOGY
============================== */
.astro {
    background: var(--dark-2);
}

.astro__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 48px;
}

.astro-card {
    background: var(--dark-card);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: var(--radius-lg);
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.astro-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-blue), #6AABDF);
    border-radius: 3px 3px 0 0;
}

.astro-card--venera::after {
    background: linear-gradient(90deg, #8B3A6A, #D967A0);
}

.astro-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 50px rgba(0,0,0,0.35);
}

.astro-card__tag {
    display: inline-block;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #6AABDF;
    background: rgba(58,110,167,0.1);
    border: 1px solid rgba(58,110,167,0.3);
    padding: 5px 14px;
    border-radius: 100px;
    align-self: flex-start;
}

.astro-card--venera .astro-card__tag {
    color: #D967A0;
    background: rgba(217,103,160,0.1);
    border-color: rgba(217,103,160,0.3);
}

.astro-card__icon-wrap {
    display: flex;
    align-items: center;
}

.astro-card__icon {
    width: 56px; height: 56px;
    background: rgba(58,110,167,0.12);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6AABDF;
    font-size: 1.4rem;
}

.astro-card--venera .astro-card__icon {
    background: rgba(217,103,160,0.12);
    color: #D967A0;
}

.astro-card__title {
    font-family: var(--font-serif);
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--text);
    line-height: 1.3;
}

.astro-card__subtitle {
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.6;
}

.astro-card__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
}

.astro-card__list li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.875rem;
    color: var(--text-light);
    line-height: 1.5;
}

.astro-card__list li i {
    color: #6AABDF;
    font-size: 0.7rem;
    margin-top: 5px;
    flex-shrink: 0;
}

.astro-card--venera .astro-card__list li i {
    color: #D967A0;
}

.astro-card__highlight {
    background: rgba(217,103,160,0.06);
    border-left: 3px solid #D967A0;
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    padding: 14px 18px;
    font-size: 0.875rem;
    color: var(--text-light);
    font-style: italic;
    line-height: 1.6;
}

.astro-card__info {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.astro-card__info-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    color: var(--text-muted);
}

.astro-card__info-item i {
    color: var(--gold);
    width: 14px;
}

.astro-card__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-top: 20px;
    border-top: 1px solid rgba(255,255,255,0.06);
    flex-wrap: wrap;
}

.astro-card .price__amount {
    color: #6AABDF;
}

.astro-card--venera .price__amount {
    color: #D967A0;
}

/* Extra Topics */
.extra-topics {
    background: var(--dark-3);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: var(--radius-lg);
    padding: 40px;
}

.extra-topics__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 32px;
}

.extra-topics__header h3 {
    font-family: var(--font-serif);
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--text);
}

.extra-topics__icon {
    color: var(--gold);
    font-size: 1rem;
}

.extra-topics__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
}

.extra-topic {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--dark-4);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 100px;
    padding: 10px 20px;
    font-size: 0.85rem;
    color: var(--text-light);
    transition: var(--transition);
}

.extra-topic:hover {
    border-color: rgba(201,168,76,0.3);
    color: var(--text);
}

.extra-topic i {
    color: var(--gold);
    font-size: 0.8rem;
}

/* ==============================
   ABOUT
============================== */
.about {
    background: var(--dark);
}

.about__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
}

.about__orb {
    position: absolute;
    width: 600px; height: 600px;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%);
    filter: blur(60px);
}

.about__container {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 80px;
    align-items: center;
}

.about__visual {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
}

.about__emblem {
    position: relative;
    width: 260px; height: 260px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.about__emblem-ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid;
    animation: rotateSlow linear infinite;
}

.about__emblem-ring--1 {
    inset: 0;
    border-color: rgba(201,168,76,0.25);
    animation-duration: 30s;
}

.about__emblem-ring--2 {
    inset: 30px;
    border-color: rgba(201,168,76,0.15);
    animation-duration: 20s;
    animation-direction: reverse;
}

.about__emblem-ring--3 {
    inset: 60px;
    border-color: rgba(201,168,76,0.3);
    border-style: dashed;
    animation-duration: 40s;
}

@keyframes rotateSlow {
    to { transform: rotate(360deg); }
}

.about__emblem-center {
    width: 100px; height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(201,168,76,0.15), rgba(201,168,76,0.05));
    border: 1px solid rgba(201,168,76,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gold);
    font-size: 2rem;
    position: relative;
    z-index: 2;
    box-shadow: 0 0 40px rgba(201,168,76,0.15);
}

.about__zodiac-signs {
    position: absolute;
    inset: 0;
    z-index: 1;
}

.about__zodiac-signs span {
    position: absolute;
    font-size: 0.9rem;
    color: rgba(201,168,76,0.5);
    top: 50%;
    left: 50%;
    --angle: calc(var(--i) * 30deg);
    transform: rotate(var(--angle)) translateY(-120px) rotate(calc(-1 * var(--angle)));
    margin-top: -0.5em;
    margin-left: -0.5em;
    transition: color 0.3s;
}

.about__emblem:hover .about__zodiac-signs span {
    color: rgba(201,168,76,0.8);
}

.about__name {
    text-align: center;
}

.about__name > span:first-child {
    font-family: var(--font-serif);
    font-size: 2rem;
    font-weight: 500;
    color: var(--gold);
    display: block;
    margin-bottom: 4px;
}

.about__title-line {
    font-size: 0.8rem;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.about__content {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.about__text {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.about__text p {
    font-size: 0.95rem;
    color: var(--text-muted);
    line-height: 1.75;
}

.about__text strong {
    color: var(--text);
}

.about__text em {
    color: var(--gold);
    font-style: normal;
}

.text-gold {
    color: var(--gold);
}

.about__interests {
    background: var(--dark-card);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: var(--radius);
    padding: 24px;
}

.about__interests-title {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 16px;
}

.about__interests-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}

.about__interest {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.85rem;
    color: var(--text-light);
}

.about__interest i {
    color: var(--gold);
    width: 16px;
    font-size: 0.9rem;
}

/* ==============================
   REVIEWS
============================== */
.reviews {
    background: var(--dark-2);
}

.reviews__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    align-items: start;
}

.review-card {
    background: var(--dark-card);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: var(--radius-lg);
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.review-card::before {
    content: '"';
    position: absolute;
    top: -10px;
    right: 20px;
    font-family: var(--font-serif);
    font-size: 8rem;
    line-height: 1;
    color: rgba(201,168,76,0.06);
    pointer-events: none;
}

.review-card:hover {
    border-color: rgba(201,168,76,0.2);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.3);
}

.review-card--wide {
    grid-column: span 3;
    flex-direction: row;
    align-items: flex-start;
    gap: 32px;
}

.review-card--wide blockquote {
    flex: 1;
}

.review-card--wide .review-card__footer {
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    min-width: 110px;
    padding-top: 4px;
}

.review-card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.review-card__stars {
    color: var(--gold);
    font-size: 0.85rem;
    letter-spacing: 2px;
}

.review-card__date {
    font-size: 0.72rem;
    color: var(--text-muted);
    letter-spacing: 0.05em;
}

.review-card__text {
    font-family: var(--font-serif);
    font-size: 1.05rem;
    font-style: italic;
    color: var(--text-light);
    line-height: 1.75;
    flex: 1;
    border: none;
    margin: 0;
    padding: 0;
}

.review-card__footer {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 18px;
    border-top: 1px solid rgba(255,255,255,0.05);
    margin-top: auto;
}

.review-card__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08));
    border: 1px solid rgba(201,168,76,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-serif);
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--gold-light);
    flex-shrink: 0;
}

.review-card__meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.review-card__name {
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text);
}

.review-card__service {
    font-size: 0.72rem;
    color: var(--gold);
    letter-spacing: 0.05em;
}

/* ==============================
   CONTACT
============================== */
.contact {
    background: var(--dark);
}

.contact__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
}

.contact__orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
}

.contact__orb--1 {
    width: 500px; height: 500px;
    top: -200px; right: -100px;
    background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
}

.contact__orb--2 {
    width: 400px; height: 400px;
    bottom: -200px; left: -100px;
    background: radial-gradient(circle, rgba(123,94,167,0.07) 0%, transparent 70%);
}

.contact__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
}

.contact__steps-title {
    font-family: var(--font-serif);
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 32px;
}

.contact__step {
    display: flex;
    gap: 20px;
    padding-bottom: 28px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    margin-bottom: 28px;
}

.contact__step:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
}

.contact__step-num {
    font-family: var(--font-serif);
    font-size: 2rem;
    font-weight: 600;
    color: rgba(201,168,76,0.2);
    line-height: 1;
    flex-shrink: 0;
    width: 40px;
}

.contact__step-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.contact__step-text strong {
    font-size: 0.95rem;
    color: var(--text);
}

.contact__step-text span {
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.6;
}

.contact__card {
    background: var(--dark-card);
    border: 1px solid rgba(201,168,76,0.15);
    border-radius: var(--radius-lg);
    padding: 48px 40px;
    text-align: center;
    box-shadow: var(--shadow-gold);
}

.contact__card-icon {
    font-size: 2rem;
    color: var(--gold);
    margin-bottom: 20px;
    display: block;
    animation: glow 3s ease-in-out infinite;
}

@keyframes glow {
    0%, 100% { text-shadow: 0 0 10px rgba(201,168,76,0.3); }
    50% { text-shadow: 0 0 30px rgba(201,168,76,0.7); }
}

.contact__card h3 {
    font-family: var(--font-serif);
    font-size: 1.8rem;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 12px;
}

.contact__card p {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 32px;
    line-height: 1.65;
}

.contact__messengers {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
}

.messenger-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 16px 24px;
    border-radius: var(--radius);
    font-size: 0.95rem;
    font-weight: 600;
    transition: var(--transition);
}

.messenger-btn i {
    font-size: 1.2rem;
}

.messenger-btn--tg {
    background: linear-gradient(135deg, #0088CC, #29B6F6);
    color: #fff;
}

.messenger-btn--tg:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,136,204,0.4);
}

.messenger-btn--wa {
    background: linear-gradient(135deg, #128C7E, #25D366);
    color: #fff;
}

.messenger-btn--wa:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(37,211,102,0.4);
}

.contact__price-reminder {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
}

.contact__price-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.contact__price-tag {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 100px;
}

.silver-tag {
    color: var(--silver-light);
    background: rgba(168,181,200,0.1);
    border: 1px solid rgba(168,181,200,0.3);
}

.gold-tag {
    color: var(--gold-light);
    background: rgba(201,168,76,0.1);
    border: 1px solid rgba(201,168,76,0.3);
}

.astro-tag {
    color: #6AABDF;
    background: rgba(58,110,167,0.1);
    border: 1px solid rgba(58,110,167,0.3);
}

.contact__price-val {
    font-size: 0.9rem;
    color: var(--text-light);
    font-weight: 500;
}

/* ==============================
   FOOTER
============================== */
.footer {
    background: var(--dark-2);
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 48px 0 32px;
}

.footer__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 20px;
    margin-bottom: 32px;
}

.footer__logo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.footer__logo .logo-symbol {
    font-size: 1.6rem;
}

.footer__logo .logo-text {
    font-size: 1.3rem;
    display: block;
}

.footer__tagline {
    font-size: 0.85rem;
    color: var(--text-muted);
    max-width: 480px;
    line-height: 1.6;
}

.footer__links {
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
    justify-content: center;
}

.footer__links a {
    font-size: 0.85rem;
    color: var(--text-muted);
    transition: color 0.2s;
}

.footer__links a:hover {
    color: var(--gold);
}

.footer__bottom {
    border-top: 1px solid rgba(255,255,255,0.05);
    padding-top: 24px;
    text-align: center;
}

.footer__bottom p {
    font-size: 0.8rem;
    color: rgba(136,136,170,0.5);
}

/* ==============================
   AOS ANIMATIONS
============================== */
[data-aos] {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.65s ease, transform 0.65s ease;
}

[data-aos="fade-right"] {
    transform: translateX(-24px);
}

[data-aos="fade-left"] {
    transform: translateX(24px);
}

[data-aos].aos-animate {
    opacity: 1;
    transform: none;
}

/* ==============================
   RESPONSIVE
============================== */
@media (max-width: 1024px) {
    .services__grid,
    .astro__grid {
        grid-template-columns: 1fr;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }

    .why__grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .about__container {
        grid-template-columns: 1fr;
        gap: 48px;
    }

    .about__visual {
        flex-direction: row;
        justify-content: center;
    }

    .reviews__grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .review-card--wide {
        grid-column: span 2;
        flex-direction: column;
    }

    .review-card--wide .review-card__footer {
        flex-direction: row;
        align-items: center;
    }

    .contact__content {
        grid-template-columns: 1fr;
        gap: 48px;
    }
}

@media (max-width: 768px) {
    .nav__menu {
        position: fixed;
        top: 0; right: -100%;
        width: 280px;
        height: 100vh;
        background: rgba(13,13,20,0.98);
        backdrop-filter: blur(20px);
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 40px 32px;
        gap: 24px;
        transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        border-left: 1px solid rgba(201,168,76,0.15);
        z-index: 999;
    }

    .nav__menu.open {
        right: 0;
    }

    .nav__link {
        font-size: 1.1rem;
        color: var(--text);
    }

    .nav__burger {
        display: flex;
        z-index: 1000;
    }

    .nav__burger.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .nav__burger.open span:nth-child(2) { opacity: 0; }
    .nav__burger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

    .section {
        padding: 72px 0;
    }

    .section__header {
        margin-bottom: 48px;
    }

    .why__grid {
        grid-template-columns: 1fr;
    }

    .reviews__grid {
        grid-template-columns: 1fr;
    }

    .review-card--wide {
        grid-column: span 1;
    }

    .about__visual {
        flex-direction: column;
    }

    .about__interests-grid {
        grid-template-columns: 1fr;
    }

    .services__gift {
        flex-direction: column;
        text-align: center;
    }

    .service-card__footer {
        flex-direction: column;
    }

    .service-card__footer .btn {
        width: 100%;
    }

    .extra-topics__grid {
        flex-direction: column;
        align-items: center;
    }

    .hero__stats {
        flex-direction: column;
        gap: 20px;
    }

    .hero__stat-divider {
        display: none;
    }
}

@media (max-width: 480px) {
    .hero__title {
        font-size: clamp(2.8rem, 14vw, 4rem);
    }

    .hero__actions {
        flex-direction: column;
        align-items: center;
    }

    .service-card,
    .astro-card {
        padding: 28px 24px;
    }

    .contact__card {
        padding: 36px 24px;
    }

    .contact__price-reminder {
        flex-direction: column;
        align-items: center;
    }
}
