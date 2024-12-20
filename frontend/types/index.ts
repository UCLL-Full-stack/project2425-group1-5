
export type Role = 'admin' | 'doctor' | 'patient';

type Service = {
    id?: number;
    name : string;
    description: string;
    price : number;
}
export type User ={
    id?: number;
    name?: string;
    email?:string;
    password?: string;
    role?: Role;
};

export type Doctor = {
    id?: number;
    user : User;
    speciality: string;
    availability : boolean;
    service: Service;
};

export type Patient = {
    id?: number;
    user : User;
};

export type AppointmentLocation = {
    id?: number;
    street_number : number;
    city : string;
    postal_code: number;
}

export type Appointment = {
    id?: number;
    start_time : Date;
    end_time : Date;
    status : string;
    date : Date;
    doctor: Doctor;
    patient : Patient;
    location : AppointmentLocation;
};



export type StatusMessage = {
    message: string;
    type: "error" | "success";
};
