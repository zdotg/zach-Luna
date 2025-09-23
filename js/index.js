// Add Footer Element using DOM manipulation
const body = document.getElementsByTagName("body")[0];
const footer = document.createElement("footer");
body.appendChild(footer);

// Insert Copyright Text in Footer
const today = new Date();
const thisYear = today.getFullYear();
const footerElement = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `© Zach Gallman ${thisYear}`;
footerElement.appendChild(copyright);

// Create List of Skills
const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "HTML",
    "CSS",
    "Git",
    "GitHub",
    "Framer Motion",
    "p5.js",
    "UI/UX Design",
    "Brand Identity"
];

const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}