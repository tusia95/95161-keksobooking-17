'use strict';
// remove map--fadded
(function () {
  var activateMap = function () {
    var elementMap = document.querySelector('.map');
    elementMap.classList.remove('map--faded');
  };
  window.map = {
    activateMap: activateMap
  };
})();

