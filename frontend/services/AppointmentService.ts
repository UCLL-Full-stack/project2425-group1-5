import { Appointment } from "@/types"

const addAppointment = (appointment: Appointment) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
    });
};

const getAllAppointments = async() =>{
    return fetch(
        process.env.NEXT_PUBLIC_API_URL + "/appointments",
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        }
    );
};

const AppointmentService ={
    addAppointment,
    getAllAppointments
};

export default AppointmentService;
