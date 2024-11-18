
type Role = 'admin' | 'doctor' | 'patient';

type LocationInput = {
    id?: number;
    street_number : number;
    postal_code : number;
    city : string;
}

type ServiceInput = {
    id?: number;
    name : string;
    description: string;
    price : number;
}

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
    service : ServiceInput;
    availability : boolean;
}

type PatientInput = {
    id?: number;
    user: UserInput;
}


type AppointmentInput = {
    id?: number;
    start_time : Date;
    end_time : Date;
    status : string;
    date : Date;
    doctor: DoctorInput;
    patient : PatientInput;
    location : LocationInput
}

export {
    Role,
    LocationInput,
    ServiceInput,
    UserInput,
    DoctorInput,
    PatientInput,
    AppointmentInput
};