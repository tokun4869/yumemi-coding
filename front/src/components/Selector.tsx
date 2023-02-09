import React, { useState } from "react";
import Style from "../styles/Selector.module.css";

type Props = {
  result:
    | {
        prefCode: number;
        prefName: string;
      }[]
    | undefined;
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

  if (typeof props.result === "undefined") {
    return <></>;
  } else {
    return (
      <div className={Style.Selector}>
        {props.result.map((prop) => {
          return (
            <div key={prop.prefCode} className={Style.Checkbox}>
              <input
                type="checkbox"
                id={prop.prefName}
                value={prop.prefName}
                checked={nowCheck === prop.prefName}
                onChange={handleChange}
              />
              <div className={Style.Text}>{prop.prefName}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Selector;
