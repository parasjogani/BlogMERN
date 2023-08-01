import axios from "axios"
import { config } from "../../utils/axiosConfig"
import { base_url } from "../../utils/baseUrl"

const addBlog = async (blogData) => {
    const response = await axios.post(`${base_url}blog/add`, blogData, config, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return response.data
}

const blogService = {
    addBlog,
}

export default blogService