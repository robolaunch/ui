import { IEnvironment } from "./environment/environment.interface";

export interface ITemplate {
  alias: string;
  type: "private" | "organizational" | "public";
  applicationObject: IEnvironment;
  unixTimestamp: number;
}

export interface ITemplateBE {
  templateName: string;
  templateType: "private" | "organizational" | "public";
  templateContent: string;
}
