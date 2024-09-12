// pages/HomePage.js
'use client'
import { useState } from "react";
import Header from "./Header";
import Filters from "./Filters";
import List from "./List";
import { fetchCommonMastercodeWithMinPrice } from "./supabase";


export default function HomePage() {
  const [finalOutput, setFinalOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [margin, setMargin] = useState(0);
  const [tax, setTax] = useState(0); 
  const [fees, setFees] = useState(0);
  const [landingCost, setLandingCost] = useState(0);
  const [marginThreshold, setMarginThreshold] = useState(-20);
  const [sellRateIncrease, setSellRateIncrease] = useState(0);
  const [stockCoverage, setStockCoverage] = useState(0);

  const handleFilterChange = async (minOfferRank) => {
    try {
      setLoading(true);
      const data = await fetchCommonMastercodeWithMinPrice(minOfferRank);
      setFinalOutput(data);

      // Automatically trigger calculations in List here
    } catch (err) {
      setError("Error fetching minimum price data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header
        onMarginChange={setMargin}
        onTaxChange={setTax}
        onFeesChange={setFees}
        onLandingCostChange={setLandingCost}
        marginThreshold={marginThreshold}
        setMarginThreshold={setMarginThreshold}
        onStockCoverageChange={setStockCoverage}
        onSellRateIncreaseChange={setSellRateIncrease}
      />

      <Filters onFilterChange={handleFilterChange} />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <List
        finalOutput={finalOutput}
        tax={tax}
        fees={fees}
        landingCost={landingCost}
        marginThreshold={marginThreshold}
        sellRateIncrease={sellRateIncrease}
        stockCoverage={stockCoverage}
      />
    </div>
  );
}
