"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileUseCase = void 0;
const path = require("path");
const fs = require("fs");
const common_1 = require("@nestjs/common");
const pdf_1 = require("langchain/document_loaders/fs/pdf");
const prompt_1 = require("../constants/prompt");
const prompts_1 = require("@langchain/core/prompts");
const personSchema_1 = require("../schema/personSchema");
const uploadFileUseCase = async (file, llm) => {
    const tempDir = path.join('/tmp', 'generated', 'uploads', 'cv');
    const filePath = path.join(tempDir, file.filename);
    if (!fs.existsSync(filePath)) {
        throw new common_1.NotFoundException('File does not exist.');
    }
    const loader = new pdf_1.PDFLoader(filePath, {
        splitPages: false
    });
    const docs = await loader.load();
    if (docs.length === 0) {
        console.log('No documents found');
        return;
    }
    const SYSTEM_PROMPT_TEMPLATE = prompt_1.SYSTEM_PROMPT_TEMPLATE_BASE.replace('{{pdfURL}}', filePath);
    const prompt = prompts_1.ChatPromptTemplate.fromMessages([
        ['system', SYSTEM_PROMPT_TEMPLATE],
        ['human', '{text}']
    ]);
    const extractionRunnable = prompt.pipe(llm.withStructuredOutput(personSchema_1.personSchema));
    const extract = await extractionRunnable.invoke({
        text: docs[0].pageContent
    });
    console.log(JSON.stringify(extract, null, 2));
    console.log('Successfully extracted');
    return extract;
};
exports.uploadFileUseCase = uploadFileUseCase;
//# sourceMappingURL=upload-file-use-case.js.map