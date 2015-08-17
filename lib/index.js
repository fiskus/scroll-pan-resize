import debounce from 'lodash.debounce';

var win = window;

var WindowListener = function (options) {
    var opts = parseOptions(options);

    if (opts.scroll) {
        var scrollCallback = debounce(onScroll(opts.scroll),
                                      options.delay,
                                      options.debounce);
        win.addEventListener('scroll', scrollCallback);
    }
    if (opts.resize) {
        var resizeCallback = debounce(onResize(opts.resize),
                                      options.delay,
                                      options.debounce);
        win.addEventListener('resize', resizeCallback);
    }
};

function parseOptions (options) {
    if (options) {
        validateOptions(options);
        return options;
    } else {
        return {};
    }
}

function validateOptions (options) {
    console.log('kekeke', options);
}

function onScroll (scrollCallback) {
    return function (e) {
        return scrollCallback(e);
    };
}

function onResize (e) {
    console.log('resize', e);
}

export default WindowListener;
