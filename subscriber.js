const Redis = require('ioredis');

// Connect to Redis server
const redis = new Redis({
  host: 'localhost',
  port: 6379
});

// Simulate liking a post (userId: postId)
function likePost(userId, postId) {
  const likeMessage = `${userId}:${postId}`;
  redis.publish('likes', likeMessage);  // Publish the "like" action to Redis
  console.log(`User ${userId} liked post ${postId}`);
}

// Simulate user 123 liking post 789
likePost(123, 789);

// You can extend this by asking for user input to like posts, for example:
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user to like a post
rl.question('Enter user ID: ', (userId) => {
  rl.question('Enter post ID: ', (postId) => {
    likePost(userId, postId);
    rl.close();
  });
});
