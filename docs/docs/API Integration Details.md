
# API Integration - Documentation

## Overview

This tool allows you to track real-time cryptocurrency prices, including coins such as Bitcoin, Ethereum, Tether, Binance Coin, and Solana. This application leverages the CoinGecko API to fetch the latest cryptocurrency data, enabling users to access up-to-date information about various cryptocurrencies.

## Using the CoinGecko API

### Getting the API Access

To access CoinGecko's API, you need to create a developer account on the CoinGecko website and obtain an API key.

1. Visit the CoinGecko developer dashboard:  
   [CoinGecko Developer Dashboard](https://www.coingecko.com/en/developers/dashboard)
2. Sign up for an account and get your API key.

### API Request

### API Request URL

The CoinGecko API is queried using the following GET request URL:

```bash
curl --location --request GET 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin,solana' --header 'x-cg-api-key: some-api-key'
```

- **`vs_currency=usd`**: Specifies the currency in which the cryptocurrency prices are quoted (USD in this case).
- **`ids=bitcoin,ethereum,tether,binancecoin,solana`**: A comma-separated list of cryptocurrency IDs to fetch data for.

### API Response

The response from the API is a JSON array containing data for each cryptocurrency requested. Below is an example of the response for the requested coins:

```json
[
    {
        "id": "bitcoin",
        "symbol": "btc",
        "name": "Bitcoin",
        "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
        "current_price": 86146,
        "market_cap": 1709136595617,
        "market_cap_rank": 1,
        "fully_diluted_valuation": 1709136595617,
        "total_volume": 73583768878,
        "high_24h": 94902,
        "low_24h": 85268,
        "price_change_24h": -7882.901959732975,
        "price_change_percentage_24h": -8.3835,
        "market_cap_change_24h": -156409060720.34546,
        "market_cap_change_percentage_24h": -8.38409,
        "circulating_supply": 19831818.0,
        "total_supply": 19831818.0,
        "max_supply": 21000000.0,
        "ath": 108786,
        "ath_change_percentage": -20.65135,
        "ath_date": "2025-01-20T09:11:54.494Z",
        "atl": 67.81,
        "atl_change_percentage": 127198.51796,
        "atl_date": "2013-07-06T00:00:00.000Z",
        "roi": null,
        "last_updated": "2025-03-03T21:28:40.791Z"
    },
    ...
]
```

### Data Fields Used

The following fields are extracted and used from the API response:

- **`id`**: The unique identifier for the cryptocurrency (e.g., `bitcoin`, `ethereum`).
- **`symbol`**: The symbol of the cryptocurrency (e.g., `btc`, `eth`).
- **`name`**: The name of the cryptocurrency (e.g., `Bitcoin`, `Ethereum`).
- **`image`**: A URL to the image representing the cryptocurrency.
- **`current_price`**: The current market price of the cryptocurrency (in USD).
- **`market_cap`**: The market capitalization of the cryptocurrency.
- **`total_volume`**: The total trading volume in the last 24 hours.
- **`high_24h`**: The highest price of the cryptocurrency in the last 24 hours.
- **`price_change_percentage_24h`**: The percentage change in price over the last 24 hours.
- **`last_updated`**: The timestamp of the last data update.

### Usage

This data can be used to display current prices, market cap, supply information, and historical data such as all-time highs/lows. Here’s an example of how the data is used in our application:

```javascript
// Sample data for Bitcoin
const bitcoin = {
  name: 'Bitcoin',
  symbol: 'btc',
  currentPrice: 86146,
  marketCap: 1709136595617,
  lastUpdated: '2025-03-03T21:28:40.791Z',
};
```

### Code Explanation

### 1. **`getCryptoData` Function**

This function makes a request to the **CoinGecko API** to fetch market data for a list of selected cryptocurrencies. It checks the response status and parses the data if the response is successful.

```javascript
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
```

- **URL**: The API URL requests market data for the specified cryptocurrencies in USD.
- **Headers**: The request includes an API key for authentication.
- **Error Handling**: If the request fails, it throws an error with the response's status.

### 2. **React Component (`CryptoDashboard`)**

This is the main component where state management, data fetching, and UI rendering take place.

- **`useQuery` Hook**: Fetches cryptocurrency data asynchronously using the `getCryptoData` function.
- **Search and Refresh**: The app allows users to search for coins and refresh the data with the click of a button.
- **`handleRefresh` Function**: Triggers the data refresh and displays a success popup.
- **`useEffect` Hook**: Keeps track of the time since the last refresh and updates it every minute.

```javascript
const { data, isLoading, isError, refetch, isFetching, isRefetchError, isRefetching } = useQuery({
  queryKey: ["cryptoData"],
  queryFn: getCryptoData,
});
```

### 3. **Conditional Rendering**

The app renders different content based on the loading state, error state, and the availability of data:
- If data is still loading, a spinner is shown.
- If there is an error, an error message is displayed.
- Once data is fetched, the coin list is displayed, and users can search for specific cryptocurrencies.