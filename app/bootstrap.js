$(function(){
    window.dispatcher.postDispatch = function () {

        window.services.ui.init();

        if (!services.user.isLoginIn()) {
            module.unloadAll();
            module.load('auth');
        }
        else {
            module.load('layout');
        }
    };
});