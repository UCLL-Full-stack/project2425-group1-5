import { useEffect } from "react";
import { useState } from "react";
import { Appointment, User } from "@/types";
import AppointmentService from "@/services/AppointmentService";
import Head from "next/head";
import Header from "@/components/header";
import AppointmentOverview from "@/components/appointment/AppointmentOverview";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Appointments: React.FC =() =>{
    const [appointments, setAppointments] = useState<Array<Appointment>>();
    const [selectAppointment , setSelectedAppointment] = useState<Appointment | null>(null);
    const [errorss, setErrorss] = useState<string>();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);


    useEffect(()=>{
        setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")!));
    }, []);
    // useEffect(() =>{
    //     getAppointments();
    // },[]);

    const getAppointments = async() =>{
        setErrorss("");
        const response = await AppointmentService.getAllAppointments();
        
        if(!response.ok){
            if(response.status ===401){
                setErrorss("You are not authorized to view this page.Please login first.");
            }else{
                setErrorss(response.statusText);
            }
        }else{

            const appointmentss =  await response.json();
            setAppointments(appointmentss);
        }
    };

    
    const { data, isLoading, error } = useSWR(
        "getAppointments",
        getAppointments
    );
    
    useInterval(()=>{
        mutate("getAppointments", getAppointments());
    },1000);
    


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
                        <p>Start Time {selectAppointment.start_time.toLocaleString()} </p>
                        <p>End Time {selectAppointment.end_time.toLocaleString()} </p>
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


};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {locale} = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Appointments;