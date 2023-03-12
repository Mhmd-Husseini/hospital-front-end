const patientDropdown = document.getElementById('patient');
const hospitalDropdown = document.getElementById('hospital');
const assignButton = document.getElementById('assign-patient');

axios.get('http://localhost/hospital-back-end/get_patients.php')
  .then(response => {
    response.data.forEach(patient => {
      const option = document.createElement('option');
      option.text = patient.user_name;
      option.value = patient.id;
      patientDropdown.add(option);
    });
  })
  .catch(error => {
    console.error(error);
  });


axios.get('http://localhost/hospital-back-end/get_hospitals.php')
    .then(response => {
        response.data.forEach(hospital => {
            const option = document.createElement('option');
            option.text = hospital.name;
            option.value = hospital.id;
            hospitalDropdown.add(option);
        });
    })
    .catch(error => {
        console.error(error);
    });

assignButton.addEventListener('click', () => {
    const patientId = patientDropdown.value;
    const hospitalId = hospitalDropdown.value;

    axios.post('assign_patient.php', { patient_id: patientId, hospital_id: hospitalId })
        .then(response => {
            console.log(response.data);
            alert('Patient assigned successfully!');
        })
        .catch(error => {
            console.error(error);
            alert('Error assigning patient. Please try again later.');
        });
});

// Assign Employee Page

// Get the select elements for employee and hospitals
const employeeSelect = document.getElementById("employee");
const hospitalCheckboxes = document.querySelectorAll(".hospital-checkbox");

// Get the button to assign employee
const assignEmployeeButton = document.getElementById("assign-btn");

// Add event listener to assignEmployeeButton
assignEmployeeButton.addEventListener("click", assignEmployee);

// Function to assign employee to selected hospitals

// Fetch the list of employees from the API endpoint
axios
  .get("http://localhost/hospital-back-end/get_employees.php")
  .then((response) => {
    const employees = response.data;
    // Add each employee as an option to the select element
    employees.forEach((employee) => {
      const option = document.createElement("option");
      option.value = employee.id;
      option.textContent = employee.user_name;
      employeeSelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error(error);
    alert("Error fetching employees");
  });

axios
  .get("http://localhost/hospital-back-end/get_hospitals.php")
  .then((response) => {
    const hospitals = response.data;
    hospitals.forEach((hospital) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = hospital.id;
      checkbox.className = "hospital-checkbox";
      const label = document.createElement("label");
      label.textContent = hospital.name;
      label.prepend(checkbox);
      const form = document.getElementById("assign-form");
      form.insertBefore(label, form.lastChild);
    });
  })
  .catch((error) => {
    console.error(error);
    alert("Error fetching hospitals");
  });

  function assignEmployee() {
    const employeeId = employeeSelect.value;
  
    // Get an array of the selected hospitals
    const selectedHospitals = Array.from(hospitalCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
  
    // Send the data to the API endpoint
    axios
      .post("api/assign_employee.php", {
        employeeId: employeeId,
        selectedHospitals: selectedHospitals,
      })
      .then((response) => {
        console.log(response);
        alert("Employee assigned successfully");
      })
      .catch((error) => {
        console.error(error);
        alert("Error assigning employee");
      });
  }
  