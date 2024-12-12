import { Appointment } from "../../model/Appointment"; 
import doctorDb from "../../repository/doctor.db";
import appointmentDb from "../../repository/appointment.db";
import { AppointmentInput, DoctorInput, LocationInput, PatientInput, ServiceInput, UserInput } from "../../types";
import patientDb from "../../repository/patient.db";
import { Doctor } from "../../model/Doctor";
import { Patient } from "../../model/Patient";
import { User } from "../../model/User";
import appointmentService from "../../service/appointment.service";
import { Service } from "../../model/Service";
import { AppointmentLocation } from "../../model/AppointmentLocation";
import appointmentLocationDb from "../../repository/appointmentLocation.db";

const start_time =new Date('2024-12-05T09:00:00');
const end_time =  new Date('2024-12-05T10:00:00');
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
    id: 5,
     name: 'Ella Davis',
    email: 'ella.davis@hospital.com',
    password: 'ella123',
    role: 'patient',
};

const userPatient =new User({
    ...userInputPatient,
});

const serviceInput : ServiceInput = {
    name: "Cardiology",
    description: "Heart care services",
    price: 150
}

const service = new Service({
    name: "Cardiology",
    description: "Heart care services",
    price: 150
}); 

const locationInput : LocationInput = {
    id: 6,
    street_number: 456,
    city: "Los Angeles",
    postal_code: 90001
}

const appointmentLocation = new AppointmentLocation({
    id: 6,
    street_number: 456,
    city: "Los Angeles",
    postal_code: 90001
});

const doctorInput: DoctorInput= {
    id: 5,
    user: userInputDoctor,
    speciality: 'Cardiology',
    service : serviceInput,
    availability: true
};

const doctor = new Doctor({
    id: 5,
    user : userDoctor,
    speciality : 'Cardiology',
    service: service,
    availability : true
});

const patientInput : PatientInput= {
    id: 5,
    user: userInputPatient
};

const patient = new Patient({
    id: 5,
    user: userPatient
});


// let mockAppointmentDbCreateAppointment : jest.SpyInstance<Appointment,[Appointment],any>;
// let mockAppointmentDbGetAppointmentByDoctorAndPatient : jest.SpyInstance<Appointment| undefined,[{doctorId : number, patientId: number}], any>;

// let mockDoctordbGetDoctorById : jest.SpyInstance<Doctor| null,[{id: number}], any>;
// let mockPatientdbGetPatientById : jest.SpyInstance<Patient| null,[{id: number}], any>;

let mockAppointmentDbCreateAppointment : jest.Mock;
let mockAppointmentDbGetAppointmentByDoctorAndPatient : jest.Mock;
let mockDoctordbGetDoctorById : jest.Mock;
let mockPatientdbGetPatientById : jest.Mock;
let mockAppointmentLocationdbGetAppointmentLocationById : jest.Mock;

beforeEach(() =>{
    // mockAppointmentDbCreateAppointment = jest.spyOn(appointmentDb, 'addAppointment');
    // mockDoctordbGetDoctorById = jest.spyOn(doctorDb, 'getDoctorById');
    // mockPatientdbGetPatientById = jest.spyOn(patientDb, 'getPatientById');
    // mockAppointmentDbGetAppointmentByDoctorAndPatient = jest.spyOn(appointmentDb, 'getAppointmentByDoctorAndPatient');
    mockAppointmentDbCreateAppointment = jest.fn();
    mockAppointmentDbGetAppointmentByDoctorAndPatient = jest.fn();
    mockDoctordbGetDoctorById = jest.fn();
    mockPatientdbGetPatientById = jest.fn();
    mockAppointmentLocationdbGetAppointmentLocationById = jest.fn();
});

afterEach(() =>{
    jest.clearAllMocks();
});

test('given: a valid appointment, when: appointment is created, then: appointment is created', async() =>{
    //given 
    mockDoctordbGetDoctorById.mockResolvedValue(doctor);
    mockPatientdbGetPatientById.mockResolvedValue(patient);
    mockAppointmentLocationdbGetAppointmentLocationById.mockResolvedValue(appointmentLocation);


    mockAppointmentDbGetAppointmentByDoctorAndPatient.mockResolvedValue(null); // No conflicting appointment
    mockAppointmentDbCreateAppointment.mockResolvedValue(
        new Appointment({
            start_time,
            end_time,
            status,
            date,
            doctor,
            patient,
            location: appointmentLocation,
        })
    );

    doctorDb.getDoctorById = mockDoctordbGetDoctorById;
    patientDb.getPatientById = mockPatientdbGetPatientById;
    appointmentLocationDb.getAppointmentLocationById = mockAppointmentLocationdbGetAppointmentLocationById;
    appointmentDb.getAppointmentByDoctorAndPatient = mockAppointmentDbGetAppointmentByDoctorAndPatient;
    appointmentDb.addAppointment = mockAppointmentDbCreateAppointment;

    //when
    await appointmentService.addAppointment({start_time, end_time, status, date, doctor: doctorInput,patient : patientInput, location: locationInput});

    //then
    expect(mockDoctordbGetDoctorById).toHaveBeenCalledWith({ id: 5 });
    expect(mockPatientdbGetPatientById).toHaveBeenCalledWith({ id: 5});
    expect(mockAppointmentLocationdbGetAppointmentLocationById).toHaveBeenCalledWith({id: 6});
    expect(mockAppointmentDbGetAppointmentByDoctorAndPatient).toHaveBeenCalledWith({ doctorId: 5, patientId: 5});
    expect(mockAppointmentDbCreateAppointment).toHaveBeenCalledTimes(1);
    expect(mockAppointmentDbCreateAppointment).toHaveBeenCalledWith(new Appointment({start_time, end_time, status, date,doctor, patient,location: appointmentLocation}));

});

