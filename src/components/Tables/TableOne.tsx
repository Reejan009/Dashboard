import Image from "next/image";
import React from "react";

interface TableProps {
  headers: string[];
  data: any[]; // Update the type as per your data structure
}

const TableOne: React.FC<TableProps> = ({ headers = [], data = [] }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {/* Dynamically set title */}
        {headers.includes("Source") ? "Top Channels" : "Products"}
      </h4>

      <div className="flex flex-col">
        <div className={`grid grid-cols-${headers.length} rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5`}>
          {headers.map((header, index) => (
            <div key={index} className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                {header}
              </h5>
            </div>
          ))}
        </div>

        {data.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-${headers.length} sm:grid-cols-5 ${
              index === data.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
            }`}
          >
            {headers.map((header, columnIndex) => (
              <div
                key={columnIndex}
                className={`flex items-center justify-start p-2.5 xl:p-5 cursor-pointer ${
                  columnIndex === 0 && header === "Source" ? "flex" : "hidden sm:flex"
                }`}
              >
                {columnIndex === 0 && header === "Source" ? (
                  // Check if it's the first column and header is "Source"
                  headers.includes("Name") ? (
                    <p className="text-black dark:text-white">{item.name}</p>
                  ) : (
                    <div className="flex-shrink-0">
                      <Image src={item.logo} alt="Brand" width={48} height={48} />
                    </div>
                  )
                ) : (
                  <p className="text-black dark:text-white">
                    {item[header.toLowerCase()]}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
