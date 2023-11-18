import React from "react";
import { INVOICES_COLUMN } from "./Columns";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import SearchInput from "./SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";
import { deleteInvoice } from "../features/invoice/invoiceSlice";
import swal from "sweetalert";

const Table = () => {
  const invoices = useSelector((state) => state.invoices);
  const dispatch = useDispatch();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state,
    setGlobalFilter,
    pageOptions,
    gotoPage,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns: INVOICES_COLUMN,
      data: invoices,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { pageIndex, pageSize, globalFilter } = state;
  const handleDelete = (invoiceNumber) => {
    if (invoiceNumber !== undefined) {
      console.log("Deleting invoice with number:", invoiceNumber);

      // Dispatch the deleteInvoice action with the correct payload structure
      dispatch(deleteInvoice({ invoiceId: invoiceNumber }));

      swal("Poof! Your invoice has been deleted!", {
        icon: "success",
      });
    } else {
      console.error("Error: invoiceNumber is undefined");
    }
  };

  return (
    <div className="w-full bg-white mt-8 p-4 rounded-md shadow-md">
      <div className="flex flex-col">
        <SearchInput filter={globalFilter} setFilter={setGlobalFilter} />
        <p className="opacity-2 text-xs text-slate-500 mb-4">
          * Click on the column header to sort the elements
        </p>
        <div className=" overflow-x-auto  rounded-lg">
          <table {...getTableProps()} className="min-w-full border text-center">
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr
                  key={headerGroup.id}
                  {...headerGroup.getHeaderGroupProps()}
                  className="border-b transition duration-300 ease-in-out"
                >
                  {headerGroup.headers.map((column, i) => (
                    <th
                      key={i}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      scope="col"
                      className="px-6 py-4 text-sm font-medium text-gray-900 text-left"
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "🔽"
                            : "🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                  <th>Action</th>
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                const statusClass =
                  row.original.status.toLowerCase() === "paid"
                    ? "text-green-500"
                    : row.original.status.toLowerCase() === "outstanding"
                    ? "text-yellow-500"
                    : row.original.status.toLowerCase() === "late"
                    ? "text-red-500"
                    : "";
                return (
                  <tr
                    key={i}
                    {...row.getRowProps()}
                    className="border-b transition duration-300 ease-in-out hover:bg-gray-100"
                  >
                    {row.cells.map((cell) => (
                      <td
                        key={i}
                        {...cell.getCellProps()}
                        className={`px-6 py-4 whitespace-nowrap ${statusClass}  text-sm text-gray-900 text-left`}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                    <td className="flex justify-center gap-3 mt-4">
                      <AiFillDelete
                        color="red"
                        className="cursor-pointer"
                        onClick={() =>
                          handleDelete(row.original?.invoiceNumber)
                        }
                      />
                      <Link to={`/edit/invoice/${row.original.invoiceNumber}`}>
                        <GrEdit />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="px-2 py-1 border rounded-md mr-2"
            >
              {"<<"}
            </button>
            <button
              onClick={previousPage}
              disabled={!canPreviousPage}
              className="px-2 py-1 border rounded-md mr-2"
            >
              {"<"}
            </button>
            <button
              onClick={nextPage}
              disabled={!canNextPage}
              className="px-2 py-1 border rounded-md mr-2"
            >
              {">"}
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="px-2 py-1 border rounded-md"
            >
              {">>"}
            </button>
          </div>
          <div>
            <span className="mr-2">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <span>
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                className="w-16 px-2 py-1 border rounded-md"
              />
            </span>{" "}
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="ml-2 px-2 py-1 border rounded-md"
            >
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
