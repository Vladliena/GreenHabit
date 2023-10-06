import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { AppContext } from "../App";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 65,
        top: 65,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '15px',
    },
}));

const Bin = () => {
    const [garbage, setGarbage] = useState([])
    const [selectOption, setSelectedOption] = useState(null)
    const { token, userInfo, setUserInfo } = useContext(AppContext);
    const [plasticBin, setPlasticBin] = useState({
        user_id: userInfo.user_id,
        garbage_id: 1,
        weight: 0,
        type: "plastic"
    })
    const [glassBin, setGlassBin] = useState({
        user_id: userInfo.user_id,
        garbage_id: 2,
        weight: 0,
        type: "glass"
    })
    const [fabricsBin, setFabricsBin] = useState({
        user_id: userInfo.user_id,
        garbage_id: 3,
        weight: 0,
        type: "fabric"
    })


    useEffect(() => {
        allProducts()
    }, [])

    const allProducts = async () => {
        try {
            const res = await fetch(`/api/waste`);
            const data = await res.json();
            console.log(data)

            setGarbage(data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = (waste_type, weightSelect) => {
        console.log(waste_type, weightSelect)
        switch (waste_type) {
            case 'Plastic':
                setPlasticBin((prevState) => ({ ...prevState, weight: prevState.weight + weightSelect }))
                break;
            case 'Glass':
                setGlassBin((prevState) => ({ ...prevState, weight: prevState.weight + weightSelect }))
                break;
            case 'Fabrics':
                setFabricsBin((prevState) => ({ ...prevState, weight: prevState.weight + weightSelect }))
                break;
            default:
                console.log(`Sorry, something didn't work`);
        }
    }

    const sendGarbageUserData = async () => {
        try{
            const data = await axios.post('/api/usergarbage/dump', [
                plasticBin,
                glassBin,
                fabricsBin
            ])
        } catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            {console.log(userInfo.user_id)}
            <IconButton aria-label="cart">
                <StyledBadge badgeContent={"Plastic Bin" + plasticBin.weight} color="secondary">
                    <DeleteSharpIcon sx={{ width: 130, height: 130 }} />
                </StyledBadge>
            </IconButton>
            <IconButton aria-label="cart">
                <StyledBadge badgeContent={'Glass Bin' + glassBin.weight} color="secondary">
                    <DeleteSharpIcon sx={{ width: 130, height: 130 }} />
                </StyledBadge>
            </IconButton>
            <IconButton aria-label="cart">
                <StyledBadge badgeContent={`Fabric Bin ${fabricsBin.weight}`} color="secondary">
                    <DeleteSharpIcon sx={{ width: 130, height: 130 }} />
                </StyledBadge>
            </IconButton>
            <button onClick={sendGarbageUserData}>Recycle</button>

            <ImageList cols={5}>
                {garbage && garbage.map((item, index) => (
                    <div key={index}>
                        <ImageListItem>
                            <img
                                srcSet={`${item.image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.image_url}?w=248&fit=crop&auto=format`}
                                alt="image"
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={item.type}
                                subtitle={<span>
                                    {/* <p>Can be recycled in bin: {item.recycled ? "Yes" : "No (find a specific recycle point for this type of waste)"}</p> */}
                                    <select onChange={(e) => setSelectedOption(e.target.value)}>
                                        <option value="" disabled selected>Select weight</option>
                                        <option value={item.s_size}>{item.s_size} {item.base_unit}</option>
                                        <option value={item.m_size}>{item.m_size} {item.base_unit}</option>
                                        <option value={item.l_size}>{item.l_size} {item.base_unit}</option>
                                    </select>
                                    <button type="button" onClick={() => handleSubmit(item.type, +selectOption)}>Add to bin</button>
                                </span>}
                                position="below"
                            />
                        </ImageListItem>
                    </div>
                ))}
            </ImageList>
        </div>
    )
}


export default Bin