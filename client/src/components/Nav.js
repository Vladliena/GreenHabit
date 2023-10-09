import { Link } from "react-router-dom";
import { Button, Stack, colors } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Person2Icon from '@mui/icons-material/Person2';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import RecyclingIcon from '@mui/icons-material/Recycling';

const Nav = (props) => {
    const { token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: "20px" }}>
            <Stack spacing={2} direction={"row"} style={{ margin: "auto" }}>
                <Button component={Link} style={{ color: '#111' }} to="/bin">
                    <RecyclingIcon />
                </Button>
                <Button component={Link} style={{ color: '#111' }} to="/leaderboard">
                    <EmojiEventsIcon />
                </Button>
                <Button component={Link} style={{ color: '#111' }} to="/results">
                    <LeaderboardIcon />
                </Button>
                <Button component={Link} style={{ color: '#111' }} to="/profile">
                    <Person2Icon />
                </Button>
            </Stack>
        </div>
    )
};

export default Nav