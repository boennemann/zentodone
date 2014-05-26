angular.module('zentodone').filter('unitsOff', function () {
  return function (unit, date1, date2) {
    date1 = new Date(date1)
    date2 = new Date(date2 ? date2 : Date.now())

    return Math.round((date1.getTime() - date2.getTime())/(unit))
  }
})
