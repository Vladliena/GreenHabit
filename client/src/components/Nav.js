import { Link } from "react-router-dom";
import { Button, Stack} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Person2Icon from '@mui/icons-material/Person2';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import RecyclingIcon from '@mui/icons-material/Recycling';
import { bubble as Menu } from 'react-burger-menu'
import '../Nav.css'


const styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '36px'
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmBurgerBarsHover: {
        background: '#a90000'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenuWrap: {
        position: 'fixed',
        height: '100%'
    },
    bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0 0.5em',
        fontSize: '1.15em',
        whiteSpace: 'inherit'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    bmItem: {
        display: 'inline-block'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
}

const Nav = (props) => {
    const navigate = useNavigate();

    return (
        <div id="outer-container">
            <Menu styles={styles} pageWrapId={"page-wrap"} outerContainerId={"outer-container"}>
                <Button component={Link} style={{ color: 'rgb(184, 183, 173)', display: 'flex', justifyContent: 'space-around' }} to="/bin">
                    <RecyclingIcon /> <span style={{marginLeft:'30px'}}>Bin</span>
                </Button>
                <Button component={Link} style={{ color: 'rgb(184, 183, 173)', display: 'flex', justifyContent: 'space-around' }} to="/leaderboard">
                    <EmojiEventsIcon /> <span style={{ marginLeft: '30px' }}>Leaderboard</span>
                </Button>
                <Button component={Link} style={{ color: 'rgb(184, 183, 173)', display: 'flex', justifyContent: 'space-around' }} to="/results">
                    <LeaderboardIcon /> <span style={{ marginLeft: '30px' }}>Dashboard</span>
                </Button>
                <Button component={Link} style={{ color: 'rgb(184, 183, 173)', display: 'flex', justifyContent: 'space-around' }} to="/profile">
                    <Person2Icon /> <span style={{ marginLeft: '30px' }}>Profile</span>
                </Button>
            </Menu>
        </div>
    )
};

export default Nav