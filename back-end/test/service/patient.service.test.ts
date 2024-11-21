import { UserInput } from "../../types";
import patientDb from "../../repository/patient.db";
import { Patient } from "../../model/Patient";
import { User } from "../../model/User";
import patientService from "../../service/patient.service";

const userInputPatient : UserInput = {
    id: 8,
    name: 'Sara Greene',
    email: 'sara.greene@hospital.com',
    password: 'sara123',
    role: 'patient'
};

const userInputPatient2 : UserInput = {
    id: 9,
    name: 'Sara Millers',
    email: 'sara.millers@hospital.com',
    password: 'millers123',
    role: 'patient'
};

const userPatient =new User({
    ...userInputPatient,
});
const userPatient2 =new User({
    ...userInputPatient2,
});

const patient = new Patient({
    id: 8,
    user: userPatient
});
const patient2 = new Patient({
    id: 9,
    user: userPatient2
});

// let mockPatientdbGetPatientById : jest.SpyInstance<Patient|null,[{id: number}], any>;
// let mockPatientdbGetAllPatients : jest.SpyInstance<Patient[],[]>;

let mockPatientdbGetAllPatients : jest.Mock;
let mockPatientdbGetPatientById : jest.Mock;

beforeEach(() =>{
    // mockPatientdbGetAllPatients = jest.spyOn(patientDb, 'getAllPatients');
    // mockPatientdbGetPatientById = jest.spyOn(patientDb,'getPatientById');
    mockPatientdbGetAllPatients = jest.fn();
    mockPatientdbGetPatientById = jest.fn();
});

afterEach(() =>{
    jest.clearAllMocks();
});

test("given: a valid patient id, when: get patient by id, then: patient with corresponding id is retrieved", async() =>{
    const patientId = 8;

    mockPatientdbGetPatientById.mockResolvedValue(patient);

    patientDb.getPatientById = mockPatientdbGetPatientById;

    const result = await patientService.getPatientById(8);

    expect(mockPatientdbGetPatientById).toHaveBeenCalledWith({ id: patientId });
    expect(result).toBe(patient);
    expect(result?.getId()).toBe(patientId);
    expect(result?.getUser()).toBe(userPatient);

});

test("given: a request to get all patients, when: get all patients, then: all the patients are displayed.",async() =>{
    const allPatients = [patient, patient2];

    mockPatientdbGetAllPatients.mockReturnValue(allPatients);

    patientDb.getAllPatients = mockPatientdbGetAllPatients;

    const result = await patientService.getAllPatients();

    expect(mockPatientdbGetAllPatients).toHaveBeenCalled(); 
    expect(result).toEqual(allPatients);
});