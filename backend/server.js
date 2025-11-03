import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());


let doctors = [
  { id: 1, username: "doctor1", firstName: "Иван", lastName: "Иванов" },
  { id: 2, username: "doctor2", firstName: "Мария", lastName: "Петрова" },
];


let patients = [
  { id: 101, username: "patient1", fullName: "Алексей Сидоров", doctorId: null },
  { id: 102, username: "patient2", fullName: "Ольга Кузнецова", doctorId: null },
  { id: 103, username: "patient3", fullName: "Мария Иванова", doctorId: null },
];


app.post("/api/attach", (req, res) => {
  const { patientId, doctorId } = req.body;
  const patient = patients.find((p) => p.id === patientId);
  const doctor = doctors.find((d) => d.id === doctorId);

  if (!patient || !doctor) {
    return res.status(404).json({ message: "Врач или пациент не найден" });
  }

  patient.doctorId = doctorId;
  res.json({ message: `Пациент ${patient.fullName} прикреплён к врачу ${doctor.lastName}` });
});


app.get("/api/doctor/:id/patients", (req, res) => {
  const doctorId = parseInt(req.params.id);
  const doctorPatients = patients.filter((p) => p.doctorId === doctorId);
  res.json(doctorPatients);
});


app.get("/api/doctors", (req, res) => res.json(doctors));


app.get("/api/patients", (req, res) => res.json(patients));

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

