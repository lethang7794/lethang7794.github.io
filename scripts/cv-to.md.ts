import fs from "fs";

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
		highlights: string[];
		responsibilities: string[];
		achievements: string[];
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
	let md = `# ${resume.basics.name}<br/>(${resume.basics.label})\n\n`;

	md += `## Summary\n\n`;
	resume.basics.summaries?.forEach((highlight) => {
		md += `- ${highlight}\n`;
	});
	md += `\n`;

	md += `## Contacts\n\n`;
	md += `- **Email:** ${resume.basics.email}  \n`;
	md += `- **Phone:** ${resume.basics.phone}  \n`;
	md += `- **Website:** [${resume.basics.website}](${resume.basics.website})  \n`;
	md += `- **Location:** ${resume.basics.location.city}, ${resume.basics.location.region}\n\n`;

	md += `## Profiles\n\n`;
	resume.basics.profiles.forEach((profile) => {
		md += `- **${profile.network}:** [${profile.username}](${profile.url})\n`;
	});
	md += `\n`;

	md += `## Work Experience\n\n`;
	resume.work.forEach((job) => {
		md += `### ${job.company} - ${job.position} (${job.startDate} - ${job.endDate || "Present"})\n\n`;
		md += `#### Summary\n\n`;
		md += `- ${job.summary}\n\n`;
		md += `#### Responsibilities <!-- markmap: fold -->\n\n`;
		job.responsibilities?.forEach((item) => {
			md += `- ${item}\n`;
		});
		md += `#### Achievements\n\n`;
		job.achievements.forEach((item) => {
			md += `- ${item}\n`;
		});
		md += `\n`;
	});

	md += `## Projects\n\n`;
	resume.projects.forEach((project) => {
		md += `### [${project.name}](${project.url})\n\n`;
		md += `${project.description}\n\n`;
		project.highlights.forEach((highlight) => {
			md += `- ${highlight}\n`;
		});
		md += `\n`;
	});

	md += `## Skills\n\n`;
	resume.skills.forEach((skill) => {
		md += `### ${skill.name} <!-- markmap: fold -->\n\n`;
		md += skill.keywords.map((k) => `- ${k}`).join("\n") + "\n\n";
	});

	md += `## Education\n\n`;
	resume.education.forEach((edu) => {
		md += `### ${edu.institution} - ${edu.area} (${edu.startDate} - ${edu.endDate}) <!-- markmap: fold -->\n\n`;
		edu.highlights?.forEach((highlight) => {
			md += `- ${highlight}\n`;
		});
		md += `\n`;
	});

	md += `## Certificates\n\n`;
	resume.certificates.forEach((item) => {
		md += `### ${item.name} <!-- markmap: fold -->\n\n`;
		if (item.url) {
			md += `- [Verify](${item.url})\n\n`;
		}
		md += `- ${item.issuer}\n\n`;
		md += `- ${item.date}\n\n`;
	});

	md += `## Languages\n\n`;
	resume.languages.forEach((lang) => {
		md += `- **${lang.language}**: ${lang.fluency}\n`;
	});

	md += `\n## Interests\n\n`;
	resume.interests.forEach((interest) => {
		md += `- ${interest.name}\n`;
	});

	return md;
}

// Read the JSON file and generate Markdown
const inputJson = fs.readFileSync("../cv.json", "utf-8");
const resume: Resume = JSON.parse(inputJson);
const markdownOutput = convertToMarkdown(resume);

fs.writeFileSync("output.md", markdownOutput);

console.log("Markdown file generated as output.md");
