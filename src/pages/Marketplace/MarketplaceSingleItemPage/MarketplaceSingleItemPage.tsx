import React, { Fragment, ReactElement, useState } from "react";
import CardLayout from "../../../layouts/CardLayout";
import { Editor } from "@monaco-editor/react";
import { MdPublic } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import { BsShieldLockFill } from "react-icons/bs";
import InputSelect from "../../../components/InputSelect/InputSelect";
import MarketplaceSingleItemSidebar from "../../../components/MarketplaceSingleItemSidebar/MarketplaceSingleItemSidebar";

export default function MarketplaceSingleItemPage(): ReactElement {
  const [templateItem, setTemplateItem] = useState({
    title: "Cloudy Robot",
    organization: "Robolaunch Organization",
    description:
      "Cloudy is an open-source, 3D-printed robot designed and built by Robolaunch. With its advanced capabilities and innovative design, Cloudy is poised to become a key player in the world of robotics. Whether you're a seasoned DIY enthusiast or just getting started in the world of robotics, Cloudy has something to offer.",
    type: "virtual",
    rosDistro: "humble",
    access: "public",
    yaml: `name: cloudy_robot
description: A robot that is cloudy
version: 0.0.1
license: Apache-2.0
author: Robolaunch
maintainer: Robolaunch
url:
    homepage: https://robolaunch.com
    source:
    tracker:
`,
    deployCount: 67,
  });

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-9 grid grid-cols-1 gap-6">
        <CardLayout className="col-span-1 p-4">
          <div className="h-full flex items-center gap-4">
            <img
              className="h-36"
              src={`/svg/ros/${templateItem?.rosDistro}.svg`}
              alt={templateItem?.rosDistro}
            />
            <div className="h-full flex flex-col justify-between py-1.5">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-medium">
                    {templateItem.title}
                  </div>
                  <div
                    className={`text-[0.64rem] font-medium px-3 py-1 rounded-lg w-fit ${
                      templateItem?.type === "hybrid"
                        ? "text-layer-secondary-500 bg-layer-secondary-100"
                        : "text-layer-primary-500 bg-layer-primary-100"
                    } `}
                  >
                    {templateItem?.type === "hybrid"
                      ? "Hybrid Robot"
                      : "Virtual Robot"}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {(() => {
                    switch (templateItem?.access) {
                      case "public":
                        return (
                          <MdPublic
                            size={24}
                            className="text-layer-secondary-500"
                          />
                        );
                      case "organization":
                        return (
                          <RiOrganizationChart
                            size={24}
                            className="text-layer-secondary-500"
                          />
                        );
                      case "private":
                        return (
                          <BsShieldLockFill
                            size={24}
                            className="text-layer-secondary-500"
                          />
                        );
                    }
                  })()}
                  <InputSelect className="!text-sm !p-0 !m-0">
                    <Fragment>
                      <option
                        selected={
                          templateItem?.access === "public" ? true : false
                        }
                        value="public"
                      >
                        Public Template
                      </option>
                      <option
                        selected={
                          templateItem?.access === "organization" ? true : false
                        }
                        value="organization"
                      >
                        {templateItem?.organization} Template
                      </option>
                      <option
                        selected={
                          templateItem?.access === "private" ? true : false
                        }
                        value="private"
                      >
                        Private Template
                      </option>
                    </Fragment>
                  </InputSelect>
                </div>
              </div>

              <div className="text-sm text-layer-dark-800">
                {templateItem?.organization}
              </div>
              <div className="text-xs text-layer-dark-700">ROS2 Humble</div>

              <div className="text-xs text-layer-dark-600">
                {templateItem.description}
              </div>
            </div>
          </div>
        </CardLayout>

        <CardLayout className="col-span-1 h-fit">
          <Editor
            height="40rem"
            defaultLanguage="yaml"
            defaultValue={templateItem?.yaml}
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: 12,
              fontFamily: "monospace",
              lineDecorationsWidth: 10,
              wordWrap: "on",
              lineNumbersMinChars: 3,
              folding: false,
              padding: {
                top: 6,
                bottom: 6,
              },
            }}
            theme="vs-dark"
            onChange={(value: any) =>
              setTemplateItem({
                ...templateItem,
                yaml: value,
              })
            }
          />
        </CardLayout>
      </div>

      <MarketplaceSingleItemSidebar item={templateItem} />
    </div>
  );
}
