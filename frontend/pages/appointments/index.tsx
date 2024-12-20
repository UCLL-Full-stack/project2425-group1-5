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
import { useTranslation } from "react-i18next";

const Appointments: React.FC =() =>{
    const [appointments, setAppointments] = useState<Array<Appointment>>();
    const [selectAppointment , setSelectedAppointment] = useState<Appointment | null>(null);
    const [deleteAppointment, setDeleteAppointment] = useState<string>();
    const [errorss, setErrorss] = useState<string>();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const { t } = useTranslation();


    useEffect(()=>{
        setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")!));
    }, []);
    // useEffect(() =>{
    //     getAppointments();
    // },[]);

    // const getAppointments = async() =>{
    //     setErrorss("");
    //     const response = await AppointmentService.getAllAppointments();
        
    //     if(!response.ok){
    //         if(response.status ===401){
    //             setErrorss("You are not authorized to view this page.Please login first.");
    //         }else{
    //             setErrorss(response.statusText);
    //         }
    //     }else{

    //         const appointmentss =  await response.json();
    //         setAppointments(appointmentss);
    //     }
    // };

    const getAppointments = async () => {
        setErrorss("");
        const response = await AppointmentService.getAllAppointments();

        if (!response.ok) {
            if (response.status === 401) {
                setErrorss("You are not authorized to view this page. Please login first.");
            } else {
                setErrorss(response.statusText);
            }
        } else {
            const appointmentsData = await response.json();
            setAppointments(appointmentsData);
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
              <title>
              {t('login.appointments.title')}
              {/* Appointment Overview */}
              </title>
           </Head>
           <Header />
           <main className="d-flex flex-column justify-content-center align-items-center p-3">

                <section>
                <h1>
                {/* {t('login.appointments.overview')} */}
                Appointment Overview
                </h1>
                {appointments&&(
                    <AppointmentOverview 
                    appointments = {appointments}
                    deleteAppointment={setDeleteAppointment}
                    selectAppointment={setSelectedAppointment}
                    
                    />
                )
                }
                </section>
                {
                    selectAppointment&&(
                        <section style={{ marginTop: "20px" }}>
                        <h1>
                        {t('login.appointments.selected_appointment')}
                        {selectAppointment.id}</h1>
                        <p>
                        {t('login.appointments.startTime')}
                        {selectAppointment.start_time.toLocaleString()} </p>
                        <p>
                        {t('login.appointments.endTime')}
                        {selectAppointment.end_time.toLocaleString()} </p>
                        <p>
                        {t('login.appointments.Status')}
                        {selectAppointment.status} </p>
                        <p>
                        {t('login.appointments.Date')}
                        {selectAppointment.date.toLocaleString()} </p>
                        <p>
                        {t('login.appointments.doctor_id')}
                        {selectAppointment.doctor.id} </p>
                        <p>
                        {t('login.appointments.doctor_name')}{selectAppointment.doctor.user.name} </p>
                        <p>
                        {t('login.appointments.doctor_email')}{selectAppointment.doctor.user.email} </p>
                        {/* <p>Doctor Password: {selectAppointment.doctor.user.password} </p> */}
                        <p>
                        {t('login.appointments.doctor_speciality')}{selectAppointment.doctor.speciality}</p>
                        <p>
                        {t('login.appointments.doctor_availability')}{selectAppointment.doctor.availability ? "Available" : "Not Available"}</p>
                        <p>
                        {t('login.appointments.patient_id')}{selectAppointment.patient.id} </p>
                        <p>
                        {t('login.appointments.patient_name')}{selectAppointment.patient.user.name} </p>
                        <p>
                        {t('login.appointments.patient_email')} {selectAppointment.patient.user.email} </p>
                        {/* <p>Patient Password: {selectAppointment.patient.user.password} </p> */}
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

