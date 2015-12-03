modules.productCreate = function(){

    this.product = {
        ingredients: {}
    };

    this.init = function () {

        self.view.render('product/view/create', {}, function(renderedHtml){
            $(self.element).html(renderedHtml);
        });

        $(self.element).find('.modal').modal({
            keyboard: false,
            backdrop: 'static'
        }).on('hidden.bs.modal', function(){
            self.unload();
        });

        $(self.element).find('[data-add-ingredient]').on('click', function(){
            self.view.render('product/view/ingredient', {}, function(ingredient){
                $(self.element).find('[data-ingredients]').append(ingredient);
            });
        });

        $(self.element).on('click', '[data-ingredient] [data-add]', function(){
            var group = $(this).parent().parent().parent();
            window.services.api.addIngredient($(this).data('add'), function(ingredient){
                group.find('input').val(ingredient.title);
                self.product.ingredients[ingredient.id] = ingredient;
            });
        });

        $(self.element).on('blur', '[data-ingredient] input', function () {
            // $(this).parent().removeClass('open');
        });

        $(self.element).on('click', '[data-ingredient] [data-select]', function(){

            self.product.ingredients[$(this).data('id')] = {
                title: $(this).data('title'),
                id: $(this).data('id')
            };

            $(this).closest('[data-ingredient]').find('input').val($(this).data('title'));
            $(this).closest('[data-ingredient]').attr('data-id', $(this).data('id'));
            $(this).closest('[data-ingredient]').find('.input-group-btn').removeClass('open');
        });

        $(self.element).on('click', '[data-ingredient] [data-remove]', function(){
            var group = $(this).closest('[data-ingredient]');
            if (group.data('id')) {
                delete self.product.ingredients[group.data('id')];
            }
            group.remove();
        });

        $(self.element).on('keyup', '[data-ingredient] input', function(){

            if (!$(this).val().length) {
                $(this).parent().removeClass('open');
                return false;
            }

            var dropDown = $(this).parent().find('[data-list]');
            var search = $(this).val();

            $(this).parent().addClass('open');

            window.services.api.getIngredients($(this).val(), function (ingredients) {
                self.view.render('product/view/ingredient-list', {search: search, ingredients: ingredients.ingredients}, function(list){
                    dropDown.html(list);
                });
            });
        });
    };

    this.unload = function (callback) {

        $(self.element).remove();

        if (callback) {
            callback();
        }
    };

    var self = this;
};