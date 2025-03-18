import { Swiper } from 'swiper'; // Ядро Swiper
import { Navigation, Pagination } from 'swiper/modules'; // Модули из подмодуля
import 'swiper/swiper-bundle.css'; // Стили

/**
 * Инициализирует карусель Swiper.
 * @returns {Swiper} Экземпляр Swiper.
 */
export const initSwiper = () => {
    const swiper = new Swiper('.swiper-container', {
        modules: [Navigation, Pagination], // Подключаем модули
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 20,
        loop: true,
        loopedSlides: 4,
        initialSlide: 0,
        watchSlidesProgress: true,
        centeredSlides: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                centeredSlides: true,
            },
            768: {
                slidesPerView: 2,
                centeredSlides: true,
            },
        },
        effect: 'slide',
        speed: 600,
        preloadImages: true,
        updateOnImagesReady: true,
        on: {
            progress: function () {
                const slides = this.slides;
                slides.forEach(slide => {
                    const progress = slide.progress;
                    const opacity = Math.max(0.3, 1 - Math.abs(progress) * 0.7);
                    slide.style.opacity = opacity;

                    if (window.innerWidth > 768) {
                        if (progress === 0) {
                            slide.style.maskImage = 'none';
                            slide.style.webkitMaskImage = 'none';
                        } else if (progress < 0) {
                            slide.style.maskImage = 'linear-gradient(to right, transparent 10%, black 70%)';
                            slide.style.webkitMaskImage = 'linear-gradient(to right, transparent 10%, black 70%)';
                        } else if (progress > 0) {
                            slide.style.maskImage = 'linear-gradient(to left, transparent 10%, black 70%)';
                            slide.style.webkitMaskImage = 'linear-gradient(to left, transparent 10%, black 70%)';
                        }
                    } else {
                        slide.style.maskImage = 'none';
                        slide.style.webkitMaskImage = 'none';
                    }
                });
            },
            slideChange: function () {
                const activeSlide = this.slides[this.activeIndex];
                const moduleId = activeSlide.getAttribute('data-module');
                const moduleContents = document.querySelectorAll('.module-content');
                const anyModuleActive = Array.from(moduleContents).some(content => content.classList.contains('active'));

                if (anyModuleActive) {
                    moduleContents.forEach(content => content.classList.remove('active'));
                    const activeModule = document.getElementById(moduleId);
                    if (activeModule) {
                        activeModule.classList.add('active');
                    }
                }
            },
            setTranslate: function () {
                this.updateProgress();
            },
        },
    });

    return swiper;
};

/**
 * Скрывает прелоадер после загрузки страницы.
 */
export const hidePreloader = () => {
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
        setTimeout(() => preloader.remove(), 500);
    });
};