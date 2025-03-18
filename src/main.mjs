import { initSwiper, hidePreloader } from './swiper-config.mjs';
import { initModuleHandlers } from './module-handlers.mjs';
import { initScrollHandler, smoothScrollTo } from './scroll-handler.mjs';

initSwiper();
initModuleHandlers(smoothScrollTo);
initScrollHandler();
hidePreloader();