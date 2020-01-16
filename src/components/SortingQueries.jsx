import React from "react";

const SortingQueries = ({
  searchByOptions,
  handleSortChange,
  sort_by,
  order
}) => {
  return (
    <div>
      <label htmlFor="searchBy">Search By:</label>
      <select
        value={sort_by}
        onChange={handleSortChange}
        class="select-css"
        name="sort_by"
      >
        <option selected disabled value="">
          Choose Sort By
        </option>
        {Object.keys(searchByOptions).map(option => {
          return <option value={searchByOptions[option].value}> { searchByOptions[option].name}</option>;
        })}
      </select>
      <select
        value={order}
        onChange={handleSortChange}
        class="select-css"
        name="order"
      >
        <option selected disabled value="">
          Choose order By
        </option>
        <option value="asc">Ascending</option>
        <option value="desc">Decending</option>
      </select>
    </div>
  );
};

export default SortingQueries;
