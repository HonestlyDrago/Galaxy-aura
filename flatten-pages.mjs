import fs from "fs/promises";
import path from "path";

const targetDir = path.resolve(process.cwd(), "client/src/pages/public");

const mapping = {
    "shop/page.tsx": "ShopPage.tsx",
    "cart/page.tsx": "CartPage.tsx",
    "checkout/page.tsx": "CheckoutPage.tsx",
    "account/page.tsx": "AccountPage.tsx",
    "orders/page.tsx": "OrdersPage.tsx",
    "orders/[id]/page.tsx": "OrderDetailPage.tsx",
    "product/[id]/page.tsx": "ProductDetailPage.tsx",
    "page.tsx": "AccountPage.tsx" // Wait, I saw page.tsx in the root of public/ earlier which was AccountPage. I'll just delete it since we will copy account/page.tsx to AccountPage.tsx
};

async function main() {
    for (const [relativePath, newName] of Object.entries(mapping)) {
        const oldPath = path.join(targetDir, relativePath);
        const newPath = path.join(targetDir, newName);

        try {
            if (relativePath === "page.tsx") {
                await fs.unlink(oldPath);
                console.log(`Deleted stray ${relativePath}`);
                continue;
            }

            await fs.rename(oldPath, newPath);
            console.log(`Moved ${relativePath} -> ${newName}`);
        } catch (e) {
            console.log(`Failed for ${relativePath}: ${e.message}`);
        }
    }

    // Cleanup empty dirs
    const dirs = ["shop", "cart", "checkout", "account", "orders/[id]", "orders", "product/[id]", "product"];
    for (const dir of dirs) {
        try {
            await fs.rmdir(path.join(targetDir, dir));
            console.log(`Removed dir ${dir}`);
        } catch (e) {
            // Ignore
        }
    }
}

main().catch(console.error);
