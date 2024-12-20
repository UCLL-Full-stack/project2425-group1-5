import { useRouter } from "next/router"
import { useState } from "react";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import UserService from "@/services/UserService";
import Link from "next/link";

const UserLoginForm: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages , setStatusMessages] = useState<StatusMessage[]>([]);
    const { t } = useTranslation();
  
    // const statusMessages: StatusMessage[] = [];
  
    const clearErrors = () => {
      //reset errors and status messages
      setNameError(null);
      setPasswordError(null);
      setStatusMessages([]);
    };
  
    const validate = (): boolean => {
      let result = true;
  
      if (!name && name.trim() === "") {
        // set error here
        setNameError(t("login.validate.name"));
        result = false;
      }

      if(!password && password.trim() === ""){
        setPasswordError(t("login.validate.password"));
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

        const user = {name: name, password};
        const response = await UserService.loginUser(user);

        if(response.status === 200){
            setStatusMessages([{message: t('login.success'), type: 'success'}]);

            const user = await response.json();
            localStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    token: user.token,
                    name: user.name,
                    role: user.role,
                })
            );
            setTimeout(()=>{
                router.push("/");
            },2000);
        }else if(response.status === 401){
            const {errorMessage} = await response.json();
            setStatusMessages([{message: errorMessage, type:'error'}]);
        }else{
            setStatusMessages([
                {
                    message: t('general.error'),
                    type: 'error',
                }
            ])
        }
        // setStatusMessages([
        //     {
        //         message:`Login successful.Redirecting to homepage...`,
        //         type: "success"
        //     }
        // ]);

        // sessionStorage.setItem("loggedInUser", name);

        // setTimeout(()=>{
        //     router.push("/");
        // },2000);
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
        <form className="bg-white" onSubmit={handleSubmit}>
            <label  htmlFor="nameInput" className="block mb-2 text-sm font-medium">
                {/* Username: */}
                {t('login.label.username')}
            </label>
            <div >
                <input 
                // className=""
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

            <label  htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
                {/* Username: */}
                {t('login.label.password')}
            </label>
            <div >
                <input 
                // className=""
                id= "passwordInput"
                type = "password"
                value ={password}
                onChange={(event) => setPassword(event.target.value)}
                />
                {passwordError &&(
                    <div className="text-red-800">
                        {passwordError}
                    </div>
                )}
            </div>

            <button
            className="text-blue bg-blue hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
            >
                {/* Login */}
                {t('login.button')}
            </button>

            <Link href={`/signup`}>
            <button
            className="text-blue bg-blue hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"

            >
                Sign up 
            </button>
            </Link>
        </form>
        </>
    );
};

export default UserLoginForm;