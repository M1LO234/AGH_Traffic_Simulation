var stop = 0
var stop0 = 0
var przelicznik = 1
var avgSpeed = 0
var howManyAVGs = 0
var totalAVGSpeed = 0
var n = 0
var lightsTime = 40
var inFlow = 0
var outFlow = 0
var inputPerMinute = 20
var animation = true
var globalInput = 0
var globalSpawnCars = 0

var markers2 = new L.LayerGroup();
var markers3 = new L.LayerGroup();
var markers4 = new L.LayerGroup();
var markers5 = new L.LayerGroup();
var markers6 = new L.LayerGroup();
var markers7 = new L.LayerGroup();
var markers8 = new L.LayerGroup();
var lightsLayer = new L.LayerGroup();
// jeżeli true to zielone

function drawLights() {
    for (var i = 0; i < ligh.length; i++) {
        if (ligh[i]['st'] == true) {
            lightsLayer.addLayer(L.circleMarker([ligh[i]['lt'], ligh[i]['ln']], {
                radius: 5,
                fillColor: "green",
                color: "green",
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1
            }));
        } else {
            lightsLayer.addLayer(L.circleMarker([ligh[i]['lt'], ligh[i]['ln']], {
                radius: 5,
                fillColor: "red",
                color: "red",
                weight: 0.5,
                opacity: 1,
                fillOpacity: 1
            }));
        }
    }

    if (animation) {
        map.addLayer(lightsLayer)
    }

}

function ruch() {
    // inputCars();
    document.getElementById("header").innerHTML = ""
    // setInputCars();
    inputCarsDirectPlace();
    spawnCars(n);
    minuteFlow();
    moveCars(60, 100, markers2);
    moveCars(50, 150, markers3);
    moveCars(40, 200, markers4);
    moveCars(30, 250, markers5);
    moveCars(20, 300, markers6);
    moveCars(10, 350, markers7);
    moveCars(0, 350, markers8);
    setMaxSpeed();

    // setInputTime();



    setLightsTime();
	var mainLightsTimeout = new myTimeout(function() {
		changeLights();
		secondaryLightsTimeout.resetTimer();
		secondaryLightsTimeout.start();
	}, lightsTime*1000);

	var secondaryLightsTimeout = new myTimeout(function() {
		changeLights();
		mainLightsTimeout.resetTimer()
		mainLightsTimeout.start();
	}, lightsTime*300);

	mainLightsTimeout.start();

    drawLights()
    chartAVGSpeed()
    outFlowChart()

}

function stopRuch() {
    stop = 1
    mainLightsTimeout.pause();
	secondaryLightsTimeout.pause();
}

function moveCars(speed, delay, layer) {
    setTimeout(function() {
        // if (layer != markers8){
        usun(layer)
        // }
        move(speed)
        if (stop == 0) {
            moveCars(speed, delay, layer);
        }
    }, delay);
}


function usun(layer) {
    layer.clearLayers()
}
 // && isCarDriving(i)
