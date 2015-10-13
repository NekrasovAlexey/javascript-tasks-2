'use strict';

var phoneBook = require('./phone-book');

// Добавляем записи
phoneBook.add('Сергей', '7 999 6667778', 'gs@example.com');
phoneBook.add('Сергей 2', '999 4433444', 'gs@example.com');
phoneBook.add('Олег', '+7 (999) 777-7-777', 'just7@yandex-team.ru');
phoneBook.add('Максим', '222-7-222', 'max@example.com');
phoneBook.add('Ру', '7 999 6667778', 'ру@ру.рф');

// Невалидные данные не должны попадать в книгу!
phoneBook.add('Честный Хрюндель', 'invalid phone', 'honest-hrundel');

console.log('Поиск: 777');
phoneBook.find('777');
// Выводит построчно записи, все поля через запятую:
// Сергей, +7 (999) 666-7-778, gogolef@yandex-team.ru
// Олег, +7 (999) 777-7-777, just7@yandex-team.ru

console.log('Поиск без аргумента');
phoneBook.find();

phoneBook.remove('Олег');
// Выводит количество удалённых контактов, которые удовлетворят запросу:
// Удален 1 контакт

// Выводит записи в виде красивой таблички
phoneBook.showTable();
// Выводит
// ┌─────────────┬────────────────────╥──────────────────┐
// │ Имя         │ Телефон            ║ email            │
// ├─────────────┼────────────────────╫──────────────────┤
// │ Сергей      │ +7 (999) 666-77-78 ║ gs@example.com   │
// │ Сергей 2    │ +7 (999) 443-34-44 ║ gs@example.com   │
// └─────────────┴────────────────────╨──────────────────┘


// Экспортируем записи, пример файла рядом
phoneBook.importFromCsv('./backup.csv');
// Добавлено 4 контакта

phoneBook.showTable();

console.log('test');
console.log('valid num');
phoneBook.add('1', '+7 (111) 777-2-222', 'a@a.ru');
phoneBook.add('1', '+7 (111) 777 2 222', 'a@a.ru');
phoneBook.add('1', '+7 111 777-2-222', 'a@a.ru');
phoneBook.add('1', '7 111 777-2-222', 'a@a.ru');
phoneBook.add('1', '111 777-2-222', 'a@a.ru');
phoneBook.add('1', '71117772222', 'a@a.ru');
phoneBook.add('1', '+34 111 777-2-222', 'a@a.ru');
console.log('invalid num');
phoneBook.add('1', '777-2-222', 'a@a.ru');
phoneBook.add('1', 'АБС-6666', 'a@a.ru');
phoneBook.add('1', '+7 (111) 777%2%222', 'a@a.ru');
phoneBook.add('1', '+7 (111 777-2-222', 'a@a.ru');
phoneBook.add('1', '7+ (111) 777-2-222', 'a@a.ru');
phoneBook.add('1', '-7 (111) 777-2-222', 'a@a.ru');
console.log('valid email');
phoneBook.add('1', '+7 (111) 777-2-222', 'info@example.com');
phoneBook.add('1', '+7 (111) 777-2-222', 'info@example.com.ru');
phoneBook.add('1', '+7 (111) 777-2-222', 'info@инфо.рф');
console.log('invalid email');
phoneBook.add('1', '+7 (111) 777-2-222', 'info@yandex');
phoneBook.add('1', '+7 (111) 777-2-222', 'info@yandex@ya.ru');
phoneBook.add('1', '+7 (111) 777-2-222', 'info.yandex.ru');

