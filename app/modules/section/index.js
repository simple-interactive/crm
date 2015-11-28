modules.section = function(){

    this.init = function () {

        if (!self.params.breadcrumbs) {
            self.params.breadcrumbs = [{title: "Управление секциями", id: 0}];
        }

        self.view.render('section/view/index', {breadcrumbs: self.params.breadcrumbs}, function(renderedHtml) {
            $(self.element).html(renderedHtml);
        });

        $(self.element).find('[data-nav]').on('click', function(){

            if ($(this).data('nav') == 'section') {
                self.params.breadcrumbs.push({
                    title: $(this).data('title'),
                    id: $(this).data('id')
                });
            }
            else if ($(this).data('nav') == 'back') {
                self.params.breadcrumbs = self.params.breadcrumbs.slice(0, $(this).data('id')+1);
            }

            module.unloadAll('layout');
            module.load('section', {breadcrumbs: self.params.breadcrumbs});
        });

        $(self.element).find('[data-create]').on('click', function(){
            module.load('createSection', {
                callback: self.init
            }, 'body');
        });

        $(self.element).find('[data-edit]').on('click', function(){
            module.load('editSection', {
                callback: self.init
            }, 'body');
        });
    };

    var self = this;

};