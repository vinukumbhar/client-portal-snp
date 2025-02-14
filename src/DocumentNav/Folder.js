
// // import {  Box,  Typography,  } from '@mui/material';
// // import React, { useState, useEffect,useContext } from 'react';
// // import { LoginContext } from '../Contextprovider/Context';
// // const Documents = () => {
 
// //   const { logindata } = useContext(LoginContext);
// //   const [loginuserid, setLoginUserId] = useState("");

// //   useEffect(() => {
// //     if (logindata?.user?.id) {
// //       // Check if logindata and user.id exist
// //       setLoginUserId(logindata.user.id);
      
// //     }
// //   }, [logindata]);
// // console.log("userid",loginuserid)
 
// //   return (
// //     <Box>
  
// //       <Typography>Show folders and file</Typography>
      
// //     </Box>
// //   );
// // };

// // export default Documents;


// import { Box, Typography } from "@mui/material";
// import React, { useState, useEffect, useContext } from "react";
// import { LoginContext } from "../Contextprovider/Context";

// const Documents = () => {
//   const { logindata } = useContext(LoginContext);
//   const [loginuserid, setLoginUserId] = useState("");
//   const [accountId, setAccountId] = useState(null);
//   const [accountData, setAccountData] = useState(null);

//   useEffect(() => {
//     if (logindata?.user?.id) {
//       setLoginUserId(logindata.user.id);
//     }
//   }, [logindata]);

//   useEffect(() => {
//     if (loginuserid) {
//       fetchAccountDetails(loginuserid);
//     }
//   }, [loginuserid]);

//   const fetchAccountDetails = async (userId) => {
//     const url = `http://127.0.0.1/accounts/accountdetails/accountdetailslist/listbyuserid/${userId}`;

//     try {
//       const response = await fetch(url, { method: "GET", redirect: "follow" });
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const result = await response.json();
//       setAccountData(result);

//       // Extract account ID
//       if (result.accounts && result.accounts.length > 0) {
//         setAccountId(result.accounts[0]._id);
//       }
//     } catch (error) {
//       console.error("Error fetching account details:", error);
//     }
//   };

//   return (
//     <Box>
//       <Typography>Show folders and file</Typography>
//       {accountId ? (
//         <Typography>Account ID: {accountId}</Typography>
//       ) : (
//         <Typography>Loading account details...</Typography>
//       )}
//     </Box>
//   );
// };

// export default Documents;



import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../Contextprovider/Context";
import { BsFiletypeXls } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";
import { BsFiletypeTxt } from "react-icons/bs";
import { BsFiletypeJpg } from "react-icons/bs";
import { BsFiletypePng } from "react-icons/bs";
import { FaRegFolderClosed } from "react-icons/fa6";
import { Collapse, ListItemIcon,  } from "@mui/material";
import { Folder, FolderOpen, InsertDriveFile } from "@mui/icons-material";
const Documents = () => {
  const { logindata } = useContext(LoginContext);
  const [loginuserid, setLoginUserId] = useState("");
  const [accountId, setAccountId] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [documents, setDocuments] = useState([]);
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
      console.log(result)
      setFolderData(result);
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
        <ListItem key={index} sx={{ paddingY: 0.5 }}>
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
  return (
    <Box>
      <Typography>Show folders and file</Typography>
      {accountId ? (
        <Typography>Account ID: {accountId}</Typography>
      ) : (
        <Typography>Loading account details...</Typography>
      )}

{folderdata && folderdata.contents && <FolderContents contents={folderdata.contents} />}
    </Box>
  );
};

export default Documents;
