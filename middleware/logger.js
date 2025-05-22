const fs = require('fs');
const path = require('path');

const logFilePath = path.join('/var', 'logs', 'api.log');  // Endre denne stien til neste fil greie 

const logDir = path.dirname(logFilePath);
if (!fs.existsSync(logDir)) {
    try {
        fs.mkdirSync(logDir, { recursive: true });
    } catch (err) {''
        console.warn(`Kunne ikke opprette loggmappe på ${logDir}. Bruker lokal loggfil istedenfor.`);
        const localLogDir = path.join(__dirname, '..', 'logs');
        if (!fs.existsSync(localLogDir)) {
            fs.mkdirSync(localLogDir, { recursive: true });
        }
        this.logFilePath = path.join(localLogDir, 'api.log');
    }
}

function logger(req, res, next) {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const timestamp = `${day}.${month}.${year}`;
    const logMessage = `${timestamp} - ${req.originalUrl}\n`;

    fs.appendFile(this.logFilePath || logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Feil ved skriving til loggfil:', err);
        }
    });
    next();
}

module.exports = logger;