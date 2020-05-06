var stop = 0
var przelicznik = 1
var markers2 = new L.LayerGroup();
var markers3 = new L.LayerGroup();
var markers4 = new L.LayerGroup();

function ruch() {
    moveCars(60, 100, markers2);
    moveCars(50, 150, markers3);
    moveCars(40, 200, markers4);
}

function stopRuch() {
    stop = 1
}

function moveCars(speed, delay, layer) {
    setTimeout(function() {
        usun(layer)
        move(speed)
        if (stop == 0) {
            moveCars(speed, delay, layer);
        }
    }, delay);
}


function usun(layer) {
    layer.clearLayers()
}

function move(speed) {
    for (var i = 0; i < veh.length; i++) {
        if (veh[i]['s'] == speed) {
            // if (neigh[neigh[veh[i]['po']]['nf']]['v'] == '') {
            //     nextVeh[i]['po'] = neigh[veh[i]['po']]['nf']
            //     decideWhichLayer(speed, i)
            // }
            if (neigh[neigh[veh[i]['po']]['nf']]['v'] != '' && neigh[neigh[veh[i]['po']]['nl']]['v'] == '') {
                nextVeh[i]['po'] = neigh[veh[i]['po']]['nl']
                decideWhichLayer(speed, i)
            }
            if ((isThereACar(neigh[veh[i]['po']]['nf'], i)) == false) {
                nextVeh[i]['po'] = neigh[veh[i]['po']]['nf']
                decideWhichLayer(speed, i)
            }
            // if ((isThereACar(neigh[veh[i]['po']]['nf'], i)) == true && (isThereACar(neigh[veh[i]['po']]['nl'], i)) == false) {
            //     nextVeh[i]['po'] = neigh[veh[i]['po']]['nl']
            //     decideWhichLayer(speed, i)
            // }
            if ((isThereACar(neigh[nextVeh[i]['po']]['nf'], i)) == true && (isThereACar(neigh[nextVeh[i]['po']]['nr'], i)) == false && neigh[neigh[nextVeh[i]['po']]['nr']]['e'] != 'O') {
                nextVeh[i]['po'] = neigh[veh[i]['po']]['nr']
                decideWhichLayer(speed, i)
            }
            if ((isThereACar(neigh[nextVeh[i]['po']]['nf'], i)) == true && (isThereACar(neigh[nextVeh[i]['po']]['nl'], i)) == false) {
                nextVeh[i]['po'] = neigh[veh[i]['po']]['nl']
                decideWhichLayer(speed, i)
            }
        }
    }

}

function addToLayer(layer600, i) {
    layer600.addLayer(L.circleMarker([neigh[nextVeh[i]['po']]['lt'], neigh[nextVeh[i]['po']]['ln']], {
        radius: 5,
        fillColor: "blue",
        color: "blue",
        weight: 0.5,
        opacity: 1,
        fillOpacity: 1
    }));
    map.addLayer(layer600)
    // console.log(nextVeh[0]['po'] + " " + neigh[nextVeh[0]['po']]['nf'])
}

function decideWhichLayer(speed, i) {
    switch (speed) {
        case 60:
            addToLayer(markers2, i)
            break;
        case 50:
            addToLayer(markers3, i)
            break;
        case 40:
            addToLayer(markers4, i)
            break;
    }
}

function isThereACar(carPosition, currentCarID) {
    for (var j = 0; j < veh.length; j++) {
        if (nextVeh[j]['po'] == carPosition && j != currentCarID) {
            return true
        }
    }
    return false
}
