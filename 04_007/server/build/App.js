"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const app = (0, express_1.default)();
// ==============================
// parsing bodies
// ==============================
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// ==============================
//logger for debug purpose
// ==============================
app.use((req, res, next) => {
    const time = new Date();
    const logBody = Object.keys(req.body).length ? 'body' : '';
    console.log(`[${time.toLocaleDateString()} ${time.toLocaleTimeString()}] ${req.ip} ${req.method} -(${logBody})- ${req.url}`);
    if (Object.keys(req['query']).length)
        console.dir(req.query);
    if (Object.keys(req['body']).length)
        console.dir(req.body);
    next();
});
// ==============================
// cors settings w/o libraries
// ==============================
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.header('Origin') || '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With');
        res.header('Access-Control-Max-Age', '36000');
        return res.status(200).send();
    }
    next();
});
// ==============================
// crud endpoints
// ==============================
app.get('/article', controller_1.default.getList);
app.post('/article', controller_1.default.write);
app.get('/article/:id', controller_1.default.getOne);
app.put('/article/:id', controller_1.default.edit);
app.delete('/article/:id', controller_1.default.delete);
// ==============================
// Check if the server is running
// ==============================
app.get('/', (req, res) => {
    return res.status(200).send('API Server is active and running');
});
// ==============================
// 404 Not Found
// ==============================
app.use((req, res) => {
    console.log('404 Not Found - no such endpoint');
    return res.status(404).send('Not Found');
});
// ==============================
// Error handling
// ==============================
app.use((err, req, res, next) => {
    console.error(err);
    return res.status(500).send('Internal Server Error');
});
// ==============================
// Start the server
// ==============================
app.listen('3333', () => {
    console.log(`server is running on port 3333`);
});
