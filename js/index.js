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

// Handle Message Form Submit
const messageForm = document.forms['leave_message'];

messageForm.addEventListener('submit', (event) => {
    // Prevent default form submission behavior (page refresh)
    event.preventDefault();
    
    // Retrieve values from form fields
    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;
    
    // Log the values to console
    console.log('Name:', usersName);
    console.log('Email:', usersEmail);
    console.log('Message:', usersMessage);
    
    // Select the messages section and list
    const messageSection = document.getElementById('messages');
    const messageList = messageSection.querySelector('ul');
    
    // Create new list item
    const newMessage = document.createElement('li');
    
    // Set the inner HTML with name (as clickable email link) and message
    newMessage.innerHTML = `
        <a href="mailto:${usersEmail}">${usersName}</a>
        <span>${usersMessage}</span>
    `;
    
    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.type = 'button';
    
    // Add event listener to remove button
    removeButton.addEventListener('click', () => {
        const entry = removeButton.parentNode;
        entry.remove();
        
        // Optional: Hide messages section if list is empty
        checkMessagesEmpty();
    });
    
    // Append remove button to the message
    newMessage.appendChild(removeButton);
    
    // Append the new message to the list
    messageList.appendChild(newMessage);
    
    // Show messages section if it was hidden
    messageSection.style.display = 'block';
    
    // Reset the form
    messageForm.reset();
});

// Optional: Function to hide messages section when empty
function checkMessagesEmpty() {
    const messageSection = document.getElementById('messages');
    const messageList = messageSection.querySelector('ul');
    
    if (messageList.children.length === 0) {
        messageSection.style.display = 'none';
    }
}

// Optional: Hide messages section on page load if empty
document.addEventListener('DOMContentLoaded', () => {
    checkMessagesEmpty();
});

// Github repository fetch
const GITHUB_USERNAME = 'zdotg';

fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=5`)
    .then(response => {
        if(!response.ok) {
            throw new Error(`Fetch failed! status: ${response.status}`);
        }
        return response.json()
    })
    .then(data => {
        const repositories = data;

        console.log('Github repositories:', repositories);

        const projectSection = document.getElementById('projects');

        const projectList = projectSection.querySelector('ul');

        projectList.innerHTML = '';

        for (let i = 0; i < repositories.length; i++){
            const project = document.createElement('li');

            project.innerText = repositories[i].name;

            projectList.appendChild(project);
        }
    })
    .catch(error => {
        console.error('Error fetching repositories:', error);

        const projectSection = document.getElementById('projects');
        const projectList = projectSection.querySelector('ul');

        const errorItem = document.createElement('li');
        errorItem.innerText = 'Unable to load projects.'
        errorItem.style.color ='red';
        projectList.appendChild(errorItem);
    })