import React from "react";
import { Doctor } from "@/types";

type Props={
    doctor : Doctor;
};

const DoctorDetails: React.FC<Props> = ({doctor}: Props)=>{
    return(
        <>
          {doctor &&(
            <table>
                <tr>
                    <td>ID:</td>
                    <td>{doctor.id} </td>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td>{doctor.user.name} </td>
                </tr>
                <tr>
                    <td>Email: </td>
                    <td>{doctor.user.email}</td>
                </tr>
                <tr>
                    <td>Password: </td>
                    <td>{doctor.user.password}</td>
                </tr>
                <tr>
                    <td>Speciality: </td>
                    <td>{doctor.speciality}</td>
                </tr>
                <tr>
                    <td>Availability: </td>
                    <td className={`doctor-availability ${doctor.availability ? 'available' : 'unavailable'}`}>
                                    {doctor.availability ? 'Available' : 'Not Available'}
                    </td>
                </tr>
            </table>
          )}
        </>
    );
};

export default DoctorDetails;