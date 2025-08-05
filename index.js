const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const path = require("path");

// A função que gera o HTML permanece a mesma.
function getHtmlForResume(data) {
	const createExperienceHtml = (experiences) =>
		experiences
			.map(
				(exp) => `
        <div class="item">
            <div class="item-header">
                <span class="job-role">${exp.role}</span>
                <span class="company-location">${exp.company} | ${
					exp.location
				}</span>
            </div>
            <div class="item-subheader">
                <span class="period">${exp.period}</span>
            </div>
            <ul class="description-list">
                ${exp.description.map((desc) => `<li>${desc}</li>`).join("")}
            </ul>
            ${
				exp.links
					? `<div class="links">Links: <a href="${exp.links.googlePlay}">Google Play</a> | <a href="${exp.links.website}">Website</a></div>`
					: ""
			}
        </div>
    `
			)
			.join("");

	const createEducationHtml = (educations) =>
		educations
			.map(
				(edu) => `
        <div class="item education-item">
            <div class="item-header">
                <span class="job-role">${edu.institution}</span>
                <span class="period">${edu.graduation}</span>
            </div>
            <p class="degree">${edu.degree}</p>
        </div>
    `
			)
			.join("");

	return `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Currículo - ${data.fullName}</title>
            <style>
                :root {
                    /* Variáveis para controle fino dos ajustes */
                    --base-font-size: 16px;
                    --line-height: 1.5;
                    --section-margin-bottom: 1.5rem;
                    --item-margin-bottom: 1.25rem;
                    --container-padding: 15mm;
                    --header-margin-bottom: 2rem;
                }
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Helvetica Neue', Arial, sans-serif;
                    background-color: #fff;
                    color: #333;
                    font-size: var(--base-font-size);
                    line-height: var(--line-height);
                    -webkit-print-color-adjust: exact;
                }
                #resume-container {
                    width: 210mm;
                    padding: var(--container-padding);
                    transform-origin: top left; /* Essencial para a escala de fallback */
                }
                header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--header-margin-bottom); }
                .header-left .name { font-size: 2.5rem; font-weight: 700; color: #000; line-height: 1.1; }
                .header-left .title { font-size: 1.5rem; font-weight: 300; color: #555; }
                .contact-info { text-align: right; font-size: 0.9rem; }
                .contact-info a { text-decoration: none; color: #333; }
                section { margin-bottom: var(--section-margin-bottom); }
                .section-title { font-size: 1.25rem; font-weight: 700; color: #000; text-transform: uppercase; margin-bottom: 0.5rem; padding-bottom: 0.25rem; border-bottom: 2px solid #000; }
                .item { margin-bottom: var(--item-margin-bottom); page-break-inside: avoid; }
                .item:last-child { margin-bottom: 0; }
                .item-header { display: flex; justify-content: space-between; align-items: baseline; }
                .job-role { font-size: 1.1rem; font-weight: 700; }
                .period { font-size: 0.9rem; font-style: italic; color: #555; }
                .description-list { margin-left: 1.25rem; }
            </style>
        </head>
        <body>
            <div id="resume-container">
                <header>
                    <div class="header-left">
                        <h1 class="name">${data.fullName}</h1>
                        <p class="title">${data.jobTitle}</p>
                    </div>
                    <div class="contact-info">
                        <p><a href="https://${data.contact.linkedin}">${
		data.contact.linkedin
	}</a></p>
                        <p><a href="https://${data.contact.github}">${
		data.contact.github
	}</a></p>
                        <p>${data.contact.location}</p>
                        <p><a href="mailto:${data.contact.email}">${
		data.contact.email
	}</a></p>
                    </div>
                </header>
                <main>
                    <section class="summary"><h2 class="section-title">Summary</h2><p>${
						data.summary
					}</p></section>
                    <section class="skills"><h2 class="section-title">Skills</h2><div>${data.skills
						.map(
							(skill) =>
								`<p><strong>${skill.category}:</strong> ${skill.list}</p>`
						)
						.join("")}</div></section>
                    <section class="experience"><h2 class="section-title">Experience</h2>${createExperienceHtml(
						data.experience
					)}</section>
                    <section class="education"><h2 class="section-title">Education</h2>${createEducationHtml(
						data.education
					)}</section>
                    <section class="languages"><h2 class="section-title">Languages</h2><p class="languages-content">${data.languages
						.map(
							(lang) =>
								`<strong>${lang.language}:</strong> ${lang.proficiency}`
						)
						.join(" | ")}</p></section>
                </main>
            </div>
        </body>
        </html>`;
}

