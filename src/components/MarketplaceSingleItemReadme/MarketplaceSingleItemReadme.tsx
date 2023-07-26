import React, { ReactElement, useEffect, useState } from "react";
import CardLayout from "../../layouts/CardLayout";
import MarkdownPreview from "@uiw/react-markdown-preview";
import ContentLoader from "react-content-loader";
import axios from "axios";

interface IMarketplaceSingleItemReadme {
  responseItem: any;
}

export default function MarketplaceSingleItemReadme({
  responseItem,
}: IMarketplaceSingleItemReadme): ReactElement {
  const [readMe, setReadMe] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      responseItem &&
        axios.get(responseItem?.rawRobotURL).then((res) => {
          setReadMe(res.data);
        });
    } catch (error) {
      setReadMe("Readme not found");
    }
  }, [responseItem]);

  return (
    <CardLayout className="col-span-1 h-full px-8 py-6">
      {readMe ? (
        <MarkdownPreview
          className="h-full"
          source={readMe}
          wrapperElement={{
            "data-color-mode": "light",
          }}
        />
      ) : (
        <div className="flex flex-col gap-6">
          <ContentLoader
            speed={1}
            width={312}
            height={36}
            backgroundColor="#f6f6ef"
            foregroundColor="#e8e8e3"
          >
            <rect width="312" height="36" rx="4" ry="4" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width={"100%"}
            height={24}
            backgroundColor="#f6f6ef"
            foregroundColor="#e8e8e3"
          >
            <rect width="100%" height="24" rx="4" ry="4" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width={"100%"}
            height={24}
            backgroundColor="#f6f6ef"
            foregroundColor="#e8e8e3"
          >
            <rect width="100%" height="24" rx="4" ry="4" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width={"100%"}
            height={24}
            backgroundColor="#f6f6ef"
            foregroundColor="#e8e8e3"
          >
            <rect width="100%" height="24" rx="4" ry="4" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width={"95%"}
            height={24}
            backgroundColor="#f6f6ef"
            foregroundColor="#e8e8e3"
          >
            <rect width="95%" height="24" rx="4" ry="4" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width={"90%"}
            height={24}
            backgroundColor="#f6f6ef"
            foregroundColor="#e8e8e3"
          >
            <rect width="90%" height="24" rx="4" ry="4" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width={"85%"}
            height={24}
            backgroundColor="#f6f6ef"
            foregroundColor="#e8e8e3"
          >
            <rect width="85%" height="24" rx="4" ry="4" />
          </ContentLoader>
          <ContentLoader
            speed={1}
            width={"80%"}
            height={24}
            backgroundColor="#f6f6ef"
            foregroundColor="#e8e8e3"
          >
            <rect width="80%" height="24" rx="4" ry="4" />
          </ContentLoader>
        </div>
      )}
    </CardLayout>
  );
}
