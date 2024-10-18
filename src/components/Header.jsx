import React, { useEffect, useRef } from "react";
import { getDatabase, setCurrentUser } from "../Database";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const logout = () => {
        setCurrentUser({});
        window.location.reload();
    };

    useEffect(() => {
        const database = getDatabase();

        if (database.currentUser.id == undefined) {
            navigate("/");
        }
    }, []);

    return (
        <div className="flex justify-between items-center w-full h-12 bg-white">
            <h1 className="m-8 text-xl text-bolder">Comment Section</h1>
            <button
                className="h-full px-8 bg-moderate-blue text-white hover:bg-moderate-blue/90"
                onClick={logout}
            >
                Logout
            </button>
        </div>
    );
}

export default Header;
