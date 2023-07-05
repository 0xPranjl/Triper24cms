// import {Databases,Client, Query} from "appwrite";
// import "./App.css";
// import { useState } from "react";
// import Select from 'react-select'; 
// import { useParams } from "react-router-dom";

// const client = new Client();
// client
//    .setEndpoint('https://cloud.appwrite.io/v1')
//    .setProject('6471affa751042282e0d');

// const databases = new Databases(client);

// const Listo=()=>{
//    const {vehicle}=useParams();
//     const lst=async()=>{
//         const vehicle = await databases.listDocuments(
//             '647f38e8d8808a58ae5c',
//             '6483e4f67fe60d3dd492',
//             [
//               Query.equal('vehiclename',vehicle);
//             ]
//           );
//     }
// return(
// <>
// <h1>I am Listo</h1>
// </>
// )
// }
// export default Listo;