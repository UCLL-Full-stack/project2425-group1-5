import { Patient } from "../model/Patient";
import patientDb from "../repository/patient.db";


const getAllPatients = (): Patient[] =>{
    return patientDb.getAllPatients();
};
const getPatientById = (id: number) : Patient | null =>{
    return patientDb.getPatientById({id});
}

export default {
    getPatientById,
    getAllPatients
};