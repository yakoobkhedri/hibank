// swiper

document.querySelectorAll('.installment-slider').forEach(sliderContainer => {
  const swiperEl = sliderContainer.querySelector('.swiper');
  const contentContainer = sliderContainer.querySelector('.installment-content');
  
  new Swiper(swiperEl, {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: swiperEl.querySelector('.swiper-button-next'),
      prevEl: swiperEl.querySelector('.swiper-button-prev'),
    },
    on: {
      init: function() {
        const firstSlide = this.slides[0];
        const firstDataId = firstSlide.getAttribute('data-1d');
        contentContainer.querySelector(`.monthcontent[data-1d="${firstDataId}"]`).classList.add('active');
      },
      slideChange: function() {
        const activeSlide = this.slides[this.activeIndex];
        const dataId = activeSlide.getAttribute('data-1d');
        
        contentContainer.querySelectorAll('.monthcontent').forEach(content => {
          content.classList.remove('active');
        });
        
        contentContainer.querySelector(`.monthcontent[data-1d="${dataId}"]`).classList.add('active');
      }
    }
  });
});


var wellcome = new Swiper(".wellcome", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: false,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: ".swiper-pagination",
    },
    on: {
        init: function () {
            updateNavigationButtons(this);
        },
        slideChange: function () {
            updateNavigationButtons(this);
        }
    }
});

function updateNavigationButtons(swiper) {
    const nextButton = document.querySelector('.swiper-button-next');
    const prevButton = document.querySelector('.swiper-button-prev');
    const loginButton = document.getElementById('login');
    const signupButton = document.getElementById('signup');
    
    // مخفی کردن دکمه‌های ورود و ثبت نام به صورت پیش‌فرض
    loginButton.style.display = 'none';
    signupButton.style.display = 'none';
    
    // حذف کلاس‌های قبلی
    nextButton.classList.remove('flex-grow-1');
    prevButton.classList.remove('flex-grow-1');
    
    if (swiper.isBeginning) {
        // اسلاید اول
        nextButton.textContent = 'شروع کن';
        nextButton.classList.add('flex-grow-1');
        prevButton.style.display = 'none';
    } else if (swiper.isEnd) {
        // اسلاید آخر
        // مخفی کردن دکمه‌های ناوبری اصلی
        nextButton.style.display = 'none';
        prevButton.style.display = 'none';
        
        // نمایش دکمه‌های ورود و ثبت نام
        loginButton.style.display = 'flex';
        signupButton.style.display = 'flex';
        
    } else {
        // اسلایدهای میانی
        nextButton.textContent = 'بعدی';
        prevButton.textContent = 'قبلی';
        nextButton.classList.add('flex-grow-1');
        prevButton.classList.add('flex-grow-1');
        prevButton.style.display = 'flex';
        nextButton.style.display = 'flex';
    }
}


