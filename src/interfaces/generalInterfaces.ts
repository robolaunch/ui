export interface IrobotPages {
  activeTab:
    | "Overview"
    | "Teleoperation"
    | "Task Management"
    | "Visualization"
    | "Loading"
    | "Settings"
    | "Remote Desktop"
    | "Development Suite"
    | "Code Editor";
  setActiveTab: React.Dispatch<
    React.SetStateAction<
      | "Overview"
      | "Teleoperation"
      | "Task Management"
      | "Visualization"
      | "Loading"
      | "Settings"
      | "Remote Desktop"
      | "Development Suite"
      | "Code Editor"
    >
  >;
}
