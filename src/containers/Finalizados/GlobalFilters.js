import React, { useState } from "react";
import { useAsyncDebounce } from "react-table/dist/react-table.development";

export const GlobalFilters = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
    <input
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      type="search"
      name="search"
      placeholder="Pesquisar"
      className="finalizados__search"
    />
  );
};
