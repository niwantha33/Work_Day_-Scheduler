/*
@brief: update time and display the time 
@param: N/A
@return: N/A
*/

let updateTime = function () {
    let currentDay = $('#currentDay');
    currentDay.addClass('time-block');
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

    let get_days = function () {
        // splitting the string to separate day and 24 hour
        let _day = luxon.DateTime.now().toFormat('EEE, HH:a').split(',')

        workDaysHours = {
            // check the day 
            dayCat: ['Sat', 'Sun'].includes(_day[0]) ? 'weekend' : 'week',

            day: _day[0], // day

            get hour_12hrs_format() {

                let _t = _day[1].split(':') // split the "19: PM"

                let _hour = Number(_t[0])

                let tmp_hour = 0;

                // convert the 24hrs hour to 12 
                if (_hour > 12) {

                    tmp_hour = _hour - 12; // 

                } else {
                    tmp_hour = _hour;
                }

                return tmp_hour + _t[1];

            }, // 24hrs        
        }
        return workDaysHours;
    }();

    return get_days;
}();

let set_time_blocks = function () {
    let time_ = new Array(10);

    time_ = [
        "7AM",
        "8AM",
        "9AM",
        "10AM",
        "11AM",
        "0AM",
        "1PM",
        "2PM",
        "3PM",
        "4PM",
        "5PM",
    ]

    let color_class = ['past', 'present', 'future'];


    // let timeFrame = "12PM"
    let container = $('.container');
    for (let i = 0; i < time_.length; i++) {
        let idx = -1;
        let time_label = 0;

        if (time_.includes(get_working_dh.hour_12hrs_format)) {

            console.log(idx)
            // 
            idx = time_.indexOf(get_working_dh.hour_12hrs_format);
            console.log(idx)
        }
        if (i < idx) {
            time_label = color_class[0];

        } else if (i == idx) {
            time_label = color_class[1];

        } else if (i > idx) {
            time_label = color_class[2];
        }



        let row = $("<div/>", {
            class: "row no-gutters",
            id: "row_animate"
        }).appendTo(container);

        let label = $("<label/>", {
            class: "hour",
            for: "hour",
            text: `${time_[i]}`

        }).appendTo(row);

        let textArea = $("<textarea/>", {
            class: `${time_label} description`,
            id: "hour"
        }).appendTo(row);

        let button = $("<button/>", {
            class: `saveBtn`,
            html: `<i class="bi bi-save"></i>`

        }).appendTo(row);

    }

}

$(document).ready(function () {
    // display current time 
    updateTime();

    console.log(get_working_dh.hour_12hrs_format)
    // set_blocks_for_hours_row()
    set_time_blocks()


})