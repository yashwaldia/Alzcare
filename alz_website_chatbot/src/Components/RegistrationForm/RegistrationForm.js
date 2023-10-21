import React, { useState } from 'react';
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    emergencyNumber: '',
    familymem: '',
    impmemory: '',
    age: '',
    medhistory: '',
    dailymed: '',
    perpre: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here[], e.g., send data to the server
    console.log('Form data submitted:', formData);
    const firstText = `Hello, my name is ${formData.name}, and I'm completing this form to ensure that my essential details are readily available when needed. In case of an emergency, you can reach me at ${formData.emergencyNumber}. I am ${formData.age} years old. My family members are ${formData.familymem}. One important memory I'd like to share is ${formData.impmemory}. Regarding my health, my medical history includes ${formData.medhistory}, and I take ${formData.dailymed} as part of my daily routine. In terms of personal preferences, I enjoy ${formData.perpre}. I hope that by providing this information, I can receive the best possible care and support as needed.`;
    const response = await fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: firstText })
      });
      console.log("response",response);
  };

  return (
    <div class="box">
      <div class="rbox">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder='Patient name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Emergency Number:</label>
          <input
            type="number"
            name="emergencyNumber"
            placeholder='Emergency Number'
            value={formData.emergencyNumber}
            onChange={handleChange}
            required maxLength={10} minLength={10}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="text"
            placeholder='Patient Age'
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Family Members Info:</label>
          <input
            type="paragraph"
            name="familymem"
            placeholder='Family Members Info'
            value={formData.familymem}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Home Address:</label>
          <input
            type="text"
            placeholder='Patient Address'
            name="homeaddress"
            value={formData.homeaddress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Important Memory:</label>
          <input
            type="text"
            placeholder='Important Memory'
            name="impmemory"
            value={formData.impmemory}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label>Medical History:</label>
          <input
            type="text"
            placeholder='Patient Medical History.'
            name="medhistory"
            value={formData.medhistory}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Daily Medication:</label>
          <input
            type="text"
            name="dailymed"
            placeholder='Medications Details (if any).'
            value={formData.dailymed}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Personal Preferences:</label>
          <input
            type="text"
            placeholder='Personal preferences such as favorite music, tv shows, activities, etc.'
            name="perpre"
            value={formData.perpre}
            onChange={handleChange}
          />
        </div>
        <div class="submit">
            <button type="submit">Submit</button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
