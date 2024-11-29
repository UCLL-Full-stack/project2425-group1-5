import { useRouter } from "next/router"
import { useState } from "react";
import { StatusMessage } from "@/types";
import classNames from "classnames";

const UserLoginForm: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [statusMessages , setStatusMessages] = useState<StatusMessage[]>([]);
  
    // const statusMessages: StatusMessage[] = [];
  
    const clearErrors = () => {
      //reset errors and status messages
      setNameError(null);
      setStatusMessages([]);
    };
  
    const validate = (): boolean => {
      let result = true;
  
      if (!name && name.trim() === "") {
        // set error here
        setNameError("Name is required.");
        result = false;
      }
  
      return result;
    };
//  ask abt why async(event) doesn't work
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        clearErrors();

        if(!validate()){
            return;
        }

        setStatusMessages([
            {
                message:`Login successful.Redirecting to homepage...`,
                type: "success"
            }
        ]);

        sessionStorage.setItem("loggedInUser", name);

        setTimeout(()=>{
            router.push("/");
        },2000);
    };

    return(
        <>
        <h3 className="text-center mb-4">Login</h3>
        {statusMessages && (
            <div className="status-message-container">
                <ul >
                    {statusMessages.map(({message,type}, index) =>(
                        <li
                        key={index}
                        className={classNames({
                            "text-red-800": type === "error",
                            "success-message": type === "success",

                        })}
                        >
                           {message}
                        </li>
                    ))}
                </ul>
            </div>
        )}
        <form onSubmit={handleSubmit}>
            <label  htmlFor="nameInput" className="block mb-2 text-sm font-medium">
                Username:
            </label>
            <div >
                <input 
                id= "nameInput"
                type = "text"
                value ={name}
                onChange={(event) => setName(event.target.value)}
                />
                {nameError &&(
                    <div className="text-red-800">
                        {nameError}
                    </div>
                )}
            </div>

            <button
            className="text-blue bg-blue hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
            >
                Login
            </button>
        </form>
        </>
    );
};

export default UserLoginForm;