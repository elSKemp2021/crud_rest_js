$(document).ready(function () {
    getActiveUser();
    getAllUsers();
});

function getActiveUser() {
    fetch('http://localhost:8080/admin/getActiveUser')
        .then((response) => response.json())
        .then((user) => {
            document.getElementById('activeUserUsername').textContent = user.username;
            document.getElementById('activeUserRoles').textContent = user.rolename;
        });
}

function getAllUsers() {
    fetch('http://localhost:8080/admin/user')
        .then((response) => response.json())
        .then((usersTable) => {
            usersTable.forEach(user => {
                let table = '<tr>' +
                    "<td>" + user.id + "</td>" +
                    "<td>" + user.name + "</td>" +
                    "<td>" + user.lastname + "</td>" +
                    "<td>" + user.age + "</td>" +
                    "<td>" + user.email + "</td>" +
                    "<td>" + user.username + "</td>" +
                    "<td>" + user.rolename + "</td>" +
                    '<td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#editUser"' +
                    ' onclick="editUser(' + user.id + ')" id="btnEdit">Edit</button></td>' +
                    '<td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteUser"' +
                    ' onclick="deleteUser(' + user.id + ')" id="btnDelete">Delete</button></td>'
                document.getElementById("allUsers").innerHTML += table
            });
        });
}

function addNewUser() {
    let addUserForm = document.forms['addUserForm']
    fetch('http://localhost:8080/admin/user', {
        method: 'POST',
        body: JSON.stringify({
            name: addUserForm.name.value,
            lastname: addUserForm.lastname.value,
            age: addUserForm.age.value,
            email: addUserForm.email.value,
            password: addUserForm.password.value,
            role_id: addUserForm.role_id.value
        })
    });
}

function editUser(id) {
    let closeButton = document.getElementById("closeButtonInEditUserForm");
    let editButton = document.getElementById("editButtonInEditUserForm");
    let editUser = document.getElementById("editUser");
    let closeButtonHeader = document.getElementById("closeButtonInEditHeader");
    let editUserForm = document.forms['editUserForm']

    fetch('http://localhost:8080/admin/user/' + id)
        .then(response => response.json())
        .then((user) => {
            $('#editUserId').val(user.id)
            $('#editUserName').val(user.name)
            $('#editUserLastname').val(user.lastname)
            $('#editUserAge').val(user.age)
            $('#editUserEmail').val(user.email)
            $('#editUserUsername').val(user.username)
        });

    editButton.onclick = function () {
        fetch('http://localhost:8080/admin/user/' + id)
            .then(response => response.json())
            .then((user) => {
                fetch('http://localhost:8080/admin/user/' + id, {
                    method: 'PUT',
                    body: JSON.stringify({
                        name: editUserForm.name.value,
                        lastname: editUserForm.lastname.value,
                        age: editUserForm.age.value,
                        email: editUserForm.email.value,
                        password: editUserForm.user.password,
                        role_id: editUserForm.role_id.value
                    })
                });
            });
    }

    closeButtonHeader.onclick = function () {
        editUser.style.display = "none";
    }

    closeButton.onclick = function () {
        editUser.style.display = "none";
    }
    
    window.onclick = function (event) {
        if (event.target == deleteUser) {
            deleteUser.style.display = "none";
        }
    }
}

function deleteUser(id) {
    let closeButton = document.getElementById("closeButtonInDeleteUserForm");
    let deleteButton = document.getElementById("deleteButtonInDeleteUserForm");
    let deleteUser = document.getElementById("deleteUser");
    let closeButtonHeader = document.getElementById("closeButtonInDeleteHeader");

    fetch('http://localhost:8080/admin/user/' + id)
        .then(response => response.json())
        .then((user) => {
            $('#deleteUserId').val(user.id)
            $('#deleteUserName').val(user.name)
            $('#deleteUserLastname').val(user.lastname)
            $('#deleteUserAge').val(user.age)
            $('#deleteUserEmail').val(user.email)
            $('#deleteUserUsername').val(user.username)
        });

    deleteButton.onclick = function () {
        fetch('http://localhost:8080/admin/user/' + id, {
            method: 'DELETE'
        });
    }

    closeButton.onclick = function () {
        deleteUser.style.display = "none";
    }

    closeButtonHeader.onclick = function () {
        deleteUser.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == deleteUser) {
            deleteUser.style.display = "none";
        }
    }
}