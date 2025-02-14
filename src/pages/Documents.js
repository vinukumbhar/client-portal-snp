// import React from 'react'

// const Documents = () => {
//   return (
//     <div style={{border:'3px solid blue'}}>
//       cvbvcvbvgfhfghgh
//     </div>
//   )
// }

// export default Documents


import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider, Drawer, Card, CardContent, Button, useTheme, List, Input, IconButton } from '@mui/material'
import { NavLink, Outlet } from 'react-router-dom'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import DocumentData from '../DummyData/DocumentData';
import axios from "axios";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { FaRegFilePdf, FaRegImage } from "react-icons/fa6";
import { useMediaQuery } from "@mui/material";
import { FaFolder } from "react-icons/fa";

import { PiMicrosoftWordLogoFill } from "react-icons/pi";
import { BsFiletypeXlsx } from "react-icons/bs";
import { AiFillFileUnknown } from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";

const Documents = () => {

   
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -25,
            top: 12,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
 


    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [file, setFile] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const handleFileChange = async (e) => {
        setFile(e.target.files[0]);
      };
    const handleUploadDocDrawer = () => {
        setIsDrawerOpen(true);
    };
    const handleFormClose = () => {
        setIsDrawerOpen(false);
    };
    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '20px' }}>
                    <Typography variant='h6'>Documents</Typography>
                    <HelpOutlineRoundedIcon style={{ color: '#0496ff', fontSize: '25px', cursor: 'pointer', }} />
                </Box>

                <Box>
                    <Box>
                        <StyledBadge badgeContent={1} color="success">
                            <Typography ml={2}>Waiting for action</Typography>
                        </StyledBadge>
                    </Box>

                    <Box sx={{ height: '25vh', backgroundColor: '#F1F5F9', borderRadius: '15px', }}>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, }}>
                            {DocumentData.map((card, index) => (
                                <Card
                                    key={index}
                                    sx={{
                                        height: '22vh',
                                        width: '18%',
                                        border: '1px solid #EFF3F8',
                                        ml: 2,
                                        margin: 1


                                    }}
                                >
                                    <Box sx={{ cursor: 'pointer' }}>
                                        <CardContent >
                                            <Box sx={{ alignItems: 'center' }}>
                                                <Box sx={{ color: 'rgb(235, 88, 88)', ml: 2 }}>
                                                    {card.icon}
                                                </Box>
                                                <Box sx={{ marginLeft: 2 }}>
                                                    <Typography>{card.title}</Typography>
                                                    <Typography color='#697991' variant="body2">{card.description}</Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Box>
                                </Card>
                            ))}
                        </Box>

                    </Box>

                </Box>

                <Box className="client-document">
                    <Box
                        className="client-document-nav"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            mt: 5,
                            width: '100%',
                            margin: '20px',
                            gap: '10px',
                            '& a': {
                                textDecoration: 'none',
                                padding: '10px 16px',
                                borderRadius: '4px',
                                color: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'primary.light',
                                    color: 'white',
                                },
                                '&.active': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                },
                            },
                        }}
                    >
                        <NavLink to='recent'>Recent</NavLink>
                        <NavLink to='folders'>Folders</NavLink>
                        <NavLink to='trash'>Trash</NavLink>
                        
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton component="label" htmlFor="fileInput" sx={{ color: "#e87800" }}>
            <HiDocumentArrowUp size={24} />
          </IconButton>
          <Typography variant="body1" component="label" htmlFor="fileInput" sx={{ cursor: "pointer" }}>
            Upload Document
          </Typography>
          <Input
            type="file"
            id="fileInput"
            onChange={(e) => {
              handleFileChange(e);
              handleUploadDocDrawer(e);
            }}
            sx={{ display: "none" }}
          />
        </Box>
                    </Box>

                    <Divider sx={{ my: 2, margin: '20px' }} />
                    <Outlet />
                </Box>

            </Box>

            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: isSmallScreen ? "0" : "10px 0 0 10px",
                        width: isSmallScreen ? "100%" : 600,
                        maxWidth: "100%",
                        [theme.breakpoints.down("sm")]: {
                            width: "100%",
                        },
                        id: "tag-drawer",
                    },
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", ml: 1 }}>
                    <Typography sx={{ fontWeight: "bold" }} variant="h6">
                        Upload Documents
                    </Typography>
                    <IconButton onClick={() => setIsDrawerOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
               
                <Box mt={5} display="flex" alignItems="center" gap={2} p={3}>

                    <Button variant="contained" >
                        Upload
                    </Button>
                    <Button variant="outlined" onClick={handleFormClose}>
                        Cancel
                    </Button>
                </Box>
            </Drawer>
        </>
    )
}

export default Documents

