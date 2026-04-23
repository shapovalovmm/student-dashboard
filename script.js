// ==========================================
// МОДУЛЬ 1: Аналітика наведення миші (Стек технологій)
// Вимоги: mouseover, mouseout, target, relatedTarget
// ==========================================
const skillsRadar = document.getElementById('skillsRadar');

skillsRadar.onmouseover = function(event) {
    // target - елемент, на який ми щойно навели курсор
    let target = event.target;
    // relatedTarget - елемент, з якого курсор "прийшов"
    let relatedTarget = event.relatedTarget;

    // Шукаємо найближчу картку навички (ігноруємо кліки по тексту всередині неї)
    let card = target.closest('.skill-card');

    if (card) {
        // Візуальний відгук дашборду: підсвічуємо обрану технологію
        card.style.backgroundColor = '#e8f5e9'; // світло-зелений фон
        card.style.transform = 'translateY(-5px)'; // ефект "підняття" картки
        card.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
        card.style.borderColor = '#81c784';

        // Логування для "аналітики" (демонстрація relatedTarget)
        let fromElement = relatedTarget ? relatedTarget.tagName : 'Поза радаром';
        let currentSkill = card.querySelector('b').innerText;
        console.log(`[Dashboard Radar] Користувач фокусується на: ${currentSkill} (Курсор прийшов з: ${fromElement})`);
    }
};

skillsRadar.onmouseout = function(event) {
    // При mouseout: target - елемент, з якого йдемо; relatedTarget - куди переходимо
    let target = event.target;
    let card = target.closest('.skill-card');

    if (card) {
        // Повертаємо картку у вихідний стан
        card.style.backgroundColor = 'white';
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
        card.style.borderColor = '#ccc';
    }
};


// ==========================================
// МОДУЛЬ 2: Віджет "Плаваюча замітка" (Drag-and-Drop)
// Вимоги: mousedown, mousemove, mouseup
// ==========================================
const stickyNote = document.getElementById('floatingStickyNote');

stickyNote.onmousedown = function(event) {
    // 1. Ефект захоплення стікера
    stickyNote.style.cursor = 'grabbing';

    // 2. Вираховуємо точне місце кліку на стікері (щоб він не стрибав центром під курсор)
    // Віднімаємо координати країв стікера від координат миші
    let shiftX = event.clientX - stickyNote.getBoundingClientRect().left;
    let shiftY = event.clientY - stickyNote.getBoundingClientRect().top;

    // 3. Підготовка до переміщення: витягуємо стікер поверх усього контенту
    stickyNote.style.position = 'absolute';
    stickyNote.style.zIndex = 1000;

    // Переміщуємо елемент у body, щоб уникнути обрізання, якщо батьківський блок має overflow: hidden
    document.body.append(stickyNote);

    // Функція позіціонування віджета відносно сторінки
    function moveWidget(pageX, pageY) {
        stickyNote.style.left = pageX - shiftX + 'px';
        stickyNote.style.top = pageY - shiftY + 'px';
    }

    // Одразу ставимо стікер під курсор
    moveWidget(event.pageX, event.pageY);

    // 4. Глобальне відстеження руху (mousemove на document)
    // Вішаємо на document, щоб не "загубити" віджет, якщо миша рухається надто швидко
    function onMouseMove(event) {
        moveWidget(event.pageX, event.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);

    // 5. Відпускання стікера (mouseup)
    stickyNote.onmouseup = function() {
        // Прибираємо слухач руху, щоб стікер зупинився
        document.removeEventListener('mousemove', onMouseMove);
        // Очищаємо обробник відпускання
        stickyNote.onmouseup = null;
        // Повертаємо звичайний курсор
        stickyNote.style.cursor = 'grab';
    };
};

// 6. Вимкнення стандартного браузерного Drag-and-Drop
// Це критично важливо, інакше браузер намагатиметься "перетягнути" текст стікера як файл/картинку
stickyNote.ondragstart = function() {
    return false;
};