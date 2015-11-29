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
        self.call('get', 'section', {parentId: parentId}, callback);
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
        self.call('get', 'section/get', {sectionId: sectionId}, callback);
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
    this.saveSection = function(data, callback){
        self.call('post', 'section/save', data, callback);
    };

    /**************************** END SECTION *****************************/

    this.call = function(method, endpoint, data, callback){

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

                callback(parsedResponse);
            }
        });
    };

    var self = this;

};