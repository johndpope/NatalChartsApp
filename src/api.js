const BASE_URI = "https://kasra-natal-charts.herokuapp.com/"

export default class Api {
  geolocate(query) {
    var formData = new FormData();
    formData.append("q", query);

    return fetch(BASE_URI + "geocode", {method: 'POST', body: formData})
      .then((res) => res.json());
  }

  chart(name, date, time, location) {
    var formData = new FormData();
    formData.append("name", name);
    
    formData.append("date_year", date.year());
    formData.append("date_month", date.month() + 1);
    formData.append("date_day", date.date());
    
    formData.append("date_hour", time.hour());
    
    formData.append("location_lon", location.geo[0])
    formData.append("location_lat", location.geo[1]);
    formData.append("location_utc_offset", location.utc_offset);

    return fetch(BASE_URI + "chart", {method: 'POST', body: formData})
      .then((res) => res.json());
  }
}