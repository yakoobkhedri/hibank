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