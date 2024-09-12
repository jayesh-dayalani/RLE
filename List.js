import React, { useEffect, useMemo, useState } from "react";

const List = ({
  finalOutput,
  tax,
  fees,
  landingCost,
  marginThreshold,
  stockCoverage,
  sellRateIncrease,
}) => {
  const [loading, setLoading] = useState(true); // Added loading state

  // Function to calculate the filtered output based on the live inputs
  const calculateFilteredOutput = () => {
    return finalOutput
      .map((item) => {
        const supplierPrice = item.supplierPrice;
        const amazonMrp = item.amazonMrp;

        // Calculate prices and margin
        const landingPrice = supplierPrice * (1 + landingCost / 100);
        const amazonPriceBeforeFees = amazonMrp / (1 + tax / 100);
        const amazonFinalPrice = amazonPriceBeforeFees / (1 + fees / 100);
        const marginPercentage =
          ((amazonFinalPrice - landingPrice) / amazonFinalPrice) * 100;

        // Calculate the new sell rate and quantity based on stock coverage
        const newSellRate = item.sell_rate * (1 + sellRateIncrease / 100);
        const quantityCovered = newSellRate * stockCoverage;

        // Return item along with its calculated margin, new sell rate, and quantity
        return {
          ...item,
          marginPercentage,
          landingPrice,
          amazonPriceBeforeFees,
          amazonFinalPrice,
          newSellRate, // New sell rate
          quantityCovered, // Updated quantity
        };
      })
      .filter((item) => item.marginPercentage > marginThreshold); // Filter based on margin threshold
  };

  const filteredOutput = useMemo(() => {
    if (finalOutput && finalOutput.length > 0) {
      return calculateFilteredOutput();
    }
    return [];
  }, [finalOutput, tax, fees, landingCost, marginThreshold, stockCoverage, sellRateIncrease]);

  useEffect(() => {
    // Set loading state based on filteredOutput
    setLoading(filteredOutput.length === 0 && finalOutput && finalOutput.length > 0);
  }, [filteredOutput, finalOutput]);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>; // Display a loading state initially
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Final Results</h2>
      <ul className="space-y-4">
        {filteredOutput.map((item, index) => {
          const {
            marginPercentage,
            landingPrice,
            amazonPriceBeforeFees,
            amazonFinalPrice,
            newSellRate, // Use new sell rate
            quantityCovered, // Use updated quantity
          } = item;

          let bgColor = "bg-red-100"; // Default to red
          if (marginPercentage > 0) {
            bgColor = "bg-green-100"; // Positive margins are green
          }

          return (
            <li
              key={index}
              className={`flex justify-between items-start p-4 rounded-md ${bgColor}`}
            >
              <div className="flex-1">
                <p className="font-extrabold text-lg">
                  {marginPercentage.toFixed(2)}%
                </p>
              </div>
              {/* Left side - Product and Supplier Details */}
              <div className="flex-1">
                <p className="font-bold">{item.name}</p>
                <p>
                  <strong>Sell Rate:</strong> {newSellRate.toFixed(2)}
                </p>
                <p>
                  <strong>Qty:</strong> {quantityCovered.toFixed(2)}{" "}
                  {/* Display updated quantity */}
                </p>
              </div>

              {/* Center - Margin and Supplier Price */}
              <div className="flex-1">
                <p className="text-gray-500">
                  IAN:{" "}
                  <span className="font-bold text-black">
                    {item.mastercode}
                  </span>
                </p>
                <div className="text-sm">
                  <p>
                    <strong>{item.supplier} offered Price:</strong> ${item.supplierPrice.toFixed(2)}
                  </p>
                  <p>
                    <strong>Landing Price:</strong> ${landingPrice.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Right side - Amazon Prices and Margin */}
              <div className="text-right">
                <div className="text-sm">
                  <p>
                    <strong>Amazon average SP:</strong> ${item.amazonMrp.toFixed(2)}
                  </p>
                  <p>
                    <strong>Amazon Price after TAX:</strong> ${amazonPriceBeforeFees.toFixed(2)}
                  </p>
                  <p>
                    <strong>Amazon Final Price:</strong> ${amazonFinalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
