

var map = L.map('map').setView([50.055, 19.94], 14);
mapLink =
'<a href="http://openstreetmap.org">OpenStreetMap</a>';
// L.tileLayer(
//     'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
L.tileLayer(
'https://api.mapbox.com/styles/v1/m1lo234/ck8ixxedm27xc1iqdlwv84f10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibTFsbzIzNCIsImEiOiJjazhpeGtqcWEwMGJ1M2ZudDQzNmc1aWRyIn0.moMBmpeBc_1jZ7ankYci8g', {
attribution: '&copy; ' + mapLink + ' Contributors',
maxZoom: 19
}).addTo(map);

var markers = new L.LayerGroup();


function myFunction() {

        var zoom = map.getZoom()

        map.on('zoomend', function () {
            if (map.getZoom() > 17) {
                przelicznik = 1
                markers.removeLayer(markers)
                markers = L.markerClusterGroup({maxClusterRadius: przelicznik});
                for (var i = 0; i < neigh.length; i++) {
                    // if (neigh[i]['v'] == '') {
                        markers.addLayer(L.circleMarker([neigh[i]['lt'], neigh[i]['ln']], {
                            radius: 5,
                            fillColor: "white",
                            color: "black",
                            opacity: 1,
                            weight: 0.5,
                            fillOpacity: 1
                        }).bindPopup(`${i}`));
                    // }
                    // else {
                    //     markers.addLayer(L.circleMarker([neigh[i]['lt'], neigh[i]['ln']], {
                    //         radius: 5,
                    //         fillColor: "red",
                    //         color: "black",
                    //         opacity: 1,
                    //         weight: 0.5,
                    //         fillOpacity: 1
                    //     }).bindPopup(`${i}`));
                    // }

                }
                map.addLayer(markers)
            }
            else {
                przelicznik = 80
                markers.removeLayer(markers)
                markers = L.markerClusterGroup({maxClusterRadius: przelicznik});
                for (var i = 0; i < neigh.length; i++) {
                    // if (neigh[i]['v'] == '') {
                        markers.addLayer(L.circleMarker([neigh[i]['lt'], neigh[i]['ln']], {
                            radius: 5,
                            fillColor: "white",
                            color: "black",
                            opacity: 1,
                            weight: 0.5,
                            fillOpacity: 1
                        }).bindPopup(`${i}`));
                    // }
                    // else {
                    //     markers.addLayer(L.circleMarker([neigh[i]['lt'], neigh[i]['ln']], {
                    //         radius: 5,
                    //         fillColor: "red",
                    //         color: "black",
                    //         opacity: 1,
                    //         weight: 0.5,
                    //         fillOpacity: 1
                    //     }).bindPopup(`${i}`));
                    // }
                }
                map.addLayer(markers)
            }
        });


        var przelicznik = 80

        var markers = L.markerClusterGroup({maxClusterRadius: przelicznik});
        for (var i = 0; i < neigh.length; i++) {
            // if (neigh[i]['v'] == '') {
                markers.addLayer(L.circleMarker([neigh[i]['lt'], neigh[i]['ln']], {
                    radius: 5,
                    fillColor: "white",
                    color: "black",
                    opacity: 1,
                    weight: 0.5,
                    fillOpacity: 1
                }).bindPopup(`${i}`));
            // }
            // else {
            //     markers.addLayer(L.circleMarker([neigh[i]['lt'], neigh[i]['ln']], {
            //         radius: 5,
            //         fillColor: "red",
            //         color: "black",
            //         opacity: 1,
            //         weight: 0.5,
            //         fillOpacity: 1
            //     }).bindPopup(`${i}`));
            // }
        }
        map.addLayer(markers);

}
