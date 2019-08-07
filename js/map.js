'use strict';

(function () {
  var mapWidth = document.querySelector('.map__pins').offsetWidth;
  var elementMap = document.querySelector('.map');
  var activateMap = function () {
    elementMap.classList.remove('map--faded');
  };
  var disableMap = function () {
    elementMap.classList.add('map--faded');
  };
  window.map = {
    mapWidth: mapWidth,
    activateMap: activateMap,
    disableMap: disableMap
  };
})();

