'use strict';
(function () {
  var PIN_OFFSET_X = -25;
  var PIN_OFFSET_Y = -70;
  var MAIN_PIN_SIZE = 68;
  var MAIN_PIN_OFFSET_X = 34;
  var MAIN_PIN_OFFSET_Y = 90;
  var MAX_COUNTER_VALUE = 2;
  var TYPES = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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

    // show pins on map
  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    var elementMap = document.querySelector('.map');
    elementMap.appendChild(fragment);
  };

    // render Advertisment
  var advertTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var renderAdvert = function (pin) {
    var advertElement = advertTemplate.cloneNode(true);

    var avatarElement = advertElement.querySelector('.popup__avatar');
    var titleElement = advertElement.querySelector('.popup__title');
    var addressElement = advertElement.querySelector('.popup__text--address');
    var priceElement = advertElement.querySelector('.popup__text--price');
    var typeElement = advertElement.querySelector('.popup__type');
    var capacityElement = advertElement.querySelector('.popup__text--capacity');
    var timeElement = advertElement.querySelector('.popup__text--time');
    var featuresListElement = advertElement.querySelector('.popup__features');
    var descriptionElement = advertElement.querySelector('.popup__description');
    var photosElement = advertElement.querySelector('.popup__photo');

    var featurewWifi = featuresListElement.querySelector('.popup__feature--wifi');
    var featurewDishWasher = featuresListElement.querySelector('.popup__feature--dishwasher');
    var featurewParking = featuresListElement.querySelector('.popup__feature--parking');
    var featurewWasher = featuresListElement.querySelector('.popup__feature--washer');
    var featureElevator = featuresListElement.querySelector('.popup__feature--elevator');
    var featureCondition = featuresListElement.querySelector('.popup__feature--conditioner');
    var featuresElements = {wifi: featurewWifi, dishwasher: featurewDishWasher, parking: featurewParking, washer: featurewWasher,
      elevator: featureElevator, conditioner: featureCondition};
    avatarElement.src = pin.author.avatar;
    titleElement.textContent = pin.offer.title;
    addressElement.textContent = pin.offer.address;
    priceElement.textContent = pin.offer.price + '₽/ночь.';
    typeElement.textContent = getAccomodationType(pin.offer.type);
    capacityElement.textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей.';
    timeElement.textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    // find fetures wich aren`t in current accomodation
    var diff = FEATURES.filter(function (elem) {
      return pin.offer.features.indexOf(elem) < 0;
    });
    for (var i = 0; i < diff.length; i++) {
      featuresElements[diff[i]].remove(); // delete fetures elements wich aren`t in current accomodation
    }
    descriptionElement.textContent = pin.offer.description;
    photosElement.src = pin.offer.photos;
    // avtarElement.alt = 'advertisment name';
    return advertElement;
  };

  var getAccomodationType = function (type) {
    var rusType = null;
    switch (type) {
      case 'palace': rusType = TYPES['palace'];
        break;
      case 'bungalo': rusType = TYPES['bungalo'];
        break;
      case 'house': rusType = TYPES['house'];
        break;
      case 'flat': rusType = TYPES['flat'];
        break;
      default: rusType = 'неизвестно';
        break;
    }
    return rusType;
  };

  var renderAdverts = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 1; i++) {
      fragment.appendChild(renderAdvert(pins[0]));
    }
    var elementMap = document.querySelector('.map');
    var elementMapFilters = document.querySelector('.map__filters-container');
    elementMap.insertBefore(fragment, elementMapFilters);
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
    var slicedPins = data.slice(0, window.utils.numberPins);
    renderPins(slicedPins);
    renderAdverts(loadedPins);
  };


  var onHouseTypeChange = function () {
    removePins();
    var accomType = houseTypeList.value;
    window.filtering.filterFotTypePins(accomType, renderPins, loadedPins);
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
