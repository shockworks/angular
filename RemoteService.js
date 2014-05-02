FrontendModule.service('RemoteService', function($http){
    var service = this;
    
    this.request = function(serviceName, actionName, args){
       if(typeof args == 'undefined'){
           args = {};
       } 
        
       return $.extend(true, JSON.clone(RemoteServiceFluent), {
           'url': '/default/remote-service-handler',
           'service': serviceName,
           'action': actionName,
           'args': args,
           httpObject: $http
       }).complete();
    };
    
    var RemoteServiceFluent = {
        httpObject: null,
        url: '',
        service: '',
        action: '',
        args: {},
        callbacks: [],
        then: function(callback){
            this.callbacks.push(callback);
            
            return this;
        },
        complete: function(){
            var self = this;
            
            var params = {
                'service': this.service,
                'action': this.action,
                'args': this.args
            };
            
            this.httpObject.post(this.url, params).then(function(result){
                $.each(self.callbacks, function(){
                    var response = {
                        'status': result.data.status,
                        'data': result.data.data
                    };
                    
                    this(response);
                });
            });
            
            return this;
        }
    };
});

JSON.clone = function(obj) {
    // basic type deep copy
    if (obj === null || obj === undefined || typeof obj !== 'object')  {
        return obj
    }
    // array deep copy
    if (obj instanceof Array) {
        var cloneA = [];
        for (var i = 0; i < obj.length; ++i) {
            cloneA[i] = JSON.clone(obj[i]);
        }              
        return cloneA;
    }                  
    // object deep copy
    var cloneO = {};   
    for (var i in obj) {
        cloneO[i] = JSON.clone(obj[i]);
    }                  
    return cloneO;
}