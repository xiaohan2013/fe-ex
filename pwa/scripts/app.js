if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function() { console.log('Service Worker Registered'); });
}

app.selectedCities = localStorage.selectedCities;
if (app.selectedCities) {
    app.selectedCities = JSON.parse(app.selectedCities);
    app.selectedCities.forEach(function(city) {
        app.getForecast(city.key, city.label);
    });
} else {
    /* The user is using the app for the first time, or the user has not
     * saved any cities, so show the user some fake data.A real app in this
     * scenario could guess the user's location via IP lookup and then inject
     * that data into the page.
     */
    app.updateForecastCard(initialWeatherForecast);
    app.selectedCities = [
        { key: initialWeatherForecast.key, label: initialWeatherForecast.label }
    ];
    app.saveSelectedCities();
}

// Save list of cities to localStorage.
app.saveSelectedCities = function() {
    var selectedCities = JSON.stringify(app.selectedCities);
    localStorage.selectedCities = selectedCities;
};

document.getElementById('butAddCity').addEventListener('click', function() {
    // Add the newly selected city
    var select = document.getElementById('selectCityToAdd');
    var selected = select.options[select.selectedIndex];
    var key = selected.value;
    var label = selected.textContent;
    if (!app.selectedCities) {
        app.selectedCities = [];
    }
    app.getForecast(key, label);
    app.selectedCities.push({ key: key, label: label });
    app.saveSelectedCities();
    app.toggleAddDialog(false);
});