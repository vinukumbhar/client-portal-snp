
import React from 'react';
import { Box, Typography, Divider, Container, InputLabel, TextField, Button } from '@mui/material';
import logo from '../Imgs/snplogo.png';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Bill = () => {
    const { _id } = useParams();
    const options = ['Individual', 'Business'];
    const [value, setValue] = React.useState(options[1]);
    const [inputValue, setInputValue] = React.useState('');
    const AccountOptions = ['Checking', 'Savings'];
    const [valueAccount, setValueAccount] = React.useState(AccountOptions[1]);
    const [inputAccountValue, setInputAccountValue] = React.useState('');
    const [invoicenumber, setInvoiceNumber] = useState()
    const [accountName, setAccountName] = useState()
    const [discription, setDiscription] = useState()
    const [postedDate, setPostedDate] = useState()
const INVOICE_API = process.env.REACT_APP_INVOICES_URL
    console.log(_id)

    const fetchData = async (_id) => {
        try {
            const url = `${INVOICE_API}/workflow/invoices/invoice/invoicelist/invoicelistbyid/${_id}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch task templates");
            }
            const data = await response.json();
            console.log(data)
            setInvoiceNumber(data.invoice.invoicenumber)
            console.log(data.invoice.invoicenumber)
            setAccountName(data.invoice.account.accountName)
            console.log(data.invoice.account.accountName)
            setDiscription(data.invoice.description)
            console.log(data.invoice.description)
            // setPostedDate(data.invoice.updatedAt)
            // console.log(data.invoice.updatedAt)
            // Format the date
            const postedDate = new Date(data.invoice.updatedAt);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            const formattedDate = postedDate.toLocaleDateString('en-US', options);

            setPostedDate(formattedDate); // Set the formatted date
            console.log(formattedDate);

        } catch (error) {
            console.error("Error fetching task templates:", error);
        }
    };
    useEffect(() => {
        fetchData(_id);
    }, [_id]);

    const navigate = useNavigate();
    const handleCancel = () => {
          navigate('/billing/invoices');
      };
  
    return (
        <Container >
            <Box sx={{ overflowY: 'auto', height: '90vh' }}>
                <Box sx={{ height: '15vh' }}>
                    <Box display={'flex'}>
                        <Box>
                            <img style={{ width: "110px", display: "block" }} src={logo} alt="" />
                        </Box>
                        <Box>
                            <Typography mt={2}><strong>SNP Tax & Financials</strong></Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider />


                <Box>
                    <Box display={'flex'} alignItems={'center'} gap={2} padding={2} borderBottom={'1px solid #e2e8f0'} margin={5}>
                        <Typography><strong>Invoice # {invoicenumber}</strong></Typography>
                        <Chip sx={{ backgroundColor: '#000', color: '#FFF', height: 1 }} label="Overdue" />
                    </Box>
                </Box>

                <Box>
                    <Box sx={{ color: "#24c875", mt: -5, ml: 4 }}>
                        <Typography sx={{ fontSize: '50px' }} variant='h6'>$1.00</Typography>
                    </Box>

                    <Box display={'flex'} alignItems={'center'} gap={25} ml={4}>
                        <Box display="flex" flexDirection="column">
                            <Typography fontSize={13} color='#475569'>Date posted</Typography>
                            <Typography fontSize={15} >{postedDate}</Typography>
                        </Box>

                        <Box display="flex" flexDirection="column">
                            <Typography fontSize={13} color='#475569'>Client</Typography>
                            <Typography fontSize={15}>[TEST] {accountName}</Typography>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="column" ml={4} mt={2}>
                        <Typography fontSize={13} color='#475569'>Description</Typography>
                        <Typography fontSize={15}>{discription}</Typography>
                    </Box>

                </Box>

                <Box>
                    <Box mt={4} ml={4}>
                        <strong>Invoice details</strong>
                    </Box>

                    <Box>
                        <Box ml={4}>
                            <InputLabel sx={{ color: 'black', mt: 2 }}>Amount to pay</InputLabel>
                            <TextField
                                fullWidth
                                name="Amount to pay"
                                placeholder="Amount to pay"
                                size="small"
                                sx={{ mt: 1, width: '30%' }}
                            />
                        </Box>

                        <Box ml={4}>
                            <InputLabel sx={{ color: 'black', mt: 2 }}>Routing number</InputLabel>
                            <TextField
                                fullWidth
                                name="Routing number"
                                size="small"
                                sx={{ mt: 1, width: '97%' }}
                            />
                        </Box>

                        <Box display="flex" >

                            <Box ml={4} flex={1}>
                                <InputLabel sx={{ color: 'black', mt: 2 }}>Bank account number</InputLabel>
                                <TextField
                                    fullWidth
                                    name="Routing number"
                                    size="small"
                                    sx={{ mt: 1, }}
                                />
                            </Box>

                            <Box ml={4} flex={1}>
                                <InputLabel sx={{ color: 'black', mt: 2 }}>Account Holder Type</InputLabel>
                                <Autocomplete
                                    value={value}
                                    size="small"
                                    //  fullWidth
                                    onChange={(event, newValue) => setValue(newValue)}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                                    id="controllable-states-demo"
                                    options={options}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth />
                                    )}
                                    sx={{ mt: 1, }}
                                />
                            </Box>

                        </Box>

                        <Box ml={4}>
                            <InputLabel sx={{ color: 'black', mt: 2 }}>Name</InputLabel>
                            <TextField
                                fullWidth
                                name="Name"
                                placeholder='Name'
                                size="small"
                                sx={{ mt: 1, width: '97%' }}
                            />
                        </Box>

                        <Box ml={4} flex={1}>
                            <InputLabel sx={{ color: 'black', mt: 2 }}>Account Type</InputLabel>
                            <Autocomplete
                                value={valueAccount}
                                size="small"
                                onChange={(event, newValue) => setValueAccount(newValue)}
                                inputValue={inputAccountValue}
                                onInputChange={(event, newInputValue) => setInputAccountValue(newInputValue)}
                                id="controllable-states-demo"
                                options={AccountOptions}
                                renderInput={(params) => (
                                    <TextField {...params} fullWidth />
                                )}
                                sx={{ mt: 1, width: '97%' }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ backgroundColor: '#d9eafc', mt: 4, ml: 4, mr: 4, height: '15vh', p: 2 }}>
                        <Typography fontSize={'13px'} m={2} >
                            By clicking "Pay", I am authorizing SNP Tax & Financials to initiate a single ACH/electronic debit in the amount indicated from the bank account I designated above. I understand that this Authorization will remain in full force and effect until the transaction is canceled by me by contacting SNP Tax & Financials, or the ACH/electronic debit is processed from the designated account. I certify that (1) I am authorized to debit the bank account above and (2) the ACH/electronic payment I am authorizing complies with all applicable laws.
                        </Typography>
                    </Box>

                    <Box m={4} display="flex" gap={4}>
                        <Button variant="contained" color="primary">
                            <Typography>Pay Invoice</Typography>
                        </Button>
                        <Button onClick={handleCancel} variant="outlined" color="primary">
                            <Typography>Cancel</Typography>
                        </Button>
                    </Box>


                </Box>

            </Box>
        </Container>
    );
};

export default Bill;
