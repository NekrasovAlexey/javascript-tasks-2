'use strict';

var phoneBook = [];
module.exports.add = function add(name, phone, email) {
    if (isValidNumber(phone) && isValidEmail(email)) {
        phoneBook.push({name: name,
                          phone: phone,
                          email: email});
        console.log('Контакт успешно добавлен');
        return true;
    }
    return false;
};

module.exports.find = function find(query) {
    query = query || '';
    var index = findIndices(query);
    var len = index.length;
    if (len == 0) {
        console.log('По запросу "' + query + '" совпадений не найдено');
        return null;
    }
    for (var i = 0; i < len; i++) {
        var cont = phoneBook[index[i]];
        console.log(cont.name + ', ' + cont.phone + ', ' + cont.email);
    }
    return true;
};

module.exports.remove = function remove(query) {
    query = query || '';
    var index = findIndices(query);
    var len = index.length;
    if (len == 0) {
        console.log('По запросу "' + query + '" совпадений не найдено');
        return null;
    }
    var offset = 0;
    for (var i = 0; i < len; i++) {
        phoneBook.splice(index[i] - offset, 1);
        offset++;
    }
    console.log('Удален ' + len + ' контакт');
    return true;
};

module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8').split(/\r\n|\r|\n/g);
    var len = data.length;
    var countValid = 0;
    for (var i = 0; i < len; i++) {
        var contact = data[i].split(';');
        if (contact[0] && this.add(contact[0], contact[1], contact[2])) {
            countValid++;
        }
    }
    console.log('Импорт завершен. Импортирован ' + countValid + ' контакт');
    return true;
};

module.exports.showTable = function showTable() {
    console.log('-----------------------------------------------------------------------\n' +
                '|         Имя        |        Номер         |          Email          |\n' +
                '-----------------------------------------------------------------------');
    var len = phoneBook.length;
    for (var i = 0; i < len; i++) {
        displayContact(phoneBook[i]);
    }
};

function displayContact(contact) {
    var toDisplay = '';
    var columnSize = [19, 21, 24];
    var keys = Object.keys(contact);
    for (var i = 0; i < 3; i++) {
        var val = contact[keys[i]];
        toDisplay += '| ' + val;
        var more = columnSize[i] - val.length;
        for (var j = 0; j < more; j++) {
            toDisplay += (' ');
        }
    }
    console.log(toDisplay + '|\n' +
                '-----------------------------------------------------------------------');
}

function isValidNumber(number) {
    if (number[0] == '-') {
        console.log('Неправильный формат номера');
        return false;
    }
    var num = number.split(/[ -]/).join('');
    if (num[0] == '+') {
        num = num.substr(1);
    }
    if (num.split(/[()]/).join('').length > 12) {
        console.log('Номер слишком длинный');
        return false;
    }
    for (var i = 0; i < 4; i++) {
        //не работает, если одна закрывающаяся
        if ((num[i] == '(' && num[i + 4] !== ')') || (num[i] !== '(' && num[i + 4] == ')')) {
            console.log('Неправильно расставлены скобки');
            return false;
        }
    }
    var validCharReg = /^\d{0,2}\(?\d{3}\)?\d{3}\-?\d\-?\d{3}/;
    if (validCharReg.test(num)) {
        return true;
    } else {
        console.log('Неправильный формат номера');
        return false;
    }
}

function isValidEmail(email) {
    var validReg = /^[\w\-А-яЁё]+\@([\w\-А-яЁё]+\.[\wА-яЁё]+)+/;
    var isValid = validReg.test(email);
    if (!isValid) {
        console.log('Неправильный формат email');
    }
    return isValid;
}

function findIndices(query) {
    var len = phoneBook.length;
    var index = [];
    for (var i = 0; i < len; i++) {
        var cont = phoneBook[i];
        if (cont.name.indexOf(query) >= 0 ||
            cont.phone.indexOf(query) >= 0 ||
            cont.email.indexOf(query) >= 0) {
            index.push(i);
        }
    }
    return index;
}


