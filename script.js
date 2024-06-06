const userLocation = document.getElementById("userLocation"),
  converter = document.getElementById("converter"),
  weatherIcon = document.querySelector(".weather-icon"),
  temperature = document.querySelector(".temperature"),
  feelsLike = document.querySelector(".feelsLike"),
  description = document.querySelector(".description"),
  date = document.querySelector(".date"),
  city = document.querySelector(".city"),
  HValue = document.getElementById("HValue"),
  WValue = document.getElementById("WValue"),
  SRValue = document.getElementById("SRValue"),
  SSValue = document.getElementById("SSValue"),
  CValue = document.getElementById("CValue"),
  LAValue = document.getElementById("LAValue"),
  LOValue = document.getElementById("LOValue"),
  PValue = document.getElementById("PValue"),
  forecast = document.querySelector(".forecast");

WEATHER_API_ENDPOINT = ``;
WEATHER_DATA_ENDPOINT = "";

function findUserLocation() {
  fetch(WEATHER_API_ENDPOINT + userLocation.value)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod != "" && data.cod != 200) {
        alert(data.message);
        return;
      }
      console.log(data);


      const sunsetTime = data.sys.sunset;
      const sunriseTime = data.sys.sunrise;
      const timezoneOffset = data.timezone;
      const currentDate = data.dt;

      city.innerHTML = data.name + ", " + data.sys.country;
      weatherIcon.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;

      fetch(
        WEATHER_DATA_ENDPOINT + `lon=${data.coord.lon}&lat=${data.coord.lat}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          temperature.innerHTML = TemConverter(data.main.temp);
          feelsLike.innerHTML = "Feels Like " + data.main.feels_like;
          description.innerHTML =
            `<i class="fa-brands fa-cloudversify"></i> &nbsp;` +
            data.weather[0].description;


            const options = {
              weekday:"long",
              month:"long",
              day:"numeric",
              hour:"numeric",
              minute:"numeric",
              hour12:true,
            }
            date.innerHTML = getLongFormatDateTime(
              currentDate,
              timezoneOffset,
              options
            );


          HValue.innerHTML = Math.round(data.main.humidity) + "<span>%</span>";
          WValue.innerHTML = Math.round(data.wind.speed) + "<span>m/s</span>";

          const options1 = {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          };
          SRValue.innerHTML = getLongFormatDateTime(
            sunriseTime,
            timezoneOffset,
            options1
          );
          SSValue.innerHTML = getLongFormatDateTime(
            sunsetTime,
            timezoneOffset,
            options1
          );

          CValue.innerHTML = data.clouds.all + "<span>%</span>";
          LAValue.innerHTML = data.coord.lat;
          LOValue.innerHTML = data.coord.lon;
          PValue.innerHTML = data.main.pressure + "<span>hPa</span>";
        });
    });
}

function formatUnixTime(dtValue, offSet, options = {}) {
  const date = new Date((dtValue + offSet) * 1000);
  return date.toLocaleTimeString([], { timeZone: "UTC", ...options });
}

function getLongFormatDateTime(dtValue, offSet, options) {
  return formatUnixTime(dtValue, offSet, options);
}

function TemConverter(temp) {
  let tempValue = Math.round(temp);
  let message = "";
  if(converter.value=="°C"){
    message=tempValue+"<span>"+"\xB0C</span>";
  }
  else{
    let ctof = (tempValue*9)/5+32;
    message=ctof+"<span>"+"\xB0F</span>";
  }
  return message;
}

