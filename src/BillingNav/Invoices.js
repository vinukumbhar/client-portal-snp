// import React,{useContext} from 'react';
// import { Box, Typography, Divider, Grid, styled } from '@mui/material';
// import { LoginContext } from '../Contextprovider/Context';
// import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';
// import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
// import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
// import { useState, useEffect } from 'react';
// import { useMemo } from 'react';
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

// import { useNavigate } from 'react-router-dom';
// ;

// const Invoices = () => {
//   const[accountId, setAccountId] = useState('')
//   const { logindata } = useContext(LoginContext);
//   const fetchAccountId = async () => {
//     const requestOptions = {
//       method: "GET",
//       redirect: "follow"
//     };

//     fetch(`http://127.0.0.1:7000/accounts/accountdetails/accountdetailslist/listbyuserid/${logindata.user.id}`, requestOptions)
//       .then((response) => response.json()

//     )
//       .then((result) => {
//         console.log(result)
//         setAccountId(result.accounts[0]._id)
//         console.log(result.accounts[0]._id)
//       })
//       .catch((error) => console.error(error));
//   };

//   console.log(accountId)

//   useEffect(() => {
//     fetchAccountId()
//   }, []);

//   const [BillingInvoice, setBillingInvoice] = useState([]);
//   const[InvoiceTempId,setInvoiceTempId]=useState( );

//   const INVOICE_API = process.env.REACT_APP_INVOICES_URL
//   // const fetchidwiseData = async (accountId) => {
//   //   try {
//   //     const url = `http://127.0.0.1:7650/workflow/invoices/invoice/invoicelistby/accountid/${accountId}`;
//   //     const response = await fetch(url);
//   //     if (!response.ok) {
//   //       throw new Error("Failed to fetch task templates");
//   //     }
//   //     const data = await response.json();
//   //     console.log(data)
//   //     setBillingInvoice(data.invoices);
//   //      console.log(data.invoices[0].summary.total)
//   //      setInvoiceTempId(data.invoices[0]._id)
//   //      console.log(data.invoices[0]._id)
//   //   } catch (error) {
//   //     console.error("Error fetching task templates:", error);
//   //   }
//   // };
//   const fetchidwiseData = async (accountId) => {
//     try {
//         const url = `${INVOICE_API}/workflow/invoices/invoice/invoicelistby/accountid/${accountId}`;
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error("Failed to fetch task templates");
//         }
//         const data = await response.json();

//         // Correct key to access invoices
//         console.log(data);
//         setBillingInvoice(data.invoice);

//         console.log(data.invoice[0]._id); // Accessing the first invoice's ID
//     } catch (error) {
//         console.error("Error fetching task templates:", error);
//     }
// };
//   const navigate = useNavigate();

//   const [selectedInvoice, SetSelectedInvoice] = useState({});

//   const handleEdit = (_id) => {
//     SetSelectedInvoice(_id);
//     console.log(_id)
//     navigate('/bill/' +_id);
//   };
// console.log(selectedInvoice)

//   useEffect(() => {
//     fetchidwiseData(accountId);
//   }, [accountId]);
//   const columns = useMemo(() => [
//     {
//       accessorKey: 'invoicenumber',
//       header: 'Invoice',
//       Cell: ({ row }) => (
//         <span
//           onClick={() => handleEdit(row.original._id)}
//           style={{ cursor: 'pointer', color:'#2c59fa',fontWeight:'bold' }}
//         >
//           {row.getValue('invoicenumber')}
//         </span>
//       )
//     },
//     {
//       accessorKey: 'summary.total',
//        header: 'Total',
//     },

//     {
//       accessorKey: 'Amount Paid',
//        header: 'Amount Paid',
//        Cell: () => '$0.00',
//     },

//     {
//       accessorKey: 'summary.total',
//        header: 'Balance Due',

//     },

//     {
//       accessorKey: 'description',
//        header: 'Discription',
//     },

//     {
//       accessorKey: 'createdAt',
//        header: 'Posted',
//        Cell: ({ cell }) => {
//         const date = new Date(cell.getValue());
//         return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//       },
//     },

