modules.productManage = function(){

    this.product = {
        id: "",
        title: "",
        description: "",
        price: "",
        weight: "",
        exists: 1,
        section: {
            id: "",
            title: ""
        },
        servingTime: "",
        images: [],
        ingredients: [],
        options: []
    };

    this.tree = [];

    this.init = function () {

        if (self.params.productId) {

            window.services.api.getProduct(self.params.productId, function(product){
                self.product = product.product;
                self.initForm();
            });
        }

        else {
            this.initForm();
        }
    };

    this.initForm = function(){

        window.services.api.getSectionTree(function(tree){

            self.tree = tree.sections;

            self.manageForm();
            self.manageStaticFields();
            self.manageImages();
            self.manageIngredients();
            self.manageOptions();
            self.profileSubmit();

            self.submitProduct();
        });
    };

    this.manageForm = function(){

        self.view.render('product/view/manage', {product: self.product, tree: self.tree}, function(renderedHtml){
            $(self.element).html(renderedHtml);
        });

        $(self.element).find('.modal').modal({
            keyboard: false,
            backdrop: 'static'
        }).on('hidden.bs.modal', function(){
            self.unload(self.params.callback);
        });
    };

    this.manageStaticFields = function () {

        $(self.element).find('input[data-static], textarea[data-static]').on('keyup', function(){
            self.product[$(this).data('static')] = $(this).val();
            self.profileSubmit();
        });

        $(self.element).find('select[data-static]').on('change', function(){
            self.product.section.id = $(this).val();
            self.profileSubmit();
        });

        $(self.element).find('.checkbox[data-static]').find('input, label, ins').on('click', function () {
            self.product[$(this).closest('[data-static]').data('static')] = parseInt($(this).closest('[data-static]').find('div').hasClass('checked'));
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
                self.product.images.push({
                    needToUpload: true,
                    image: event.target.result
                });
                self.profileSubmit();
            };

            if ($(this).get(0).files.length) {
                reader.readAsDataURL($(this).get(0).files[0]);
            }
        });

        $(self.element).find('[data-images]').on('click', '[data-remove]', function(){
            self.product.images.splice($(this).closest('[data-image]').index(), 1);
            $(this).closest('[data-image]').remove();
            self.profileSubmit();
        });
    };

    this.manageIngredients = function () {

        $(self.element).find('[data-add-ingredients]').on('click', function(){

            module.load('productIngredient', {
                ingredients: self.product.ingredients,
                callback: function(ingredients){
                    self.product.ingredients = ingredients;
                }
            });
        });
    };

    this.manageOptions = function(){

        $(self.element).find('[data-add-options]').on('click', function(){

            self.view.render('product/view/option', {option:{title: "", price: "", weight: ""}}, function(tpl){
                $(self.element).find('[data-options]').append(tpl);
            });

            self.product.options.push({
                title: "",
                price: "",
                weight: "",
                ingredients: []
            });

            self.profileSubmit();
        });

        $(self.element).find('[data-options]').on('keyup', 'input', function(){
            self.product.options[$(this).closest('[data-option]').index()][$(this).data('input')] = $(this).val();
            self.profileSubmit();
        });

        $(self.element).find('[data-options]').on('click', '[data-remove]', function(){
            self.product.options.splice($(this).closest('[data-option]').index(), 1);
            $(this).closest('[data-option]').remove();
            self.profileSubmit();
        });

        $(self.element).find('[data-options]').on('click', '[data-edit]', function(){

            var optionIndex = $(this).closest('[data-option]').index();

            module.load('productIngredient', {
                ingredients: self.product.options[optionIndex].ingredients,
                callback: function(ingredients){
                    self.product.options[optionIndex].ingredients = ingredients;
                }
            });


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

        if (self.product.price < 1) {
            errors.push('price');
        }

        if (self.product.servingTime == 0) {
            errors.push('servingTime');
        }

        if (self.product.weight < 1) {
            errors.push('weight');
        }

        if (!self.product.section.id) {
            errors.push('sectionId');
        }

        if (!self.product.images.length) {
            errors.push('images');
        }

        for (var i=0; i<self.product.options.length; i++) {

            if (self.product.options[i].title.length < 3 || self.product.options[i].title.length > 20) {
                errors.push('options-title');
                break;
            }

            if (!self.product.options[i].price) {
                errors.push('options-price');
                break;
            }

            if (!self.product.options[i].weight) {
                errors.push('options-weight');
                break;
            }
        }

        for (var i=0; i<self.product.ingredients.length; i++) {

            if (!self.product.ingredients[i].price) {
                errors.push('ingredients-price');
                break;
            }

            if (!self.product.ingredients[i].weight) {
                errors.push('ingredients-weight');
                break;
            }
        }

        if (!errors.length) {
            $(self.element).find('[data-submit]').removeAttr('disabled');
        }
        else {
            $(self.element).find('[data-submit]').attr('disabled', true);
        }
    };

    this.submitProduct = function(){

        $(self.element).find('[data-submit]').on('click', function(){

            window.services.loader.show();

            window.services.api.saveProduct(self.product, function(){

                window.services.loader.hide();
                $(self.element).find('.modal').modal('hide');

            }, function(response){

                window.services.loader.hide();
                $(self.element).find('[data-form-error]').html(response.message);
            });
        });
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