function move(speed) {
    for (var i = 0; i < veh.length; i++) {
        changeCarStateTo0(nextVeh[i]['po'], i)
        if (veh[i]['s'] == speed) {

            for (var j = 0; j < flow.length; j++) {
                if (flow[j]['p1'] == nextVeh[i]['po'] || flow[j]['p2'] == nextVeh[i]['po']) {
                    countFlow(j)
                }
            }




            if (nextVeh[i]['d'] == 1) {
                // howManyAVGs++
                // calcAvgSpeed()
 // && (areThereLights(nextVeh[i]['po'], i))[0] != 1
                if ((isThereACar(neigh[veh[i]['po']]['nf'])) == false && ((checkLightState((areThereLights(nextVeh[i]['po'], i))[1])) == true || (checkLightState((areThereLights(nextVeh[i]['po'], i))[1])) == undefined || (areThereLights(nextVeh[i]['po'], i)[0]) != 1)) {
                    neigh[nextVeh[i]['po']]['v'] = ''
                    nextVeh[i]['po'] = neigh[veh[i]['po']]['nf']
                    neigh[nextVeh[i]['po']]['v'] = i
                    decideWhichLayer(speed, i)
                    nextVeh[i]['cl']++
                    nextVeh[i]['l']++
                    accelerate1(i, nextVeh[i]['s'])

                }

                if (isCarOutsideO(i)) {
                    if (isThereACar8(nextVeh[i]['po'], i) <= 8 && isThereACar8(nextVeh[i]['po'], i) >= 6){
                        // nextVeh[i]['s'] = 50

                        if (nextVeh[i]['s'] > 0) {
                            nextVeh[i]['s'] = nextVeh[i]['s'] - 10
                        }

                        if (nextVeh[i]['cl'] > 30) {
                            if (!changeLaneToLeft(i)){
                                changeLaneToRight(i)
                                nextVeh[i]['cl'] = 0
                            } else {
                                nextVeh[i]['cl'] = 0
                            }
                        }
                    }
                    if (isThereACar8(nextVeh[i]['po'], i) < 6 && isThereACar8(nextVeh[i]['po'], i) >= 5){
                        // nextVeh[i]['s'] = 40

                        if (nextVeh[i]['s'] > 0) {
                            nextVeh[i]['s'] = nextVeh[i]['s'] - 10
                        }

                        if (nextVeh[i]['cl'] > 30) {
                            if (!changeLaneToLeft(i)){
                                changeLaneToRight(i)
                                nextVeh[i]['cl'] = 0
                            } else {
                                nextVeh[i]['cl'] = 0
                            }
                        }
                    }
                    if (isThereACar8(nextVeh[i]['po'], i) < 5 && isThereACar8(nextVeh[i]['po'], i) >= 4){
                        // nextVeh[i]['s'] = 20

                        if (nextVeh[i]['s'] > 0) {
                            nextVeh[i]['s'] = nextVeh[i]['s'] - 10
                        }
                        if (nextVeh[i]['cl'] > 30) {
                            if (!changeLaneToLeft(i)){
                                changeLaneToRight(i)
                                nextVeh[i]['cl'] = 0
                            } else {
                                nextVeh[i]['cl'] = 0
                            }
                        }
                    }
                    if (isThereACar8(nextVeh[i]['po'], i) < 4){

                        if (nextVeh[i]['s'] > 0) {
                            nextVeh[i]['s'] = nextVeh[i]['s'] - 10
                        }

                        if (nextVeh[i]['cl'] > 30) {
                            if (!changeLaneToLeft(i)){
                                changeLaneToRight(i)
                                nextVeh[i]['cl'] = 0
                            } else {
                                nextVeh[i]['cl'] = 0
                            }
                        }
                        // nextVeh[i]['s'] = 10


                    }
                    if (isThereACar8(nextVeh[i]['po'], i) <= 2){''
                        nextVeh[i]['s'] = 0
                        // console.log(nextVeh[i]['s'])
                        decideWhichLayer(speed, i)
                    }
                    if ((areThereLights(nextVeh[i]['po'], i))[0] <= 8 && (areThereLights(nextVeh[i]['po'], i))[0] >= 6 && nextVeh[i]['s'] > 50 && (checkLightState((areThereLights(nextVeh[i]['po'], i))[1])) == false) {
                        // nextVeh[i]['s'] = 50

                        if (nextVeh[i]['s'] > 0) {
                            nextVeh[i]['s'] = nextVeh[i]['s'] - 10
                        }
                    }
                    if ((areThereLights(nextVeh[i]['po'], i))[0] < 6 && (areThereLights(nextVeh[i]['po'], i))[0] >= 5 && nextVeh[i]['s'] > 40 && (checkLightState((areThereLights(nextVeh[i]['po'], i))[1])) == false) {
                        // nextVeh[i]['s'] = 40

                        if (nextVeh[i]['s'] > 0) {
                            nextVeh[i]['s'] = nextVeh[i]['s'] - 10
                        }
                    }
                    if ((areThereLights(nextVeh[i]['po'], i))[0] < 5 && (areThereLights(nextVeh[i]['po'], i))[0] >= 4 && nextVeh[i]['s'] > 20 && (checkLightState((areThereLights(nextVeh[i]['po'], i))[1])) == false) {
                        // nextVeh[i]['s'] = 20

                        if (nextVeh[i]['s'] > 0) {
                            nextVeh[i]['s'] = nextVeh[i]['s'] - 10
                        }
                    }
                    if ((areThereLights(nextVeh[i]['po'], i))[0] < 4 && (areThereLights(nextVeh[i]['po'], i))[0] >= 2 && nextVeh[i]['s'] > 10 && (checkLightState((areThereLights(nextVeh[i]['po'], i))[1])) == false) {
                        // nextVeh[i]['s'] = 10

                        if (nextVeh[i]['s'] > 0) {
                            nextVeh[i]['s'] = nextVeh[i]['s'] - 10
                        }
                    }
                    if ((areThereLights(nextVeh[i]['po'], i))[0] == 1 && (checkLightState((areThereLights(nextVeh[i]['po'], i))[1])) == false) {
                        nextVeh[i]['s'] = 0

                        // if (nextVeh[i]['s'] > 0) {
                        //     nextVeh[i]['s'] = nextVeh[i]['s'] - 10
                        // }
                        decideWhichLayer(speed, i)
                    }

                    if (canOut(i)) {
                        neigh[nextVeh[i]['po']]['v'] = ''
                        nextVeh[i]['po'] = neigh[veh[i]['po']]['nr']
                        decideWhichLayer(speed, i)
                    }

                }

                if (isCarOnI(i) || isCarOnE(i)) {
                    if ((isThereACar(neigh[nextVeh[i]['po']]['nf'])) == false && (isThereACar(neigh[nextVeh[i]['po']]['nr'])) == false && neigh[nextVeh[i]['po']]['nr'] != '') {
                        neigh[nextVeh[i]['po']]['v'] = ''
                        nextVeh[i]['po'] = neigh[veh[i]['po']]['nr']
                        neigh[nextVeh[i]['po']]['v'] = i
                        decideWhichLayer(speed, i)
                    }
                    else if ((isThereACar(neigh[nextVeh[i]['po']]['nf'])) == false && (isThereACar(neigh[nextVeh[i]['po']]['nl'])) == false && neigh[nextVeh[i]['po']]['nl'] != '') {
                        neigh[nextVeh[i]['po']]['v'] = ''
                        nextVeh[i]['po'] = neigh[veh[i]['po']]['nl']
                        neigh[nextVeh[i]['po']]['v'] = i
                        decideWhichLayer(speed, i)
                    }
                    else if ((isThereACar(neigh[nextVeh[i]['po']]['nf'])) == false && (isThereACar(neigh[nextVeh[i]['po']]['nl'])) == true && neigh[nextVeh[i]['po']]['nl'] != '') {
                        if (nextVeh[i]['s'] > 0) {
                            nextVeh[i]['s'] = nextVeh[i]['s'] - 10
                            decideWhichLayer(speed, i)
                        }

                    }
                }
            }
            // console.log(checkLightState((areThereLights(nextVeh[i]['po'], i))[1]))
            // console.log(areThereLights(nextVeh[i]['po'], i));
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

    // nextVeh[i]['lr'] = x
    // //
    // // nextveh.push(lr: this)
    // if (nextVeh[i]['w'] != nextVeh[i]['s']) {
    //     usun(nextVeh[i]['lr'])
    //     nextVeh[i]['w'] = nextVeh[i]['s']
    // }




    // if this != undefined
    // usunLayer
    if (animation) {
        map.addLayer(layer600)
    }




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
        case 30:
            addToLayer(markers5, i)
            break;
        case 20:
            addToLayer(markers6, i)
            break;
        case 10:
            addToLayer(markers7, i)
            break;
        case 0:
            addToLayer(markers8, i)
            break;
    }
}

function canOut(carID) {
    var isOutRight = false
    try {
        var cos = neigh[neigh[nextVeh[carID]['po']]['nr']]['e']
        isOutRight = true
    } catch (e) {

    } finally {
        if (isOutRight) {
            if (nextVeh[carID]['l'] > 2500 && neigh[neigh[nextVeh[carID]['po']]['nr']]['e'] != 'E') {
                return true
            }
             // && neigh[neigh[nextVeh[carID]['po']]['nr']]['e'] == 'O'
        }
        return false
    }

}

function changeLaneToLeft(carID) {
    if (!isThereACar(neigh[nextVeh[carID]['po']]['nl']) && neigh[nextVeh[carID]['po']]['nl'] != '' && (areThereLights(nextVeh[carID]['po'], carID))[0] == 9) {
        neigh[nextVeh[carID]['po']]['v'] = ''
        nextVeh[carID]['po'] = neigh[nextVeh[carID]['po']]['nl']
        neigh[nextVeh[carID]['po']]['v'] = carID
        return true
    }

}

function changeLaneToRight(carID) {
    if (!isThereACar(neigh[nextVeh[carID]['po']]['nr']) && neigh[nextVeh[carID]['po']]['nr'] != '' && (areThereLights(nextVeh[carID]['po'], carID))[0] == 9 && neigh[neigh[nextVeh[carID]['po']]['nr']]['e'] != 'O') {
        neigh[nextVeh[carID]['po']]['v'] = ''
        nextVeh[carID]['po'] = neigh[nextVeh[carID]['po']]['nr']
        neigh[nextVeh[carID]['po']]['v'] = carID
    }
}

// function isThereACar(carPosition, currentCarID) {
//     for (var j = 0; j < veh.length; j++) {
//         if (nextVeh[j]['po'] == carPosition && j != currentCarID) {
//             return true
//         }
//     }
//     return false
// }

function isThereACar(carPosition) {
    // console.log(carPosition);
    var v = 0
    try {
        var i = neigh[carPosition]['v']
        v = 1
    } catch (e) {

    } finally {
        if (v == 1) {
            if (neigh[carPosition]['v'] == '') {
                return false
            }
            return true
        }
    }



}

function isCarOutsideO(i) {
    if (neigh[nextVeh[i]['po']]['e'] == 'O') {
        return false
    }
    return true
}

function isCarOnI(i) {
    if (neigh[nextVeh[i]['po']]['s'] == 'I') {
        return true
    }
    return false
}

function isCarOnE(i) {
    if (neigh[nextVeh[i]['po']]['e'] == 'E') {
        return true
    }
    return false
}
// sumOut = 0
function changeCarStateTo0(currentPosition, carID) {

    for (var i = 0; i < in_out.length; i++) {
        if (currentPosition == in_out[i]['o']) {
            nextVeh[carID]['d'] = 0
            clearVehicle(currentPosition);
            nextVeh[carID]['po'] = ''
            // sumOut++
            // console.log(currentPosition + " " + carID);
        }

    }
}

function clearVehicle(pos) {
    vx = 0
    try {
        var i = neigh[pos]['v']
        vx = 1
    } catch (e) {

    } finally {
        if (vx == 1) {
            neigh[pos]['v'] = 0
        }
    }



}

function isCarOnAloneI(i) {
    if (neigh[i]['nl'] == '' && neigh[i]['nr'] == '' && neigh[i]['s'] == 'I') {
        return true
    }
    return false
}



function sumOutCars() {
    var sumOut = 0
    for (var i = 0; i < nextVeh.length; i++) {
        if (nextVeh[i]['d'] == 0) {
            sumOut++

        }
    }
    return sumOut
}

// function hasToChangeLane(i) {
//     if (neigh[nextVeh[i]['po']]['e'] == 'E' || neigh[nextVeh[i]['po']]['s'] == 'I')
// }

function isThereACar8(currentPosition, currentCar) {
    if (isCarOutsideO(currentCar) && howManyDotsForward(neigh[nextVeh[currentCar]['po']]['nf']) == 8) {
        var p1 = neigh[currentPosition]['nf']
        var p2 = neigh[p1]['nf']
        var p3 = neigh[p2]['nf']
        var p4 = neigh[p3]['nf']
        var p5 = neigh[p4]['nf']
        var p6 = neigh[p5]['nf']
        var p7 = neigh[p6]['nf']
        var p8 = neigh[p7]['nf']

        if (isThereACar(p1)) {
            return 1
        }
        else if (isThereACar(p2)) {
            return 2
        }
        else if (isThereACar(p3)) {
            return 3
        }
        else if (isThereACar(p4)) {
            return 4
        }
        else if (isThereACar(p5)) {
            return 5
        }
        else if (isThereACar(p6)) {
            return 6
        }
        else if (isThereACar(p7)) {
            return 7
        }
        else if (isThereACar(p8)) {
            return 8
        }
        return 9
    }
    return ["", ""]

}

function howManyDotsForward(currentPosition) {
    let dots = 0
    try {
        var l1 = neigh[currentPosition]['nf']
        dots++
        var l2 = neigh[l1]['nf']
        dots++
        var l3 = neigh[l2]['nf']
        dots++
        var l4 = neigh[l3]['nf']
        dots++
        var l5 = neigh[l4]['nf']
        dots++
        var l6 = neigh[l5]['nf']
        dots++
        var l7 = neigh[l6]['nf']
        dots++
        var l8 = neigh[l7]['nf']
        dots++

    } catch(e) {

    }
    finally {
        return dots
    }

    // console.log(dots);

}

function areThereLights(currentPosition, currentCar) {

    if (isCarOutsideO(currentCar) && howManyDotsForward(neigh[nextVeh[currentCar]['po']]['nf']) == 8) {

        var l1 = neigh[currentPosition]['nf']
        var l2 = neigh[l1]['nf']
        var l3 = neigh[l2]['nf']
        var l4 = neigh[l3]['nf']
        var l5 = neigh[l4]['nf']
        var l6 = neigh[l5]['nf']
        var l7 = neigh[l6]['nf']
        var l8 = neigh[l7]['nf']

        if (neigh[l1]['tl'] != '') {
            return [1, neigh[l1]['tl']]
        }
        else if (neigh[l2]['tl'] != '') {
            return [2, neigh[l2]['tl']]
        }
        else if (neigh[l3]['tl'] != '') {
            return [3, neigh[l3]['tl']]
        }
        else if (neigh[l4]['tl'] != '') {
            return [4, neigh[l4]['tl']]
        }
        else if (neigh[l5]['tl'] != '') {
            return [5, neigh[l5]['tl']]
        }
        else if (neigh[l6]['tl'] != '') {
            return [6, neigh[l6]['tl']]
        }
        else if (neigh[l7]['tl'] != '') {
            return [7, neigh[l7]['tl']]
        }
        else if (neigh[l8]['tl'] != '') {
            return [8, neigh[l8]['tl']]
        }
        return [9, ""]
    }
    return ["", ""]
}

function checkLightState(lightsID) {
    for (var k = 0; k < ligh.length; k++) {
        if (nextLigh[k]['id'] == lightsID) {
            return nextLigh[k]['st']
        }
    }
}

function changeLights() {

    lightsLayer.clearLayers()
    for (var k = 0; k < ligh.length; k++) {

        nextLigh[k]['st'] = !nextLigh[k]['st']

    }
    drawLights()
}

function accelerate1(carID, currentSpeed) {
    if (currentSpeed < nextVeh[carID]['ms']) {
        nextVeh[carID]['s'] = nextVeh[carID]['s'] + 10
    }

}

function myTimeout(callback, delay) {
    var id, started, remaining = delay, running

    this.start = function() {
        running = true
        started = new Date()
        id = setTimeout(callback, remaining)
    }

    this.pause = function() {
        running = false
        clearTimeout(id)
        remaining -= new Date() - started
    }

	this.resetTimer = function() {
		remaining = delay;
	}
}

function setLightsTime() {
	element = document.getElementById("lightstime");
	var time = element.value;
	if (time != lightsTime){
		lightsTime = time;
	}
	element.readOnly = true;
}

function setInputTime() {
	element2 = document.getElementById("inputTime");
	var count = element2.value;
	if (count != inputPerMinute){
		inputPerMinute = count;

	}
    // console.log(inputPerMinute);
	element2.readOnly = true;
}

function setInputCars() {
	element3 = document.getElementById("inputCar");
	var count1 = element3.value;
	if (count1 != n){
		n = count1;

	}
    // console.log(inputPerMinute);
	element3.readOnly = true;
}

function calcAvgSpeed() {
    sum = 0
    aj = 0
    for (var i = 0; i < nextVeh.length; i++) {
        if (nextVeh[i]['d'] == 1) {
            sum += nextVeh[i]['s']
            aj++
        }

    }
    avgSpeed = sum / aj
    // totalAVGSpeed = avgSpeed / howMany
    // console.log(avgSpeed);
    return avgSpeed
}
var dps = [];
var dps0 = [];
function chartAVGSpeed() {

    var chart = new CanvasJS.Chart("chartContainer", {
    	exportEnabled: true,
    	title :{
    		text: "Current Average Speed"
    	},
    	axisY: {
            minimum: 0,
            maximum: 60
    	},
    	data: [{
    		type: "spline",
    		markerSize: 0,
    		// dataPoints: dps
            dataPoints: dps
    	},
        {
            type: "spline",
    		markerSize: 0,
    		// dataPoints: dps
            dataPoints: dps0
        }]
    });

    var xVal = 0;
    var yVal = 00;
    var updateInterval = 1000;
    var dataLength = 50;


    var updateChart = function () {
        xVal++
        // var dps = chart.options.data[0].dataPoints;
        dps.push({
            x: xVal,
            y: calcAvgSpeed()
        })
        dps0.push({
            x: xVal,
            y: calcPossibleMaxspeed()
        })

    	// if (dps.length > dataLength) {
    	// 	dps.shift();
    	// }
        // if (dps0.length > dataLength) {
    	// 	dps0.shift();
    	// }

        // chart.options.data[0].dataPoints = dps;
    	chart.render();
    };

    setInterval(function(){ updateChart() }, updateInterval);
}

function inputCars() {
    var canSpawn = 0
    var timeToSpawn = 60 / inputPerMinute

    setTimeout(function() {

        while (canSpawn == 0) {
            var randomInput = parseInt(Math.random()*(in_out.length))
            if (in_out[randomInput]['i'] != '') {
                canSpawn = 1
                veh.push({
                po: in_out[randomInput]['i'],
                s: 30,
                d: 1,
                ms: 0,
                cl: 0,
                l: 0
            })
            }
        }
        inFlow++
        setMaxSpeed()
        if (stop == 0){
            inputCars()
        }

    }, timeToSpawn * 1000)

}

function spawnCars(howManyCars) {
    var step = parseInt(22000 / howManyCars)
    for (var i = 0; i < howManyCars; i++) {
        if (neigh[i*step]['s'] == "0" && neigh[i*step]['e'] == "0") {
            // console.log(howManyCars*step);
            veh.push({
                po: i*step,
                s: 30,
                d: 1,
                ms: 0,
                cl: 0,
                l: 0,
                w: 30,
                lr: null
            })
        }
    }
    // nextVeh.push(veh)

}
inOutOn = []
function outFlowChart() {
    var chart = new CanvasJS.Chart("chartContainerOutFlow", {
    	title: {
    		text: "In/OutFlow"
    	},
    	axisY: {
    		title: "How many cars"
    	},
    	data: [{
    		type: "column",
    		indexLabel: "{y}",
    		dataPoints: [
    			{ label: "InFlow", y: 0 },
    			{ label: "OutFlow", y: 0 },
                { label: "HowManyCars", y: 0 }
    		]
    	}]
    });

    function updateChart() {
    	var boilerColor, deltaY, yVal;
    	var dps = chart.options.data[0].dataPoints;
        dps[0] = {
            label: "InFlow",
            y: inFlow,
            color: "#27ae60"
        }
        dps[1] = {
            label: "OutFlow",
            y: sumOutCars(),
            color: "#c0392b"
        }
        dps[2] = {
            label: "HowManyCars",
            y: sumCarsOn(),
            color: "#2980b9"
        }
        inOutOn.push({
            a: dps[0].y,
            b: dps[1].y,
            c: dps[2].y
        })
    	chart.options.data[0].dataPoints = dps;
    	chart.render();
    };
    updateChart();

    setInterval(function() {updateChart()}, 1000);

}

function setMaxSpeed() {
    for (var i = 0; i < veh.length; i++) {
        if (nextVeh[i]['ms'] == 0) {
            var rng = Math.random()
            if (rng >= 0 && rng <= 0.1) {
                nextVeh[i]['ms'] = 40
            }
            else if (rng > 0.1 && rng <= 0.6) {
                nextVeh[i]['ms'] = 50
            }
            else if (rng >= 0.6 && rng <= 1) {
                nextVeh[i]['ms'] = 60
            }
        }

        // console.log(veh[i]['ms'], i);
    }
}

function calcPossibleMaxspeed() {
    var avg = 0
    var suma = 0
    var ja = 0
    for (var i = 0; i < nextVeh.length; i++) {
        if (nextVeh[i]['d'] == 1) {
            suma += nextVeh[i]['ms']
            ja++
        }
    }
    avg = suma / ja
    return avg
}

function sumCarsOn() {
    var carsOn = 0
    for (var i = 0; i < nextVeh.length; i++) {
        if (nextVeh[i]['d'] == 1) {
            carsOn++
        }
    }
    return carsOn
}

function saveData() {
    arr = []
    for (var i = 0; i < dps.length; i++) {
        arr.push(dps[i].x, (dps0[i].y).toPrecision(3), (dps[i].y).toPrecision(3), inOutOn[i].a, inOutOn[i].b, inOutOn[i].c+'\n')
    }
    var blob = new Blob([arr], {type: "text/plain;charset=utf-8"});



    saveAs(blob, "1.txt");

}

function shNextVeh() {
    // console.log(nextVeh);
    // console.log(flow);
    console.log(arrayFlow);
}
seconds = 0
function inputCarsDirectPlace() {
    setTimeout(function() {

        for (var i = 0; i < array.length; i++) {
            if (seconds % array[i][1] == 0 && array[i][1] != 0 && array[i][1] < 61) {
                nextVeh.push({
                    po: array[i][0],
                    s: 30,
                    d: 1,
                    ms: 0,
                    cl: 0,
                    l: 0,
                    w: 30,
                    lr: null
                })
                inFlow++
            }
        }
        setMaxSpeed()
        if (stop == 0){
            inputCarsDirectPlace()
        }
        seconds++
        if (seconds == 60) {
            seconds = 0
        }

    }, 1000)

}

function countFlow(junction) {
    flow[junction]['f'] += 1
}

function displayFlow() {

    setTimeout(function() {
        for (var i = 0; i < flow.length; i++) {
            document.getElementById(`j${i}`).innerHTML = flow[i]['f'];
        }

        if (stop == 0) {
            displayFlow()
        }

    }, 1000)

}

function saveFlow() {
    var blob2 = new Blob([arrayFlow], {type: "text/plain;charset=utf-8"});



    saveAs(blob2, "2.txt");
}


arrayFlow = []
minute0 = 0
function minuteFlow() {
    setTimeout(function() {
        for (var i = 0; i < flow.length; i++) {
            flow[i]['m'] = minute0
            arrayFlow.push([flow[i]['n'], flow[i]['m'], flow[i]['f'], "\n"])
        }

        if(stop == 0) {
            minuteFlow();
        }

    }, 60000)
    minute0++
    for (var i = 0; i < flow.length; i++) {
        flow[i]['f'] = 0
    }



}

// var blob = new Blob([arr], {type: "text/plain;charset=utf-8"});
//
//
//
// saveAs(blob, "1.txt");

// window



/* Set the width of the sidebar to 250px (show it) */
function openNav() {
  document.getElementById("mySidepanel").style.width = "40vw";
  document.getElementById("header").innerHTML = "Choose input and click SET"
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

function openNav2() {
    displayFlow()
    document.getElementById("mySidepanel2").style.width = "40vw";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav2() {
  document.getElementById("mySidepanel2").style.width = "0";
}



function set1(arg) {
    document.getElementById("2919").value = arg
    document.getElementById("16367").value = arg
    document.getElementById("3509").value = arg
    document.getElementById("16080").value = arg
    document.getElementById("3054").value = arg
    document.getElementById("3509").value = arg
    document.getElementById("15995").value = arg
    document.getElementById("17284").value = arg
    document.getElementById("4576").value = arg
    document.getElementById("3570").value = arg
    document.getElementById("16622").value = arg
    document.getElementById("2390").value = arg
    document.getElementById("3699").value = arg
    document.getElementById("15676").value = arg
    document.getElementById("17478").value = arg
    document.getElementById("16236").value = arg
    document.getElementById("3758").value = arg
    document.getElementById("3355").value = arg
    document.getElementById("16719").value = arg
    document.getElementById("16773").value = arg
    document.getElementById("3854").value = arg
    document.getElementById("17367").value = arg
    document.getElementById("8026").value = arg
    document.getElementById("17437").value = arg
    document.getElementById("6470").value = arg
    document.getElementById("8225").value = arg
    document.getElementById("3225").value = arg
}

function noAnimation() {
    animation = false
    setButtonFunction();
    document.getElementById("header").innerHTML = "Now click Start Traffic"
}

array = []
function setButtonFunction() {
    if (animation) {
        myFunction();
    }
    set1(globalInput);
    setSpawnCars();

    array = []

    array.push([2919, Math.floor(60 / document.getElementById("2919").value)])
    array.push([16367, Math.floor(60 / document.getElementById("16367").value)])
    array.push([3509, Math.floor(60 / document.getElementById("3509").value)])
    array.push([16080, Math.floor(60 / document.getElementById("16080").value)])
    array.push([3054, Math.floor(60 / document.getElementById("3054").value)])
    array.push([15995, Math.floor(60 / document.getElementById("15995").value)])
    array.push([17284, Math.floor(60 / document.getElementById("17284").value)])
    array.push([4576, Math.floor(60 / document.getElementById("4576").value)])
    array.push([3570, Math.floor(60 / document.getElementById("3570").value)])
    array.push([16622, Math.floor(60 / document.getElementById("16622").value)])
    array.push([2390, Math.floor(60 / document.getElementById("2390").value)])
    array.push([3699, Math.floor(60 / document.getElementById("3699").value)])
    array.push([15676, Math.floor(60 / document.getElementById("15676").value)])
    array.push([17478, Math.floor(60 / document.getElementById("17478").value)])
    array.push([16236, Math.floor(60 / document.getElementById("16236").value)])
    array.push([3758, Math.floor(60 / document.getElementById("3758").value)])
    array.push([3355, Math.floor(60 / document.getElementById("3355").value)])
    array.push([16719, Math.floor(60 / document.getElementById("16719").value)])
    array.push([16773, Math.floor(60 / document.getElementById("16773").value)])
    array.push([3854, Math.floor(60 / document.getElementById("3854").value)])
    array.push([17367, Math.floor(60 / document.getElementById("17367").value)])
    array.push([8026, Math.floor(60 / document.getElementById("8026").value)])
    array.push([17437, Math.floor(60 / document.getElementById("17437").value)])
    array.push([6470, Math.floor(60 / document.getElementById("6470").value)])
    array.push([8225, Math.floor(60 / document.getElementById("8225").value)])
    array.push([3225, Math.floor(60 / document.getElementById("3225").value)])

    // console.log(array);
}

function setSpawnCars() {
    n = globalSpawnCars
}

function setInputSidePanel(input) {
    globalInput = input
}

function setCarsSidePanel(cars) {
    globalSpawnCars = cars
}
