export type FinancingChartData = {
  type: 'RECEIPT' | 'EXPENDITURE';
  totalAmount: number;
  transactionCount: number;
};

interface Props {
  rows: FinancingChartData[];
}

const FinancingBarChart = ({ rows }: Props) => {
  //   console.log(rows);

  return <div></div>;
};

export default FinancingBarChart;
