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

} from "recharts";


const Results = (props) => {
    const { token, userInfo } = useContext(AppContext)
    const [LastResults, setLastResults] = useState()
    const [friendUser, setFriendUser] = useState('')

    useEffect(() => {
        fetchWasteData()
    }, [])

    const getFriendData = async () => {
        try {
            const res = await axios.get(`/api/usergarbage/search/${friendUser}`)
            console.log(res.data)
            setFriendUser(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchWasteData = async () => {
        const todayDate = new Date().toJSON().slice(0, 10)
        let currentDate = new Date()
        currentDate.setDate(currentDate.getDate() - 1);
        let yesterdayDate = currentDate.toJSON().slice(0, 10)
        try {
            const res = await axios.get(`/api/usergarbage/${userInfo.user_id}`)
            console.log(res.data)
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
                        result.push({ type: item.type, yesterday: parseFloat(item.total), today: 0, totalAll: 0 });
                    } else {
                        result.push({ type: item.type, yesterday: 0, today: parseFloat(item.total), totalAll: 0 });
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
            setLastResults(udpatedData)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input type="text" placeholder="other user name" onChange={(e) => setFriendUser(e.target.value)} />
            <button type="button" onClick={() => getFriendData()}>Search</button>
            {friendUser && console.log(friendUser)}
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h1 style={{ margin: 'auto' }}>Your Last Results</h1>
                    {LastResults && console.log(LastResults)}
                    <AreaChart
                        width={500}
                        height={275}
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
                            stroke="#8884d8"
                            fill="#8884d8"
                        />
                        <Area
                            type="monotone"
                            dataKey="today"
                            stackId="1"
                            stroke="#82ca9d"
                            fill="#82ca9d"
                        />
                    </AreaChart>
                </div>

                {/* <RadarChart
                cx={300}
                cy={250}
                outerRadius={150}
                width={500}
                height={500}
                data={LastResults}
            >
                <PolarGrid />
                <PolarAngleAxis dataKey="type" />
                <PolarRadiusAxis />
                <Radar
                    name="Mike"
                    dataKey="totalAll"
                    stroke="#bc4749"
                    fill="#bc4749"
                    fillOpacity={0.6}
                />
            </RadarChart> */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <h1 style={{ margin: 'auto', position: 'relative', right: "50px" }}>Monthly Total Results</h1>
                    <BarChart
                        width={400}
                        height={300}
                        data={LastResults}
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
                        <Bar dataKey="totalAll" fill="#8884d8" background={{ fill: "#eee" }} />
                    </BarChart>
                </div>
            </div>
        </div>
    )
}

export default Results

