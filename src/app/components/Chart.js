import { useState, useEffect } from 'react';
import { useChannel } from 'ably/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { v4 as uuidv4 } from 'uuid';

export default function Header() {
  const [chartData, setChartData] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemSales, setItemSales] = useState('');
  const [formInputCheck, setFormInputCheck] = useState('');
  const [chartDataCheck, setChartDataCheck] = useState('');
  const [errorProductSale, setErrorProductSale] = useState('hidden');
  const [errorLoadData, setErrorLoadData] = useState('hidden');
  const [messages, updateMessages] = useState([]);
  const { channel } = useChannel('channel-01', (message) => {
    updateMessages((prev) => [...prev, message]);
  });

  useEffect(() => {
    console.log('Messages', messages);
    console.log('Chart Data', chartData);
    console.log(chartData.map((c) => c.data[0]).map((c) => c.itemSales));
  }, [messages, chartData]);

  const addProductSale = async (e) => {
    e.preventDefault();
    if (itemName === '' || itemSales === '') {
      setFormInputCheck('Fill in both fields');
      setErrorProductSale('block');
    } else {
      await channel.publish('data', [
        { id: uuidv4(), itemName: itemName, itemSales: itemSales },
      ]);
      setItemName('');
      setItemSales('');
      setFormInputCheck('');
      setErrorProductSale('hidden');
      setErrorLoadData('hidden');
      channel.history(function (err, resultPage) {
        let allMessages = resultPage.items;
        console.log('All Messages', allMessages);
        setChartData(allMessages);
      });
    }
  };

  const loadProductData = async (e) => {
    e.preventDefault();
    channel.history(function (err, resultPage) {
      let allMessages = resultPage.items;
      if (allMessages <= 0) {
        setChartDataCheck(
          'There is no data to show in the chart please add some'
        );
        setErrorLoadData('block');
      } else {
        setErrorLoadData('hidden');
        console.log('All Messages', allMessages);
        setChartData(allMessages);
      }
    });
  };

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
        <form
          className="flex flex-row bg-sky-500 p-4 justify-center"
          onSubmit={(e) => addProductSale(e)}
        >
          <div className="p-4 grid gap-2">
            <label className="text-white font-bold">Product Name</label>
            <input
              type="text"
              onChange={(e) => setItemName(e.target.value)}
              value={itemName}
              className="p-2 rounded"
            />
            <label className="text-white font-bold">Product Sales</label>
            <input
              min={1}
              type="number"
              onChange={(e) => setItemSales(e.target.value)}
              value={itemSales}
              className="p-2 rounded"
            />
            <button className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-80 hover:bg-indigo-500 duration-300 p-3 rounded-lg text-white">
              Add product sale
            </button>
            <p
              className={`bg-red-600 text-white p-2 rounded text-center ${errorProductSale}`}
            >
              {formInputCheck}
            </p>
          </div>
        </form>

        <form
          className="bg-sky-500 p-4 flex flex-col justify-center"
          onSubmit={(e) => loadProductData(e)}
        >
          <div className="p-4 grid gap-2">
            <button className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-80 hover:bg-indigo-500 duration-300 p-3 rounded-lg text-white">
              Load chart data
            </button>
            <p
              className={`bg-red-600 text-white p-2 rounded text-center ${errorLoadData}`}
            >
              {chartDataCheck}
            </p>
          </div>
        </form>
      </div>

      {chartData === 0 ? (
        <>
          <p>No data loaded</p>
        </>
      ) : (
        <>
          <div className="mt-10 bg-slate-200">
            <div className="flex flex-row">
              <p className="p-4 font-bold uppercase w-2/4">Product ID</p>
              <p className="p-4 font-bold uppercase w-1/4">Product Name</p>
              <p className="p-4 font-bold uppercase w-1/4">Product Sales</p>
            </div>
            {chartData
              .map((c) => c.data[0])
              .map((c) => (
                <div key={c.id} className="flex flex-row">
                  <p className="p-4 w-2/4">{c.id}</p>
                  <p className="p-4 w-1/4">{c.itemName}</p>
                  <p className="p-4 w-1/4">{c.itemSales}</p>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}
