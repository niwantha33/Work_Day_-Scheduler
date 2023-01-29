//  try this example 
let newArray = new Array() // 

let newObject = new Map();

newObject = {
    hour: "1PM", // key
    task: "attend meeting" //value

}
newArray.push(newObject)

console.log(newArray)

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// set Item to local storage 
let save_data_to_local_storage = function (newArray) {
    localStorage.setItem("schedule", JSON.stringify(newArray))
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// retrieve data from local storage and update 

let obj = {
    hour: "4PM", // key
    task: "attend meeting-2" //value
}
let rtv_from_local_storage = function (obj) {

    let tmp = new Array(); // create tmp array to store data 

    if (localStorage.hasOwnProperty("schedule")) { // check if key: schedule exist

        let rtv = localStorage.getItem("schedule"); // retrieve data from local store 

        let parse_rtv = JSON.parse(rtv) ;// convert from JSON to object 

        tmp.push(parse_rtv); // save to tmp array        
        
    }
     //  then push new object 
    newArray.push(obj);

    save_data_to_local_storage(tmp);

    return tmp;

}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// remove 
let remove_item = function (key) {
    localStorage.removeItem(key);
}


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let clear_all = function () {
    localStorage.clear();
}