test('given: an existing appointment, when: appointment is created, then:an error is thrown', async() =>{
    //given
    mockDoctordbGetDoctorById.mockResolvedValue(doctor);
    mockPatientdbGetPatientById.mockResolvedValue(patient);
    mockAppointmentDbGetAppointmentByDoctorAndPatient.mockResolvedValue(new Appointment({start_time,end_time,status,date,doctor,patient,location: appointmentLocation}));

    doctorDb.getDoctorById = mockDoctordbGetDoctorById;
    patientDb.getPatientById = mockPatientdbGetPatientById;
    appointmentDb.getAppointmentByDoctorAndPatient = mockAppointmentDbGetAppointmentByDoctorAndPatient;

    //when
    const addAppointment = appointmentService.addAppointment({start_time,end_time,status,date,doctor: doctorInput,patient: patientInput, location: locationInput});

    //then
    await expect(addAppointment).rejects.toThrow('This appointment is already scheduled.');
});


test('given: missing doctor id , when: appointment is created, then:an error is thrown', async() =>{
    //given
    const invalidDoctorInput: DoctorInput= {
        id: undefined,
        user: userInputDoctor,
        speciality: 'Cardiology',
        service : serviceInput,
        availability: true
    };

    //when
    const addAppointment = appointmentService.addAppointment({start_time,end_time,status,date,doctor: invalidDoctorInput,patient: patientInput, location: locationInput});

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
    const addAppointment = appointmentService.addAppointment({start_time,end_time,status,date,doctor: doctorInput,patient: invalidPatientInput, location : locationInput});

    //then
    await expect(addAppointment).rejects.toThrow('Patient id is required.');
});


test('given:patient id not found, when: appointment is created, then:an error is thrown', async() =>{
    //given
    const nonExistentPatientInput : PatientInput= {
        id: -1,
        user: userInputPatient
    };

    mockPatientdbGetPatientById.mockResolvedValue(null);

    patientDb.getPatientById = mockPatientdbGetPatientById;
    //when
    const addAppointment = appointmentService.addAppointment({start_time,end_time,status,date,doctor: doctorInput,patient: nonExistentPatientInput, location : locationInput});

    //then
    await expect(addAppointment).rejects.toThrow('Patient not found with the given ID.');
});

// test('given : a valid input, when: appointment is veing updated, then: appointment is updated', async()=>{
//     const mockGetAppointmentById = jest.fn().mockResolvedValue(
//         new Appointment({ start_time, end_time, status, date, doctor, patient, location: appointmentLocation })
//     );
//     const mockUpdateAppointment = jest.fn().mockResolvedValue(
//         new Appointment({ start_time, end_time, status: 'Completed', date, doctor, patient, location: appointmentLocation })
//     );

//     const mockDoctordbGetDoctorById = jest.fn().mockResolvedValue(doctor);

//     const mockPatientdbGetPatientById = jest.fn().mockResolvedValue(patient);

//     appointmentDb.getAppointmentById = mockGetAppointmentById;
//     appointmentDb.updateAppointment = mockUpdateAppointment;
//     doctorDb.getDoctorById = mockDoctordbGetDoctorById;
//     patientDb.getPatientById = mockPatientdbGetPatientById;

//     const result = await appointmentService.updateAppointment(1, {
//         start_time,
//         end_time,
//         status: 'Completed',
//         date,
//         doctor: doctorInput,
//         patient: patientInput,
//         location: locationInput,
//     });

//     expect(result?.getStatus()).toBe('Completed');
//     expect(mockGetAppointmentById).toHaveBeenCalledWith(1);
//     expect(mockUpdateAppointment).toHaveBeenCalledWith(1, {
//         start_time,
//         end_time,
//         status: 'Completed',
//         date,
//         doctor: doctorInput,
//         patient: patientInput,
//         location: locationInput,
//     });
//     expect(mockDoctordbGetDoctorById).toHaveBeenCalledWith({ id: doctorInput.id });
//     expect(mockPatientdbGetPatientById).toHaveBeenCalledWith({ id: patientInput.id });
// })



