# Complete ThinkSpace API Guide

## ALL ENDPOINTS

### AUTHENTICATION
```bash
POST   /api/auth/register
POST   /api/auth/login
```

### POSTS
```bash
GET    /api/posts                    # All posts
GET    /api/posts/:id                # Single post
POST   /api/posts/create             # Create (protected)
PUT    /api/posts/:id                # Update (protected, owner)
DELETE /api/posts/:id                # Delete (protected, owner)
POST   /api/posts/:id/like           # Like/Unlike (protected)
POST   /api/posts/:id/view           # Track view
POST   /api/posts/:id/share          # Track share
GET    /api/posts/search/tags?tag=   # Search by tag
GET    /api/posts/trending/posts     # Trending posts
```

### COMMENTS
```bash
POST   /api/posts/:postId/comments   # Create (protected)
GET    /api/posts/:postId/comments   # Get all
DELETE /api/comments/:id             # Delete (protected, owner)
```

### BOOKMARKS
```bash
POST   /api/bookmarks/:postId        # Toggle bookmark (protected)
GET    /api/bookmarks                # Get user bookmarks (protected)
GET    /api/bookmarks/:postId/check  # Check if bookmarked (protected)
```

### FOLLOW SYSTEM
```bash
POST   /api/follow/:userId           # Toggle follow (protected)
GET    /api/follow/:userId/followers # Get followers
GET    /api/follow/:userId/following # Get following
GET    /api/follow/:userId/check     # Check if following (protected)
```

### NOTIFICATIONS
```bash
GET    /api/notifications            # Get all (protected)
GET    /api/notifications?unreadOnly=true  # Unread only
GET    /api/notifications/unread-count     # Count unread (protected)
PUT    /api/notifications/:id/read   # Mark as read (protected)
PUT    /api/notifications/read-all   # Mark all read (protected)
```

### SPACES
```bash
POST   /api/spaces                   # Create (protected)
GET    /api/spaces                   # Get all
GET    /api/spaces/:id               # Get by ID
POST   /api/spaces/:id/join          # Join (protected)
POST   /api/spaces/:id/leave         # Leave (protected)
```

### MESSAGING
```bash
POST   /api/messages                 # Send message (protected)
GET    /api/messages/:convId?limit&before  # Get with pagination (protected)
PUT    /api/messages/:id/read        # Mark as read (protected)
PUT    /api/messages/conversation/:convId/read  # Mark all read (protected)
DELETE /api/messages/:id             # Delete (protected)
POST   /api/messages/typing          # Set typing status (protected)
GET    /api/messages/typing/:convId  # Get typing users (protected)
```

### CONVERSATIONS
```bash
GET    /api/conversations            # Get all (protected)
GET    /api/conversations/:id        # Get by ID (protected)
POST   /api/conversations            # Create (protected)
DELETE /api/conversations/:id        # Delete (protected, soft delete)
```

### NOTES
```bash
POST   /api/notes                    # Create (protected)
GET    /api/notes/:userId            # Get by user
GET    /api/notes/single/:id         # Get by ID
PUT    /api/notes/:id                # Update (protected)
DELETE /api/notes/:id                # Delete (protected)
```

### REFLECTIONS
```bash
POST   /api/reflection               # Create (protected)
GET    /api/reflection/:userId       # Get by user
```

### LINKS
```bash
# (Existing routes - unchanged)
```

---

## QUICK TESTS

### 1. Post with Tags & Tracking
```bash
TOKEN="your_token"

# Create post with tags
curl -X POST http://localhost:5001/api/posts/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "content": "Check out #javascript #nodejs",
    "type": "thought",
    "tags": ["javascript", "nodejs"]
  }'

# Track view
POST_ID="post_id"
curl -X POST http://localhost:5001/api/posts/$POST_ID/view

# Track share
curl -X POST http://localhost:5001/api/posts/$POST_ID/share

# Search by tag
curl "http://localhost:5001/api/posts/search/tags?tag=javascript"

# Get trending
curl http://localhost:5001/api/posts/trending/posts
```

### 2. Follow System
```bash
USER_ID="user_to_follow"

# Follow user
curl -X POST http://localhost:5001/api/follow/$USER_ID \
  -H "Authorization: Bearer $TOKEN"

# Get followers
curl http://localhost:5001/api/follow/$USER_ID/followers

# Get following
curl http://localhost:5001/api/follow/$USER_ID/following

# Check if following
curl http://localhost:5001/api/follow/$USER_ID/check \
  -H "Authorization: Bearer $TOKEN"
```

### 3. Notifications
```bash
# Get all notifications
curl http://localhost:5001/api/notifications \
  -H "Authorization: Bearer $TOKEN"

# Get unread only
curl "http://localhost:5001/api/notifications?unreadOnly=true" \
  -H "Authorization: Bearer $TOKEN"

# Get unread count
curl http://localhost:5001/api/notifications/unread-count \
  -H "Authorization: Bearer $TOKEN"

# Mark as read
NOTIF_ID="notification_id"
curl -X PUT http://localhost:5001/api/notifications/$NOTIF_ID/read \
  -H "Authorization: Bearer $TOKEN"

# Mark all as read
curl -X PUT http://localhost:5001/api/notifications/read-all \
  -H "Authorization: Bearer $TOKEN"
```

---

## NOTIFICATION TYPES

Notifications are automatically created for:
- **like**: When someone likes your post
- **comment**: When someone comments on your post
- **follow**: When someone follows you
- **mention**: (Future feature)

---

## COMPLETE FEATURE LIST

✅ **Authentication** - JWT with bcrypt
✅ **Posts** - CRUD, like, tags, views, shares, trending
✅ **Comments** - CRUD with notifications
✅ **Bookmarks** - Toggle, list, check
✅ **Follow System** - Follow/unfollow, followers, following
✅ **Notifications** - Auto-create on actions, read status, count
✅ **Spaces** - Communities with membership
✅ **Messaging** - Attachments, pagination, typing, read receipts, soft delete
✅ **Notes** - Personal notes (protected)
✅ **Reflections** - Daily reflections (protected)
✅ **Links** - Link management (existing)

---

## TEST WORKFLOW

1. Register & Login
2. Create post with tags
3. Like post (creates notification)
4. Comment on post (creates notification)
5. Follow user (creates notification)
6. Bookmark post
7. Check notifications
8. Track views/shares
9. Search by tags
10. Get trending posts

---

## MODELS SUMMARY

- **User** - password, handle, name, email
- **Post** - content, likes[], tags[], views, shares
- **Comment** - postId, authorId, text
- **Bookmark** - userId, postId
- **Follow** - followerId, followingId
- **Notification** - userId, type, actorId, postId, read
- **Space** - name, members[]
- **Message** - content, attachments[], readBy[], seenAt
- **Conversation** - participants[], deletedBy[]
- **Note** - userId, title, content
- **Reflection** - userId, content
- **Link** - (existing)

---

## INDEXES

All models have appropriate indexes for performance:
- Posts: tags, createdAt, views
- Messages: conversationId + createdAt
- Bookmarks: userId + postId (unique)
- Follow: followerId + followingId (unique)
- Notifications: userId + read + createdAt
