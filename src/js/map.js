import { getAddress } from './address';

export const loadMap = () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    getAddress(latitude, longitude);

    const mapEl = document.querySelector('.map');
    const map = new google.maps.Map(mapEl, {
      center: { lat: latitude, lng: longitude },
      zoom: 18,
    });
  });
};
