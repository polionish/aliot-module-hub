import { CONFIG } from './config.mjs';

const closeAllModules = (moduleContents) => {
    moduleContents.forEach(content => content.classList.remove('active'));
};

const openModule = (moduleId, moduleContents, smoothScrollTo) => {
    let isModuleOpening = true;
    closeAllModules(moduleContents);
    const activeModule = document.getElementById(moduleId);
    if (activeModule) {
        activeModule.classList.add('active');
        const moduleDetails = document.getElementById('module-details');
        const targetPosition = moduleDetails.getBoundingClientRect().top + window.scrollY;
        smoothScrollTo(targetPosition, CONFIG.ANIMATION_DURATION);
        setTimeout(() => {
            isModuleOpening = false;
        }, CONFIG.ANIMATION_DURATION);
        return true;
    }
    console.error(`Модуль с ID ${moduleId} не найден`);
    return false;
};

export const initModuleHandlers = (smoothScrollTo) => {
    const slides = document.querySelectorAll('.swiper-slide');
    const moduleContents = document.querySelectorAll('.module-content');
    let isModuleOpening = false;

    slides.forEach(slide => {
        slide.addEventListener('click', (e) => {
            const moduleId = slide.getAttribute('data-module');
            isModuleOpening = openModule(moduleId, moduleContents, smoothScrollTo);
        });

        const button = slide.querySelector('.module-btn');
        if (button) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const moduleId = slide.getAttribute('data-module');
                isModuleOpening = openModule(moduleId, moduleContents, smoothScrollTo);
            });
        }
    });

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            closeAllModules(moduleContents);
            smoothScrollTo(0, CONFIG.ANIMATION_DURATION);
        });
    });

    window.isModuleOpening = () => isModuleOpening;
};