const BASE_URI = "https://kasra-natal-charts.herokuapp.com/"

export default class Api {
  geolocate(query, date) {
    var formData = new FormData();
    formData.append("q", query);
    formData.append("time_year", date.year());
    formData.append("time_month", date.month() + 1);
    formData.append("time_day", date.date());

    return fetch(BASE_URI + "geocode", {method: 'POST', body: formData})
      .then((res) => res.json());
  }

  chart(name, date, time_hour, time_min, location) {
    var formData = new FormData();
    formData.append("name", name);
    
    formData.append("date_year", date.year());
    formData.append("date_month", date.month() + 1);
    formData.append("date_day", date.date());
    
    formData.append("date_hour", time_hour);
    formData.append("date_min", time_min)
    
    formData.append("location_lat", location.geo[0])
    formData.append("location_lon", location.geo[1]);
    formData.append("location_utc_offset", location.utc_offset);

    return fetch(BASE_URI + "chart", {method: 'POST', body: formData})
      .then((res) => res.json());
  }
}