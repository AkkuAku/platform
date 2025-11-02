import React, { useState } from "react";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  const [patientInfo, setPatientInfo] = useState({
    fullName: localStorage.getItem("patientName") || "Пациент",
    username: localStorage.getItem("username") || "Пациент",
    role: localStorage.getItem("role") || "patient",
    age: 30, 
    patientId: 12345,
  });

  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [doctor, setDoctor] = useState(null);
  const [showDetails, setShowDetails] = useState(false); 

  const doctors = [
    { 
      id: 1,
      username: "doctor1", 
      password: "123", 
      firstName: "Иван", 
      middleName: "Иванович", 
      lastName: "Иванов",
      specialization: "Терапевт",
      experience: 10,
      phone: "+7 (700) 123-45-67",
      email: "ivan.ivanov@hospital.kz"
    },
    { 
      id: 2,
      username: "doctor2", 
      password: "123", 
      firstName: "Мария", 
      middleName: "Алексеевна", 
      lastName: "Петрова",
      specialization: "Кардиолог",
      experience: 8,
      phone: "+7 (701) 765-43-21",
      email: "maria.petrova@hospital.kz"
    }
  ];

  const handleSelectDoctor = () => {
    const selected = doctors.find((d) => d.id === parseInt(selectedDoctorId));
    if (selected) {
      setDoctor(selected);
      setShowDetails(false); 
    } else {
      alert("Введите корректный ID врача");
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails); 
  };

  return (
    <div className="dashboard-container">
      <h2>Личный кабинет пациента</h2>
      <div className="patient-info">
        <h3>Информация о пациенте</h3>
        <p><strong>ФИО:</strong> {patientInfo.fullName}</p>
        <p><strong>Логин:</strong> {patientInfo.username}</p>
        <p><strong>Роль:</strong> {patientInfo.role}</p>
        <p><strong>ID пациента:</strong> {patientInfo.patientId}</p>
        <p><strong>Возраст:</strong> {patientInfo.age}</p>
      </div>

      
      <div className="select-doctor">
        <input
          type="number"
          placeholder="Введите ID врача"
          value={selectedDoctorId}
          onChange={(e) => setSelectedDoctorId(e.target.value)}
        />
        <button onClick={handleSelectDoctor}>Найти врача</button>
      </div>

      
      {doctor && (
        <div className="doctor-info">
          <p onClick={toggleDetails} style={{ cursor: "pointer", fontWeight: "bold" }}>
            {doctor.lastName} {doctor.firstName} {doctor.middleName} {showDetails ? "▲" : "▼"}
          </p>

          {showDetails && (
            <div className="doctor-details">
              <p><strong>Специализация:</strong> {doctor.specialization}</p>
              <p><strong>Стаж работы:</strong> {doctor.experience} лет</p>
              <p><strong>Телефон:</strong> {doctor.phone}</p>
              <p><strong>Email:</strong> {doctor.email}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;


