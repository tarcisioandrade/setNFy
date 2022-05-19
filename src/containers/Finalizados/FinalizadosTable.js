import React from "react";
import "./Finalizados.css";
import { ReactComponent as DeleteIcon } from "../../assets/imgs/delete.svg";
import {
  usePagination,
  useTable,
  useSortBy,
  useGlobalFilter,
} from "react-table/dist/react-table.development";
import { ModalConfirm, ModalFunctions } from "../../components";
import { GlobalFilters } from "./GlobalFilters";

const FinalizadosTable = (props) => {
  const { data, deleteNF, columns } = props;
  const { closeModal, openModal, toggleModal, actionModal, setActionModal } =
    ModalFunctions();

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "action",
        Header: "Ações",
        Cell: ({ row }) => (
          <button className="finalizados__table_icon">
            <DeleteIcon
              onClick={() => {
                openModal();
                setActionModal({
                  nf_id: row.values.nf_id,
                  message: `Deseja remover a NF ${row.values.nfClient}?`,
                  action: deleteNF,
                });
              }}
            />
          </button>
        ),
      },
    ]);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ["nf_id"],
        pageIndex: 0,
        pageSize: 7,
        sortBy: [{ id: "processo", desc: true }],
      },
    },
    useGlobalFilter,
    tableHooks,
    useSortBy,
    usePagination
  );

  return (
    <>
      <ModalConfirm
        closeModal={closeModal}
        toggleModal={toggleModal}
        finalize={actionModal}
      />
      <div className="finalizados__header">
        <h2>Notas Fiscais Finalizadas</h2>
        <GlobalFilters
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
        />
      </div>
      <div className="finalizados__table-content">
        <table className="finalizados__table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className={
                          cell.value === "Completo"
                            ? "finalizados__status--true"
                            : cell.value === "Complementar"
                            ? "finalizados__tipo--red"
                            : ""
                        }
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <select
          className="pagination__select"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[7, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize} Resultados
            </option>
          ))}
        </select>
        <div className="pagination__buttons">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span className="pagination__info">
            Página{" "}
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>{" "}
          </span>
        </div>
      </div>
    </>
  );
};

export default FinalizadosTable;
