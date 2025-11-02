import React, { useState } from "react";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const patientsData = {
    doctor1: [
      { id: 101, name: "Алексей Сидоров", age: 30, diagnosis: "Грипп", phone: "+7 700 111-22-33" },
      { id: 102, name: "Ольга Кузнецова", age: 25, diagnosis: "Аллергия", phone: "+7 701 222-33-44" },
    ],
    doctor2: [
      { id: 103, name: "Мария Иванова", age: 40, diagnosis: "Гипертония", phone: "+7 702 333-44-55" },
      { id: 104, name: "Дмитрий Петров", age: 35, diagnosis: "Диабет", phone: "+7 703 444-55-66" },
    ],
  };

  const [filterId, setFilterId] = useState(""); 
  const [selectedPatient, setSelectedPatient] = useState(null); 


  const username = localStorage.getItem("username") || "";
  const doctorName = localStorage.getItem("doctorName") || "";
  const specialization = localStorage.getItem("doctorSpecialization") || "";
  const experience = localStorage.getItem("doctorExperience") || "";
  const phone = localStorage.getItem("doctorPhone") || "";
  const email = localStorage.getItem("doctorEmail") || "";

 
  const patients = patientsData[username] || [];

  
  const filteredPatients = patients.filter((p) =>
    p.id.toString().includes(filterId)
  );

  return (
    <div className="doctor-dashboard-container">
      <h2>Личный кабинет врача</h2>

      <div className="doctor-info">
        <h3>Информация о враче</h3>
        <p><strong>Имя:</strong> {doctorName}</p>
        <p><strong>Логин:</strong> {username}</p>
        <p><strong>Специализация:</strong> {specialization}</p>
        <p><strong>Опыт:</strong> {experience} лет</p>
        <p><strong>Телефон:</strong> {phone}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>

      <div className="patients-list">
        <h3>Пациенты</h3>
        <input
          type="number"
          placeholder="Поиск по ID пациента..."
          value={filterId}
          onChange={(e) => setFilterId(e.target.value)}
          className="patient-filter"
        />

        <ul>
          {filteredPatients.length === 0 ? (
            <li>Пациенты не найдены</li>
          ) : (
            filteredPatients.map((p) => (
              <li key={p.id} onClick={() => setSelectedPatient(p)} style={{ cursor: "pointer" }}>
                {p.name} (ID: {p.id})
              </li>
            ))
          )}
        </ul>
      </div>

      {selectedPatient && (
        <div className="patient-details">
          <h3>Детали пациента</h3>
          <p><strong>Имя:</strong> {selectedPatient.name}</p>
          <p><strong>ID:</strong> {selectedPatient.id}</p>
          <p><strong>Возраст:</strong> {selectedPatient.age}</p>
          <p><strong>Диагноз:</strong> {selectedPatient.diagnosis}</p>
          <p><strong>Телефон:</strong> {selectedPatient.phone}</p>
          <button onClick={() => setSelectedPatient(null)}>Закрыть</button>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;



