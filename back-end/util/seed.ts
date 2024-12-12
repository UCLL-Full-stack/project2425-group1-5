import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { set , addDays, subDays} from "date-fns";
import { connect } from "http2";

const prisma = new PrismaClient();

const main = async() =>{
    await prisma.appointment.deleteMany();
    await prisma.doctor.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.user.deleteMany();
    await prisma.appointmentLocation.deleteMany();
    await prisma.service.deleteMany();


    const service1 = await prisma.service.create({
        data : {
            name: "Cardiology",
            description: "Heart care services",
            price: 150,
        },
    });

    const service2 = await prisma.service.create({
        data : {
            name: "Dermatology",
            description: "Skin care services",
            price: 150,
        },
    });

    const service3 = await prisma.service.create({
        data : {
            name: "Neurology",
            description: "Nervous system care services",
            price: 200,
        },
    });

    const service4 = await prisma.service.create({
        data : {
            name: "Pediatrics",
            description: "Child care services",
            price: 150,
        },
    });

    const service5 = await prisma.service.create({
        data : {
            name: "Orthopedics",
            description: "Musculoskeleton system care services",
            price: 150,
        },
    });

    const service6 = await prisma.service.create({
        data : {
            name: "General Medicine",
            description: "Acute and Chronic illnesses care services",
            price: 150,
        },
    });


    const doctor1 = await prisma.doctor.create({
        data : {
            user: {
                create : {
                    name: 'Dr. John Smith',
                    email: 'john.smith@hospital.com',
                    password: await bcrypt.hash('smith123', 12),
                    role: 'doctor',
                }
            },
            speciality: 'Cardiology',
            availability: true,
            service: {
                connect : {id : service1.id}
            },
        },
    });

    const doctor2 = await prisma.doctor.create({
        data : {
            user: {
                create : {
                    name: 'Dr. Emily Jones',
                    email: 'emily.jones@hospital.com',
                    password: await bcrypt.hash('jones123', 12),
                    role: 'doctor',
                }
            },
            speciality: 'Neurology',
            availability: false,
            service: {
                connect : {id : service3.id}
            },
        },
    });

    const doctor3 = await prisma.doctor.create({
        data : {
            user: {
                create : {
                    name: 'Dr. Michel Brown',
                    email: 'michael.brown@hospital.com',
                    password: await bcrypt.hash('brown123', 12),
                    role: 'doctor',
                }
            },
            speciality: 'Pediatrics',
            availability: true,
            service: {
                connect : {id : service4.id}
            },
        },
    });
    
    const doctor4 = await prisma.doctor.create({
        data : {
            user: {
                create : {
                    name: 'Dr. Sarah Wilson',
                    email: 'sarah.wilson@hospital.com',
                    password: await bcrypt.hash('wilson123', 12),
                    role: 'doctor',
                }
            },
            speciality: 'Orthopedics',
            availability: true,
            service: {
                connect : {id : service5.id}
            },
        },
    });

    const doctor5 = await prisma.doctor.create({
        data : {
            user: {
                create : {
                    name: 'Dr. David Miller',
                    email: 'david.miller@hospital.com',
                    password:await bcrypt.hash('miller123', 12),
                    role: 'doctor',
                }
            },
            speciality: 'General Medicine',
            availability: false,
            service: {
                connect : {id : service6.id}
            },
        },
    });

    const patient1 = await prisma.patient.create({
        data : {
            user: {
                create : {
                    name: 'Alice Johnson',
                    email: 'alice.johnson@hospital.com',
                    password: await bcrypt.hash('alice123', 12),
                    role: 'patient',
                }
            },
        },
    });

    const patient2 = await prisma.patient.create({
        data : {
            user: {
                create : {
                    name: 'Bob Williams',
                    email: 'bob.williams@hospital.com',
                    password: await bcrypt.hash('bob123', 12),
                    role: 'patient',
                }
            },
        },
    });

    const patient3 = await prisma.patient.create({
        data : {
            user: {
                create : {
                    name: 'Carla Brown',
                    email: 'carla.brown@hospital.com',
                    password: await bcrypt.hash('carla123', 12),
                    role: 'patient',
                }
            },
        },
    });

    const patient4 = await prisma.patient.create({
        data : {
            user: {
                create : {
                    name: 'David Smith',
                    email: 'david.smith@hospital.com',
                    password: await bcrypt.hash('david123', 12),
                    role: 'patient',
                }
            },
        },
    });

    const patient5 = await prisma.patient.create({
        data : {
            user: {
                create : {
                    name: 'Ella Davis',
                    email: 'ella.davis@hospital.com',
                    password: await bcrypt.hash('ella123', 12),
                    role: 'patient',
                }
            },
        },
    });

    const admin1 = await prisma.admin.create({
        data : {
            user: {
                create : {
                    name: 'Sophia Turner',
                    email: 'sophia.turner@hospital.com',
                    password: await bcrypt.hash('sophia123', 12),
                    role: 'admin',
                }
            },
        },
    });
    const admin2 = await prisma.admin.create({
        data : {
            user: {
                create : {
                    name: 'Liam Johnson',
                    email: 'liam.johnson@hospital.com',
                    password: await bcrypt.hash('liam456', 12),
                    role: 'admin',
                }
            },
        },
    });

    const admin3 = await prisma.admin.create({
        data : {
            user: {
                create : {
                    name: 'Olivia Martinez',
                    email: 'olivia.martinez@hospital.com',
                    password: await bcrypt.hash('olivia789', 12),
                    role: 'admin',
                }
            },
        },
    });

    const appointmentLocation1 = await prisma.appointmentLocation.create({
        data: {
            street_number: 123,
            city: "New York",
            postal_code: 10001,
        }
    });

    const appointmentLocation2 = await prisma.appointmentLocation.create({
        data: {
            street_number: 456,
            city: "Los Angeles",
            postal_code: 90001,
        }
    });

    const appointmentLocation3 = await prisma.appointmentLocation.create({
        data: {
            street_number: 789,
            city: "Chicago",
            postal_code: 60601,
        }
    });

    const appointment1 = await prisma.appointment.create({
        data : {
            start_time : set(new Date() , {hours :10 , minutes:0}),
            end_time: set(new Date() , {hours :11 , minutes:0}),
            status: 'Scheduled',
            date: new Date(),
            doctor: {
                connect : {id : doctor1.id}
            },
            patient: {
                connect : {id : patient1.id}
            },
            location : {
                connect : {id : appointmentLocation1.id}
            }
        },
    });

    const appointment2 = await prisma.appointment.create({
        data : {
            start_time:  set(addDays(new Date(), 5), { hours: 14, minutes: 0 }),
            end_time: set(addDays(new Date(), 5), { hours: 15, minutes: 0 }),
            status: 'Scheduled',
            date: addDays(new Date(), 5),
            doctor: {
                connect : {id : doctor2.id}
            },
            patient: {
                connect : {id : patient2.id}
            },
            location : {
                connect : {id : appointmentLocation2.id}
            }

        },
    });
    const appointment3 = await prisma.appointment.create({
        data : {
            start_time:set(subDays(new Date(), 10), { hours: 9, minutes: 0 }),
            end_time:set(subDays(new Date(), 10), { hours: 10, minutes: 0 }),
            status: 'Completed',
            date: subDays(new Date(), 10),
            doctor: {
                connect : {id : doctor1.id}
            },
            patient: {
                connect : {id : patient2.id}
            },
            location : {
                connect : {id : appointmentLocation3.id}
            }
        },
    });





};

(async() =>{
    try{
        await main();
        await prisma.$disconnect();
    } catch(error){
        console.log(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();