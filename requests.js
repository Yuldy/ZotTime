

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

// Fetch building values from departments

const form = document.querySelector('#formSubmit');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let departDepartment = departmentDropDownDepart.value;
    let departCourseNumber = courseNumberDropDownDepart.value;
    fetch (`https://api.peterportal.org/rest/v0/schedule/soc?term=2024%20Winter&department=${departDepartment}&courseNumber=${departCourseNumber}`)
        .then (res=> res.json())
        .then (data=> {
            console.log(data.schools[0].departments[0].courses[0].sections[0].meetings[0].bldg);
        })
    let arrivalDepartment = departmentDropDownArrival.value;
    let arrivalCourseNumber = courseNumberDropDownArrival.value;
    fetch (`https://api.peterportal.org/rest/v0/schedule/soc?term=2024%20Winter&department=${arrivalDepartment}&courseNumber=${arrivalCourseNumber}`)
        .then (res=> res.json())
        .then (data=> {
            console.log(data.schools[0].departments[0].courses[0].sections[0].meetings[0].bldg);
    })
})


// [FETCH = based on Course Code]
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


//
// int deptCode = 0;
// int courseNunber = 0;


// Requesting Geocode

// Hardcode
// string = '';


// fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=Anteater%20Learning%20Pavilion%20Irvine%20CA&key=AIzaSyDr0z0C-1w5yxssvIn9_1gJHPmAnY_fMmI`);
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response error.');
//         }

//         return response.json();
//     })
