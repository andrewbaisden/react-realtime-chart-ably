import { useContext } from 'react';
import ChartContext from '../Context/ChartContext';

export default function AddProductSaleForm() {
  const {
    addProductSale,
    itemName,
    setItemName,
    itemSales,
    setItemSales,
    errorProductSale,
    formInputCheck,
  } = useContext(ChartContext);
  return (
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
  );
}
