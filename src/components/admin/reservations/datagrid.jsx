import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function DataGridDemo() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colRef = collection(db, "bookings");
        const snapshot = await getDocs(colRef);
        const bookingList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(bookingList);
      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };
    fetchData();
  }, []);

  const confirmBooking = async (bookingId) => {
    try {
      const bookingDoc = doc(db, "bookings", bookingId);
      await updateDoc(bookingDoc, { status: "Confirmed" });
      alert("Booking confirmed!");
    } catch (error) {
      console.error("Error confirming booking:", error);
    }
  };

  const deleteBooking = async (bookingId) => {
    try {
      const bookingDoc = doc(db, "bookings", bookingId);
      await deleteDoc(bookingDoc);
      alert("Booking deleted!");

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "roomTitle",
      headerName: "Room Name",
      width: 350,
      editable: true,
    },
    {
      field: "checkinDate",
      headerName: "Checking Date",
      width: 150,
      editable: true,
    },
    {
      field: "checkoutDate",
      headerName: "Checkout Date",
      width: 150,
      editable: true,
    },
    {
      field: "guestCount",
      headerName: "Guest Count",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 160,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => confirmBooking(params.row.id)}
            style={{ marginRight: "10px" }}
          >
            Confirm
          </Button>
  
          <Button
            variant="contained"
            color="secondary"
            onClick={() => deleteBooking(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={bookings}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        // pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
