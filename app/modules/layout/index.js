modules.layout = function(){

    this.init = function () {

        self.view.render('layout/view/index', {}, function(renderedHtml){
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
    };

    var self = this;

};