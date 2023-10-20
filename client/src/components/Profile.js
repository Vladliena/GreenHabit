import { useEffect, useState, useContext, createContext } from "react";
import axios from "axios";
import { Button, Stack } from "@mui/material";
import { Image } from "cloudinary-react"
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import '../Profile.css'
import Avatar from '@mui/material/Avatar';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {ThreeDots } from 'react-loader-spinner'

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
    const { token, setToken, userInfo, setUserInfo, uploaded, setUploaded, loader, setLoader } = useContext(AppContext);

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
        <div style={{ padding: '105px 200px', display: "flex", flexDirection: "column", backgroundColor: '#BFAFF2', backgroundImage: 'inherit', backgroundPosition: 'right', backgroundRepeat: 'no-repeat' }}>
            {loader ? (<div style={{ margin: 'auto', display: "flex", flexDirection: "column", padding: '200px' }}>
                <h1 style={{ margin: 'auto', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '20px' }}>Loading...</h1>
                <ThreeDots
                    height="100"
                    width="300"
                    radius="9"
                    color="#AA4E78"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                /></div>) :
                (<div className="card-container">
                    <Stack direction="row" spacing={2}>
                        <Avatar alt="Remy Sharp" src={userInfo.avatar} sx={{ width: 100, height: 100 }} style={{ marginBottom: '8px', border: '5px dotted #F8D57E' }} />
                    </Stack>
                    <Popup
                        trigger={<Button className="button" style={{ color: '#AA4E78', fontSize: '13px' }}> Change avatar </Button>}
                        modal
                        nested
                    >
                        {close => (
                            <div className="modal" style={{ backgroundColor: '#FFF'}}>
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div className="header"> Change Avatar </div>
                                <div className="content" style={{ width: '100%', margin: 'auto', padding: '16px', borderRadius: '20px', marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                                    {' '}
                                    <form onSubmit={(e) => { handleSubmitFile(e); close() }} style={{margin: 'auto', display: 'flex', alignItems: 'center' }}>
                                        <input type="file" name="image" value={fileInputState} onChange={handleFileInputChange} style={{ border: '1px white solid'}} />
                                        <Button style={{ color: '#AA4E78' }} type="submit">Submit</Button>
                                    </form>
                                    {previewSource && (<Avatar alt="chosen" sx={{ width: 250, height: 250 }} src={previewSource} className="chosen-image" />)}
                                </div>
                                <div className="actions">
                                    <Button
                                        style={{ color: '#AA4E78' }}
                                        className="button"
                                        onClick={() => {
                                            console.log('modal closed ');
                                            close();
                                        }}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        )}
                    </Popup>
                    <div style={{ marginTop: "25px", display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <h1>Welcome Back!</h1>
                        <p>Username: {userInfo ? userInfo.username : "Guest"}</p>
                        <p>First Name: {userInfo ? userInfo.first_name : "N/A"}</p>
                        <p>Last Name: {userInfo ? userInfo.last_name : "N/A"}</p>
                        <p>Email: {userInfo ? userInfo.email : "N/A"}</p>
                        <Button style={{ marginTop: '20px', color: 'darkgrey' }} onClick={logout}>Logout</Button>
                        <UserContext.Provider value={{ userInfo, setUserInfo }}>
                            {children}
                        </UserContext.Provider>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Portfolio