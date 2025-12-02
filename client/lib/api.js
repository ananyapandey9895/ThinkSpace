const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

const fetchAPI = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

export const api = {
  // Feed
  getHomeFeed: () => fetchAPI('/feed/home'),
  getExploreFeed: () => fetchAPI('/feed/explore'),
  
  // Posts
  getPosts: async () => {
    const data = await fetchAPI('/posts');
    return data.posts || data;
  },
  getPost: (id) => fetchAPI(`/posts/${id}`),
  createPost: (data) => fetchAPI('/posts/create', { method: 'POST', body: JSON.stringify(data) }),
  likePost: (id) => fetchAPI(`/posts/${id}/like`, { method: 'POST' }),
  
  // Comments
  getComments: (postId) => fetchAPI(`/posts/${postId}/comments`),
  createComment: (postId, text) => fetchAPI(`/posts/${postId}/comments`, { 
    method: 'POST', 
    body: JSON.stringify({ text }) 
  }),
  
  // User Profile
  getUserProfile: (handle) => fetchAPI(`/users/profile/handle/${handle}`),
  getUserPosts: (handle) => fetchAPI(`/users/profile/handle/${handle}/posts`),
  
  // Follow
  toggleFollow: (userId) => fetchAPI(`/follow/${userId}`, { method: 'POST' }),
  getFollowers: (userId) => fetchAPI(`/follow/${userId}/followers`),
  getFollowing: (userId) => fetchAPI(`/follow/${userId}/following`),
  checkFollow: (userId) => fetchAPI(`/follow/${userId}/check`),
  
  // Bookmarks
  toggleBookmark: (postId) => fetchAPI(`/bookmarks/${postId}`, { method: 'POST' }),
  getBookmarks: () => fetchAPI('/bookmarks'),
  
  // Spaces
  getSpaces: () => fetchAPI('/spaces'),
  getUserSpaces: (userId) => fetchAPI(`/spaces/user/${userId}`),
  joinSpace: (id) => fetchAPI(`/spaces/${id}/join`, { method: 'POST' }),
  
  // Notifications
  getNotifications: (unreadOnly = false) => fetchAPI(`/notifications${unreadOnly ? '?unreadOnly=true' : ''}`),
  getUnreadCount: () => fetchAPI('/notifications/unread-count'),
  markAsRead: (id) => fetchAPI(`/notifications/${id}/read`, { method: 'PUT' }),
};
