import React, { useEffect, useState } from "react";
import { getRates } from "../utils/apiClient";
import { AppContext, RateContextType } from "../utils/AppContext";
import { getHistory, HistoryEntry, saveHistory } from "../utils/history";
import ExchangeBoxComponent from "./ExchangeBoxComponent";
import HistoryBoxComponent from "./HistoryBoxComponent";

const HomePage: React.FC = () => {
  const [rates, setRates] = useState<RateContextType>({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<Array<HistoryEntry>>([]);

  useEffect(() => {
    getRates()
      .then((responseRates) => {
        setRates(responseRates);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
    setHistory(getHistory());
  }, []);

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const addHistoryEntry = (entry: HistoryEntry) => {
    setHistory((value) => [...value.slice(-6), entry]);
  };

  return (
    <div className="container">
      <div className="columns is-centered is-vcentered is-full-height">
        <div className="column is-5">
          {error && (
            <div className="notification is-danger">
              <button className="delete" onClick={() => setError("")}></button>
              {error}
            </div>
          )}
          {loading ? (
            <div className="notification">Loading...</div>
          ) : (
            <AppContext.Provider value={{ rates, setError }}>
              <ExchangeBoxComponent addHistoryEntry={addHistoryEntry} />
              <HistoryBoxComponent history={history} />
            </AppContext.Provider>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
