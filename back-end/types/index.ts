
type Role = 'admin' | 'doctor' | 'patient';

type UserInput = {
    id?: number;
    name: string;
    email:string;
    password: string;
    role: Role;
}

type DoctorInput = {
    id?: number;
    user : UserInput;
    speciality: string;
    availability : boolean;
}

type PatientInput = {
    id?: number;
    user: UserInput;
}

type AppointmentInput = {
    id?: number;
    startTime : Date;
    endTime : Date;
    status : string;
    date : Date;
    doctor: DoctorInput;
    patient : PatientInput;
}

export {
    Role,
    UserInput,
    DoctorInput,
    PatientInput,
    AppointmentInput
};