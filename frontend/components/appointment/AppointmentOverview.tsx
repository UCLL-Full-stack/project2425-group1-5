import { Appointment } from "@/types";
import Link from "next/link";

type Props = {
    appointments: Array<Appointment>;
    selectAppointment : (appointment: Appointment) => void;

};

const AppointmentOverview: React.FC<Props> = ({ appointments, selectAppointment}: Props) => {
    return (
        <>
            {appointments && (
                <table className="table table-hover" >
                    <thead className="bg-gray-100">
                        <tr>
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col" >Status</th>
                            <th scope="col" >Date</th>
                            {/* <th scope="col" className="border border-gray-300 px-0 py-2">Doctor Id</th>
                            <th scope="col" className="border border-gray-300 px-0 py-2">Doctor Name</th>
                            <th scope="col" className="border border-gray-300 px-0 py-2">Doctor Email</th>
                            <th scope="col" className="border border-gray-300 px-0 py-2">Doctor Password</th>
                            <th scope="col" className="border border-gray-300 px-0 py-2">Doctor Role</th>
                            <th scope="col" className="border border-gray-300 px-0 py-2">Doctor Speciality</th>
                            <th scope="col" className="border border-gray-300 px-0 py-2">Doctor Availability</th>
                            <th scope="col" className="border border-gray-300 px-0 py-2">Patient Id</th>
                            <th scope="col" className="border border-gray-300 px-0 py-2">Patient Name</th>
                            <th scope="col" className="border border-gray-300 px-0 py-2">Patient Email</th>
                            <th scope="col" className="border border-gray-300 px-0 py-2">Patient Password</th>
                            <th scope="col" className="border border-gray-300 px-0 py-2">Patient Role</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={index} onClick={() => {
                                console.log("Appointment selected:", appointment);
                                selectAppointment(appointment);
                            }} role='button'>
                            
                                <td>{appointment.startTime.toLocaleString()}</td>
                                <td>{appointment.endTime.toLocaleString()}</td>
                                <td>{appointment.status}</td>
                                <td>{appointment.date.toLocaleString()}</td>
                                {/* <td>{appointment.doctor.id}</td>
                                <td>{appointment.doctor.user.name}</td>
                                <td>{appointment.doctor.user.email}</td>
                                <td>{appointment.doctor.user.password}</td>
                                <td>{appointment.doctor.user.role}</td>
                                <td>{appointment.doctor.speciality}</td>
                                <td>                                
                                    <p className={`doctor-availability ${appointment.doctor.availability ? 'available' : 'unavailable'}`}>
                                    {appointment.doctor.availability ? 'Available' : 'Not Available'}
                                </p></td>
                                <td>{appointment.patient.id}</td>
                                <td>{appointment.patient.user.name}</td>
                                <td>{appointment.patient.user.email}</td>
                                <td>{appointment.patient.user.password}</td>
                                <td>{appointment.patient.user.role}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default AppointmentOverview;