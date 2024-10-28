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

test('given: valid values fpr appointment, when: appointment is created, then:appointment is created with those values', () =>{
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



