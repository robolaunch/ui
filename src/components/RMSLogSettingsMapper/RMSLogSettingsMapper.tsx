import { Fragment, ReactElement, useEffect, useState } from "react";
import useFunctions from "../../hooks/useFunctions";
import InputText from "../InputText/InputText";
import Card from "../Card/Card";
import CFAddButton from "../CFAddButton/CFAddButton";

export default function RMSLogSettingsMapper(): ReactElement {
  const { getConfigFC, updateConfigFC } = useFunctions();

  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    handleGetConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    config && handleUpdateConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  async function handleUpdateConfig() {
    await updateConfigFC({
      config: config,
    });
  }

  async function handleGetConfig() {
    setConfig((await getConfigFC())?.data?.data);
  }

  return (
    <Fragment>
      {config?.log?.paths?.map((path: string, index: number) => {
        return (
          <Card
            key={index}
            className="flex !h-28 flex-col gap-2 px-4 py-8 shadow-none"
          >
            <InputText
              className="w-full"
              placeholder={`Log Path #${index + 1}`}
              key={index}
              value={path}
              onChange={(e) => {
                setConfig((prevConfig: any) => {
                  const newConfig = { ...prevConfig };
                  newConfig.log.paths = [...newConfig.log.paths];
                  newConfig.log.paths[index] = e.target.value;
                  return newConfig;
                });
              }}
            />
            <Fragment>
              {index !== 0 && (
                <p
                  className="cursor-pointer pt-1 text-center text-xs font-medium text-red-500 hover:underline"
                  onClick={() => {
                    setConfig((prevConfig: any) => {
                      const newConfig = { ...prevConfig };
                      newConfig.log.paths = [...newConfig.log.paths];
                      newConfig.log.paths.splice(index, 1);
                      return newConfig;
                    });
                  }}
                >
                  Delete Path
                </p>
              )}
            </Fragment>
          </Card>
        );
      })}
      <CFAddButton
        onClick={() => {
          config &&
            setConfig((prevConfig: any) => {
              const newConfig = { ...prevConfig };
              newConfig.log.paths = [...newConfig.log.paths];
              newConfig.log.paths.push("/home");
              return newConfig;
            });
        }}
      />
    </Fragment>
  );
}
