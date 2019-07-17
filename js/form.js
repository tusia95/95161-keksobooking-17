'use strict';
(function () {
  var ACCOMODATION_MIN_PRICES = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
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


  // enable/disable form`s parts

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

  window.form = {
    enableFieldsets: enableFieldsets,
    enableFilters: enableFilters,
    activateAdvertForm: activateAdvertForm
  };

  disableFieldsets();
  disableFilters(true);
})();
