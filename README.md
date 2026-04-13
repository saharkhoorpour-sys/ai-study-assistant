AI Study Assistant Web Application

AuraStudy is a web-based AI study assistant designed to support students in a more focused and approachable way. Unlike general AI chat tools, AuraStudy is built specifically around the learning process, helping users understand concepts, summarize notes, and test their knowledge through interactive study modes.

The application combines a simple and intuitive interface with a calm and visually engaging design to create a more supportive study environment. Through features such as explanation, summarization, and quiz modes, AuraStudy encourages active learning rather than passive information consumption.

While many AI tools already exist, most are not designed specifically for students. AuraStudy addresses this gap by acting as a study partner rather than just a chatbot. It is designed to respond in a clear, academic, and supportive way, helping users understand material instead of just receiving answers. The overall experience is intended to make studying feel less overwhelming and more structured.

Features

Explain complex concepts in simple terms
Summarize notes clearly and efficiently
Generate quiz style questions for practice
Provide a clean and calming user interface
Support different learning styles through multiple modes
Maintain functionality through a fallback response system

Technology Stack

Frontend: HTML, CSS, JavaScript
Backend: Node.js with Express
Deployment: Microsoft Azure
AI Integration: Anthropic Claude API with fallback system

How the Application Works

The user enters a question, notes, or a request such as a quiz. The frontend sends this input to the backend server through an API route. The backend processes the request and attempts to retrieve a response using the AI API. If the API is not available, a fallback system generates a structured response so that the application remains functional. The response is then displayed to the user in a clear and organized format.

API Limitation and Solution

The application was originally connected to the Anthropic Claude API to generate real time responses. However, the API requires paid access, which limited its use in a deployed environment. To address this, a fallback response system was implemented in the backend. This ensures that the application continues to provide meaningful output and demonstrates how an AI system would behave, even without live API access. This reflects real world development where systems must remain usable despite external limitations.

Design Approach

A key focus of this project was improving the user experience in addition to functionality. The interface uses a soft aura themed background created with layered gradients and subtle animation to create a calm and visually supportive environment. This was intentionally designed to make the application feel more welcoming and less overwhelming for students.

Additional design decisions include a clear layout, consistent typography, interactive buttons, and visual feedback. These elements help ensure that the application is intuitive and easy to use while still feeling polished and unique.

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
Open the application in a browser at ai-study-assistant-sahar-hxfecwgjgqhjg0cf.canadacentral-01.azurewebsites.net

What This Project Demonstrates

This project demonstrates an understanding of client server communication, API based architecture, backend logic, error handling, and deployment. It also reflects the ability to design a user focused application that remains functional even when working with real world constraints such as API access limitations.

Final Outcome

AuraStudy represents a balance between technical implementation and user experience. It demonstrates how an AI supported web application can be designed to be both functional and meaningful for students, while also considering usability, design, and real world limitations.
