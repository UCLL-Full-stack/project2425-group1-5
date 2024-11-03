import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>MediAsist</title>
        <meta name="description" content="MediAsist app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <span>
          <Image
            src="/images/mediAsist.png"
            alt="MediAsist Logo"
            className={styles.vercelLogo}
            width={50}
            height={50}
          />
          <h1>Welcome!</h1>
        </span>

        <div className={styles.description}>
          <p>
            MediAssist allows you to easily find and schedule appointments with doctors. As a patient, you can search for specialists based on your needs, view their availability, and book appointments that suit your schedule.
            You can also reschedule or cancel appointments effortlessly, all while exploring detailed doctor profiles to make informed decisions about your healthcare.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;

