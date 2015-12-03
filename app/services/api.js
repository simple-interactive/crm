window.services.api = function(){

    this.config = {
        endpoint : config.endpoint
    };

    this.token = null;

    this.setToken = function(token){
        self.token = token;
    };

    this.login = function(data, callback){

        if (!self.config.endpoint) {
            console.log("API Endpoint was not specified");
            return;
        }

        $.post([self.config.endpoint, 'auth'].join('/'), data, callback);
    };

    /****************************** SECTION *******************************/
    /**
     * Returns section list by provided parent section ID
     * METHOD: GET
     * URL:    section?parentId=parentId
     *
     * @param String|null  parentId
     * @param Function     callback
     */
    this.getSections = function(parentId, callback){

        var params = (parentId != null)?{parentId: parentId}:{};

        self.call('get', 'section/list', params, callback);
    };

    /**
     * Returns section object by provided ID
     * Method: GET
     * URL:    section/get?id=sectionId
     *
     * @param String   sectionId
     * @param Function callback
     */
    this.getSection = function(sectionId, callback){
        self.call('get', 'section', {id: sectionId}, callback);
    };

    /**
     * Saves section data.
     * data = {
     *     id: string|null, // can be a null - in this case backend will create a new section
     *     title: string,
     *     image: blob      // only for editing a section can be a null
     * }
     * METHOD: POST
     * URL: section/save
     *
     * @param Object   data
     * @param Function callback
     */
    this.saveSection = function(data, callback, failCallback){
        self.call('post', 'section/save', data, callback, failCallback);
    };

    /**
     * @param string sectionId
     * @param Function callback
     */
    this.deleteSection = function(sectionId, callback){
        self.call('post', 'section/delete', {id: sectionId}, callback);
    };

    /**************************** END SECTION *****************************/

    /****************************** PRODUCT *******************************/
    /**
     * Returns list of all products
     *
     * @param Int limit
     * @param Int offset
     * @param Function callback
     */
    this.getAllProducts = function(limit, offset, callback){
        self.call('get', 'product/list', {limit: limit, offset: offset}, callback);
    };

    /**
     * Returns list of founded products
     *
     * @param String search
     * @param Int limit
     * @param Int offset
     * @param Function callback
     */
    this.getSearchProducts = function(search, limit, offset, callback){
        self.call('get', 'product/search', {search: search, limit: limit, offset: offset}, callback);
    };

    /**
     * Returns list of products by section
     *
     * @param String sectionId
     * @param Int limit
     * @param Int offset
     * @param Function callback
     */
    this.getSectionProducts = function(sectionId, limit, offset, callback){
        self.call('get', 'product/section', {sectionId: sectionId, limit: limit, offset: offset}, callback);
    };

    /**************************** END PRODUCT *****************************/


    this.addIngredient = function(ingredient, callback){
        self.call('post', 'ingredient/save', {title: ingredient}, callback);
    };

    this.getIngredients = function (search, callback) {
        self.call('get', 'ingredient', {search: search}, callback);
    };


    this.call = function(method, endpoint, data, callback, failCallback){

        if (!self.config.endpoint) {
            console.log("API Endpoint was not specified");
            return;
        }

        $.ajax({
            url: [self.config.endpoint, endpoint].join('/'),
            data: data,
            type: method.toUpperCase(),
            dataType: 'json',
            beforeSend: function(request){
                request.setRequestHeader('x-auth', self.token);
            },
            complete: function (response) {

                if (response.status == 403) {
                    services.user.forget();
                    return false;
                }

                var parsedResponse = {
                    success: false,
                    message: 'the-server-is-currently-not-responding'
                };

                try {
                    parsedResponse = JSON.parse(response.responseText);
                } catch (err) {}

                if (response.status == 200) {
                    callback(parsedResponse);
                } else {
                    if (failCallback) {
                        failCallback(parsedResponse);
                    }
                }
            }
        });
    };

    var self = this;

};