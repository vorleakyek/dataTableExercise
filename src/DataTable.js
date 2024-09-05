import { useState, useEffect } from "react";
import users from "./data/users.json";

export default function DataTable() {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [displayUsers, setDisplayUsers] = useState(
    users.slice(0, itemsPerPage),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(users.length / itemsPerPage),
  );

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const batchOfUsers = users.slice(startIndex, startIndex + itemsPerPage);
    setDisplayUsers(batchOfUsers);
    const numPages = Math.ceil(users.length / itemsPerPage);
    setTotalPages(numPages);
  }, [itemsPerPage, currentPage]);

  function nextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <>
      <div>
        <h1>Data Table</h1>
        <table className="center">
          <thead>
            <tr>
              {[
                { label: "ID", key: "id" },
                { label: "Name", key: "name" },
                { label: "Age", key: "age" },
                { label: "Occupation", key: "occupation" },
              ].map(({ label, key }) => (
                <th key={key}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayUsers?.map(({ id, name, age, occupation }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{age}</td>
                <td>{occupation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pt-20">
        <select
          name="number-per-page"
          id="number-per-page-selection"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value, 10));
            setCurrentPage(1);
          }}
          className="mr-10"
        >
          <option value="5">show 5</option>
          <option value="10">show 10</option>
          <option value="20">show 20</option>
        </select>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <p className="inline mr-10">
          {" "}
          {currentPage} out of {totalPages} pages
        </p>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
}
