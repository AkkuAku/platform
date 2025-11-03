import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [role, setRole] = useState("patient");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const patients = [
    { 
      id: 101, 
      username: "patient1", 
      password: "123", 
      firstName: "Алексей", 
      middleName: "Иванович", 
      lastName: "Сидоров",
      age: 28,
      phone: "+7 (701) 111-22-33"
    },
    { 
      id: 102, 
      username: "patient2", 
      password: "123", 
      firstName: "Ольга", 
      middleName: "Алексеевна", 
      lastName: "Кузнецова",
      age: 35,
      phone: "+7 (702) 222-33-44"
    },
    { 
      id: 103, 
      username: "patient3", 
      password: "123", 
      firstName: "Мария", 
      middleName: "Павловна", 
      lastName: "Иванова",
      age: 42,
      phone: "+7 (777) 333-44-55"
    },
  ];

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

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === "patient") {
      const foundPatient = patients.find(
        (p) => p.username === username && p.password === password
      );

      if (foundPatient) {
        localStorage.setItem("role", "patient");
        localStorage.setItem("username", foundPatient.username);
        localStorage.setItem("patientId", foundPatient.id);
        localStorage.setItem(
          "patientName",
          `${foundPatient.firstName} ${foundPatient.middleName} ${foundPatient.lastName}`
        );
        localStorage.setItem("patientAge", foundPatient.age);
        localStorage.setItem("patientPhone", foundPatient.phone);

        navigate("/patient");
        return;
      }
    }

    if (role === "doctor") {
      const foundDoctor = doctors.find(
        (d) => d.username === username && d.password === password
      );

      if (foundDoctor) {
        localStorage.setItem("role", "doctor");
        localStorage.setItem("username", foundDoctor.username);
        localStorage.setItem(
          "doctorName",
          `${foundDoctor.firstName} ${foundDoctor.middleName} ${foundDoctor.lastName}`
        );
        localStorage.setItem("doctorSpecialization", foundDoctor.specialization);
        localStorage.setItem("doctorExperience", foundDoctor.experience);
        localStorage.setItem("doctorPhone", foundDoctor.phone);
        localStorage.setItem("doctorEmail", foundDoctor.email);
        localStorage.setItem("doctorId", foundDoctor.id);

        navigate("/doctor");
        return;
      }
    }

    alert("❌ Неверный логин или пароль");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Вход в систему</h2>

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="patient">Пациент</option>
          <option value="doctor">Врач</option>
        </select>

        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
