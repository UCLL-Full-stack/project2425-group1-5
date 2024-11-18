import { Service } from "../../model/Service";
import { Doctor } from "../../model/Doctor";
import { User } from "../../model/User";


const service1 = new Service({
    name: "Cardiology",
    description: "Heart care services",
    price: 150,
    doctors: [],
});

const service2 = new Service({
    name: "Dermatology",
    description: "Skin care services",
    price: 150,
    doctors: [],
});


const doctor1 = new Doctor({
    id: 1,
    user: new User({
        id: 1,
        name: 'Dr. John Smith',
        email: 'john.smith@hospital.com',
        password: 'password123',
        role: 'doctor'
    }),
    speciality: 'Cardiology',
    availability: true,
    service: service1
});

const doctor2 = new Doctor({
    id: 2,
    user: new User({
        id: 2,
        name: 'Dr. Jane Doe',
        email: 'jane.doe@hospital.com',
        password: 'password456',
        role: 'doctor',
    }),
    speciality: 'Dermatology',
    availability: true,
    service : service2
});

const name= 'Skin Consultation';
const description = 'A thorough consultation for skin-related issues.';
const price= 100.00;

test('given: valid values for service , when: service is created, then: service is created with those values',()=>{
    const service = new Service({
        id: 1,
        name: 'Skin Consultation',
        description: 'A thorough consultation for skin-related issues.',
        price: 100.00,
        doctors: [doctor1, doctor2]
    });

    expect(service.getName()).toEqual(name);
    expect(service.getDescription()).toEqual(description);
    expect(service.getPrice()).toEqual(price);
    expect(service.getDoctors()).toEqual([doctor1,doctor2]);
});

test('given:service name is missing, when: service is created, then: an error is thrown',()=>{
    const service = () => new Service({
        id: 1,
        name: '',
        description: 'A thorough consultation for skin-related issues.',
        price: 100.00,
        doctors: [doctor1, doctor2]
    });

    expect(service).toThrow('Service name is required.');

});

test('given:service description is missing, when: service is created, then: an error is thrown',()=>{
    const service = () => new Service({
        id: 1,
        name: 'Skin Consultation',
        description: '',
        price: 100.00,
        doctors: [doctor1, doctor2]
    });

    expect(service).toThrow('Service description is required.');

});

test('given:service price is missing, when: service is created, then: an error is thrown',()=>{
    const service = () => new Service({
        id: 1,
        name: 'Skin Consultation',
        description: 'A thorough consultation for skin-related issues.',
        price: undefined as unknown as number,
        doctors: [doctor1, doctor2]
    });

    expect(service).toThrow('Service price is required and must be a positive number.');
});

test('given:service negative price, when: service is created, then: an error is thrown',()=>{
    const service = () => new Service({
        id: 1,
        name: 'Skin Consultation',
        description: 'A thorough consultation for skin-related issues.',
        price: -100.00,
        doctors: [doctor1, doctor2]
    });

    expect(service).toThrow('Service price is required and must be a positive number.');
});

// test('given:service doctor"s is missing, when: service is created, then: an error is thrown',()=>{
//     const service = () => new Service({
//         id: 1,
//         name: 'Skin Consultation',
//         description: 'A thorough consultation for skin-related issues.',
//         price:100.00,
//         doctors: []
//     });

//     expect(service).toThrow('At least one doctor must be provided for the service.');
// });

// test('given:service doctor"s is undefined, when: service is created, then: an error is thrown',()=>{
//     const service = () => new Service({
//         id: 1,
//         name: 'Skin Consultation',
//         description: 'A thorough consultation for skin-related issues.',
//         price:100.00,
//         doctors: undefined as unknown as Doctor[]
//     });

//     expect(service).toThrow('At least one doctor must be provided for the service.');
// });
