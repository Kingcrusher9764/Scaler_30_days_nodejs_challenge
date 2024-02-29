const express = require("express")

const app = express()
const port = 3000

class CustomError extends Error{
    constructor(status, message){
        super(message)
        this.status = status
    }
}
function errorHandler(err, req, res, next){
    console.log(err.message)
    if(err instanceof CustomError){
        res.status(err.status).send(err.message)
    }else{
        res.status(500).send("Something went wrong!")
    }
}

app.get("/", (req, res, next)=>{
    next(new CustomError(404, "Custom made error"))
})
app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`Server started at port: ${port}`)
})