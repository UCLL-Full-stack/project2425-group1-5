import { Appointment } from "../../model/Appointment";
import { Doctor } from "../../model/Doctor";
import { User } from "../../model/User";
import { AppointmentLocation } from "../../model/AppointmentLocation";
import { Service } from "../../model/Service";
import { Patient } from "../../model/Patient";

const street_number=  123;   
const city =  'New York';    
const postal_code=  10001;  

const service1 = new Service({
    name: "Cardiology",
    description: "Heart care services",
    price: 150,
    doctors: [],
});

const service2 = new Service({
    name: "Neurology",
    description: "Nervous system care services",
    price: 200,
    doctors: [],
});


const location1 = new AppointmentLocation({
    id: 1,
    street_number: 123,
    city: "New York",
    postal_code: 10001,
    appointments: []
});
const location2 = new AppointmentLocation({
    id: 2,
    street_number: 456,
    city: "Los Angeles",
    postal_code: 90001,
    appointments: []
});

// Creating doctors
const doctors = [
    new Doctor({
        id: 1,
        user: new User({
            id: 1,
            name: 'Dr. John Smith',
            email: 'john.smith@hospital.com',
            password: 'smith123',
            role: 'doctor',
        }),
        speciality: 'Cardiology',
        availability: true,
        service : service1,
        appointments: [],
    }),
    new Doctor({
        id: 2,
        user: new User({
            id: 2,
            name: 'Dr. Emily Jones',
            email: 'emily.jones@hospital.com',
            password: 'jones123',
            role: 'doctor',
        }),
        speciality: 'Neurology',
        availability: false,
        service: service2,
        appointments: [],
    })
];

// Creating patients
const patients = [
    new Patient({
        id: 1,
        user: new User({
            id: 1,
            name: 'Alice Johnson',
            email: 'alice.johnson@hospital.com',
            password: 'alice123',
            role: 'patient',
        }),
        appointments: [],
    }),
    new Patient({
        id: 2,
        user: new User({
            id: 2,
            name: 'Bob Williams',
            email: 'bob.williams@hospital.com',
            password: 'bob123',
            role: 'patient',
        }),
        appointments: [],
    })
];
const appointments = [
    new Appointment({
        id: 1,
        start_time: new Date('2024-10-10T10:00:00'),
        end_time: new Date('2024-10-10T11:00:00'),
        status: 'Scheduled',
        date: new Date('2024-10-10'),
        doctor: doctors[0],
        patient: patients[0],
        location : location1
    }),
    new Appointment({
        id: 2,
        start_time: new Date('2024-11-15T14:00:00'),
        end_time: new Date('2024-11-15T15:00:00'),
        status: 'Scheduled',
        date: new Date('2024-11-15'),
        doctor: doctors[1],
        patient: patients[1],
        location : location2
    })
];
test('given: valid values for location, when: location is created, then:location is created with those values', () =>{
    const location = 
    new AppointmentLocation({
        id: 1,
        street_number : 123,
        city : 'New York',
        postal_code : 10001,
        appointments : appointments
    });

    expect(location.getStreetNumber()).toEqual(street_number);
    expect(location.getCity()).toEqual(city);
    expect(location.getPostalCode()).toEqual(postal_code);
});

test('given: street number is missing, when: location is created, then:an error is thrown',() =>{
    const location = () => new AppointmentLocation({street_number: undefined as unknown as number,city,postal_code, appointments : appointments});

    expect(location).toThrow('Street Number is required.');
});

test('given: city is missing, when: location is created, then:an error is thrown',() =>{
    const location = () => new AppointmentLocation({street_number,city: '',postal_code, appointments :appointments});

    expect(location).toThrow('City is required.');
});

test('given: postal code is missing, when: location is created, then:an error is thrown',() =>{
    const location = () => new AppointmentLocation({street_number,city,postal_code: undefined as unknown as number, appointments :appointments});

    expect(location).toThrow('Postal Code is required.');
});