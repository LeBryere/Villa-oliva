/************************************************************************\
                              set TUC time
\************************************************************************/
/* How to use the code snippet:

The first line of the code sets the variable "utc" to 2, 
which represents the UTC offset for the time zone you are in.

The next line creates a new Date object and assigns it to 
the variable "currentDate". The current date and time is then 
set using the setTime() method and the getTimezoneOffset() 
and getTime() methods. The UTC offset is also added to this value.

The following lines create variables for the current day and 
hour using the getDay() and getHours() methods.

The code then selects the elements with the id's "check-in" 
and "check-out" and assigns them to the variables "checkIn" 
and "checkOut" respectively.

The function openClose() is defined next. This function checks 
the current hour against the specified range (15-21 for 
check-in and 7-10 for check-out) and changes the color and 
font size of the elements accordingly. If the current hour is 
outside of these ranges, the elements will be colored red.

The final line of the code uses the setInterval() method to call
the openClose() function every 5 seconds.

The code snippet can be used to indicate the check-in and check-out 
or opening hours on a website. It can be modified to reflect 
different time ranges and styles based on user requirements. */

// A variable indicating the deviation from UTC time
let utc = 2;
// Get the current date and time
let currentDate = new Date();
// Set the current date and time taking the deviation into account
currentDate.setTime(currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000 + (/* UTC+2 */ utc) * 60 * 60 * 1000);
// Get the current day
let currentDay = currentDate.getDay();
// Get the current hour
let currentHour = currentDate.getHours();
// Select the HTML element with the id "check-in"
let checkIn = document.getElementById("check-in");
// Select the HTML element with the id "check-out"
let checkOut = document.getElementById("check-out");

function openClose() {
   // If the current time is between 3 PM and 9 PM
   if (currentHour >= 15 && currentHour <= 21) {
      // Set the color of the "check-in" element to green
      checkIn.style.color = "green";
      // Set the font size of the "check-in" element to 14px
      checkIn.style.fontSize = "14px";
   } else {
      // If it's not within the specified time range, set the color of the "check-in" element to red
      checkIn.style.color = "#ff3c3c";
   }

   // If the current time is between 7 AM and 10 AM
   if (currentHour >= 7 && currentHour <= 10) {
      // Set the color of the "check-out" element to green
      checkOut.style.color = "green";
      // Set the font size of the "check-out" element to 14px
      checkOut.style.fontSize = "14px";
   } else {
      // If it's not within the specified time range, set the color of the "check-out" element to red
      checkOut.style.color = "#ff3c3c";
   }
}

// Run the "openClose" function every 5 seconds
setInterval(openClose(), 5000)
