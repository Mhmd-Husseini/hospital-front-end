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

const employeeSelect = document.getElementById("employee");
const hospitalCheckboxes = document.querySelectorAll(".hospital-checkbox");
const assignEmployeeButton = document.getElementById("assign-btn");
assignEmployeeButton.addEventListener("click", assignEmployee);

axios
  .get("http://localhost/hospital-back-end/get_employees.php")
  .then((response) => {
    const employees = response.data;
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
      const selectedHospitals = Array.from(hospitalCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);
  
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
  
  axios.get("http://localhost/hospital-back-end/get_employees.php")
  .then((response) => {
    const employees = response.data;
    const numFemaleEmployees = employees.reduce((acc, curr) => {
      return curr.gender === "female" ? acc + 1 : acc;
    }, 0);
    const female=document.querySelector("#female");
    female.textContent= ` ${numFemaleEmployees}`;
  })
  .catch((error) => {
    console.error(error);
    alert("Error fetching employee data");
  });
  axios.get("http://localhost/hospital-back-end/get_employees.php")
  .then((response) => {
    const employees = response.data;
    const nummaleEmployees = employees.reduce((acc, curr) => {
      return curr.gender === "male" ? acc + 1 : acc;
    }, 0);
    const male= document.querySelector("#male");
    male.textContent= ` ${nummaleEmployees}`;
  })
  .catch((error) => {
    console.error(error);
    alert("Error fetching employee data");
  });