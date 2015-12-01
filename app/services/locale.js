window.services.locale = function() {

    this.locale = navigator.language || navigator.userLanguage;

    this.setLocale = function (localeKey) {
        self.locale = localeKey;
    };

    this.getLocale = function () {
        return self.locale;
    };

    this.translate = function (phraseKey) {
        if (!self.phrases[phraseKey]) {
            return phraseKey;
        }
        return self.phrases[phraseKey][self.locale];
    };

    this.phrases = {
        "phrase1": {
            'en': 'Phrase in English',
            'ru': 'Фраза на русском'
        }
    };

    var self = this;
};