import AppointmentForm from "@/components/appointment/AppointmentForm";
import Header from "@/components/header";
import DoctorService from "@/services/DoctorService";
import { User } from "@/types";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import useSWR from "swr";

const AddAppointment = () =>{
    const router = useRouter();
    const {doctorId} = router.query;
    const [errors, setErrors] = useState<string>();
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

    useEffect(()=>{
        setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")|| "null"));
    }, []);

    const fetcher = async (key: string) => {
        const [doctorResponse] = await Promise.all([
            DoctorService.getDoctorById(doctorId as string),
        ]);

        if (!doctorResponse.ok) {
            if(doctorResponse.status === 401){
                setErrors("You are not authorized to view this page.Please login first.") 
            }else{
                setErrors(doctorResponse.statusText);
            }
        }else{
            const [doctor] = await Promise.all([
                doctorResponse.json(),
            ]);
            return { doctor };
        }
    };
    const { data, isLoading, error } = useSWR(doctorId ? `doctor-${doctorId}` : null, fetcher);

    return (
        <>
           <Head>
                <title>New appointment</title>
           </Head>
           <Header />
           <main className="p-6 min-h-screen flex flex-col items-center">
                <h1 className="text-center mb-4">Create new appointment</h1>
                <section className="w-50">
                    {errors && <p className="text-danger">{error}</p>}
                    {isLoading && <p className="text-green-800">Loading...</p>}
                    {data && (
                        <AppointmentForm
                            doctor={data.doctor}
                        />
                    )}
                </section>
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

export default AddAppointment;