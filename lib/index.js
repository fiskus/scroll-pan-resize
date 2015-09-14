import debounce from 'lodash.debounce';
import assert from 'assert';

var win = window;

export default function WindowListener (options) {
    var opts = parseOptions(options);

    if (opts.scroll) {
        let scrollCallback = debounce(onScroll(opts.scroll),
                                      options.delay,
                                      options.debounce);
        win.addEventListener('scroll', scrollCallback);
    }
    if (opts.resize) {
        let resizeCallback = debounce(onResize(opts.resize),
                                      options.delay,
                                      options.debounce);
        win.addEventListener('resize', resizeCallback);
    }
};

function parseOptions (options) {
    if (options) {
        validateOptions(options);
        options.debounce = parseDebounceOptions(options);
        return options;
    } else {
        return {};
    }
}

function parseDebounceOptions (options) {
    var debounceOptions = {};
    if (typeof options.maxWait !== 'undefined') {
        debounceOptions.maxWait = options.maxWait;
    }
    if (typeof options.leading !== 'undefined') {
        debounceOptions.leading = options.leading;
    }
    if (typeof options.trailing !== 'undefined') {
        debounceOptions.trailing = options.trailing;
    }
    return debounceOptions;
}

function validateOptions (options) {
    var optionsTypes = [
        ['scroll', 'function'],
        ['resize', 'function'],
        ['delay', 'number'],
        ['maxWait', 'number'],
        ['leading', 'boolean'],
        ['trailing', 'boolean']
    ];
    optionsTypes.forEach(([option, type]) => {
        validateTypeOfProperty(options, option, type);
    });
}

function validateTypeOfProperty (options, property, type) {
    if (typeof options[property] !== 'undefined') {
        assert(typeof options[property] === type,
               `${property} property should be ${type}`);
    }
}

function onScroll (scrollCallback) {
    return function () {
        let y1 = win.scrollY;
        let y2 = y1 + win.innerHeight;
        return scrollCallback([y1, y2]);
    };
}

function onResize (resizeCallback) {
    return function () {
        let width = win.innerWidth;
        let height = win.innerHeight;
        return resizeCallback([width, height]);
    };
}
