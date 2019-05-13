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
var mapWhole = document.querySelector('.map'); 
mapWhole.classList.remove('map--faded'); 
var mapPinContainer = document.querySelector('.map__pins');
var correctionY = 40; // смещение метки по Y чтобы на координату указывал именно острый конец метки
var fragment = document.createDocumentFragment();
var similarOfferTemplate = document.querySelector('template').content;
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
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
  var offrGuests = getRandomNumb(adAllOptions.MIN_GUESTS, adAllOptions.MAX_GUESTS);
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


var renderPin = function(pin) {

    var mapPinElement = mapPinTemplate.cloneNode(true);

    mapPinElement.style.left = pin.location.x + 'px';
    mapPinElement.style.top = pin.location.y - correctionY +'px';
    mapPinElement.querySelector('img').src = pin.author.avatar;

    return mapPinElement;
 
  } 

for (var i = 0; i < completeOffer.length; i++) {

 fragment.appendChild(renderPin(completeOffer[i]));
 
} 

mapPinContainer.appendChild(fragment);

    
var renderList = function(features) {

    var featuresFragment = document.createDocumentFragment();
     
    for (var i = 0; i < features.length; i++) {
    var listItem = document.createElement('li');
    listItem.classList.add('feature', 'feature--' + features[i]);
    featuresFragment.appendChild(listItem);
  }

    return featuresFragment;
}
 
var renderCard = function(elem) {

var mapElement = similarOfferTemplate.cloneNode(true);
var mapCardP = mapElement.querySelectorAll('p');
var mapCardFeatLst = mapElement.querySelectorAll('popup__features');
 
mapElement.querySelector('h3').textContent = elem.offer.title;

mapElement.querySelector('small').textContent = elem.offer.adress;

mapElement.querySelector('.popup__price').textContent = (elem.offer.price + ' \u20BD/ночь');

if (elem.offer.type == 'bungalo') {
    mapElement.querySelector('h4').textContent = 'Бунгало';
  } else if (elem.offer.type == 'flat') {
    mapElement.querySelector('h4').textContent = 'Квартира';
  } else {
    mapElement.querySelector('h4').textContent = 'Дом';
}

mapCardP[2].textContent = elem.offer.rooms + ' комнат для ' + elem.offer.guests + ' гостей';

mapCardP[3].textContent = 'Заезд после ' + elem.offer.checkin + ', ' + 'выезд до ' + elem.offer.checkout;
 
      
var list = mapElement.querySelector('.popup__features');
list.textContent = '';
 
list.appendChild(renderList(elem.offer.features));
 
mapElement.querySelectorAll('p')[4].textContent = elem.offer.description;

mapElement.querySelector('img').src = elem.author.avatar;

return mapElement;

}
  
var cardFragment = document.createDocumentFragment();
cardFragment.appendChild(renderCard(completeOffer[0]));
mapWhole.appendChild(cardFragment); 

