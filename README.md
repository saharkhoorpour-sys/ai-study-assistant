AI Study Assistant Web Application
AuraStudy is a web-based AI study assistant designed to support students in a more focused, structured, and approachable way. The goal of this project was to move beyond a generic chatbot and instead create a tool that functions as a study partner. While many AI systems provide general responses, AuraStudy is designed specifically for academic use, helping users understand concepts, summarize information, and actively test their knowledge.
The application was developed with the idea that students often struggle not because of lack of information, but because of how that information is presented. AuraStudy addresses this by simplifying complex ideas, guiding users through topics step by step, and encouraging active engagement through features such as quizzes and summaries. This makes the learning process feel more manageable and less overwhelming.
In addition to functionality, a strong emphasis was placed on user experience. The interface was intentionally designed to feel calm, supportive, and visually engaging through the use of soft colors, spacing, and an animated aura background. These design choices were made to create an environment that encourages focus and reduces stress, making the application feel more like a study companion rather than a technical tool.
Live Application
You can access the deployed application here:
https://ai-study-assistant-sahar-hxfecwgjgqhjg0cf.canadacentral-01.azurewebsites.net
This deployment demonstrates the full implementation of the system in a real cloud environment, allowing the application to be accessed and used outside of a local development setup.
Problem and Proposed Solution
Although AI tools are widely available, they are often not tailored to student needs. Many platforms provide answers, but they do not guide learning or encourage understanding. This creates a gap where students receive information without actually engaging with it.
AuraStudy addresses this problem by acting as a structured academic assistant. It supports different types of learning by allowing users to:
•	request simplified explanations 
•	summarize large amounts of information 
•	generate quiz style questions for practice 
By doing this, the application transforms AI from a passive answering tool into an active learning support system. It encourages students to interact with the material, reinforcing understanding rather than simply providing solutions.
Key Features
•	Explanation mode to break down complex concepts into simpler terms 
•	Summarization mode to condense notes into key ideas 
•	Quiz mode to test understanding and reinforce learning 
•	Clean and calming user interface designed for focus 
•	Interactive elements such as prompt suggestions and mode selection 
•	Fallback response system to maintain functionality without live API access 
System Architecture and Technology Stack
The application follows a full stack architecture consisting of a frontend, backend, and API integration.
Frontend:
The frontend was built using HTML, CSS, and JavaScript. It provides an interactive interface where users can input questions and view responses. Special attention was given to layout, spacing, and typography to ensure clarity and usability.
Backend:
The backend was developed using Node.js with Express. It handles incoming requests from the frontend, processes user input, and manages communication with the AI system or fallback logic.
API Integration:
The application was originally connected to the Anthropic Claude API to generate AI responses. This demonstrates an understanding of how external APIs are used within web applications.
Deployment:
The application was deployed using Microsoft Azure, allowing it to run in a live environment and be accessed through a public URL.
How the Application Works
1.	The user enters a question, notes, or a request such as a quiz 
2.	The frontend sends this input to the backend through an API route 
3.	The backend processes the request and determines how to respond 
4.	If the AI API is available, it attempts to retrieve a response 
5.	If the API is unavailable, a fallback system generates a structured response 
6.	The response is sent back to the frontend and displayed to the user 
This flow demonstrates client server communication and how data moves through a web application.
API Limitation and Adaptation
One of the main challenges in this project was the limitation of the AI API. The Anthropic Claude API requires paid access for live responses in a deployed environment. This meant that the application could not rely on real time API calls once deployed.
To address this, a fallback response system was implemented in the backend. This system generates structured responses based on user input, allowing the application to remain fully functional and usable. While it does not replace a full AI model, it effectively demonstrates how an AI powered system would behave in practice.
This approach reflects real world development, where engineers must adapt to constraints while maintaining system usability and reliability.
Design and User Experience Considerations
A major focus of this project was making the application feel approachable and supportive rather than overwhelming. The design incorporates a soft aura themed background created using layered gradients and subtle animation. This creates a sense of depth and calmness, helping users stay engaged.
Additional design decisions include:
•	centered and balanced layout to avoid clutter 
•	consistent font usage for readability 
•	interactive buttons for different study modes 
•	visual feedback such as loading indicators and response sections 
These elements work together to create a user experience that is both intuitive and visually appealing.
Folder Structure
ai-study-assistant
server.js
package.json
.env.example
.gitignore
README.md
public
index.html
css
style.css
js
script.js
Running the Application
Install dependencies using npm install
Start the server using npm start
Open the application in a browser at:
https://ai-study-assistant-sahar-hxfecwgjgqhjg0cf.canadacentral-01.azurewebsites.net
What This Project Demonstrates
This project demonstrates an understanding of key web development concepts, including:
•	client server communication 
•	API integration and limitations 
•	backend logic and routing 
•	error handling and fallback systems 
•	cloud deployment using Azure 
•	user interface and user experience design 
It also reflects the ability to apply theoretical concepts in a practical and meaningful way.
Final Outcome
AuraStudy represents a complete web application that combines technical implementation with thoughtful design. It goes beyond basic functionality by focusing on how users interact with the system and how it supports learning.
Even with real world constraints such as API limitations, the application remains functional and clearly demonstrates how an AI supported system can be designed, adapted, and deployed. Overall, this project highlights both technical understanding and the ability to create a purposeful and user centered application.

