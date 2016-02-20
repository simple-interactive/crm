window.services.locale = function() {

    this.locale = navigator.language || navigator.userLanguage;
    this.locale = 'ru';

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
        "uah": { 'ru': 'грн.'},
        "gramm": { 'ru': 'г.'},
        "menu-account": { 'ru': 'Учетная запись'},
        "menu-settings": { 'ru': 'Настройки'},
        "menu-change-password": { 'ru': 'Изменить пароль'},
        "menu-contact-administrator": { 'ru': 'Тех. поддержка'},
        "menu-logout": { 'ru': 'Выйти'},
        "settings": { 'ru': 'Настройки'},
        "edit": { 'ru': 'Изменить'},
        "remove": { 'ru': 'Удалить'},
        "confirm-action": { 'ru': 'Подтвердите действие'},
        "yes": { 'ru': 'Да'},
        "no": { 'ru': 'Нет'},
        "product-removing": { 'ru': 'Удалить позицию?'},
        "type-to-search": { 'ru': 'Поиск'},
        "add": { 'ru': 'Добавить'},
        "all-products": { 'ru': 'Все позиции'},
        "product-management": { 'ru': 'Управление позицией'},
        "in-stock": { 'ru': 'в наличии'},
        "choose-section": { 'ru': 'Выберете раздел'},
        "price": { 'ru': 'цена'},
        "weight": { 'ru': 'вес'},
        "title": { 'ru': 'Название'},
        "decription": { 'ru': 'Описание'},
        "add-option": { 'ru': 'Добавить опцию'},
        "manage-ingredients": { 'ru': 'Управление ингредиентами'},
        "cancel": { 'ru': 'Отмена'},
        "save": { 'ru': 'Сохранить'},
        "nothing-founded": { 'ru': 'Нет результатов'},
        "add-picture": { 'ru': 'Добавить изображение'},
        "by-section": { 'ru': 'По разделу'},
        "search-results": { 'ru': 'Результаты поиска'},
        "there-no-products": { 'ru': 'Нет позиций'},
        "menu-content": { 'ru': 'Содержимое меню'},
        "menu-products": { 'ru': 'Позиции'},
        "menu-section": { 'ru': 'Разделы'},
        "menu-view": { 'ru': 'Внешний вид'},
        "menu-template": { 'ru': 'Шаблон'},
        "menu-skin": { 'ru': 'Настройки'},
        "menu-analytics": { 'ru': 'Статистика'},
        "next": { 'ru': 'Вперед'},
        "prev": { 'ru': 'Назад'},
        "section-management": { 'ru': 'Управление разделами'},
        "show-products": { 'ru': 'показать позиции'},
        "section-deleting": { 'ru': 'Удалить раздел?'},
        "section-editing": { 'ru': 'Управление разделом'},
        "click-to-select-an-image": { 'ru': 'Нажмите для выбора изображения'},
        "add-section": { 'ru': 'Добавить раздел'},
        "skin-manage": { 'ru': 'Управление внешним видом'},
        "company-management": { 'ru': 'Настройки заведения'},
        "company-slogan": { 'ru': 'Слоган'},
        "company-logo": { 'ru': 'Логотип'},
        "style-color-title": { 'ru': 'Цветовая схема'},
        "style-color-brand": { 'ru': 'Основной цвет'},
        "style-color-foreground": { 'ru': 'Цвет переднего плана'},
        "style-color-background": { 'ru': 'Цвет заднего плана'},
        "background-title": { 'ru': 'Фоновое изображение'},
        "style-save": { 'ru': 'Сохранить'},
        "serving-time": { 'ru': 'Время подачи'},
        "min": { 'ru': 'мин'},
        "all-sections": { 'ru': 'Все секции'},
        "ingredient": { 'ru': 'Ингридиенты'},
        "all-statuses": { 'ru': 'Все статусы'},
        "order-status-successful": { 'ru': 'Выполнено'},
        "order-status-canceled": { 'ru': 'Отменен'},
        "all-payment-methods": { 'ru': 'Все способы оплаты'},
        "order-payment-cash": { 'ru': 'Наличные'},
        "order-payment-card": { 'ru': 'Безнал'},
        "liqpay-publckey": { 'ru': 'Публичный ключ LiqPay'},
        "liqpay-privatekey": { 'ru': 'Приватный ключ LiqPay'},
    };

    var self = this;
};