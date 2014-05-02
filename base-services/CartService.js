FrontendModule.service('CartService', function(RemoteService){
    var service = this;
    
    this.name = 'CartService';
    
    this.cart = {
        
    };

    this.extendCart = function(){
        service.cart.getSum = function(){
            var sum = 0;
            
            $.each(service.cart.items, function(){
                sum += this.price * this.count;
            });
            
            return sum;
        };
    };

    this.loadCart = function(){
        return RemoteService.request(service.name, 'loadCart').then(function(response){
            service.cart = response.data.cart;
            service.extendCart();
        });
    };
    
    this.addItem = function(idProduct, count, idVariant){    
        var args = {
            'idProduct': idProduct,
            'count': count,
            'idVariant': idVariant
        }
        
        return RemoteService.request(service.name, 'addItem', args).then(function(response){
            var item = response.data.item;
            
            if(typeof service.cart.items[item.id] == 'undefined'){
                service.cart.items[item.id] = item;
            }
        });
    };
    
    this.updateItem = function(item){
        service.cart.items[item.id] = item;
        
        return RemoteService.request(service.name, 'updateItem', { 'item': item }).then(function(response){
        });
    };
    
    this.removeItem = function(idItem){
        delete this.cart.items[idItem];
        
        return RemoteService.request(service.name, 'removeItem', { 'idItem': idItem });
    };
});