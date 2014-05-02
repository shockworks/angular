/**
 * @see http://stackoverflow.com/questions/12576798/angularjs-how-to-watch-service-variables
 */
FrontendModule.run(function($rootScope){
    $rootScope.assign = function(service, propertyName){
        var serviceName = service.name;
        
        this[serviceName] = service;
        this[propertyName] = service[propertyName];
        
        var self = this;
        
        this.$watch(serviceName + '.' + propertyName, function(newValue, oldValue, scope){
            if (newValue && newValue !== oldValue) {
                self[propertyName] = newValue;
            }
        });
    };
});
