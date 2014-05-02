FrontendModule.controller('CartTableController', function ($scope, CartService){
  $scope.assign(CartService, 'cart');
  
  CartService.loadCart();
  
  $scope.updateItem = function(item){
    if(item.count == ''){
        return;
    }
    
    CartService.updateItem(item);
  };
  
  $scope.removeItem = function(idItem){
    CartService.removeItem(idItem);
  };
  
});