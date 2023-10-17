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
        <div style={{ padding: '80px 200px', backgroundColor: '#BFAFF2', display: "flex", flexDirection: "column" }}>
            <h1 style={{ margin: 'auto', borderBottom: '5px dotted #F8D57E', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '20px' }}>Leaderboard</h1>
            <List sx={{ width: '100%', maxWidth: 360, backgroundColor: 'rgba(241, 245, 232, 1)', margin: 'auto', padding: '16px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <span>Rank</span>
                    <span>Username</span>
                    <span>Result</span>
                </div>
                {leaders && leaders.map(item => {
                    return (
                        <ListItem style={{ backgroundColor: item.username === userInfo.username ? '#C7F064' : '#FFFFFF', borderRadius: '20px', marginBottom: '8px', display: 'flex', justifyContent: 'space-around' }}>
                            <ListItemText primary={item.rank} />
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={item.avatar} sx={{ width: 50, height: 50 }} style={{position: 'relative', right: '30px'}} />
                            </ListItemAvatar>
                            <ListItemText primary={item.username === userInfo.username ? 'You' : item.username} style={{ position: 'relative', right: '20px' }} />
                            <ListItemText style={{position: 'relative', left:'32px'}} secondary={`${item.total / 1000} kg`} />
                        </ListItem>
                    )
                })}
            </List>
            <div style={{ width: '50%', margin: 'auto' }}>
                {friendUploaded && (<div>
                    <h3>{friendUser.username}</h3><span className="value" style={{ color: friendUser.total < myUserTotal.total ? 'green' : 'red' }}>{friendUser.total} kg</span>
                    <h3>{myUserTotal.username}</h3><span className="value" style={{ color: myUserTotal.total < friendUser.total ? 'green' : 'red' }} >{(myUserTotal.total / 1000).toFixed(2)} kg</span>
                </div>)}
                <input type="text" placeholder="other user name" onChange={(e) => setFriendUser(e.target.value)} />
                <button type="button" onClick={getFriendData}>Search</button>
            </div>
        </div>
    )
}

export default Leaderboard