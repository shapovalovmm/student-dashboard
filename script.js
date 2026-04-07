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