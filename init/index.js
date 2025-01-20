const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing = require("../models/listing.js"); // Adjust path if models is not in the same directory



const MONGO_URL= "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connect to Db")
})
.catch(err=>{
    console.log(err);
})

async function main()  {
    await mongoose.connect(MONGO_URL);
};


const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"67710fc963f5f9957e9185c1"}));
    await Listing.insertMany(initData.data);
    console.log("data was initalzed");
}
initDB();
