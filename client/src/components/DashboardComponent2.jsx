import { useState ,useEffect} from 'react';
import { BarChart as BarChart2, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';


export default function DashboardComponent2(){
    const [chartData,setChartData] = useState([{
        name: '',
        value1: 0,
        value2:0,
    }]);
    const URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('authToken');


    useEffect(()=>{
        fetch(`${URL}/service-providers/get`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
                }
        }).then(async(response)=>{
            if(response.status==401){
                localStorage.removeItem('authToken');
                window.location.href = '/login';
            }else if(response.status == 200){
                const data = await response.json();
                setChartData(data);
            }
        })
        
    },[]);
    return(
        <div className="service-providers">
            <h3>Service provider data</h3>
            <BarChart2 width={600} height={400} data={chartData}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reviews.length" name={"reviews"} fill="red" />
                <Bar dataKey="servicesOffered.length" name={"service offered"} fill="blue" />
            </BarChart2>
            </div>
    )
}