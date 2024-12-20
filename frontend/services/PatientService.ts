const getAllPatients = async() =>{
    const token = JSON.parse(localStorage.getItem("loggedInUser")|| "null")?.token;
    return fetch(
        process.env.NEXT_PUBLIC_API_URL + "/patients",
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
    );
};

const getPatientById = (patientId : String) =>{
    const token = JSON.parse(localStorage.getItem("loggedInUser")|| "null")?.token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/patients/${patientId}`,{
       method : "GET",
       headers : {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`,

       }
    });
 };
 


const PatientService = {
    getAllPatients,
    getPatientById
};

export default PatientService;