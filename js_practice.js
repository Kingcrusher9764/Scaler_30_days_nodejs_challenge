// const express = require("express")
function placeOrder(drink){
    return new Promise(function(resolve, reject){
        if(drink==="coffee"){
            resolve("Order is placed");
        }else{
            reject("Order is rejected");
        }
    })
}

function processOrder(order){
    return new Promise(function(resolve){
        console.log("Order is processed");
        resolve(`${order} is served`);
    })
}

placeOrder("coffee").then(function(order){
    console.log(order);
    let orderprocess = processOrder(order);
    return orderprocess;
}).then(function(process){
    console.log(process);
}).catch(function(err){
    console.log(err);
})