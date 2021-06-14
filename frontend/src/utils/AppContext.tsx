import React from "react";

export interface RateContextType {
  [currency: string]: number;
}

export const AppContext = React.createContext<{
  rates: RateContextType;
  setError: (value: string) => void;
}>({ rates: {}, setError: () => null });
