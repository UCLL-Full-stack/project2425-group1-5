import { useEffect } from "react";
import { useState } from "react";
import { Appointment } from "@/types";
import AppointmentService from "@/services/AppointmentService";
import Head from "next/head";
import Header from "@/components/header";
import AppointmentOverview from "@/components/appointment/AppointmentOverview";

const Appointments: React.FC =() =>{
    const [appointments, setAppointments] = useState<Array<Appointment>>();
    const [selectAppointment , setSelectedAppointment] = useState<Appointment | null>(null);


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
                    selectAppointment={setSelectedAppointment}
                    
                    />
                )
                }
                </section>
                {
                    selectAppointment&&(
                        <section style={{ marginTop: "20px" }}>
                        <h1>Selected Appointment: {selectAppointment.id}</h1>
                        <p>Start Time {selectAppointment.startTime.toLocaleString()} </p>
                        <p>End Time {selectAppointment.endTime.toLocaleString()} </p>
                        <p>Status {selectAppointment.status} </p>
                        <p>Date {selectAppointment.date.toLocaleString()} </p>
                        <p>Doctor Id {selectAppointment.doctor.id} </p>
                        <p>Doctor Name {selectAppointment.doctor.user.name} </p>
                        <p>Doctor Email: {selectAppointment.doctor.user.email} </p>
                        <p>Doctor Password: {selectAppointment.doctor.user.password} </p>
                        <p>Doctor Specialty: {selectAppointment.doctor.speciality}</p>
                        <p>Doctor Availability: {selectAppointment.doctor.availability ? "Available" : "Not Available"}</p>
                        <p>Patient Id {selectAppointment.patient.id} </p>
                        <p>Patient Name {selectAppointment.patient.user.name} </p>
                        <p>Patient Email: {selectAppointment.patient.user.email} </p>
                        <p>Patient Password: {selectAppointment.patient.user.password} </p>
                        </section>
                        
                    )
                }

           </main>

        </>

        

    );


}

export default Appointments;