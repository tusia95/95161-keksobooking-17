'use strict';
(function () {
  var PIN_OFFSET_X = -25;
  var PIN_OFFSET_Y = -70;
  var MAIN_PIN_SIZE = 68;
  var MAIN_PIN_OFFSET_X = 34;
  var MAIN_PIN_OFFSET_Y = 90;
  var MAX_COUNTER_VALUE = 2;

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

  var messageTemplate = document.querySelector('#error')
.content
.querySelector('.error__message');

  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

  var errorHandler = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    messageTemplate.textContent = message;
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorElement);
    var elementMain = document.querySelector('main');
    elementMain.insertAdjacentElement('afterbegin', errorElement);

  };

  // filtering
  var loadedPins = [];

  var successHandler = function (data) {
    loadedPins = data;
    var filteredPins = data.slice(0, window.utils.numberPins);
    renderPins(filteredPins);
  };

  var filterForTypePins = function (accomType) {
    // window.renderPins();
    var sameAccomTypePins = loadedPins.filter(function (it) {
      return it.offer.type === accomType;
    });
    renderPins(sameAccomTypePins);
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
  var houseTypeList = document.querySelector('#housing-type');

  houseTypeList.addEventListener('change', onHouseTypeChange); 

  // show pins on map
  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    var elementMap = document.querySelector('.map');
    elementMap.appendChild(fragment);
  };


  var mainPinElement = document.querySelector('.map__pin--main');
  var moveCount = 0;

  //  drug and drop for main pin

  mainPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      if (moveCount < MAX_COUNTER_VALUE) {
        moveCount++;
      }

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newTop = mainPinElement.offsetTop - shift.y;
      var newLeft = mainPinElement.offsetLeft - shift.x;

      if ((newTop > window.utils.miny - MAIN_PIN_OFFSET_Y && newTop < window.utils.maxy - MAIN_PIN_OFFSET_Y) && (newLeft > -MAIN_PIN_OFFSET_X && newLeft < window.map.mapWidth - MAIN_PIN_OFFSET_X)) {
        mainPinElement.style.top = newTop + 'px';
        mainPinElement.style.left = newLeft + 'px';
        setPinPosition();
      }
      // add on mouse move: form activation
      if (moveCount === 1) {
        window.load(successHandler, errorHandler);
        window.form.enableFieldsets();
        window.map.activateMap();
        window.form.activateAdvertForm();
        window.form.enableFilters();
      }
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPinElement.removeEventListener('click', onClickPreventDefault);
          setPinPosition();
        };
        mainPinElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', onMouseUp);

  });


  // to get address of pin

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

  // set pin after mouse click
  mainPinElement.addEventListener('mouseup', setPinPosition);

  window.pin = {renderPins: renderPins,
    errorHandler: errorHandler,
    loadedPins: loadedPins
  };
})();
