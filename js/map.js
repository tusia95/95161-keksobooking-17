'use strict';
// remove map--fadded
(function () {
  var mapWidth = document.querySelector('.map__pins').offsetWidth;
  var activateMap = function () {
    var elementMap = document.querySelector('.map');
    elementMap.classList.remove('map--faded');
  };
  window.map = {
    mapWidth: mapWidth,
    activateMap: activateMap
  };
})();

