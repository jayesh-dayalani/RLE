import React, { useEffect, useState } from "react";

const Header = ({
  onMarginChange,
  onTaxChange,
  onFeesChange,
  onLandingCostChange,
  marginThreshold,
  setMarginThreshold,
  onStockCoverageChange,
  onSellRateIncreaseChange,
}) => {
  const [margin, setMargin] = useState(0);
  const [tax, setTax] = useState(5);
  const [fees, setFees] = useState(23);
  const [landingCost, setLandingCost] = useState(12);
  const [stockCoverage, setStockCoverage] = useState(30);
  const [sellRateIncrease, setSellRateIncrease] = useState(0);

  useEffect(() => {
    // Set initial values when component mounts
    onTaxChange(tax);
    onFeesChange(fees);
    onLandingCostChange(landingCost);
    onStockCoverageChange(stockCoverage);
    onSellRateIncreaseChange(sellRateIncrease);
  }, []);

  const handleMarginChange = (e) => {
    const newMargin = e.target.value;
    setMargin(newMargin);
    onMarginChange(newMargin);
  };

  const handleTaxChange = (e) => {
    const newTax = e.target.value;
    setTax(newTax);
    onTaxChange(newTax);
  };

  const handleFeesChange = (e) => {
    const newFees = e.target.value;
    setFees(newFees);
    onFeesChange(newFees);
  };

  const handleLandingCostChange = (e) => {
    const newLandingCost = e.target.value;
    setLandingCost(newLandingCost);
    onLandingCostChange(newLandingCost);
  };

  const handleStockCoverageChange = (e) => {
    const newStockCoverage = e.target.value;
    setStockCoverage(newStockCoverage);
    onStockCoverageChange(newStockCoverage);
  };

  const handleSellRateIncreaseChange = (e) => {
    const newSellRateIncrease = e.target.value;
    setSellRateIncrease(newSellRateIncrease);
    onSellRateIncreaseChange(newSellRateIncrease);
  };

  const handleMarginThresholdChange = (e) => {
    const value = e.target.value;
    setMarginThreshold(parseFloat(value));
  };

  return (
    <div className="flex flex-col gap-4 p-4 border-b">
      <div className="flex justify-between">
        <div className="w-1/2 pr-4">
          <p className="font-bold text-lg">Supplier's</p>
          <label className="block mb-2">
            Landing Cost %:
            <input
              type="number"
              value={landingCost}
              onChange={handleLandingCostChange}
              placeholder="Enter Landing Cost %"
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block">
            Margin Threshold:
            <input
              type="number"
              value={marginThreshold}
              onChange={handleMarginThresholdChange}
              placeholder="Enter Margin Threshold"
              className="border p-2 rounded w-full"
            />
          </label>
        </div>

        <div className="w-1/2 pl-4">
          <p className="font-bold text-lg">Amazon's</p>

          <label className="block mb-2">
            Tax %:
            <input
              type="number"
              value={tax}
              onChange={handleTaxChange}
              placeholder="Enter Tax %"
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block">
            Fees %:
            <input
              type="number"
              value={fees}
              onChange={handleFeesChange}
              placeholder="Enter Fees %"
              className="border p-2 rounded w-full"
            />
          </label>
        </div>
      </div>

      <p className="font-bold text-lg">Quantity's</p>
      <div className="flex justify-between">
        <label className="block mb-2 w-1/2 pr-4">
          Sell Rate Increase %:
          <input
            type="number"
            value={sellRateIncrease}
            onChange={handleSellRateIncreaseChange}
            placeholder="Enter Sell Rate Increase %"
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2 w-1/2 pl-4">
          Stock Coverage (Days):
          <input
            type="number"
            value={stockCoverage}
            onChange={handleStockCoverageChange}
            placeholder="Enter Stock Coverage (Days)"
            className="border p-2 rounded w-full"
          />
        </label>
      </div>
    </div>
  );
};

export default Header;
