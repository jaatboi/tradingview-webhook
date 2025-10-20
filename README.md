System for Transmitting TradingView Alerts to Telegram

Introduction

This document provides a technical overview of a system designed to transmit alerts from the TradingView platform to a designated Telegram channel or chat. The implementation uses a server-side application, hosted on the Render platform, which functions as an intermediary between the TradingView webhook service and the Telegram Bot Application Programming Interface (API).

System Attributes

Cost Efficiency: The solution operates exclusively within the complimentary service tiers offered by Render, GitHub, and Telegram, thereby incurring no monetary costs.

Real-Time Data Transmission: The architecture is designed for the near-instantaneous relay of notifications from the originating platform to the specified Telegram destination.

Streamlined Deployment: The setup protocol enables a structured and methodical deployment process, designed for clarity and efficiency.

Operational Uptime: The guide includes methodologies to ensure persistent service availability, mitigating interruptions from platform-specific inactivity protocols.

Data Security: Sensitive credentials, such as API tokens, are managed as environment variables to ensure confidentiality and prevent their exposure within the codebase.

Operational Architecture

The system operates through a coordinated sequence of processes. First, a Telegram Bot is created to serve as the notification agent. Next, a Node.js server using the Express.js framework is deployed to a hosting environment. This server is configured with a dedicated endpoint to receive incoming webhook data. The TradingView platform is then set up to dispatch a POST request containing the alert payload to this endpoint when a predefined condition is met. Upon receiving the request, the server processes the payload and makes a call to the Telegram Bot API to forward the alert content to the pre-configured Telegram chat identifier.

Deployment and Configuration Protocol

A comprehensive set of instructions is available in the instructions.md document. The following is an abridged version of the procedure.

Acquire Telegram Credentials: The initial phase requires generating a Bot Token through the @BotFather on Telegram. Additionally, a target Chat ID must be identified, which corresponds to the channel or group where the bot has the necessary permissions.

Deploy the Server: The server-side application is deployed on the Render platform. This requires a GitHub repository containing the server.js and package.json files. A new "Web Service" is then created in the Render dashboard, linked to the repository, and configured with the appropriate runtime (Node), build command (npm install), and start command (node server.js). The TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be defined as environment variables in the service's advanced settings. After a successful deployment, a unique URL will be assigned to the service.

Configure TradingView Webhook: In the alert configuration panel on the TradingView platform, the webhook notification option must be enabled. The URL provided by Render, with the /webhook path appended, should be supplied as the target endpoint.

Maintain Service Uptime: To counteract the inactivity spin-down of Render's free hosting tier, the use of an external monitoring service like UptimeRobot is required. A monitor should be configured to send an HTTP(s) request to the base URL of the Render service at regular intervals (e.g., every five minutes) to ensure continuous availability.

Technological Implementation

Backend Framework: Node.js, Express.js

Hosting Provider: Render

Version Control System: Git & GitHub

Configuration Parameters

The following parameters, configured as environment variables, are required for the system to operate:

TELEGRAM_BOT_TOKEN: The unique authentication token provided by BotFather for the designated bot.

TELEGRAM_CHAT_ID: The unique identifier for the target Telegram chat or channel designated to receive notifications.

telegram.me/whojaat
