import React, { ReactElement } from "react";
import { TbBug } from "react-icons/tb";

export default function BugFeedbackButton(): ReactElement {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href="https://forms.zohopublic.eu/robolaunch/form/robolaunchPlatformForm/formperma/wdzEXselobn0zyK7bwEtjUQNAl0pR0FakvwmP1BS7mY"
      className="p-2 hover:bg-layer-light-100 rounded transition-300"
    >
      <TbBug size={28} />
    </a>
  );
}
