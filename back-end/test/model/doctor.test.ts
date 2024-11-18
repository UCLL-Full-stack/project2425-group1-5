import { Doctor } from "../../model/Doctor";
import { User } from "../../model/User";
import { Service } from "../../model/Service";

const validUser =  new User({id: 1,name: 'dr.John Smith',email: 'john.smith@hospital.com',password: 'smith123',role: 'doctor'
});

const speciality = 'Cardiology';
const availability = false;
const service = new Service({
    name: "Cardiology",
    description: "Heart care services",
    price: 150,
    doctors: [],
});


test('given: valid values for doctor, when: doctor is created, then: doctor is created with those values',() =>{
    const doctor = 
    new Doctor({
        id: 1,
        user: validUser,
        speciality: 'Cardiology',
        availability: false,
        service :  service
    });

    expect(doctor.getUser()).toEqual(validUser);
    expect(doctor.getSpeciality()).toEqual(speciality);
    expect(doctor.getAvailability()).toEqual(availability);
});

test('given: user information is missing, when:doctor is created, then: an error is thrown ',()=>{
    const doctor =() => new Doctor({user:undefined as unknown as User,speciality: 'Cardiology',availability: false, service: service
    });

    expect(doctor).toThrow("Doctor's user information is required.");
});

test('given: speciality is missing, when:doctor is created, then: an error is thrown ',()=>{
    const doctor =() => new Doctor({user:validUser,speciality: '',availability: false, service : service
    });

    expect(doctor).toThrow("Doctor's speciality is required.");
});

test('given: availability is missing, when:doctor is created, then: an error is thrown ',()=>{
    const doctor =() => new Doctor({user:validUser,speciality: 'Cardiology',availability: undefined as unknown as boolean, service: service
    });

    expect(doctor).toThrow("Doctor's availability status is required.");
});

test('given:doctor"s service is missing, when: doctor is created, then: an error is thrown',()=>{
    const doctor =() => new Doctor({user:validUser,speciality: 'Cardiology',availability: true, service: undefined as unknown as Service
    });

    expect(doctor).toThrow('A Doctor must provide atleast one service.');
});
