import React from "react";
import { Doctor } from "@/types";

type Props = {
    doctor: Doctor;
};

const DoctorDetails: React.FC<Props> = ({ doctor }: Props) => {
    return (
        <>
            {doctor && (
                <table>
                    <tbody>
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
                    {/* <tr>
                        <td>Service: </td>
                        <td>{doctor.service.name}</td>
                    </tr>
                    <tr>
                        <td>Service Description: </td>
                        <td>{doctor.service.description}</td>
                    </tr>
                    <tr>
                        <td>Service Price: </td>
                        <td>{doctor.service.price}</td>
                    </tr> */}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default DoctorDetails;