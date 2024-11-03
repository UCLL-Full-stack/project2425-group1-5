import Head from "next/head";
import Header from "@/components/header";
import { Doctor } from "@/types";
import DoctorDetails from "@/components/doctors/DoctorDetails";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DoctorService from "@/services/DoctorService";

const DoctorById = () =>{
    const [doctor, setDoctor] = useState<Doctor|null>(null);

    const router = useRouter();
    const {doctorId} = router.query;

    const getDoctorById = async() =>{
        const[doctorResponse]= await Promise.all([DoctorService.getDoctorById(doctorId as string)]);
        const [doctorr] = await Promise.all([doctorResponse.json()]);
        setDoctor(doctorr);

    }

    useEffect(() =>{
        if(doctorId)
            getDoctorById();
    }
)

    return (
        <>
           <Head>
               <title>Doctor Details</title>
           </Head>
           <Header />
           <main className="d-flex flex-column justify-content-center align-items-center">
           <h1> Details of {doctor && doctor.user.name}</h1>
           {!doctorId && <p>Loading</p>}
           {doctor&& (           
            <section>
            <DoctorDetails doctor={doctor}></DoctorDetails>
           </section>
           )}

           </main>
        </>
    );
};

export default DoctorById;