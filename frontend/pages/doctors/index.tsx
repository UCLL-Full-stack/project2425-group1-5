import { Doctor } from "@/types"
import Head from "next/head";
import Header from "@/components/header";
import DoctorService from "@/services/DoctorService";
import { useEffect } from "react";
import { useState } from "react";
import DoctorOverview from "@/components/doctors/DoctorOverview";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

const Doctors: React.FC = () =>{

    const [doctors, setDoctors] = useState<Array<Doctor>>();
    const [error, setError] = useState<string>();
    const [selectDoctor , setSelectedDoctor] = useState<Doctor | null>(null);

    useEffect(() =>{
        getDoctors();
    },[]);

    const getDoctors = async() =>{
        setError("");
        const response = await DoctorService.getAllDoctors();
        if(!response.ok){
            if(response.status === 401){
                setError("You are not authorized to view this page.Please login first.")
            }else{
                setError(response.statusText);
            }
        } else{
            const doctorss =  await response.json();
            setDoctors(doctorss);
        }

    };

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
};

export const getServerSideProps : GetServerSideProps= async (context) => {
    const {locale} = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};


export default Doctors;