$(document).ready(onReady)

let employeesArray = [
    {
        firstName: "Nolen",
        lastName: "Lawton",
        id: 8,
        jobTitle: "Hobo",
        annualSalary: 240000,
      },
]

let employeeIndex = undefined;

function onReady() {
    $('#application').on('submit', addEmployee)

    $(document).on('click', '.deleteButton', deleteEmployee)

    $(document).on('click', '.editButton', editEmployee)

    $(document).on('click', '.cancelButton', cancelEditedEmployee)

    $(document).on('click', '.addButton', addEditedEmployee)

    render()
}

function addEmployee(event) {
    event.preventDefault();

    let employee = {
        firstName: $('#firstNameInput').val(),
        lastName: $('#lastNameInput').val(),
        id: $('#idNumberInput').val(),
        jobTitle: $('#jobTitleInput').val(),
        annualSalary: $('#annualSalaryInput').val()
    }
    employeesArray.push(employee);
    
    playAddAudio()
    render();
}

function playAddAudio() {
    let audio = document.getElementById("audioAdd");
    audio.play();
}

function deleteEmployee() {
    let employeeIndexToRemove = $(this).parent().parent().index();
    employeesArray.splice(employeeIndexToRemove, 1)

    employeeIndex = undefined

    playRemoveAudio()
    render()
}

function playRemoveAudio() {
    let audio = document.getElementById("audioRemove");
    audio.play();
}

function editEmployee() {
    employeeIndex = $(this).parent().parent().index();

    playEditedAudio()
    render()
}

function playEditedAudio () {
    let audio = document.getElementById("audioEdit");
    audio.play();
}

function cancelEditedEmployee(){
    employeeIndex = undefined;
    playRemoveAudio()
    render()
}

function addEditedEmployee(){
    console.log('add')

    let editedEmployee = {
        firstName: $('#editFirstName').val(),
        lastName: $('#editLastName').val(),
        id: $('#editId').val(),
        jobTitle: $('#editJobTitle').val(),
        annualSalary: $('#editAnnualSalary').val()
    }
    employeesArray.splice(employeeIndex, 1, editedEmployee);
    employeeIndex = undefined

    playAddAudio();
    render();
}

function totalMonthly() {
    let total = 0;

    for(let employee of employeesArray) {
        total += Number(employee.annualSalary);
    }

    let monthlyTotal = total /= 12;

    return monthlyTotal
}

function render() {
    if(totalMonthly() > 20000) {
        $('#totalMonthly').addClass('red-background');
    }
    else {
        $('#totalMonthly').removeClass('red-background');
    }

    $('#employee-table').empty()
    $('#totalMonthly').empty()


    for(let employee of employeesArray) {

        // edit employee row
        if(employeesArray.indexOf(employee) === employeeIndex) {
            $('#employee-table').append(`
                <tr id='editRow'>
                    <td><input id='editFirstName' type='text' value='${employeesArray[employeeIndex].firstName}'/></td>
                    <td><input id='editLastName' type='text' value='${employeesArray[employeeIndex].lastName}'/></td>
                    <td><input id='editId' type='number' value='${employeesArray[employeeIndex].id}'/></td>
                    <td><input id='editJobTitle' type='text' value='${employeesArray[employeeIndex].jobTitle}'/></td>
                    <td><input id='editAnnualSalary' type='number' value='${employeesArray[employeeIndex].annualSalary}'/></td>
                    <td class='buttonBox'><button class='cancelButton button'>Cancel</button></td>
                    <td class='buttonBox'><button class='addButton button'>Add</button></td>
                </tr>
            `)
        }

        // regular table row
        else {
            $('#employee-table').append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.id}</td>
                <td>${employee.jobTitle}</td>
                <td>${employee.annualSalary}</td>
                <td class='buttonBox'><button class='editButton button'>Edit</button></td>
                <td class='buttonBox'><button class='deleteButton button'>Delete</button></td>
            </tr>
            `)
        }
    }  

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    let usDollars = formatter.format(totalMonthly())

    $('#totalMonthly').append(`<h2>Total Monthly: ${usDollars}</h2>`)

    $('#application input').val('')
}