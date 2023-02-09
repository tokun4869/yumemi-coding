import React, { useState } from "react";
import Style from "../styles/Selector.module.css";

type Props = {
  result:
    | {
        prefCode: number;
        prefName: string;
      }[]
    | undefined;
  setCheck?: (arg: string) => void;
};

function Selector(props: Props) {
  const [nowCheck, setCheck] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheck = e.target.value;
    if (nowCheck === newCheck) {
      setCheck("");
      props.setCheck?.("");
    } else {
      setCheck(newCheck);
      props.setCheck?.(newCheck);
    }
  };

  if (typeof props.result === "undefined") {
    return <p className={Style.Title}>都道府県</p>;
  } else {
    return (
      <>
        <p className={Style.Title}>都道府県</p>
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
      </>
    );
  }
}

export default Selector;
