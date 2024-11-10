import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { FC, useState } from "react";

interface UpsertCustomerHomePageProps {
  onClose: Function;
}

const UpsertCustomerHomePage: FC<UpsertCustomerHomePageProps> = ({
  onClose,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleAddCustomer = async () => {
    try {
      const newCustomer = { name, email };
      const response = await axios.post(
        "http://localhost:8080/add-customer",
        newCustomer
      );
      console.log(response.data);
      setName("");
      setEmail("");
    } catch (err) {
      console.log("Error: ", err);
    }
    onClose();
  };

  return (
    <>
      <Dialog open onClose={() => onClose()}>
        <DialogTitle>{"Add a Customer"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{"Enter the Customer Details"}</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button onClick={() => handleAddCustomer()}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpsertCustomerHomePage;
