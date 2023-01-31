
// wait to fully load
$(document).ready(function () {

    /*
    @brief: get working hours and days 
    @param: N/A
    @return: N/A
    */
    let getWorkDaysHours = function () {

        // create object to handle working days and hours 
        let workDaysHours = new Map();

        let getCurrentDayAndTime = function () { // inner function 
            // splitting the string to separate day and 24 hour
            let _day = luxon.DateTime.now().toFormat('EEE, HH:a').split(',');

            workDaysHours = {
                // check the day 
                get dayWeekOrWeekend() { return ['Sat', 'Sun'].includes(_day[0]) ? 'weekend' : 'week' },

                get day() { return _day[0] }, // day

                get hour_12hrs_format() {

                    let _t = _day[1].split(':') // split the "19: PM"

                    let _hour = Number(_t[0]);

                    let tmp_hour = 0;

                    // convert the 24hrs hour to 12 
                    if (_hour > 12) {

                        tmp_hour = _hour - 12; // 

                    } else {
                        tmp_hour = _hour;
                    }

                    return tmp_hour + _t[1];

                },
            }
            return workDaysHours;
        }();

        return getCurrentDayAndTime;
    }();

    let createTimeBlocks = function () {

        let time_ = new Array(10);

        time_ = [ // standard business hours

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
        ];
        // three type of color-code 
        let color_code = ['past', 'present', 'future'];

        let container = $('.container'); // get the div element 

        // delete all the children 
        if (container.children().length > 0) {

            container.empty();

        }

        for (let i = 0; i < time_.length; i++) {

            let idx = -1; // get the index of the time_

            let time_label = 0;
            // console.log(get_working_dh.hour_12hrs_format)

            if (time_.includes(getWorkDaysHours.hour_12hrs_format)) {

                idx = time_.indexOf(getWorkDaysHours.hour_12hrs_format);
            }

            // set the color of the rows 
            if (i < idx) {
                time_label = color_code[0];

            } else if (i == idx) {
                time_label = color_code[1];

            } else if (i > idx) {
                time_label = color_code[2];
            }
            // creates elements to div row 
            let row = $("<div/>", {
                class: "row no-gutters",
                id: "row_animate"
            }).appendTo(container);

            $("<label/>", {
                class: "hour",
                for: "hour",
                id: `label-${i}`,
                text: `${time_[i]}`

            }).appendTo(row);

            $("<textarea/>", {
                class: `${time_label} description`,
                id: `${i}`,
                name: `${i}`

            }).appendTo(row);

            $("<button/>", {
                class: `saveBtn ${i}`,
                id: `${i}`,
                html: `<i class="bi bi-save"></i>`

            }).appendTo(row);

        }

        try {
            let pst_data = checkDataPersist(); // return the stored data

            if (pst_data !== null) {

                pst_data.forEach((element, k) => {

                    let idx_ = time_.indexOf(element.time);

                    // console.log(luxon.DateTime.now().toLocaleString(), element.day)

                    if (luxon.DateTime.now().toLocaleString() === element.day) {
                        $(`textArea[id=${idx_}]`).text(element.task);
                    }

                });

            }

        } catch (e) {
            throw e;
        }
    }

    let checkDataPersist = function () {

        try {
            if (localStorage.hasOwnProperty("schedule")) {

                let rtv = localStorage.getItem("schedule"); // retrieve data from local store 

                return JSON.parse(rtv);// convert from JSON to object 

            }
            return null;

        } catch (e) {

            throw e;
        }

    }

    let saveToLocalStorage = function (newArray) {
        // debugger;

        try {
            localStorage.setItem("schedule", JSON.stringify(newArray));

        } catch (e) {
            throw e;
        }

    }

    /*
    @brief: this retrieveAndSaveToLocalStorage function, takes object (obj) as a parameter, 
            then create temporary empty array using Array object.
    
            hasOwnProperty() method will check  whether "schedule"  key is existing
            or not. If the key is there, then, retrieve the data parse to JSON,
            then elements will push to the array using forEach() function.
    
            new obj will push to the array.  
    
    */

    function retrieveAndSaveToLocalStorage(obj) {

        // debugger;
        try {

            let tmp = new Array(); // create tmp array to store data 

            if (localStorage.hasOwnProperty("schedule")) { // check if key: schedule exist

                let rtv = localStorage.getItem("schedule"); // retrieve data from local store         

                let parse_rtv = JSON.parse(rtv); // convert from JSON to object 

                parse_rtv.forEach(element => {
                    tmp.push(element); // append to tmp array     
                });

            };
            //  then push new object 
            tmp.push(obj); // append to tmp array 

            saveToLocalStorage(tmp); // save tmp object  

        } catch (e) {
            throw e;
        }
    }

    // display current time 

    let prev_timer = -Infinity

    let startApp = function () {

        let currentDay = $('#currentDay');

        currentDay.addClass('time-block');

        setInterval(
            function () {
                //EEEE	day 
                let cTime = luxon.DateTime.now().toFormat('EEEE, dd-MMMM-yyyy HH:mm:ss ')	//=>	"01-27-2023"

                currentDay.text(cTime); // update the time every sec 

                // console.log(luxon.DateTime.now().hour, prev_timer)

                // run set_time_blocks() function every hour  
                if (prev_timer !== luxon.DateTime.now().hour) {
                    console.log(luxon.DateTime.now().hour, prev_timer)
                    createTimeBlocks();
                    // update the prev_timer to current hour 
                    prev_timer = luxon.DateTime.now().hour;

                }

            }, 1000);
    }

    $(document).on('click', '.saveBtn', function (e) {

        e.preventDefault();

        let task_ = $(`#${this.id}`).val().trim(); // get the textarea val and remove white space 

        // timeBlock data will save only week days and task_ not be null 
        if (task_.length > 0  && getWorkDaysHours.dayWeekOrWeekend === 'week') { // check the input val
            // time_label is to get the timeBlock label (time - hour)
            let time_label = $(`#label-${this.id}`).text().trim();

            let obj = {
                day: luxon.DateTime.now().toLocaleString(), // 1/29/2023
                time: time_label,
                task: task_
            }

            retrieveAndSaveToLocalStorage(obj)
        }

    });

    // start main app.
    startApp();

})