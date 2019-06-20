'use strict';
var MIN_Y = 130;
var MAX_Y = 630;
var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -70;
var MAIN_PIN_SIZE = 68;
var MAIN_PIN_OFFSET_X = 34;
var MAIN_PIN_OFFSET_Y = 90;
var ARRAY_SIZE = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MIN_PRICES = [10000, 1000, 5000, 0];

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

var addPinsToMap = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  var elementMap = document.querySelector('.map');
  elementMap.appendChild(fragment);
};

// remove map--fadded
var activateMap = function () {
  var elementMap = document.querySelector('.map');
  elementMap.classList.remove('map--faded');
};

// remove ad-form--disabled;
var activateAdvertForm = function () {
  var adFormElement = document.querySelector('.ad-form');
  adFormElement.classList.remove('ad-form--disabled');
};


// disable filters form
var disableFilters = function (isDisabled) {
  var filtersFormElem = document.querySelectorAll('.map__filter');
  for (var i = 0; i < filtersFormElem.length; i++) {
    filtersFormElem[i].disabled = isDisabled;
  }
};

var enableFilters = function () {
  disableFilters(false);
};


// disable fieldsets
var disableFieldsets = function () {
  var fieldSets = document.querySelectorAll('fieldset');
  for (var i = 0; i < fieldSets.length; i++) {
    fieldSets[i].disabled = true;
  }
};

var enableFieldsets = function () {
  var fieldSets = document.querySelectorAll('fieldset');
  for (var i = 0; i < fieldSets.length; i++) {
    fieldSets[i].disabled = false;
  }
};

disableFieldsets();
disableFilters(true);

// add event listener to .map__pin--main.
var mainPinElement = document.querySelector('.map__pin--main');
mainPinElement.addEventListener('click', enableFieldsets);
mainPinElement.addEventListener('click', activateMap);
mainPinElement.addEventListener('click', activateAdvertForm);
mainPinElement.addEventListener('click', enableFilters);
mainPinElement.addEventListener('click', addPinsToMap);


// function to get address of pin

var getPinPosition = function (element, offsetX, offsetY) {
  var positionX = element.offsetLeft + offsetX;
  var positionY = element.offsetTop + offsetY;
  var elementPosition = {'x': positionX, 'y': positionY};
  return elementPosition;
};

var setPinStartPosition = function () {
  var addressElem = document.querySelector('#address');
  var position = getPinPosition(mainPinElement, MAIN_PIN_SIZE / 2, MAIN_PIN_SIZE / 2);
  addressElem.value = position.x + ', ' + position.y;
};

var setPinPosition = function () {
  var addressElem = document.querySelector('#address');
  var position = getPinPosition(mainPinElement, MAIN_PIN_OFFSET_X, MAIN_PIN_OFFSET_Y);
  addressElem.value = position.x + ', ' + position.y;
};

setPinStartPosition();


mainPinElement.addEventListener('mouseup', setPinPosition);

// get objects for accomodations (type and minprice)
var getAccomodations = function () {
  var accomodations = [];
  for (var i = 0; i < TYPES.length; i++) {
    accomodations[i] = {'type': TYPES[i],
      'minPrice': MIN_PRICES[i]
    };
  }
  return accomodations;
};

// get element from array with type == type
var getAccomodationsIndex = function (type) {
  var accArray = getAccomodations();
  for (var i = 0; i < accArray.length; i++) {
    if (accArray[i].type === type) {
      var index = i;
      break;
    }
  }
  return index;
};

var accomList = document.querySelector('#type');
// set to value -> min price
var setMinPrice = function () {
  var priceElem = document.querySelector('#price');
  var elemIndex = getAccomodationsIndex(accomList.value);
  var priceValue = getAccomodations()[elemIndex].minPrice;
  priceElem.setAttribute('placeholder', priceValue);
  priceElem.setAttribute('min', priceValue);
};

setMinPrice();
accomList.addEventListener('change', setMinPrice);


//

// to get timein timeout values
var getTimeinTimeoutObjects = function () {
  var timeinOptions = document.querySelector('#timein')
 .querySelectorAll('option');
  var timeoutOptions = document.querySelector('#timeout')
.querySelectorAll('option');
  var timeValues = [];
  for (var i = 0; i < timeinOptions.length; i++) {
    timeValues[i] = {'timein': timeinOptions[i].value, 'timeout': timeoutOptions[i].value};
  }
  return timeValues;
};

var timeinList = document.querySelector('#timein');
var timeoutList = document.querySelector('#timeout');

// sinchronize timein timeout values
var sinchronizeTimeoutForTimein = function () {
  var times = getTimeinTimeoutObjects();
  for (var i = 0; i < times.length; i++) {
    if (times[i].timein === timeinList.value) {
      timeoutList.setAttribute('value', times[i].timeout);
      break;
    }
  }
};

// sinchronize timeout timein values
var sinchronizeTimeinForTimeout = function () {
  var times = getTimeinTimeoutObjects();
  for (var i = 0; i < times.length; i++) {
    if (times[i].timeout === timeoutList.value) {
      timeinList.setAttribute('value', times[i].timein);
      break;
    }
  }
};


timeinList.addEventListener('change', sinchronizeTimeoutForTimein);
timeoutList.addEventListener('change', sinchronizeTimeinForTimeout);
