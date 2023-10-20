import axios from "axios";
import { AppContext } from "../App";
import { useEffect, useState, useContext, createContext } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import '../Leaderboard.css'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors'
import {ThreeDots } from 'react-loader-spinner'



const Leaderboard = () => {
    const [leaders, setLeaders] = useState(null)
    const { userInfo } = useContext(AppContext)
    const [friendUser, setFriendUser] = useState({
        username: '',
        avatar: '',
        total: null
    })
    const [friendUploaded, setFriendUploaded] = useState(false)
    const [myUserTotal, setMyUserTotal] = useState(null)
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        getLeaders()
    }, [])

    const getLeaders = async () => {
        try {
            const res = await axios.get("api/usergarbage/")
            setLeaders(res.data)
        } catch (err) {
            console.log(err)
        }
        setLoader(false)
    }

    const getFriendData = async () => {
        try {
            const res = await axios.get(`/api/usergarbage/search/${friendUser}`)
            const data = res.data
            setFriendUser({
                username: data[0].username,
                avatar: data[0].avatar,
                total: data[0].total
            })
            let myTotal = leaders.find((user) => user.username === userInfo.username)
            setMyUserTotal(myTotal)
            setFriendUploaded(true)

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div style={{ padding: '80px 200px', backgroundColor: '#BFAFF2', display: "flex", flexDirection: "column", backgroundImage: loader? 'inherit':`url(${process.env.PUBLIC_URL + 'img/groupmain.svg'})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        {loader?
                (<div style={{ margin: 'auto', display: "flex", flexDirection: "column", padding:'200px' }}>
                    <h1 style={{ margin: 'auto', color: 'rgba(255, 255, 255, 1)', marginBottom: '20px' }}>Loading...</h1>
                    <ThreeDots
                        height="100"
                        width="300"
                        radius="9"
                        color="#AA4E78"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    /></div>) : (<div style={{display: "flex", flexDirection: "column"}}>
            <h1 style={{ margin: 'auto', borderBottom: '5px dotted #F8D57E', color: 'rgba(255, 255, 255, 1)', marginBottom: '20px' }}>Leaderboard</h1>
            <List sx={{ width: '100%', maxWidth: 360, backgroundColor: '#2B2B2B', margin: 'auto', padding: '16px', borderRadius: '20px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '10px' }}>
                    <span>Rank</span>
                    <span>Username</span>
                    <span>Result</span>
                </div>
                {leaders && leaders.slice(0,5).map(item => {
                    return (
                        <ListItem style={{ backgroundColor: item.username === userInfo.username ? '#C7F064' : '#FFFFFF', borderRadius: '20px', marginBottom: '8px', display: 'flex', justifyContent: 'space-around' }}>
                            {(() => {
                                switch (item.rank) {
                                    case '1':
                                        return <ListItemText><EmojiEventsIcon sx={{ width: 30, height: 30 }} style={{ fill: 'gold', position: 'relative', top: '3px' }} /></ListItemText>;
                                    case '2':
                                        return <ListItemText><EmojiEventsIcon sx={{ width: 30, height: 30 }} style={{ fill: 'grey', position: 'relative', top: '3px' }} /></ListItemText>;
                                    case '3':
                                        return <ListItemText><EmojiEventsIcon sx={{ width: 30, height: 30 }} style={{ fill: 'brown', position: 'relative', top: '3px' }} /></ListItemText>;
                                    default:
                                        return <ListItemText primary={item.rank} />;
                                }
                            })()}
                            {/* <ListItemText primary={item.rank} /> */}
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={item.avatar} sx={{ width: 50, height: 50 }} style={{ position: 'relative', right: '30px' }} />
                            </ListItemAvatar>
                            <ListItemText primary={item.username === userInfo.username ? 'You' : item.username} style={{ position: 'relative', right: '20px' }} />
                            <ListItemText style={{ position: 'relative', left: '32px' }} secondary={`${item.total / 1000} kg`} />
                        </ListItem>
                    )
                })}

                <div style={{ display: 'flex', margin: 'auto', flexDirection: 'column', textAlign: 'center', marginTop: '30px'}}>
                    <h3 style={{ borderBottom: '5px dotted #F8D57E', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '300' }}>Want to see your friend results?</h3>
                    <div style={{ margin: 'auto', marginTop: "20px"}}>
                        {friendUploaded? (<div style={{ display: "flex", flexDirection: 'column' }}>
                        {console.log( typeof  myUserTotal.total)}
                                    <div style={{ display: "flex" }}>
                            <ListItem style={{minWidth:'150px' ,backgroundColor: '#FFFFFF', borderRadius: '20px', marginBottom: '8px', display: 'flex', justifyContent: 'space-around', display: 'flex', flexDirection: 'column', marginRight: '5px' }}>
                                <h3>{friendUser.username}</h3><span className="value" style={{ color: parseFloat(friendUser.total) < parseFloat(myUserTotal.total) ? 'green' : 'red' }}>{(friendUser.total / 1000).toFixed(2)} kg</span>
                            </ListItem>
                                        <ListItem style={{ minWidth: '150px', backgroundColor: '#FFFFFF', borderRadius: '20px', marginBottom: '8px', display: 'flex', justifyContent: 'space-around', display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                                            <h3>You</h3><span className="value" style={{ color: parseFloat(myUserTotal.total) < parseFloat(friendUser.total) ? 'green' : 'red' }} >{(myUserTotal.total / 1000).toFixed(2)} kg</span>
                            </ListItem>
                            </div>
                            <Button color="secondary" type="button" onClick={() => setFriendUploaded(false)} style={{ marginLeft: '5px'}}>Search Again</Button>
                        </div>) : (<div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}><TextField sx={{ input: { color: 'rgba(255, 255, 255, 0.6)' } }} label="Find friend" color={"secondary"} focused onChange={(e) => setFriendUser(e.target.value)} style={{ marginRight: '5px' }} />
                            <Button color="secondary" type="button" onClick={getFriendData} style={{ marginLeft: '5px' }}>Search</Button></div>)}
                    </div>
                </div>
            </List>
        </div>)
            }</div>
    )
}

export default Leaderboard