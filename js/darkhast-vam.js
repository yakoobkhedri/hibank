document.addEventListener('DOMContentLoaded', function() {
  // مدیریت دکمه‌های ادامه
  const nextButtons = document.querySelectorAll('.next-step');
  nextButtons.forEach(button => {
    button.addEventListener('click', function() {
      const currentStepId = this.getAttribute('data-current');
      const nextStepId = this.getAttribute('data-next');
      navigateToStep(currentStepId, nextStepId);
    });
  });

  // مدیریت دکمه‌های قبلی
  const prevButtons = document.querySelectorAll('.prev-step');
  prevButtons.forEach(button => {
    button.addEventListener('click', function() {
      const currentStepId = this.getAttribute('data-current');
      const prevStepId = this.getAttribute('data-prev');
      navigateToStep(currentStepId, prevStepId);
    });
  });

  // تابع عمومی برای تغییر مراحل
  function navigateToStep(fromStepId, toStepId) {
    // مخفی کردن مرحله فعلی
    document.getElementById(fromStepId).style.display = 'none';
    
    // نمایش مرحله هدف
    document.getElementById(toStepId).style.display = 'block';
    
    // آپدیت وضعیت stepTabها
    updateStepTabs(fromStepId, toStepId);
  }

  // تابع به‌روزرسانی وضعیت تب‌ها
  function updateStepTabs(fromStepId, toStepId) {
    const stepTabs = document.querySelectorAll('.stepTab');
    const fromStepNum = parseInt(fromStepId.replace('step', ''));
    const toStepNum = parseInt(toStepId.replace('step', ''));

    stepTabs.forEach(tab => {
      tab.classList.remove('checked', 'current', 'unchecked');
      const tabStepNum = parseInt(tab.getAttribute('data-step'));

      if (tabStepNum < toStepNum) {
        // مراحل قبل از مرحله هدف - تکمیل شده
        tab.classList.add('checked');
      } else if (tabStepNum === toStepNum) {
        // مرحله هدف - فعلی
        tab.classList.add('current');
      } else {
        // مراحل بعد - تکمیل نشده
        tab.classList.add('unchecked');
      }
    });
  }

  // مقداردهی اولیه
  updateStepTabs('step1', 'step1');
});


// upload

document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('fileInput');
  const previewContainer = document.getElementById('previewContainer');
  const previewImage = document.getElementById('previewImage');
  const deleteButton = document.getElementById('deleteButton');
  const errorMessage = document.getElementById('errorMessage');
  
  // وقتی فایل انتخاب شد
  fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // بررسی نوع فایل
    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      showError('فرمت فایل مجاز نیست. فقط JPG, PNG, PDF قابل قبول است.');
      return;
    }
// بررسی حجم فایل (5MB)
    if (file.size > 5 * 1024 * 1024) {
      showError('حجم فایل باید کمتر از 5MB باشد.');
      return;
    }
    
    errorMessage.style.display = 'none';
    
    // نمایش پیش‌نمایش برای تصاویر
    if (file.type.includes('image')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        previewImage.src = e.target.result;
        previewContainer.style.display = 'block';
      };
      reader.readAsDataURL(file);
    } else {
      // برای PDF یک تصویر جایگزین نمایش می‌دهیم
      previewImage.src = 'images/pdf-icon.png'; // شما باید یک آیکون PDF مناسب داشته باشید
      previewContainer.style.display = 'block';
    }
  });
  
  // حذف عکس
  deleteButton.addEventListener('click', function() {
    fileInput.value = ''; // پاک کردن مقدار input file
    previewContainer.style.display = 'none';
  });
  
  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    fileInput.value = ''; // پاک کردن مقدار input file
  }
});

// sidebar

let openSidebar = document.getElementById('openSidebar');
let overlay2 = document.getElementById('overlay2');
let stepsSidebar = document.getElementById('steps-sidebar');

openSidebar.addEventListener('click' , function () {
  stepsSidebar.classList.add('active');
  overlay2.classList.add('active');
});

overlay2.addEventListener('click' , function () {
  stepsSidebar.classList.remove('active');
  overlay2.classList.remove('active');
});

