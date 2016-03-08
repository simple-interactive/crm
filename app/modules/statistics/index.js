modules.statistics = function(){

    this.filterData = {
        startTime : (Date.now() / 1000) - 86400,
        endTime : Date.now() / 1000,
        sectionId: null,
        ingredientId: null,
        productId: null,
        status: null,
        paymentMethod: null,
        query: null,
        limit: 30,
        offset: 0
    };

    this.ingredients = [];
    this.products = [];
    this.sections = [];

    this.init = function () {

        services.loader.show();

        services.api.statisticsFilters(function(common){

            self.ingredients = common.ingredients;
            self.products = common.products;
            self.sections = common.sections;

            var tplData = {
                ingredients: common.ingredients,
                products: common.products,
                sections: common.sections,
                filter: self.filterData
            };

            self.view.render('statistics/view/index', tplData, function(tpl){

                $(self.element).html(tpl);
                services.loader.hide();

                self.filter();
            });
        });
    };

    this.filter = function(){

        $(self.element).find('[data-filter]').find('[data-section]').on('change', function(){

            self.filterData.sectionId = $(this).val();
            self.filterData.productId = null;

            $(self.element).find('[data-filter]').find('[data-product] option:selected').removeAttr('selected');
            $(self.element).find('[data-filter]').find('[data-product]').selecter('update');

            self.filterData.offset = 0;

            self.grid();
        });

        $(self.element).find('[data-filter]').find('[data-product]').on('change', function(){

            self.filterData.productId = $(this).val();
            self.filterData.sectionId = null;

            $(self.element).find('[data-filter]').find('[data-section] option:selected').removeAttr('selected');
            $(self.element).find('[data-filter]').find('[data-section]').selecter('update');

            self.filterData.offset = 0;

            self.grid();
        });

        $(self.element).find('[data-ingredient]').find('[data-ingredient-title]').on('keyup', function(){

            if ($(this).data('last-val') == $(this).val()) {
                return;
            }
            $(this).data('last-val', $(this).val());

            var $ingredientList = $(self.element).find('[data-filter]').find('[data-ingredient-list]');

            if ($(self.element).find('[data-ingredient]').find('[data-ingredient-id]').val().length > 0) {
                $(self.element).find('[data-ingredient]').find('[data-ingredient-id]').val(null);

                if ($(this).val()) {
                    self.filterData.ingredientId = null;
                    self.filterData.offset = 0;
                    self.grid();
                }
            }

            if (!$(this).val()) {

                $ingredientList.html(null);
                $ingredientList.parent().removeClass('open');

                return;
            }

            var founded = [];

            for (var i=0; i<self.ingredients.length; i++) {
                if (self.ingredients[i].title.toLowerCase().search($(this).val().toLowerCase()) != -1) {
                    founded.push(self.ingredients[i]);
                }
            }

            self.view.render('statistics/view/ingredient-autocomplete', {ingredients: founded}, function(tpl){
                $ingredientList.html(tpl);
                $ingredientList.parent().addClass('open');
            });
        });

        $(self.element).find('[data-ingredient]').find('[data-ingredient-list]').on('click', '[data-select]', function(){

            $(self.element).find('[data-ingredient]').find('[data-ingredient-id]').val($(this).data('id'));
            $(self.element).find('[data-ingredient]').find('[data-ingredient-title]').val($(this).data('title'));
            $(self.element).find('[data-ingredient]').find('.input-group-btn').removeClass('open');

            self.filterData.ingredientId = $(this).data('id');
            self.filterData.offset = 0;

            self.grid();
        });

        $(self.element).find('[data-filter]').find('[data-datetime]').on('dp.change', function(event){

            self.filterData[$(this).data('value')] = event.timeStamp / 1000 | 0;

            if ($(this).data('value') == 'endTime') {
                $(self.element).find('[data-value=startTime]').data("DateTimePicker").maxDate(event.date);
            }
            else {
                $(self.element).find('[data-value=endTime]').data("DateTimePicker").minDate(event.date);
            }

            self.filterData.offset = 0;
            self.grid();
        });

        $(self.element).find('[data-value=startTime]').data("DateTimePicker").maxDate(moment());
        $(self.element).find('[data-value=endTime]').data("DateTimePicker").minDate(moment());

        $(self.element).find('[data-filter]').find('[data-status]').on('change', function(){
            self.filterData.status = $(this).val();
            self.filterData.offset = 0;
            self.grid();
        });

        $(self.element).find('[data-filter]').find('[data-payment-method]').on('change', function(){
            self.filterData.paymentMethod = $(this).val();
            self.filterData.offset = 0;
            self.grid();
        });

        $(self.element).find('[data-filter]').find('[data-query]').on('keyup', function(event){

            self.filterData.query = $(this).val();

            if (event.keyCode == 13) {
                self.filterData.offset = 0;
                self.grid();
            }
        });
    };

    this.grid = function(){

        services.loader.show();

        services.api.statisticsData(self.filterData, function(data){

            var gridData = {
                data: data,
                limit: self.filterData.limit,
                offset: self.filterData.offset,
                page: self.filterData.offset / self.filterData.limit
            };

            $(self.element).find('[data-order-price]').html(data.price);

            self.view.render('statistics/view/list', gridData, function(tpl){
                $(self.element).find('[data-grid]').html(tpl);

                $(self.element).find('[data-paginator] [data-page]').on('click', function(){
                    self.filterData.offset = self.filterData.limit * $(this).data('page');
                    self.grid();
                });

                services.loader.hide();
            });
        });

        setTimeout(function(){

        }, 1000);
    };

    this.unload = function(){

        delete self.filterData;

        delete self.ingredients;
        delete self.products;
        delete self.sections;

        $(self.element).remove();
    };

    var self = this;

};