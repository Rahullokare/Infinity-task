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
    // Dispatch an action to delete the invoice with the specified invoiceNumber
    dispatch(deleteInvoice(invoiceNumber));
  };
  return (
    <div>
      <div className="w-full bg-white pl-4 mt-8  pr-4">
        <div className="flex flex-col ">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block  min-w-full sm:px-6 lg:px-8">
              <SearchInput filter={globalFilter} setFilter={setGlobalFilter} />
              <p className=" opacity-2 text-xs text-slate-500 mb-4">
                *clicked on the column header to sort the element
              </p>
              <div className="overflow-hidden sm:rounded-lg">
                <table
                  {...getTableProps()}
                  className="min-w-full border  text-center"
                >
                  <thead>
                    {headerGroups.map((headerGroup, i) => (
                      <tr
                        key={headerGroup.id}
                        {...headerGroup.getHeaderGroupProps()}
                        className=" border-b transition duration-300 ease-in-out "
                      >
                        {headerGroup.headers.map((column, i) => (
                          <th
                            key={headerGroup.headers}
                            {...column.getHeaderProps(
                              column.getSortByToggleProps()
                            )}
                            scope="col"
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
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
                      return (
                        <tr
                          key={i}
                          {...row.getRowProps()}
                          className=" border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          {row.cells.map((cell) => {
                            return (
                              <>
                                <td
                                  key={i}
                                  {...cell.getCellProps()}
                                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-left"
                                >
                                  {cell.render("Cell")}
                                </td>
                              </>
                            );
                          })}
                          <td className="flex justify-center gap-3 mt-4">
                            <AiFillDelete
                              color="red"
                              className="cursor-pointer"
                              onClick={() =>
                                handleDelete(row.original.invoiceNumber)
                              }
                            />

                            <Link
                              to={`/edit/invoice/${row.original.invoiceNumber}`}
                            >
                              <GrEdit />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
