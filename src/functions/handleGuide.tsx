import GuideContainer from "../components/GuideContainer/GuideContainer";
import { envOnPremiseFleet, envOnPremiseRobot } from "../helpers/envProvider";

export function getGuideItem(guide: string) {
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
            text="Organization is the top-level structure in robolaunch, enabling you to create and manage accounts, invite team members, and serve as the organization administrator."
          />
        ),
      };
    case '[data-tut="roboticscloud-sidebar-menu-item"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Regions"
            text="Region unifies Cloud and Physical Instance management, enabling easy connections between virtual machines and robots via a secure network."
          />
        ),
      };

    case '[data-tut="instance-sidebar-menu-item"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Instances"
            text="Instance encompasses both 'Physical Instances' (tangible devices for remote management and coordination) and 'Cloud Instances' (scalable virtual machines for flexible robotics application deployment)."
          />
        ),
      };
    case '[data-tut="fleet-sidebar-menu-item"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title={envOnPremiseFleet ? "Namespaces" : "Fleets"}
            text={`Fleet is a centralized cloud resource that integrates Cloud and Physical Instances for seamless coordination, data sharing, and enhanced robotics ecosystem capabilities.
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
            text={`Robot is a Kubernetes-based resource in robolaunch's Cloud Robotics Platform, facilitating seamless communication and collaboration between robots through containerized ROS 2 environments.`}
          />
        ),
      };
    case '[data-tut="information-widget"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Information Widget"
            text={"Find out which page you are on and what you can do."}
          />
        ),
      };
    case '[data-tut="regions-widget"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Regions Widget"
            text="Created regions can be seen on the world map."
          />
        ),
      };
    case '[data-tut="usages-widget"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Usages Widget"
            text="Instantly check the resources consumed by the instance."
          />
        ),
      };
    case '[data-tut="counter-widget"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="State Widget"
            text="Keep track of the numbers and status of your created objects"
          />
        ),
      };
    case '[data-tut="resources-widget"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Resources Widget"
            text="View the software resources that the instance has."
          />
        ),
      };
    case '[data-tut="general-table"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Table"
            text="Keep track of the numbers, status and all other details of your created objects"
          />
        ),
      };
    case '[data-tut="robot-header"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Robot Header"
            text="You can see the details of the robot, control the robot, assign tasks, control the environments running on the robot or develop the robot's software."
          />
        ),
      };
    case '[data-tut="robot-information"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Robot Information"
            text="You can see the details of the robot."
          />
        ),
      };
    case '[data-tut="robot-service-buttons"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Robot Services"
            text="You can access the code editor and remote desktop of the robot."
          />
        ),
      };
    case '[data-tut="robot-resources"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Robot Connections"
            text="You can see tho robot's resources."
          />
        ),
      };
    case '[data-tut="robot-connections"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Robot Connections"
            text="You can see the connection status of the robot."
          />
        ),
      };
    case '[data-tut="robot-header-tabs"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Robot Header Tabs"
            text="You can access the visualization, code editor, development suite and remote desktop of the robot."
          />
        ),
      };

    case '[data-tut="robot-header-tab-overview"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Overview"
            text="You can see the details of the robot."
          />
        ),
      };
    case '[data-tut="robot-header-tab-teleoperation"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Teleoperation"
            text="You can control the robot."
          />
        ),
      };
    case '[data-tut="robot-header-tab-visualization"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Visualization"
            text="You can see the visualization of the robot."
          />
        ),
      };
    case '[data-tut="robot-header-tab-code-editor"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Code Editor"
            text="You can access the code editor of the robot."
          />
        ),
      };
    case '[data-tut="robot-header-tab-development-suite"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Development Suite"
            text="You can access the development suite of the robot."
          />
        ),
      };
    case '[data-tut="robot-header-tab-remote-desktop"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Remote Desktop"
            text="You can access the remote desktop of the robot."
          />
        ),
      };
    case '[data-tut="robot-information-widget"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Information Widget"
            text="You can see the details of the robot."
          />
        ),
      };
    case '[data-tut="robot-status-widget"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Status Widget"
            text="You can see the status of the robot."
          />
        ),
      };
    case '[data-tut="robot-activities-widget"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Activities Widget"
            text="You can see the activities of the robot."
          />
        ),
      };
    case '[data-tut="robot-workspaces-table"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Workspaces Table"
            text="You can see the workspaces of the robot."
          />
        ),
      };
    case '[data-tut="robot-build-managers-table"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Build Managers Table"
            text="You can see the build managers of the robot."
          />
        ),
      };
    case '[data-tut="robot-launch-managers-table"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Launch Managers Table"
            text="You can see the launch managers of the robot."
          />
        ),
      };

    default:
      return {
        selector: guide,
        content: () => <GuideContainer title="Title" text="Description" />,
      };
  }
}
