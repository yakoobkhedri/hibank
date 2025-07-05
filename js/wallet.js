var wallet = new Swiper(".wallet", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: ".swiper-pagination",
    },
    on: {
        slideChange: function () {
            // پیدا کردن اسلاید فعال
            const activeSlide = this.slides[this.activeIndex];
            // دریافت data-id از اسلاید فعال
            const activeId = activeSlide.getAttribute('data-id');
            
            // حذف کلاس active از همه cartVamDetails
            document.querySelectorAll('.cartVamDetails').forEach(item => {
                item.classList.remove('active');
            });
            
            // اضافه کردن کلاس active به cartVamDetails مربوطه
            const targetDetail = document.querySelector(`.cartVamDetails[data-id="${activeId}"]`);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        }
    }
});

// مقداردهی اولیه برای نمایش اولین جزئیات
document.querySelector('.cartVamDetails[data-id="1"]').classList.add('active');


var repayment = new Swiper(".repayment", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    centeredSlides: true, // این خط اسلاید اکتیو را وسط قرار می‌دهد
    autoplay: false,
    navigation: {
        nextEl: '.swiper-button-next', // دکمه بعدی
        prevEl: '.swiper-button-prev', // دکمه قبلی
    },
});