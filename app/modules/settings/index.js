modules.settings = function() {

    this.settingsData = {};

    this.init = function(){

        services.loader.show();

        services.api.getSettings(function(settings){

            self.settingsData = settings.settings || {};

            self.view.render('settings/view/index', {settingsData: self.settingsData}, function(tpl){

                $('body').append(tpl);

                services.loader.hide();

                $('[data-modal-settings]').modal({
                    keyboard: false,
                    backdrop: 'static'
                }).on('hidden.bs.modal', function(){
                    self.unload();
                });

                $('[data-modal-settings]').find('[data-input]').on('keyup', function(){
                    self.settingsData[$(this).data('input')] = $(this).val();
                });

                $('[data-modal-settings]').find('[data-submit]').on('click', function(){
                    services.api.setSettings(self.settingsData, function(){
                        $('[data-modal-settings]').modal('hide');
                    });
                });

            });
        });
    };

    this.unload = function(){

        delete this.settingsData;

        $('[data-modal-settings]').remove();
        $(self.element).remove();
    };

    var self = this;
};