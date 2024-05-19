"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.personSchema = void 0;
const zod_1 = require("zod");
exports.personSchema = zod_1.z
    .object({
    name: zod_1.z.string().optional().describe('The name of the person'),
    lastName: zod_1.z.string().optional().describe('The last name of the person'),
    email: zod_1.z.string().optional().describe('Email address'),
    phone: zod_1.z.string().optional().describe('Phone number'),
    company: zod_1.z
        .string()
        .optional()
        .describe('The company where the person currently works'),
    summary: zod_1.z
        .string()
        .optional()
        .describe('A brief summary about the person. Use executive brief of cv information'),
    professional_experience: zod_1.z
        .array(zod_1.z.object({
        position: zod_1.z.string().describe('Position held'),
        company: zod_1.z.string().describe('Company name'),
        dateStart: zod_1.z.string().optional().describe('Start date of employment'),
        dateEnd: zod_1.z.string().optional().describe('End date of employment'),
        client: zod_1.z.string().optional().describe('Client name'),
        projects: zod_1.z
            .array(zod_1.z.object({
            name: zod_1.z.string().describe('Project name'),
            description: zod_1.z
                .string()
                .optional()
                .describe('Project description'),
            date: zod_1.z.string().optional().describe('Working period'),
            technologies_tools: zod_1.z
                .array(zod_1.z.string())
                .optional()
                .describe('Technologies and tools used')
        }))
            .optional()
            .describe('Projects involved'),
        skills: zod_1.z
            .array(zod_1.z.string())
            .optional()
            .describe('List of responsibilities'),
        methodology: zod_1.z
            .array(zod_1.z.string())
            .optional()
            .describe('Methodologies followed')
    }))
        .optional()
        .describe('Professional experience'),
    education: zod_1.z
        .array(zod_1.z.object({
        degree: zod_1.z.string().describe('The degree obtained'),
        institution: zod_1.z.string().describe('The institution name'),
        year: zod_1.z.string().optional().describe('Year of graduation')
    }))
        .optional()
        .describe('Educational background'),
    languages: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z.string().describe('Language name'),
        level: zod_1.z.string().describe('Proficiency level')
    }))
        .optional()
        .describe('Language proficiencies'),
    skills: zod_1.z
        .object({
        technical: zod_1.z.array(zod_1.z.string()).optional().describe('Technical skills'),
        soft: zod_1.z.array(zod_1.z.string()).optional().describe('Soft skills. ')
    })
        .optional()
        .describe('Skills. Use COMPUTER KNOWLEDGE of CV information')
})
    .describe('Comprehensive CV Information');
//# sourceMappingURL=personSchema.js.map