import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Appointment {
  id: string;
  patient_id: string;
  start_time: string;
  end_time: string;
  reason?: string;
  status?: string;
}

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/appointments`);
      setAppointments(res.data);
    } catch (err: any) {
      setError('Failed to load appointments');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ul className="space-y-2">
          {appointments.map(appt => (
            <li key={appt.id} className="p-4 bg-white rounded shadow flex flex-col">
              <span><b>Patient ID:</b> {appt.patient_id}</span>
              <span><b>Start:</b> {appt.start_time}</span>
              <span><b>End:</b> {appt.end_time}</span>
              <span><b>Reason:</b> {appt.reason}</span>
              <span><b>Status:</b> {appt.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AppointmentsPage; 