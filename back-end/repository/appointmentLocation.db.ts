import { AppointmentLocation } from "../model/AppointmentLocation";
import database from "./database";

// const appointmentLocations = [
//     new AppointmentLocation({
//         id: 1,
//         street_number: 123,
//         city: "New York",
//         postal_code: 10001,
//         appointments: []
//     }),
//     new AppointmentLocation({
//         id: 2,
//         street_number: 456,
//         city: "Los Angeles",
//         postal_code: 90001,
//         appointments: []
//     }),
//     new AppointmentLocation({
//         id: 3,
//         street_number: 789,
//         city: "Chicago",
//         postal_code: 60601,
//         appointments: []
//     }),
//     new AppointmentLocation({
//         id: 4,
//         street_number: 101,
//         city: "San Francisco",
//         postal_code: 94105,
//         appointments: []
//     }),
//     new AppointmentLocation({
//         id: 5,
//         street_number: 202,
//         city: "Miami",
//         postal_code: 33101,
//         appointments: []
//     })
// ];

// const getAllAppointmentLocations = (): AppointmentLocation[] =>{
//     return appointmentLocations;
// }
const getAllAppointmentLocations = async(): Promise<AppointmentLocation[]> =>{
    try{
        const appointmentLocationsPrisma = await database.appointmentLocation.findMany();
        return appointmentLocationsPrisma.map((appointmentLocationsPrisma) => AppointmentLocation.from(appointmentLocationsPrisma));
    }catch(error){
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }

}

const getAppointmentLocationById = async({id}:{id: number}) : Promise<AppointmentLocation| null> =>{
    try{
        const appointmentLocationById = await database.appointmentLocation.findUnique({
            where : {id},
        });

        return appointmentLocationById ? AppointmentLocation.from(appointmentLocationById) :  null;
    }catch(error){
        console.log(error);
        throw new Error('Database error. See server log for details.');
    }
} 
// const getAppointmentLocationById = ({id}:{id: number}) : AppointmentLocation| null =>{
//     try{
//         return appointmentLocations.find((appointmentLocation) => appointmentLocation.getId()=== id) || null;
//     }catch(error){
//         console.log(error);
//         throw new Error('Database error. See server log for details.');
//     }
// } 

export default{
    getAllAppointmentLocations,
    getAppointmentLocationById
};