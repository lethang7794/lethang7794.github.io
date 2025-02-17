import fs from "fs";

// Load JSON data
const file = fs.readFileSync("../cv.json");
const jsonData = JSON.parse(file.toString());
console.log("🚀 ~ jsonData:", jsonData);

// Function to convert JSON to Markdown for Markmap
// function jsonToMarkmap(json) {
// 	let markdown = `# ${json.basics.name}\n`;
// 	markdown += `## ${json.basics.label}\n`;
// 	markdown += `- **Email:** ${json.basics.email}\n`;
// 	markdown += `- **Phone:** ${json.basics.phone}\n`;
// 	markdown += `- **Website:** [${json.basics.website}](${json.basics.website})\n`;
// 	markdown += `- **Location:** ${json.basics.location.city}, ${json.basics.location.region}\n`;

// 	markdown += `## Profiles\n`;
// 	json.basics.profiles.forEach((profile) => {
// 		markdown += `- **${profile.network}:** [${profile.username}](${profile.url})\n`;
// 	});

// 	markdown += `## Work Experience\n`;
// 	json.work.forEach((job) => {
// 		markdown += `### ${job.company} - ${job.position} (${job.startDate} - ${job.endDate})\n`;
// 		markdown += `- ${job.summary}\n`;
// 		markdown += `#### Highlights\n`;
// 		job.highlights.forEach((highlight) => {
// 			markdown += `  - ${highlight}\n`;
// 		});
// 		markdown += `#### Skills\n`;
// 		job.skills.forEach((skill) => {
// 			markdown += `  - ${skill}\n`;
// 		});
// 	});

// 	markdown += `## Education\n`;
// 	json.education.forEach((edu) => {
// 		markdown += `### ${edu.institution} (${edu.startDate} - ${edu.endDate})\n`;
// 		markdown += `- **Field of Study:** ${edu.area}\n`;
// 		if (edu.studyType) markdown += `- **Study Type:** ${edu.studyType}\n`;
// 		markdown += `#### Highlights\n`;
// 		if (Array.isArray(edu.highlights)) {
// 			edu.highlights.forEach((highlight) => {
// 				markdown += `  - ${highlight}\n`;
// 			});
// 		} else {
// 			markdown += `  - ${edu.highlights}\n`;
// 		}
// 	});

// 	return markdown;
// }

// Function to convert JSON to Markdown for Markmap
function jsonToMarkmap(data, depth = 0) {
	let markdown = "";
	const indent = "  ".repeat(depth);

	if (typeof data === "string") {
		return `${indent}- ${data}\n`;
	} else if (Array.isArray(data)) {
		data.forEach((item) => {
			markdown += jsonToMarkmap(item, depth);
		});
	} else if (typeof data === "object") {
		for (const key in data) {
			if (typeof data[key] === "object" || Array.isArray(data[key])) {
				markdown += `${indent}- **${key}**\n`;
				markdown += jsonToMarkmap(data[key], depth + 1);
			} else {
				markdown += `${indent}- **${key}:** ${data[key]}\n`;
			}
		}
	}
	return markdown;
}

// Convert JSON to Markdown
const markdownContent = jsonToMarkmap(jsonData);

// Save to file
fs.writeFileSync("output.md", markdownContent);

console.log("Markdown file generated successfully!");
