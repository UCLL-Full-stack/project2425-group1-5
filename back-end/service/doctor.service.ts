import { Doctor } from "../model/Doctor";
import doctorDb from "../repository/doctor.db";

const getAllDoctors = async(): Promise<Doctor[]> =>{
    return doctorDb.getAllDoctors();
};

const getDoctorById = async(id: number) : Promise<Doctor | null> =>{
    return doctorDb.getDoctorById({id});
}

export default {
    getAllDoctors,
    getDoctorById
};