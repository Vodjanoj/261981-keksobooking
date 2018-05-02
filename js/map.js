'use strict';


var AUTHOR_AVATAR = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 
                      'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

var OFFER_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец',
                    'Красивый гостевой домик' , 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var OFFER_ADDRESS = ['location.x' , 'location.y'];

var OFFER_TYPE = ['flat', 'house', 'bungalo'];

var OFFER_ROOMS = [Math.floor(Math.random() * (5 - 1 + 1)) + 1];

var OFFER_GUESTS = [Math.floor(Math.random() * (15 - 1 + 1)) + 1];

var OFFER_CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];

var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var OFFER_DESCRIPTION = '';

var OFFER_PHOTOS = [];

var offers_around = [];

var offersMinPrice = 1000;

var offersMaxPrice = 1000000;

var offersMinRooms = 1;

var offersMaxRooms = 5;

var offersMinGuests = 1;

var offersMaxGuests = 25;

var offersMaxGuests = 25;

var featuresMinLength = 1;

var locationMinX = 300;

var locationMaxX = 900;

var locationMinY = 100;

var locationMaxY = 500;

var avoidDublicates = function(randomElement, arr) {
  return arr.splice(arr.indexOf(randomElement),1)[0]; 
}

var getRandomNumb = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomFeatures = function(randomArrLength, arr) { 
  return  arr.slice(0, randomArrLength); 
}

 var finalRandomAuthAvatElement;
 var finalRandomOffTitlElement;
 var priceOffRandom;
 var finalOffType;
 var finalRoomsCount;
 var finalGuestsCount;
 var finalOffCheckin;
 var finalOffCheckout;
 var finalOffList;
 var finalOffLocX;
 var finalOffLocY;

for (var i = 0; i <= 7; i++) {
  
  finalRandomAuthAvatElement = avoidDublicates(AUTHOR_AVATAR[Math.floor(Math.random() * AUTHOR_AVATAR.length)], AUTHOR_AVATAR); 
  finalRandomOffTitlElement = avoidDublicates(OFFER_TITLE[Math.floor(Math.random() * OFFER_TITLE.length)], OFFER_TITLE);
  priceOffRandom = getRandomNumb(offersMinPrice, offersMaxPrice);
  finalOffType = OFFER_TYPE[Math.floor(Math.random() * OFFER_TYPE.length)];
  finalRoomsCount = getRandomNumb(offersMinRooms, offersMaxRooms);
  finalGuestsCount = getRandomNumb(offersMinGuests, offersMaxGuests);
  finalOffCheckin = OFFER_CHECKIN_CHECKOUT[Math.floor(Math.random() * OFFER_CHECKIN_CHECKOUT.length)];
  finalOffCheckout = OFFER_CHECKIN_CHECKOUT[Math.floor(Math.random() * OFFER_CHECKIN_CHECKOUT.length)];
  finalOffList = getRandomFeatures(getRandomNumb(featuresMinLength, OFFER_FEATURES.length), OFFER_FEATURES);
  finalOffLocX = getRandomNumb(locationMinX, locationMaxX);
  finalOffLocY = getRandomNumb(locationMinY, locationMaxY);

  offers_around.push({author: {avatar: finalRandomAuthAvatElement}, offer: {title: finalRandomOffTitlElement, adress: finalOffLocX + ',' + finalOffLocY,
                      price: priceOffRandom, type: finalOffType, rooms: finalRoomsCount, guests: finalGuestsCount, checkin: finalOffCheckin, checkout: finalOffCheckout, 
                      features: finalOffList, description: OFFER_DESCRIPTION, photos: OFFER_PHOTOS}, location: {x: finalOffLocX, y: finalOffLocY}});
}  

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');
 
var mapPinElement = document.querySelector('.map__pins');
var correctionY = 40; // смещение метки по Y чтобы на координату указывал именно острый конец метки

var fragment = document.createDocumentFragment();

for (var i = 0; i < offers_around.length; i++) {
 
var button = document.createElement('button');
button.setAttribute('style','left: ' + offers_around[i].location.x + 'px' + '; ' + 'top: ' + (offers_around[i].location.y - correctionY) + 'px');
button.setAttribute('class', 'map__pin');

var img = document.createElement('img'); 
button.appendChild(img);
 
img.setAttribute('src', offers_around[i].author.avatar); 
img.setAttribute('width', '40');
img.setAttribute('height', '40');
img.draggable = false;

fragment.appendChild(button);
} 

mapPinElement.appendChild(fragment);

var similarOfferTemplate = document.querySelector('template').content;

var offerElement = similarOfferTemplate.cloneNode(true);

offerElement.querySelector('h3').textContent = offers_around[0].offer.title;
offerElement.querySelector('small').textContent = offers_around[0].offer.adress;
offerElement.querySelector('.popup__price').textContent = offers_around[0].offer.price + '&#x20bd;/ночь';
offerElement.querySelector('h4').textContent = offers_around[0].offer.type;
offerElement.querySelectorAll('p')[2].textContent = offers_around[0].offer.rooms + ' комнат для ' + offers_around[0].offer.guests + ' гостей';
offerElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + offers_around[0].offer.checkin + ', ' + 'выезд до ' + offers_around[0].offer.checkout;

for (var i = 0; i < offerElement.querySelector('.popup__features').children.length; i++) {
    
  offerElement.querySelector('.popup__features').children[i].textContent = offers_around[0].offer.features[i];
} 

offerElement.querySelectorAll('p')[4].textContent = offers_around[0].offer.description;
offerElement.querySelector('.popup__pictures').children[0].setAttribute('src', offers_around[0].author.avatar);

var mapWhole = document.querySelector('.map');

mapWhole.insertBefore(offerElement, mapWhole.children[1]);

// var beforeTheElement = document.body.children[1].children[0].children[1]; // maps-filter-container

// console.log(document.body.children[1].children[0]); // map (надо делать в маp конечно)

//  document.body.children[1].children[0].insertBefore(offerElement, beforeTheElement);

//document.querySelector('.map__filters-container').insertBefore(offerElement, document.querySelector('.map__filters-container'));
 

 // for (var i = 0; i < offers_around[0].offer.features.length; i++) {
    
  // offerElement.querySelector('.feature.feature--wifi').textContent = offers_around[0].offer.features[i];

//} 

// console.log(offerElement.querySelector('.feature.feature--wifi')); 

// offerElement.querySelector('.popup__features').children[4].classList.contains('feature--elevator'); можно проверять



  // offers_around.push({author: {avatar: avoidDublicates(AUTHOR_AVATAR[Math.floor(Math.random() * AUTHOR_AVATAR.length)], offers_around)}});

  // offerElement.querySelector('.feature.feature--wifi').textContent = 'Привееет'; 
 
 /*
 for (var j = 0; j <= 4; i++) {
  if (temp !== offers_around[j].author) {
    offers_around.push({author: {avatar: temp}}); 

    return arr.splice(arr.indexOf(el),1)[0]; будет хранится в 0 элементе

var avoidDublicates = function(randomAuthAvatElement, arr) {
  var finalData = '';
   
  for (var i = 0 ; i < arr.length; i++) {
       
    if (arr[i] !== randomAuthAvatElement) {
      finalData = randomAuthAvatElement;
    } else {
      arr.splice(i, 1);
      finalData = randomAuthAvatElement;
    }
  }
  return finalData;
}

var getRandomIntCount = function(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

  */
 