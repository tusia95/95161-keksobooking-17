'use strict';

(function () {

  var PRICE_RANGE_VALUES = {low: [0, 9999], middle: [10000, 50000], high: [50000, Number.POSITIVE_INFINITY]};

  // types filter
  var filterForTypePins = function (accomType, pin) {

    if (accomType === 'any') {
      var sameAccomTypePins = true;
    } else {
      if (pin.offer.type === accomType) {
        sameAccomTypePins = true;

      }
    }

    return sameAccomTypePins;
  };
  // price filter
  var filterForPrice = function (priceLevel, pin) {
    if (priceLevel === 'any') {
      var priceInTheRangePins = true;
    } else {
      if (pin.offer.price > PRICE_RANGE_VALUES[priceLevel][0] && pin.offer.price < PRICE_RANGE_VALUES[priceLevel][1]) {
        priceInTheRangePins = true;
      }
    }

    return priceInTheRangePins;
  };
  // room number filter

  var filterForRoomsNumber = function (roomsNumber, pin) {
    if (roomsNumber === 'any') {
      var withRoomNumberPins = true;
    } else {
      if (String(pin.offer.rooms) === roomsNumber) {
        withRoomNumberPins = true;
      }
    }
    return withRoomNumberPins;
  };

  var filterForGuestsNumber = function (guestsNumber, pin) {
    if (guestsNumber === 'any') {
      var withGuestsNumberPins = true;
    } else {
      if (String(pin.offer.guests) === guestsNumber) {
        withGuestsNumberPins = true;
      }
    }
    return withGuestsNumberPins;// renderPins(withGuestsNumberPins);
  };

  var filterForFeature = function (checkedFeatureValue, pin) {
    if (checkedFeatureValue === 'any') {
      var isWithFeaturePins = true;
    } else {
      isWithFeaturePins = checkPinFeaturesContainsValue(checkedFeatureValue, pin);
    }
    return isWithFeaturePins;
  };


  var checkPinFeaturesContainsValue = function (checkedFeatureValue, pin) {
    var doesContainValue = false;
    for (var i = 0; i < (pin.offer.features).length; i++) {
      if (pin.offer.features[i] === checkedFeatureValue) {
        doesContainValue = true;
      }
    }
    return doesContainValue;
  };


  window.filtering = {filterForTypePins: filterForTypePins,
    filterForPrice: filterForPrice,
    filterForRoomsNumber: filterForRoomsNumber,
    filterForGuestsNumber: filterForGuestsNumber,
    filterForFeature: filterForFeature,

  };
})();
