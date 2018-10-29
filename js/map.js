'use strict';

var adAllOptions = {
  AVATARS: [
    'img/avatars/user01.png', 
    'img/avatars/user02.png', 
    'img/avatars/user03.png', 
    'img/avatars/user04.png', 
    'img/avatars/user05.png', 
    'img/avatars/user06.png', 
    'img/avatars/user07.png', 
    'img/avatars/user08.png'
  ],
  TITLES: [
    'Большая уютная квартира', 
    'Маленькая неуютная квартира', 
    'Огромный прекрасный дворец', 
    'Маленький ужасный дворец',
    'Красивый гостевой домик' , 
    'Некрасивый негостеприимный домик', 
    'Уютное бунгало далеко от моря', 
    'Неуютное бунгало по колено в воде'
  ],
  ADDRESS: [
    'location.x', 
    'location.y'
  ],
  TYPE: [
    'flat', 
    'house', 
    'bungalo'
  ],
  CHECKIN_CHECKOUT: [
    '12:00',
    '13:00',
    '14:00'
  ],
  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  ROOMS: [Math.floor(Math.random() * (5 - 1 + 1)) + 1],
  GUESTS: [Math.floor(Math.random() * (15 - 1 + 1)) + 1],
  DESCRIPTION: '',
  PHOTOS: [],
  MIN_PRICE: 1000,
  MAX_PRICE: 1000000,
  MIN_ROOMS: 1,
  MAX_ROOMS: 5,
  MIN_GUESTS: 1,
  MAX_GUESTS: 25,
  MIN_QUANT_FEATURES: 1,
  MIN_COORD_X: 300,
  MAX_COORD_X: 900,
  MIN_COORD_Y: 100,
  MAX_COORD_Y: 500,
};

var completeOffer = [];

var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');
var mapWhole = document.querySelector('.map');
var mapPinElement = document.querySelector('.map__pins');
var correctionY = 40; // смещение метки по Y чтобы на координату указывал именно острый конец метки
var fragment = document.createDocumentFragment();
var similarOfferTemplate = document.querySelector('template').content;
var offerElement = similarOfferTemplate.cloneNode(true);

var avoidDublicates = function(randomElement, arr) {
  return arr.splice(arr.indexOf(randomElement),1)[0]; 
}

var getRandomNumb = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getRandomFeatures = function(randomArrLength, arr) { 
  return  arr.slice(0, randomArrLength); 
}
 
var generateOfferList = function(arr) { 
  var offrAvatar = avoidDublicates(adAllOptions.AVATARS[Math.floor(Math.random() * adAllOptions.AVATARS.length)], adAllOptions.AVATARS); 
  var offrTitle = avoidDublicates(adAllOptions.TITLES[Math.floor(Math.random() * adAllOptions.TITLES.length)], adAllOptions.TITLES);
  var offrrPrice = getRandomNumb(adAllOptions.MIN_PRICE, adAllOptions.MAX_PRICE);
  var offrType = adAllOptions.TYPE[Math.floor(Math.random() * adAllOptions.TYPE.length)];
  var offrRooms = getRandomNumb(adAllOptions.MIN_ROOMS, adAllOptions.MAX_ROOMS);
  var offrGuests = getRandomNumb(adAllOptions.MAX_GUESTS, adAllOptions.MAX_GUESTS);
  var offrChkin = adAllOptions.CHECKIN_CHECKOUT[Math.floor(Math.random() * adAllOptions.CHECKIN_CHECKOUT.length)];
  var offrChckout = adAllOptions.CHECKIN_CHECKOUT[Math.floor(Math.random() * adAllOptions.CHECKIN_CHECKOUT.length)];
  var offrFeatList = getRandomFeatures(getRandomNumb(adAllOptions.MIN_QUANT_FEATURES, adAllOptions.FEATURES.length), adAllOptions.FEATURES);
  var offrCoordX = getRandomNumb(adAllOptions.MIN_COORD_X, adAllOptions.MAX_COORD_X);
  var offrCoordY = getRandomNumb(adAllOptions.MIN_COORD_Y, adAllOptions.MAX_COORD_Y);
 
  return  arr = ({author: {
                    avatar: offrAvatar
                    }, 
                    offer: {
                      title: offrTitle, 
                      adress: offrCoordX + ',' + offrCoordY,
                      price: offrrPrice, 
                      type: offrType, 
                      rooms: offrRooms, 
                      guests: offrGuests, 
                      checkin: offrChkin, 
                      checkout: offrChckout, 
                      features: offrFeatList, 
                      description: adAllOptions.DESCRIPTION, 
                      photos: adAllOptions.PHOTOS,
                    }, 
                    location: {
                      x: offrCoordX, 
                      y: offrCoordY
                      }
                  });
} 

for (var i = 0; i <= 7; i++) {
  completeOffer[i] = generateOfferList(completeOffer)   
} 
 
for (var i = 0; i < completeOffer.length; i++) {
 
var button = document.createElement('button');
button.setAttribute('style','left: ' + completeOffer[i].location.x + 'px' + '; ' + 'top: ' + (completeOffer[i].location.y - correctionY) + 'px');
button.setAttribute('class', 'map__pin');

var img = document.createElement('img'); 
button.appendChild(img);
 
img.setAttribute('src', completeOffer[i].author.avatar); 
img.setAttribute('width', '40');
img.setAttribute('height', '40');
img.draggable = false;

fragment.appendChild(button);
} 

mapPinElement.appendChild(fragment);

offerElement.querySelector('h3').textContent = completeOffer[0].offer.title;
offerElement.querySelector('small').textContent = completeOffer[0].offer.adress;
offerElement.querySelector('.popup__price').textContent = (completeOffer[0].offer.price + ' \u20BD/ночь');
 
if (completeOffer[0].offer.type == 'bungalo') {
    offerElement.querySelector('h4').textContent = 'Бунгало';
  } else if (completeOffer[0].offer.type == 'flat') {
    offerElement.querySelector('h4').textContent = 'Квартира';
  } else {
    offerElement.querySelector('h4').textContent = 'Дом';
}

offerElement.querySelectorAll('p')[2].textContent = completeOffer[0].offer.rooms + ' комнат для ' + completeOffer[0].offer.guests + ' гостей';
offerElement.querySelectorAll('p')[3].textContent = 'Заезд после ' + completeOffer[0].offer.checkin + ', ' + 'выезд до ' + completeOffer[0].offer.checkout;

for (var i = 0; i < offerElement.querySelector('.popup__features').children.length; i++) {
    
  offerElement.querySelector('.popup__features').children[i].textContent = completeOffer[0].offer.features[i];
} 

offerElement.querySelectorAll('p')[4].textContent = completeOffer[0].offer.description;
offerElement.querySelector('.popup__avatar').setAttribute('src', completeOffer[0].author.avatar);

mapWhole.insertBefore(offerElement, mapWhole.children[1]);


