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

    let get_days  = function () {
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

                    tmp_hour = _hour -12; // 

                }else{
                    tmp_hour = _hour; 
                }
               
                return tmp_hour+ _t[1]; 

            }, // 24hrs        
        }
        return workDaysHours;
    }();

    return get_days;
}();

let set_time_blocks = function () {

    /*

       <div class="row justify-content-md-center">
      
      <!-- <div class="col"> -->
        
      <!-- </div> -->
      <!-- <div class="col-10"> -->
        
      <!-- </div> -->
      <!-- <div class="col-1"> -->
        <button class="saveBtn"><i class="bi bi-save"></i></button>
      <!-- </div> -->
  




    */

      let time_label = 'present'
      let timeFrame = "12PM"
    let container = $('.container');
for(let i =0; i < 8; i++){
    // add bootstrap  <div class="row justify-content-md-center">
    let row = $("<div/>", {
        class:"row no-gutters",
        id: "row_animate"
    }).appendTo(container); 

    // let column = $("<div/>", {
    //     class:"col-6 col-md-4",
    //     id: "row_animate"
    // }).appendTo(row); 

    let label = $("<label/>", {
        class: "hour",
        for:"hour" ,
        text:`${timeFrame}` 

    }).appendTo(row);
   
    // let column2 = $("<div/>", {
    //     class:"col-6 col-md-4",
    //     id: "row_animate"
    // }).appendTo(row); 

    let textArea = $("<textarea/>", {
        class: `${time_label} description`,
        id: "hour" 
    }).appendTo(row);   
    


    let button = $("<button/>", {
        class: `saveBtn`,
        // html:`<i class="bi bi-save"></i>`
        
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