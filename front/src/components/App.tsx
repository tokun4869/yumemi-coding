import React, { useEffect, useState } from "react";
import Axios, { AxiosResponse, AxiosError } from "axios";
import Selector from "./Selector";
import Style from "../styles/App.module.css";

type PrefectureAPI = {
  message: null;
  result: {
    prefCode: number;
    prefName: string;
  }[];
};

type PrefectureError = {
  error: string;
};

function App() {
  const APIKey = "1fX6AuoPoqHbgmZlCoZYj11v65tPMfbfHJxBl0o7";
  const [prefectures, setPrefectures] = useState<PrefectureAPI>();

  useEffect(() => {
    const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
    Axios.get(url, { headers: { "X-API-KEY": APIKey } })
      .then((res: AxiosResponse<PrefectureAPI>) => {
        setPrefectures(res.data);
      })
      .catch((err: AxiosError<PrefectureError>) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="App">
      <div className={Style.Title}>都道府県</div>
      <Selector result={prefectures?.result} />
    </div>
  );
}

export default App;
