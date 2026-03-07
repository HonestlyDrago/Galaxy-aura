import fs from "fs/promises";
import path from "path";

const targetDirs = [
    "client/src/components/public",
    "client/src/pages/public",
    "client/src/components/admin",
    "client/src/hooks"
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

    // Fix implicit any in map loops explicitly
    if (content.match(/\(item\) =>/)) {
        content = content.replace(/\(item\) =>/g, "(item: any) =>");
        modified = true;
    }
    if (content.match(/\(p\) =>/)) {
        content = content.replace(/\(p\) =>/g, "(p: any) =>");
        modified = true;
    }
    if (content.match(/\(o\) =>/)) {
        content = content.replace(/\(o\) =>/g, "(o: any) =>");
        modified = true;
    }
    if (content.match(/\(order\) =>/)) {
        content = content.replace(/\(order\) =>/g, "(order: any) =>");
        modified = true;
    }
    if (content.includes("(prev, i)")) {
        content = content.replace(/\(prev, i\)/g, "(prev: any, i: any)");
        modified = true;
    }
    if (content.includes("(sum, i)")) {
        content = content.replace(/\(sum, i\)/g, "(sum: any, i: any)");
        modified = true;
    }
    if (content.includes("(sum, item)")) {
        content = content.replace(/\(sum, item\)/g, "(sum: any, item: any)");
        modified = true;
    }
    if (content.includes("open: boolean")) {
        // nothing needed
    } else if (content.includes("open)")) {
        content = content.replace(/open\)/g, "open: boolean)");
        modified = true;
    }
    // Remove "next" from layout
    if (content.includes("from 'next'") || content.includes('from "next"')) {
        content = content.replace(/import type { Metadata } from ['"]next['"];?/g, "");
        modified = true;
    }

    if (modified) {
        await fs.writeFile(filePath, content, "utf-8");
        console.log(`Updated hooks/types on: ${path.relative(process.cwd(), filePath)}`);
    }
}

async function main() {
    for (const dir of targetDirs) {
        for await (const file of walk(dir)) {
            await processFile(file);
        }
    }
}

main().catch(console.error);
