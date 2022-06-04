let addresss = document.querySelector(".address");
let locations = document.querySelector(".locations");
let timezone = document.querySelector(".timezone");
let code = document.querySelector(".code");

var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© OpenStreetMap'
}).addTo(map);
var marker = L.marker([51.5, -0.09]).addTo(map);

 markerUpdate = (updater = [42, 42]) => {
    map.setView(updater, 13)
    L.marker(updater).addTo(map)

    
}

function getIpDetails() {

    const apiKey = "2d28ca5a-3c44-4afc-ab42-2b302623455d";

    fetch(`https://api.ipfind.com/me?auth=${apiKey}`)
    .then(response=>response.json())
    .then(data=>{
        markerUpdate([data.latitude, data.longitude])
        addresss.innerHTML = data.ip_address
        locations.innerHTML = data.city + "," + data.country + data.postalCode
        timezone.innerHTML = data.timezone
        code.innerHTML = data.continent_code
        
        
    })
}
getIpDetails()

document.addEventListener('load', markerUpdate())

let form = document.querySelector("#form");
let input = document.getElementById("input");

form.addEventListener('submit', function(e) {
    e.preventDefault()
    if (input != "" && input != null) {
        eventsHandlers(input.value)
    }
})

function eventsHandlers(value) {
    

    const apiKey = "2d28ca5a-3c44-4afc-ab42-2b302623455d";
    fetch(`https://api.ipfind.com?ip=${value}&auth=${apiKey}`)
    .then(response=>response.json())
    .then(data=>{
        markerUpdate([data.latitude, data.longitude])
        addresss.innerHTML = data.ip_address
        locations.innerHTML = data.city + "," + data.country + data.postalCode
        timezone.innerHTML = data.timezone
        code.innerHTML = data.continent_code
        markerUpdate([data.latitude, data.longitude])
        
    })
   
}