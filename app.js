$(document).ready(onReady)

let employeesArray = []

function onReady() {
    $('#application').on('submit', addEmployee)

    $(document).on('click', '.deleteButton', deleteEmployee)

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

    totalMonthly();
    render();

    $('#application input').val('')
}

function deleteEmployee() {
    console.log('hello')
    let employeeIndex = $(this).parent().parent().index();
    console.log(employeeIndex)
    employeesArray.splice(employeeIndex, 1)

    render()
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

    $('#totalMonthly').append(`
        <h2>Total Monthly: $ ${totalMonthly()}
    `)
}