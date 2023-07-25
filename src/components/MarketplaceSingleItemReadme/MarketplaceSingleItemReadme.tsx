import React, { ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function MarketplaceSingleItemReadme(): ReactElement {
  const source = `
# <img src="https://carla.org//img/logo/carla-black-m.png" width="40" height="40" align="top"> CARLA Simulator

CARLA is an open-source simulator for autonomous driving research. CARLA has been developed from the ground up to support development, training, and validation of autonomous driving systems. In addition to open-source code and protocols, CARLA provides open digital assets (urban layouts, buildings, vehicles) that were created for this purpose and can be used freely. The simulation platform supports flexible specification of sensor suites and environmental conditions.

## How can you start CARLA Simulator?

To start CARLA Simulator in remote desktop, open up a new terminal and enter the command below:

\`\`\`bash
/opt/carla-simulator/CarlaUE4.sh
\`\`\`

Then spawn a vehicle to manually control in CARLA Simulator:

\`\`\`bash
python3 /opt/carla-simulator/PythonAPI/manual_control_carsim.py
\`\`\`
  `;

  return (
    <CardLayout className="col-span-1 h-full px-8 py-6">
      <MarkdownPreview
        className="h-full"
        source={source}
        wrapperElement={{
          "data-color-mode": "light",
        }}
      />
    </CardLayout>
  );
}
