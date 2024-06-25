import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface TableProps {
  headers: string[];
  data: any[]; // Update the type as per your data structure
}

const TableOne: React.FC<TableProps> = ({ headers = [], data = [] }) => {
  const router = useRouter();
  const [tableData, setTableData] = useState(data);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/inventory/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Filter out the deleted product from the state
        const updatedData = tableData.filter(item => item.id !== id);
        setTableData(updatedData);
        router.refresh(); // Optional: Refresh the page if needed
      } else {
        console.error("Failed to delete the item.");
      }
    } catch (error) {
      console.error("An error occurred while deleting the item:", error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {headers.includes("Source") ? "Top Channels" : "Products"}
      </h4>

      <div className="flex flex-col">
        <div className={`grid grid-cols-${headers.length + 1} rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6`}>
          {headers.map((header, index) => (
            <div key={index} className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                {header}
              </h5>
            </div>
          ))}
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Actions
            </h5>
          </div>
        </div>

        {tableData.map((item, index) => (
          <div
            key={index}
            className={`grid grid-cols-${headers.length + 1} sm:grid-cols-6 ${
              index === tableData.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
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
            <div className="flex items-center justify-start p-2.5 xl:p-5">
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:text-red-800 bg-red rounded-md text-white w-14"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
