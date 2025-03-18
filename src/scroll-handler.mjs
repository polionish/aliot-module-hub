import { CONFIG } from './config.mjs';

const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

/**
 * Плавно прокручивает страницу к указанной позиции.
 * @param {number} target - Целевая позиция прокрутки (пиксели).
 * @param {number} duration - Длительность анимации (мс).
 */
export const smoothScrollTo = (target, duration) => {
    let isScrolling = window.isScrolling || false;
    if (isScrolling) return;
    window.isScrolling = true;

    const start = window.scrollY;
    const distance = target - start;
    let startTime = null;

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            window.isScrolling = false;
        }
    };

    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
};

export const initScrollHandler = () => {
    const moduleContents = document.querySelectorAll('.module-content');

    window.addEventListener('scroll', debounce(() => {
        const scrollPosition = window.scrollY;
        if (scrollPosition < CONFIG.SCROLL_THRESHOLD && !window.isModuleOpening() && !window.isScrolling) {
            moduleContents.forEach(content => content.classList.remove('active'));
            if (scrollPosition > 0) {
                smoothScrollTo(0, CONFIG.ANIMATION_DURATION);
            }
        }
    }, 100));
};