modules.product = function(){

    this.init = function () {
        self.view.render('product/view/index', {}, function(renderedHtml) {
            $(self.element).html(renderedHtml);
        });
    };

    var self = this;
};