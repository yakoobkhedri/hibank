
// تابع ایجاد چارت
function createPieChart(chartId, values, colors) {
    const total = values.reduce((sum, value) => sum + value, 0);
    let accumulated = 0;
    let gradientParts = [];
    
    values.forEach((value, index) => {
        const percentage = (value / total) * 100;
        gradientParts.push(`${colors[index]} ${accumulated}% ${accumulated + percentage}%`);
        accumulated += percentage;
    });
    
    document.getElementById(chartId).style.background = `conic-gradient(${gradientParts.join(', ')})`;
}

// مقداردهی اولیه چارت‌ها
document.addEventListener('DOMContentLoaded', function() {
    // چارت 1
    createPieChart('pieChart1', [123540, 50000, 50000], ['#005AFE', '#AACDFC', '#598BF6']);
    
    // چارت 2
    createPieChart('pieChart2', [90000, 60000, 30000], ['#005AFE', '#AACDFC', '#598BF6']);
    
    // چارت 3
    createPieChart('pieChart3', [90000, 60000, 30000], ['#005AFE', '#AACDFC', '#598BF6']);
    
    // چارت 4
    createPieChart('pieChart4', [90000, 60000, 30000], ['#005AFE', '#AACDFC', '#598BF6']);
    
    // برای اضافه کردن چارت جدید:
    // createPieChart('pieChart3', [value1, value2, value3], ['color1', 'color2', 'color3']);
});
