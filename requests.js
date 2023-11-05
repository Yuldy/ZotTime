let departmentDropDownDepart = document.querySelector('.departmentDepart');
let courseNumberDropDownDepart = document.querySelector('.courseNumberDepart');
let departmentDepart = [];

let startBuilding;
let endBuilding;

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

const form = document.querySelector('#formSubmit');

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    try {
        let departDepartment = departmentDropDownDepart.value;
        let departCourseNumber = courseNumberDropDownDepart.value;
        let arrivalDepartment = departmentDropDownArrival.value;
        let arrivalCourseNumber = courseNumberDropDownArrival.value;

        if (departDepartment === 'I&C SCI') {
            departDepartment = 'I%26C SCI'
        } else if (departDepartment === 'CRM/LAW') {
            departDepartment = 'CRM%2FLAW'
        } else if (departDepartment === arrivalDepartment && departCourseNumber === arrivalCourseNumber) {
            alert('These two classes are the same, try again!')
        }

            await fetch(`https://api.peterportal.org/rest/v0/schedule/soc?term=2024%20Winter&department=${departDepartment}&courseNumber=${departCourseNumber}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data.schools[0].departments[0].courses[0].sections[0].meetings[0].bldg); // departure  Building
                    let startBulding = data.schools[0].departments[0].courses[0].sections[0].meetings[0].bldg;
                }).catch(e => {
                    alert(`${departDepartment} ${departCourseNumber} is not available, please try again`)
                })



        await fetch(`https://api.peterportal.org/rest/v0/schedule/soc?term=2024%20Winter&department=${arrivalDepartment}&courseNumber=${arrivalCourseNumber}`)
            .then(res => res.json())
            .then(data => {
                //console.log(data.schools[0].departments[0].courses[0].sections[0].meetings[0].bldg); //// arrival  Building
                let endBuilding = data.schools[0].departments[0].courses[0].sections[0].meetings[0].bldg;
            }).catch(e => {
                alert(`${arrivalDepartment} ${arrivalCourseNumber} is not available please try again!`)
            })
    } catch (error) {
        alert(`One of the courses you chose is not available, please select again.`)
    }
});


// [FETCH = based on Course Code]
// this is just hard coded for time being.
// let courseCode = 35660;
// //let courseCode = int(prompt());
// let quarterTerm = "2023Fall";

// const requestOptions = {
//     method: "GET",

// }

// fetch(`https://api.peterportal.org/rest/v0/schedule/soc?term=${quarterTerm}&sectionCodes=${courseCode}`, requestOptions)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response error.');
//         }
//         return response.json(); 
//     })

//     .then(data => {
//         retrievedData = data;
//         const grabSpecificBuilding = retrievedData.schools[0].departments[0].courses[0].sections[0].meetings[0].bldg;
//         console.log("Building: " + grabSpecificBuilding);
//     })


// Hardcode


const UCIBuildings = require('./script.js');

let irvineSuffix = "Irvine CA"
    //D ELEET LATER

const buildingContentsStart = startBuilding.split(" ");
const buildingContentsEnd = endBuilding.split(" ");


// This grabs the first index: EX: SSL 1200 = SSL
let specifiedBuildingStart = buildingContentsStart[0];
let specifiedBuildingEnd = buildingContentsEnd[0];


// Check for start buildings (DEPART)
if (specifiedBuildingStart in UCIBuildings) {

    startBuildingDestination = UCIBuildings[specifiedBuildingStart] + " " + irvineSuffix;

    startBuldingDestination = startBuildingDestination.replace(/ /g, "%20");
    //return startBuildingDestination;
    console.log(startBuildingDestination)
}


// Check for end buildings (ARRIVAL)
if (specifiedBuildingEnd in UCIBuildings) {

    endBuildingDestination = UCIBuildings[specifiedBuildingEnd] + " " + irvineSuffix;

    endBuldingDestination = endBuildingDestination.replace(/ /g, "%20");
    //return endBuildingDestination;
    console.log(endBuildingDestination)
}



//GEOCODE add await
fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=$(buildingDestination)&key=AIzaSyDr0z0C-1w5yxssvIn9_1gJHPmAnY_fMmI`);
    then(response => {
        if (!response.ok) {
            throw new Error('Network response error.');
        }

        return response.json();
    })