modules.createMenu = function(){

    this.data = {
        image: undefined,
        title: undefined
    };

    this.init = function () {

        self.view.render('menu/view/create', {}, function(renderedHtml){
            $(self.element).html(renderedHtml);
        });

        $(self.element).find('.modal').modal({
            keyboard: false,
            backdrop: 'static'
        }).on('hidden.bs.modal', function(){
            module.unload('createMenu');
        });

        $(self.element).find('input[type=file]').on('change', function(){

            var reader = new FileReader();

            reader.onload = function (event) {
                $(self.element).find('.image-uploader .holder').css({
                    backgroundImage: "url(" + event.target.result + ")"
                });
                self.data.image = event.target.result;
            };

            reader.readAsDataURL($(this).get(0).files[0]);
        });

        $(self.element).find('[data-submit]').on('click', function(){
            window.view.plugins.message("Caption", "<b>Cont</b> - ent", {"OK": "info", "Cancel": "normal"}, "info", function(){

            });
        });
    };

    var self = this;
};