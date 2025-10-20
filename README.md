TradingView to Telegram Webhook

A simple, free, and self-hosted solution to send alerts from TradingView directly to a Telegram chat or channel.

This project uses a lightweight Node.js server hosted on the free tier of Render to act as a bridge between TradingView's webhook notifications and the Telegram Bot API.

Features

Completely Free: Utilizes the free tiers of Render, GitHub, and Telegram.

Instant Notifications: Get your TradingView alerts delivered to any Telegram channel or chat in real-time.

Easy to Deploy: A step-by-step guide makes setup straightforward, even for non-developers.

Reliable: Includes instructions for setting up a free uptime monitor to prevent the server from sleeping.

Secure: Your API keys and secrets are stored safely as environment variables and are not exposed in the code.

How It Works

A Telegram Bot is created to act as the sender of the alerts.

A Node.js/Express server is deployed on Render. This server has a single endpoint (/webhook).

TradingView is configured to send a POST request to this /webhook URL whenever an alert is triggered.

The server receives the request and immediately forwards the message to your specified Telegram chat or channel via the Telegram Bot API.

Quick Setup Guide

For a detailed walkthrough, please refer to the instructions.md file.

Get Telegram Credentials:

Create a new bot using @BotFather on Telegram to get your Bot Token.

Create a new channel, add the bot as an administrator, and find your Chat ID.

Deploy the Server:

Fork this repository or create your own on GitHub with the provided server.js and package.json files.

Sign up for Render using your GitHub account.

Create a new "Web Service" on Render, connecting it to your repository.

Use the following settings:

Runtime: Node

Build Command: npm install

Start Command: node server.js

Add your TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID as environment variables in the "Advanced" settings.

Deploy the service and copy the provided URL (e.g., https://your-app.onrender.com).

Configure TradingView:

In your TradingView alert settings, enable the "Webhook URL" option.

Paste your Render URL, adding /webhook to the end (e.g., https://your-app.onrender.com/webhook).

Create your alert.

Keep it Alive (Crucial):

Sign up for a free monitoring service like UptimeRobot.

Set up a new HTTP(s) monitor to ping your base Render URL (e.g., https://your-app.onrender.com) every 5 minutes. This prevents the free instance from spinning down.

Technology Stack

Backend: Node.js, Express.js

Hosting: Render

Version Control: Git & GitHub

Configuration

The following environment variables are required for the server to function:

TELEGRAM_BOT_TOKEN: Your unique token from BotFather.

TELEGRAM_CHAT_ID: The ID of the channel or chat where messages should be sent.
