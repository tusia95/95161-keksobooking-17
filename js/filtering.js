'use strict';

(function () {
  var filterForTypePins = function (accomType) {
    // window.renderPins();
    // var loadedPins = [];
    var getSameAccomTypePins = function (data) {
      data.filter(function (it) {
        return it.offer.type === accomType;
      });
    };
    window.pin.renderPins(getSameAccomTypePins);
  };
  var houseTypeList = document.querySelector('#housing-type');
  var onHouseTypeChange = function () {
    removePins();
    var accomType = houseTypeList.value;
    filterForTypePins(accomType);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
  };
  houseTypeList.addEventListener('change', onHouseTypeChange);

  window.filtering = {filterFotTypePins: filterForTypePins,
  };
})();
