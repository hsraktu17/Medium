import axios from "axios"
import { useEffect, useState } from "react"

export interface Blog{
    content: string,
    title: string,
    id: string,
    author: {
        name: string
    }
}

export const useBlog = ({id} : {id : string}) =>{
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>()

    useEffect(() => {
        axios.get(`https://backend.utkarsh172002srivastava.workers.dev/api/v1/blog/${id}`,{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then(response => {
            setBlog(response.data)
            setLoading(false)
        })
    },[id])

    return {
        loading,
        blog
    }
}

export const useBlogs = () =>{
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])


    useEffect(() => {
        axios.get(' https://backend.utkarsh172002srivastava.workers.dev/api/v1/blog/bulk',{
            headers : {
                Authorization : localStorage.getItem("token")
            }
        })
        .then(response => {
            setBlogs(response.data.blog)
            setLoading(false)
        })
    },[])

    return {
        loading,
        blogs
    }
}