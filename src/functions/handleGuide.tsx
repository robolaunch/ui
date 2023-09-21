import GuideContainer from "../components/GuideContainer/GuideContainer";
import WelcomeGuide from "../components/WelcomeGuide/WelcomeGuide";
import { envOnPremiseFleet, envOnPremiseRobot } from "../helpers/envProvider";

export function getGuideItem(guide: string) {
  switch (guide) {
    case "welcome":
      return {
        selector: guide,
        stepInteraction: false,
        content: () => <WelcomeGuide />,
      };

    case '[data-tut="marketplace-sidebar-menu-item"]':
      return {
        selector: guide,
        position: "center",
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
            text={
              envOnPremiseFleet
                ? `Namespace is a centralized cloud resource that integrates cloud coordination, data sharing, and advanced ecosystem capabilities."`
                : `Fleet is a centralized cloud resource that integrates Cloud and Physical Instances for seamless coordination, data sharing, and enhanced robotics ecosystem capabilities.`
            }
          />
        ),
      };
    case '[data-tut="robot-sidebar-menu-item"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title={envOnPremiseRobot ? "Applications" : "Robots"}
            text={
              envOnPremiseRobot
                ? `The application is a Kubernetes-based resource within robolaunch's Cloud AI Platform, enabling seamless communication and collaboration within the platform through containerized app environments.`
                : `Robot is a Kubernetes-based resource in robolaunch's Cloud Robotics Platform, facilitating seamless communication and collaboration between robots through containerized ROS 2 environments.`
            }
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
            title={envOnPremiseRobot ? "Application Header" : "Robot Header"}
            text={
              envOnPremiseRobot
                ? "You can see the details of the application, control the application,  control the environments running on the application or develop the application's software."
                : "You can see the details of the robot, control the robot, assign tasks, control the environments running on the robot or develop the robot's software."
            }
          />
        ),
      };
    case '[data-tut="robot-information"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title={
              envOnPremiseRobot
                ? "Application Information"
                : "Robot Information"
            }
            text={`You can see the details of the ${
              envOnPremiseRobot ? "application" : "robot"
            }.`}
          />
        ),
      };
    case '[data-tut="robot-service-buttons"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title={
              envOnPremiseRobot ? "Application Services" : "Robot Services"
            }
            text={`You can access the code editor and remote desktop of the ${
              envOnPremiseRobot ? "application" : "robot"
            }.`}
          />
        ),
      };
    case '[data-tut="robot-resources"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title={
              envOnPremiseRobot ? "Application Resources" : "Robot Resources"
            }
            text={
              envOnPremiseRobot
                ? "You can see tho application's resources."
                : "You can see tho robot's resources."
            }
          />
        ),
      };
    case '[data-tut="robot-connections"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title={
              envOnPremiseRobot
                ? "Application Connections"
                : "Robot Connections"
            }
            text={`You can see the connection status of the ${
              envOnPremiseRobot ? "application" : "robot"
            }.`}
          />
        ),
      };
    case '[data-tut="robot-header-tabs"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title={`${envOnPremiseRobot ? "Application" : "Robot"} Header Tabs`}
            text={
              envOnPremiseRobot
                ? "You can access the code editor, development suite and remote desktop of the application."
                : "You can access the visualization, code editor, development suite and remote desktop of the robot."
            }
          />
        ),
      };

    case '[data-tut="robot-header-tab-overview"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Overview"
            text={`You can see the details of the ${
              envOnPremiseRobot ? "application" : "robot"
            }.`}
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
            title={`${envOnPremiseRobot ? "Application" : "Robot"} Status`}
            text={`You can see the status of the ${
              envOnPremiseRobot ? "application" : "robot"
            }.`}
          />
        ),
      };
    case '[data-tut="robot-activities-widget"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Activities Widget"
            text={`You can see the activities of the ${
              envOnPremiseRobot ? "application" : "robot"
            }.`}
          />
        ),
      };
    case '[data-tut="robot-workspaces-table"]':
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Workspaces Table"
            text={`You can see the workspaces of the ${
              envOnPremiseRobot ? "application" : "robot"
            }.`}
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
    case "[data-tut='create-robot-step1-name']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer title="Robot Name" text="Give your robot a name." />
        ),
      };
    case "[data-tut='create-robot-step1-type']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Robot Type"
            text="Select the type of robot you want to create."
          />
        ),
      };
    case "[data-tut='create-robot-step1-ros-distrobutions']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Ros Distrobutions"
            text="Select the ROS Distrobutions you want to use."
          />
        ),
      };
    case "[data-tut='create-robot-step1-storage']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title={`${envOnPremiseRobot ? "Application" : "Robot"} Storage`}
            text="Select the storage you want to use."
          />
        ),
      };
    case "[data-tut='create-robot-step1-ros2-bridge']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Ros2 Bridge"
            text="Select the Ros2 Bridge you want to use."
          />
        ),
      };
    case "[data-tut='create-robot-step1-vdi-session-count']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="VDI Session Count"
            text="Select the VDI Session Count you want to use."
          />
        ),
      };
    case "[data-tut='create-robot-step1-gpu-resource']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="GPU Resource"
            text="Select the GPU Resource you want to use."
          />
        ),
      };
    case "[data-tut='create-robot-step1-development-mode']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Development Mode"
            text="Select the Development Mode you want to use."
          />
        ),
      };

    case "[data-tut='create-robot-step2-workspaces']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Workspaces"
            text={
              envOnPremiseRobot
                ? `If you want to use a workspace in your application, you can add it here.`
                : `Workspaces are the ROS2 workspaces that you want to use in your robot.`
            }
          />
        ),
      };
    case "[data-tut='create-robot-step2-workspace-add-button']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Add Workspace"
            text="Click here to add a workspace."
          />
        ),
      };
    case "[data-tut='create-robot-step2-workspace-name']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Workspace Name"
            text="Type a workspace name."
          />
        ),
      };
    case "[data-tut='create-robot-step2-workspace-distro']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Workspace Distro"
            text="Select a workspace ROS2 distro."
          />
        ),
      };
    case "[data-tut='create-robot-step2-workspace-delete-button']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Delete Workspace"
            text="Click here to delete the workspace."
          />
        ),
      };
    case "[data-tut='create-robot-step2-workspace-repositories']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Workspace Repositories"
            text="Select the workspace repositories you want to use."
          />
        ),
      };

    case "[data-tut='create-robot-step2-repository-add-button']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Add Repository"
            text="Click here to add a repository."
          />
        ),
      };

    case "[data-tut='create-robot-step2-workspace-repository-name']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Repository Name"
            text="Type a repository name."
          />
        ),
      };
    case "[data-tut='create-robot-step2-workspace-repository-url']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Repository URL"
            text="Type a repository URL."
          />
        ),
      };
    case "[data-tut='create-robot-step2-workspace-repository-branch']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Repository Branch"
            text="Type a repository branch."
          />
        ),
      };
    case "[data-tut='create-robot-step2-workspace-repository-delete-button']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Delete Repository"
            text="Click here to delete the repository."
          />
        ),
      };
    case "[data-tut='create-robot-step3-name']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Build Manager Name"
            text="Give your build manager a name."
          />
        ),
      };
    case "[data-tut='create-robot-step3-steps']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Build Manager Steps"
            text="Build manager steps are the steps that will be executed in order to build your robot."
          />
        ),
      };
    case "[data-tut='create-robot-step3-build-add-button']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer title="Add Step" text="Click here to add a step." />
        ),
      };

    case "[data-tut='create-robot-build-step-name']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer title="Step Name" text="Type a step name." />
        ),
      };
    case "[data-tut='create-robot-build-step-workspace']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Step Workspace"
            text="Select a step workspace."
          />
        ),
      };
    case "[data-tut='create-robot-build-step-code-type']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Step Code Type"
            text="Select a step code type."
          />
        ),
      };
    case "[data-tut='create-robot-build-step-code']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer title="Step Code" text="Type a step code." />
        ),
      };
    case "[data-tut='create-robot-build-step-scope']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer title="Step Scope" text="Select a step scope." />
        ),
      };
    case "[data-tut='create-robot-step4-name']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Launch Manager Name"
            text="Give your launch manager a name."
          />
        ),
      };

    case "[data-tut='create-robot-step4-workspace']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Launch Manager Workspace"
            text="Select a launch manager workspace."
          />
        ),
      };
    case "[data-tut='create-robot-step4-code']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer title="Step Code" text="Type a step code." />
        ),
      };
    case "[data-tut='create-robot-step4-environments']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Launch Manager Environments"
            text="Type the launch manager environments you want to use."
          />
        ),
      };
    case "[data-tut='create-robot-step4-environment-add-button']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Add Environment"
            text="Click here to add an environment."
          />
        ),
      };
    case "[data-tut='create-application-step1-name']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Application Name"
            text="Give your application a name."
          />
        ),
      };
    case "[data-tut='create-application-step1-environment-selector']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="Application Environment"
            text="Select the environment you want to use."
          />
        ),
      };

    case "[data-tut='create-environment-vdi-session-count']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="VDI Session Count"
            text="Select the VDI Session Count you want to use."
          />
        ),
      };
    case "[data-tut='create-environment-gpu-resource']":
      return {
        selector: guide,
        content: () => (
          <GuideContainer
            title="GPU Resource"
            text="Select the GPU Resource you want to use."
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
