FrontendModule.controller('CouponFormController', function ($scope, CouponService){
  $scope.assign(CouponService, 'coupon');
  
  CouponService.loadCoupon();
  
  $scope.applyCoupon = function(){
      CouponService.applyCoupon($scope.coupon.code);
  };
  
  $scope.removeCoupon = function(){
      CouponService.removeCoupon();
  };
  
});