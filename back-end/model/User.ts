import { Role } from "../types";
import { User as UserPrisma } from '@prisma/client'; 
export class User {
    private id?: number;
    private name : string;
    private email : string;
    private password : string;
    private role : Role;

    constructor(user:{
        id?:number;
        name : string;
        email : string;
        password : string;
        role : Role;
    }){
        this.validate(user);
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    validate(user: {
        name: string;
        email: string;
        password: string;
        role: Role;
    }) {
        if (!user.name?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (!user.role) {
            throw new Error('Role is required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    equals(user: User): boolean {
        return (
            this.name === user.getName() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole()
        );

}

static from({id,name,email,password,role}: UserPrisma){
    return new User({
        id,
        name,
        email,
        password,
        role
    });
}
}