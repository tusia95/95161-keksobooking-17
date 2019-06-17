'use strict';
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -70;
var ARRAY_SIZE = 8;
var TYPES = ['palace', 'flat', 'house ', 'bungalo'];

var getAvatars = function () {
  var avatars = [];
  for (var i = 1; i <= ARRAY_SIZE; i++) {
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
  for (var i = 0; i < ARRAY_SIZE; i++) {
    advertismentsArray.push(getAdvertisment(i));
  }
  return advertismentsArray;
};

var pins = getAdvertismentArray();

// remove map--fadded
var elementMap = document.querySelector('.map');
elementMap.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');


var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x + PIN_OFFSET_X + 'px';
  pinElement.style.top = pin.location.y + PIN_OFFSET_Y + 'px';
  var avatarElement = pinElement.querySelector('img');
  avatarElement.src = pin.author.avatar;
  avatarElement.alt = 'advertisment name';
  return pinElement;
};


var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}

elementMap.appendChild(fragment);
