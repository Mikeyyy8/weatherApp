const apiUrl = "http://api.weatherapi.com/v1/current.json";
const key = "60cf26dd43f141d8b0332222250402";

const go = document.getElementById("go");
const main = document.getElementById("mainImg");
let weather = document.querySelector(".weather_condition");

fetch("./condition.json")
.then(response => response.json())
.then(data =>{
    data;
})
.catch(Error => console.log("Error" + Error));


async function weatherApp(q) {
    const fullUrl = `${apiUrl}?key=${key}&q=${q}`;
    await fetch(fullUrl)
        .then(response => {
            if (!response.ok) {
                return "Network response was not ok";
            }
            return (response.json());
        })

        .then(data => {
            let condition = data.current.condition.text;
            let array = ["Partly cloudy", "Clear", "Mist", "Snow", "Rain", "Light drizzle", "Light rain"];

            for (let i = 0; i < array.length; i++) {
                if (condition.toLowerCase() == array[i].toLowerCase() || condition.toLowerCase() in array[i].toLowerCase) {
                    main.src = `./images/${array[i]}.png`
                }
            }

            weather.innerHTML = condition;
            document.getElementById("temperature").innerHTML = data.current.temp_c + "&degc";
            document.getElementById("name").innerHTML = data.location.name;
            document.getElementById("hmdty").innerHTML = data.current.humidity;
            document.getElementById("wspeed").innerHTML = data.current.wind_kph + 'kph';
        })
        .catch(Error => console.error("Error:" + Error));
};


// fetch user location
fetch('https://ipapi.co/json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        let userLocation = data.region;
        // console.log(userLocation)
        weatherApp(userLocation);
    }).catch(Error => console.error(`Error ${Error}`));


go.addEventListener("click", () => {
    weatherApp(document.getElementById("search").value);
});
