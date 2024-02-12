"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./config/app");
const port = process.env.APP_PORT ?? 3001;
app_1.app.listen(port, () => { console.log(`Running on localhost:${port}`); });
