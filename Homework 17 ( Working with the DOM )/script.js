function addCustomer() {
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var address = document.getElementById("address").value;

    var tbody = document.getElementById("body");
    var row = document.createElement('tr');

    tbody.append(row);

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    row.append(td1,td2,td3);

    td1.innerText = firstName; 
    td2.innerText = lastName;
    td3.innerText = address;
}

function deleteCustomer() {
    var content = document.getElementById("body");
    var rows = content.rows.length;
    content.deleteRow(rows - 1);
}