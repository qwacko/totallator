import { Bar, ComposedChart, Line, Tooltip } from "recharts";

export const StatsGraphDisplay = ({
  data,
  hideBars = false,
  hideLine = false
}: {
  data: { positive: number; negative: number; total: number; key: string }[];
  hideBars?: boolean;
  hideLine?: boolean;
}) => {
  return (
    <ComposedChart data={data} width={200} height={60}>
      {!hideLine && (
        <Line type="monotone" dataKey="total" stroke="#8884d8" dot={false} />
      )}
      {!hideBars && (
        <>
          <Bar dataKey="positive" fill="#8884d8" />
          <Bar dataKey="negative" fill="#8884d8" />
        </>
      )}
      <Tooltip />
    </ComposedChart>
  );
};
