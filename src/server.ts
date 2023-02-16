import app from "./app";
import { connectDatabase } from "./database";

const PORT: number = 3000;
const runningMsg: string = `Server is running on port: ${PORT}`;

app.listen(PORT, async()=>{
    await connectDatabase();
    console.log(runningMsg)
});