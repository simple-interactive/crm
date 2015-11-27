modules.menu = function(){

    this.init = function () {

        self.view.render('menu/view/index', {}, function(renderedHtml){
            $(self.element).html(renderedHtml);
        });

        $(self.element).find('[data-create]').on('click', function(){
            module.load('createMenu', {
                callback: self.loadList
            }, 'body');
        });

        $(self.element).find('[data-edit]').on('click', function(){
            module.load('editMenu', {
                callback: self.loadList
            }, 'body');
        });
    };

    this.loadList = function () {

    };

    var self = this;

};