import { BarChart } from '@mui/x-charts';
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import DashboardComponent2 from '../components/DashboardComponent2';
import PieChartComponent from '../components/PieChartDashboard';

export default function Dashboard(){
    const [redirect,setRedirect] = useState(false);
    const [data,setData] = useState({});

    const URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('authToken');
    useEffect(()=>{
        fetch(`${URL}/admin/dashboard`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
                }
        }).then(async(response)=>{
            if(response.status == 401){
                if(localStorage.length !=0){
                    localStorage.removeItem('authToken');
                }
                setRedirect(true);
            }else if(response.status == 200){
                const data = await response.json();
                setData(data);
            }
        })
    },[])

   
    if(redirect){
        return <Navigate to={'/'} />
    }

    
    return(
        <div className="container">
            <div className="numbers">
                <h3>
                    Total numbers of activities
                </h3>
                <BarChart 
                xAxis={[
                    {
                    id: 'barCategories',
                    data: ['TotalCustomers', 'TotalServiceProviders', 'TotalBookings'],
                    scaleType: 'band',
                    },
                ]}
                series={[
                    {
                    data: [data.totalCustomers, data.totalServiceProviders, data.totalBookings],
                    },
                ]}
                width={600}
                height={400}
                />

            </div>
            <DashboardComponent2 />
            <PieChartComponent />
        </div>
    )
}