import React, { useEffect } from "react";
import { getDatabase, initDatabase, setCurrentUser } from "../Database";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const getFormData = (form) => {
        const formData = new FormData(form);
        return Object.fromEntries(formData.entries());
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const database = getDatabase();
        const formData = getFormData(e.target);

        for (const account of database.accounts) {
            if (
                account.username === formData.username &&
                account.password === formData.password
            ) {
                database.currentUser = account;
                setCurrentUser(account);
                window.location.reload();
                continue;
            }
        }
    };

    useEffect(() => {
        const database = getDatabase();
        if (!database) initDatabase();

        console.log(database.accounts);

        if (database.currentUser.id != undefined) {
            navigate("/comments");
        }
    }, []);

    return (
        <div className="h-screen grid place-items-center bg-very-light-gray">
            <form
                onSubmit={handleLogin}
                className="flex flex-col gap-6 p-6 w-80 bg-white"
            >
                <h1 className="w-full text-center text-2xl font-bold">Login</h1>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Username"
                        className="py-2 px-4 border rounded-full"
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        className="py-2 px-4 border rounded-full"
                    />
                    <button
                        type="submit"
                        className="py-2 px-4 rounded-full bg-moderate-blue text-white"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
