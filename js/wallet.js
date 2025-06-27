document.addEventListener('DOMContentLoaded', function() {
    // داده‌های اسلایدها
    const periods = [
        { months: 6, title: "6 ماهه" },
        { months: 12, title: "12 ماهه" },
        { months: 18, title: "18 ماهه" },
        { months: 24, title: "24 ماهه" }
    ];

    const sliderTrack = document.querySelector('.slider-track');
    const repaymentContents = document.querySelector('.repayment-contents');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    
    let currentIndex = 1; // شروع از اسلاید وسط (12 ماهه)
    let slides = [];
    
    // ایجاد اسلایدها و محتوای مربوطه
    function createSlides() {
        // پاک کردن اسلایدهای قبلی
        sliderTrack.innerHTML = '';
        repaymentContents.innerHTML = '';
        
        // ایجاد اسلایدها
        periods.forEach((period, index) => {
            // ایجاد اسلاید
            const slide = document.createElement('div');
            slide.className = 'slider-slide';
            slide.setAttribute('data-period', period.months);
            slide.innerHTML = `<p class="month mb-0">${period.title}</p>`;
            sliderTrack.appendChild(slide);
            
            // ایجاد محتوای مربوطه
            const content = document.createElement('div');
            content.className = 'repayment-content';
            content.setAttribute('data-period', period.months);
            
            // محاسبه مبلغ هر قسط
            const installment = Math.floor(40000000 / period.months).toLocaleString('fa-IR');
            
            content.innerHTML = `
                <div class="rounded-10 bg-sky3 p-4 mb-5">
                    <div class="d-flex align-items-center justify-content-between gap-3 fs-14 fw-bold mb-3">
                        <p class="mb-0 text-main3 fs-14">میزان وام</p>
                        <div class="d-flex align-items-center gap-2">
                            <p class="mb-0 fw-bold text-main3">۴۰/۰۰۰/۰۰۰</p>
                            <p class="fs-12 text-main3 mb-0">تومان</p>
                        </div>
                    </div>
                    <img alt="img" src="images/Line 9.png" class="d-block w-100 mb-3 h-1">
                    <div class="d-flex align-items-center justify-content-between gap-3 fs-14 fw-bold mb-3">
                        <p class="mb-0 text-main3 fs-14">تعداد اقساط</p>
                        <div class="d-flex align-items-center gap-2">
                            <p class="mb-0 fw-bold text-main3">${period.months}</p>
                            <p class="fs-12 text-main3 mb-0">ماهه</p>
                        </div>
                    </div>
                    <img alt="img" src="images/Line 9.png" class="d-block w-100 mb-3 h-1">
                    <div class="d-flex align-items-center justify-content-between gap-3 fs-14 fw-bold">
                        <p class="mb-0 text-main3 fs-14">هر قسط</p>
                        <div class="d-flex align-items-center gap-2">
                            <p class="mb-0 fw-bold text-main3">${installment}</p>
                            <p class="fs-12 text-main3 mb-0">تومان</p>
                        </div>
                    </div>
                </div>
                <h5 class="fs-18 fw-bold text-center">جدول اقساط</h5>
                <div class="px-3 mt-4">
                    <div class="row py-3 align-items-center fs-sm-10 rounded-10 bg-sky3 fs-14 fw-bold text-main3 text-center">
                        <div class="col-3">شماره قسط</div>
                        <div class="col-3">تاریخ سررسید</div>
                        <div class="col-3">مبلغ قسط</div>
                        <div class="col-3">وضعیت</div>
                    </div>
                    ${Array.from({length: 3}, (_, i) => `
                    <div class="row py-3 align-items-center fs-sm-10 fs-14 text-dark text-center">
                        <div class="col-3">${i+1}</div>
                        <div class="col-3">۱۴۰۴/۰${i+4}/۳۰</div>
                        <div class="col-3">${installment}</div>
                        <div class="col-3">پرداخت نشده</div>
                    </div>
                    ${i < 2 ? '<img alt="img" src="images/Line 9.png" class="d-block w-100 h-1">' : ''}
                    `).join('')}
                </div>
            `;
            
            repaymentContents.appendChild(content);
        });
        
        // ذخیره اسلایدها برای دسترسی آسان
        slides = document.querySelectorAll('.slider-slide');
        
        // تنظیم موقعیت اولیه
        updateSlider();
    }
    
    // تابع برای به‌روزرسانی اسلایدر
    function updateSlider() {
        // حلقه لوپ (اگر از انتها گذشتیم به ابتدا برو و بالعکس)
        if (currentIndex >= periods.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = periods.length - 1;
        }
        
        // مرکز‌سازی اسلاید فعال
        const slideWidth = 100 / periods.length;
        const offset = -currentIndex * slideWidth;
        sliderTrack.style.transform = `translateX(${offset}%)`;
        
        // به‌روزرسانی وضعیت فعال
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // به‌روزرسانی محتوای نمایش داده شده
        document.querySelectorAll('.repayment-content').forEach(content => {
            if (parseInt(content.getAttribute('data-period')) === periods[currentIndex].months) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }
    
    // رویداد کلیک برای دکمه قبلی
    prevArrow.addEventListener('click', function() {
        currentIndex--;
        updateSlider();
    });
    
    // رویداد کلیک برای دکمه بعدی
    nextArrow.addEventListener('click', function() {
        currentIndex++;
        updateSlider();
    });
    
    // رویداد کلیک برای اسلایدها
    document.addEventListener('click', function(e) {
        const slide = e.target.closest('.slider-slide');
        if (slide) {
            const index = Array.from(slides).indexOf(slide);
            if (index !== -1) {
                currentIndex = index;
                updateSlider();
            }
        }
    });
    
    // ایجاد اسلایدها هنگام لود صفحه
    createSlides();
});

