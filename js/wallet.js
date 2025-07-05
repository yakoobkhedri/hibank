// Swiper Wallet (بدون تغییر)
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
            const activeSlide = this.slides[this.activeIndex];
            const activeId = activeSlide.getAttribute('data-id');
            
            document.querySelectorAll('.cartVamDetails').forEach(item => {
                item.classList.remove('active');
            });
            
            const targetDetail = document.querySelector(`.cartVamDetails[data-id="${activeId}"]`);
            if (targetDetail) {
                targetDetail.classList.add('active');
                
                // Initialize repayment swiper for this wallet
                initRepaymentSwiper(activeId);
            }
        }
    }
});

// Swiper Repayment (اصلاح شده)
var repayment;

function initRepaymentSwiper(walletId) {
    // اگر Swiper قبلی وجود دارد، نابودش کن
    if (repayment) {
        repayment.destroy(true, true);
    }
    
    // مقداردهی اولیه جدید
    repayment = new Swiper(`.cartVamDetails[data-id="${walletId}"] .repayment`, {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        centeredSlides: true,
        navigation: {
            nextEl: `.cartVamDetails[data-id="${walletId}"] .swiper-button-next`,
            prevEl: `.cartVamDetails[data-id="${walletId}"] .swiper-button-prev`,
        },
        on: {
            init: function() {
                // حذف کلاس first در اولین بار
                document.querySelectorAll('.repaymentDetail.first').forEach(el => {
                    el.classList.remove('first');
                });
                updateActiveRepaymentDetail(this);
            },
            slideChange: function() {
                updateActiveRepaymentDetail(this);
            }
        }
    });
}

function updateActiveRepaymentDetail(swiperInstance) {
    const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
    if (activeSlide) {
        const activeId = activeSlide.getAttribute('data-id');
        const parentWalletId = swiperInstance.el.closest('.cartVamDetails').getAttribute('data-id');
        
        // غیرفعال کردن همه repaymentDetailهای مربوط به این wallet
        document.querySelectorAll(`.cartVamDetails[data-id="${parentWalletId}"] .repaymentDetail`).forEach(detail => {
            detail.classList.remove('active');
        });
        
        // فعال کردن repaymentDetail مربوطه
        const targetDetail = document.querySelector(`.cartVamDetails[data-id="${parentWalletId}"] .repaymentDetail[data-id="${activeId}"]`);
        if (targetDetail) {
            targetDetail.classList.add('active');
        }
    }
}

// مقداردهی اولیه
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.cartVamDetails[data-id="1"]').classList.add('active');
    initRepaymentSwiper('1');
});

// رویداد کلیک پرداخت
document.querySelector('.bg-green').addEventListener('click', function(e) {
    e.preventDefault();
    
    const walletActiveSlide = wallet.slides[wallet.activeIndex];
    const walletId = walletActiveSlide.getAttribute('data-id');
    
    const repaymentActiveSlide = repayment.slides[repayment.activeIndex];
    const repaymentId = repaymentActiveSlide.getAttribute('data-id');
    
    alert(`Wallet Active ID: ${walletId}, Repayment Active ID: ${repaymentId}`);
});