//   ], []);
//   const table = useMaterialReactTable({
//     columns,
//     data: BillingInvoice,
//     enableBottomToolbar: true,
//     enableStickyHeader: true,
//     columnFilterDisplayMode: "custom", // Render own filtering UI
//     enableRowSelection: true, // Enable row selection
//     enablePagination: true,
//     muiTableContainerProps: { sx: { maxHeight: "400px" } },
//     initialState: {
//       columnPinning: { left: ["mrt-row-select", "tagName"], right: ['settings'], },
//     },
//     muiTableBodyCellProps: {
//       sx: (theme) => ({
//         backgroundColor: theme.palette.mode === "dark-theme" ? theme.palette.grey[900] : theme.palette.grey[50],
//       }),
//     },
//   });

//   return (
//     <Box>
//       <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }} className='cbilling-cards'>
//         <Grid item xs={12} sm={6} md={5} display="flex" justifyContent="center">
//           <Box sx={{ border: '2px dotted #94a3b8', width: '60%', minHeight: '148px', maxHeight: '148px' }} className='card1'>

//             <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
//               <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center' }}>
//                 <Box sx={{ position: 'relative', display: 'inline-block' }}>
//                   <PaymentsRoundedIcon sx={{ fontSize: '70px' }} />
//                   <MonetizationOnRoundedIcon sx={{ position: 'absolute', top: 0, left: 0, fontSize: '24px', backgroundColor: '#fff', borderRadius: '50%', color: '#24c875' }} />
//                 </Box>
//                 <Typography sx={{ color: '#697991' }} variant="h7">outstanding balance</Typography>
//               </Box>

//             </Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#1976d3" }}>
//               <Typography sx={{ fontSize: '30px' }} variant='h6'>$0.00</Typography>
//             </Box>

//           </Box>
//         </Grid>

//         <Grid item xs={12} sm={6} md={5} display="flex" justifyContent="center">
//           <Box sx={{ border: '2px dotted #94a3b8', width: '60%', minHeight: '148px', maxHeight: '148px' }} className='card1'>

//             <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
//               <Box sx={{ display: 'flex', gap: '10px', mt: 2, alignItems: 'center', justifyContent: 'center' }}>
//                 <Box sx={{ position: 'relative', display: 'inline-block' }}>
//                   <PaymentsRoundedIcon sx={{ fontSize: '70px' }} />
//                   <StarsRoundedIcon sx={{ position: 'absolute', top: 0, left: 0, fontSize: '24px', backgroundColor: '#fff', borderRadius: '50%', color: '#24c875' }} />
//                 </Box>
//                 <Typography sx={{ color: '#697991' }} variant="h7">Credits Available</Typography>
//               </Box>

//             </Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: "#24c875" }}>
//               <Typography sx={{ fontSize: '30px' }} variant='h6'>$0.00</Typography>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//       <Divider sx={{ mt: 2 }} />
//       <Box>

//         <MaterialReactTable columns={columns} table={table} />
//       </Box>
//     </Box>
//   )
// }

// export default Invoices

