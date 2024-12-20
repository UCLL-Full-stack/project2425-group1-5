import { useRouter } from "next/router";
import { useState } from "react";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import UserService from "@/services/UserService";
import { Role } from "@/types";

const UserSignUpForm: React.FC = () => {
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<Role | undefined>(undefined);
    const [nameError, setNameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [roleError, setRoleError] = useState<string | null>(null);  
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const { t } = useTranslation();
  
    const clearErrors = () => {
        setNameError(null);
        setPasswordError(null);
        setEmailError(null);
        setRoleError(null);
        setStatusMessages([]);
    };
  
    const validate = (): boolean => {
        let result = true;
  
        if (!name || name.trim() === "") {
            setNameError(t("login.validate.name"));
            result = false;
        }

        if (!email || email.trim() === "") {
            setEmailError(t("login.validate.email"));
            result = false;
        }

        if (!password || password.trim() === "") {
            setPasswordError(t("login.validate.password"));
            result = false;
        }

        if (!role) {
            setRoleError("Role is required.");
            result = false;
        }
  
        return result;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        clearErrors();
    
        if (!validate()) {
            return;
        }
    
        const user = { name, password, email, role };
        console.log("Request Payload:", user); // Log the payload
    
        try {
            const response = await UserService.signupUser(user);
            console.log("Response:", response); // Log the response
    
            if (response.status === 200) {
                setStatusMessages([{ message: t('login.success'), type: 'success' }]);
    
                const user = await response.json();
                localStorage.setItem(
                    'loggedInUser',
                    JSON.stringify({
                        token: user.token,
                        name: user.name,
                        role: user.role,
                    })
                );
                router.push("/");
            } else if (response.status === 401) {
                const { errorMessage } = await response.json();
                setStatusMessages([{ message: errorMessage, type: 'error' }]);
            } else {
                setStatusMessages([
                    {
                        message: t('general.error'),
                        type: 'error',
                    }
                ]);
            }
        } catch (error) {
            console.error('Error:', error);
            setStatusMessages([{ message: t('general.error'), type: 'error' }]);
        }
    };

    return (
        <>
            <h3 className="text-center mb-4">Sign up</h3>
            {statusMessages && (
                <div className="status-message-container">
                    <ul>
                        {statusMessages.map(({ message, type }, index) => (
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
                <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
                    {t('login.label.username')}
                </label>
                <div>
                    <input
                        id="nameInput"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    {nameError && (
                        <div className="text-red-800">
                            {nameError}
                        </div>
                    )}
                </div>

                <label htmlFor="emailInput" className="block mb-2 text-sm font-medium">
                    {t('login.label.email')}
                </label>
                <div>
                    <input
                        id="emailInput"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    {emailError && (
                        <div className="text-red-800">
                            {emailError}
                        </div>
                    )}
                </div>

                <label htmlFor="passwordInput" className="block mb-2 text-sm font-medium">
                    {t('login.label.password')}
                </label>
                <div>
                    <input
                        id="passwordInput"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {passwordError && (
                        <div className="text-red-800">
                            {passwordError}
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block font-medium">
                        {t('login.label.role')}
                    </label>
                    <select
                        value={role || ""}
                        onChange={(e) => setRole(e.target.value as Role)}
                        className="border rounded-md p-2 w-full"
                    >
                        <option value="doctor">doctor</option>
                        <option value="patient">patient</option>
                        <option value="admin">admin</option>
                    </select>
                    {roleError && (
                        <div className="text-red-800">
                            {roleError}
                        </div>
                    )}
                </div>

                <button
                    className="text-blue bg-blue hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                >
                   Sign up
                </button>
            </form>
        </>
    );
};

export default UserSignUpForm;