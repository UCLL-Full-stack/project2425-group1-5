import { Doctor } from "../../model/Doctor";
import { Patient } from "../../model/Patient";
import { Appointment } from "../../model/Appointment";
import { User } from "../../model/User";

const doctor = 
    new Doctor({
        id: 1,
        user: new User({
            id: 1,
            name: 'dr.John Smith',
            email: 'john.smith@hospital.com',
            password: 'smith123',
            role: 'doctor',
        }),
        speciality: 'Cardiology',
        availability: true,
        appointments: [],
    });
const patient= 
    new Patient({
            id: 1,
            user: new User({
                id: 6,
                name: 'Alice Brown',
                email: 'alice.brown@hospital.com',
                password: 'alice123',
                role: 'patient',
            }),
    });

const startTime = new Date('2024-10-10T10:00:00');
const endTime = new Date('2024-10-10T11:00:00');
const status = 'Scheduled';
const date = new Date('2024-10-10');

test('given: valid values for appointment, when: appointment is created, then:appointment is created with those values', () =>{
    const appointment= 
    new Appointment({
        id: 1,
        startTime: new Date('2024-10-10T10:00:00'),
        endTime: new Date('2024-10-10T11:00:00'),
        status: 'Scheduled',
        date: new Date('2024-10-10'),
        doctor: doctor,
        patient: patient
    });

    expect(appointment.getStartTime()).toEqual(startTime);
    expect(appointment.getEndTime()).toEqual(endTime);
    expect(appointment.getStatus()).toEqual(status);
    expect(appointment.getDate()).toEqual(date);
    expect(appointment.getDoctor()).toEqual(doctor);
    expect(appointment.getPatient()).toEqual(patient);
});

test('given: start time is after end time , when: appointment is created, then: an error is thrown',()=>{
    const  invalidStartTime = new Date('2024-10-10T11:03:00');

    const appointment = () => new Appointment({startTime : invalidStartTime, endTime, status,date,doctor,patient});

    expect(appointment).toThrow('Start time cannot be after end time.')
});

test('given: start time is missing, when: appointment is created, then: an error is thrown', ()=>{
    const appointment = () => new Appointment({startTime : undefined as unknown as Date, endTime, status,date,doctor,patient});

    expect(appointment).toThrow('Appointment\'s Start time is required.')
});

test('given: end time is missing, when: appointment is created, then: an error is thrown', ()=>{
    const appointment = () => new Appointment({startTime, endTime: undefined as unknown as Date, status,date,doctor,patient});

    expect(appointment).toThrow('Appointment\'s End time is required.')
});

test('given: status is missing, when: appointment is created, then: an error is thrown', ()=>{
    const appointment = () => new Appointment({startTime, endTime, status : "",date,doctor,patient});

    expect(appointment).toThrow('Appointment\'s Status is required.')
});

test('given: date is missing, when: appointment is created, then: an error is thrown', ()=>{
    const appointment = () => new Appointment({startTime, endTime, status,date: undefined as unknown as Date,doctor,patient});

    expect(appointment).toThrow('Appointment\'s Date is required.')
});

test('given: doctor is missing, when: appointment is created, then: an error is thrown', ()=>{
    const appointment = () => new Appointment({startTime, endTime, status,date,doctor: undefined as unknown as Doctor,patient});

    expect(appointment).toThrow('Appointment\'s Doctor is required.')
});

test('given: patient is missing, when: appointment is created, then: an error is thrown', ()=>{
    const appointment = () => new Appointment({startTime, endTime, status,date,doctor,patient: undefined as unknown as Patient});

    expect(appointment).toThrow('Appointment\'s patient is required.')
});


