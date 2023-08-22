var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  next();
});
app.use(bodyParser.json());

const port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Listening on port ${port}!`));

let axios = require("axios");


let baseURL= "https://repo-8qu2.onrender.com/studentServer";
// let baseURL="https://postmanapp.onrender.com"

app.get("/getToken", function (req, res) {
  axios
    .get(baseURL + "/getToken")
    .then((response) => {
      res.send("" + response.data);
    })
    .catch((error) => {
      if (error.response) {
        let { status, statusText } = error.response;
        console.log(status, statusText);
        res.status(status).send(statusText);
      }
    });
});

app.get("/testServer/students", function (req, res) {
  let token = req.header("authorization");
  if (!token) res.status(401).send("No token found .Provide a valid token");
  else {
    axios
      .get(baseURL + "/students", { headers: { authorization: token } })
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => {
        if (error.response) {
          let { status, statusText } = error.response;
          console.log(status, statusText);
          res.status(status).send(statusText);
        } else res.status(404).send(error);
      });
  }
});

app.get("/testServer/students/:id", function (req, res) {
  let { id } = req.params;
  let token = req.header("authorization") || "dummyvalue";
  if (!token) res.status(401).send("No token found .Provide a valid token");
  else {
    axios
      .get(`${baseURL}/students/${id}`, { headers: { authorization: token } })
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => {
        if (error.response) {
          let { status, statusText } = error.response;
          console.log(status, statusText);
          res.status(status).send(statusText);
        } else res.status(404).send(error);
      });
  }
});

app.get("/testServer/students/course/:name", function (req, res) {
  let { name } = req.params;
  let token = req.header("authorization") || "dummyvalue";
  if (!token) res.status(404).send("Invalid Token. Please enter a valid token");
  else {
    axios
      .get(`${baseURL}/students/course/${name}`, {
        headers: { authorization: token },
      })
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => {
        if (error.response) {
          let { status, statusText } = error.response;
          console.log(status, statusText);
          res.status(status).send(statusText);
        } else res.status(404).send(error);
      });
  }
});
app.post("/testServer/students", function (req, res) {
  let body = req.body;
  let token = req.header("authorization");
  if (!token) res.status(404).send("Invalid token");
  else {
    axios
      .post(baseURL + "/students", body, { headers: { authorization: token } })
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => {
        if (error.response) {
          let { status, statusText } = error.response;
          console.log(status, statusText);
          res.status(status).send(statusText);
        } else res.status(404).send(error);
      });
  }
});
app.put("/testServer/students/:id", function (req, res) {
  let { id } = req.params;
  let body = req.body;
  let token = req.header("authorization") || "dummyvalue";
  if (!token) res.status(404).send("Invalid Token");
  else {
    axios
      .put(`${baseURL}/students/${id}`, body, {
        headers: { authorization: token },
      })
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => {
        if (error.response) {
          let { status, statusText } = error.response;
          console.log(status, statusText);
          res.status(status).send(statusText);
        } else res.status(404).send(error);
      });
  }
});

app.delete("/testServer/students/:id", function (req, res) {
  let { id } = req.params;
  let token = req.header("authorization") || "dummyvalue";
  if (!token) res.status(404).send("Invalid Token");
  else {
    axios
      .delete(`${baseURL}/students/${id}`, { headers: { authorization: token } })
      .then((response) => {
        console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => {
        if (error.response) {
          let { status, statusText } = error.response;
          console.log(status, statusText);
          res.status(status).send(statusText);
        } else res.status(404).send(error);
      });
  }
});




// PRODUCT API

let baseURL1="https://repo-8qu2.onrender.com/productServer";
// let baseURL=""


// USING ASYNC/AWAIT;

app.get("/myserver/customers",async function(req,res){
    try{
        let response=await axios.get(baseURL1+"/customers");
        console.log(response.data);
        res.send(response.data);
    }
    catch(err){
        if(err.response){
            let {status,statusText}=err.response;
            console.log(status,statusText);
            res.status(status).send(statusText);
        }
        else res.status(404).send(err);
    }
});
app.get("/myserver/products",async function(req,res){
    try{
        let response=await axios.get(baseURL1+"/products");
        console.log(response.data);
        res.send(response.data);
    }
    catch(err){
        if(err.response){
            let {status,statusText}=err.response;
            console.log(status,statusText);
            res.status(status).send(statusText);
        }
        else res.status(404).send(err);
    }
});
// app.get("/myserver/orders",async function(req,res){
//     try{
//         let response=await axios.get(baseURL1+"/orders");
//         console.log(response.data);
//         res.send(response.data);
//     }
//     catch(err){
//         if(err.response){
//             let {status,statusText}=err.response;
//             console.log(status,statusText);
//             res.status(status).send(statusText);
//         }
//         else res.status(404).send(err);
//     }
// });

app.get("/myserver/orders/customer/:cust",async function(req,res){
    let {cust}=req.params;
    try{
        let response=await axios.get(`${baseURL1}/orders/customer/${cust}`);
        console.log(response.data);
        res.send(response.data);
    }
    catch(err){
        if(err.response){
            let {status,statusText}=err.response;
            console.log(status,statusText);
            res.status(status).send(statusText);
        }
        else res.status(404).send(err);
    }
});
app.get("/myserver/orders/product/:prod",async function(req,res){
    let {prod}=req.params;
    try{
        let response=await axios.get(`${baseURL1}/orders/product/${prod}`);
        console.log(response.data);
        res.send(response.data);
    }
    catch(err){
        if(err.response){
            let {status,statusText}=err.response;
            console.log(status,statusText);
            res.status(status).send(statusText);
        }
        else res.status(404).send(err);
    }
});
app.get("/myserver/orders",async function(req,res){
    let {cust,prod}=req.query;
    let params={}
    if(cust) params.cust=cust;
    if(prod) params.prod=prod;
    try{
        let response=await axios.get(baseURL1+"/orders",{params:params});
        console.log(response.data);
        res.send(response.data);
    }
    catch(err){
        if(err.response){
            let {status,statusText}=err.response;
            console.log(status,statusText);
            res.status(status).send(statusText);
        }
        else res.status(404).send(err);
    }
});

app.post("/myserver/orders",async function(req,res){
    let body=req.body;
    try{
    let response=await axios.post(baseURL1+"/orders",body)
        console.log(response.data);
        res.send(response.data);
    }
    catch(error){
        if(error.response){
            let {status,statusText}=response.data;
            console.log(status,statusText);
            res.status(status).send(statusText);
        }
        else res.status(404).send(error);
    }
})
