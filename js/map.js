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

var featuresMinLength = 1;

var locationMinX = 300;

var locationMaxX = 900;

var locationMinY = 100;

var locationMaxY = 500;

var offersMinGuests = 1;

var offersMaxGuests = 35;


var PROPERTY_OPTIONS = {AVAT: AUTHOR_AVATAR, OFFTITLE: OFFER_TITLE, OFFADDRESS: OFFER_ADDRESS, OFFTYPE: OFFER_TYPE, OFFROOMS: OFFER_ROOMS,
                        OFFGUESTS: OFFER_GUESTS, OFFCHINCHOUT: OFFER_CHECKIN_CHECKOUT, OFFFEAT: OFFER_FEATURES, OFFDESCR: OFFER_DESCRIPTION,
                        OFFPHOTOS: OFFER_PHOTOS, OFFAROUND: offers_around, OFFMNPR: offersMinPrice, OFFMXPR: offersMaxPrice, OFFMNRMS: offersMinRooms,
                        OFFMXRMS: offersMaxRooms, OFFMINGS: offersMinGuests, OFFMXGS: offersMaxGuests, OFFFEATMNLNGS: featuresMinLength,
                        OFFLOCMNX: locationMinX, OFFLOCMXX: locationMaxX, OFFLOCMNY: locationMinY, OFFLOCMXY: locationMaxY};

var avoidDublicates = function(randomElement, arr) {
  return arr.splice(arr.indexOf(randomElement),1)[0]; 
}

var getRandomNumb = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomFeatures = function(randomArrLength, arr) { 
  return  arr.slice(0, randomArrLength); 
}

var finalRandomAuthAvatElement = '';
var finalRandomOffTitlElement = '';
var priceOffRandom = 0;
var finalOffType = '';
var finalRoomsCount = '';
var finalGuestsCount = 0;
var finalOffCheckin = '';
var finalOffCheckout = '';
var finalOffList = '';
var finalOffLocX = 0;
var finalOffLocY = 0;

for (var i = 0; i <= 7; i++) {
  
  finalRandomAuthAvatElement = avoidDublicates(PROPERTY_OPTIONS.AVAT[Math.floor(Math.random() * PROPERTY_OPTIONS.AVAT.length)], PROPERTY_OPTIONS.AVAT); 
  finalRandomOffTitlElement = avoidDublicates(PROPERTY_OPTIONS.OFFTITLE[Math.floor(Math.random() * PROPERTY_OPTIONS.OFFTITLE.length)], PROPERTY_OPTIONS.OFFTITLE);
  priceOffRandom = getRandomNumb(PROPERTY_OPTIONS.OFFMNPR, PROPERTY_OPTIONS.OFFMXPR);
  finalOffType = PROPERTY_OPTIONS.OFFTYPE[Math.floor(Math.random() * PROPERTY_OPTIONS.OFFTYPE.length)];
  finalRoomsCount = getRandomNumb(PROPERTY_OPTIONS.OFFMNRMS, PROPERTY_OPTIONS.OFFMXRMS);
  finalGuestsCount = getRandomNumb(PROPERTY_OPTIONS.OFFMINGS, PROPERTY_OPTIONS.OFFMXGS);
  finalOffCheckin = PROPERTY_OPTIONS.OFFCHINCHOUT[Math.floor(Math.random() * PROPERTY_OPTIONS.OFFCHINCHOUT.length)];  
  finalOffCheckout = PROPERTY_OPTIONS.OFFCHINCHOUT[Math.floor(Math.random() * PROPERTY_OPTIONS.OFFCHINCHOUT.length)];
  finalOffList = getRandomFeatures(getRandomNumb(PROPERTY_OPTIONS.OFFFEATMNLNGS, PROPERTY_OPTIONS.OFFFEAT.length), PROPERTY_OPTIONS.OFFFEAT);
  finalOffLocX = getRandomNumb(PROPERTY_OPTIONS.OFFLOCMNX, PROPERTY_OPTIONS.OFFLOCMXX);
  finalOffLocY = getRandomNumb(PROPERTY_OPTIONS.OFFLOCMNY, PROPERTY_OPTIONS.OFFLOCMXY);
  
  PROPERTY_OPTIONS.OFFAROUND.push({author: {avatar: finalRandomAuthAvatElement}, offer: {title: finalRandomOffTitlElement, adress: finalOffLocX + ',' + finalOffLocY,
                      price: priceOffRandom, type: finalOffType, rooms: finalRoomsCount, guests: finalGuestsCount, checkin: finalOffCheckin, checkout: finalOffCheckout, 
                      features: finalOffList, description: PROPERTY_OPTIONS.OFFDESCR, photos: PROPERTY_OPTIONS.OFFPHOTOS}, location: {x: finalOffLocX, y: finalOffLocY}});
} 

