modules.auth = function(){

    this.init = function () {

        $('body').addClass('auth');

        self.view.render('auth/view/index', {}, function(renderedHtml){

            $(self.element).html(renderedHtml);

            $(self.element).find('form').submit(function(){

                services.loader.show();

                var form = this;

                services.api.login($(form).serialize(), function(res){

                    services.loader.hide();

                    if (res.success) {

                        $('body').removeClass('auth');
                        services.user.save(res.user);

                        module.unloadAll();
                        module.load('index');
                    }
                    else {
                        $(self.element).find('[data-error] .alert').html('E-mail or password is wrong');
                        $(self.element).find('[data-error]').fadeIn();
                    }
                });

                return false;
            });
        });
    };

    var self = this;

};