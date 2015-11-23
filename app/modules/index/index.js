modules.index = function(){

    this.methVar = "hitman";

    this.init = function () {

        //self.view.render('index/view/index', {}, function(renderedHtml){
        //    $(self.element).html(renderedHtml);
        //});
    };

    var self = this;
};

modules.index.prototype = window.modules.layoutBase();