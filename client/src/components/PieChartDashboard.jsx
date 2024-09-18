import { useState ,useEffect} from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieChartComponent() {
    const [data,setData] = useState([]);
    const [paid,setPaid]= useState(0);
    const [pending,setPending]= useState(0);
    const [failed,setfailed]= useState(0);

    const [statusConfirmed,setStatusConfirmed]= useState(0);
    const [statusPending,setStatusPending]= useState(0);
    const [statusCanceled,setStatusCanceled]= useState(0);
    const [statusCompleted,setStatusCompleted]= useState(0);

    const URL = import.meta.env.VITE_BASE_URL;
    const token = localStorage.getItem('authToken');

    useEffect(()=>{
        fetch(`${URL}/bookings/getStatus`,{
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
                console.log(data);
                setData(data);
                updatePaymentStatus(data);
                updateStatus(data);
            }
        })
    },[]);
    function updatePaymentStatus(data){
        setPaid(data.filter(d=>d.paymentStatus=="paid").length);
        setPending(data.filter(d=>d.paymentStatus=="pending").length);
        setfailed(data.filter(d=>d.paymentStatus=="failed").length);
    }
    function updateStatus(data){
        setStatusConfirmed(data.filter(d=>d.status=="confirmed").length);
        setStatusPending(data.filter(d=>d.status=="pending").length);
        setStatusCanceled(data.filter(d=>d.status=="canceled").length);
        setStatusCompleted(data.filter(d=>d.status=="completed").length);
    }
  return (
    <div className='pie-charts'> 
        <div className='payment'>
            <h3>Booking Payment Status</h3>
        
                <PieChart
            series={[
                {
                data: [
                    { id: 0, value: paid, label: 'Paid' },
                    { id: 1, value: pending, label: 'Pending' },
                    { id: 2, value: failed, label: 'Failed' },
                ],
                },
            ]}
            width={400}
            height={200}
            />
        </div>
        <div className='status'>
            <h3>Completion Status</h3>
        
                <PieChart
            series={[
                {
                data: [
                    { id: 0, value: statusConfirmed, label: 'Confirmed' },
                    { id: 1, value: statusPending, label: 'Pending' },
                    { id: 2, value: statusCanceled, label: 'Canceled' },
                    { id: 3, value: statusCompleted, label: 'Completed' },
                ],
                },
            ]}
            width={400}
            height={200}
            />
        </div>
    </div>
  );
}