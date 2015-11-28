modules.createSection = function(){

    this.data = {
        image: undefined,
        title: undefined
    };

    this.init = function () {

        self.view.render('section/view/create', {}, function(renderedHtml){
            $(self.element).html(renderedHtml);
        });

        $(self.element).find('.modal').modal({
            keyboard: false,
            backdrop: 'static'
        }).on('hidden.bs.modal', function(){
            self.unload();
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

            $(self.element).find('.modal').modal('hide');

            if (self.params.callback) {
                self.params.callback();
            }
        });
    };

    this.unload = function (callback) {

        $(self.element).remove();

        if (callback) {
            callback();
        }
    };

    var self = this;
};