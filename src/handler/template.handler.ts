import { ITemplate, ITemplateBE } from "../interfaces/template.interface";

function handleMapper(data: ITemplateBE[]): ITemplate[] {
  return (
    data?.map((template) => {
      return {
        alias: template?.templateName?.split("-")[0],
        unixTimestamp: Number(template?.templateName?.split("-")[1]),
        type: template?.templateType,
        applicationObject: JSON.parse(template?.templateContent || "{}"),
      };
    }) || []
  );
}

export function templatesMapper(data: ITemplateBE[]): ITemplate[] {
  return handleMapper(data);
}
