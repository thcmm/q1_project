## Q1 Project : tsarkisian
***
**Must use the following HTTPS URL to access site:**   
[https://www.dive-booking.com/q1/q1project/index.html](https://www.dive-booking.com/q1/q1project/index.html)        
***
**Base functionality:**  
Pull sensor readings from MPL3115A2 via i2c bus.  
Parse readings, convert to metric on AVR.  
Make WiFi connection to mySQL server via WiFi h/w.    
Push updated set of sensor readings to remote mySQL dB.  
Display users (browser) location based on Google Geo-location.  
Contrast sensor measurements against collected Underground Weather API readings.  
Display raw sensor readings against API values.  

**Hardware Used:**    
Arduino Mega 2560  
Arduino WiFi Shield  
MPL3115A2 Sensor: Temperature, Barometric, Altitude telemetry  

**API's Used:**   
Underground Weather API  
Google Maps API  

**Someday:**  
Suggest daily activities based on weather.  
Display historical values for current date (as/if available).  

