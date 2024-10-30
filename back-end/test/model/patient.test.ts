import { Patient } from "../../model/Patient";
import { User } from "../../model/User";

const validUser = 
    new User({
        id: 6,
        name: 'Alice Brown',
        email: 'alice.brown@hospital.com',
        password: 'alice123',
        role: 'patient',
    });

test('given: valid values for patient, when: patient is created, then: patient is created with those values',() =>{
    const patient = 
    new Patient({
        id: 1,
        user: validUser
    });

    expect(patient.getUser()).toEqual(validUser);
});

test('given: user information is missing, when:patient is created, then: an error is thrown ',()=>{
    const patient =() => new Patient({user:undefined as unknown as User});

    expect(patient).toThrow("Patient's user information is required.");
});