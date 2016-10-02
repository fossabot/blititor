var winston = require('winston');
var common = require('../../../core/lib/common');

var filter = common.regexFilter();

function indexPage(req, res) {
    var params = {
        title: "Home",
    };

    winston.info('this is a index page', req.path);

    //500 Error
    //throw Error('make noise!');

    // load recent articles

    res.render(BLITITOR.config.site.theme + '/page/index', params);
}

function plainPage(req, res) {

    var params = {
        title: "Plain",
        path: req.path,
        page: req.path == '/' ? 'index' : req.path.match(filter.page)[1].replace(/-/g, '_'),
    };

    // winston.info(req.path, params, req.path.match(filter.page));
    // console.log(res.locals.menu);

    res.render(BLITITOR.config.site.theme + '/page/' + params.page, params);
}

function bindMenuToRouter(menu, router) {
    menu.map(function (item) {
        router[item['type'] || 'get'](item['url'], plainPage);
    });
}

function redirectPage(url) {
    return function (req, res) {
        // winston.verbose('redirect to', url);
        if (url) {
            res.redirect(url);
        } else {
            res.redirect('back');
        }
    };
}

module.exports = {
    index: indexPage,
    plain: plainPage,
    bindMenu: bindMenuToRouter,
    redirect: redirectPage
};
