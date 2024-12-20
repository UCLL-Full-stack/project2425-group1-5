import AppointmentService from "@/services/AppointmentService";
import { Appointment } from "@/types";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";


type Props = {
    appointments: Array<Appointment>;
    selectAppointment : (appointment: Appointment) => void;
    deleteAppointment : (appointmentId : string) => void;

};

const AppointmentOverview: React.FC<Props> = ({ appointments, selectAppointment}: Props) => {
    const [errors, setErrors] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const { t } = useTranslation();




    const handleDelete = async(event: React.FormEvent, appointmentId : string) =>{
        event.preventDefault();
    
        const response = await AppointmentService.deleteAppointment(appointmentId);
    
        if (!response.ok) {
            setErrors("Failed to cancel the appointments. Please try again.");
          } else {
            setStatus('Appointment is cancelled successfully.');
          }
    
    }

    


    return (
        <>
            <Link href="/upcomingAppointments">
                <button className="filter-appointment-btn rounded px-4 py-2">
                    {/* Filter Upcoming Appointments */}
                    {t('login.appointments.filter')}

                </button>
            </Link>

            {appointments && appointments.length > 0 ? (
                <table className="table table-hover">
                    <thead className="bg-gray-100">
                        <tr>
                            <th scope="col">
                            {t('login.appointments.start_time')}
                            </th>
                            <th scope="col">
                            {t('login.appointments.end_time')}
                            </th>
                            <th scope="col">
                            {t('login.appointments.status')}
                            </th>
                            <th scope="col">
                            {t('login.appointments.date')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr
                                key={index}
                                onClick={() => selectAppointment(appointment)}
                                role="button"
                            >
                                <td>{new Date(appointment.start_time).toLocaleString()}</td>
                                <td>{new Date(appointment.end_time).toLocaleString()}</td>
                                <td>{appointment.status}</td>
                                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                                <td>
                                    <Link href={`/appointments/update/${appointment.id}`}>
                                    <button className="schedule-appointment-btn rounded px-4 py-2">
                                    {t('login.appointments.reschedule')}
                                    </button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className="delete-appointment-btn rounded px-4 py-2"
                                        onClick={(e) => handleDelete(e, String(appointment.id))}
                                    >
                                    {t('login.appointments.delete')}

                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No appointments available.</p>
            )}
        </>
    );
};

export default AppointmentOverview;