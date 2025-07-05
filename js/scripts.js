// swiper

var months = new Swiper(".months", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next', // دکمه بعدی
        prevEl: '.swiper-button-prev', // دکمه قبلی
    },
});
