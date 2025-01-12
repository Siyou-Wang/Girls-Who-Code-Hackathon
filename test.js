let map,directionsService,directionsRender
let sourceAutocomplete,destAutocomplete
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.77499, lng: -122.4194},
    zoom: 17,
    });
    directionsService = new google.maps.DirectionsService();
    directionsRender = new google.maps.DirectionsRenderer();
    directionsRender.setMap(map);

    sourceAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById("source")
    );
    destAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById("dest")
    );
}

function calcRoute(){
    var source = document.getElementById("source").value;
    var dest = document.getElementById("dest").value;

    let request = {
        origin:source,
        destination: dest,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL 
    }
    directionsService.route(request, function(result,status){
        if(status=="OK"){
            directionsRender.setDirections(result)
            var totalDistance = 0
            var totalTime = 0
            var bestRoute = result.routes[0]
            for(var i =0; i<bestRoute.legs.length; i++){
                totalDistance += bestRoute.legs[i].distance.value;
                totalTime += bestRoute.legs[i].duration.value;
            }
            document.getElementById("CarTime").
        }
    })
}