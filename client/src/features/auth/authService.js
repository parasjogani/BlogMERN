import axios from "axios"
import { base_url } from "../../utils/baseUrl"

const signup = async (userData) => {
    const response = await axios.post(`${base_url}auth/signup`, userData)
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
}

const login = async (userData) => {
    const response = await axios.post(`${base_url}auth/login`, userData)
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
}

const logout = async () => {
    const response = await axios.post(`${base_url}auth/logout`)
    localStorage.removeItem("user")
    return response.data
}

const authService = {
    signup,
    login,
    logout,
}

export default authService