modules.section = function(){

    this.init = function () {

        if (!self.params.breadcrumbs) {
            self.params.breadcrumbs = [{title: "Управление секциями", id: null, productsCount: 0}];
        }

        var currentSectionId = self.params.breadcrumbs[self.params.breadcrumbs.length-1].id;

        window.services.loader.show();

        window.services.api.getSections(currentSectionId, function(sections){

            var templateVars = {
                sections: sections.sections,
                breadcrumbs: self.params.breadcrumbs,
                currentSection: self.params.breadcrumbs[self.params.breadcrumbs.length-1]
            };

            self.view.render('section/view/index', templateVars, function(renderedHtml) {
                $(self.element).html(renderedHtml);
            });

            window.services.loader.hide();

            $(self.element).find('[data-nav]').on('click', function(){

                if ($(this).data('nav') == 'section') {
                    self.params.breadcrumbs.push({
                        title: $(this).data('title'),
                        id: $(this).data('id'),
                        productsCount: $(this).data('products-count')
                    });
                }
                else if ($(this).data('nav') == 'back') {
                    self.params.breadcrumbs = self.params.breadcrumbs.slice(0, $(this).data('id')+1);
                }
                else if ($(this).data('nav') == 'position') {
                    alert('try to load position module');
                }

                module.unloadAll('layout');
                module.load('section', {breadcrumbs: self.params.breadcrumbs});
            });

            $(self.element).find('[data-create]').on('click', function(){
                module.load('createSection', {
                    parentId: currentSectionId,
                    callback: self.init
                }, 'body');
            });

            $(self.element).find('[data-edit]').on('click', function(){
                module.load('editSection', {
                    sectionId: $(this).data('id'),
                    callback: self.init
                }, 'body');
            });

            $(self.element).find('[data-delete]').on('click', function(){

                var sectionId = $(this).data('id');

                window.view.plugins.confirm(
                    window.services.locale.translate("confirm-action"),
                    window.services.locale.translate("section-deleting"),
                    "danger",
                    function () {
                        window.services.loader.show();
                        window.services.api.deleteSection(sectionId, function () {
                            self.init();
                        });
                    }
                );

            });

            $(self.element).on('click', '.btn.dropdown-toggle', function(){

                $(self.element).find('.section').css('z-index', 999);

                var section = $(this).closest('.section');
                section.css('z-index', 1000);

                $(document).click(function(){
                    $(self.element).find('.section').css('z-index', 999);
                });
            });
        });
    };

    var self = this;

};