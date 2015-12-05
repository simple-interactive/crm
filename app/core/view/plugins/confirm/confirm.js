$(function () {
    /**
     *
     * @param {String} caption
     * @param {String} content
     * @param {String} style [style=info]
     * @param {Function} yesCallback
     * @param {Function} noCallback
     */
    window.view.plugins.confirm = function (caption, content, style, yesCallback, noCallback) {

        if (!style) {
            style = "info";
        }

        var data = {caption: caption, content: content, style: style};

        $('body').append(view().render('view/plugins/confirm/confirm', data));
        $('#plugin-confirm').modal();
        $('#plugin-confirm').on('hidden.bs.modal', function () {
            $('#plugin-confirm').remove();
            $('.modal-backdrop').remove();
        });

        $('#plugin-confirm [data-confirm]').click(function () {

            $('#plugin-confirm').modal('hide');

            if ($(this).data('confirm') == 'yes') {
                if (yesCallback) {
                    yesCallback();
                }
            } else {
                if (noCallback) {
                    noCallback();
                }
            }
        });
    };
});