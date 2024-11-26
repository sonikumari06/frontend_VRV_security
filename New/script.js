let users = [];
let roles = [];

function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

function saveRole() {
  const roleName = document.getElementById('roleName').value.trim();
  const permissions = Array.from(document.querySelectorAll('#permissionsOptions input:checked')).map(
    (input) => input.value
  );

  if (!roleName || permissions.length === 0) {
    alert('Please provide a role name and at least one permission.');
    return;
  }

  roles.push({ name: roleName, permissions });
  updateRolesTable();
  updateUserRoleDropdown();
  closeModal('roleModal');
  alert(`Role "${roleName}" saved successfully!`);
}

function updateRolesTable() {
  const rolesTableBody = document.querySelector('#rolesTable tbody');
  rolesTableBody.innerHTML = '';
  roles.forEach((role, index) => {
    rolesTableBody.innerHTML += `
      <tr>
        <td>${role.name}</td>
        <td>${role.permissions.join(', ')}</td>
        <td><button onclick="deleteRole(${index})">Delete</button></td>
      </tr>`;
  });
}

function updateUserRoleDropdown() {
  const userRoleSelect = document.getElementById('userRole');
  userRoleSelect.innerHTML = '<option value="">Select Role</option>';
  roles.forEach((role) => {
    userRoleSelect.innerHTML += `<option value="${role.name}">${role.name}</option>`;
  });
}

function saveUser() {
  const userName = document.getElementById('userName').value.trim();
  const userEmail = document.getElementById('userEmail').value.trim();
  const userRole = document.getElementById('userRole').value;
  const permissions = Array.from(document.querySelectorAll('#userPermissions input:checked')).map(
    (input) => input.value
  );
  const userStatus = document.getElementById('userStatus').value;

  if (!userName || !userEmail || !userRole || permissions.length === 0) {
    alert('Please fill in all fields and select at least one permission.');
    return;
  }

  users.push({ name: userName, email: userEmail, role: userRole, permissions, status: userStatus });
  updateUsersTable();
  closeModal('userModal');
  alert(`User "${userName}" saved successfully!`);
}


function updateUsersTable() {
  const usersTableBody = document.querySelector('#usersTable tbody');
  usersTableBody.innerHTML = '';
  users.forEach((user, index) => {
    usersTableBody.innerHTML += `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${user.status}</td>
        <td><button onclick="deleteUser(${index})">Delete</button></td>
      </tr>`;
  });
}

function deleteRole(index) {
  roles.splice(index, 1);
  updateRolesTable();
  updateUserRoleDropdown();
}

function deleteUser(index) {
  users.splice(index, 1);
  updateUsersTable();
}
