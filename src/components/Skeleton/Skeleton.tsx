import { ReactElement } from "react";
import SkeletonComp, { SkeletonProps } from "react-loading-skeleton";

export default function Skeleton(props: SkeletonProps): ReactElement {
  return <SkeletonComp {...props} />;
}
