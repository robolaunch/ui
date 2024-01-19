import InvoiceUtilizationModal from "../../modals/InvoiceUtilizationModal";
import { Fragment, ReactElement, useState } from "react";
import { TbCloudDownload } from "react-icons/tb";
import { AiOutlineEye } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import Button from "../Button/Button";

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
          className="!h-8 !w-8 !border !border-primary-500 !bg-transparent
                disabled:cursor-not-allowed disabled:!border-light-300 disabled:!text-light-300
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
          className="!h-8 !w-8 !border !border-secondary-600 !bg-transparent !ring-secondary-200"
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
