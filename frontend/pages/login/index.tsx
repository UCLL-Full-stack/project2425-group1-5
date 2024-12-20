import Header from "@/components/header"
import UserLoginForm from "@/components/users/UserLoginForm";
import { useTranslation } from "next-i18next";
import Head from "next/head"
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import Link from "next/link";



const Login: React.FC = () =>{
    const { t } = useTranslation();
    return (
        <>
           <Head>
            <title>User Login</title>
           </Head>
           <Header />
           <main>
           <section className="p-6 min-h-screen flex flex-col items-center">
              <UserLoginForm />
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

export default Login;