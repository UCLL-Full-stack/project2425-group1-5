import React from "react";
import { Appointment } from "@/types";

type Props={
    appointment : Appointment;
};

const AppointmentDetails: React.FC<Props> = ({appointment}: Props)=>{
    return(
        <>
          {appointment &&(
            <table>
                <tr>
                    <td>ID :</td>
                    <td>{appointment.id} </td>
                </tr>
                <tr>
                    <td>Start Time :</td>
                    <td>{appointment.start_time.toLocaleString()} </td>
                </tr>
                <tr>
                    <td>End Time :</td>
                    <td>{appointment.end_time.toLocaleString()} </td>
                </tr>
                <tr>
                    <td>Status :</td>
                    <td>{appointment.status} </td>
                </tr>
                <tr>
                    <td>Date :</td>
                    <td>{appointment.date.toLocaleString()} </td>
                </tr>
                <tr>
                    <td>Doctor Id :</td>
                    <td>{appointment.doctor.user.name} </td>
                </tr>
                <tr>
                    <td>Doctor Name : </td>
                    <td>{appointment.doctor.user.name}</td>
                </tr>
                <tr>
                    <td>Doctor Email : </td>
                    <td>{appointment.doctor.user.email}</td>
                </tr>
                <tr>
                    <td>Doctor Password : </td>
                    <td>{appointment.doctor.user.password}</td>
                </tr>
                <tr>
                    <td>Doctor Speciality : </td>
                    <td>{appointment.doctor.speciality}</td>
                </tr>
                <tr>
                    <td>Doctor Availability : </td>
                    <td className={`doctor-availability ${appointment.doctor.availability ? 'available' : 'unavailable'}`}>
                                    {appointment.doctor.availability ? 'Available' : 'Not Available'}
                    </td>
                </tr>
                <tr>
                    <td>Patient Id : </td>
                    <td>{appointment.doctor.user.id}</td>
                </tr>
                <tr>
                    <td>Patient Name : </td>
                    <td>{appointment.patient.user.name}</td>
                </tr>
                <tr>
                    <td>Patient Email : </td>
                    <td>{appointment.doctor.user.email}</td>
                </tr>
                <tr>
                    <td>Patient Password : </td>
                    <td>{appointment.doctor.user.password}</td>
                </tr>
            </table>
          )}
        </>
    );
};

export default AppointmentDetails;