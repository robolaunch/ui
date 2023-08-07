import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { ReactTerminal, TerminalContextProvider } from "react-terminal";

interface ITerminal {
  value: string;
  ref?: any;
}

export default function Terminal({ value, ref }: ITerminal): ReactElement {
  const [terminalValue, setTerminalValue] = useState<string[]>([]);

  useEffect(() => {
    const lines = value.split("\n");
    setTerminalValue(lines);
  }, [value]);

  return (
    <TerminalContextProvider>
      <ReactTerminal
        ref={ref}
        prompt={">"}
        theme={"material-dark"}
        welcomeMessage={
          <Fragment>
            {terminalValue.map((line: string, index: number) => {
              return (
                <p key={index} className="!text-xs">
                  {line}
                </p>
              );
            })}
          </Fragment>
        }
        enableInput={false}
        showControlBar={false}
      />
    </TerminalContextProvider>
  );
}
