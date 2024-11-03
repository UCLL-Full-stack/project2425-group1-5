import { Doctor } from "@/types"
import Head from "next/head";
import Header from "@/components/header";
import DoctorService from "@/services/DoctorService";
import { useEffect } from "react";
import { useState } from "react";
import DoctorOverview from "@/components/doctors/DoctorOverview";

const Doctors: React.FC = () =>{

    const [doctors, setDoctors] = useState<Array<Doctor>>();
    const [selectDoctor , setSelectedDoctor] = useState<Doctor | null>(null);

    useEffect(() =>{
        getDoctors();
    },[]);

    const getDoctors = async() =>{
        const response = await DoctorService.getAllDoctors();
        const doctorss =  await response.json();
        setDoctors(doctorss);
    }

    return(
        <>
           <Head>
              <title>Our Specialists</title>
           </Head>
           <Header />
           <main className="d-flex flex-column justify-content-center align-items-center p-3">

                <section>
                <h1>Our Specialists Overview</h1>
                {doctors&&(
                    <DoctorOverview 
                    doctors = {doctors}
                    selectDoctor={setSelectedDoctor}
                    
                    />
                )
                }
                </section>
                {
                    selectDoctor&&(
                        <section style={{ marginTop: "20px" }}>
                        <h1>Selected Doctor: {selectDoctor.user.name}</h1>
                        <p>Id: {selectDoctor.id} </p>
                        <p>Specialty: {selectDoctor.speciality}</p>
                        <p>Email: {selectDoctor.user.email} </p>
                        <p>Password: {selectDoctor.user.password} </p>
                        <p>Availability: {selectDoctor.availability ? "Available" : "Not Available"}</p>

                        </section>
                        
                    )
                }
           </main>

        </>

        

    );
}

export default Doctors;