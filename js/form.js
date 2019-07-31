'use strict';
(function () {
  var ACCOMODATION_MIN_PRICES = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  /* var ROOMS_NOTFOR_GUESTS = {
    1: ['2', '3', '0'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };*/
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
    // console.log(roomNumbersList.value);
    switch (roomsNumberList.value) {
      case '1':
        validateList(guestsNumberList, '1', ['2', '3', '0']);
        break;
      case '2':
        validateList(guestsNumberList, '2', ['3', '0']);
        break;
      case '3':
        validateList(guestsNumberList, '3', ['0']);
        break;
      case '100':
        validateList(guestsNumberList, '0', ['1', '2', '3']);
        break;
    }
  };

  /* var sinchronizeRoomsForGuests = function () {
    // console.log(roomNumbersList.value);
    switch (guestsNumberList.value) {
      case '1':
        validateList(roomsNumberList, '1', ['100']);
        break;
      case '2':
        validateList(roomsNumberList, '2', ['1', '0']);
        break;
      case '3':
        validateList(roomsNumberList, '3', ['1', '2', '0']);
        break;
      case '0':
        validateList(roomsNumberList, '100', ['1', '2', '3']);
        break;
    }
  };*/

  roomsNumberList.addEventListener('change', sinchronizeGuestForRooms);
  // guestsNumberList.addEventListener('change', sinchronizeRoomsForGuests);

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

  // remove ad-form--disabled;
  var activateAdvertForm = function () {
    var adFormElement = document.querySelector('.ad-form');
    adFormElement.classList.remove('ad-form--disabled');
  };


  // disable filters
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
})();
