/*
@brief: update time and display the time 
@param: N/A
@return: N/A
*/


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
        "12AM",
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
            id: `label-${i}`,
            text: `${time_[i]}`

        }).appendTo(row);

        let textArea = $("<textarea/>", {
            class: `${time_label} description`,
            id: `${i}`,
            name: `${i}`

        }).appendTo(row);

        let button = $("<button/>", {
            class: `saveBtn ${i}`,
            id: `${i}`,
            html: `<i class="bi bi-save"></i>`

        }).appendTo(row);

    }
    let pst_data = persist_data();

    if(pst_data !== null){
        
        pst_data.forEach((element ,k)=> {

            console.log(element)
            let idx_ = time_.indexOf(element.time)
            console.log("Element:" + idx_+":"+element[k])
            $(`textArea[id=${idx_}]`).text(element.task)
        });
        
    }

}

let persist_data = function () {

    if (localStorage.hasOwnProperty("schedule")) {

        let rtv = localStorage.getItem("schedule"); // retrieve data from local store 

        console.log(rtv)
        console.log(JSON.parse(rtv))
        return JSON.parse(rtv);// convert from JSON to object 

    }
    return null; 


}

let save_localStorage = function (newArray) {
    // debugger;
    localStorage.setItem("schedule", JSON.stringify(newArray))


}

let trv_save_localStorage = function (obj) {
    // debugger;
    console.log(obj)

    // let tmp = new Array(); // create tmp array to store data 
    let tmp= [];
    console.log(tmp)

    if (localStorage.hasOwnProperty("schedule")) { // check if key: schedule exist

        let rtv = localStorage.getItem("schedule"); // retrieve data from local store 

        console.log(rtv)

        let parse_rtv = JSON.parse(rtv);// convert from JSON to object 
        console.log(parse_rtv)
        parse_rtv.forEach(element => {
            tmp.push(element); // save to tmp array     
        });
          

    }
    //  then push new object 
    tmp.push(obj);

    console.log("after:"+tmp)

    save_localStorage(tmp);

    // tmp.clear()

}

$(document).ready(function () {
    // display current time 

    let prev_timer = -Infinity

    let updateTime = function () {
        let currentDay = $('#currentDay');
        currentDay.addClass('time-block');
        setInterval(
            () => {
                //EEEE	day 
                let cTime = luxon.DateTime.now().toFormat('EEEE, dd-MMMM-yyyy HH:mm:ss ')	//=>	"01-27-2023"
                currentDay.text(cTime);
                // every hour 
                if (prev_timer !== luxon.DateTime.now().hour) {

                    set_time_blocks()

                    prev_timer = luxon.DateTime.now().hour;

                }

            }, 1000);
    }


    updateTime();



    $(document).on('click', '.saveBtn', function (e) {

        e.preventDefault();

        let task_ = $(`#${this.id}`).val().trim();

        let time_label = $(`#label-${this.id}`).text().trim();

        trv_save_localStorage({ time: time_label, task: task_ })

    });

})