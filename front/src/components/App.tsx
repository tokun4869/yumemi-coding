import React, { useEffect, useState } from "react";
import Axios, { AxiosResponse, AxiosError } from "axios";
import Header from "./Header";
import Selector from "./Selector";
import Graph from "./Graph";
import Style from "../styles/App.module.css";

type PrefectureAPI = {
  message: null;
  result: {
    prefCode: number;
    prefName: string;
  }[];
};

type APIError = {
  error: string;
};

type PopulationAPI = {
  message: null;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: {
        year: number;
        value: number;
      }[];
    }[];
  };
};

type Population = {
  prefName: string;
  data: {
    year: number;
    value: number;
  }[];
};

function App() {
  const [prefectures, setPrefectures] = useState<PrefectureAPI | null>(null);
  const [population, setPopulation] = useState<Population[]>([]);
  const url = "https://opendata.resas-portal.go.jp";
  const APIKey = "1fX6AuoPoqHbgmZlCoZYj11v65tPMfbfHJxBl0o7";

  useEffect(() => {
    Axios.get(url + "/api/v1/prefectures", { headers: { "X-API-KEY": APIKey } })
      .then((res: AxiosResponse<PrefectureAPI>) => {
        setPrefectures(res.data);
      })
      .catch((error: AxiosError<APIError>) => {
        console.log(error.message);
      });
  }, []);

  const handleClick = (prefName: string, prefCode: number, check: boolean) => {
    const populationBuf = population.slice();

    // チェックをつけた処理
    if (check) {
      if (
        populationBuf.findIndex((value) => value.prefName === prefName) !== -1
      )
        return;
      Axios.get(url + "/api/v1/population/composition/perYear", {
        headers: { "X-API-KEY": APIKey },
        params: { cityCode: "-", prefCode },
      })
        .then((res: AxiosResponse<PopulationAPI>) => {
          console.log(res.data);
          populationBuf.push({
            prefName,
            data: res.data.result.data[0].data,
          });
          setPopulation(populationBuf);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
    // チェックを外した処理
    else {
      const deleteIndex = populationBuf.findIndex(
        (value) => value.prefName === prefName
      );
      if (deleteIndex === -1) return;
      populationBuf.splice(deleteIndex, 1);
      setPopulation(populationBuf);
    }
  };

  return (
    <div className="App">
      <div className={Style.Header}>
        <Header />
      </div>
      <div className={Style.Selector}>
        <Selector result={prefectures?.result} onChange={handleClick} />
      </div>
      <div className={Style.Graph}>
        <Graph result={population} />
      </div>
    </div>
  );
}

export default App;
