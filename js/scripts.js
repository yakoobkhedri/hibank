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
