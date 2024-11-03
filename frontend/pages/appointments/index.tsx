import { useEffect } from "react";
import { useState } from "react";
import { Appointment } from "@/types";
import AppointmentService from "@/services/AppointmentService";
import Head from "next/head";
import Header from "@/components/header";
import AppointmentOverview from "@/components/appointment/AppointmentOverview";

const Appointments: React.FC =() =>{
    const [appointments, setAppointments] = useState<Array<Appointment>>();

    useEffect(() =>{
        getAppointments();
    },[]);

    const getAppointments = async() =>{
        const response = await AppointmentService.getAllAppointments();
        const appointmentss =  await response.json();
        setAppointments(appointmentss);
    }

    return(
        <>
           <Head>
              <title>Our Specialists</title>
           </Head>
           <Header />
           <main className="d-flex flex-column justify-content-center align-items-center p-3">

                <section>
                <h1>Appointments Overview</h1>
                {appointments&&(
                    <AppointmentOverview 
                    appointments = {appointments}
                    
                    
                    />
                )
                }
                </section>

           </main>

        </>

        

    );


}

export default Appointments;