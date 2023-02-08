import React, { useState } from "react";
import Style from "../styles/Selector.module.css";

type Props = {
  prefectures: string[];
};

function Selector(props: Props) {
  const [nowCheck, setCheck] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheck = e.target.value;
    if (nowCheck === newCheck) {
      setCheck("");
    } else {
      setCheck(newCheck);
    }
  };

  return (
    <div className={Style.Selector}>
      {props.prefectures.map((prop) => {
        return (
          <div key={prop} className={Style.Checkbox}>
            <input
              type="checkbox"
              id={prop}
              value={prop}
              checked={nowCheck === prop}
              onChange={handleChange}
            />
            <p>{prop}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Selector;
