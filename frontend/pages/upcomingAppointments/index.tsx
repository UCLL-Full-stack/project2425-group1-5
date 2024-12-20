import AppointmentOverview from "@/components/appointment/AppointmentOverview";
import Header from "@/components/header";
import AppointmentService from "@/services/AppointmentService";
import { Appointment, User } from "@/types";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";


const UpcomingAppointment = () =>{
    const [appointments, setAppointments] = useState<Array<Appointment> | null>(null);
    const [filteredAppointments, setFilteredAppointments] = useState<Array<Appointment> | null>(null);
    const [selectAppointment , setSelectedAppointment] = useState<Appointment | null>(null);
    const [deleteAppointment, setDeleteAppointment] = useState<string>();
    const [errorss, setErrorss] = useState<string>();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(()=>{
        setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")!));
    }, []);


    const fetchUpcomingAppointments = async () => {
        console.log("Filter button clicked!");
    
        const response = await AppointmentService.getUpcomingAppointments();
        console.log("API Response Status:", response.status);
    
        if (!response.ok) {
            console.error("API Error Text:", errorss);
            setErrorss("Failed to filter upcoming appointments.");
        } else {
            try {
                const data = await response.json();
                console.log("Response Data:", data);
                setFilteredAppointments(data); 
            } catch (error) {
                console.error("Error parsing JSON data:", error);
                setErrorss("Failed to process response data.");
            }
        }
    };

    useEffect(() => {
        fetchUpcomingAppointments();
    }, []);

        
    const { data, isLoading, error } = useSWR("getUpcomingAppointments", AppointmentService.getUpcomingAppointments);

    // Refresh data every 1000ms
    useInterval(() => {
        mutate("getUpcomingAppointments");
    }, 1000);




    return(
        <>
            <Head>
                <title>Upcoming Appointments</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Upcoming Appointments</h1>


                {filteredAppointments && filteredAppointments.length > 0 && (
                    <section>
                        <table className="table table-hover">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col">Start Time</th>
                                    <th scope="col">End Time</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map((appointment, index) => (
                                    <tr key={index}>
                                        <td>{new Date(appointment.start_time).toLocaleString()}</td>
                                        <td>{new Date(appointment.end_time).toLocaleString()}</td>
                                        <td>{appointment.status}</td>
                                        <td>{new Date(appointment.date).toLocaleDateString()}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </section>
                )}
            </main>
        </>
    );
};
    
export default UpcomingAppointment;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {locale} = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};