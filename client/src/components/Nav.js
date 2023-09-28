import { Link } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";

const Nav = (props) => {
    const { token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <Stack spacing={2} direction={"row"}>
            <Button component={Link} to="/bin">
                Bin
            </Button>
            <Button component={Link} to="/leaderboard">
                Leaderboard
            </Button>
            <Button component={Link} to="/results">
                Results
            </Button>
            <Button component={Link} to="/portfolio">
                Portfolio
            </Button>
            <Button component={Link} to="/login">
                Login
            </Button>
            <Button component={Link} to="/register">
                Register
            </Button>
        </Stack>
    )
};

export default Nav