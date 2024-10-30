import { Admin } from "../../model/Admin";
import { User } from "../../model/User";

const validUser = 
    new User({
        id: 6,
        name: 'Jane Doe',
        email: 'jane.doe@hospital.com',
        password: 'jane123',
        role: 'admin',
    });

test('given: valid values for admin, when: admin is created, then: admin is created with those values',() =>{
    const admin = 
    new Admin({
        id: 1,
        user: validUser
    });
    
    expect(admin.getUser()).toEqual(validUser);
});

test('given: user information is missing, when:admin is created, then: an error is thrown ',()=>{
    const admin =() => new Admin({user:undefined as unknown as User});

    expect(admin).toThrow("Admin's user information is required.");
});