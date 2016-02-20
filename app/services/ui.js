window.services.ui = function(){

    this.init = function () {

        self.iCheck();
        self.selecter();
        self.inputAddon();
        self.dateTime();

        (function($) {

            $.fn.animate = function (type) {

                this.removeClass(type);
                var self = this;

                setTimeout(function () {
                    self.addClass('animated');
                    self.addClass(type);
                }, 1);
            };

        })(jQuery);
    };

    this.iCheck = function(){
        self.listen('[data-icheck]', function(element){
            $(element).iCheck({
                checkboxClass: 'icheckbox_square-blue',
                increaseArea: '20%'
            });
        });

    };

    this.selecter = function() {
        self.listen('[data-selecter]', function (element) {
            $(element).selecter();
        });
    };

    this.dateTime = function(){
        self.listen('[data-datetime]', function(element){
            $(element).datetimepicker({
                locale: services.locale.getLocale()
            });
        });
    };

    this.inputAddon = function(){
        self.listen('[data-input-addon]', function(element){
            $(element).find('input').on('focus', function () {
                $(element).find('.input-group-addon').animate({
                    backgroundColor: 'rgb(102, 175, 233)',
                    borderColor: 'rgb(102, 175, 233)'
                }, 300);
            });

            $(element).find('input').on('blur', function () {
                $(element).find('.input-group-addon').animate({
                    backgroundColor: '#aab2bd',
                    borderColor: '#96a0ad'
                }, 300);
            });
        });
    };

    this.listen = function (selector, callback) {

        function processElement (element) {
            if (!$(element).data('processed')) {
                $(element).data('processed', true);
                callback(element);
            }
        }

        $(document).bind('DOMNodeInserted', function(e) {
            if ($(e.target).is(selector)) {
                processElement(e.target);
            }
            $(e.target).find(selector).each(function(){
                processElement(this);
            });
        });

        if ($(selector).size()) {
            processElement($(selector).get());
        }
    };

    var self = this;
};