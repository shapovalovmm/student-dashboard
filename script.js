// ==========================================
// 1. Власна функція «Діалог з користувачем»
// ==========================================
function startUserDialog() {
    let continueDialog = true;

    // Використання циклу та умовного розгалуження
    while (continueDialog) {
        let topic = prompt("Про що поговоримо? (наприклад: Java, Шахи, Spring):", "Java");

        if (topic) {
            let isInteresting = confirm(`Тобі дійсно цікава тема "${topic}"?`);
            if (isInteresting) {
                alert("Круто! Це чудовий вибір для розвитку.");
            } else {
                alert("Тоді наступного разу оберемо щось інше.");
            }
        } else {
            alert("Ти нічого не ввів!");
        }

        // Змінна для керування циклом
        continueDialog = confirm("Бажаєш розпочати діалог знову?");
    }
}

// ==========================================
// 2. Функція виводу інформації про розробника
// ==========================================
// Параметр position має значення за замовчуванням
function showDeveloperInfo(surname, name, position = "Студент") {
    alert(`Розробник сторінки:\nПрізвище: ${surname}\nІм'я: ${name}\nПосада: ${position}`);
}

// ==========================================
// 3. Функція порівняння двох рядків
// ==========================================
function compareStrings(str1, str2) {
    if (str1.length > str2.length) {
        alert(`Більший рядок: "${str1}" (Довжина: ${str1.length})`);
    } else if (str2.length > str1.length) {
        alert(`Більший рядок: "${str2}" (Довжина: ${str2.length})`);
    } else {
        alert(`Рядки "${str1}" та "${str2}" однакової довжини!`);
    }
}

// ==========================================
// 4. Зміна фону сторінки на 30 секунд
// ==========================================
function changeBgFor30Seconds() {
    // Зберігаємо початковий фон
    let originalBg = document.body.style.backgroundColor;

    // Змінюємо фон через об'єкт document
    document.body.style.backgroundColor = "#ffcc80";
    alert("Фон змінено! Він повернеться до початкового через 30 секунд.");

    setTimeout(() => {
        document.body.style.backgroundColor = originalBg;
    }, 30000);
}

// ==========================================
// 5. Робота з BOM: перенаправлення (location)
// ==========================================
function redirectToGallery() {
    let redirect = confirm("Перейти до галереї?");
    if (redirect) {
        location.href = "gallery.html";
    }
}

// ==========================================
// 6. Маніпуляції з DOM
// ==========================================
function runDomManipulations() {
    // Пошук елементів
    let mainTitle = document.getElementById("main-title");
    let allLinks = document.querySelectorAll(".nav-bar a");

    // Демонстрація властивостей
    console.log("innerHTML заголовка:", mainTitle.innerHTML);
    console.log("outerHTML заголовка:", mainTitle.outerHTML);
    console.log("textContent першого посилання:", allLinks[0].textContent);

    if (mainTitle.firstChild) {
        console.log("nodeValue (data) текстового вузла:", mainTitle.firstChild.nodeValue);
    }

    // Створення елементів: document.createElement(tag), document.createTextNode(text)
    let container = document.createElement("div");
    container.style.border = "3px solid #ff5722";
    container.style.padding = "15px";
    container.style.margin = "20px 0";
    container.style.backgroundColor = "#ffffff";

    let textNode = document.createTextNode("Це блок, згенерований через JS. ");
    container.append(textNode); // метод node.append

    // Додаємо елементи за допомогою різних методів
    let prependSpan = document.createElement("span");
    prependSpan.innerHTML = "<strong>[Початок]</strong> ";
    container.prepend(prependSpan); // метод node.prepend

    let afterPara = document.createElement("p");
    afterPara.textContent = "Цей абзац вставлено ПІСЛЯ червоного блоку через node.after()";

    // Знаходимо місце для вставки (наприклад, після секції "Про мене")
    let profileCard = document.querySelector(".profile-card");
    profileCard.after(container); // вставляємо створений контейнер
    container.after(afterPara); // метод node.after

    // Заміна елемента (node.replaceWith)
    let oldElement = document.createElement("span");
    oldElement.textContent = " Мене скоро замінять... ";
    container.append(oldElement);

    setTimeout(() => {
        let newElement = document.createElement("b");
        newElement.textContent = " [МЕНЕ ЗАМІНИЛИ!] ";
        newElement.style.color = "purple";
        oldElement.replaceWith(newElement); // метод node.replaceWith
    }, 3000);

    // Видалення елемента (node.remove)
    let elementToRemove = document.createElement("div");
    elementToRemove.textContent = "Я зникну через 5 секунд!";
    elementToRemove.style.color = "red";
    container.append(elementToRemove);

    setTimeout(() => {
        elementToRemove.remove(); // метод node.remove
    }, 5000);

    alert("DOM маніпуляції виконано!");
}