import React, { useContext } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  TextField,
  Autocomplete,
} from "@mui/material";
import { LoginContext } from "../Contextprovider/Context";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import { useState, useEffect } from "react";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const ACCOUNT_API = process.env.REACT_APP_ACCOUNTS_URL;
const Invoices = () => {
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");
  const { logindata } = useContext(LoginContext);
  const fetchAccountId = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${ACCOUNT_API}/accounts/accountdetails/accountdetailslist/listbyuserid/${logindata.user.id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setAccountId(result.accounts[0]._id);
        console.log(result.accounts[0].accountName);
        setAccountName(result.accounts[0].accountName);
      })
      .catch((error) => console.error(error));
  };

  console.log(accountId);

  useEffect(() => {
    fetchAccountId();
  }, []);

  const [BillingInvoice, setBillingInvoice] = useState([]);
  const [InvoiceTempId, setInvoiceTempId] = useState();
  const [selected, setSelected] = useState([]);
  const handleSelect = (_id) => {
    const currentIndex = selected.indexOf(_id);
    const newSelected =
      currentIndex === -1
        ? [...selected, _id]
        : selected.filter((item) => item !== _id);
    setSelected(newSelected);
    // Log all selected row IDs
    console.log("Selected IDs:", newSelected); // Log all selected IDs
  };
  const INVOICE_API = process.env.REACT_APP_INVOICES_URL;

  const fetchidwiseData = async (accountId) => {
    try {
      const url = `${INVOICE_API}/workflow/invoices/invoice/invoicelistby/accountid/${accountId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch task templates");
      }
      const data = await response.json();

      // Correct key to access invoices
      console.log("invoices",data);
      setBillingInvoice(data.invoice);

      // console.log(data.invoice[0]._id); // Accessing the first invoice's ID
    } catch (error) {
      console.error("Error fetching task templates:", error);
    }
  };
  const navigate = useNavigate();

  const [selectedInvoice, SetSelectedInvoice] = useState({});

  const handleEdit = (_id) => {
    SetSelectedInvoice(_id);
    console.log(_id);
    navigate("/bill/" + _id);
  };
  console.log(selectedInvoice);

  useEffect(() => {
    fetchidwiseData(accountId);
  }, [accountId]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "invoicenumber",
        header: "Invoice",
        Cell: ({ row }) => (
          <span
            onClick={() => handleEdit(row.original._id)}
            style={{ cursor: "pointer", color: "#2c59fa", fontWeight: "bold" }}
          >
            {row.getValue("invoicenumber")}
          </span>
        ),
      },
      {
        accessorKey: "summary.total",
        header: "Total",
      },

      {
        accessorKey: "Amount Paid",
        header: "Amount Paid",
        Cell: () => "$0.00",
      },

      {
        accessorKey: "summary.total",
        header: "Balance Due",
      },

      {
        accessorKey: "description",
        header: "Discription",
      },

      {
        accessorKey: "createdAt",
        header: "Posted",
        Cell: ({ cell }) => {
          const date = new Date(cell.getValue());
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        },
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data: BillingInvoice,
    enableBottomToolbar: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: "custom", // Render own filtering UI
    enableRowSelection: true, // Enable row selection
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: "400px" } },
    initialState: {
      columnPinning: {
        left: ["mrt-row-select", "tagName"],
        right: ["settings"],
      },
    },
    muiTableBodyCellProps: {
      sx: (theme) => ({
        backgroundColor:
          theme.palette.mode === "dark-theme"
            ? theme.palette.grey[900]
            : theme.palette.grey[50],
      }),
    },
  });
  const [openDialog, setOpenDialog] = useState(false);
  const handlePayInvoice = () => {
    setOpenDialog(true);
  };
  const accountHolderTypeOptions = [
    { label: "Individual", value: "individual" },
    { label: "Business", value: "business" },
  ];
  const accountTypeOptions = [
    { label: "Checking", value: "checking" },
    // { label: "Savings", value: "savings" },
  ];
  const [selectedAccountHolderType, setSelectedAccountHolderType] = useState(
    accountHolderTypeOptions[0]
  );
  const [selectedAccountType, setSelectedAccountType] = useState(
    accountTypeOptions[0]
  );
  const handleAccountHolderTypeChange = (event, newValue) => {
    setSelectedAccountHolderType(newValue);
    console.log("Selected rate type:", newValue);
  };
  const handleAccountTypeChange = (event, newValue) => {
    setSelectedAccountType(newValue);
  };

  // payment
  // const handleConfirmPayment = () => {
  //   const secretKey =
  //     "your screct key";
  //   const auth = btoa(`${secretKey}:`);

  //   axios
  //     .post(
  //       "https://api.affinipay.com/v1/charges",
  //       {
  //         amount: "100",
  //         account_id: "Use your ACH account ID", // Use your ACH account ID
  //         method: {
  //           type: "bank",
  //           routing_number: "000000013",
  //           account_number: "1100000005",
  //           account_type: "CHECKING",
  //           given_name: "Amy",
  //           bank_name: "BANK OF TESTING",
  //           surname: "Customer",
  //         },
  //       },
  //       {
  //         headers: {
  //           Authorization: `Basic ${auth}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("✅ eCheck Charge Success:", res.data);
  //     })
  //     .catch((err) => {
  //       console.error(
  //         "❌ eCheck Charge Failed:",
  //         err.response?.data || err.message
  //       );
  //     });
  // };

  const [routingNumber,setRoutingNumber]=useState("000000013")
  const [accountNumber,setAccountNumber]=useState("1100000005")
  const [firstName,setFirstName]= useState("")
  const[lastName,setLastName]=useState("")
  const[companyName,setCompanyName]=useState("")
  // const [bankName,setBankName]=useState("")
  const totalAmount = BillingInvoice.filter((invoice) =>
    selected.includes(invoice._id)
  ).reduce((sum, row) => sum + row.summary.total, 0).toFixed(2);
  // console.log(totalAmount)
  const handleConfirmPayment = async () => {
    let method;
  
    if (selectedAccountHolderType?.value === "business") {
      method = {
        type: "bank",
        routing_number: routingNumber,
        account_number: accountNumber,
        account_type:  "CHECKING",
        name: companyName,
        // bank_name: bankName,
        account_holder_type: "business",
      };
    } else if (selectedAccountHolderType?.value === "individual") {
      method = {
        type: "bank",
        routing_number: routingNumber,
        account_number: accountNumber,
        account_type: "CHECKING",
        given_name: firstName,
        surname: lastName,
        // bank_name: bankName,
      };
    }
  
    const chargeData = {
      amount: totalAmount*100, // Or calculate based on selected invoices
      account_id: "3A7Sk7IGQ6eu3I5aVRh5hA", // Replace with real ACH account ID
      method: method,
    };
  
    const secretKey = 'nKvexjXcQ2-xo3DmtPaSHgj2cG3zaej5jrsH16S01UfX1Gh75kx6q9D7GggOjATb';
    const auth = btoa(`${secretKey}:`);

  
    try {
      const response = await axios.post(
        "https://api.affinipay.com/v1/charges",
        chargeData,
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Payment success:", response.data);
      console.log("paid amount",response.data.amount)
      // const selectedInvoices = BillingInvoice.filter(invoice => 
      //   selected.includes(invoice._id)
      // );
      
      // selectedInvoices.forEach(invoice => {
      //   console.log(`Invoice ${invoice.invoicenumber} paid amount: $${invoice.summary.total}`);
      // });
      // alert("Payment successful!");
      // setOpenDialog(false);
          // 2. Update each selected invoice
    const updatePromises = selected.map(invoiceId => {
      console.log("invoice id",invoiceId)
      const invoice = BillingInvoice.find(inv => inv._id === invoiceId);
      if (!invoice) return Promise.resolve();
      
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      // Calculate new paid amount (existing + current payment)
      const newPaidAmount = (invoice.paidAmount || 0) + invoice.summary.total;
      
      const raw = JSON.stringify({
        paidAmount: newPaidAmount,
        invoiceStatus: "Paid",
        active: "true"
      });

      const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const url = `${INVOICE_API}/workflow/invoices/invoice/${invoice._id}`;
      return fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(`Invoice ${invoice._id} updated:`, result);
          return result;
        });
    });

    // Wait for all invoice updates to complete
    const results = await Promise.all(updatePromises);
    
    // Check if all updates were successful
    const allSuccess = results.every(result => 
      result && result.message === "Invoice Updated successfully"
    );

    if (allSuccess) {
      toast.success("Payment successful and all invoices updated!");
      
      // Log each selected invoice's details
      const selectedInvoices = BillingInvoice.filter(invoice => 
        selected.includes(invoice._id)
      );
      
      selectedInvoices.forEach(invoice => {
        console.log(`Invoice ${invoice.invoicenumber} - Paid: $${invoice.summary.total}, Status: Paid`);
      });
      
      setOpenDialog(false);
      
      // Refresh invoice data if needed
      // fetchInvoices();
    } else {
      toast.error("Payment succeeded but some invoices failed to update");
    }

    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      alert("Payment failed!");
    }
  };
  
 

  
  return (
    <Box>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
        className="cbilling-cards"
      >
        <Grid item xs={12} sm={6} md={5} display="flex" justifyContent="center">
          <Box
            sx={{
              border: "2px dotted #94a3b8",
              width: "60%",
              minHeight: "148px",
              maxHeight: "148px",
            }}
            className="card1"
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                mt: 2,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  mt: 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <PaymentsRoundedIcon sx={{ fontSize: "70px" }} />
                  <MonetizationOnRoundedIcon
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      fontSize: "24px",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                      color: "#24c875",
                    }}
                  />
                </Box>
                <Typography sx={{ color: "#697991" }} variant="h7">
                  outstanding balance
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1976d3",
              }}
            >
              <Typography sx={{ fontSize: "30px" }} variant="h6">
                $0.00
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={5} display="flex" justifyContent="center">
          <Box
            sx={{
              border: "2px dotted #94a3b8",
              width: "60%",
              minHeight: "148px",
              maxHeight: "148px",
            }}
            className="card1"
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                mt: 2,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  mt: 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <PaymentsRoundedIcon sx={{ fontSize: "70px" }} />
                  <StarsRoundedIcon
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      fontSize: "24px",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                      color: "#24c875",
                    }}
                  />
                </Box>
                <Typography sx={{ color: "#697991" }} variant="h7">
                  Credits Available
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#24c875",
              }}
            >
              <Typography sx={{ fontSize: "30px" }} variant="h6">
                $0.00
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
      {/* <Box>

        <MaterialReactTable columns={columns} table={table} />
      </Box> */}

      <Box>
        <TableContainer component={Paper} sx={{ overflow: "visible" }}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  padding="checkbox"
                  style={{
                    position: "sticky",
                    left: 0,
                    zIndex: 1,
                    background: "#fff",
                    fontSize: "2px", // Set a professional font size
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  <Checkbox
                    checked={selected.length === BillingInvoice.length}
                    onChange={() => {
                      if (selected.length === BillingInvoice.length) {
                        setSelected([]);
                      } else {
                        const allSelected = BillingInvoice.map(
                          (item) => item._id
                        );
                        setSelected(allSelected);
                      }
                    }}
                  />
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "16px",
                  }}
                  width="100"
                >
                  Invoice #
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "16px",
                  }}
                  width="100"
                >
                  Status
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "16px",
                  }}
                  width="100"
                >
                  Posted
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "16px",
                  }}
                  width="100"
                >
                  Total
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "16px",
                  }}
                  width="100"
                >
                  Amount Paid
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "16px",
                  }}
                  width="100"
                >
                  Balance due
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "16px",
                  }}
                  width="100"
                >
                  Last Paid
                </TableCell>
                <TableCell
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "16px",
                  }}
                  width="250"
                >
                  Description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {BillingInvoice.map((row) => {
               
                const isSelected = selected.indexOf(row._id) !== -1;
                return (
                  <TableRow
                    key={row._id}
                    hover
                    onClick={() => handleSelect(row._id)}
                    role="checkbox"
                    tabIndex={-1}
                    selected={isSelected}
                    style={{
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#f4f4f4", // Add hover effect
                      },
                    }}
                  >
                    <TableCell
                      padding="checkbox"
                      style={{
                        position: "sticky",
                        left: 0,
                        zIndex: 1,
                        background: "#fff",
                        fontSize: "12px",
                        textAlign: "center",
                        padding: "4px 8px",
                        lineHeight: "1",
                        // padding: "2px", // Adjust padding for better spacing
                      }}
                    >
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "12px",
                        padding: "4px 8px",
                        lineHeight: "1",
                        cursor: "pointer",
                        color: "#3f51b5",
                      }}
                      onClick={() => handleEdit(row._id)}
                    >
                      {/* <Typography sx={{ cursor: "pointer",
                      color: "#3f51b5", }} > */}
                      {row.invoicenumber}
                      {/* </Typography> */}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "12px",
                        padding: "4px 8px",
                        lineHeight: "1",
                        cursor: "pointer",
                      }}
                    >
                      {row.invoiceStatus}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "12px",
                        padding: "4px 8px",
                        lineHeight: "1",
                        cursor: "pointer",
                      }}
                    >
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }).format(new Date(row.createdAt))}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "12px",
                        padding: "4px 8px",
                        lineHeight: "1",
                        cursor: "pointer",
                      }}
                    >
                      ${row.summary.total}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "12px",
                        padding: "4px 8px",
                        lineHeight: "1",
                        cursor: "pointer",
                      }}
                    >
                     ${row.paidAmount || 0}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "12px",
                        padding: "4px 8px",
                        lineHeight: "1",
                        cursor: "pointer",
                      }}
                    >
                     ${row.summary.total - row.paidAmount}
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: "12px",
                        padding: "4px 8px",
                        lineHeight: "1",
                        cursor: "pointer",
                      }}
                    >
                      {" "}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box mt={3} mb={2}>
        {selected.length > 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handlePayInvoice}
            sx={{ mb: 2 }}
          >
            Pay Invoice
          </Button>
        )}
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullScreen>
        <DialogTitle>Paying Invoices</DialogTitle>

        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <InputLabel sx={{ fontWeight: "bold", mb: 0.5 }}>Client</InputLabel>
            <Typography variant="subtitle1">{accountName}</Typography>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice #</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {BillingInvoice.filter((invoice) =>
                selected.includes(invoice._id)
              ).map((row) => (
                <TableRow key={row._id}>
                  <TableCell>{row.invoicenumber}</TableCell>
                  <TableCell>{row.invoiceStatus}</TableCell>

                  <TableCell>${row.summary.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ mt: 3, textAlign: "left", pr: 2 }}>
            <strong>Total Amount:</strong> $
            {BillingInvoice.filter((invoice) => selected.includes(invoice._id))
              .reduce((sum, row) => sum + row.summary.total, 0)
              .toFixed(2)}
          </Box>
          <Divider sx={{ my: 3 }} />
          <Box sx={{ mt: 2 }}>
            <Typography variant="h5">Payment Details</Typography>
            <Box sx={{ mt: 2 }}>
              <Box>
                <InputLabel sx={{ color: "black" }}> Routing Number</InputLabel>
                <TextField
                  placeholder="Routing Number"
                  fullWidth
                  value={routingNumber}
                  // onChange={(e) => setRoutingNumber(e.target.value)}
                  size="small"
                  margin="normal"
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box width="50%">
                  <Typography sx={{ color: "black" }}>
                    Bank Account Number
                  </Typography>
                  <TextField
                    fullWidth
                    name="Bank Account Number"
                    placeholder="Bank Account Number"
                    size="small"
                    sx={{ mt: 1 }}
                    value={accountNumber}
                    // onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </Box>

                <Box width="50%">
                  <Typography sx={{ color: "black" }}>
                    Account Holder Type
                  </Typography>
                  <Autocomplete
                    size="small"
                    fullWidth
                    sx={{ mt: 1 }}
                    options={accountHolderTypeOptions}
                    getOptionLabel={(option) => option?.label || ""}
                    value={selectedAccountHolderType}
                    onChange={handleAccountHolderTypeChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Account Holder Type"
                      />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.value === value.value
                    }
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        {...props}
                        sx={{
                          margin: "4px",
                          cursor: "pointer",
                        }}
                      >
                        <Typography>{option.label}</Typography>
                      </Box>
                    )}
                  />
                </Box>
              </Box>

              {selectedAccountHolderType?.value === "individual" && (
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}
                >
                  <Box width="50%">
                    <Typography sx={{ color: "black" }}>First Name</Typography>
                    <TextField
                      fullWidth
                      name="First Name"
                      placeholder="First Name"
                      size="small"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      sx={{ mt: 1 }}
                    />
                  </Box>

                  <Box width="50%">
                    <Typography sx={{ color: "black" }}>Last Name</Typography>
                    <TextField
                      fullWidth
                      name="Last Name"
                      placeholder="Last Name"
                      size="small"

                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Box>
              )}

              {selectedAccountHolderType?.value === "business" && (
                <Box sx={{ mt: 2 }}>
                  <Box>
                    <Typography sx={{ color: "black" }}>
                      Company Name
                    </Typography>
                    <TextField
                      fullWidth
                      name="Company Name"
                      placeholder="Company Name"
                      size="small"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Box>
              )}

              <Box mt={2}>
                <Typography sx={{ color: "black" }}>Account Type</Typography>
                <Autocomplete
                  size="small"
                  fullWidth
                  sx={{ mt: 1 }}
                  options={accountTypeOptions}
                  getOptionLabel={(option) => option?.label || ""}
                  value={selectedAccountType}
                  onChange={handleAccountTypeChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Account Type"
                    />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      {...props}
                      sx={{
                        margin: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <Typography>{option.label}</Typography>
                    </Box>
                  )}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
          <Button variant="outlined" onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmPayment}
          >
            Confirm Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Invoices;
