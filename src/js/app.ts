import '../scss/styles.scss';
// process.env.GOOGLE_MAPS_KEY

interface addressDetails {
  latitude: number;
  longitude: number;
}

const addressDetails: addressDetails = {
  latitude: null,
  longitude: null,
};

const getAddress = (addressDetails: addressDetails) => {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    addressDetails.latitude = latitude;
    addressDetails.longitude = longitude;

    console.log('addressDetails: ', addressDetails);
  });
};

getAddress(addressDetails);

const mapEl = document.querySelector('.map');
const map = new google.maps.Map(mapEl as HTMLElement, {
  center: { lat: addressDetails.latitude, lng: addressDetails.longitude },
  zoom: 8,
});
