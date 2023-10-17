import axios from "axios";
import { AppContext } from "../App";
import { useEffect, useState, useContext, createContext } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import '../Leaderboard.css'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors'
const color = purple[300]



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
    }

    const getFriendData = async () => {
        try {
            const res = await axios.get(`/api/usergarbage/search/${friendUser}`)
            const data = res.data
            setFriendUser({
                username: data[0].username,
                avatar: data[0].avatar,
                total: (data[0].total / 1000).toFixed(2)
            })
            let myTotal = leaders.find((user) => user.username === userInfo.username)
            setMyUserTotal(myTotal)
            setFriendUploaded(true)

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div style={{ padding: '80px 200px', backgroundColor: '#BFAFF2', display: "flex", flexDirection: "column", backgroundImage: `url(${process.env.PUBLIC_URL + 'img/groupmain.svg'})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
            <h1 style={{ margin: 'auto', borderBottom: '5px dotted #F8D57E', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '20px' }}>Leaderboard</h1>
            <List sx={{ width: '100%', maxWidth: 360, backgroundColor: '#2B2B2B', margin: 'auto', padding: '16px', borderRadius: '20px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '10px' }}>
                    <span>Rank</span>
                    <span>Username</span>
                    <span>Result</span>
                </div>
                {leaders && leaders.map(item => {
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
                        {friendUploaded? (<div style={{ display: "flex" }}>
                            <ListItem style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', marginBottom: '8px', display: 'flex', justifyContent: 'space-around', display: 'flex', flexDirection: 'column', marginRight: '5px' }}>
                                <h3>{friendUser.username}</h3><span className="value" style={{ color: friendUser.total < myUserTotal.total ? 'green' : 'red' }}>{friendUser.total} kg</span>
                            </ListItem>
                            <ListItem style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', marginBottom: '8px', display: 'flex', justifyContent: 'space-around', display: 'flex', flexDirection: 'column', marginLeft: '5px' }}>
                                <h3>{myUserTotal.username}</h3><span className="value" style={{ color: myUserTotal.total < friendUser.total ? 'green' : 'red' }} >{(myUserTotal.total / 1000).toFixed(2)} kg</span>
                            </ListItem>
                            <Button color="secondary" type="button" onClick={() => setFriendUploaded(false)} style={{ marginLeft: '5px' }}>Search Again</Button>
                        </div>) : (<div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}><TextField sx={{ input: { color: 'rgba(255, 255, 255, 0.6)' } }} label="Find friend" color={"secondary"} focused onChange={(e) => setFriendUser(e.target.value)} style={{ marginRight: '5px' }} />
                            <Button color="secondary" type="button" onClick={getFriendData} style={{ marginLeft: '5px' }}>Search</Button></div>)}
                    </div>
                </div>
            </List>
        </div>
    )
}

export default Leaderboard