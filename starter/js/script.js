/*
@brief: update time and display the time 
@param: N/A
@return: N/A
*/

let updateTime = function () {
    let currentDay = $('#currentDay');
    setInterval(
        () => {
            //EEEE	day 
            let cTime = luxon.DateTime.now().toFormat('EEEE dd-MMMM-yyyy HH:mm:ss ')	//=>	"01-27-2023"

            currentDay.text(cTime);
        }, 1000);
}


/*
@brief: get working hours and days 
@param: N/A
@return: N/A
*/


let get_working_dh = function () {

    // create object to handle working days and hours 
    let workDaysHours = new Map()

    function get_days() {
        // splitting the string to separate day and 24 hour
        let _day = luxon.DateTime.now().toFormat('EEE, HH').split(',')
        
        workDaysHours = {
            // check the day 
            dayCat: ['Sat', 'Sun'].includes(_day[0]) ? 'weekend' : 'week',
            day: _day[0], // day
            hour:_day[1], // 24hrs

            // get the current hour using getter 
            get workingHour(){                
                return this.hour
            } 
        }
        return workDaysHours;
    };
    
    return get_days();
}();

$(document).ready(function () {
    // display current time 
    updateTime();

    console.log(get_working_dh.workingHour)


})