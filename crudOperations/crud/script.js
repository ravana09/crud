const API_URL = 'http://localhost:3000/students';
const studentList = document.getElementById('studentList');
const studentForm = document.getElementById('studentForm');

async function fetchStudents() {
    try {
        const response = await fetch(API_URL);
        const students = await response.json();
        renderStudents(students);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderStudents(students) {
    studentList.innerHTML = '';
    students.forEach(student => {
        const studentElement = document.createElement('div');
        studentElement.innerHTML = `
            <p>Name: ${student.name}</p>
            <p>Email: ${student.email}</p>
            <p>Phone Number: ${student.phoneNumber}</p>
            <button onclick="deleteStudent('${student._id}')">Delete</button>
        `;
        studentList.appendChild(studentElement);
    });
}

async function addStudent() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const newStudent = { name, email, phoneNumber };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent)
        });
        fetchStudents();
        studentForm.reset();
    } catch (error) {
        console.error('Error adding student:', error);
    }
}

async function deleteStudent(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        fetchStudents();
    } catch (error) {
        console.error('Error deleting student:', error);
    }
}

studentForm.addEventListener('submit', event => {
    event.preventDefault();
    addStudent();
});

fetchStudents();




// render array of students card
function renderAllStudents(students) {
  students.forEach((student) => {
    renderStudents(student);
  });
}

studentForm.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.id == "add-btn") {
    const newStudent = {
      name: inputName.value,
      batch: inputBatch.value,
      age: inputAge.value,
    };
    createData(newStudent);
  }

  if (e.target.id == "update-btn") {
    const updatedStudent = {
      name: inputName.value,
      batch: inputBatch.value,
      age: inputAge.value,
    };
    updateData(updatedStudent);
  }
});

function populateStudentForm(parent) {
  const editableParent = parent.parentNode;
  inputName.value = editableParent.querySelector("h2").textContent;
  inputBatch.value = editableParent.querySelector("#batch-val").textContent;
  inputAge.value = editableParent.querySelector("#age-val").textContent;
  updateBtn.style.display = "block";
  addBtn.style.display = "none";
}

studentList.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  const parent = event.target.parentNode;
  if (event.target.id === "del-btn") {
    deleteData(id, parent);
  }
  if (event.target.id === "edit-btn") {
    populateStudentForm(parent);
    editId = id;
  }
});