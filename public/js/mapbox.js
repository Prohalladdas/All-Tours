// /* eslint-disable */
// const locations = JSON.parse(document.getElementById('map').dataset.locations);
// console.log(locations);

// maptilersdk.config.apiKey = 'bqnVDayZbQFYz3ASB8vW';
// const map = new maptilersdk.Map({
//   container: 'map',
//   style: 'ch-swisstopo-lbm',
//   scrollZoom: false,
// });

// const bounds = new maptilersdk.LngLatBounds();

// locations.forEach((loc) => {
//   // Create marker
//   const el = document.createElement('div');
//   el.className = 'marker';

//   //   Add marker
//   new maptilersdk.Marker({
//     element: el,
//     anchor: 'bottom',
//   })
//     .setLngLat(loc.coordinates)
//     .addTo(map);

//   // Add popup
//   new maptilersdk.Popup({
//     offset: 30,
//   })
//     .setLngLat(loc.coordinates)
//     .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
//     .addTo(map);
//   // Extends map bounds to include current location
//   bounds.extend(loc.coordinates);
// });

// map.on('load', () => {
//   map.fitBounds(bounds, {
//     padding: { top: 200, bottom: 150, left: 100, right: 100 },
//   });
// });

/* eslint-disable */
// Scroll to top first
window.scrollTo(0, 0);

const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

let mapInitialized = false;

function initMap() {
  if (mapInitialized) return;
  mapInitialized = true;

  maptilersdk.config.apiKey = 'bqnVDayZbQFYz3ASB8vW';
  const map = new maptilersdk.Map({
    container: 'map',
    style: 'ch-swisstopo-lbm',
    scrollZoom: false,
  });

  const bounds = new maptilersdk.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    new maptilersdk.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new maptilersdk.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.on('load', () => {
    map.fitBounds(bounds, {
      padding: { top: 200, bottom: 150, left: 100, right: 100 },
    });
  });
}

// Initialize map when user scrolls near it
const mapElement = document.getElementById('map');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        initMap();
        observer.disconnect();
      }
    });
  },
  { rootMargin: '-200px' },
);

observer.observe(mapElement);
