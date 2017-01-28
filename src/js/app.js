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
        const data = JSON.parse(xhr.responseText);
        const addressComponents = data.results[0].address_components;
        const streetNumber = addressComponents[0].long_name;
        const streetName = addressComponents[1].short_name;
        const city = addressComponents[2].long_name;
        const state = addressComponents[4].short_name;
        const zipCode = addressComponents[6].long_name;
        const country = addressComponents[5].short_name;

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
