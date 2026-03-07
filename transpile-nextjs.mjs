import fs from "fs/promises";
import path from "path";

const targetDirs = [
    "client/src/components/public",
    "client/src/pages/public",
    "client/src/components/admin",
    "client/src/components/ui",
    "client/src/hooks",
    "client/src/pages/admin"
];

async function* walk(dir) {
    const dirPath = path.resolve(process.cwd(), dir);
    try {
        const files = await fs.readdir(dirPath, { withFileTypes: true });
        for (const file of files) {
            const p = path.join(dirPath, file.name);
            if (file.isDirectory()) {
                yield* walk(p);
            } else if (file.isFile() && (p.endsWith(".ts") || p.endsWith(".tsx"))) {
                yield p;
            }
        }
    } catch (e) {
        // skip
    }
}

async function processFile(filePath) {
    let content = await fs.readFile(filePath, "utf-8");
    let modified = false;

    // 1. Remove 'use client'
    if (content.includes("'use client'") || content.includes('"use client"')) {
        content = content.replace(/^['"]use client['"];?\s*/gm, "");
        modified = true;
    }

    // 2. Replace next/link with wouter
    if (content.includes("from 'next/link'") || content.includes('from "next/link"')) {
        content = content.replace(/import Link from ['"]next\/link['"];?/g, "import { Link } from 'wouter';");
        modified = true;
    }

    // 3. Replace next/navigation with wouter
    if (content.includes("from 'next/navigation'") || content.includes('from "next/navigation"')) {
        content = content.replace(/import\s+{\s*([^}]*)\s*}\s+from\s+['"]next\/navigation['"];?/g, (match, imports) => {
            let replacements = [];
            if (imports.includes("usePathname")) {
                replacements.push("const [useLocation] = require('wouter');");
            }
            return "import { useLocation } from 'wouter';"; // Simplified
        });

        // Fix the usage of usePathname to useLocation
        content = content.replace(/const pathname = usePathname\(\)/g, "const [pathname] = useLocation()");
        content = content.replace(/usePathname/g, "useLocation");
        modified = true;
    }

    // 4. Replace next/image with img
    if (content.includes("from 'next/image'") || content.includes('from "next/image"')) {
        content = content.replace(/import Image from ['"]next\/image['"];?/g, "");
        content = content.replace(/<Image/g, "<img");
        modified = true;
    }

    if (modified) {
        await fs.writeFile(filePath, content, "utf-8");
        console.log(`Updated: ${path.relative(process.cwd(), filePath)}`);
    }
}

async function main() {
    console.log("Starting Next.js to Vite transpilation...");
    for (const dir of targetDirs) {
        for await (const file of walk(dir)) {
            await processFile(file);
        }
    }
    console.log("Transpilation complete!");
}

main().catch(console.error);
