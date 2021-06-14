import debounce from "lodash.debounce";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../utils/AppContext";
import { HistoryEntry } from "../utils/history";

const ExchangeBoxComponent: React.FC<{
  addHistoryEntry: (entry: HistoryEntry) => void;
}> = ({ addHistoryEntry }) => {
  const contextValue = useContext(AppContext);
  const rates = contextValue.rates;
  const setError = contextValue.setError;

  const currencies = Object.keys(rates);

  const [baseCurrency, setBaseCurrency] = useState<string | null>(null);
  const [targetCurrency, setTargetCurrency] = useState<string | null>(null);
  const [result, setResult] = useState<null | number>(null);
  const [baseAmount, setBaseAmount] = useState(1);

  const debouncedSave = useCallback(
    debounce((nextValue: HistoryEntry) => {
      addHistoryEntry(nextValue);
    }, 2000),
    []
  );

  useEffect(() => {
    if (!baseCurrency || !targetCurrency) {
      return;
    }
    const rateForBase = rates[baseCurrency];
    const rateForTarget = rates[targetCurrency];

    if (!rateForBase || !rateForTarget) {
      setError("Invalid rates");
      return;
    }

    const calcResult =
      Math.round(baseAmount * (rateForBase / rateForTarget) * 100) / 100;
    setResult(calcResult);
    debouncedSave({
      base: baseCurrency,
      amount: baseAmount,
      result: calcResult,
      target: targetCurrency,
    });
  }, [
    baseCurrency,
    targetCurrency,
    baseAmount,
    rates,
    setError,
    debouncedSave,
  ]);

  useEffect(() => {
    if (!baseCurrency) {
      setBaseCurrency(currencies[0]);
    }
    if (!targetCurrency) {
      setTargetCurrency(currencies[1]);
    }
  }, [baseCurrency, currencies, targetCurrency]);

  return (
    <div className="box">
      <div className="columns is-multiline">
        <div className="column is-full is-flex is-justify-content-center is-align-items-center">
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="Amount"
                onChange={(e) => setBaseAmount(+e.target.value)}
                value={baseAmount}
              />
            </div>
            <div className="control">
              <div className="select">
                <select
                  onChange={(e) => {
                    if (e.target.value === targetCurrency) {
                      setTargetCurrency(baseCurrency);
                    }
                    setBaseCurrency(e.target.value);
                  }}
                  value={baseCurrency || ""}
                >
                  {Object.keys(rates).map((value, key) => (
                    <option value={value} key={"base" + value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-flex is-justify-content-center is-align-items-center">
          <span className="icon">&#x2193;</span>
        </div>
        <div className="column is-full is-flex is-justify-content-center is-align-items-center">
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="Calculated amount"
                readOnly
                defaultValue={result || ""}
              />
            </div>
            <div className="control">
              <div className="select">
                <select
                  onChange={(e) => {
                    if (e.target.value === baseCurrency) {
                      setBaseCurrency(targetCurrency);
                    }
                    setTargetCurrency(e.target.value);
                  }}
                  value={targetCurrency || ""}
                >
                  {Object.keys(rates).map((value, key) => (
                    <option value={value} key={"target" + value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeBoxComponent;
