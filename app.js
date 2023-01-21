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

    render();
}

function deleteEmployee() {
    let employeeIndexToRemove = $(this).parent().parent().index();
    employeesArray.splice(employeeIndexToRemove, 1)

    employeeIndex = undefined

    render()
}

function editEmployee() {
    employeeIndex = $(this).parent().parent().index();
    render()
}

function cancelEditedEmployee(){
    employeeIndex = undefined;
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

    totalMonthly();
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
                <tr>
                    <td><input id='editFirstName' type='text' value='${employeesArray[employeeIndex].firstName}'/></td>
                    <td><input id='editLastName' type='text' value='${employeesArray[employeeIndex].lastName}'/></td>
                    <td><input id='editId' type='number' value='${employeesArray[employeeIndex].id}'/></td>
                    <td><input id='editJobTitle' type='text' value='${employeesArray[employeeIndex].jobTitle}'/></td>
                    <td><input id='editAnnualSalary' type='number' value='${employeesArray[employeeIndex].annualSalary}'/></td>
                    <td><button class='cancelButton'>Cancel</button></td>
                    <td><button class='addButton'>Add</button></td>
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
                <td><button class='editButton'>Edit</button></td>
                <td><button class='deleteButton'>Delete</button></td>
            </tr>
            `)
        }
    }  

    $('#totalMonthly').append(`
        <h2>Total Monthly: $ ${totalMonthly()}
    `)

    $('#application input').val('')
}