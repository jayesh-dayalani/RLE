// utils/supabase.js
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://dkbtxybxmiumjkchuzzy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrYnR4eWJ4bWl1bWprY2h1enp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNjU4OTIsImV4cCI6MjA0MDk0MTg5Mn0.cBNR9v71e0zU3PksVk_cJ_CG0F16xLe2iDvpKLxx9ko"
);

export async function fetchCommonMastercodeWithMinPrice(minOfferRank = 1) {
  try {
    // Fetch amazon table data
    const { data: amazonData, error: amazonError } = await supabase
      .from("amazon")
      .select("mastercode, name, mrp");

    // Fetch offer table data
    const { data: offers, error: offerError } = await supabase
      .from("offer")
      .select("mastercode, s1, s2, s3, s4, s5");

    // Fetch supplier table data
    const { data: suppliers, error: supplierError } = await supabase
      .from("supplier")
      .select("code, name");

    // Fetch quantity table data
    const { data: quantityData, error: quantityError } = await supabase
      .from("quantity")
      .select("mastercode, sell_rate, stock, incoming");

    // Check for errors in fetching data
    if (amazonError || offerError || supplierError || quantityError) {
      throw new Error("Error fetching data");
    }

    // Create a mapping from supplier code to supplier name
    const supplierMap = suppliers.reduce((acc, supplier) => {
      acc[supplier.code] = supplier.name;
      return acc;
    }, {});

    // Get common mastercodes between amazon and offer tables
    const amazonMastercodes = new Set(
      amazonData.map((item) => item.mastercode)
    );
    const offerMastercodes = new Set(offers.map((item) => item.mastercode));
    const commonMastercodesSet = [...amazonMastercodes].filter((mastercode) =>
      offerMastercodes.has(mastercode)
    );

    const minPriceResults = [];

    commonMastercodesSet.forEach((mastercode) => {
      const offer = offers.find((item) => item.mastercode === mastercode);
      const amazonItem = amazonData.find(
        (item) => item.mastercode === mastercode
      );
      const quantityItem = quantityData.find(
        (item) => item.mastercode === mastercode
      ); // Find corresponding quantity item

      if (offer && amazonItem) {
        const amazonMrp = parseFloat(amazonItem.mrp);
        const prices = [
          { supplierCode: "s1", price: parseFloat(offer.s1) },
          { supplierCode: "s2", price: parseFloat(offer.s2) },
          { supplierCode: "s3", price: parseFloat(offer.s3) },
          { supplierCode: "s4", price: parseFloat(offer.s4) },
          { supplierCode: "s5", price: parseFloat(offer.s5) },
        ].filter(({ price }) => !isNaN(price));

        prices.sort((a, b) => a.price - b.price);

        if (prices.length >= minOfferRank) {
          const selectedPrice = prices[minOfferRank - 1]; // Get nth minimum price
          const supplierName =
            supplierMap[selectedPrice.supplierCode] || "Unknown Supplier";

          // Push the results including quantity information
          minPriceResults.push({
            mastercode: mastercode,
            name: amazonItem.name || "Unknown",
            amazonMrp: amazonMrp,
            supplierPrice: selectedPrice.price,
            supplier: supplierName, // Use supplier name from the supplierMap
            sell_rate: quantityItem ? parseFloat(quantityItem.sell_rate) : 0, // Parse sell_rate as a float
            stock: quantityItem ? parseFloat(quantityItem.stock) : 0, // Parse stock as a float
            incoming: quantityItem ? parseFloat(quantityItem.incoming) : 0, // Parse incoming as a float
          });
        }
      }
    });

    return minPriceResults;
  } catch (err) {
    console.error("Error fetching common mastercodes with minimum price", err);
    throw err;
  }
}