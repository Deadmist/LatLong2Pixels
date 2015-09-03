# LatLong2Pixels

This provides methods to convert realword Latitude/Longitude coordinates into onscreen pixel coordinates.  
It works by using a reference point that's known in both coordinate system, the angle of your screen coordinate system to north and a scale.  

###converterOptions

The converterOptions provides the variables needed to convert between Lat/Lng and XY, you need to set it!  

###Functions  

There are three functions in the file:  
1. convertLLtoXY(lat, lng) for going from latitute/longitude -> screen coordinates
2. convertXYtoLL(x, y) for going screen coordinates -> latitute/longitude
3. getDistance (x1, y1, x2, y2) for getting the difference in realword meters between two pixles

###Accuracy

The functions use an approximation for the length of one degree longitude and don't deal with a precise map projection.  
While the accuray is good enough for small distances (I only tested < 1km) you may want to be carefull when greater distances are involved.
