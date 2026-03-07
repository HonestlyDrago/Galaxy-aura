import fs from "fs/promises";
import path from "path";

const targetDirs = [
    "client/src/components/public",
    "client/src/pages/public",
    "client/src/components/admin",
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

    if (content.match(/['"]@\/hooks\/useOrders['"]/)) {
        content = content.replace(/['"]@\/hooks\/useOrders['"]/g, "'@/hooks/useOrders'");
        modified = true;
    }
    if (content.match(/['"]@\/hooks\/useProducts['"]/)) {
        content = content.replace(/['"]@\/hooks\/useProducts['"]/g, "'@/hooks/useProducts'");
        modified = true;
    }

    // also check for admin layout metadata
    if (content.includes("export const metadata")) {
        content = content.replace(/export const metadata: Metadata = {[\s\S]*?};/g, "");
        modified = true;
    }

    if (modified) {
        await fs.writeFile(filePath, content, "utf-8");
        console.log(`Updated hooks imports on: ${path.relative(process.cwd(), filePath)}`);
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
