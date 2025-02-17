import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("http://localhost:4321");
});

test.describe("New CV", () => {
	test("should generate pdf from astro page", async ({ page }) => {
		// Generates a PDF with 'print' media type.
		await page.emulateMedia({ media: "print" });
		const pdfBuffer = await page.pdf({
			path: "playwright-result/CV.pdf",
			format: "A4",
			printBackground: true,
			preferCSSPageSize: true,
		});

		// Verify that the PDF was generated
		expect(pdfBuffer.length).toBeGreaterThan(0);
		console.log("PDF successfully generated as CV.pdf");
	});
});
