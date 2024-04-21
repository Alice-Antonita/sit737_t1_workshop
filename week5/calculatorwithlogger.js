// Import and initialize required libraries
const express= require("express");
const res = require("express/lib/response");
const app= express();
const fs = require('fs');
const winston = require('winston');

// Define a format to exclude log messages with 'error' level
const excludeErrorLevel = winston.format((info) => {
  if (info.level === 'error') {
    return false;
}
  return info;
});

// Define a format for info-level log messages written to "combined.log" file
const infoLogFormat = winston.format.combine(excludeErrorLevel()); // Using the format to exclude log messages with 'error' level

// Define logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-microservice' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log', level: 'info', format: infoLogFormat }), // Using info-level log format
    ],
  });
  
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  // Define function and api endpoint for addition
const add= (n1,n2) => {
    return n1+n2;
}
app.get("/add", (req,res)=>{
    // Error handling
    try{
    const n1= parseFloat(req.query.n1);
    const n2=parseFloat(req.query.n2);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    
    logger.info('Parameters '+n1+' and '+n2+' received for addition');
    const result = add(n1,n2);
    res.status(200).json({statuscocde:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscocde:500, msg: error.toString() })
      }
});

  // Define function and api endpoint for subtraction
const subtract= (n1,n2) => {
  return n1-n2;
}
app.get("/subtract", (req,res)=>{
  // Error handling
  try{
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  
  logger.info('Parameters '+n1+' and '+n2+' received for subtraction');
  const result = subtract(n1,n2);
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

  // Define function and api endpoint for multiplication
  const multipy= (n1,n2) => {
  return n1*n2;
}
app.get("/multiply", (req,res)=>{
  // Error handling
  try{
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  
  logger.info('Parameters '+n1+' and '+n2+' received for multiplication');
  const result = multipy(n1,n2);
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

  // Define function and api endpoint for division
  const divide= (n1,n2) => {
  return n1/n2;
}
app.get("/divide", (req,res)=>{
  // Error handling
  try{
  const n1= parseFloat(req.query.n1);
  const n2=parseFloat(req.query.n2);
  if(isNaN(n1)) {
      logger.error("n1 is incorrectly defined");
      throw new Error("n1 incorrectly defined");
  }
  if(isNaN(n2)) {
      logger.error("n2 is incorrectly defined");
      throw new Error("n2 incorrectly defined");
  }
  
  logger.info('Parameters '+n1+' and '+n2+' received for division');
  const result = divide(n1,n2);
  res.status(200).json({statuscocde:200, data: result }); 
  } catch(error) { 
      console.error(error)
      res.status(500).json({statuscocde:500, msg: error.toString() })
    }
});

app.get('/health', (req, res) => {
  logger.info("Healthy");
  res.status(200).send('Calculator service is healthy');
});

const port=3000;
app.listen(port,()=> {
    console.log("hello i'm listening to port "+port);
})
