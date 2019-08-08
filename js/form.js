'use strict';
(function () {
  var ACCOMODATION_MIN_PRICES = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var FORM_DEFAULT_VALUES = {
    type: 'flat',
    rooms: '1',
    capacity: '1',
    time: '12:00',
  };

  var RoomsNumber = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    HUNDRED: '100'
  };

  var accomList = document.querySelector('#type');
  // set to value -> min price
  var setMinPrice = function () {
    var priceElem = document.querySelector('#price');
    var priceValue = ACCOMODATION_MIN_PRICES[accomList.value];
    priceElem.setAttribute('placeholder', priceValue);
    priceElem.setAttribute('min', priceValue);
  };

  setMinPrice();
  accomList.addEventListener('change', setMinPrice);


  // to get timein timeout values


  var timeinList = document.querySelector('#timein');
  var timeoutList = document.querySelector('#timeout');

  // sinchronize timeout timein values
  var sinchronize = function (evt) {
    if (evt.target.closest('#timein')) {
      timeoutList.value = timeinList.value;
    }
    timeinList.value = timeoutList.value;
  };

  //  add sinchronization to fields
  timeinList.addEventListener('change', sinchronize);
  timeoutList.addEventListener('change', sinchronize);

  // sinchronize guest and rooms
  var roomsNumberList = document.querySelector('#room_number');
  var guestsNumberList = document.querySelector('#capacity');

  var sinchronizeGuestForRooms = function () {
    switch (roomsNumberList.value) {
      case RoomsNumber.ONE:
        validateList(guestsNumberList, '1', ['2', '3', '0']);
        break;
      case RoomsNumber.TWO:
        validateList(guestsNumberList, '2', ['3', '0']);
        break;
      case RoomsNumber.THREE:
        validateList(guestsNumberList, '3', ['0']);
        break;
      case RoomsNumber.HUNDRED:
        validateList(guestsNumberList, '0', ['1', '2', '3']);
        break;
    }
  };

  roomsNumberList.addEventListener('change', sinchronizeGuestForRooms);

  var validateList = function (listElement, selectedValue, disabledValues) {
    listElement.value = selectedValue;
    var options = listElement.querySelectorAll('option');
    options.forEach(function (it) {
      it.disabled = false;
    });
    options.forEach(function (it) {
      for (var i = 0; i < disabledValues.length; i++) {
        if (it.value === disabledValues[i]) {
          it.disabled = true;
        }
      }
    });
  };
  // enable/disable form`s parts

  var adFormElement = document.querySelector('.ad-form');
  // remove ad-form--disabled;
  var activateAdvertForm = function () {
    adFormElement.classList.remove('ad-form--disabled');
  };

  // disable Advert form
  var disableAdvertForm = function () {
    adFormElement.classList.add('ad-form--disabled');
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

  window.form = {
    enableFieldsets: enableFieldsets,
    enableFilters: enableFilters,
    activateAdvertForm: activateAdvertForm
  };

  disableFieldsets();
  disableFilters(true);
  sinchronizeGuestForRooms();

  // add listener to form submit btn
  var advertForm = document.querySelector('.ad-form');

  // add listener to form reset btn
  var resetBtn = advertForm.querySelector('.ad-form__reset');

  var uploadHandler = function (evt) {
    window.upload(new FormData(advertForm), function () {
      submitFormHandler();
    }, window.pin.errorHandler);
    evt.preventDefault();
  };

  var submitFormHandler = function () {
    showSuccessUploadMessage();
    resetFormFields();
  };

  var resetFormFields = function () {
    window.utils.isFirstDnD = true;
    disableFieldsets();
    disableFilters(true);
    disableAdvertForm();
    window.map.disableMap();
    advertForm.querySelector('#title').value = '';
    advertForm.querySelector('#type').value = FORM_DEFAULT_VALUES.type;
    advertForm.querySelector('#price').value = '';
    advertForm.querySelector('#price').setAttribute('placeholder', ACCOMODATION_MIN_PRICES[FORM_DEFAULT_VALUES.type]);
    advertForm.querySelector('#room_number').value = FORM_DEFAULT_VALUES.rooms;
    advertForm.querySelector('#capacity').value = FORM_DEFAULT_VALUES.capacity;
    advertForm.querySelector('#description').value = '';
    advertForm.querySelector('#timein').value = FORM_DEFAULT_VALUES.time;
    advertForm.querySelector('#timeout').value = FORM_DEFAULT_VALUES.time;
    window.pin.setMainPinToDefaultPlace();
    window.pin.setPinStartPosition();
    var featureCheckboxes = advertForm.querySelector('.features').querySelectorAll('input');
    featureCheckboxes.forEach(function (it) {
      if (it.checked === true) {
        it.checked = false;
      }
    });
    window.pin.removePins();
    window.pin.removeAdvert();

  };

  var showSuccessUploadMessage = function () {
    var successTemplate = document.querySelector('#success')
.content
.querySelector('.success');
    var messageElement = successTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(messageElement);
    advertForm.appendChild(fragment);
  };

  var removeSuccess = function () {
    var success = document.querySelector('.success');
    if (success) {
      success.remove();
    }
  };

  var clickSuccessMessageHandler = function () {
    removeSuccess();
    document.removeEventListener('click', clickSuccessMessageHandler);
  };

  var escSuccessMessageHandler = function (evt) {
    if (evt.keyCode === 27) {
      removeSuccess();
      document.removeEventListener('keydown', escSuccessMessageHandler);
    }
  };

  document.addEventListener('keydown', escSuccessMessageHandler);
  document.addEventListener('click', clickSuccessMessageHandler);

  advertForm.addEventListener('submit', uploadHandler);
  resetBtn.addEventListener('click', resetFormFields);

})();
