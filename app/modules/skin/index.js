modules.skin = function(){

    this.style = {
        colors : {
            brand: '#FF0000',
            foreground: '#000000',
            background: '#FFFFFF'
        },
        backgroundImage : {
            image: "",
            url: ""
        },
        company : {
            logo: {
                image: "",
                url: ""
            },
            slogan: ""
        }
    };

    this.init = function () {

        window.services.loader.show();

        services.api.getStyle(function(data){

            if (data.style) {
                self.style = data.style;
            }

            self.drawStyle();
            window.services.loader.hide();
        });
    };

    this.drawStyle = function(){

        self.view.render('skin/view/index', self.style, function(tpl) {
            $(self.element).html(tpl);

            /** Binding Company slogan */
            $(self.element).find('[data-company-slogan]').on('change', function(){
                self.style.company.slogan = $(this).val();
                self.profileSubmit();
            });


            /** Binding Company logo image */
            $(self.element).find('[data-logo-holder] input').on('change', function(){

                var reader = new FileReader();

                var holder = $(this).closest('[data-logo-holder]');

                reader.onload = function (event) {

                    holder.find('.holder').css({
                        backgroundImage: "url(" + event.target.result + ")",
                        backgroundSize: "cover"
                    });

                    self.style.company.logo = {
                        image: event.target.result,
                        needToUpload: 1
                    };

                    self.profileSubmit();
                };

                if ($(this).get(0).files.length) {
                    reader.readAsDataURL($(this).get(0).files[0]);
                }
            });


            /** Binding colors */
            $(self.element).find('[data-color]').on('change', function(){
                self.style.colors[$(this).data('type')] = $(this).val();
                self.profileSubmit();
            });


            /** Binding background image */
            $(self.element).find('[data-image-holder] input').on('change', function(){

                var reader = new FileReader();

                var holder = $(this).closest('[data-image-holder]');

                reader.onload = function (event) {

                    holder.find('.holder').css({
                        backgroundImage: "url(" + event.target.result + ")",
                        backgroundSize: "cover"
                    });

                    self.style.backgroundImage = {
                        image: event.target.result,
                        needToUpload: 1
                    };

                    self.profileSubmit();
                };

                if ($(this).get(0).files.length) {
                    reader.readAsDataURL($(this).get(0).files[0]);
                }
            });

            /** Submit data */
            $(self.element).find('[data-save]').on('click', function(){
                services.loader.show();

                services.api.saveStyle(
                    self.style,
                    function(){

                        services.loader.hide();

                        $(self.element).find('[data-error]')
                            .removeClass('text-danger')
                            .addClass('text-success')
                            .html(services.locale.translate('saved-successfully'));
                    },
                    function(response){

                        services.loader.hide();

                        $(self.element).find('[data-error]')
                            .removeClass('text-success')
                            .addClass('text-danger')
                            .html(services.locale.translate(response.message));
                    }
                );
            });
        });

        self.profileSubmit();
    };

    this.profileSubmit = function(){

        if (self.style.company.slogan.length > 30 && self.style.company.slogan.length < 3) {
            $(self.element).find('[data-save]').attr('disabled', 'disabled');
            return;
        }

        if (!self.style.company.logo.image && !self.style.company.logo.identity) {
            $(self.element).find('[data-save]').attr('disabled', 'disabled');
            return;
        }

        if (!self.style.colors.brand.length || !self.style.colors.foreground.length || !self.style.colors.background.length) {
            $(self.element).find('[data-save]').attr('disabled', 'disabled');
            return;
        }

        if (!self.style.backgroundImage.image && !self.style.backgroundImage.identity) {
            $(self.element).find('[data-save]').attr('disabled', 'disabled');
            return;
        }

        $(self.element).find('[data-save]').removeAttr('disabled');
    };

    this.unload = function(){
        delete self.style;
        $(self.element).remove();
    };

    var self = this;

};