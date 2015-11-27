window.services.api = function(){

    this.config = {
        endpoint : config.endpoint
    };

    this.token = null;

    this.setToken = function(token){
        self.token = token;
    };

    this.login = function(data, callback){

        if (!self.config.endpoint) {
            console.log("API Endpoint was not specified");
            return;
        }

        $.post([self.config.endpoint, 'auth'].join('/'), data, callback);
    };

    this.getMenus = function(callback){
        self.call('menu/get', {}, callback);
    };

    this.call = function(method, data, callback){

        if (!self.config.endpoint) {
            console.log("API Endpoint was not specified");
            return;
        }

        $.ajax({
            url: [self.config.endpoint, method].join('/'),
            data: data,
            type: "GET",
            dataType: 'json',
            beforeSend: function(request){
                request.setRequestHeader('x-auth', self.token);
            },
            complete: function (response) {

                if (response.status == 403) {
                    services.user.forget();
                    return false;
                }

                var parsedResponse = {
                    success: false,
                    message: 'Сервер времено не отвечает'
                };

                try {
                    parsedResponse = JSON.parse(response.responseText);
                } catch (err) {}

                callback(parsedResponse);
            }
        });
    };

    var self = this;

};