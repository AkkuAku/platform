import React, { useState, useEffect } from "react";
import "./DoctorDashboard.css";

const DoctorDashboard = () => {
  const [filterId, setFilterId] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);

  
  const username = localStorage.getItem("username") || "";
  const doctorName = localStorage.getItem("doctorName") || "";
  const specialization = localStorage.getItem("doctorSpecialization") || "";
  const experience = localStorage.getItem("doctorExperience") || "";
  const phone = localStorage.getItem("doctorPhone") || "";
  const email = localStorage.getItem("doctorEmail") || "";


  const doctorId =
    username === "doctor1" ? 1 : username === "doctor2" ? 2 : null;

  
  useEffect(() => {
    if (doctorId) {
      fetch(`http://localhost:5000/api/doctor/${doctorId}/patients`)
        .then((res) => res.json())
        .then((data) => setPatients(data))
        .catch((err) => console.error("Ошибка загрузки пациентов:", err));
    }
  }, [doctorId]);

  
  const filteredPatients = patients.filter((p) =>
    p.id.toString().includes(filterId)
  );

  return (
    <div className="doctor-dashboard-container">
      <h2>Личный кабинет врача</h2>

      <div className="doctor-info">
        <h3>Информация о враче</h3>
        <p>
          <strong>Имя:</strong> {doctorName}
        </p>
        <p>
          <strong>Логин:</strong> {username}
        </p>
        <p>
          <strong>Специализация:</strong> {specialization}
        </p>
        <p>
          <strong>Опыт:</strong> {experience} лет
        </p>
        <p>
          <strong>Телефон:</strong> {phone}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>

      <div className="patients-list">
        <h3>Прикреплённые пациенты</h3>
        <input
          type="number"
          placeholder="Поиск по ID пациента..."
          value={filterId}
          onChange={(e) => setFilterId(e.target.value)}
          className="patient-filter"
        />

        <ul>
          {filteredPatients.length === 0 ? (
            <li>Пока нет прикреплённых пациентов</li>
          ) : (
            filteredPatients.map((p) => (
              <li
                key={p.id}
                onClick={() => setSelectedPatient(p)}
                style={{ cursor: "pointer" }}
              >
                {p.fullName || p.name} (ID: {p.id})
              </li>
            ))
          )}
        </ul>
      </div>

      {selectedPatient && (
        <div className="patient-details">
          <h3>Детали пациента</h3>
          <p>
            <strong>Имя:</strong> {selectedPatient.fullName || selectedPatient.name}
          </p>
          <p>
            <strong>ID:</strong> {selectedPatient.id}
          </p>
         
          <button onClick={() => setSelectedPatient(null)}>Закрыть</button>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
