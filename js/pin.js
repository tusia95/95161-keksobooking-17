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
    var elementMapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(pinElement);
    elementMapPins.appendChild(fragment);
    addOnPinClickListener(pinElement, pin);
    // return pinElement;
  };

  // show pins on map
  var renderPins = function (pins) {
    for (var i = 0; i < pins.length; i++) {
      renderPin(pins[i]);
    }
  };

    // render Advertisment
  var advertTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
  //
  //
  var renderAdvert = function (pin) {
    var advertElement = advertTemplate.cloneNode(true);

    var avatarElement = advertElement.querySelector('.popup__avatar');
    var titleElement = advertElement.querySelector('.popup__title');
    var addressElement = advertElement.querySelector('.popup__text--address');
    var priceElement = advertElement.querySelector('.popup__text--price');
    var typeElement = advertElement.querySelector('.popup__type');
    var capacityElement = advertElement.querySelector('.popup__text--capacity');
    var timeElement = advertElement.querySelector('.popup__text--time');
    var featuresList = advertElement.querySelector('.popup__features');
    var descriptionElement = advertElement.querySelector('.popup__description');
    var photosElement = advertElement.querySelector('.popup__photos');
    //
    featuresList.innerHTML = '';
    var featuresFragment = document.createDocumentFragment();
    pin.offer.features.forEach(function (it) {
      addFeature(featuresFragment, it);
    });

    featuresList.appendChild(featuresFragment);
    //
    photosElement.innerHTML = '';
    var photoFragment = document.createDocumentFragment();
    pin.offer.photos.forEach(function (it) {
      addPhoto(photoFragment, it);
    });

    photosElement.appendChild(photoFragment);
    //
    avatarElement.src = pin.author.avatar;
    titleElement.textContent = pin.offer.title;
    addressElement.textContent = pin.offer.address;
    priceElement.textContent = pin.offer.price + '₽/ночь.';
    typeElement.textContent = getAccomodationType(pin.offer.type);
    capacityElement.textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей.';
    timeElement.textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    descriptionElement.textContent = pin.offer.description;
    // photosElement.src = pin.offer.photos;
    // avtarElement.alt = 'advertisment name';
    var fragment = document.createDocumentFragment();
    fragment.appendChild(advertElement);
    var elementMap = document.querySelector('.map');
    var elementMapFilters = document.querySelector('.map__filters-container');
    elementMap.insertBefore(fragment, elementMapFilters);

    var closePopupElement = document.querySelector('.popup__close');
    closePopupElement.addEventListener('click', function () {
      removeAdvert();
    });
    // var element = advertElement;
    var escAdvertHandler = function (evt) {
      if (evt.keyCode === 27) {
        removeAdvert();
        document.removeEventListener('keydown', escAdvertHandler);
      }
    };

    document.addEventListener('keydown', escAdvertHandler);

  };

  var removeAdvert = function () {
    var advertElement = document.querySelector('.map__card');
    if (advertElement) {
      advertElement.remove();
    }
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

  var addFeature = function (container, data) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature');
    switch (data) {
      case FEATURES[0]:
        feature.classList.add('popup__feature--wifi');
        break;
      case FEATURES[1]:
        feature.classList.add('popup__feature--dishwasher');
        break;
      case FEATURES[2]:
        feature.classList.add('popup__feature--parking');
        break;
      case FEATURES[3]:
        feature.classList.add('popup__feature--washer');
        break;
      case FEATURES[4]:
        feature.classList.add('popup__feature--elevator');
        break;
      case FEATURES[5]:
        feature.classList.add('popup__feature--conditioner');
        break;
    }
    container.appendChild(feature);
  };


  var addPhoto = function (container, data) {
    var photo = document.createElement('img');
    photo.classList.add('popup__photo');
    photo.width = '45';
    photo.height = '40';
    photo.alt = 'Фотография жилья';
    photo.src = data;
    container.appendChild(photo);
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
    document.addEventListener('keydown', escErrorMessageHandler);
    document.addEventListener('click', clickErrorMessageHandler);
    document.querySelector('.error__button').addEventListener('click', removeError);
  };

  var removeError = function () {
    var error = document.querySelector('.error');
    if (error) {
      error.remove();
    }
  };

  var clickErrorMessageHandler = function () {
    removeError();
    document.removeEventListener('click', clickErrorMessageHandler);
  };

  var escErrorMessageHandler = function (evt) {
    if (evt.keyCode === 27) {
      removeError();
      document.removeEventListener('keydown', escErrorMessageHandler);
    }
  };

  // filtering

  var loadedPins = [];

  var successHandler = function (data) {
    loadedPins = data;
    renderSlisedPins(loadedPins);
    // showAdvert();
    // renderAdvert(loadedPins[1]);
    // addListenersOnPins();
  };

  var renderSlisedPins = function (data) {
    var slicedPins = data.slice(0, window.utils.numberPins);
    renderPins(slicedPins);
  };
  //
  // add type filter
  var onHouseTypeChange = function (pin) {
    var accomType = houseTypeList.value;
    return window.filtering.filterForTypePins(accomType, pin);
  };

  // price filter
  var onPriceLevelChange = function (pin) {
    var priceLevel = priceLevelList.value;
    return window.filtering.filterForPrice(priceLevel, pin);
  };

  // roomsNumber
  var onRoomsNumberChange = function (pin) {
    var roomsNumber = roomsNumberList.value;
    return window.filtering.filterForRoomsNumber(roomsNumber, pin);
  };
  // guests number filter
  var onGuestsNumberChange = function (pin) {
    var guestsNumber = guestsNumberList.value;
    return window.filtering.filterForGuestsNumber(guestsNumber, pin);
  };


  // var funcNam = 'onFeatureChange' + FEATURES[i];
  var onFeatureCheckboxChange = function (pin, i) {
    var featureCheck;
    if (featureFilterCheckboxes[i].checked === true) {
      var checkedFeatureValue = featureFilterCheckboxes[i].value;
    } else {
      checkedFeatureValue = 'any';
    }
    featureCheck = window.filtering.filterForFeature(checkedFeatureValue, pin);
    return featureCheck;
  };

  // on every filter change we should check all filters
  var filterChangeHandler = function () {
    removePins();
    var filteredPins = loadedPins.filter(function (it) {
      // console.log(onHouseTypeChange(it) && onPriceLevelChange(it) && onRoomsNumberChange(it) && onGuestsNumberChange(it));
      return onHouseTypeChange(it) && onPriceLevelChange(it) && onRoomsNumberChange(it) && onGuestsNumberChange(it) &&
   onFeatureCheckboxChange(it, 0) && onFeatureCheckboxChange(it, 1) && onFeatureCheckboxChange(it, 2)
    && onFeatureCheckboxChange(it, 3) && onFeatureCheckboxChange(it, 4) && onFeatureCheckboxChange(it, 5);
    });
    window.setTimeout(function () {
      renderSlisedPins(filteredPins);
    }, 300);
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
  var priceLevelList = document.querySelector('#housing-price');
  var roomsNumberList = document.querySelector('#housing-rooms');
  var guestsNumberList = document.querySelector('#housing-guests');
  var featureFilters = document.querySelector('#housing-features');
  var featureFilterCheckboxes = featureFilters.querySelectorAll('input');

  houseTypeList.addEventListener('change', filterChangeHandler);
  priceLevelList.addEventListener('change', filterChangeHandler);
  roomsNumberList.addEventListener('change', filterChangeHandler);
  guestsNumberList.addEventListener('change', filterChangeHandler);
  //
  featureFilterCheckboxes[0].addEventListener('change', filterChangeHandler);
  featureFilterCheckboxes[1].addEventListener('change', filterChangeHandler);
  featureFilterCheckboxes[2].addEventListener('change', filterChangeHandler);
  featureFilterCheckboxes[3].addEventListener('change', filterChangeHandler);
  featureFilterCheckboxes[4].addEventListener('change', filterChangeHandler);
  featureFilterCheckboxes[5].addEventListener('change', filterChangeHandler);

  //  drug and drop for main pin
  var mainPinElement = document.querySelector('.map__pin--main');
  var moveCount = 0;


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

  var setMainPinToDefaultPlace = function () {
    mainPinElement.style.top = '375px';
    mainPinElement.style.left = '570px';
  };

  var setPinPosition = function () {
    var addressElem = document.querySelector('#address');
    var position = getPinPosition(mainPinElement, MAIN_PIN_OFFSET_X, MAIN_PIN_OFFSET_Y);
    addressElem.value = position.x + ', ' + position.y;
  };

  setPinStartPosition();

  // set pin after mouse click
  mainPinElement.addEventListener('mouseup', setPinPosition);


  // to open advert when click pin

  var addOnPinClickListener = function (element, data) {
    element.addEventListener('click', function () {
      element = document.querySelector('.map__card');
      removeAdvert(element);
      renderAdvert(data);
    });
  };

  window.pin = {renderPins: renderPins,
    errorHandler: errorHandler,
    loadedPins: loadedPins,
    removePins: removePins,
    removeAdvert: removeAdvert,
    types: TYPES,
    setPinStartPosition: setPinStartPosition,
    setMainPinToDefaultPlace: setMainPinToDefaultPlace,
    renderSlisedPins: renderSlisedPins
  };
})();
