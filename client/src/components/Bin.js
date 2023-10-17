import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import { AppContext } from "../App";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 65,
        top: 65,
        padding: '15px',
    },
}));

const Bin = () => {
    const [garbage, setGarbage] = useState([])
    const [selectOption, setSelectedOption] = useState()
    const { userInfo } = useContext(AppContext);
    const [garbageBins, setGarbageBins] = useState([])
    const [dataSent, setDataSent] = useState(false)


    useEffect(() => {
        allProducts()
    }, [])

    const allProducts = async () => {
        try {
            const res = await fetch(`/api/waste`);
            const data = await res.json();

            setGarbage(data);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = (waste_type, garbage_id) => {
        const typeWeight = parseFloat(selectOption)
        const newWaste = {
            user_id: userInfo.user_id,
            garbage_id: garbage_id,
            weight: typeWeight,
            type: waste_type
        }
        const existingWaste = garbageBins.findIndex((bin) => bin.garbage_id === garbage_id);
        if (existingWaste !== -1) {
            setGarbageBins((prevState) => {
                prevState[existingWaste].weight += typeWeight;
                return [...prevState];
            });
        } else {
            setGarbageBins((prevState) => [...prevState, newWaste])
        }
    }

    const sendGarbageUserData = async () => {
        try {
            await axios.post('/api/usergarbage/dump', garbageBins)
        } catch (err) {
            console.log(err)
        }
    }

    const getTotalWeightByType = (typename) => {
        return garbageBins
            .filter((bin) => bin.type === typename)
            .reduce((total, bin) => total + bin.weight, 0);
    }

    return (
        <div>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
                <StyledBadge badgeContent={<span style={{ fontSize: '12px', lineHeight: '1.5' }}>Plastic <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{getTotalWeightByType('Plastic')}kg</span></span>} style={{ color: 'white'}}>
                    <DeleteSharpIcon aria-label="cart" sx={{ width: 130, height: 130 }} style={{ fill: '#FA563C' }} />
            </StyledBadge>
                <StyledBadge badgeContent={<span style={{ fontSize: '12px', lineHeight: '1.5' }}>Glass <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{getTotalWeightByType('Glass')}kg</span></span>} style={{ color: 'white' }}>
                    <DeleteSharpIcon aria-label="cart" sx={{ width: 130, height: 130 }} style={{ fill: '#1C9BDE' }} />
            </StyledBadge>
                <StyledBadge badgeContent={<span style={{ fontSize: '12px', lineHeight: '1.5' }}>Paper <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{getTotalWeightByType('Paper')}kg</span></span>} style={{ color: 'white' }}>
                    <DeleteSharpIcon aria-label="cart" sx={{ width: 130, height: 130 }} style={{ fill: '#DEC21B' }} />
            </StyledBadge>
                <StyledBadge badgeContent={<span style={{ fontSize: '12px', lineHeight: '1.5' }}>Other <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{getTotalWeightByType('Other')}kg</span></span>} style={{ color: 'white' }}>
                    <DeleteSharpIcon aria-label="cart" sx={{ width: 130, height: 130 }} style={{ fill: '#CF882A' }} />
            </StyledBadge>
            <Button onClick={sendGarbageUserData} style={{display:"block", margin: "auto"}}>Recycle</Button>
            </div>

            <ImageList cols={4}>
                {garbage && garbage.map((item, index) => (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image={item.image_url}
                            title="garbage"
                            key={index}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.recycled ? <Alert severity="success">
                                    <AlertTitle>Recycled</AlertTitle>
                                    This type of waste can be recycle from bin — <strong>Just Put It To The Right Bin!</strong>
                                </Alert> : <Alert severity="warning">
                                    <AlertTitle>Non-Recycled</AlertTitle>
                                    This type of waste can't be recycled from bin — <strong>Find a Special Waste Drop-Off Site!</strong>
                                </Alert>}
                            </Typography>
                        </CardContent>
                        <CardActions style={{ flexDirection: "column"}}>
                            <Box sx={{ minWidth: 160 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select weight</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectOption}
                                        label="Weight"
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                    >
                                        <MenuItem value={item.s_size}>{item.s_size} {item.base_unit}</MenuItem>
                                        <MenuItem value={item.m_size}>{item.m_size} {item.base_unit}</MenuItem>
                                        <MenuItem value={item.l_size}>{item.l_size} {item.base_unit}</MenuItem>
                                    </Select>
                                    <Button type="button" onClick={() => handleSubmit(item.type, item.garbage_id)}>Add to bin</Button>
                                </FormControl>
                            </Box>
                        </CardActions>
                    </Card>

                ))}
            </ImageList>
        </div>
    )
}


export default Bin