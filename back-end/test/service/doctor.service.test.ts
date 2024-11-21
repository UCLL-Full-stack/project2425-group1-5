import { UserInput, DoctorInput } from "../../types";
import { User } from "../../model/User";
import { Doctor } from "../../model/Doctor";
import { Appointment } from "../../model/Appointment";
import doctorDb from "../../repository/doctor.db";
import doctorService from "../../service/doctor.service";
import { Service } from "../../model/Service";


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

const service1 = new Service({
    name: "Cardiology",
    description: "Heart care services",
    price: 150,
    doctors: [],
});

const service2 = new Service({
    name: "Neurology",
    description: "Nervous system care services",
    price: 150,
    doctors: [],
});

const doctor = new Doctor({
    id: 5,
    user : userDoctor,
    speciality : 'Cardiology',
    service : service1,
    availability : true
});

const doctor2 = new Doctor({
    id: 6,
    user: userDoctor2,
    speciality: 'Neurology',
    service : service2,
    availability: true
});


// let mockDoctordbGetDoctorById :  jest.SpyInstance<Doctor|null, [{id: number}], any>;

// let mockDoctordbGetAllDoctors : jest.SpyInstance<Promise<Doctor[]>,[], any>;

let mockDoctordbGetDoctorById : jest.Mock;
let mockDoctordbGetAllDoctors : jest.Mock;
beforeEach(() =>{
    // mockDoctordbGetDoctorById = jest.spyOn(doctorDb, 'getDoctorById');
    // mockDoctordbGetAllDoctors = jest.spyOn(doctorDb,'getAllDoctors');
    mockDoctordbGetAllDoctors = jest.fn();

    mockDoctordbGetDoctorById = jest.fn();
});

afterEach(() =>{
    jest.clearAllMocks();
});

test("given: a valid doctor id, when: get doctor by id, then: doctor with corresponding id is retrieved", async() =>{
    // const doctorId = 5;

    // mockDoctordbGetDoctorById.mockReturnValue(doctor);

    // const result = doctorService.getDoctorById(5);

    // expect(mockDoctordbGetDoctorById).toHaveBeenCalledWith({ id: doctorId });
    // expect(result).toBe(doctor);
    // expect(result?.getId()).toBe(doctorId);
    // expect(result?.getUser()).toBe(userDoctor);
    // expect(result?.getSpeciality()).toBe('Cardiology');
    // expect(result?.getAvailability()).toBe(true);
    const doctorId = 5;

    mockDoctordbGetDoctorById.mockResolvedValue(doctor);  // mockResolvedValue is used for promises

    doctorDb.getDoctorById = mockDoctordbGetDoctorById;

    const result = await doctorService.getDoctorById(doctorId);  // Use await to resolve the promise

    // Verify the mock was called with the correct argument
    expect(mockDoctordbGetDoctorById).toHaveBeenCalledWith({ id: doctorId });

    // Assertions on the resolved result (which will be a Doctor instance)
    expect(result).toBe(doctor);
    expect(result?.getId()).toBe(doctorId);
    expect(result?.getUser()).toBe(userDoctor);
    expect(result?.getSpeciality()).toBe('Cardiology');
    expect(result?.getAvailability()).toBe(true);

});


test("given: a request to get all doctors, when: get all doctors, then: all the doctors are displayed.",async() =>{
    const allDoctors = [doctor, doctor2];

    mockDoctordbGetAllDoctors.mockResolvedValue(allDoctors);
    // mockDoctordbGetAllDoctors.mockReturnValue(allDoctors); // this was before orm prisma
    doctorDb.getAllDoctors = mockDoctordbGetAllDoctors;

    const result = await doctorService.getAllDoctors();

    expect(mockDoctordbGetAllDoctors).toHaveBeenCalled(); 
    expect(result).toEqual(allDoctors);
});