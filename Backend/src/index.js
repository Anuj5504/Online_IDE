import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import { setupSocket } from "./sockets/index.js";
import { getFileContentForSocket } from "./utils/getFileContentById.js";
import { saveFileContentAndName } from "./utils/saveFileContent.js";

const server = http.createServer(app);

setupSocket(server, getFileContentForSocket, saveFileContentAndName);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
