import React from "react";
import { HistoryEntry } from "../utils/history";

const HistoryBoxComponent: React.FC<{ history: Array<HistoryEntry> }> = ({
  history,
}) => {
  return (
    <table className="table">
      <tbody>
        {history.map((v, k) => (
          <tr key={"history" + k}>
            <td>
              {v.amount} {v.base}
            </td>
            <td>
              <span className="icon">&#x2192;</span>
            </td>
            <td>
              {v.result} {v.target}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HistoryBoxComponent;
