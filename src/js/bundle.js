/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	(function () {
	  var apiKey = 'AIzaSyAJN1inz_UYBWjVZ1KEjVrsvukmLc4eqJ0';
	
	  if (!navigator.geolocation) {
	    console.log('Geolocation is not available.');
	  } else {
	    (function () {
	      var addressTextBlockEl = document.querySelector('.address-block');
	      var loadingEl = document.querySelector('.loading');
	      var locationContainerEl = document.querySelector('.location-info-container');
	      var zipCodeBlockEl = document.querySelector('.zipcode-block');
	      var mapEl = document.querySelector('.map');
	
	      navigator.geolocation.getCurrentPosition(function (position) {
	        var latitude = position.coords.latitude;
	        var longitude = position.coords.longitude;
	        var xhr = new XMLHttpRequest();
	        xhr.addEventListener('load', function () {
	          var data = JSON.parse(xhr.responseText);
	          var addressComponents = data.results[0].address_components;
	          var streetNumber = addressComponents[0].long_name;
	          var streetName = addressComponents[1].short_name;
	          var city = addressComponents[2].long_name;
	          var state = addressComponents[4].short_name;
	          var zipCode = addressComponents[6].long_name;
	          var country = addressComponents[5].short_name;
	
	          var addressTextString = streetNumber + ' ' + streetName + ', ' + city + ', ' + state + ' ' + zipCode + ' ' + country;
	
	          var map = new google.maps.Map(mapEl, {
	            center: {
	              lat: latitude,
	              lng: longitude
	            },
	            zoom: 18
	          });
	
	          if (!isNaN(zipCode)) {
	            zipCodeBlockEl.innerHTML = '';
	            zipCodeBlockEl.innerHTML = zipCode;
	
	            addressTextBlockEl.innerHTML = '';
	            addressTextBlockEl.innerHTML = addressTextString;
	
	            loadingEl.className += ' hidden';
	            locationContainerEl.className = 'location-info-container';
	          }
	        });
	        xhr.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + apiKey);
	        xhr.send();
	      });
	    })();
	  }
	})();

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map