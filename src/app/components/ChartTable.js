import { useContext } from 'react';
import ChartContext from '../Context/ChartContext';

export default function ChartTable() {
  const { chartData } = useContext(ChartContext);
  return (
    <>
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
    </>
  );
}
