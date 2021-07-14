const { createLogger, format, transports } = require('winston')
const { printf, combine, timestamp, colorize } = format
const { File, Console } = transports

const myFormat = printf(({
    level,
    message,
    timestamp
})=>{
    return `${timestamp} ${level} : ${message}`
})

const loggingOptions = {
    forConsole: {
            level : 'debug',
            format: combine(
            timestamp(),
            colorize(),
            myFormat
        )
    },
}

const logger = createLogger({
    level : 'debug',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new Console(loggingOptions.forConsole),
        new File({ filename: 'logging.log'})
    ]
})

module.exports = (moduleName)=>{
    return {
        info: (message)=>{return logger.info(`[${moduleName}]  ${message}`)},
        error: (message)=>{return logger.error(`[${moduleName}]  ${message}`)},
        debug: (message)=>{return logger.debug(`[${moduleName}]  ${message}`)}
    }
}