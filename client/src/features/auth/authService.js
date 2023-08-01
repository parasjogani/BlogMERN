import axios from "axios"
import { base_url } from "../../utils/baseUrl"

const signup = async (userData) => {
    const response = await axios.post(`${base_url}auth/signup`, userData)
    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }
    return response.data
}

const authService = {
    signup
}

export default authService