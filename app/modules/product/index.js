modules.product = function(){

    var limit = 10;
    var offset = 0;

    var source = 'all';
    var section = null;
    var search = null;

    this.init = function () {

        var viewData = {};

        if (self.params.source == 'search') {
            self.source = 'search';
            self.search = self.params.search;
            viewData.search = self.search;
        }
        else if (self.params.source == 'section') {
            self.source = 'section';
            self.section = self.params.section;
            viewData.section = self.section;
        }

        self.view.render('product/view/index', viewData, function(renderedHtml) {
            $(self.element).html(renderedHtml);
        });

        $(self.element).find('[data-product-add]').on('click', function(){
            module.load('productCreate', {}, 'body');
        });

        self.drawProducts();
    };

    this.getProducts = function (limit, offset, callback) {

        switch (self.source) {

            case 'search':
                window.services.api.getSearchProducts(self.search, limit, offset, callback);
                break;

            case 'section':
                window.services.api.getSectionProducts(self.section.id, limit, offset, callback);
                break;

            default :
                window.services.api.getAllProducts(limit, offset, callback);
        }
    };

    
    this.drawProducts = function () {

        self.getProducts(self.limit, self.offset, function (products) {

            var viewData = {
                limit: self.limit,
                offset: self.offset,
                count: products.count,
                products: products.products
            };

            self.view.render('product/view/list', viewData, function(renderedHtml) {
                $(self.element).find('[data-product-list]').html(renderedHtml);
            });
        });
    };

    var self = this;
};