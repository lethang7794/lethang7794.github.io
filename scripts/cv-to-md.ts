import fs from "fs";
import path from "path";

interface Resume {
	basics: {
		name: string;
		label: string;
		email: string;
		phone: string;
		website: string;
		summary?: string;
		summaries?: string[];
		location: { city: string; region: string };
		profiles: { network: string; username: string; url: string }[];
	};
	work: {
		company: string;
		position: string;
		startDate: string;
		endDate?: string;
		summary: string;
		summary_md: string;
		highlights: string[];
		responsibilities: string[];
		responsibilities_md: string[];
		achievements: string[];
		achievements_md: string[];
	}[];
	education: {
		institution: string;
		area: string;
		startDate: string;
		endDate: string;
		highlights: string[];
	}[];
	projects: {
		name: string;
		description: string;
		url: string;
		highlights: string[];
		skills?: string[];
	}[];
	skills: { name: string; keywords: string[] }[];
	certificates: {
		name: string;
		issuer: string;
		date: string;
		url?: string;
		url_verify?: string;
	}[];
	languages: { language: string; fluency: string }[];
	interests: { name: string }[];
}

function convertToMarkdown(resume: Resume): string {
	let md = `<!--
Generated automated from cv.json. Don't edit. 
To update modify 'cv-to-md.ts' then run 'pnpm run gen-markmap'
-->

`;

	md += `# [**${resume.basics.name}**](${resume.basics.website}) (_${resume.basics.label}_)\n\n`;

	const mindmap = resume.basics.profiles.filter(
		(item) => item.network?.toLowerCase() === "mindmap",
	)[0];
	const cv = resume.basics.profiles.filter(
		(item) => item.network?.toLowerCase() === "cv",
	)[0];

	if (resume.basics.website || cv || mindmap) {
		md += `## **Also available as**\n\n`;
		if (resume.basics.website) {
			md += `- Website: [${resume.basics.website}](${resume.basics.website})\n`;
		}
		if (cv) {
			md += `- PDF: [${cv.url}](${cv.url})\n`;
		}
		if (mindmap) {
			md += `- Mind map: [${mindmap.url}](${mindmap.url}) (You're viewing this)\n`;
		}
		md += `\n`;

		md += `## **About**\n\n`;
		resume.basics.summaries?.forEach((highlight) => {
			md += `- _${highlight}_\n`;
		});
		md += `\n`;
	}

	md += `## **Contacts**\n\n`;
	md += `- Email: [${resume.basics.email}](mailto:${resume.basics.email})\n`;
	md += `- Phone: [${resume.basics.phone}](tel:${resume.basics.phone?.replaceAll(" ", "")})\n`;
	md += `- Website: [${resume.basics.website}](${resume.basics.website})\n`;
	md += `- Location: ${resume.basics.location.city}, ${resume.basics.location.region}\n\n`;

	md += `## **Profiles**\n\n`;
	resume.basics.profiles
		.filter(
			(item) =>
				!["cv", "mindmap", "website"].includes(item.network.toLowerCase()),
		)
		.forEach((profile) => {
			md += `- ${profile.network}: [${profile.username}](${profile.url})\n`;
		});
	md += `\n`;

	md += `## [**Experience**](${resume.basics.website}#Experience)\n\n`;
	resume.work.forEach((job) => {
		md += `### **${job.position}** - _${job.company}_ (${job.startDate} - ${job.endDate || "Present"})\n\n`;
		md += `#### Summary\n\n`;
		md += `- ${job.summary_md || job.summary}\n\n`;

		const responsibilities = job.responsibilities_md || job.responsibilities;
		if (responsibilities?.length > 0) {
			md += `#### Responsibilities <!-- markmap: fold -->\n\n`;
			responsibilities?.forEach((item) => {
				md += `- ${item}\n`;
			});
			md += `\n`;
		}

		const achievements = job.achievements_md || job.achievements;
		if (achievements?.length > 0) {
			md += `#### Achievements\n\n`;
			achievements.forEach((item) => {
				md += `- ${item}\n`;
			});
		}
		md += `\n`;
	});

	md += `## [**Projects**](${resume.basics.website}#Projects)\n\n`;
	resume.projects.forEach((project) => {
		md += `### [${project.name}](${project.url})\n\n`;
		md += `#### ${project.description} <!-- markmap: fold -->\n\n`;
		md += `##### Highlights\n\n`;
		project.highlights.forEach((highlight) => {
			md += `- ${highlight}\n`;
		});
		if (project.skills) {
			md += `##### Skills\n\n`;
			md += `- ${project.skills.join(" · ")}\n\n`;
		}
		md += `\n`;
	});

	md += `## [**Skills**](${resume.basics.website}#Skills)\n\n`;
	resume.skills.forEach((skill) => {
		md += `### **${skill.name}**\n\n`;
		md += `- ${skill.keywords.join(" · ")}\n\n`;
	});

	md += `## [**Education**](${resume.basics.website}#Education)\n\n`;
	resume.education.forEach((edu) => {
		md += `### **${edu.institution}** - _${edu.area}_ (${edu.startDate} - ${edu.endDate}) <!-- markmap: fold -->\n\n`;
		edu.highlights?.forEach((highlight) => {
			md += `- ${highlight}\n`;
		});
		md += `\n`;
	});

	md += `## [**Certificates**](${resume.basics.website}#Certificates)\n\n`;
	resume.certificates.forEach((item) => {
		md += `### **${item.name}** <!-- markmap: fold -->\n\n`;
		if (item.url) {
			md += `- [Verify](${item.url})\n\n`;
		}
		md += `- ${item.issuer}\n\n`;
		md += `- ${item.date}\n\n`;
	});

	md += `## **Languages**\n\n`;
	resume.languages.forEach((lang) => {
		md += `- **${lang.language}**: ${lang.fluency}\n`;
	});
	md += "\n";

	md += `## **Interests**\n\n`;
	resume.interests.forEach((interest) => {
		md += `- ${interest.name}\n`;
	});
	md += "\n";

	const time = process.env.TIME;
	const now = new Date();
	const nowStr = now.toDateString();
	if (time !== "") {
		md += `## Last updated\n\n`;
		md += `- ${time === undefined ? nowStr : time}\n`;
	}

	return md;
}

/**
 * Reads a file and writes its content to another file.
 * @param inputFilePath - Path to the source file
 * @param outputFilePath - Path to the destination file
 */
function transformJsonToMarkmap(
	inputFilePath: string,
	outputFilePath: string,
): void {
	try {
		const data = fs.readFileSync(inputFilePath, "utf8");
		const resume: Resume = JSON.parse(data);
		const markdownOutput = convertToMarkdown(resume);
		fs.writeFileSync(outputFilePath, markdownOutput);
		console.log("🚀 Transformed from cv.json to markmap.md");
	} catch (err) {
		console.error("Error processing the file:", err);
	}
}

const inputFile = path.join(path.resolve(), "./cv.json");
const outputFile = path.join(path.resolve(), "./src/markmap.md");
transformJsonToMarkmap(inputFile, outputFile);
