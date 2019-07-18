'use strict';
(function () {
  // var ARRAY_SIZE = 8;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var MIN_Y = 130;
  var MAX_Y = 630;
  var getAvatars = function () {
    var avatars = [];
    for (var i = 1; i <= window.utils.arSize; i++) {
      var avatarIndex = i;
      avatars.push('img/avatars/user0' + avatarIndex + '.png');
      // img/avatars/user{{xx}}.png
    }
    return avatars;
  };
  var avatars = getAvatars();
  var mapWidth = document.querySelector('.map__pins').offsetWidth;
  var getRandomValue = function (minValue, maxValue) {
    return (Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
  };

  var getAdvertisment = function (i) {
    var typeIndex;
    if (typeIndex >= TYPES.length) {
      typeIndex = i - TYPES.length;
    } else {
      typeIndex = i;
    }
    return {
      'author': {'avatar': avatars[i]},
      'offer': {'type': TYPES[typeIndex]},
      'location': {'x': getRandomValue(0, mapWidth),
        'y': getRandomValue(MIN_Y, MAX_Y)},
    };
  };

  var getAdvertismentArray = function () {
    var advertismentsArray = [];
    for (var i = 0; i < window.utils. arSize; i++) {
      advertismentsArray.push(getAdvertisment(i));
    }
    return advertismentsArray;
  };

  window.data = {
    getAdvertismentArray: getAdvertismentArray,
    mapWidth: mapWidth
  };

  // var pins = getAdvertismentArray();
})();
