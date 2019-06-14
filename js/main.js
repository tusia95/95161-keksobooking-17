'use strict';
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -70;
var ARRAY_SIZE = 8;

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TYPES = ['palace', 'flat', 'house ', 'bungalo'];

var getRundomY = function () {
  return (Math.floor(Math.random() * (MAX_Y - MIN_Y + 1)) + MIN_Y);
};

var getRundomX = function () {
  var mapWidth = document.querySelector('.map__pins').offsetWidth;
  return (Math.floor(Math.random() * (mapWidth + 1)));
};

var getAdvertisment = function (i) {
  return {
    'author': {'avatar': AVATARS[i]},
    'offer': {'type': TYPES[i]},
    'location': {'x': getRundomX(),
      'y': getRundomY()},
  };
};

var getAdvertismentArray = function () {
  var advertismentsArray = [];
  for (var i = 0; i < ARRAY_SIZE; i++) {
    advertismentsArray[i] = getAdvertisment(i);
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
  avatarElement.alt = 'advertisment name' + pin.offer.type;
  return pinElement;
};


var fragment = document.createDocumentFragment();
for (var i = 0; i < pins.length; i++) {
  fragment.appendChild(renderPin(pins[i]));
}

elementMap.appendChild(fragment);
