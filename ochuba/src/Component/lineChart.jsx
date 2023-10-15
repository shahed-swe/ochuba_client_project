import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import React from 'react';



const RenderLineChart = ({chartData,type}) => {

  console.log(chartData,"chartDatachartDatachartDatachartData")

  const axisStyle = {
    fill: "#99A69D",
    fontSize: "14px",
  };
  const yAxisStyle = {
    fill: "#99A69D",
    fontSize: "12px",
  };
  return(

  <ResponsiveContainer width="100%" height={400}>
    <LineChart data={chartData} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
      <Line type='bump' dataKey="bidamount" name={type?"No ":"Yes"} stroke={type?"#D762AE": "#8884d8"} />
      <LabelList  position="left" /> {/* Display labels on the left side */}
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis  hide={true} />
      <YAxis ticks={[0, 100, 200, 300, 400, 500,600,700,800,900,1000]} />
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>
  )
};

export default RenderLineChart