modules.layout = function(){

    this.init = function () {

        var templateVars = {
            user: window.services.user.get()
        };

        self.view.render('layout/view/index', templateVars, function(renderedHtml){
            $(self.element).html(renderedHtml);
        });

        $(self.element).find('[data-menu] [data-href]').each(function(){

            $(this).on('click', function(){

                module.unloadAll('layout');
                module.load($(this).data('href'));

                $(self.element).find('[data-menu] [data-href]').removeClass('active');
                $(this).addClass('active');

                return false;
            });
        });

        $(self.element).find('[data-menu] [data-href]')[0].click();
        
        $(self.element).find('[data-menu-exit]').on('click', function(){
            window.services.user.forget();
        });
    };

    var self = this;

};