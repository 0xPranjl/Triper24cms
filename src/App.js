
import {Databases,Client, Query} from "appwrite";
import "./App.css";
import { useState } from "react";
import Select from 'react-select'; 



const client = new Client();
client
   .setEndpoint('https://cloud.appwrite.io/v1')
   .setProject('6471affa751042282e0d');

const databases = new Databases(client);


function App() {
  const [code,setcode]=useState();
  const [vehicle,setvehicle]=useState([]);
  const [school,setschool]=useState();
  const [veh,sveh]=useState("");
  const [email,semail]=useState([]);
  const [islogin,slogin]=useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

const getschool=async(code)=>{
  console.log(code);
  const result = await databases.listDocuments(
    '648a6bcd3e13faa10918',
    '648a6bd535bbc1261490',
    [
      Query.equal('code',parseInt(code))
    ]
  );
console.log(result);
setschool(result.documents[0].org);

const vehicle = await databases.listDocuments(
  '647f38e8d8808a58ae5c',
  '6483e4f67fe60d3dd492',
  [
    Query.equal('school',result.documents[0].org)
  ]
);
var x=[]; 
for(var i=0;i<vehicle.total;i++){
  x.push({value:vehicle.documents[i].vehiclename,label:vehicle.documents[i].vehiclename});
}
setvehicle(x);

}

const fet=async()=>{
  var x=await databases.listDocuments("648a682d3c019669b21d","648a683b5a399831527b",[
    Query.equal("vehiclename",veh)
  ]);
  var y=x.documents[0].users;
  var s=email.split(",");
  var gh=true;
  for(var i=0;i<s.length;i++){
   if(ValidateEmail(s[i])){
    y.push(s[i]);
   }
   else{
    gh=false;
   
  }
  }
  if(gh){
  var id=x.documents[0].$id;
  console.log(id);
  var c=distinct(y);
       var x=await databases.updateDocument("648a682d3c019669b21d","648a683b5a399831527b",id,{
            users:c
          })
          console.log(x);
          alert("added successfully! "+s.length+" records");
  console.log(c);
        }
        else{
          alert("Invalid emails!!");
        }
}
const distinct=(arr)=>(
[...new Set(arr)]
)
function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

  return (
    <>
   <h1 className="heading" data-aos="zoom-in-left">Welcome to triper24</h1>
   {!school?<>
    <div className="input" data-aos="zoom-in-left">
   Enter your: <input placeholder="   Institution code" onChange={(e)=>{
    console.log(e.target.value);
    setcode(e.target.value);
    }}></input>
    </div>
    <br></br>
    <div className="login">
    <button onClick={()=>{
      getschool(code);
    }}><div className="log" data-aos="zoom-in-left">login</div></button>
    </div>
    </>:<>
    <div className="welcome" data-aos="zoom-in-left">
    <h1>Welcome {school}</h1>
    </div>
    <div className="bus" data-aos="zoom-in-left"><h3>select bus:</h3></div>
    <Select className="select"
        defaultValue={selectedOption}
        onChange={(e)=>{
          sveh(e.value);
        }}
        options={vehicle}
      />
     <br></br>
     <div className="email" data-aos="zoom-in-left">
     <h3>Enter email:</h3>  <textarea placeholder="Enter your email" onChange={(e)=>{
    console.log(e.target.value);
    semail(e.target.value);
    }} />
     </div>
    <br></br>
    <div className="mail" data-aos="zoom-in-left">
       <button onClick={async()=>{
         fet();
       }}>add emails</button>
       </div>
       <br></br>

       <button onClick={()=>{
       }}>view users</button>
    
    
    </>}
    </>
  );
}

export default App;
