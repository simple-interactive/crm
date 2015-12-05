modules.createSection = function(){

    this.data = {
        title: null,
        image: null,
        parentId: null
    };

    this.init = function () {

        if (self.params.parentId) {
            self.data.parentId = self.params.parentId;
        }

        self.view.render('section/view/create', {}, function(renderedHtml){
            $(self.element).html(renderedHtml);
        });

        $(self.element).find('.modal').modal({
            keyboard: false,
            backdrop: 'static'
        }).on('hidden.bs.modal', function(){
            self.unload();
        });

        $(self.element).find('[data-form-title]').on('keyup', function(){

            self.data.title = null;

            if ($(this).val().length > 2 && $(this).val().length < 30) {
                self.data.title = $(this).val();
            }

            self.profileSubmit();
        });

        $(self.element).find('[data-form-file]').on('change', function(){

            var reader = new FileReader();

            reader.onload = function (event) {
                $(self.element).find('.image-uploader .holder').css({
                    backgroundImage: "url(" + event.target.result + ")"
                });
                self.data.image = event.target.result;
                self.profileSubmit();
            };

            if ($(this).get(0).files.length) {
                reader.readAsDataURL($(this).get(0).files[0]);
            }
        });

        $(self.element).find('[data-submit]').on('click', function(){

            window.services.loader.show();

            window.services.api.saveSection(self.data, function (response) {

                window.services.loader.hide();

                $(self.element).find('.modal').modal('hide');

                if (self.params.callback) {
                    self.params.callback();
                }
            }, function (response) {

                window.services.loader.hide();

                $(self.element).find('[data-form-error]').html(
                    window.services.locale.translate(response.message)
                );
            });
        });
    };

    this.profileSubmit = function(){
        if (self.data.title && self.data.image) {
            $(self.element).find('[data-submit]').removeAttr('disabled');
        } else {
            $(self.element).find('[data-submit]').attr('disabled', 'disabled');
        }
    };

    this.unload = function (callback) {

        $(self.element).remove();

        if (callback) {
            callback();
        }
    };

    var self = this;
};