import axios from "axios";
import { AppContext } from "../App";
import { useEffect, useState, useContext, createContext } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';



const Leaderboard = () => {
    const [leaders, setLeaders] = useState(null)

    useEffect(() => {
        getLeaders()
    },[])

    const getLeaders = async () => {
        try {
            const res = await axios.get("api/usergarbage/")
            setLeaders(res.data)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
        <h1>Week's Leaderboard</h1>
        {console.log(leaders)}
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {leaders && leaders.map(item => {
                    return (
                        <ListItem>
                            <ListItemText primary={item.rank} />
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={item.avatar} sx={{ width: 50, height: 50 }} />
                            </ListItemAvatar>
                            <ListItemText primary={item.username}/>
                            <ListItemText secondary={`${item.total / 1000} kg`} />
                        </ListItem>
                    )
                })}
            </List>
        </>
    )
}

export default Leaderboard