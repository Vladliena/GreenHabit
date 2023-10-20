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
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {ThreeDots} from 'react-loader-spinner'
import FactoryIcon from '@mui/icons-material/Factory';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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
    const [loader, setLoader] = useState(true)


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
        setLoader(false)
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
        <div style={{ padding: '105px 100px', display: "flex", flexDirection: "column", backgroundColor: '#BFAFF2', backgroundImage: 'inherit', backgroundPosition: 'right', backgroundRepeat: 'no-repeat' }}>
            {loader ?
                (<div style={{ margin: 'auto', display: "flex", flexDirection: "column", padding: '200px' }}>
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
                    /></div>) :

                (<div style={{ backgroundColor: '#2B2B2B', padding: '16px', borderRadius: '20px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ textAlign: "center", marginBottom: "80px", borderBottom: '5px dotted #F8D57E', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <div style={{display: 'flex', alignSelf: 'left'}}>
                        <StyledBadge badgeContent={<span style={{ fontSize: '12px', lineHeight: '1.5' }}>Plastic <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{getTotalWeightByType('Plastic')}kg</span></span>} style={{ color: 'white' }}>
                            <DeleteSharpIcon aria-label="cart" sx={{ width: 130, height: 130 }} style={{ fill: '#FA563C' }} />
                        </StyledBadge>
                        <StyledBadge badgeContent={<span style={{ fontSize: '12px', lineHeight: '1.5' }}>Glass <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{getTotalWeightByType('Glass')}kg</span></span>} style={{ color: 'white' }}>
                            <DeleteSharpIcon aria-label="cart" sx={{ width: 130, height: 130 }} style={{ fill: '#1C9BDE' }} />
                        </StyledBadge>
                        <StyledBadge badgeContent={<span style={{ fontSize: '12px', lineHeight: '1.5' }}>Paper <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{getTotalWeightByType('Paper')}kg</span></span>} style={{ color: 'white' }}>
                            <DeleteSharpIcon aria-label="cart" sx={{ width: 130, height: 130 }} style={{ fill: '#DEC21B' }} />
                        </StyledBadge>
                        </div>
                        <div style={{marginLeft: '50px'}}>
                        <StyledBadge badgeContent={<span style={{ fontSize: '12px', lineHeight: '1.5', position: 'absolute', left: '-28px', top: '-10px' }}>Other <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{getTotalWeightByType('Other')}kg</span></span>} style={{ color: 'white' }}>
                            <LocalShippingIcon aria-label="cart" sx={{ width: 130, height: 130 }} style={{ fill: '#CF882A', position: 'relative' }} />
                        </StyledBadge>
                        </div>
                        <div>
                        <FactoryIcon aria-label="cart" sx={{ width: 130, height: 130 }} style={{ fill: 'lightgrey' }} />
                            <Popup
                                trigger={<Button style={{ display: "block", margin: "auto", color: 'lightgrey'}}>Recycle</Button>}
                                modal
                                nested
                            >
                                {close => (
                                    <div className="modal" style={{ backgroundColor: '#2B2B2B', color: 'rgba(255, 255, 255, 0.6)', }}>
                                        {/* <button className="close" onClick={close}>
                                            &times;
                                        </button> */}
                                        <div className="header" style={{ color: 'rgba(255, 255, 255, 0.6)', }}> Your waste was recycled!</div>
                                        <div style={{ width: '400px', margin: 'auto'}}>
                                            <img style={{ width: '100%', display: 'block' }} alt="img" src="https://res.cloudinary.com/dkmsj7cut/image/upload/v1697748677/waste_type/christopher-vega-nnlRR2NF2ko-unsplash_1_1_t5wyjr.png"></img>
                                        </div>
                                        <div className="actions">
                                            <Button
                                                style={{ color: '#AA4E78' }}
                                                className="button"
                                                onClick={() => {
                                                    sendGarbageUserData();
                                                    close();
                                                }}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Popup>
                        {/* <Button onClick={sendGarbageUserData} style={{ display: "block", margin: "auto" }}>Recycle</Button> */}
                        </div>
                    </div>
                    <ImageList cols={4} gap={10}>
                        {garbage && garbage.map((item, index) => (
                            <Card sx={{ maxWidth: 325 }} style={{ marginBottom: '10px', borderRadius: '20px', backgroundColor: '#FFF' }}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={item.image_url}
                                    title="garbage"
                                    key={index}
                                />
                                <CardContent>
                                    <Typography style={{ fontWeight: '400', borderBottom: '5px dotted #F8D57E' }} gutterBottom variant="h6" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography style={{ marginBottom: '10px' }} variant="body2" color="text.secondary">
                                        {item.recycled ? <Alert severity="success">
                                            <AlertTitle>Recyclable</AlertTitle>
                                            This type of waste can be recycle from bin — <strong>Just Put It To The Right Bin!</strong>
                                        </Alert> : <Alert severity="warning">
                                            <AlertTitle>Non-Recyclable</AlertTitle>
                                            This type of waste can't be recycled from bin — <strong>Find a Special Waste Drop-Off Site!</strong>
                                        </Alert>}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ flexDirection: "column" }}>
                                    <Box sx={{ minWidth: 160 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label" style={{ fontWeight: '300' }}>Select weight</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectOption}
                                                label="Weight"
                                                onChange={(e) => setSelectedOption(e.target.value)}
                                                style={{ fontWeight: '300', border: '1px white solid' }}
                                            >
                                                <MenuItem value={item.s_size}>{item.s_size} {item.base_unit}</MenuItem>
                                                <MenuItem value={item.m_size}>{item.m_size} {item.base_unit}</MenuItem>
                                                <MenuItem value={item.l_size}>{item.l_size} {item.base_unit}</MenuItem>
                                            </Select>
                                            <Button style={{ color: '#AA4E78' }} type="button" onClick={() => handleSubmit(item.type, item.garbage_id)}>Add to bin</Button>
                                        </FormControl>
                                    </Box>
                                </CardActions>
                            </Card>

                        ))}
                    </ImageList>
                </div>)
            }
        </div>
    )
}


export default Bin