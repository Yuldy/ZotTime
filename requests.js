//Fetch Courses from PeterPortal API

let departmentDropDownDepart = document.querySelector('.departmentDepart')
let courseNumberDropDownDepart = document.querySelector('.courseNumberDepart')
let departmentDepart = []


fetch(`https://api.peterportal.org/rest/v0/courses/all`)
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            let departmentOption = document.createElement('option');
            departmentOption.value = data[i].department;
            departmentOption.text = data[i].department;
            if (departmentDepart.includes(data[i].department) === false) {

                departmentDropDownDepart.append(departmentOption)
                departmentDepart.push(data[i].department)
            }
        }
    }
    )

departmentDropDownDepart.addEventListener('input', (e) => {
    console.log(departmentDropDownDepart.value)
    courseNumberDropDownDepart.innerHTML = ''
    fetch(`https://api.peterportal.org/rest/v0/courses/all`)
        .then(res => res.json())
        .then(data => {
            for (course of data) {
                let courseNumberOption = document.createElement('option');
                if (course.department === departmentDropDownDepart.value) {
                    courseNumberOption.value = course['number'];
                    courseNumberOption.text = course['number'];
                    courseNumberDropDownDepart.append(courseNumberOption)
                }
            }
        })
})

let departmentDropDownArrival = document.querySelector('.departmentArrival')
let courseNumberDropDownArrival = document.querySelector('.courseNumberArrival')
let departmentArrival = []


fetch(`https://api.peterportal.org/rest/v0/courses/all`)
    .then(res => res.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            let departmentOption = document.createElement('option');
            departmentOption.value = data[i].department;
            departmentOption.text = data[i].department;
            if (departmentArrival.includes(data[i].department) === false) {

                departmentDropDownArrival.append(departmentOption)
                departmentArrival.push(data[i].department)
            }
        }
    }
    )

departmentDropDownArrival.addEventListener('input', (e) => {
    console.log(departmentDropDownArrival.value)
    courseNumberDropDownArrival.innerHTML = ''
    fetch(`https://api.peterportal.org/rest/v0/courses/all`)
        .then(res => res.json())
        .then(data => {
            for (course of data) {
                let courseNumberOption = document.createElement('option');
                if (course.department === departmentDropDownArrival.value) {
                    courseNumberOption.value = course['number'];
                    courseNumberOption.text = course['number'];
                    courseNumberDropDownArrival.append(courseNumberOption)
                }
            }
        })
})


// FETCH based on Course Code:
fetch("https://api.peterportal.org/rest/v0/schedule/soc?term=2023Fall&sectionCodes=35660", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

    //FETCH based on Course Code
    
//fetch(`https://api.peterportal.org/rest/v0/courses/all`)

//Jessica api key for now

/*
API_KEY = "AIzaSyAu0kb-_ajrx0Hh1T3iUUBSNK9DtJhPIn0"
//fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=New%20York%20City%2C%20NY&origins=Washington%2C%20DC&units=imperial&key=API_KEY)`)
//fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=$(building1)origins=$(building2)&units=imperial&key=API_KEY)`)
fetch(`https://routes.googleapis.com`) 
    .then(res => res.json())
    .then(data => {
        
    }
    )

*/




// [FETCH = based on Courss Code]
// this is just hard coded for time being.
let courseCode = 35660;
//let courseCode = int(prompt());
let quarterTerm = "2023Fall";

const requestOptions = {
    method: "GET",

}

fetch(`https://api.peterportal.org/rest/v0/schedule/soc?term=${quarterTerm}&sectionCodes=${courseCode}`, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response error.');
        }
        return response.json(); 
    })

    .then(data => {
        retrievedData = data;
        const grabSpecificBuilding = retrievedData.schools[0].departments[0].courses[0].sections[0].meetings[0].bldg;
        console.log("Building: " + grabSpecificBuilding);
    })