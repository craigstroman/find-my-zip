import _ from 'lodash';

(() => {
  const apiKey = 'AIzaSyAJN1inz_UYBWjVZ1KEjVrsvukmLc4eqJ0';
  if (!navigator.geolocation) {
    console.log('Geolocation is not available.');
  } else {
    const addressTextBlockEl = document.querySelector('.address-block');
    const loadingEl = document.querySelector('.loading');
    const locationContainerEl = document.querySelector('.location-info-container');
    const zipCodeBlockEl = document.querySelector('.zipcode-block');
    const mapEl = document.querySelector('.map');

    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const xhr = new XMLHttpRequest();
      xhr.addEventListener('load', () => {
        /**
         * Finds the address parts.
         * @param  {Array} addressParts A array of objects.
         * @param  {String} adressPart   The part of the address to find.
         * @param  {String} nameType         If the part returned should be in longname form or shortname form.
         * @return {String}             The address part.
         */
        function findAddressComponent(addressParts, adressPart, nameType) {
          const index = _.findIndex(addressParts, (e) => {
            if (e.types[0] === adressPart) {
              return e;
            }
            return 0;
          });

          return (nameType === 'long_name') ? addressParts[index].long_name : addressParts[index].short_name;
        }

        const data = JSON.parse(xhr.responseText);
        const addressComponents = data.results[0].address_components;
        const streetNumber = findAddressComponent(addressComponents, 'street_number', 'short_name');
        const streetName = findAddressComponent(addressComponents, 'route', 'short_name');
        const city = findAddressComponent(addressComponents, 'locality', 'long_name');
        const state = findAddressComponent(addressComponents, 'administrative_area_level_1', 'short_name');
        const zipCode = findAddressComponent(addressComponents, 'postal_code', 'long_name');
        const country = findAddressComponent(addressComponents, 'country', 'short_name');

        const addressTextString = `${streetNumber} ${streetName}, ${city}, ${state} ${zipCode} ${country}`;

        const map = new google.maps.Map(mapEl, {
          center: {
            lat: latitude,
            lng: longitude,
          },
          zoom: 18,
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
      xhr.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`);
      xhr.send();
    });
  }
})();
