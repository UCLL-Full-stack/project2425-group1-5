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

const updateAppointment = (appointmentId: string, appointment: Appointment)=>{
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/appointments/${appointmentId}`,{
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(appointment),
    });
};

const deleteAppointment = (appointmentId : string) =>{
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/appointments/${appointmentId}`,{
        method : "DELETE",
        headers : {
            "Content-Type": "application/json",
        },
    });
};

const getAllAppointments = async() =>{
    const token = JSON.parse(localStorage.getItem("loggedInUser")|| "null")?.token;

    return fetch(
        process.env.NEXT_PUBLIC_API_URL + "/appointments",
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
    );
};

const AppointmentService ={
    addAppointment,
    getAllAppointments,
    deleteAppointment,
    updateAppointment
};

export default AppointmentService;
