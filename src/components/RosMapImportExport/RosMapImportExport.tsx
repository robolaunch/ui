import React, { useContext } from "react";
import { FileUploader } from "react-drag-drop-files";
import { CiExport, CiImport } from "react-icons/ci";
import { TaskManagementContext } from "../../contexts/TaskManagementContext";

export default function RosMapImportExport() {
  const { handleExportJSON, handleImportJSON }: any = useContext(
    TaskManagementContext
  );

  return (
    <div className="absolute left-4 bottom-4 cursor-pointer z-10">
      <div className="flex flex-col rounded-lg border border-layer-light-200 bg-layer-light-50 text-xs">
        <FileUploader
          label="text"
          multiple={false}
          handleChange={(e: any) => handleImportJSON(e)}
          name="file"
          types={["json"]}
        >
          <div className="flex gap-2 py-2 px-4 hover:bg-layer-light-100 transition-all duration-300">
            <CiImport size={16} />
            <span>Import</span>
          </div>
        </FileUploader>
        <div
          className="flex gap-2 py-2 px-4 hover:bg-layer-light-100 transition-all duration-300"
          onClick={() => handleExportJSON()}
        >
          <CiExport size={16} />
          <span>Export</span>
        </div>
      </div>
    </div>
  );
}
