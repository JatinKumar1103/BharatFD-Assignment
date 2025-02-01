import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import {app} from "./app.js"



dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 5000 , () => {
        console.log(`Server is running at ${process.env.PORT}`)
    })
})
.catch((err) =>{
    console.log("MONGOdb connection failes !!!", err);
    process.exit(1);
});
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    process.exit(1);
});