# API Utility Usage Guide

## Import

```javascript
import { api } from '@/lib/api';
```

## Authentication

The API utility automatically includes JWT token from localStorage in all requests.

## Available Methods

### Feed

```javascript
// Get personalized home feed
const posts = await api.getHomeFeed();

// Get explore feed (trending + top spaces)
const exploreData = await api.getExploreFeed();
```

### Posts

```javascript
// Get all posts
const posts = await api.getPosts();

// Get single post
const post = await api.getPost(postId);

// Create post
const newPost = await api.createPost({
  content: "Hello world!",
  type: "thought",
  tags: ["javascript", "coding"]
});

// Like/unlike post
await api.likePost(postId);
```

### Comments

```javascript
// Get comments for a post
const comments = await api.getComments(postId);

// Create comment
const newComment = await api.createComment(postId, "Great post!");
```

### User Profile

```javascript
// Get user profile by handle
const profile = await api.getUserProfile("username");
// Returns: { _id, name, handle, postCount, followerCount, followingCount, ... }

// Get user's posts
const userPosts = await api.getUserPosts("username");
```

### Follow System

```javascript
// Toggle follow/unfollow
await api.toggleFollow(userId);

// Get followers
const followers = await api.getFollowers(userId);

// Get following
const following = await api.getFollowing(userId);

// Check if following
const isFollowing = await api.checkFollow(userId);
```

### Bookmarks

```javascript
// Toggle bookmark
await api.toggleBookmark(postId);

// Get user's bookmarks
const bookmarks = await api.getBookmarks();
```

### Spaces

```javascript
// Get all spaces
const spaces = await api.getSpaces();

// Get user's spaces
const userSpaces = await api.getUserSpaces(userId);

// Join space
await api.joinSpace(spaceId);
```

### Notifications

```javascript
// Get all notifications
const notifications = await api.getNotifications();

// Get unread notifications only
const unread = await api.getNotifications(true);

// Get unread count
const count = await api.getUnreadCount();

// Mark as read
await api.markAsRead(notificationId);
```

## Error Handling

All methods throw errors on failure. Always use try-catch:

```javascript
try {
  const posts = await api.getPosts();
  setPosts(posts);
} catch (error) {
  console.error('Failed to fetch posts:', error);
}
```

## Example: Complete Post Flow

```javascript
import { api } from '@/lib/api';
import { useState, useEffect } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await api.likePost(postId);
      // Update UI
      setPosts(prev => prev.map(p => 
        p._id === postId 
          ? { ...p, likes: [...p.likes, 'temp'] }
          : p
      ));
    } catch (error) {
      console.error('Failed to like:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map(post => (
        <div key={post._id}>
          <p>{post.content}</p>
          <button onClick={() => handleLike(post._id)}>
            Like ({post.likes?.length || 0})
          </button>
        </div>
      ))}
    </div>
  );
}
```

## Backend URL

Default: `http://localhost:5001/api`

Override with environment variable:
```bash
NEXT_PUBLIC_API_URL=https://your-api.com/api
```
