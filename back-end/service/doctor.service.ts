import { Doctor } from "../model/Doctor";
import doctorDb from "../repository/doctor.db";

const getAllDoctors = async(): Promise<Doctor[]> =>{
    return doctorDb.getAllDoctors();
};

const getDoctorById = (id: number) : Doctor | null =>{
    return doctorDb.getDoctorById({id});
}

export default {
    getAllDoctors,
    getDoctorById
};