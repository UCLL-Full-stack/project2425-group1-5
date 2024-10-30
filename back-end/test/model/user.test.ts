import { User } from "../../model/User";
import { Role } from "../../types";

const name = "dr.John Smith";
const email = "john.smith@hospital.com";
const password = "smith123";
const role =  "doctor";

test('given: valid values for user, when: user is created, then: user is created with those values', () =>{
    const user =  new User({id: 1,name: 'dr.John Smith',email: 'john.smith@hospital.com',password: 'smith123',role: 'doctor'
    });

    expect(user.getName()).toEqual(name);
    expect(user.getEmail()).toEqual(email);
    expect(user.getPassword()).toEqual(password);
    expect(user.getRole()).toEqual(role);
});

test('given: name is missing, when: user is created, then:an error is thrown ', () =>{
    const user =() =>  new User({id: 1,name: '',email: 'john.smith@hospital.com',password: 'smith123',role: 'doctor'
    });

    expect(user).toThrow('Username is required');
});

test('given: email is missing, when: user is created, then:an error is thrown ', () =>{
    const user =() =>  new User({id: 1,name: 'dr.John Smith',email: '',password: 'smith123',role: 'doctor'
    });

    expect(user).toThrow('Email is required');
});

test('given: password is missing, when: user is created, then:an error is thrown ', () =>{
    const user =() =>  new User({id: 1,name: 'dr.John Smith',email: 'john.smith@hospital.com',password: '',role: 'doctor'
    });

    expect(user).toThrow('Password is required');
});

test('given: role is missing, when: user is created, then:an error is thrown ', () =>{
    const user =() =>  new User({id: 1,name: 'dr.John Smith',email: 'john.smith@hospital.com',password: 'smith123',role: undefined as unknown as Role
    });

    expect(user).toThrow('Role is required');
});