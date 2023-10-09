import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";
import { Button, Stack } from "@mui/material";
import { Image } from "cloudinary-react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import "../Profile.css"
import Avatar from '@mui/material/Avatar';

const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
}


const Portfolio = ({ children }) => {
    const [fileInputState, SetFileInputState] = useState('')
    const [selectedFile, SetSelectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState('')
    const navigate = useNavigate();
    // const [uploaded, setUploaded] = useState(null)
    const { token, setToken, userInfo, setUserInfo, uploaded, setUploaded } = useContext(AppContext);

    const logout = async () => {
        try {
            const res = await axios.get("/api/users/logout", {
                headers: {
                    "x-access-token": null,
                },
            });
            if (res.status === 200) {
                setToken(null);
                navigate("/login");
            }
        } catch (err) {
            setToken(null);
            navigate("/login");
        }
    };
    // const [imageIds, setImageIds] = useState();

    // const loadimages = async () => {
    //     try {
    //         const res = await fetch('/api/images')
    //         const data = await res.json()
    //         console.log(data)
    //         setImageIds(data)
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // useEffect(() => {
    //     loadimages()
    // }, [])

    useEffect(() => {
        setPreviewSource(null)
    }, [token, uploaded])




    const handleSubmitFile = async (e) => {
        e.preventDefault();
        if (!previewSource) return
        uploadImage(previewSource);

    }

    const uploadImage = async (base64EncodedImage) => {
        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { "Content-type": "application/json" }
            });
            setUploaded(true)
        } catch (err) {
            console.log(err)
        }
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewFile(file)
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }


    return (
        <>
            <div className="card-container">
                {/* <h3>Set your avatar</h3>
            <form onSubmit={handleSubmitFile}>
                <input type="file" name="image" value={fileInputState} onChange={handleFileInputChange} />
                <button type="submit" >Submit</button>
            </form> */}
                {previewSource && (<img alt="chosen" src={previewSource} style={{ width: "150px" }} className="chosen-image" />)}
                <Stack direction="row" spacing={2}>
                    <Avatar alt="Remy Sharp" src={userInfo.avatar} sx={{ width: 100, height: 100 }} />
                </Stack>
                <h1>Welcome Back!</h1>
                <p>Username: {userInfo ? userInfo.username : "Guest"}</p>
                <p>First Name: {userInfo ? userInfo.first_name : "N/A"}</p>
                <p>Last Name: {userInfo ? userInfo.last_name : "N/A"}</p>
                <p>Email: {userInfo ? userInfo.email : "N/A"}</p>
                <Button onClick={logout}>Logout</Button>
                <UserContext.Provider value={{ userInfo, setUserInfo }}>
                    {children}
                </UserContext.Provider>
            </div>
        </>
    )
}

export default Portfolio