import { z } from 'zod';
export declare const personSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    company: z.ZodOptional<z.ZodString>;
    summary: z.ZodOptional<z.ZodString>;
    professional_experience: z.ZodOptional<z.ZodArray<z.ZodObject<{
        position: z.ZodString;
        company: z.ZodString;
        dateStart: z.ZodOptional<z.ZodString>;
        dateEnd: z.ZodOptional<z.ZodString>;
        client: z.ZodOptional<z.ZodString>;
        projects: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            date: z.ZodOptional<z.ZodString>;
            technologies_tools: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            description?: string;
            name?: string;
            date?: string;
            technologies_tools?: string[];
        }, {
            description?: string;
            name?: string;
            date?: string;
            technologies_tools?: string[];
        }>, "many">>;
        skills: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        methodology: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        company?: string;
        position?: string;
        dateStart?: string;
        dateEnd?: string;
        client?: string;
        projects?: {
            description?: string;
            name?: string;
            date?: string;
            technologies_tools?: string[];
        }[];
        skills?: string[];
        methodology?: string[];
    }, {
        company?: string;
        position?: string;
        dateStart?: string;
        dateEnd?: string;
        client?: string;
        projects?: {
            description?: string;
            name?: string;
            date?: string;
            technologies_tools?: string[];
        }[];
        skills?: string[];
        methodology?: string[];
    }>, "many">>;
    education: z.ZodOptional<z.ZodArray<z.ZodObject<{
        degree: z.ZodString;
        institution: z.ZodString;
        year: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        degree?: string;
        institution?: string;
        year?: string;
    }, {
        degree?: string;
        institution?: string;
        year?: string;
    }>, "many">>;
    languages: z.ZodOptional<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        level: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        level?: string;
    }, {
        name?: string;
        level?: string;
    }>, "many">>;
    skills: z.ZodOptional<z.ZodObject<{
        technical: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        soft: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        technical?: string[];
        soft?: string[];
    }, {
        technical?: string[];
        soft?: string[];
    }>>;
}, "strip", z.ZodTypeAny, {
    summary?: string;
    name?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    skills?: {
        technical?: string[];
        soft?: string[];
    };
    professional_experience?: {
        company?: string;
        position?: string;
        dateStart?: string;
        dateEnd?: string;
        client?: string;
        projects?: {
            description?: string;
            name?: string;
            date?: string;
            technologies_tools?: string[];
        }[];
        skills?: string[];
        methodology?: string[];
    }[];
    education?: {
        degree?: string;
        institution?: string;
        year?: string;
    }[];
    languages?: {
        name?: string;
        level?: string;
    }[];
}, {
    summary?: string;
    name?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    skills?: {
        technical?: string[];
        soft?: string[];
    };
    professional_experience?: {
        company?: string;
        position?: string;
        dateStart?: string;
        dateEnd?: string;
        client?: string;
        projects?: {
            description?: string;
            name?: string;
            date?: string;
            technologies_tools?: string[];
        }[];
        skills?: string[];
        methodology?: string[];
    }[];
    education?: {
        degree?: string;
        institution?: string;
        year?: string;
    }[];
    languages?: {
        name?: string;
        level?: string;
    }[];
}>;
