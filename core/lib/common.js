var uuid = require('uuid');

var databaseTables = {
    user: 'user',
    auth: 'auth',
    site: 'site',
    point: 'point'
};

function destructMarkdown(markdownText) {
    var title = markdownText.toString().match(/^##[^#].+/m)[0].trim();
    var quote = markdownText.toString().match(/^>.+/m)[0].trim();
    var credit = markdownText.toString().match(/^###[^#].*redit(.|\n)*/igm)[0].trim().split('\n');
    console.log(credit.slice(1, 1));

    return {
        title: title.substring(title.indexOf('##') + 2).trim(),
        quote: quote.substring(quote.indexOf('>') + 1).trim(),
        credit: credit.slice(1).join('').trim()
    };
}

function regexFilter() {
    return {
        page: /\/([^\/]+)\/?$/
    };
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomString(len) {
    var buf = [],
        chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        charLen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charLen - 1)]);
    }

    return buf.join('');
}

// todo: customize errorFormatter()
function errorFormatter(param, msg, value) {
    var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

    while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
    }
    return {
        param : formParam,
        msg   : msg,
        value : value
    };
}

function uuid1() {
    return uuid.v1();
}

function uuid4() {
    return uuid.v4();
}

module.exports = {
    errorFormatter: errorFormatter,
    destructMarkdown: destructMarkdown,
    regexFilter: regexFilter,
    randomString: randomString,
    UUID1: uuid1,
    UUID4: uuid4,
    testUser: {
        id: 123412341234,
        username: 'soomtong@gmail.com',
        password: '1234'
    },
    tables: databaseTables,
    databaseDefault: require('../config/database_default')
};