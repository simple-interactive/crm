modules.productManage = function(){

    this.product = {
        id: "",
        title: "",
        description: "",
        price: 0,
        weight: 0,
        exists: true,
        sectionId: "",
        images: [],
        ingredients: [],
        options:[]
    };

    this.init = function () {

        self.view.render('product/view/create', {product: self.product}, function(renderedHtml){
            $(self.element).html(renderedHtml);
        });

        $(self.element).find('.modal').modal({
            keyboard: false,
            backdrop: 'static'
        }).on('hidden.bs.modal', function(){
            self.unload();
        });

        self.manageStaticFields();
        self.manageImages();
        self.manageIngredients();
        self.manageOptions();
        self.profileSubmit();
    };

    this.manageStaticFields = function () {

        $(self.element).find('input[data-static], textarea[data-static]').on('keyup', function(){
            self.product[$(this).data('static')] = $(this).val();
            self.profileSubmit();
        });

        $(self.element).find('select[data-static]').on('change', function(){
            self.product[$(this).data('static')] = $(this).val();
            self.profileSubmit();
        });

        $(self.element).find('.checkbox[data-static]').find('input, label, ins').on('click', function () {
            self.product[$(this).closest('[data-static]').data('static')] = $(this).closest('[data-static]').find('div').hasClass('checked');
            self.profileSubmit();
        });
    };

    this.manageImages = function(){

        $(self.element).find('[data-image-file]').on('change', function(){

            var reader = new FileReader();

            reader.onload = function (event) {
                self.view.render('product/view/image', {image: event.target.result}, function(image){
                    $(self.element).find('[data-images]').append(image);
                });
                self.product.images.push(event.target.result);
            };

            if ($(this).get(0).files.length) {
                reader.readAsDataURL($(this).get(0).files[0]);
            }
        });

        $(self.element).find('[data-images]').on('click', '[data-remove]', function(){
            self.product.images.splice($(this).closest('[data-image]').index(), 1);
            $(this).closest('[data-image]').remove();
        });
    };

    this.manageIngredients = function () {

        $(self.element).find('[data-add-ingredient]').on('click', function(){

            var ingredient = {ingredient: {id: "", title: ""}, price: "", weight: ""};

            self.view.render('product/view/ingredient', {ingredient: ingredient}, function(ingredient){
                $(self.element).find('[data-ingredients]').append(ingredient);
            });
        });

        $(self.element).on('click', '[data-ingredient] [data-add]', function(){
            var group = $(this).closest('[data-ingredient]');
            window.services.api.addIngredient($(this).data('add'), function(ingredient){

                group.find('input').val(ingredient.ingredient.title);
                group.find('.input-group-btn').removeClass('open');

                group.find('[data-input]').removeAttr('disabled');

                self.product.ingredients.push({
                    id: ingredient.ingredient.id,
                    price: null,
                    weight: null
                });

                group.attr('data-added', true);
            });
        });

        $(self.element).on('click', '[data-ingredient] [data-select]', function(){

            self.product.ingredients.push({
                id: $(this).data('id'),
                price: null,
                weight: null
            });

            var group = $(this).closest('[data-ingredient]');

            group.find('[data-title]').val($(this).data('title'));
            group.find('.input-group-btn').removeClass('open');
            group.find('[data-input]').removeAttr('disabled');
            group.attr('data-added', true);
        });


        $(self.element).on('click', '[data-ingredient] [data-remove]', function(){

            if ($(this).closest('[data-ingredient]').data('added')) {
                self.product.ingredients.splice($(this).closest('[data-ingredient]').index(), 1);
            }

            $(this).closest('[data-ingredient]').remove();
        });


        $(self.element).on('keyup', '[data-ingredient] [data-title]', function(){

            if (!$(this).val().length) {

                var group = $(this).closest('[data-ingredient]');
                if (group.data('id')) {
                    delete self.product.ingredients[group.data('id')];
                    group.find('[data-price]').attr('disabled', true);
                    group.find('[data-weight]').attr('disabled', true);
                }

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

        $(self.element).on('keyup', '[data-ingredient] [data-input]', function(){
            self.product.ingredients[$(this).closest('[data-ingredient]').index()][$(this).data('input')] = $(this).val();
        });
    };

    this.manageOptions = function(){

        $(self.element).find('[data-add-options]').on('click', function(){

            self.view.render('product/view/option', {option:{title: "", price: "", weight: ""}}, function(option){
                $(self.element).find('[data-options]').append(option);
            });

            self.product.options.push({
                title:null,
                price: null,
                weight: null
            });
        });

        $(self.element).find('[data-options]').on('keyup', 'input', function(){
            self.product.options[$(this).closest('[data-option]').index()][$(this).data('input')] = $(this).val();
        });

        $(self.element).find('[data-options]').on('click', '[data-remove]', function(){
            self.product.options.splice($(this).closest('[data-option]').index(), 1);
            $(this).closest('[data-option]').remove();
        });
    };

    this.profileSubmit = function(){

        var errors = [];

        if (self.product.title.length < 2 || self.product.title.length > 30) {
            errors.push('title');
        }

        if (self.product.description.length < 10 || self.product.description.length > 200) {
            errors.push('description');
        }

        if (!self.product.sectionId.length) {
            errors.push('sectionId');
        }

        if (!self.product.images.length) {
            errors.push('images');
        }

        if (!errors.length) {
            $(self.element).find('[data-submit]').removeAttr('disabled');
        }
        else {
            $(self.element).find('[data-submit]').attr('disabled', true);
        }
    };

    this.unload = function (callback) {

        delete self.product;

        $(self.element).remove();

        if (callback) {
            callback();
        }
    };

    var self = this;
};