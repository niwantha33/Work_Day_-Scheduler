/*
@brief: update time 
@param: N/A
@return: N/A
*/

let updateTime = function () {
    let currentDay = $('#currentDay');
    setInterval(
        () =>{
            // https://moment.github.io/luxon/#/formatting
            let cTime = luxon.DateTime.now().toFormat('EEEE dd-MMMM-yyyy HH:mm:ss ')	//=>	"01-27-2023"
           
            currentDay.text(cTime);
        }, 1000);
}


$(document).ready(function () {
    // display current time 
    updateTime();


})