import { useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ChartContext from '../Context/ChartContext';
import AddProductSaleForm from './AddProductSaleForm';
import LoadChartDataForm from './LoadChartDataForm';
import ChartTable from './ChartTable';

export default function Header() {
  const { messages, chartData } = useContext(ChartContext);

  useEffect(() => {
    console.log('Messages', messages);
    console.log('Chart Data', chartData);
    console.log(chartData.map((c) => c.data[0]).map((c) => c.itemSales));
  }, [messages, chartData]);

  const options = {
    yAxis: {
      title: {
        text: 'Number of Sales',
      },
    },
    title: {
      text: 'E-Store',
    },
    series: [
      {
        name: 'Product Sales',
        data: chartData.map((c) => parseInt(c.data[0].itemSales)),
      },
    ],
  };

  return (
    <div className="p-4">
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div className="grid gap-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
        <AddProductSaleForm />
        <LoadChartDataForm />
      </div>

      <ChartTable />
    </div>
  );
}
