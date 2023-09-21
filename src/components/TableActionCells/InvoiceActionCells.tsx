import React, { Fragment, ReactElement, useState } from "react";
import Button from "../Button/Button";
import { MdPayment } from "react-icons/md";
import { TbCloudDownload } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import InvoiceUtilizationModal from "../../modals/InvoiceUtilizationModal";

interface IInvoiceActionCells {
  rowData: any;
}

export default function InvoiceActionCells({
  rowData,
}: IInvoiceActionCells): ReactElement {
  const [isOpenInvoiceUtilizationModal, setIsOpenInvoiceUtilizationModal] =
    useState<boolean>(false);

  return (
    <Fragment>
      <div className="flex justify-end gap-3">
        <Button
          className="!h-8 !w-8 !border !border-layer-primary-500 !bg-transparent
                disabled:cursor-not-allowed disabled:!border-layer-light-300 disabled:!text-layer-light-300
                "
          text={
            <MdPayment
              className={`${
                rowData?.status
                  ? "!text-layer-light-300"
                  : "!text-layer-primary-500"
              } `}
            />
          }
          disabled={rowData?.status}
        />
        <Button
          className="!h-8 !w-8 !border !border-layer-secondary-600 !bg-transparent !ring-layer-secondary-200"
          text={<TbCloudDownload className="text-layer-secondary-600" />}
        />
        <Button
          onClick={() => setIsOpenInvoiceUtilizationModal(true)}
          className="!h-8 !w-8 !border !border-red-600 !bg-transparent !ring-red-200"
          text={<AiOutlineEye className="text-red-600" />}
        />
      </div>
      {isOpenInvoiceUtilizationModal && (
        <InvoiceUtilizationModal
          visibleModal={isOpenInvoiceUtilizationModal}
          handleCloseModal={() =>
            setIsOpenInvoiceUtilizationModal(!isOpenInvoiceUtilizationModal)
          }
        />
      )}
    </Fragment>
  );
}