console.log(PROPERTY_OPTIONS.OFFAROUND);

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');
 
var mapPinElement = document.querySelector('.map__pins');
var correctionY = 40; // смещение метки по Y чтобы на координату указывал именно острый конец метки

var fragment = document.createDocumentFragment();

for (var i = 0; i < PROPERTY_OPTIONS.OFFAROUND.length; i++) {
 
var button = document.createElement('button');
button.setAttribute('style','left: ' + PROPERTY_OPTIONS.OFFAROUND[i].location.x + 'px' + '; ' + 'top: ' + (PROPERTY_OPTIONS.OFFAROUND[i].location.y - correctionY) + 'px');
button.setAttribute('class', 'map__pin');

var img = document.createElement('img'); 
button.appendChild(img);
 
img.setAttribute('src', PROPERTY_OPTIONS.OFFAROUND[i].author.avatar); 
img.setAttribute('width', '40');
img.setAttribute('height', '40');
img.draggable = false;

fragment.appendChild(button);
} 

mapPinElement.appendChild(fragment);

var similarOfferTemplate = document.querySelector('template').content;

var offerElement = similarOfferTemplate.cloneNode(true);

offerElement.querySelector('h3').textContent = PROPERTY_OPTIONS.OFFAROUND[0].offer.title;
offerElement.querySelector('small').textContent = PROPERTY_OPTIONS.OFFAROUND[0].offer.adress;
offerElement.querySelector('.popup__price').textContent = (PROPERTY_OPTIONS.OFFAROUND[0].offer.price + ' \u20BD/ночь');
 


if (PROPERTY_OPTIONS.OFFAROUND[0].offer.type == 'bungalo') {
    offerElement.querySelector('h4').textContent = 'Бунгало';
  } else if (PROPERTY_OPTIONS.OFFAROUND[0].offer.type == 'flat') {
    offerElement.querySelector('h4').textContent = 'Квартира';
  } else {
    offerElement.querySelector('h4').textContent = 'Дом';
}




offerElement.querySelectorAll('p')[2].textContent = PROPERTY_OPTIONS.OFFAROUND[0].offer.rooms + ' комнат для ' + PROPERTY_OPTIONS.OFFAROUND[0].offer.guests + ' гостей';
offerElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + PROPERTY_OPTIONS.OFFAROUND[0].offer.checkin + ', ' + 'выезд до ' + PROPERTY_OPTIONS.OFFAROUND[0].offer.checkout;

for (var i = 0; i < offerElement.querySelector('.popup__features').children.length; i++) {
    
  offerElement.querySelector('.popup__features').children[i].textContent = PROPERTY_OPTIONS.OFFAROUND[0].offer.features[i];
} 

offerElement.querySelectorAll('p')[4].textContent = PROPERTY_OPTIONS.OFFAROUND[0].offer.description;
offerElement.querySelector('.popup__avatar').setAttribute('src', PROPERTY_OPTIONS.OFFAROUND[0].author.avatar);

var mapWhole = document.querySelector('.map');

mapWhole.insertBefore(offerElement, mapWhole.children[1]);



// var beforeTheElement = document.body.children[1].children[0].children[1]; // maps-filter-container

// console.log(document.body.children[1].children[0]); // map (надо делать в маp конечно)

//  document.body.children[1].children[0].insertBefore(offerElement, beforeTheElement);

//document.querySelector('.map__filters-container').insertBefore(offerElement, document.querySelector('.map__filters-container'));
 

 // for (var i = 0; i < PROPERTY_OPTIONS.OFFAROUND[0].offer.features.length; i++) {
    
  // offerElement.querySelector('.feature.feature--wifi').textContent = PROPERTY_OPTIONS.OFFAROUND[0].offer.features[i];

//} 

// console.log(offerElement.querySelector('.feature.feature--wifi')); 

// offerElement.querySelector('.popup__features').children[4].classList.contains('feature--elevator'); можно проверять



  // PROPERTY_OPTIONS.OFFAROUND.push({author: {avatar: avoidDublicates(AUTHOR_AVATAR[Math.floor(Math.random() * AUTHOR_AVATAR.length)], PROPERTY_OPTIONS.OFFAROUND)}});

  // offerElement.querySelector('.feature.feature--wifi').textContent = 'Привееет'; 
 
 /*
 for (var j = 0; j <= 4; i++) {
  if (temp !== PROPERTY_OPTIONS.OFFAROUND[j].author) {
    PROPERTY_OPTIONS.OFFAROUND.push({author: {avatar: temp}}); 

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
 