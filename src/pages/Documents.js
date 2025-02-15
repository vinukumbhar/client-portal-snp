// import React from 'react'

// const Documents = () => {
//   return (
//     <div style={{border:'3px solid blue'}}>
//       cvbvcvbvgfhfghgh
//     </div>
//   )
// }

// export default Documents


import {    ListItem, ListItemText } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../Contextprovider/Context";
import { BsFiletypeXls } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";
import { BsFiletypeTxt } from "react-icons/bs";
import { BsFiletypeJpg } from "react-icons/bs";
import { BsFiletypePng } from "react-icons/bs";

import { Collapse, ListItemIcon,  } from "@mui/material";
import { Folder, FolderOpen, InsertDriveFile } from "@mui/icons-material";
import { Box, Typography, Divider, Drawer, Card, CardContent, Button, useTheme, List, Input, IconButton } from '@mui/material'
import { NavLink, Outlet } from 'react-router-dom'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import DocumentData from '../DummyData/DocumentData';
import UploadDocument from "../DocumentNav/UploadDocument"
import CreateFolder from "../DocumentNav/CreateFolder"

import axios from "axios";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { FaRegFilePdf, FaRegImage } from "react-icons/fa6";
import { useMediaQuery } from "@mui/material";
import { FaFolder } from "react-icons/fa";

