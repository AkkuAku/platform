import React, { useState } from "react";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [doctor, setDoctor] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const patientInfo = {
    fullName: localStorage.getItem("patientName") || "Пациент",
    username: localStorage.getItem("username") || "patient",
    role: localStorage.getItem("role") || "patient",
    patientId: parseInt(localStorage.getItem("patientId")) || 0,
  };

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

  
  const handleAttach = async () => {
    if (!doctor) {
      alert("Сначала выберите врача!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/attach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: patientInfo.patientId,
          doctorId: doctor.id,
        }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Ошибка при прикреплении:", error);
      alert("Ошибка при прикреплении к врачу");
    }
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
          <p
            onClick={toggleDetails}
            style={{ cursor: "pointer", fontWeight: "bold" }}
          >
            {doctor.lastName} {doctor.firstName} {doctor.middleName}{" "}
            {showDetails ? "▲" : "▼"}
          </p>

          {showDetails && (
            <div className="doctor-details">
              <p><strong>Специализация:</strong> {doctor.specialization}</p>
              <p><strong>Стаж работы:</strong> {doctor.experience} лет</p>
              <p><strong>Телефон:</strong> {doctor.phone}</p>
              <p><strong>Email:</strong> {doctor.email}</p>
              <button onClick={handleAttach}>Прикрепиться к врачу</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
