const getAllDoctors = async() =>{
    const token = JSON.parse(localStorage.getItem("loggedInUser")|| "null")?.token;
    return fetch(
        process.env.NEXT_PUBLIC_API_URL + "/doctors",
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`,
            }
        }
    );
};

const getDoctorById = (doctorId : String) =>{
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/doctors/${doctorId}`,{
       method : "GET",
       headers : {
          "Content-Type" : "application/json"
       }
    });
 };
 


const DoctorService = {
    getAllDoctors,
    getDoctorById
};

export default DoctorService;