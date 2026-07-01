AI-Powered Knowledge Quiz Builder
Project Overview

AI-Powered Knowledge Quiz Builder is a full-stack web application that automatically generates multiple-choice quizzes for any user-provided topic.
The application allows users to generate quizzes, answer questions, view their score with explanations, and review previously attempted quizzes.

1)System Architecture

The application follows a client-server architecture with AI integration.
           
Architecture Workflow
1)The user enters a quiz topic through the React frontend.
2)The request is sent to the Express backend.
3)The backend retrieves a summary of the topic from the Wikipedia API.
4)The retrieved summary is injected into the prompt sent to the Groq Llama 3 model (lightweight RAG approach).
5)Groq generates five multiple-choice questions in structured JSON format.
6)The quiz is displayed to the user.
7)After submission, the backend evaluates the answers, calculates the score, stores the result in MongoDB Atlas, and returns detailed feedback with explanations.


2)Technical Decisions
Frontend
React.js was chosen for building a responsive and component-based user interface.
React Router is used for navigation between Home, Quiz, Result, and History pages.
Axios is used for communication with backend APIs.
Backend
Node.js and Express.js provide a lightweight REST API for handling quiz generation, submission, and history retrieval.
Business logic is separated into controllers, services, models, and routes to keep the code modular and maintainable.
Database
MongoDB Atlas is used to store quiz attempts, scores, and history.
Mongoose is used for schema definition and database interaction.
AI Integration
The backend communicates with the Groq Llama 3 API to generate quiz questions.
Prompts are designed to request structured JSON responses, making it easy for the frontend to render quizzes.
Retrieval
The Wikipedia REST API is used to retrieve contextual information related to the user-provided topic.
The retrieved summary is included in the prompt before sending it to the LLM.
This lightweight Retrieval-Augmented Generation (RAG) approach improves the factual accuracy of generated questions.


3)AI Tool Selection and Reasoning
AI Tool Used=Groq API (Llama 3)

Why Groq?

The following reasons influenced the selection of Groq:

Fast inference speed, resulting in quick quiz generation.
Free developer tier suitable for MVP development.
Supports structured JSON output, simplifying backend parsing.
Easy REST API integration with Express.js.
Produces high-quality educational questions with minimal prompt engineering.


4)Retrieval Tool=Wikipedia REST API

Why Wikipedia?

Wikipedia was selected because it provides reliable, topic-specific information that can be retrieved in real time.

The retrieved summary is injected into the LLM prompt before quiz generation, which:

Improves factual accuracy
Reduces AI hallucinations
Produces more relevant quiz questions

This implementation follows a lightweight Retrieval-Augmented Generation (RAG) approach without requiring embeddings or a vector database.
