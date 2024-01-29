import { IEnvironment } from "../interfaces/environment/environment.interface";
import { environmentInitialStep1Config } from "./environment.initial.step1.config";
import { environmentInitialStep2Config } from "./environment.initial.step2.config";
import { environmentInitialStep3Config } from "./environment.initial.step3.config";
import { environmentInitialStep4Config } from "./environment.initial.step4.config";

export const environmentInitialConfig: IEnvironment = {
  step1: environmentInitialStep1Config,
  step2: environmentInitialStep2Config,
  step3: environmentInitialStep3Config,
  step4: environmentInitialStep4Config,
};
