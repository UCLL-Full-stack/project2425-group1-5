import { UserInput, DoctorInput } from "../../types";
import { User } from "../../model/User";
import { Doctor } from "../../model/Doctor";
import { Appointment } from "../../model/Appointment";
import doctorDb from "../../repository/doctor.db";
import doctorService from "../../service/doctor.service";


const userInputDoctor : UserInput = {
    id: 5,
    name: 'dr.Mark Thompson',
    email: 'mark.thompson@hospital.com',
    password: 'thompson123',
    role: 'doctor'
};

const userInputDoctor2: UserInput = {
    id: 6,
    name: 'dr.Susan Smith',
    email: 'susan.smith@hospital.com',
    password: 'susan123',
    role: 'doctor'
};

const userDoctor =  new User({
    ...userInputDoctor,
});

const userDoctor2 = new User({
    ...userInputDoctor2,
});


const doctor = new Doctor({
    id: 5,
    user : userDoctor,
    speciality : 'Cardiology',
    availability : true
});

const doctor2 = new Doctor({
    id: 6,
    user: userDoctor2,
    speciality: 'Neurology',
    availability: true
});


let mockDoctordbGetDoctorById :  jest.SpyInstance<Doctor|null, [{id: number}], any>;

let mockDoctordbGetAllDoctors : jest.SpyInstance<Doctor[],[]>;

beforeEach(() =>{
    mockDoctordbGetDoctorById = jest.spyOn(doctorDb, 'getDoctorById');
    mockDoctordbGetAllDoctors = jest.spyOn(doctorDb,'getAllDoctors');
});

afterEach(() =>{
    jest.clearAllMocks();
});

test("given: a valid doctor id, when: get doctor by id, then: doctor with corresponding id is retrieved", () =>{
    const doctorId = 5;

    mockDoctordbGetDoctorById.mockReturnValue(doctor);

    const result = doctorService.getDoctorById(5);

    expect(mockDoctordbGetDoctorById).toHaveBeenCalledWith({ id: doctorId });
    expect(result).toBe(doctor);
    expect(result?.getId()).toBe(doctorId);
    expect(result?.getUser()).toBe(userDoctor);
    expect(result?.getSpeciality()).toBe('Cardiology');
    expect(result?.getAvailability()).toBe(true);

});

test("given: a request to get all doctors, when: get all doctors, then: all the doctors are displayed.",() =>{
    const allDoctors = [doctor, doctor2];

    mockDoctordbGetAllDoctors.mockReturnValue(allDoctors);

    const result = doctorService.getAllDoctors();

    expect(mockDoctordbGetAllDoctors).toHaveBeenCalled(); 
    expect(result).toEqual(allDoctors);
});