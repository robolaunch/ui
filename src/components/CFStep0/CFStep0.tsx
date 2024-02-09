import { Fragment, ReactElement, useEffect, useState } from "react";
import CFGridItem from "../CFGridItem/CFGridItem";
import useFunctions from "../../hooks/useFunctions";
import { ITemplate } from "../../interfaces/global/template.interface";
import Button from "../Button/Button";
import { IEnvironment } from "../../interfaces/environment/environment.interface";
import useMain from "../../hooks/useMain";
import ContentLoader from "react-content-loader";

export default function CFStep0(): ReactElement {
  const [templates, setTemplates] = useState<ITemplate[] | undefined>(
    undefined,
  );
  const [selectedTemplate, setSelectedTemplate] = useState<{
    category: "private" | "organizational" | "public";
    template: IEnvironment | undefined;
  }>({
    category: "private",
    template: undefined,
  });
  const { getTemplates } = useFunctions();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    handleGetTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Array.isArray(templates) && templates.length === 0) {
      handleCreateRobotNextStep();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templates]);

  useEffect(() => {
    setSelectedTemplate((prev) => ({
      ...prev,
      template: undefined,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTemplate?.category]);

  const { setRobotData } = useMain();

  const { handleCreateRobotNextStep } = useMain();

  async function handleGetTemplates() {
    setTemplates(await getTemplates());
  }

  const box = (template: ITemplate) => {
    return (
      <div className="flex h-full w-full items-center gap-6 p-2.5">
        <img
          src="/svg/general/application/application-dark.svg"
          alt="app"
          className="h-12 w-12"
        />
        <div className="flex h-full flex-col justify-evenly text-[10px]">
          <p>Alias: {template?.alias}</p>
          <p>
            Create Date:
            {new Date(template?.unixTimestamp * 1000)?.toLocaleString("en-US", {
              month: "numeric",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p>
            Application:{" "}
            {
              template?.applicationObject?.step1?.applicationConfig?.application
                ?.name
            }{" "}
            {
              template?.applicationObject?.step1?.applicationConfig?.application
                ?.version
            }
          </p>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <div className=" flex flex-col gap-4 bg-light-50">
        <p className="text-sm">
          You can import a template from select a ready template from the list
          below.
        </p>
        <div className="grid w-full grid-cols-3 gap-2">
          {["Private", "Organizational", "Public"].map((category, index) => {
            return (
              <CFGridItem
                disabled={false}
                key={index}
                selected={
                  selectedTemplate?.category === category?.toLocaleLowerCase()
                    ? true
                    : false
                }
                text={category}
                onClick={() => {
                  setSelectedTemplate((prev: any) => {
                    return {
                      ...prev,
                      category: category?.toLocaleLowerCase(),
                    };
                  });
                }}
                className="!rounded-full !p-1.5"
              />
            );
          })}
        </div>
        <div className="grid w-full grid-cols-2 gap-2">
          {selectedTemplate?.category && Array.isArray(templates) ? (
            templates
              ?.filter(
                (template) => template?.type === selectedTemplate?.category,
              )
              ?.map((template, index) => {
                return (
                  <CFGridItem
                    key={index}
                    selected={
                      selectedTemplate?.template === template?.applicationObject
                    }
                    disabled={false}
                    text={box(template as ITemplate)}
                    onClick={() => {
                      setSelectedTemplate((prev: any) => {
                        return {
                          ...prev,
                          template: template?.applicationObject,
                        };
                      });
                    }}
                  />
                );
              })
          ) : (
            <ContentLoader
              className="col-span-2"
              speed={1}
              width={"100%"}
              height={68 * 4}
              backgroundColor="#f6f6ef"
              foregroundColor="#e8e8e3"
              animate
            >
              <rect width="100%" height="68" rx="6" ry="6" />
              <rect y={68 + 16} width="100%" height="68" rx="6" ry="6" />
              <rect y={68 * 2 + 32} width="100%" height="68" rx="6" ry="6" />
            </ContentLoader>
          )}
        </div>
        <div className="flex w-full gap-2">
          <Button
            onClick={() => {
              handleCreateRobotNextStep();
            }}
            text="Continue without template"
            className="!h-11 border border-primary-700 !bg-light-50 text-xs !text-primary-700 transition-all duration-500 hover:!bg-primary-100"
          />
          <Button
            onClick={() => {
              setIsLoading(true);
              setRobotData({
                ...selectedTemplate.template!,
                step1: {
                  ...selectedTemplate.template?.step1!,
                  sharing: {
                    alias: "",
                    private: false,
                    organization: false,
                    public: false,
                  },
                },
              });
              setTimeout(() => {
                handleCreateRobotNextStep();
              }, 1000);
            }}
            text="Continue with selected template"
            className="!h-11 text-xs transition-all duration-500"
            disabled={selectedTemplate?.template ? false : true}
            loading={isLoading}
          />
        </div>
      </div>
    </Fragment>
  );
}
