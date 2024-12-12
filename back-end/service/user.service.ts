import { UnauthorizedError } from "express-jwt";
import { User } from "../model/User";
import database from "../repository/database";
import userDb from "../repository/user.db";
import { AuthenticationResponse, Role, UserInput } from "../types";
import bcrypt, { hash } from "bcrypt";
import jwt from 'jsonwebtoken';


const getAllUsers = async({ role} : { role: Role}): Promise<User[]> => {
    if(role == "admin"){
        return userDb.getAllUsers();
    }else{
        throw new UnauthorizedError('credentials_required',{
            message: "You are not authorize to access this resource.",
        });
    }

}


const getUserByName = async({name} : {name: string}): Promise<User> =>{
    const user = await userDb.getUserByName({name});
    if (!user) {
        throw new Error(`User with name: ${name} does not exist.`);
    }
    return user;
};

const createUser = async(userInput: UserInput): Promise<User> =>{
    const existingUser = await getUserByName({name: userInput.name});

    if(existingUser){
        throw new Error(`User with username: ${userInput.name} is already registered.`);
    }
    const hashedPassword = await bcrypt.hash(userInput.password,12);

    const user = new User({
        name : userInput.name,
        email : userInput.email,
        password : hashedPassword,
        role : userInput.role
    });
    return userDb.createUser(user);
};

const login = async({name, password}: UserInput): Promise<AuthenticationResponse> =>{
    const user = await getUserByName({name});
    const result = await bcrypt.compare(password, user.getPassword());
    if(!result){
        throw new Error("Incorrect password.");
    }
    return {
        token :generateJwtToken({name: user.getName(), role: user.getRole()}),
        name : name,
        role: user.getRole(),
    }
};

// const generateJwtToken= ({name, role}) :string =>{
//     const options = {expiresIn : `${process.env.JWT_EXPIRES_HOURS}h`, issuer : 'mediAssit'};

//     try{
//         return jwt.sign({name,role}, process.env.JWT_SECRET, options);
//     }catch(error){
//         console.log(error);
//         throw new Error("Error generating JWT Token, see server log for details.")
//     }
// }; //askkk why didn't this workkkkk?????????????

const generateJwtToken = ({ name, role }: { name: string; role: string }): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET environment variable is not set.");
    }

    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS || 1}h`, issuer: 'mediAssit' };

    try {
        return jwt.sign({ name, role }, secret, options);
    } catch (error) {
        console.error("Error generating JWT token:", error);
        throw new Error("Error generating JWT Token, see server log for details.");
    }
};



export default {
    getAllUsers,
    getUserByName,
    createUser,
    login   
}

