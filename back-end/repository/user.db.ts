import database from "./database"
import { User } from "../model/User"

const getAllUsers = async(): Promise<User[]> =>{
    try{
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    }catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUsersById = async({id}: {id: number}): Promise<User | null> =>{
    try{
        const userPrisma = await database.user.findUnique({
            where: {id},
        });
        return userPrisma ? User.from(userPrisma) : null;
    }catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByName = async({ name }: {name: string}): Promise<User | null> =>{
    try{
        const userPrisma= await database.user.findFirst({
            where: { name },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async(user : User) : Promise<User> =>{
    try{
        const userPrisma = await database.user.create({
            data : {name: user.getName(), email: user.getEmail(), password: user.getPassword(), role: user.getRole()}

        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};



export default {
    getAllUsers,
    getUsersById,
    getUserByName,
    createUser
};