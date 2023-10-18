import axios from "axios";
import { AppContext } from "../App";
import { useEffect, useState, useContext, createContext } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    BarChart,
    Legend,
    Bar,
    LineChart,
    Line

} from "recharts";
import { ThreeCircles, ThreeDots } from 'react-loader-spinner'


const Results = (props) => {
    const { token, userInfo } = useContext(AppContext)
    const [LastResults, setLastResults] = useState()
    const [nonRecyceResult, setNonRecycle] = useState()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        fetchWasteData()
    }, [])


    const fetchWasteData = async () => {
        const todayDate = new Date().toJSON().slice(0, 10)
        let currentDate = new Date()
        currentDate.setDate(currentDate.getDate() - 1);
        let yesterdayDate = currentDate.toJSON().slice(0, 10)
        console.log('today =>', todayDate, 'yesterday =>', yesterdayDate)
        try {
            const res = await axios.get(`/api/usergarbage/${userInfo.user_id}`)
            console.log('all data =>', res.data)
            const flattenedData = res.data.reduce((result, item) => {
                const existingType = result.find((el) => el.type === item.type);
                if (existingType) {
                    existingType.totalAll += parseFloat(item.total)
                    if (item.date.includes(yesterdayDate)) {
                        existingType.yesterday = parseFloat(existingType.yesterday) + parseFloat(item.total);
                    } else if (item.date.includes(todayDate)) {
                        existingType.today = parseFloat(existingType.today) + parseFloat(item.total);
                    }
                } else {
                    if (item.date.includes(yesterdayDate)) {
                        result.push({ type: item.type, yesterday: parseFloat(item.total), today: 0, totalAll: 0, recycled: item.recycled });
                    } else {
                        result.push({ type: item.type, yesterday: 0, today: parseFloat(item.total), totalAll: 0, recycled: item.recycled });
                    }
                }
                return result;
            }, []);
            const udpatedData = flattenedData.map(item => ({
                ...item,
                yesterday: (item.yesterday / 1000).toFixed(2),
                today: (item.today / 1000).toFixed(2),
                totalAll: (item.totalAll / 1000).toFixed(2)
            }))
            console.log('updated data =>', udpatedData)
            setLastResults(udpatedData)
            const nonRecycle = res.data.filter(el => !el.recycled)
            const nonRecycleSum = nonRecycle.reduce((accumulator, item) => {
                const { title, total } = item;
                if (!accumulator[title]) {
                    accumulator[title] = 0
                }
                accumulator[title] += parseFloat(total);
                return accumulator;
            }, {});

            const nonRecycleArray = Object.entries(nonRecycleSum).map(([title, totalAll]) => ({ title, totalAll }));

            setNonRecycle(nonRecycleArray);
            console.log('finished')
        } catch (err) {
            console.log('error =>', err)
        }
        setLoader(false)
    }

    return (
        <div style={{ padding: '80px 200px', display: "flex", flexDirection: "column", backgroundColor: '#BFAFF2', backgroundImage: loader? 'inherit': `url(${process.env.PUBLIC_URL + 'img/RightGraphic.svg'})`, backgroundPosition: 'right', backgroundRepeat: 'no-repeat' }}>
            {loader ? (<div style={{ margin: 'auto', display: "flex", flexDirection: "column", padding: '200px' }}>
                <h1 style={{ margin: 'auto', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '20px' }}>Loading...</h1>
                <ThreeDots
                    height="100"
                    width="300"
                    radius="9"
                    color="#AA4E78"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                /></div>) : (
        <div>
            <div style={{ padding: '30px', margin: 'auto', borderRadius: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>

                                <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#2B2B2B', borderRadius: '20px', paddingTop: '10px' }}>
                                    <h3 style={{ margin: 'auto', position: 'relative', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '300', borderBottom: '5px dotted #F8D57E', marginBottom: '20px' }}>Today/Yesterday waste results (kg)</h3>
                        <AreaChart
                            width={500}
                            height={250}
                            data={LastResults}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="type" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="yesterday"
                                stackId="1"
                                            stroke="#BFAFF2"
                                            fill="#BFAFF2"
                            />
                            <Area
                                type="monotone"
                                dataKey="today"
                                stackId="1"
                                stroke="#F8D57E"
                                fill="#F8D57E"
                            />
                            <Legend />
                        </AreaChart>
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#2B2B2B', borderRadius: '20px', paddingTop:'10px' }}>
                        <h3 style={{ margin: 'auto', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '300', borderBottom: '5px dotted #F8D57E', marginBottom: '20px' }}>Monthly waste results (kg)</h3>
                        <BarChart
                            width={500}
                            height={250}
                            data={LastResults}
                            style={{ position: 'relative', left: '-50px' }}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 80,
                                bottom: 5,
                            }}
                            barSize={20}
                        >
                            <XAxis
                                dataKey="type"
                                scale="point"
                                padding={{ left: 10, right: 10 }}
                            />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <CartesianGrid strokeDasharray="3 3" />
                                        <Bar dataKey="totalAll" fill="#AA4E78" background={{ fill: "#eee" }} />
                        </BarChart>
                    </div>
                </div>

                {nonRecyceResult && (
                    <div>
                                    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#2B2B2B', borderRadius: '20px', paddingTop: '10px' }}>
                                        <h3 style={{ margin: 'auto', color: 'rgba(255, 255, 255, 0.6)', fontWeight: '300', borderBottom: '5px dotted #F8D57E', marginBottom: '20px' }}>Non-recycle monthly waste results (kg)</h3>
                            <LineChart style={{ margin: 'auto' }} width={730} height={250} data={nonRecyceResult}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="title" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="totalAll" stroke="#F8D57E" />
                            </LineChart>
                        </div>
                    </div>
                )}
            </div>
        </div>)
        }
        </div>
    )
}

export default Results

