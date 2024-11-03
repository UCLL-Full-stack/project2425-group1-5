import { Doctor } from "@/types";
import Link from "next/link";

type Props = {
    doctors: Array<Doctor>;
    selectDoctor : (doctor: Doctor) => void;

};

const DoctorOverview: React.FC<Props> = ({ doctors , selectDoctor}: Props) => {
    return (
        <>
            {doctors && (
                <table className="table table-hover " >
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Availability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor, index) => (
                            <tr key={index} onClick={() => {
                                console.log("Doctor selected:", doctor);
                                selectDoctor(doctor);
                            }} role='button' >
                            
                                <td>{doctor.user.name}</td>
                                <td>
                                <p className={`doctor-availability ${doctor.availability ? 'available' : 'unavailable'}`}>
                                    {doctor.availability ? 'Available' : 'Not Available'}
                                </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default DoctorOverview;