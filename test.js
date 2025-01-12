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

let carRequest, bikeRequest, walkRequest

function calcRoute(){
    var source = document.getElementById("source").value;
    var dest = document.getElementById("dest").value;

    carRequest = {
        origin:source,
        destination: dest,
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.IMPERIAL 
    }

    bikeRequest = {
        origin:source,
        destination: dest,
        travelMode: 'BICYCLING',
        unitSystem: google.maps.UnitSystem.IMPERIAL 
    }

    walkRequest = {
        origin:source,
        destination: dest,
        travelMode: 'WALKING',
        unitSystem: google.maps.UnitSystem.IMPERIAL 
    }

    // directionsService.route(carRequest, function(result,status){
    //     if(status=="OK"){
    //         directionsRender.setDirections(result)
    //         var totalDistance = 0
    //         var totalTime = 0
    //         var bestRoute = result.routes[0]
    //         for(var i =0; i<bestRoute.legs.length; i++){
    //             totalDistance += bestRoute.legs[i].distance.value;
    //             totalTime += bestRoute.legs[i].duration.text;
    //         }
    //         document.getElementById("CarTime").innerHTML = totalTime
    //     }
    // })

    //set times
    var totalDistance = 0
    directionsService.route(carRequest, function(result,status){
        if(status=="OK"){
            totalDistance = 0
            var totalTime = 0
            var bestRoute = result.routes[0]
            for(var i =0; i<bestRoute.legs.length; i++){
                totalDistance += bestRoute.legs[i].distance.value;
                totalTime += bestRoute.legs[i].duration.text;
            }
            document.getElementById("CarTime").innerHTML = totalTime

            //round to 0.0
            totalDistance = totalDistance/1609.34 
            var tempTotal = totalDistance*10
            tempTotal = Math.round(tempTotal)
            tempTotal = tempTotal/10
            totalDistance = tempTotal

            localStorage.setItem("addedMiles",totalDistance)

            var gallonSave = Math.round(totalDistance * 25.4)
            var carbonSave = totalDistance * 20

            document.getElementById("gallonsSaved").innerHTML = gallonSave
            document.getElementById("carbonSaved").innerHTML = carbonSave
        }
    })

    directionsService.route(bikeRequest, function(result,status){
        if(status=="OK"){
            var totalTime = 0
            var bestRoute = result.routes[0]
            for(var i =0; i<bestRoute.legs.length; i++){
                totalTime += bestRoute.legs[i].duration.text;
            }
            document.getElementById("BikeTime").innerHTML = totalTime
        }
    })

    directionsService.route(walkRequest, function(result,status){
        if(status=="OK"){
            var totalTime = 0
            var bestRoute = result.routes[0]
            for(var i =0; i<bestRoute.legs.length; i++){
                totalTime += bestRoute.legs[i].duration.text;
            }
            document.getElementById("WalkTime").innerHTML = totalTime
        }
    })

    // console.log(totalDistance)

    // var gallonSave = totalDistance * 25.4
    // var carbonSave = totalDistance * 20

    // document.getElementById("gallonsSaved").innerHTML = gallonSave
    // document.getElementById("carbonSaved").innerHTML = carbonSave

}

function carRoute(){

    directionsService.route(carRequest, function(result,status){
        if(status=="OK"){
            directionsRender.setDirections(result)
        }
    })
}

function bikeRoute(){

    directionsService.route(bikeRequest, function(result,status){
        if(status=="OK"){
            directionsRender.setDirections(result)
        }
    })
}

function walkRoute(){

    directionsService.route(walkRequest, function(result,status){
        if(status=="OK"){
            directionsRender.setDirections(result)
        }
    })
}