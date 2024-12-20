import { Appointment } from "@/types"

const addAppointment = (appointment: Appointment) => {
    const token = JSON.parse(localStorage.getItem("loggedInUser")|| "null")?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + '/appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointment),
    });
};

const updateAppointment = (appointmentId: string, appointment: Appointment)=>{
    const token = JSON.parse(localStorage.getItem("loggedInUser")|| "null")?.token;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/appointments/update/${appointmentId}`,{
        method : "PUT",
        headers : {
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`,
        },
        body : JSON.stringify(appointment),
    });
};

const deleteAppointment = (appointmentId : string) =>{
    const token = JSON.parse(localStorage.getItem("loggedInUser")|| "null")?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/appointments/${appointmentId}`,{
        method : "DELETE",
        headers : {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,

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

const getAppointmentById = (appointmentId : String) =>{
    const token = JSON.parse(localStorage.getItem("loggedInUser")|| "null")?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/appointments/${appointmentId}`,{
       method : "GET",
       headers : {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`,

       }
    });
 };

 const getUpcomingAppointments = async() =>{
    const token = JSON.parse(localStorage.getItem("loggedInUser")|| "null")?.token;

    return fetch(
        process.env.NEXT_PUBLIC_API_URL + "/upcomingAppointments",
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
    updateAppointment,
    getAppointmentById,
    getUpcomingAppointments,
};

export default AppointmentService;
