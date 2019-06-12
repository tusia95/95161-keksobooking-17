'use strict';
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_PIN_OFFSET = 20;
var GetAdvertisments () {
  var avatars = ['img/avatars/user01.png','img/avatars/user02.png','img/avatars/user03.png','img/avatars/user04.png','img/avatars/user05.png','img/avatars/user06.png','img/avatars/user07.png','img/avatars/user08.png'];
  var types = ['palace','flat','house','bungalo'];
  var location :{
    x = GetRundomX();
    y = GetRundomY();

}
var advertisment = {
  "author": {
    "avatar": 'img/avatars/user01.png'
  },
  "offer": {
    "type": 'palace'// palace, flat, house или bungalo
  },

  "location": {
    "x": // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    "y": // случайное число, координата y метки на карте от 130 до 630.
  }
}



var GetRundomY = function () {
   return (Math.floor(Math.random() * (MAX_Y - MIN_Y + 1)) + MIN_Y);
}

var GetRundomX = function () {
  mapWidth = document.querySelector('.map__pins').offsetWidth;
  return (Math.floor(Math.random() * (mapWidth- MIN_PIN_OFFSET + 1)) + MIN_PIN_OFFSET);
}
