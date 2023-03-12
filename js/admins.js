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
