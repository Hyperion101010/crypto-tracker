import React from "react";
import styles from "../styles/CoinList.module.css"; // Import the CSS module

const CryptoCard = ({ coin }) => {
  const priceChange = coin.price_change_percentage_24h;

  // Determine the color based on the price change
  const priceChangeClass = priceChange > 0 ? styles.coinPriceUp : styles.coinPriceDown;

  return (
    <div className={`${styles.coinCard} group`}>
      <img
        src={coin.image}
        alt={coin.name}
        className={styles.coinImage}
      />
      <div className={styles.coinInfo}>
        <h3 className={`${styles.coinTitle} group-hover:text-gray-600`}>{coin.name}</h3> 
        <p className={`${styles.coinInfoText} group-hover:text-gray-600`}>
          Price: ${coin.current_price.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 group-hover:text-gray-500">
        Last Updated: {new Date(coin.last_updated).toLocaleString("en-US", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })}
        </p>
        <p className={`${styles.coinPrice}`}>
            Daily Change: <span className={`${priceChangeClass}`}>{priceChange.toFixed(2)}%</span>
        </p>
      </div>

      {/* Hover Effect: Display additional info */}
      <div className={styles.additionalInfo}>
        <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
        <p>24h High: ${coin.high_24h.toLocaleString()}</p>
        <p>24h Low: ${coin.low_24h.toLocaleString()}</p>
        <p>24h Volume: ${coin.total_volume.toLocaleString()}</p>
      </div>
    </div>
  );
};

const CoinList = ({ coins }) => {
  return (
    <div className={styles.gridContainer}>
      {coins.map((coin) => (
        <CryptoCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
};

export default CoinList;