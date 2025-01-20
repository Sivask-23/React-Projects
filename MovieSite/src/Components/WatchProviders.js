import React, { useEffect, useState } from "react";
import { getWatchProviders } from "../Services/GetWatchProviders";
import "../CssComponents/WatchProviders.css";

const WatchProviders = ({ mediaType, id }) => {
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await getWatchProviders(mediaType, id);
        if (data && data.results) {
          const globalProviders = [];
          const uniqueProviderIds = new Set();

          for (const country in data.results) {
            const countryProviders = data.results[country];
            ["flatrate", "buy", "rent"].forEach((type) => {
              if (countryProviders && Array.isArray(countryProviders[type])) {
                countryProviders[type].forEach((provider) => {
                  if (!uniqueProviderIds.has(provider.provider_id)) {
                    uniqueProviderIds.add(provider.provider_id);
                    globalProviders.push(provider);
                  }
                });
              }
            });
          }

          setProviders(globalProviders);
        } else {
          setProviders([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [mediaType, id]);

  if (loading) {
    return <div className="watch-providers-loading">Loading...</div>;
  }

  if (error) {
    return <div className="watch-providers-error">Error: {error}</div>;
  }

  if (providers.length === 0) {
    return <div className="watch-providers-empty">No providers available.</div>;
  }

  return (
    <div className="watch-providers">

      <div className="watch-providers-grid">
        {providers.map((provider) => (
          <div key={provider.provider_id} className="watch-provider-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${provider.logo_path}`}
              alt={provider.provider_name}
              title={provider.provider_name}
              className="watch-provider-logo"
            />
            <h4 className="watch-provider-name">{provider.provider_name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchProviders;
