modules.index = function(){

    this.methVar = "hitman";

    this.init = function () {

        self.view.render('index/view/index', {methVar: self.methVar}, function(renderedHtml){
            $(self.element).html(renderedHtml);
        });
    };

    var self = this;
};