// ==========================================
// ЗАВДАННЯ 1: Способи призначення обробників
// ==========================================

// 1. Через HTML-атрибут (onclick="handlerAttr()")
function handlerAttr() {
    alert("Обробник спрацював через HTML-атрибут onclick!");
}

// 2. Через властивість DOM-елемента
let btnProp = document.getElementById("btnProp");
btnProp.onclick = function() {
    alert("Обробник спрацював через властивість елемента (btn.onclick)!");
};

// 3. Через addEventListener (можна вішати декілька функцій на одну подію)
let btnMulti = document.getElementById("btnMulti");
function firstHandler() {
    console.log("Спрацював ПЕРШИЙ обробник через addEventListener");
}
function secondHandler() {
    alert("Спрацював ДРУГИЙ обробник! Подивись у консоль (F12) для першого.");
}
btnMulti.addEventListener('click', firstHandler);
btnMulti.addEventListener('click', secondHandler);

// 4. Об'єкт-обробник (використання методу handleEvent)
let btnObj = document.getElementById("btnObj");
let btnObjRemove = document.getElementById("btnObjRemove");

let eventObj = {
    handleEvent(event) {
        // Виводимо елемент, на якому спрацював обробник
        alert(`Об'єкт обробив подію: ${event.type}\nНа елементі: ${event.currentTarget.tagName}\nID: ${event.currentTarget.id}`);
    }
};

// Додаємо об'єкт як обробник
btnObj.addEventListener('click', eventObj);

// Видаляємо об'єкт-обробник
btnObjRemove.onclick = function() {
    btnObj.removeEventListener('click', eventObj);
    alert("Об'єкт-обробник успішно видалено! Кнопка 4 більше не реагуватиме.");
};


// ==========================================
// ЗАВДАННЯ 2: Спливання, Делегування, Поведінка
// ==========================================

// 1. Підсвічування елементів списку (Делегування подій)
let delegationList = document.getElementById('delegationList');

// Вішаємо ОДИН обробник на весь <ul>, а не на кожен <li>
delegationList.onclick = function(event) {
    // event.target - це конкретний елемент, на який клікнули
    let target = event.target;

    // Перевіряємо, чи клік був саме по тегу LI
    if (target.tagName === 'LI') {
        // Змінюємо колір фону для підсвічування
        if (target.style.backgroundColor === 'yellow') {
            target.style.backgroundColor = ''; // скидаємо
        } else {
            target.style.backgroundColor = 'yellow'; // підсвічуємо
        }
    }
};

// 2. Створення меню (Атрибути data-*)
// Створюємо клас, методи якого відповідають значенням атрибута data-action
class Menu {
    constructor(elem) {
        this._elem = elem;
        // Прив'язуємо контекст this, щоб він вказував на об'єкт Menu
        elem.onclick = this.onClick.bind(this);
    }

    save() { alert('Викликано метод: Збереження даних'); }
    load() { alert('Викликано метод: Завантаження даних'); }
    clear() { alert('Викликано метод: Очищення екрану'); }

    onClick(event) {
        // Отримуємо значення атрибута data-action (наприклад "save")
        let action = event.target.dataset.action;
        if (action) {
            // Викликаємо відповідний метод об'єкта
            this[action]();
        }
    }
}

// Ініціалізуємо меню
let menuElem = document.getElementById('actionMenu');
new Menu(menuElem);

