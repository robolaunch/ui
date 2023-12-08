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
          className="disabled:!border-light-300 disabled:!text-light-300 !border-primary-500 !h-8 !w-8
                !border !bg-transparent disabled:cursor-not-allowed
                "
          text={
            <MdPayment
              className={`${
                rowData?.status ? "!text-light-300" : "!text-primary-500"
              } `}
            />
          }
          disabled={rowData?.status}
        />
        <Button
          className="!border-secondary-600 !ring-secondary-200 !h-8 !w-8 !border !bg-transparent"
          text={<TbCloudDownload className="text-secondary-600" />}
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
