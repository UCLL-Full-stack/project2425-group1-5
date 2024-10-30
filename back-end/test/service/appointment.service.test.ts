import { Appointment } from "../../model/Appointment"; 
import doctorDb from "../../repository/doctor.db";
import appointmentDb from "../../repository/appointment.db";
import { AppointmentInput, DoctorInput, PatientInput, UserInput } from "../../types";
import patientDb from "../../repository/patient.db";
import { Doctor } from "../../model/Doctor";
import { Patient } from "../../model/Patient";
import { User } from "../../model/User";
import appointmentService from "../../service/appointment.service";

const startTime =new Date('2024-12-05T09:00:00');
const endTime =  new Date('2024-12-05T10:00:00');
const status = 'Scheduled';
const date = new Date('2024-12-05');

const userInputDoctor : UserInput = {
    id: 5,
    name: 'dr.Mark Thompson',
    email: 'mark.thompson@hospital.com',
    password: 'thompson123',
    role: 'doctor'
};

const userDoctor =  new User({
    ...userInputDoctor,
});

const userInputPatient : UserInput = {
    id: 8,
    name: 'Sara Greene',
    email: 'sara.greene@hospital.com',
    password: 'sara123',
    role: 'patient'
};

const userPatient =new User({
    ...userInputPatient,
});

const doctorInput: DoctorInput= {
    id: 5,
    user: userInputDoctor,
    speciality: 'Cardiology',
    availability: true
};

const doctor = new Doctor({
    id: 5,
    user : userDoctor,
    speciality : 'Cardiology',
    availability : true
});

const patientInput : PatientInput= {
    id: 8,
    user: userInputPatient
};

const patient = new Patient({
    id: 8,
    user: userPatient
});


let mockAppointmentDbCreateAppointment : jest.SpyInstance<Appointment,[Appointment],any>;
let mockAppointmentDbGetAppointmentByDoctorAndPatient : jest.SpyInstance<Appointment| undefined,[{doctorId : number, patientId: number}], any>;

let mockDoctordbGetDoctorById : jest.SpyInstance<Doctor| null,[{id: number}], any>;
let mockPatientdbGetPatientById : jest.SpyInstance<Patient| null,[{id: number}], any>;

beforeEach(() =>{
    mockAppointmentDbCreateAppointment = jest.spyOn(appointmentDb, 'addAppointment');
    mockDoctordbGetDoctorById = jest.spyOn(doctorDb, 'getDoctorById');
    mockPatientdbGetPatientById = jest.spyOn(patientDb, 'getPatientById');
    mockAppointmentDbGetAppointmentByDoctorAndPatient = jest.spyOn(appointmentDb, 'getAppointmentByDoctorAndPatient');
});

afterEach(() =>{
    jest.clearAllMocks();
});

test('given: a valid appointment, when: appointment is created, then: appointment is created', async() =>{
    //given 
    mockDoctordbGetDoctorById.mockReturnValue(doctor);
    mockPatientdbGetPatientById.mockReturnValue(patient);

    //when
    await appointmentService.addAppointment({startTime, endTime, status, date, doctor: doctorInput,patient : patientInput});

    //then
    expect(mockDoctordbGetDoctorById).toHaveBeenCalledWith({ id: 5 });
    expect(mockPatientdbGetPatientById).toHaveBeenCalledWith({ id: 8});
    expect(mockAppointmentDbGetAppointmentByDoctorAndPatient).toHaveBeenCalledWith({ doctorId: 5, patientId: 8});
    expect(mockAppointmentDbCreateAppointment).toHaveBeenCalledTimes(1);
    expect(mockAppointmentDbCreateAppointment).toHaveBeenCalledWith(new Appointment({startTime, endTime, status, date,doctor, patient}));

});

test('given: an existing appointment, when: appointment is created, then:an error is thrown', async() =>{
    //given
    mockDoctordbGetDoctorById.mockReturnValue(doctor);
    mockPatientdbGetPatientById.mockReturnValue(patient);
    mockAppointmentDbGetAppointmentByDoctorAndPatient.mockReturnValue(new Appointment({startTime,endTime,status,date,doctor,patient}));

    //when
    const addAppointment = appointmentService.addAppointment({startTime,endTime,status,date,doctor: doctorInput,patient: patientInput});

    //then
    await expect(addAppointment).rejects.toThrow('This appointment is already scheduled.');
});


test('given: missing doctor id , when: appointment is created, then:an error is thrown', async() =>{
    //given
    const invalidDoctorInput: DoctorInput= {
        id: undefined,
        user: userInputDoctor,
        speciality: 'Cardiology',
        availability: true
    };

    //when
    const addAppointment = appointmentService.addAppointment({startTime,endTime,status,date,doctor: invalidDoctorInput,patient: patientInput});

    //then
    await expect(addAppointment).rejects.toThrow('Doctor id is required.');
});

test('given: missing patient id , when: appointment is created, then:an error is thrown', async() =>{
    //given
    const invalidPatientInput : PatientInput= {
        id: undefined,
        user: userInputPatient
    };

    //when
    const addAppointment = appointmentService.addAppointment({startTime,endTime,status,date,doctor: doctorInput,patient: invalidPatientInput});

    //then
    await expect(addAppointment).rejects.toThrow('Patient id is required.');
});


test('given:patient id not found, when: appointment is created, then:an error is thrown', async() =>{
    //given
    const nonExistentPatientInput : PatientInput= {
        id: -1,
        user: userInputPatient
    };

    mockPatientdbGetPatientById.mockReturnValue(null);
    //when
    const addAppointment = appointmentService.addAppointment({startTime,endTime,status,date,doctor: doctorInput,patient: nonExistentPatientInput});

    //then
    await expect(addAppointment).rejects.toThrow('Patient not found with the given ID.');
});





