import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  result: {
    prefName: string;
    data: {
      year: number;
      value: number;
    }[];
  }[];
};

function Graph(props: Props) {
  const series: Highcharts.SeriesOptionsType[] = [];
  const categories = [];

  for (const p of props.result) {
    const data = [];

    for (const pd of p.data) {
      data.push(pd.value);
      categories.push(String(pd.year));
    }

    series.push({
      type: "line",
      name: p.prefName,
      data,
    });
  }

  const options: Highcharts.Options = {
    xAxis: {
      title: {
        text: "年度",
      },
      categories,
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    // 都道府県を一つも選んでいない場合との分岐条件
    series:
      series.length === 0
        ? [{ type: "line", name: "都道府県名", data: [] }]
        : series,
  };

  return (
    <div className="Graph">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default Graph;
