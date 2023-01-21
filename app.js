console.log('JavaScript')

$(document).ready(onReady)

function onReady() {
    console.log('JQuery')

    $('#application').on('submit', addEmployee)

    render()
}

let employeesArray = []

function addEmployee(event)  {
    event.preventDefault();


    console.log('addEmployee')

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

    $('#firstNameInput').val(''),
    $('#lastNameInput').val(''),
    $('#idNumberInput').val(''),
    $('#jobTitleInput').val(''),
    $('#annualSalaryInput').val('')
    
}

function totalMonthly() {
    let total = 0;

    for(let employee of employeesArray) {
        total += Number(employee.annualSalary);
    }

    total /= 12;

    if(total > 20000) {
        $('#totalMonthly').css('background-color', '#FF4C4C')
    }

    return total
}

function render() {
    console.log('render:')
    console.log(totalMonthly())

    $('#employee-table').empty()
    $('#totalMonthly').empty()

    for(let employee of employeesArray) {
        $('#employee-table').append(`
        <tr>
            <th>${employee.firstName}</th>
            <th>${employee.lastName}</th>
            <th>${employee.id}</th>
            <th>${employee.jobTitle}</th>
            <th>${employee.annualSalary}</th>
            <th><button>Delete</button></th>
        </tr>
        `)
    }

    $('#totalMonthly').append(`
        <h2>Total Monthly: $ ${totalMonthly()}
    `)
}