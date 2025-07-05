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


document.addEventListener('DOMContentLoaded', function() {
    // Get tabs and contents
    let tabs = document.querySelectorAll('.repayment .swiper-slide');
    let contents = Array.from(document.getElementsByClassName('repaymentDetail'));

    // Initialize swiper
    var repayment = new Swiper(".repayment", {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: true,
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function() {
                // Show first detail initially if exists
                const firstDetail = document.querySelector('.repaymentDetail.first');
                if (firstDetail) {
                    firstDetail.classList.add('active');
                };
                
                // Add click handlers to tabs
                tabs.forEach((tab) => {
                    tab.addEventListener('click', function() {
                        // Remove active class from all tabs
                        tabs.forEach(t => t.classList.remove('swiper-slide-active'));
                        // Add active class to clicked tab
                        tab.classList.add('swiper-slide-active');
                        
                        let tabId = tab.dataset.id;
                        contents.forEach((content) => {
                            let contentId = content.dataset.id;
                            if (tabId === contentId) {
                                content.classList.add('active');
                            } else {
                                content.classList.remove('active');
                            }
                        });
                    });
                });
            },
            slideChange: function() {
                // Only remove first class if it's not the initial load
                if (!this.initialized) {
                    const firstElements = document.querySelectorAll('.repaymentDetail.first');
                    firstElements.forEach(el => {
                        el.classList.remove('first');
                    });
                    this.initialized = true;
                }
                
                // Show active slide's detail
                const activeSlide = this.slides[this.activeIndex];
                if (activeSlide) {
                    const activeId = activeSlide.getAttribute('data-id');
                    
                    // Update active tab
                    tabs.forEach(tab => {
                        tab.classList.remove('swiper-slide-active');
                        if (tab.dataset.id === activeId) {
                            tab.classList.add('swiper-slide-active');
                        }
                    });
                    
                    // Update active content
                    contents.forEach(detail => {
                        detail.classList.remove('active');
                        if (detail.dataset.id === activeId) {
                            detail.classList.add('active');
                        }
                    });
                }
            }
        }
    });
});
document.querySelector('.bg-green').addEventListener('click', function(e) {
    e.preventDefault();
    
    // دریافت data-id از اسلاید فعال wallet
    const walletActiveSlide = wallet.slides[wallet.activeIndex];
    const walletId = walletActiveSlide.getAttribute('data-id');
    
    // دریافت data-id از اسلاید فعال repayment
    // const repaymentActiveSlide = repayment.slides[repayment.activeIndex];
    // const repaymentId = repaymentActiveSlide.getAttribute('data-id');
    
    alert(`Wallet Active ID: ${walletId}`);
});
