const express = require("express");
const app = express();
const winston = require('winston');

// Logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'calculate-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

// Addition
const add = (n1, n2) => {
    return n1 + n2;
}
app.get("/add", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for addition');
        const result = add(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

// Subtraction
const subtract = (n1, n2) => {
    return n1 - n2;
}
app.get("/subtract", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for subtraction');
        const result = subtract(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

// Multiplication
const multiply = (n1, n2) => {
    return n1 * n2;
}
app.get("/multiply", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for multiplication');
        const result = multiply(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

// Division
const divide = (n1, n2) => {
    if (n2 === 0) {
        throw new Error("Division by zero error");
    }
    return n1 / n2;
}
app.get("/divide", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for division');
        const result = divide(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

// Exponential
const power = (base, exponent) => {
    return Math.pow(base, exponent);
}
app.get("/power", (req, res) => {
    try {
        const base = parseFloat(req.query.base);
        const exponent = parseFloat(req.query.exponent);
        if (isNaN(base)) {
            logger.error("base is incorrectly defined");
            throw new Error("base incorrectly defined");
        }
        if (isNaN(exponent)) {
            logger.error("exponent is incorrectly defined");
            throw new Error("exponent incorrectly defined");
        }

        logger.info('Base ' + base + ' raised to exponent ' + exponent);
        const result = power(base, exponent);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

// Modulo
const modulo = (n1, n2) => {
    return n1 % n2;
}
app.get("/modulo", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if (isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if (isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }

        logger.info('Parameters ' + n1 + ' and ' + n2 + ' received for modulo');
        const result = modulo(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

// Square Root
const squareRoot = (num) => {
    return Math.sqrt(num);
}
app.get("/sqrt", (req, res) => {
    try {
        const num = parseFloat(req.query.num);
        if (isNaN(num)) {
            logger.error("num is incorrectly defined");
            throw new Error("num incorrectly defined");
        }

        logger.info('Square root of ' + num);
        const result = squareRoot(num);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.error(error)
        res.status(500).json({ statuscode: 500, msg: error.toString() })
    }
});

const port = 3040;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});