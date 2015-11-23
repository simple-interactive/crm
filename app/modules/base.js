window.modules.layoutBase = function () {
    return new (function () {
        this.constructor = function () {
            if (!modules.layout.loaded) {
                module.load('layout');
            }
        };
    })();
};