// increase && decrease

 document.addEventListener('DOMContentLoaded', function() {
    const rangeInput = document.getElementById('amount-range');
    const amountInput = document.getElementById('amount-input');
    const plusBtn = document.querySelector('.plus-btn');
    const minusBtn = document.querySelector('.minus-btn');
    const MIN_VALUE = 10000000; // 10 میلیون
    const MAX_VALUE = 100000000; // 100 میلیون
    const STEP = 5000000; // گام تغییر 5 میلیون

    // تبدیل اعداد فارسی به انگلیسی (برای محاسبه)
    function toEnglishNumber(numStr) {
      const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return numStr.replace(/[۰-۹]/g, function(w) {
        return persianNumbers.indexOf(w);
      }).replace(/\D/g, '');
    }

    // قالب‌بندی عدد با جداکننده '/' هر سه رقم
    function formatPersianNumber(num) {
      const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      let numStr = num.toString();
      let formatted = '';
      let counter = 0;

      // جدا کردن سه رقم سه رقم از راست به چپ
      for (let i = numStr.length - 1; i >= 0; i--) {
        formatted = numStr[i] + formatted;
        counter++;
        if (counter % 3 === 0 && i !== 0) {
          formatted = '/' + formatted;
        }
      }

      // تبدیل ارقام به فارسی
      return formatted.replace(/\d/g, function(w) {
        return persianNumbers[+w];
      });
    }

    // به روز رسانی مقدار input بر اساس range
    function updateAmountFromRange() {
      amountInput.value = formatPersianNumber(rangeInput.value);
    }

    // به روز رسانی range بر اساس مقدار input
    function updateRangeFromAmount() {
      rangeInput.value = toEnglishNumber(amountInput.value);
    }

    // رویداد تغییر برای range
    rangeInput.addEventListener('input', updateAmountFromRange);

    // رویداد کلیک برای دکمه‌های + و -
    plusBtn.addEventListener('click', function() {
      let currentValue = parseInt(toEnglishNumber(amountInput.value));
      let newValue = currentValue + STEP;
      newValue = Math.min(newValue, MAX_VALUE);
      amountInput.value = formatPersianNumber(newValue);
      rangeInput.value = newValue;
    });

    minusBtn.addEventListener('click', function() {
      let currentValue = parseInt(toEnglishNumber(amountInput.value));
      let newValue = currentValue - STEP;
      newValue = Math.max(newValue, MIN_VALUE);
      amountInput.value = formatPersianNumber(newValue);
      rangeInput.value = newValue;
    });

    // مقداردهی اولیه
    updateAmountFromRange();
  });

  // change ghest month

  document.addEventListener('DOMContentLoaded', function() {
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const durationDisplay = document.getElementById('duration-display');
  const installmentOptions = document.querySelectorAll('.installment-option');
  
  const durations = [
    { months: 12, display: '12 ماهه', installment: '۳/۴۰۰/۰۰۰' },
    { months: 18, display: '18 ماهه', installment: '۲/۴۰۰/۰۰۰' },
    { months: 24, display: '24 ماهه', installment: '۱/۹۰۰/۰۰۰' }
  ];
  
  let currentIndex = 0;

  // تابع برای به روز رسانی نمایش
  function updateDisplay() {
    // به روز رسانی متن مدت بازپرداخت
    durationDisplay.textContent = durations[currentIndex].display;
    
    // مخفی کردن همه گزینه‌ها
    installmentOptions.forEach(option => {
      option.classList.add('d-none');
    });
    
    // نمایش گزینه فعلی
    document.getElementById(`option-${durations[currentIndex].months}`).classList.remove('d-none');
  }

  // رویداد کلیک برای دکمه قبلی
  prevBtn.addEventListener('click', function() {
    currentIndex = (currentIndex - 1 + durations.length) % durations.length;
    updateDisplay();
  });

  // رویداد کلیک برای دکمه بعدی
  nextBtn.addEventListener('click', function() {
    currentIndex = (currentIndex + 1) % durations.length;
    updateDisplay();
  });

  // مقداردهی اولیه
  updateDisplay();
});

// datapicker

jalaliDatepicker.startWatch();
