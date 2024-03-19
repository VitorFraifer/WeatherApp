const apiKey = "d02c6a64ea052d4b1da8edcf4f77e521";

const cityInput = document.querySelector(".searchField");
const searchBtn = document.querySelector(".searchButton");

const cityElement = document.querySelector(".cityName");
const tempElement = document.querySelector(".temperature");
const humidityElement = document.getElementById("humidityElement");
const windElement = document.getElementById("windElement");
const iconeClima = document.querySelector(".nuvemImg");


//Pegar dados da cidade pela API
const getWeatherData = async(cityName) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiUrl);
  const data = await res.json();

  return data;
};

//Exibir dados da API no HTML
const showWeatherData = async (cityName) => {
  const data = await getWeatherData(cityName);
  cityElement.innerText = data.name;
  if(cityElement.innerText === "undefined"){
    alert("Nome Inválido. Garanta que o nome seja escrito corretamente e que não acabe com espaços.");
  }
  tempElement.innerText = `${parseInt(data.main.temp)}°C`;
  humidityElement.innerHTML = `${data.main.humidity}%<br>Humidity`;
  windElement.innerHTML = `${data.wind.speed} km/h<br>Wind Speed`;
  if(data.weather[0].main === "Clouds"){
    iconeClima.src = "img/clima/cloud.png";
  }
  else if(data.weather[0].main === "Clear"){
    iconeClima.src = "img/clima/clear.png";
  }
  else if(data.weather[0].main === "Rain"){
    iconeClima.src = "img/clima/rain.png";
  }
  else if(data.weather[0].main === "Snow"){
    iconeClima.src = "img/clima/snow.png";
  }
  console.log(data);
}

//Buscar nome digitado no campo de pesquisa
function busca(){
  const cityName = cityInput.value;
  console.log(cityName);
  showWeatherData(cityName);
}

searchBtn.addEventListener("click", busca);