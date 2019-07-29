var http = require('http');
var express = require("express");
var RED = require("node-red");


// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
    //nodesDir: "/Users/allomov/work/altoros/node-red/app/nodes",
    nodesDir: "/data",
    userDir: "/data",
    flowFile: 'flows.json',
    httpAdminRoot:"/",
    httpNodeRoot: "/api",
    uiPort: 8080,
    functionGlobalContext: { },    // enables global context
    adminAuth: {
        type: "credentials",
        users: [
            {
                username: "admin",
                password: "$2a$08$Hniw4WdK87asPEgT0AFdZuj0chpS8/ACGu0GGmbgf33CxmUor.vRu",
                permissions: "*"
            },
            {
                username: "idc",
                password: "$2a$08$tCNSzODpMjJ.jtqB/ntDDeMa1V1DRG4pInCE6nTNyM16mdm9ofhBG",
                permissions: "read"
            }
        ]
    }
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(8080);

// Start the runtime
RED.start();
