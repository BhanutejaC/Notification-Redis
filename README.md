# Notification-Redis
Backend Server
For the backend, we'll use Node.js with Socket.IO to communicate with the frontend and ioredis or node-redis to interact with Redis.

Install Node.js (if not already installed):

sudo apt install nodejs npm
Set up a new Node.js project:

mkdir social-media-notifications
cd social-media-notifications
npm init -y
npm install express socket.io ioredis



Step-by-Step:
Start Redis: Make sure Redis is running on your system:

bash
Copy code
sudo service redis-server start
Run publisher.js: In one terminal window/tab, start the publisher:

bash
Copy code
node publisher.js
This will now correctly subscribe to the likes channel and publish notifications when a "like" action is detected.

Run subscriber.js: In another terminal window/tab, run the subscriber:

bash
Copy code
node subscriber.js