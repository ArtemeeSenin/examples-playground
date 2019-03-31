import { Observable, from, interval } from 'rxjs';
import { pipe, flatMap, distinct, retry } from 'rxjs/operators'
import L from 'leaflet';

const QUAKE_URL = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';

function loadJSONP(settings) {

  const url = settings.url;
  const callbackName = settings.callbackName;

  const script = document.createElement("script")
  script.src = url

  window[callbackName] = data => {
    window[callbackName].data = data;
  }

  return Observable.create(observer => {
    const handler = e => {
      const status = e.type === 'error' ? 400 : 200;
      const response = window[callbackName].data;

      if (status === 200) {
        observer.next({
          status,
          responseType: 'jsonp',
          response,
          originalEvent: e
        })
        observer.complete()
      } else {
        observer.error({
          type: "error",
          status,
          originalEvent: e
        })
      }
    }

  script.onload = script.onreadystatechanged = script.onerror = handler;

  const head = document.getElementsByTagName('head')[0];

  if(head.firstChild.nodeName === 'SCRIPT'){
    head.removeChild(head.firstChild)
  }
  head.insertBefore(script, head.firstChild)
  })
}

const mapContainer = document.createElement('div')
mapContainer.id = 'map';
document.body.appendChild(mapContainer)

const map = L.map('map').setView([33.858631, -118.279602], 7);
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map)


const quakes$ = interval(5000)
  .pipe(
    flatMap(() => {
      return loadJSONP({
        url: QUAKE_URL,
        callbackName: 'eqfeed_callback'
      }).pipe(
        retry(3)
      )
    }),
    flatMap(result => {
      return from(result.response.features);
    }),
    distinct( quake => quake.properties.code )
  )


  quakes$.subscribe(quake => {
    const coords = quake.geometry.coordinates;
    const size = quake.properties.mag * 10000;
    L.circle([coords[1], coords[0]], size).addTo(map)
  })