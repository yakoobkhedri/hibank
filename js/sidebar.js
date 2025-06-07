// accordion

function setupAccordion() {
    let accordionBtn2 = Array.from(document.getElementsByClassName('accordionBtn2'));

    if (window.innerWidth > 1071) {
        accordionBtn2.forEach((item) => {
            item.addEventListener('click', function () {
                item.nextElementSibling.classList.toggle('active');
                item.classList.toggle('active');
            });
        });
    }
}

// اجرای تابع در ابتدا
setupAccordion();

// اجرای تابع در صورت تغییر اندازه صفحه
// window.addEventListener('resize', setupAccordion);


// dropdown

let openDropDown = Array.from(document.getElementsByClassName('openDropDown'));

openDropDown.forEach((item)=>{
  item.addEventListener('click', function () {
    item.nextElementSibling.classList.toggle('active');
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.DropdownArea')) {
        item.nextElementSibling.classList.remove('active');
      }
    })
  })
})