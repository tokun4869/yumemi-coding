import React from "react";
import Style from "../styles/Selector.module.css";

type Props = {
  result:
    | {
        prefCode: number;
        prefName: string;
      }[]
    | undefined;
  onChange: (prafName: string, prefCode: number, check: boolean) => void;
};

function Selector(props: Props) {
  if (typeof props.result === "undefined") {
    return <p className={Style.Title}>都道府県</p>;
  } else {
    return (
      <>
        <p className={Style.Title}>都道府県</p>
        <div className={Style.Selector}>
          {props.result.map((prop) => {
            return (
              <div className={Style.CheckField} key={prop.prefCode}>
                <input
                  className={Style.Check}
                  type="checkbox"
                  id={prop.prefName}
                  onChange={(event) =>
                    props.onChange(
                      prop.prefName,
                      prop.prefCode,
                      event.target.checked
                    )
                  }
                />
                <label className={Style.Text}>
                  {prop.prefName.length === 3
                    ? " " + prop.prefName
                    : prop.prefName}
                </label>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Selector;
