//Holds the values needed for converting
//Always set this according to your specific problem!
var converterOptions = {
    origin : {                  //A point thats known in both coordinate systems
            lat: 52.33129,      //Latitude of the reference point
            lng: 13.63225,      //Longitude
            x: 321,             //Pixel coordinates of the reference point
            y: 43
    },
    scaleX : 0.051,             //X-axis scale in meters/pixel
    scaleY : 0.051,             //Y-axis scale in meters/pixel
    angle : 14                  //Angle of the Y-axis to north direction
};

/**
 * Converts real world lat/lng into screen xy
 * Reverse of convertXYtoLL()
 * @param {float} lat Latitude
 * @param {float} lng Longitude
 */ 
function convertLLtoXY (lat, lng) {
    var dAngle = Math.PI + converterOptions.angle;

    //Get the difference from the reference point
    var dLat = lat - converterOptions.origin.lat;
    var dLng = lng - converterOptions.origin.lng;

    //Convert Lat/Lng difference to meters
    var ny = dLat * 111111;     //One degree latitude is 111.111 km or 111,111 m
    //Since the length of a degree longitude changes we approximate based on latitude
    var nx = dLng * (111111 * Math.cos(deg2rad(converterOptions.origin.lat))); 

    var x = nx * Math.cos(dAngle) - ny * Math.sin(dAngle);
    var y = nx * Math.sin(dAngle) + ny * Math.cos(dAngle);

    return {
        x: parseInt(converterOptions.origin.x - x / converterOptions.scaleX),
        y: parseInt(converterOptions.origin.y + y / converterOptions.scaleY)
    };
}

/**
 * Translates screen coordinates into realworld lat/lng coordinates
 * uses the origin, scale and angle values
 * @param {int} x X-position
 * @param {int} y Y-position
 */
function convertXYtoLL(x, y) {
    var nX, nY, dLat, dLng, nLat, nLng;

    //Get distance from reference point
    x = (x - converterOptions.origin.x) * converterOptions.scaleX;
    y = (converterOptions.origin.y - y) * converterOptions.scaleY;

    //Rotate the coordinate system
    nX = x * Math.cos(converterOptions.angle) + y * Math.sin(converterOptions.angle);
    nY = y * Math.cos(converterOptions.angle) - x * Math.sin(converterOptions.angle);

    //Convert distance in meters to Lat/Lng difference
    dLat = nY / 111111;
    dLng = nX / (111111 * Math.cos(deg2rad(converterOptions.origin.lat)));      //This is an approximation for the length!

    //Add to reference
    nLat = converterOptions.origin.lat + dLat;
    nLng = converterOptions.origin.lng + dLng;

    return {
        lat: nLat,
        lng: nLng
    };
}

/**
 * Returns the distance between pixel coordinates in realword meters
 */
function getDistance (x1, y1, x2, y2) {
    var dX = (x1 - x2) * (x1 - x2);
    var dY = (y1 - y2) * (y1 - y2);
    
    //Pythagoras, just with the appropiate scale multiplied
    var d = Math.sqrt(dX * converterOptions.scaleX * converterOptions.scaleX  + dY * converterOptions.scaleY * converterOptions.scaleY);

    return d;
}

/*
 * Converts degrees to radians
 */
function deg2rad(x) {
    return x * (Math.PI / 180);
}
