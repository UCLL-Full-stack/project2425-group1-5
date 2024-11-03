
type Role = 'admin' | 'doctor' | 'patient';

export type User ={
    id?: number;
    name: string;
    email:string;
    password: string;
    role: Role;
};

export type Doctor = {
    id?: number;
    user : User;
    speciality: string;
    availability : boolean;
};

export type Patient = {
    id?: number;
    user : User;
};

export type Appointment = {
    id?: number;
    startTime : Date;
    endTime : Date;
    status : string;
    date : Date;
    doctor: Doctor;
    patient : Patient;
};