import { PiMicrosoftWordLogoFill } from "react-icons/pi";
import { BsFiletypeXlsx } from "react-icons/bs";
import { AiFillFileUnknown } from "react-icons/ai";
import CloseIcon from "@mui/icons-material/Close";
import { FaRegFolderClosed } from "react-icons/fa6";
const Documents = () => {

   const { logindata } = useContext(LoginContext);
     const [loginuserid, setLoginUserId] = useState("");
     const [accountId, setAccountId] = useState(null);
     const [accountData, setAccountData] = useState(null);
     
     const [folderdata, setFolderData] = useState(null);
     useEffect(() => {
       if (logindata?.user?.id) {
         setLoginUserId(logindata.user.id);
       }
     }, [logindata]);
   
     useEffect(() => {
       if (loginuserid) {
         fetchAccountDetails(loginuserid);
       }
     }, [loginuserid]);
   
     useEffect(() => {
       if (accountId) {
         fetchDocuments(accountId);
       }
     }, [accountId]);
   
     // Fetch account details
     const fetchAccountDetails = async (userId) => {
       const url = `http://127.0.0.1/accounts/accountdetails/accountdetailslist/listbyuserid/${userId}`;
   
       try {
         const response = await fetch(url, { method: "GET", redirect: "follow" });
         if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
         }
         const result = await response.json();
         setAccountData(result);
   
         // Extract account ID
         if (result.accounts && result.accounts.length > 0) {
           setAccountId(result.accounts[0]._id);
         }
       } catch (error) {
         console.error("Error fetching account details:", error);
       }
     };
   
     // Fetch documents using account ID
     const fetchDocuments = async (accountId) => {
       const url = `http://127.0.0.1/clientdocs/folders/${accountId}`;
   
       try {
         const response = await fetch(url, { method: "GET", redirect: "follow" });
         if (!response.ok) {
           throw new Error(`HTTP error! Status: ${response.status}`);
         }
         const result = await response.json();
         console.log("result",result)
         // setFolderData(result);
          // Filter out the "Private" folder
       const filteredContents = result.contents.filter(folder => folder.name !== "Private");
   
       // Update the folder data state
       setFolderData({ ...result, contents: filteredContents });
       } catch (error) {
         console.error("Error fetching documents:", error);
       }
     };
   // Recursive function to render folders and files
   const renderDocuments = (contents) => {
     return (
       <List>
         {contents.map((item, index) => (
           <ListItem key={index} sx={{ pl: item.type === "file" ? 4 : 2 }}>
             <ListItemText primary={item.name} secondary={item.type} />
             {item.type === "folder" && item.contents.length > 0 && (
               <Box sx={{ pl: 4 }}>{renderDocuments(item.contents)}</Box>
             )}
           </ListItem>
         ))}
       </List>
     );
   };
   
   // Returns an icon based on file type
   const getFileIcon = (fileName) => { 
     const extension = fileName.split(".").pop().toLowerCase();
   
     switch (extension) {
       case "pdf":
         return <BsFiletypePdf style={{ color: "red", fontSize: "20px" }} />;
       case "txt":
         return <BsFiletypeTxt style={{ color: "#1976D2", fontSize: "20px" }} />;
       case "jpg":
       case "jpeg":
         return <BsFiletypeJpg style={{ color: "#388E3C", fontSize: "20px" }} />;
       case "xls":
       case "xlsx":
         return <BsFiletypeXls style={{ color: "green", fontSize: "20px" }} />;
       case "png":
         return <BsFiletypePng style={{ color: "green", fontSize: "20px" }} />;
       default:
         return <InsertDriveFile sx={{ color: "#666", fontSize: "25px" }} />;
     }
   };
   
   // Component to render folder contents recursively
   const FolderContents = ({ contents }) => {
     return (
       <List component="nav" sx={{ paddingLeft: 2 }}>
         {contents.map((item, index) => (
           <ListItem key={index} sx={{ paddingY: 0.5 ,cursor:"pointer"}} >
             {item.type === "folder" ? (
               <CollapsibleFolder name={item.name}>
                 <FolderContents contents={item.contents} />
               </CollapsibleFolder>
             ) : (
               <>
                 <ListItemIcon>{getFileIcon(item.name)}</ListItemIcon>
                 <ListItemText primary={item.name} sx={{ color: "#333" }} />
               </>
             )}
           </ListItem>
         ))}
       </List>
     );
   };
   
   // Collapsible folder component
   const CollapsibleFolder = ({ name, children }) => {
     const [isOpen, setIsOpen] = useState(false);
   
     return (
       <div>
         <ListItem button onClick={() => setIsOpen(!isOpen)} sx={{ fontWeight: "bold", color: "#007BFF" }}>
           <ListItemIcon>
             {isOpen ? <FolderOpen sx={{ color: "#FF9D23" }} /> : <Folder sx={{ color: "#FF9D23" }} />}
           </ListItemIcon>
           <ListItemText primary={name} />
         </ListItem>
         <Collapse in={isOpen} timeout="auto" unmountOnExit>
           {children}
         </Collapse>
       </div>
     );
   };
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
    const [isDocumentForm, setIsDocumentForm] = useState(false);
  
    const [file, setFile] = useState(null);
  const handleDocumentFormClose = ()=>{
    setIsDocumentForm(false)
    // fetchFolders(data);
    fetchDocuments(accountId);
  }
   
    const handleFileChange = async (e) => {
      setFile(e.target.files[0]);
    };
    const handleFileUpload = () => {
      setIsDocumentForm(true);
    };

     // Function to open the create folder drawer
  const handleOpenCreateFolder = () => {
    setIsFolderFormOpen(true);
  };
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);
  const handleFormClose = () => {
    setIsFolderFormOpen(false);
    // fetchFolders(data);
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
                        
                        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
        </Box> */}
         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={() => document.getElementById("fileInput").click()} 
            sx={{ color: "#e87800" }}
          >
            <FaRegFolderClosed size={20} />
          </IconButton>
          <Typography
            variant="body1"
           
            sx={{ cursor: "pointer" }}
            onClick={() => document.getElementById("fileInput").click()} 
          >
           Upload Document
          </Typography>

          <Input
            type="file"
            id="fileInput"
            onChange={(e) => {
              handleFileChange(e);
              handleFileUpload(e);
            }}
            sx={{ display: "none" }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={handleOpenCreateFolder}
            sx={{ color: "#e87800" }}
          >
            <FaRegFolderClosed size={20} />
          </IconButton>
          <Typography
            variant="body1"
            onClick={handleOpenCreateFolder}
            sx={{ cursor: "pointer" }}
          >
            Create Folder
          </Typography>
        </Box>
                    </Box>

                    <Divider sx={{ my: 2, margin: '20px' }} />
                    <Outlet />
                </Box>

            </Box>

            {/* <Drawer
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
                <Box>
                {folderdata && folderdata.contents && <FolderContents contents={folderdata.contents} />}
                </Box>
               
                <Box  display="flex" alignItems="center" gap={2} p={3}>

                    <Button variant="contained" >
                        Upload
                    </Button>
                    <Button variant="outlined" onClick={handleFormClose}>
                        Cancel
                    </Button>
                </Box>
            </Drawer> */}
             <UploadDocument
          isDocumentForm={isDocumentForm}
          setIsDocumentForm={handleDocumentFormClose}
          templateId={accountId}
          
          file={file}
          
            setFile={setFile}

        />

         <CreateFolder
        isFolderFormOpen={isFolderFormOpen}
        setIsFolderFormOpen={handleFormClose}
        templateId={accountId}
      /> 
        </>
    )
}

export default Documents

