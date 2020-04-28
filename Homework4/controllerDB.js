var mongoClient = require("mongodb").MongoClient;
var url = "mongodb://bsf-db:3bMhYChHHxzvKhcNw0XLcySfVaqtq1Ii7ToyTzQdYQkTGwojtbTkbrJ7fY7Ziar67Gv56PXjQm8pEAxj8eX01Q%3D%3D@bsf-db.mongo.cosmos.azure.com:10255/?ssl=true&appName=@bsf-db@";

insert = (comanda) => {
    mongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("BuySomeFoodDB");
        var myobj = {comanda: comanda};
        dbo.collection("comenzi").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
};

insert("vreu ceva bun");