modules.productIngredient = function(){

    this.ingredients = [];
    this.callback = null;

    this.init = function(){

        self.ingredients = self.params.ingredients || [];
        self.callback = self.params.callback;

        self.view.render('product/view/ingredient', {}, function(tpl){

            $('body').prepend(tpl);

            $('[data-ingredient-manage]').modal({
                keyboard: false,
                backdrop: 'static'
            }).on('hidden.bs.modal', function(){
                self.unload(self.params.callback);
            });

            $('body > .modal-backdrop:last-child').css({
                'z-index': 1050
            });

            self.updateIngredients();

            // Removing Ingredient
            $('[data-ingredient-manage]').on('click', '[data-ingredient] [data-remove]', function(){
                self.ingredients.splice($(this).closest('[data-ingredient]').index(), 1);
                self.updateIngredients();
            });

            // Adding Ingredient
            $('[data-ingredient-manage]').on('keyup', '[data-ingredient-form] [data-title]', function(){

                var dropDown = $(this).parent().find('[data-list]');
                var search = $(this).val();

                if (search.length) {

                    $(this).parent().addClass('open');

                    services.api.getIngredients($(this).val(), function (ingredients) {
                        self.view.render('product/view/ingredient-autocomplete', {search: search, ingredients: ingredients.ingredients}, function(list){
                            dropDown.html(list);
                        });
                    });
                }
            });

            $('[data-ingredient-manage]').on('click', '[data-ingredient-form] [data-select]', function(){
                self.apply($(this).data('id'), $(this).data('title'));
            });

            $('[data-ingredient-manage]').on('click', '[data-ingredient-form] [data-add-db]', function(){

                services.api.addIngredient($(this).data('add-db'), function (ingredient) {
                    self.apply(ingredient.ingredient.id, ingredient.ingredient.title);
                });
            });

            $('[data-ingredient-manage]').on('click', '[data-ingredient-form] [data-add]', function(){

                var $form = $(this).closest('[data-ingredient-form]');

                if (!$form.find('[data-title]').data('id').length) {
                    return false;
                }

                self.ingredients.push({
                    ingredient: {
                        id: $form.find('[data-title]').data('id'),
                        title: $form.find('[data-title]').val()
                    },
                    price: $form.find('[data-input=price]').val(),
                    weight: $form.find('[data-input=price]').val()
                });

                self.resetForm();
                self.updateIngredients();
            });

            $('[data-ingredient-manage]').on('click', '[data-save]', function(){
                $('[data-ingredient-manage]').modal('hide');
                if (self.callback) {
                    self.callback(self.ingredients);
                }
            });
        })
    };

    this.updateIngredients = function(){
        self.view.render('product/view/ingredient-list', {ingredients: self.ingredients}, function(tpl){
            $('[data-ingredient-manage]').find('[data-ingredient-list]').html(tpl);
        });
    };

    this.resetForm = function(){

        var $form = $('[data-ingredient-manage]').find('[data-ingredient-form]');

        $form.find('[data-title]').removeAttr('data-id');
        $form.find('[data-title]').val(null);
        $form.find('[data-input]').val(null);
        $form.find('[data-add]').attr('disabled', 'disabled');
    };

    this.apply = function(id, title){

        var $form = $('[data-ingredient-manage]').find('[data-ingredient-form]');

        $form.find('[data-title]').attr('data-id', id);
        $form.find('[data-title]').val(title);

        $form.find('.input-group-btn').removeClass('open');
        $form.find('[data-add]').removeAttr('disabled');
    };

    this.unload = function(){
        delete self.ingredients;
        $('[data-ingredient-manage]').remove();
        $('body').addClass('modal-open');
    };

    var self = this;
};