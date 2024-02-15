const Nodecache = require("node-cache");
const myCache = new Nodecache();

module.exports = duration => (req, res, next)=>{
    const key = req.originalUrl;
    const cacheRes = myCache.get(key);
    if(cacheRes){
        console.log(`Cache response: ${cacheRes}`);
        return res.send(cacheRes);
    }
    res.originalSend = res.send;
    res.send = body=>{
        res.originalSend(body);
        myCache.set(key, body, duration);
    };
    next();
};