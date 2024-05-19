"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadImageAsPng = void 0;
const path = require("path");
const fs = require("fs");
const common_1 = require("@nestjs/common");
const downloadImageAsPng = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new common_1.InternalServerErrorException('Download image was not possible');
    }
    const folderPath = path.resolve('./', './generated/images/');
    fs.mkdirSync(folderPath, { recursive: true });
    const imageNamePng = `${new Date().getTime()}.png`;
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(`${folderPath}/${imageNamePng}`, buffer);
};
exports.downloadImageAsPng = downloadImageAsPng;
//# sourceMappingURL=download-image-as-png.js.map