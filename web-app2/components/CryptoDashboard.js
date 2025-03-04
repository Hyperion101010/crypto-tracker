import CoinList from "./CoinList";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const getCryptoData = async () => {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin,solana";
  const headers = {
    "x-cg-api-key": "CG-faPy7HfEGrgNwqMMZDqJaG9g",
  };

  const cryptores = await fetch(url, { headers });
  if (!cryptores.ok) {
    throw new Error(`Error: ${cryptores.status} ${cryptores.statusText}`);
  }
  return await cryptores.json();
};

const CryptoDashboard = () => {
  const [search, setSearch] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(null); // Store last refresh time

  const { data, isLoading, isError, refetch, isFetching, isRefetchError, isRefetching } = useQuery({
    queryKey: ["cryptoData"],
    queryFn: getCryptoData,
  });

  const handleRefresh = async () => {
    try {
      await refetch();
      setLastRefreshed(new Date());
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      console.log("Data refreshed sucessfully!")
    } catch (error) {
      console.error("Error during refresh:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastRefreshed) {
        setLastRefreshed(new Date(lastRefreshed));
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [lastRefreshed]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
          <p className="mt-3 text-lg text-gray-700 font-semibold">Fetching Crypto Data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-200 text-red-700 px-4 py-2 rounded-md shadow-sm">
          <p className="font-semibold">Error fetching data. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (isRefetchError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-200 text-red-700 px-4 py-2 rounded-md shadow-sm">
          <p className="font-semibold">Refetch failed.</p>
        </div>
      </div>
    );
  }

  const filteredCoins = data.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  // Function to format the time since the last refresh
  const timeSinceLastRefresh = lastRefreshed
    ? `${Math.floor((new Date() - new Date(lastRefreshed)) / 1000 / 60)} minutes ago`
    : "0 minutes ago";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-gray-900 text-white py-6 shadow-md text-center">
        <h1 className="text-2xl font-bold">Crypto Tracker 🟡</h1>
        <div className="mt-4 flex justify-center space-x-4">
          <input
            type="text"
            placeholder="🔍 Search cryptocurrencies..."
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-2/3 md:w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>
        {/* Display time since last refresh */}
        <div className="mt-4 text-sm text-gray-500">
          Last refreshed: {timeSinceLastRefresh}
        </div>
      </header>

      {/* Coin List */}
      <main className="w-full max-w-6xl p-6">
        <CoinList coins={filteredCoins} />
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-4 text-center mt-auto">
        <p>⚡ Powered by CoinGecko API</p>
      </footer>

      {/* Popup after refresh */}
      {showPopup && (
        <div className="popup fixed top-4 right-4 bg-green-500 text-white px-6 py-2 rounded-md shadow-lg">
          <p>Data refreshed successfully!</p>
        </div>
      )}
    </div>
  );
};

export default CryptoDashboard;