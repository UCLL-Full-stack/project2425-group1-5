import { Patient } from "../model/Patient";
import patientDb from "../repository/patient.db";

const getPatientById = (id: number) : Patient | null =>{
    return patientDb.getPatientById({id});
}

export default {
    getPatientById
};