#!/bin/bash
export PATH=/opt/alt/alt-nodejs22/root/bin:$PATH
export NODE_ENV=production
export PORT=3000

# Ensure we are in the right directory
cd ~/domains/therichgradstudent.com/public_html

# Install only production dependencies (fast, low memory)
npm install --production --no-audit

# Stop any existing multiple instances to free ports
pkill -u u976354198 node || true

# Start the server (using node directly, no pm2 overhead)
nohup node server.js > app.log 2>&1 &

echo "Server started with PID $!"
sleep 5
