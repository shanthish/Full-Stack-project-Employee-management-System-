import express from 'express'
import cors from 'cors'
// import router from './routes/auth.js'
// import Employee from './models/Employee.js';
// import Department from './models/Department.js';
// import verifyToken from "./middleware/authMiddleware.js";
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import router from "./routes/auth.js"
import connectToDatabase from './db/db.js'
connectToDatabase();
const app = express()
// const cors=require("cors")
// const PORT=process.env.PORT || 3000
app.use(express.json());
// app.use(cors({
//     origin: "http://localhost:5173", 
//     methods: ["GET", "POST"],
//     credentials: true,             
//   }));

app.use(cors({
  origin: 'http://localhost:5173', // or "*" for all origins (not recommended for production)
  credentials: true
}));
app.use(express.static('public/uploads'));
app.use('/api/auth',router)
// connectToDatabase();
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);



app.listen(3000,()=>{
    console.log(`Server is running on port 3000`)
})