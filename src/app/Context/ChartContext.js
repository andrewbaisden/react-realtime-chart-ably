import { createContext, useState } from 'react';
import { useChannel } from 'ably/react';
import { v4 as uuidv4 } from 'uuid';

const ChartContext = createContext();

export function ChartProvider({ children }) {
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

  return (
    <ChartContext.Provider
      value={{
        chartData,
        setChartData,
        itemName,
        setItemName,
        itemSales,
        setItemSales,
        formInputCheck,
        setFormInputCheck,
        chartDataCheck,
        setChartDataCheck,
        errorProductSale,
        setErrorProductSale,
        errorLoadData,
        setErrorLoadData,
        messages,
        updateMessages,
        addProductSale,
        loadProductData,
      }}
    >
      {children}
    </ChartContext.Provider>
  );
}

export default ChartContext;