// NOVA LISTA DE AJUSTES - MAIS AGRESSIVA E EFICAZ
const adjustments = [
	{
		level: 1,
		description: "Reduzindo margens verticais (seções e itens)",
		css: ":root { --section-margin-bottom: 1.2rem; --item-margin-bottom: 1.0rem; }",
	},
	{
		level: 2,
		description: "Reduzindo altura da linha global e margem do header",
		css: ":root { --line-height: 1.4; --header-margin-bottom: 1.5rem; }",
	},
	{
		level: 3,
		description: "Reduzindo fonte base para 15.5px",
		css: ":root { --base-font-size: 15.5px; }",
	},
	{
		level: 4,
		description: "Reduzindo padding do contêiner para 12mm",
		css: ":root { --container-padding: 12mm; }",
	},
	{
		level: 5,
		description: "Reduzindo mais as margens verticais",
		css: ":root { --section-margin-bottom: 1.0rem; --item-margin-bottom: 0.8rem; }",
	},
	{
		level: 6,
		description: "Reduzindo fonte base para 15px",
		css: ":root { --base-font-size: 15px; }",
	},
	{
		level: 7,
		description: "Reduzindo drasticamente padding para 10mm",
		css: ":root { --container-padding: 10mm; }",
	},
	{
		level: 8,
		description: "Reduzindo fonte base final para 14.5px",
		css: ":root { --base-font-size: 14.5px; }",
	},
];

async function generateResumes() {
	const inputDir = path.join(__dirname, "inputs");
	const outputDir = path.join(__dirname, "outputs");
	await fs.mkdir(outputDir, { recursive: true });

	console.log("Iniciando o gerador de currículos...");
	const browser = await puppeteer.launch({
		headless: true,
		args: ["--no-sandbox"],
	});

	try {
		const files = await fs.readdir(inputDir);
		const jsonFiles = files.filter(
			(file) => path.extname(file).toLowerCase() === ".json"
		);
		if (jsonFiles.length === 0) {
			console.log("Nenhum arquivo .json encontrado.");
			return;
		}

		console.log(
			`Encontrados ${jsonFiles.length} arquivos JSON. Iniciando a conversão...`
		);
		const A4_HEIGHT_PX = 1123;

		for (const file of jsonFiles) {
			console.log(`\n--- Processando ${file} ---`);

			const inputFile = path.join(inputDir, file);
			const outputFileName = `${path.parse(file).name}.pdf`;
			const outputFile = path.join(outputDir, outputFileName);

			const jsonData = await fs.readFile(inputFile, "utf-8");
			const data = JSON.parse(jsonData);
			const htmlContent = getHtmlForResume(data);
			const page = await browser.newPage();

			await page.setContent(htmlContent, { waitUntil: "networkidle0" });

			let currentAdjustmentLevel = 0;
			let finalHeight = 0;

			while (currentAdjustmentLevel < adjustments.length) {
				const contentHeight = await page.evaluate(
					() =>
						document.getElementById("resume-container").scrollHeight
				);
				finalHeight = contentHeight;

				if (contentHeight <= A4_HEIGHT_PX) {
					console.log(
						`✅ O conteúdo coube na página! Altura final: ${contentHeight.toFixed(
							2
						)}px.`
					);
					break;
				}

				const adjustment = adjustments[currentAdjustmentLevel];
				console.log(
					`[Tentativa ${
						adjustment.level
					}] Altura: ${contentHeight.toFixed(2)}px. Aplicando: "${
						adjustment.description
					}"`
				);
				await page.addStyleTag({ content: adjustment.css });
				await new Promise((resolve) => setTimeout(resolve, 50));

				currentAdjustmentLevel++;
			}

			// Re-medir uma última vez após o loop
			finalHeight = await page.evaluate(
				() => document.getElementById("resume-container").scrollHeight
			);

			// OPÇÃO NUCLEAR: Se ainda não coube após todos os ajustes, aplicar uma escala mínima.
			if (finalHeight > A4_HEIGHT_PX) {
				const scale = A4_HEIGHT_PX / finalHeight;
				console.warn(
					`AVISO: Ajustes de reflow insuficientes. Altura final: ${finalHeight.toFixed(
						2
					)}px.`
				);
				console.warn(
					`Aplicando fallback de escala (${scale.toFixed(
						3
					)}) para garantir página única.`
				);
				await page.evaluate((scaleValue) => {
					const container =
						document.getElementById("resume-container");
					container.style.transform = `scale(${scaleValue})`;
				}, scale);
			}

			await page.pdf({
				path: outputFile,
				width: "210mm",
				height: "297mm",
				printBackground: true,
			});

			await page.close();
			console.log(`📄 PDF gerado e salvo em: ${outputFile}`);
		}
	} catch (error) {
		console.error("Ocorreu um erro durante o processo:", error);
	} finally {
		await browser.close();
		console.log("\n--- Processo finalizado ---");
	}
}

generateResumes();
