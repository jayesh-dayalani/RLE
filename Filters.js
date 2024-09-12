// components/Filters.js
export default function Filters({ onFilterChange }) {
    return (
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => onFilterChange(1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Plan A (1st Best Price)
        </button>
        
        <button
          onClick={() => onFilterChange(2)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Plan B (2nd Best Price)
        </button>
        
        <button
          onClick={() => onFilterChange(3)}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Plan C (3rd Best Price)
        </button>
      </div>
    );
  }
  