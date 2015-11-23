window.services.user = function(){

    this.user = undefined;

    var user = storage.getItem('user');
    if (user) {
        this.user = JSON.parse(user);
    }

    this.get = function () {
        return self.user;
    };

    this.save = function(user){

        storage.setItem('user', JSON.stringify(user));
        self.user = user;

        services.api.setToken(self.user.token);
    };

    this.forget = function(){

        storage.clear();

        self.user    = undefined;

        services.loader.hide();

        module.unloadAll();
        module.load('auth');
    };

    this.isLoginIn = function(){
        return self.user != undefined;
    };

    var self = this;

};