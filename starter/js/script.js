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
            let cTime = luxon.DateTime.now().toFormat('EEEE, dd-MMMM-yyyy HH:mm:ss ')	//=>	"01-27-2023"

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
        let _day = luxon.DateTime.now().toFormat('EEE, HH:a').split(',')
        console.log(_day)
        workDaysHours = {
            // check the day 
            dayCat: ['Sat', 'Sun'].includes(_day[0]) ? 'weekend' : 'week',

            day: _day[0], // day

            get hour_12hrs_format() {
                let _t = _day[1].split(':') // split the "19: PM"
                let _hour = Number(_t[0])

                let tmp_hour = 0;

                // convert the 24hrs to 12 hours 
                if (_hour > 12) {

                    tmp_hour = _hour -12; // 

                }else{
                    tmp_hour = _hour; 
                }
               
                return tmp_hour+ _t[1]; 

            }, // 24hrs

            // get the current hour using getter 
            get workingHour() {
                return this.hour
            }
        }
        return workDaysHours;
    };

    return get_days();
}();

let set_inline_blocks_for_hours = function () {


}

$(document).ready(function () {
    // display current time 
    updateTime();

    console.log(get_working_dh.hour_12hrs_format)


})