const { execSync } = require("child_process");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

try {
    const projectId = process.env.SUPABASE_PROJECT_REF;
    const output = execSync(
        `npx supabase gen types typescript --project-id ${projectId} --schema public > types/supabase.ts`
    );
    console.log(output.toString());
    console.log(
        `TypeScript definitions generated successfully from project ${projectId}!`
    );
} catch (error) {
    console.error("Failed to generate TypeScript definitions:", error);
}
