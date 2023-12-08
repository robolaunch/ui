import React, { ReactElement, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

interface IPaginate {
  className?: string;
  style?: React.CSSProperties;
}

export default function Paginate({
  className,
  style,
}: IPaginate): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pageCount, setPageCount] = useState<number>(9);
  const [currentPage, setCurrentPage] = useState<number>(9);

  function handleNextPage() {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrevPage() {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div
      className={`flex w-full items-center justify-center gap-3 pt-6 ${className}`}
      style={{ ...style }}
    >
      <MdOutlineKeyboardArrowLeft
        onClick={() => handlePrevPage()}
        className={`${!currentPage && "invisible"}`}
      />
      {Array.from(Array(pageCount + 1).keys()).map((item, index) => {
        return (
          <span
            onClick={() => setCurrentPage(index)}
            key={index}
            className={`flex h-6 w-6 cursor-pointer items-center justify-center  rounded-lg text-sm transition-all duration-300 ${
              currentPage === index
                ? "text-light-50 bg-primary-500"
                : "hover:border-primary-200 hover:bg-primary-50 hover:border"
            }`}
          >
            {item + 1}
          </span>
        );
      })}
      <MdOutlineKeyboardArrowRight
        onClick={() => handleNextPage()}
        className={`${currentPage === pageCount && "invisible"}`}
      />
    </div>
  );
}
