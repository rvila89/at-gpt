import {z} from 'zod'

export const personSchema = z
  .object({
    name: z.string().optional().describe('The name of the person'),
    lastName: z.string().optional().describe('The last name of the person'),
    email: z.string().optional().describe('Email address'),
    phone: z.string().optional().describe('Phone number'),
    company: z
      .string()
      .optional()
      .describe('The company where the person currently works'),
    summary: z
      .string()
      .optional()
      .describe(
        'A brief summary about the person. Use executive brief of cv information'
      ),
    professional_experience: z
      .array(
        z.object({
          position: z.string().describe('Position held'),
          description: z.string().optional().describe('Project description'),
          company: z.string().describe('Company name'),
          dateStart: z.string().optional().describe('Start date of employment'),
          dateEnd: z.string().optional().describe('End date of employment'),
          client: z.string().optional().describe('Client name'),
          technologies_tools: z
            .array(z.string())
            .optional()
            .describe('Technologies and tools used')
        })
      )
      .optional()
      .describe('Projects involved'),
    education: z
      .array(
        z.object({
          degree: z.string().describe('The degree obtained'),
          institution: z.string().describe('The institution name'),
          year: z.string().optional().describe('Year of graduation')
        })
      )
      .optional()
      .describe('Educational background'),
    languages: z
      .array(
        z.object({
          name: z.string().describe('Language name'),
          level: z.string().describe('Proficiency level')
        })
      )
      .optional()
      .describe('Language proficiencies'),
    skills: z
      .object({
        technical: z.array(z.string()).optional().describe('Technical skills'),
        soft: z.array(z.string()).optional().describe('Soft skills. ')
      })
      .optional()
      .describe('Skills. Use COMPUTER KNOWLEDGE of CV information')
  })
  .describe('Comprehensive CV Information')
