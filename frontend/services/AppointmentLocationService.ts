const getAllAppointmentLocations = async() =>{
    const token = JSON.parse(localStorage.getItem("loggedInUser")|| "null")?.token;
    return fetch(
        process.env.NEXT_PUBLIC_API_URL + "/appointmentLocations",
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
    );
};

const getAppointmentLocationById = (appointmentLocationId : String) =>{
    const token = JSON.parse(localStorage.getItem("loggedInUser")|| "null")?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/appointmentLocations/${appointmentLocationId}`,{
       method : "GET",
       headers : {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`,

       }
    });
 };
 


const AppointmentLocationService = {
    getAllAppointmentLocations,
    getAppointmentLocationById
};

export default AppointmentLocationService;