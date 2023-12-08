import React, { useContext } from "react";
import { FileUploader } from "react-drag-drop-files";
import { CiExport, CiImport } from "react-icons/ci";
import { MissionContext } from "../../contexts/MissionContext";

export default function RosMapImportExport() {
  const { handleExportJSON, handleImportJSON }: any =
    useContext(MissionContext);

  return (
    <div className="absolute bottom-4 left-4 z-10 cursor-pointer">
      <div className="border-light-200 bg-light-50 flex flex-col rounded-lg border text-xs">
        <FileUploader
          label="text"
          multiple={false}
          handleChange={(e: any) => handleImportJSON(e)}
          name="file"
          types={["json"]}
        >
          <div className="hover:bg-light-100 flex gap-2 px-4 py-2 transition-all duration-300">
            <CiImport size={16} />
            <span>Import</span>
          </div>
        </FileUploader>
        <div
          className="hover:bg-light-100 flex gap-2 px-4 py-2 transition-all duration-300"
          onClick={() => handleExportJSON()}
        >
          <CiExport size={16} />
          <span>Export</span>
        </div>
      </div>
    </div>
  );
}
