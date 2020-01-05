let selectedInput;
let zipCode;
let city;
let lat;
let long;

function inputSwitcher({target}){

  let queryType = target.value;
  let inputFields = document.querySelectorAll( 'p.query')
  console.log(queryType);
  console.dir(target);
  console.log(target);
  if( target.type === "radio"){
    //hide all input fields
    inputFields.forEach(function(input){
      input.classList.add('hidden');
    });

    //show only the selected input field
    selectedInput = document.querySelector(`p.${queryType}`);
    selectedInput.classList.toggle('hidden');
    console.log(selectedInput);
  }

}

function getData(event){

  event.preventDefault();

  //for zipcode queries
  console.log(selectedInput);
  if (selectedInput.classList.contains("Zip")){
    zipCode = event.target[1].value;

    //current weather info
    axios.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=d1632fd790f9c06fc0aeba56d96b1bf0&units=imperial`)
    .then(response => response.data)
    .then(data => printData(data))
  }
  else if (selectedInput.classList.contains("City")){
    city = event.target[0].value;
    console.log(city);
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},us&APPID=d1632fd790f9c06fc0aeba56d96b1bf0&units=imperial`)
    .then(response => response.data)
    .then(data => printData(data))
  }
  else if (selectedInput.classList.contains("Coordinates")){
    console.log(lat = event.target[2].value);
    console.log(long = event.target[3].value);
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=d1632fd790f9c06fc0aeba56d96b1bf0`)
    .then(response => response.data)
    .then(data => printData(data))
  }
}

function printData(data){
  let city = data.name;
  console.log(city);
  let temperature = data.main.temp;
  console.log(temperature);
  console.log(data.coord)

  let outputFrame = document.querySelector('#main-content');
  outputFrame.innerHTML = `
  <h2>${city}</h2> <br>
  <h3>Current temperature: ${temperature} </h3>
  `

}

let form = document.querySelector('#radio-buttons');
//let form = document.location.query;
form.addEventListener("click", inputSwitcher);
let inputForm = document.querySelector("#input-form")
inputForm.addEventListener('submit', getData);
