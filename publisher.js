const Redis = require('ioredis');

// Create one Redis client for subscribing
const redisSub = new Redis({
  host: 'localhost',
  port: 6379,
  // Add `family: 4` if you are using IPv4 in WSL (optional)
});

// Create a separate Redis client for publishing
const redisPub = new Redis({
  host: 'localhost',
  port: 6379,
});

// Function to simulate sending notifications to users
function sendNotification(userId, message) {
  redisPub.publish(`user_${userId}_notifications`, message);  // Use redisPub for publishing
  console.log(`Published to user_${userId}_notifications: ${message}`);
}

// Subscribe to 'likes' channel (this is where subscriber will publish "like" actions)
const channel = 'likes';

redisSub.subscribe(channel, (err, count) => {
  if (err) {
    console.error('Error subscribing to likes channel:', err);
  }
  console.log(`Subscribed to ${count} channel(s)`);
});

// When a message is received on the 'likes' channel, it means someone liked a post
redisSub.on('message', (channel, message) => {
  if (channel === 'likes') {
    // Message format: "userId:postId"
    const [userId, postId] = message.split(':');
    const notificationMessage = `User ${userId} liked your post! (Post ID: ${postId})`;
    
    // Simulate sending a notification to the post owner (e.g., user 1000)
    sendNotification(1000, notificationMessage);  // Use redisPub for publishing notifications
  }
});
