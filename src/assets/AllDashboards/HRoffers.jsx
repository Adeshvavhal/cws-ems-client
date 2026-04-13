import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const HROffers = () => {
  // 🔥 Dummy Offers Data
  const [offers, setOffers] = useState([
    {
      id: 1,
      candidateName: "Rahul Sharma",
      jobTitle: "Frontend Developer",
      salary: "6 LPA",
      status: "Sent",
      date: "2026-04-05",
    },
    {
      id: 2,
      candidateName: "Sneha Patil",
      jobTitle: "HR Executive",
      salary: "4 LPA",
      status: "Accepted",
      date: "2026-04-02",
    },
    {
      id: 3,
      candidateName: "Amit Verma",
      jobTitle: "Backend Developer",
      salary: "8 LPA",
      status: "Pending",
      date: "2026-04-08",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  


  // ===== FILTER STATES =====
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [selectedOffer, setSelectedOffer] = useState(null);

  // ===== PAGINATION STATES =====
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [newOffer, setNewOffer] = useState({
    candidateName: "",
    jobTitle: "",
    salary: "",
    status: "Pending",
    date: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
  search: "",
  dateFrom: "",
  dateTo: "",
  status: "All",
});
const handleFilter = (e) => {
  e.preventDefault();

  setAppliedFilters({
    search,
    dateFrom: dateFromFilter,
    dateTo: dateToFilter,
    status: statusFilter,
  });

  setCurrentPage(1);
};
  // ➕ Add Offer
  const handleAddOffer = () => {
    setOffers([
      ...offers,
      { ...newOffer, id: Date.now() }
    ]);
    setShowModal(false);
    setNewOffer({
      candidateName: "",
      jobTitle: "",
      salary: "",
      status: "Pending",
      date: "",
    });
  };

  // ❌ Delete
  const handleDelete = (id) => {
    setOffers(offers.filter((o) => o.id !== id));
  };
/* ---------------- FILTER HANDLERS ---------------- */
  // const applyFilters = () => {
  //   let filtered = [...allInterviews];

  //   if (statusFilter !== "All") {
  //     filtered = filtered.filter(
  //       (item) =>
  //         item.status?.toLowerCase().trim() ===
  //         statusFilter.toLowerCase().trim(),
  //     );
  //   }
  //   if (dateFromFilter)
  //     filtered = filtered.filter(
  //       (item) => new Date(item.date) >= new Date(dateFromFilter),
  //     );
  //   if (dateToFilter)
  //     filtered = filtered.filter(
  //       (item) => new Date(item.date) <= new Date(dateToFilter),
  //     );

  //   setInterviews(filtered);
  //   setCurrentPage(1);
  // };

  // const resetFilters = () => {
  //   setStatusFilter("All");
  //   setDateFromFilter("");
  //   setDateToFilter("");
  //   setInterviews(allInterviews);
  //   setCurrentPage(1);
  // };

  /* ---------------- PAGINATION ---------------- */
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentInterviews = interviews.slice(indexOfFirstItem, indexOfLastItem);
  // const totalPages = Math.ceil(interviews.length / itemsPerPage);
/* ---------------- FILTER ---------------- */
const filteredOffers = offers.filter((offer) => {
  const matchesSearch =
    offer.candidateName
      .toLowerCase()
      .includes(appliedFilters.search.toLowerCase()) ||
    offer.jobTitle
      .toLowerCase()
      .includes(appliedFilters.search.toLowerCase());

  const matchesStatus =
    appliedFilters.status === "All" ||
    offer.status === appliedFilters.status;

  const matchesFromDate =
    !appliedFilters.dateFrom ||
    new Date(offer.date) >= new Date(appliedFilters.dateFrom);

  const matchesToDate =
    !appliedFilters.dateTo ||
    new Date(offer.date) <= new Date(appliedFilters.dateTo);

  return (
    matchesSearch &&
    matchesStatus &&
    matchesFromDate &&
    matchesToDate
  );
});

/* ---------------- PAGINATION ---------------- */
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const currentOffers = filteredOffers.slice(
  indexOfFirstItem,
  indexOfLastItem
);

const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
const resetFilters = () => {
  setSearch("");
  setStatusFilter("All");
  setDateFromFilter("");
  setDateToFilter("");

  setAppliedFilters({
    search: "",
    dateFrom: "",
    dateTo: "",
    status: "All",
  });

  setCurrentPage(1);
};
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  return (
    <div className="container-fluid px-3 mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
     <h4 className="mb-3 fw-semibold" style={{ color: "#3A5FBE" }}>
        Offers 
      </h4>

        <button
          className="btn btn-sm custom-outline-btn"
          onClick={() => setShowModal(true)}
        >
          + Send Offer
        </button>
      </div>

      
     <div className="card mb-4 shadow-sm border-0">
        <div className="card-body">
           <form
            className="row g-2 align-items-center"
            onSubmit={handleFilter}
          
            style={{ justifyContent: "space-between" }}
          >
  <div className="col-12 col-md-auto d-flex align-items-center gap-2 mb-1">
              <label
                htmlFor="searchInput"
                className="fw-bold mb-0"
                style={{
                  fontSize: "16px",
                  color: "#3A5FBE",

                  marginRight: "0px",
                }}
              >
                Search
              </label>
              <input
                id="searchInput"
                type="text"
                className="form-control"
                 value={search}
                placeholder="Search by any field....."
               onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-auto d-flex align-items-center mb-1 ">
              <label
                htmlFor="assignDateFromFilter"
                className="fw-bold mb-0 text-start text-md-end"
                style={{
                  fontSize: "16px",
                  color: "#3A5FBE",
                  width: "50px",
                  minWidth: "50px",
                  marginRight: "8px",
                }}
              >
                Date
              </label>
              <input
                type="date"
                id="assignDateFromFilter"
                // value={assignDateFromFilter}
              onChange={(e) => setDateFromFilter(e.target.value)}
                placeholder="dd-mm-yyyy"
                className="form-control"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>

            <div className="col-auto ms-auto d-flex gap-2">
              <button
                type="submit"
                style={{ minWidth: 90 }}
                className="btn btn-sm custom-outline-btn"
                    
              >
                Filter
              </button>
              <button
                type="button"
                style={{ minWidth: 90 }}
                className="btn btn-sm custom-outline-btn"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>
            </form>
             </div>
          
     
      </div>

      {/* 📋 Table */}
     <div className="card shadow-sm border-0">
        <div className="table-responsive bg-white">
         <table
       
              className="table table-hover mb-0"
              style={{ borderCollapse: "collapse" }}
            >
         
           <thead style={{ backgroundColor: "#f8f9fa" }}>
              <tr >
                   <th
                    style={{
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "#6c757d",
                      borderBottom: "2px solid #dee2e6",
                      padding: "10px",
                      whiteSpace: "nowrap",
                    }}
                  >Candidate</th>

                <th  style={{
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "#6c757d",
                      borderBottom: "2px solid #dee2e6",
                      padding: "10px",
                      whiteSpace: "nowrap",
                    }}>Job Role</th>

                <th style={{
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "#6c757d",
                      borderBottom: "2px solid #dee2e6",
                      padding: "10px",
                      whiteSpace: "nowrap",
                    }}>Salary</th>

                <th style={{
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "#6c757d",
                      borderBottom: "2px solid #dee2e6",
                      padding: "10px",
                      whiteSpace: "nowrap",
                    }}>Status</th>


                <th style={{
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "#6c757d",
                      borderBottom: "2px solid #dee2e6",
                      padding: "10px",
                      whiteSpace: "nowrap",
                    }}>Date</th>


                <th style={{
                      fontWeight: "500",
                      fontSize: "14px",
                      color: "#6c757d",
                      borderBottom: "2px solid #dee2e6",
                      padding: "10px",
                      whiteSpace: "nowrap",
                    }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOffers.length > 0 ? (
           currentOffers.map((offer) => (
                  <tr
  key={offer.id}
  style={{ cursor: "pointer" }}
  onClick={() => setSelectedOffer(offer)}
>
                    <td
                      style={{
                              padding: "12px",
                              verticalAlign: "middle",
                              fontSize: "14px",
                              borderBottom: "1px solid #dee2e6",
                              whiteSpace: "nowrap",
                            }}>
                        {offer.candidateName}
                        </td>

                    <td  style={{
                              padding: "12px",
                              verticalAlign: "middle",
                              fontSize: "14px",
                              borderBottom: "1px solid #dee2e6",
                              whiteSpace: "nowrap",
                            }}>
                                {offer.jobTitle}
                                </td>

                    <td  style={{
                              padding: "12px",
                              verticalAlign: "middle",
                              fontSize: "14px",
                              borderBottom: "1px solid #dee2e6",
                              whiteSpace: "nowrap",
                            }}>
                                {offer.salary}
                                </td>
                    <td>
  {offer.status === "Viewed" || offer.status === "Accepted" ? (
    <span
      style={{
        backgroundColor: "#d1f2dd", // SAME green
        padding: "6px 12px",
        borderRadius: "4px",
        fontSize: "13px",
        fontWeight: "500",
        display: "inline-block",
        width: "100px",
        textAlign: "center",
      }}
    >
      Viewed
    </span>
  ) : (
    <span
      style={{
        backgroundColor: "#fff3cd", // SAME yellow
        padding: "6px 12px",
        borderRadius: "4px",
        fontSize: "13px",
        fontWeight: "500",
        display: "inline-block",
        width: "100px",
        textAlign: "center",
      }}
    >
      Pending
    </span>
  )}
</td>
                    <td  style={{
                              padding: "12px",
                              verticalAlign: "middle",
                              fontSize: "14px",
                              borderBottom: "1px solid #dee2e6",
                              whiteSpace: "nowrap",
                            }}>
                                {offer.date}
                                </td>
                    <td>
                      <button
                         className="btn btn-sm btn-outline-danger"
                        onClick={(e) => {
    e.stopPropagation();
    handleDelete(offer.id);
  }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Offers Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
        </div>
      </div>
      <div
  className="d-flex align-items-center justify-content-end mt-3"
  style={{ fontSize: "14px", color: "#6c757d", gap: "20px" }}
>

  {/* Rows per page */}
  <div className="d-flex align-items-center gap-2">
    <span>Rows per page:</span>
    <select
      className="form-select form-select-sm"
      style={{ width: "70px", cursor: "pointer" }}
      value={itemsPerPage}
      onChange={(e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
      }}
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={25}>25</option>
    </select>
  </div>

  {/* Range */}
  <span>
    {filteredOffers.length === 0
      ? "0-0 of 0"
      : `${indexOfFirstItem + 1}-${Math.min(
          indexOfLastItem,
          filteredOffers.length
        )} of ${filteredOffers.length}`}
  </span>

  {/* Arrows */}
  <div className="d-flex align-items-center gap-1">
    <button
      className="btn btn-sm"
      style={{
        border: "1px solid #ccc",
        padding: "2px 8px",
      }}
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      ‹
    </button>

    <button
      className="btn btn-sm"
      style={{
        border: "1px solid #ccc",
        padding: "2px 8px",
      }}
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      ›
    </button>
  </div>

</div>

      {/* 🧾 Modal */}
     {showModal && (
  <div
    className="modal fade show"
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1050,
    }}
  >
    <div
      className="modal-dialog modal-dialog-centered"
      style={{ width: "600px" }}
    >
      <div className="modal-content">

        {/* Header */}
        <div
          className="modal-header text-white"
          style={{ backgroundColor: "#3A5FBE" }}
        >
          <h5 className="mb-0">Send Offer</h5>
          <button
            className="btn-close btn-close-white"
            onClick={() => setShowModal(false)}
          />
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="container-fluid">

            {/* Candidate */}
            <div className="row align-items-center mb-3">
              <div className="col-4 fw-semibold">Candidate</div>
              <div className="col-8">
                <input
                  className="form-control"
                  placeholder="Enter name"
                  value={newOffer.candidateName}
                  onChange={(e) =>
                    setNewOffer({
                      ...newOffer,
                      candidateName: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Job Role */}
            <div className="row align-items-center mb-3">
              <div className="col-4 fw-semibold">Job Role</div>
              <div className="col-8">
                <input
                  className="form-control"
                  placeholder="Enter role"
                  value={newOffer.jobTitle}
                  onChange={(e) =>
                    setNewOffer({
                      ...newOffer,
                      jobTitle: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Salary */}
            <div className="row align-items-center mb-3">
              <div className="col-4 fw-semibold">Salary</div>
              <div className="col-8">
                <input
                  className="form-control"
                  placeholder="Enter salary"
                  value={newOffer.salary}
                  onChange={(e) =>
                    setNewOffer({
                      ...newOffer,
                      salary: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Date */}
            <div className="row align-items-center mb-2">
              <div className="col-4 fw-semibold">Date</div>
              <div className="col-8">
                <input
                  type="date"
                  className="form-control"
                  value={newOffer.date}
                  onChange={(e) =>
                    setNewOffer({
                      ...newOffer,
                      date: e.target.value,
                    })
                  }
                />
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="btn btn-sm custom-outline-btn"
            style={{ minWidth: 90 }}
            onClick={handleAddOffer}
          >
            Send
          </button>

          <button
            className="btn btn-sm custom-outline-btn"
            style={{ minWidth: 90 }}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  </div>
)}

      {selectedOffer && (
  <div
    className="modal fade show"
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1050,
    }}
  >
    <div
      className="modal-dialog modal-dialog-centered"
      style={{ width: "600px" }}
    >
      <div className="modal-content">
        
        {/* Header */}
        <div
          className="modal-header text-white"
          style={{ backgroundColor: "#3A5FBE" }}
        >
          <h5 className="mb-0">Offer Details</h5>
          <button
            className="btn-close btn-close-white"
            onClick={() => setSelectedOffer(null)}
          />
        </div>

        {/* Body */}
      <div className="modal-body">
  <div className="container-fluid">

    <div className="row mb-2">
      <div className="col-4 fw-semibold">Candidate</div>
      <div className="col-8">{selectedOffer.candidateName}</div>
    </div>

    <div className="row mb-2">
      <div className="col-4 fw-semibold">Job Role</div>
      <div className="col-8">{selectedOffer.jobTitle}</div>
    </div>

    <div className="row mb-2">
      <div className="col-4 fw-semibold">Salary</div>
      <div className="col-8">{selectedOffer.salary}</div>
    </div>

    <div className="row mb-2">
      <div className="col-4 fw-semibold">Status</div>
      <div className="col-8">{selectedOffer.status}</div>
    </div>

    <div className="row mb-2">
      <div className="col-4 fw-semibold">Date</div>
      <div className="col-8">{selectedOffer.date}</div>
    </div>

  </div>
</div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="btn btn-sm custom-outline-btn"
             style={{minWidth:90}}
            onClick={() => setSelectedOffer(null)}
          >
            Close
          </button>
        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default HROffers;