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
        <>
            <h1>Week's Leaderboard</h1>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {leaders && leaders.map(item => {
                    return (
                        <ListItem>
                            <ListItemText primary={item.rank} />
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={item.avatar} sx={{ width: 50, height: 50 }} />
                            </ListItemAvatar>
                            <ListItemText primary={item.username} />
                            <ListItemText secondary={`${item.total / 1000} kg`} />
                        </ListItem>
                    )
                })}
            </List>
            {friendUploaded && (<div>
                <h3>{friendUser.username}</h3><span className="value" style={{ color: friendUser.total < myUserTotal.total ? 'green' : 'red' }}>{friendUser.total}</span>
                <h3>{myUserTotal.username}</h3><span className="value" style={{ color: myUserTotal.total < friendUser.total ? 'green' : 'red' }} >{(myUserTotal.total / 1000).toFixed(2)}</span>
            </div>)}
            <input type="text" placeholder="other user name" onChange={(e) => setFriendUser(e.target.value)} />
            <button type="button" onClick={getFriendData}>Search</button>
        </>
    )
}

export default Leaderboard