// 3. Патерн "Поведінка" (Behavior)
// Обробник вішається на весь документ. Він "слухає" всі кліки і реагує лише на ті елементи, які мають спеціальний атрибут data-behavior
document.addEventListener('click', function(event) {
    // Перевіряємо, чи має елемент атрибут data-behavior="greeting"
    if (event.target.dataset.behavior === 'greeting') {
        alert("Привіт! Ця поведінка додана автоматично завдяки глобальному делегуванню та атрибуту data-behavior.");
    }
});


// ==========================================
// ЛАБОРАТОРНА: mouseover, mouseout та target/relatedTarget
// ==========================================
let hoverZone = document.getElementById('hoverZone');

hoverZone.onmouseover = function(event) {
    // event.target - елемент, НА який ми зайшли
    let target = event.target;
    // event.relatedTarget - елемент, З якого ми прийшли
    let relatedTarget = event.relatedTarget;

    // Перевіряємо, чи ми навели саме на картку (через метод closest)
    let card = target.closest('.hover-card');

    if (card) {
        // Змінюємо стиль при наведенні
        card.style.backgroundColor = '#81c784'; // зелений колір
        card.style.transform = 'scale(1.05)';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';

        console.log(`[MouseOver] Зайшли НА:`, card.innerText.replace('\n', ' '));
        if (relatedTarget) {
            console.log(`[MouseOver] Прийшли З:`, relatedTarget.tagName);
        }
    }
};

hoverZone.onmouseout = function(event) {
    // При mouseout навпаки: target - звідки йдемо, relatedTarget - куди переходимо
    let target = event.target;
    let card = target.closest('.hover-card');

    if (card) {
        // Повертаємо початкові стилі
        card.style.backgroundColor = 'white';
        card.style.transform = 'scale(1)';
        card.style.boxShadow = 'none';
    }
};

// ==========================================
// ЛАБОРАТОРНА: Drag-and-Drop (mousedown, mousemove, mouseup)
// ==========================================
let draggableTask = document.getElementById('draggableTask');

draggableTask.onmousedown = function(event) {
    // 1. Змінюємо курсор для візуального ефекту захоплення
    draggableTask.style.cursor = 'grabbing';

    // 2. Вираховуємо зміщення (відстань від кліку до країв елемента).
    // Це потрібно, щоб елемент не "стрибав" центром під мишку,
    // а тримався саме за те місце, де ти клікнув.
    let shiftX = event.clientX - draggableTask.getBoundingClientRect().left;
    let shiftY = event.clientY - draggableTask.getBoundingClientRect().top;

    // 3. Змінюємо позиціювання на absolute, щоб елемент міг літати над усім
    draggableTask.style.position = 'absolute';
    draggableTask.style.zIndex = 1000;

    // Переміщуємо елемент безпосередньо в body, щоб він не обрізався межами батьківських блоків
    document.body.append(draggableTask);

    // Функція, яка рухає елемент під координати миші
    function moveAt(pageX, pageY) {
        draggableTask.style.left = pageX - shiftX + 'px';
        draggableTask.style.top = pageY - shiftY + 'px';
    }

    // Переміщуємо під координати відразу після кліку
    moveAt(event.pageX, event.pageY);

    // 4. Обробник руху миші (mousemove). Вішаємо його на весь document,
    // бо миша може рухатись дуже швидко і "вилетіти" за межі самої картки
    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }
    document.addEventListener('mousemove', onMouseMove);

    // 5. Відпускання кнопки миші (mouseup)
    draggableTask.onmouseup = function() {
        // Відкріплюємо подію руху миші
        document.removeEventListener('mousemove', onMouseMove);
        // Скидаємо обробник mouseup, щоб він не висів у пам'яті
        draggableTask.onmouseup = null;
        // Повертаємо курсор
        draggableTask.style.cursor = 'grab';
    };
};

// 6. Вимикаємо вбудований у браузер Drag-and-Drop,
// щоб він не конфліктував з нашим власним скриптом
draggableTask.ondragstart = function() {
    return false;
};