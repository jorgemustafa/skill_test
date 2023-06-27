import {useEffect, useState} from "react";
import axiosClient from "./axios";


export default () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isSuperUser, setIsSuperUser] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(true)

    useEffect(() => {
        axiosClient.get("/api/user")
            .then((res) => {
                setFirstName(res.data.first_name)
                setLastName(res.data.last_name)
                setIsSuperUser(res.data.is_superuser);
                setIsAuthenticated(true);
            })
            .catch((error) => {
                setIsAuthenticated(false);
            });
    }, []);
    return {
        'firstName': firstName,
        'lastName': lastName,
        'isSuperUser': isSuperUser,
        'isAuthenticated': isAuthenticated,
    }
}
