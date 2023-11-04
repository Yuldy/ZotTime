let departmentDropDown = document.querySelector('#department')
let courseList = []

fetch(`https://api.peterportal.org/rest/v0/courses/all`)
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            let departmentOption = document.createElement('option');
            departmentOption.value = data[i].department;
            departmentOption.text = data[i].department;
            if (courseList.includes(data[i].department) === false) {
                departmentDropDown.append(departmentOption)
                courseList.push(data[i].department)
            }
        }
    }
    )


    //FETCH based on Course Code
    
fetch(`https://api.peterportal.org/rest/v0/courses/all`)

//Jessica api key for now
API_KEY = "AIzaSyAu0kb-_ajrx0Hh1T3iUUBSNK9DtJhPIn0"
//fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=New%20York%20City%2C%20NY&origins=Washington%2C%20DC&units=imperial&key=API_KEY)`)
fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=$(building1)origins=$(building2)&units=imperial&key=API_KEY)`)
    .then(res => res.json())
    .then(data => {
        
    }
    )
    