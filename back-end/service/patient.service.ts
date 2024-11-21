import { Patient } from "../model/Patient";
import patientDb from "../repository/patient.db";


const getAllPatients = async(): Promise<Patient[]> =>{
    return patientDb.getAllPatients();
};
const getPatientById = async(id: number) : Promise<Patient | null> =>{
    return patientDb.getPatientById({id});
}

export default {
    getPatientById,
    getAllPatients
};