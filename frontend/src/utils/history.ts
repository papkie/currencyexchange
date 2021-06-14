export const saveHistory = (
  history: Array<{
    base: string;
    target: string;
    amount: number;
    result: number;
  }>
) => {
  localStorage.setItem("historyRates", JSON.stringify([...history]));
};

export const getHistory = (): Array<HistoryEntry> => {
  return JSON.parse(localStorage.getItem("historyRates") || "[]");
};

export interface HistoryEntry {
  base: string;
  target: string;
  amount: number;
  result: number;
}
