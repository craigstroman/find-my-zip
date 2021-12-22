export const getAddress = (latitude, longitude) => {
  const latLng = new google.maps.LatLng(latitude, longitude);
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ latLng: latLng }, (results, status) => {
    if (status === 'OK') {
      if (Array.isArray(results)) {
        if (results.length) {
          const loadingEl = document.querySelector('.loading');
          const infoLocationContainer = document.querySelector('.location-info-container');
          const zipCodeEl = document.querySelector('.zipcode-block');
          const addressEl = document.querySelector('.address-block');

          const formattedAddress = results[0].formatted_address;
          const addressComponents = results[0].address_components;
          const zipCode = addressComponents.find((el) => {
            if (el.types[0] === 'postal_code') {
              return el;
            }
          });

          addressEl.innerHTML = formattedAddress;
          zipCodeEl.innerHTML = zipCode.long_name;
          infoLocationContainer.style.display = 'inline-block';
          loadingEl.style.display = 'none';
        }
      }
    }
  });
};
