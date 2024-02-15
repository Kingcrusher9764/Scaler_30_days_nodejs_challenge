const express = require("express")
app = express();
port = process.env.PORT || 3000;

function errorHandlingMiddleware(err, req, res, next){
    res.status(err.status || 500).json({error: err.message});
}
app.use(express.json())
app.get("/positive", (req, res, next)=>{
    const number = parseInt(req.query.number);
    if( Number.isInteger(number) && number > 0 ){ 
        res.status(200).json({message:`Success: The number ${number} is positive`});
    }else{
        const err = new Error("ParameterError: The parameter is not a positive number");
        err.status = 400;
        next(err); 
    }
})
app.use(errorHandlingMiddleware);

app.listen(port, ()=>{
    console.log(`Server running at https://localhost:${port}`);
})