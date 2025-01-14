import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Customer } from "./Config";
import UpsertCustomerHomePage from "./UpsertCustomerHomePage";

export default function HomePage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [openPopup, setOpenPopup] = useState(false);

  const onClosePopup = () => {
    setOpenPopup(false);
    fetchCustomers();
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/customers");
      setCustomers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (customer: Customer) => {
    try {
      await axios.delete("http://localhost:8080/delete-customer", {
        data: customer,
      });
      fetchCustomers();
    } catch (err) {
      console.error("Error deleting customer:", err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      <Grid
        container
        sx={{
          padding: 1,
          display: "grid",
          gridTemplateColumns: "10fr 2fr",
          alignItems: "center",
        }}
      >
        <Grid item textAlign={"center"}>
          <h2>Restaurant Customers</h2>
        </Grid>
        <Grid item sx={{ justifySelf: "end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenPopup(true)}
          >
            Add Customer
          </Button>
        </Grid>
      </Grid>

      <Grid container sx={{ padding: 1 }}>
        <Grid item xs={12}>
          <TableContainer component={Paper} style={{ width: "100%" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Customer Name</TableCell>
                  <TableCell align="right">Customer Email</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {customer.id}
                    </TableCell>
                    <TableCell align="right">{customer.name}</TableCell>
                    <TableCell align="right">{customer.email}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDelete(customer)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {openPopup && <UpsertCustomerHomePage onClose={onClosePopup} />}
    </>
  );
}
