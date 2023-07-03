import React, { ReactElement } from "react";
import ContentLoader from "react-content-loader";

export default function SidebarListLoader(): ReactElement {
  return (
    <ContentLoader
      speed={1}
      width={"100%"}
      height={68 * 4}
      backgroundColor="#f6f6ef"
      foregroundColor="#e8e8e3"
    >
      <rect width="100%" height="68" rx="6" ry="6" />
      <rect y={68 + 16} width="100%" height="68" rx="6" ry="6" />
      <rect y={68 * 2 + 32} width="100%" height="68" rx="6" ry="6" />
    </ContentLoader>
  );
}
