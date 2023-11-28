import { useContext } from 'react';
import ChartContext from '../Context/ChartContext';

export default function LoadChartDataForm() {
  const { errorLoadData, chartDataCheck, loadProductData } =
    useContext(ChartContext);
  return (
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
  );
}
