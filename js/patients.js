const departmentDropdown = document.getElementById('department');
const roomDropdown = document.getElementById('room');
const bedDropdown = document.getElementById('bed');
const assignButton = document.getElementById('choose-room');

axios.get('http://localhost/hospital-back-end/get_department_room_bed.php')
  .then(response => {
    response.data.forEach(patient => {{
      const option = document.createElement('option');
      option.text = patient.depname;
      option.value = patient.depid;
      departmentDropdown.add(option);}
      {const option = document.createElement('option');
      option.text = patient.number;
      option.value = patient.number;
      departmentDropdown.add(option);}
      {if (patient.Number_beds>1) {
        const option = document.createElement('option');
      option.text = patient.bedid;
      option.value = patient.bedid;
      departmentDropdown.add(option);}}
    });
  })
  .catch(error => {
    console.error(error);
  });

  const assignnButton = document.getElementById('choose-room');
assignnButton.addEventListener('click', (event) => {
  event.preventDefault();

  const departmentDropdown = document.getElementById('department');
  const roomDropdown = document.getElementById('room');
  const bedDropdown = document.getElementById('bed');
  const departmentId = departmentDropdown.value;
  const roomId = roomDropdown.value;
  const bedId = bedDropdown.value;

  axios.post('http://localhost/hospital-back-end/patient_reserve.php', {
      patient_id: patientId,
      department_id: departmentId,
      room_id: roomId,
      bed_id: bedId
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
});

axios
  .get("http://localhost/hospital-back-end/get_medications.php")
  .then((response) => {
    const medications = response.data;
    medications.forEach((medication) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = medication.id;
      checkbox.className = "hospital-checkbox";
      const label = document.createElement("label");
      label.textContent = medication.name;
      label.prepend(checkbox);
      const form = document.getElementById("reserve_medication");
      form.insertBefore(label, form.lastChild);
    });
  })
  .catch((error) => {
    console.error(error);
    alert("Error fetching hospitals");
  });
  
  axios.post('http://localhost/hospital-back-end/medication_reserve.php', { 
    user_id: userId, medication_id: medicationId, quantity: quaantity })
      .then(response => {
          console.log(response.data);
          alert('Patient assigned successfully!');
      })
      .catch(error => {
          console.error(error);
          alert('Error assigning patient. Please try again later.');
      });
