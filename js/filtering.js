'use strict';

(function () {
  // window.renderPins();
  // var loadedPins = [];
  var filterForTypePins = function (accomType, renderPins, loadedPins) {
    var sameAccomTypePins = loadedPins.filter(function (it) {
      return it.offer.type === accomType;
    });
    renderPins(sameAccomTypePins);
  };
  // var houseTypeList = document.querySelector('#housing-type');

  window.filtering = {filterFotTypePins: filterForTypePins,
  };
})();
