import GuideContainer from "../components/GuideContainer/GuideContainer";
import { envOnPremiseFleet, envOnPremiseRobot } from "../helpers/envProvider";

export function getGuideItem(
  guide: string,
  type?: "main" | "organization" | "roboticscloud" | "instance" | "fleet"
) {
  switch (guide) {
    case '[data-tut="marketplace-sidebar-menu-item"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Marketplace"
            text={`Access predefined ${
              envOnPremiseRobot ? "applications" : "robots"
            } on Marketplace and install them quickly.`}
          />
        ),
      };
    case '[data-tut="organization-sidebar-menu-item"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Organizations"
            text="An Organization is the top-level structure in robolaunch, enabling you to create and manage accounts, invite team members, and serve as the organization administrator."
          />
        ),
      };
    case '[data-tut="roboticscloud-sidebar-menu-item"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Regions"
            text="A Region unifies Cloud and Physical Instance management, enabling easy connections between virtual machines and robots via a secure network."
          />
        ),
      };

    case '[data-tut="instance-sidebar-menu-item"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Instances"
            text="An Instance encompasses both 'Physical Instances' (tangible devices for remote management and coordination) and 'Cloud Instances' (scalable virtual machines for flexible robotics application deployment)."
          />
        ),
      };
    case '[data-tut="fleet-sidebar-menu-item"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title={envOnPremiseFleet ? "Namespaces" : "Fleets"}
            text={`A Fleet is a centralized cloud resource that integrates Cloud and Physical Instances for seamless coordination, data sharing, and enhanced robotics ecosystem capabilities.
`}
          />
        ),
      };
    case '[data-tut="robot-sidebar-menu-item"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title={envOnPremiseRobot ? "Applications" : "Robots"}
            text={`A Robot is a Kubernetes-based resource in robolaunch's Cloud Robotics Platform, facilitating seamless communication and collaboration between robots through containerized ROS 2 environments.`}
          />
        ),
      };
    case '[data-tut="information-widget"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Information Widget"
            text={
              type === "main"
                ? "An Organization is the highest-level structure within robolaunch. It allows to create and manage multiple accounts as an organization administrator and inviting your teammates."
                : type === "organization"
                ? "Regions empowers your organization to seamlessly provision and manage both Cloud Instances and Physical Instances in a unified cloud-based platform. You can easily connect your virtual machines (Cloud Instances) with single board computers and robots (Physical Instances) through a secure network."
                : type === "roboticscloud"
                ? `In robolaunch Cloud Robotics Platform, Instances include both "Physical Instances" (tangible devices for remote management and coordination) and "Cloud Instances" (virtual machines with scalable resources for flexible robotics application deployment).`
                : type === "instance"
                ? "A fleet is a centralized cloud resource that integrates Cloud Instances and Physical Instances, enabling seamless coordination and data sharing. It provides a DDS discovery server, enhancing the robotics ecosystem's capabilities and functionality."
                : type === "fleet"
                ? "Robots in the robolaunch Cloud Robotics Platform are federated resources in Kubernetes, providing a containerized ROS 2 environment and configurations. This enables seamless communication between multiple robots, promoting collaboration, efficiency, and coordination in the DDS level."
                : "none"
            }
          />
        ),
      };
    case '[data-tut="regions-widget"]':
      return {
        selector: guide,
        content: () => <GuideContainer title="Regions" text="Desc" />,
      };
    case '[data-tut="usages-widget"]':
      return {
        selector: guide,
        content: () => <GuideContainer title="Usages Widget" text="Desc" />,
      };
    case '[data-tut="counter-widget"]':
      return {
        selector: guide,
        content: () => <GuideContainer title="Counter Widget" text="Desc" />,
      };
    case '[data-tut="resources-widget"]':
      return {
        selector: guide,
        content: () => <GuideContainer title="Resources" text="Desc" />,
      };
    case '[data-tut="general-table"]':
      return {
        selector: guide,
        content: () => <GuideContainer title="Table" text="Desc" />,
      };

    default:
      return {
        selector: guide,
        content: () => <GuideContainer title="Title" text="Description" />,
      };
  }
}
