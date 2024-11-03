const getAllDoctors = async() =>{
    return fetch(
        process.env.NEXT_PUBLIC_API_URL + "/doctors",
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
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