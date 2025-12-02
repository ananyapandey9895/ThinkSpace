"use server";

export async function getPosts() {
    try {
        const res = await fetch('http://localhost:5001/api/feed/home', {
            cache: 'no-store',
            next: { revalidate: 0 }
        });

        if (!res.ok) {
            console.log('Home feed failed, falling back to all posts');
            const fallback = await fetch('http://localhost:5001/api/posts', {
                cache: 'no-store',
                next: { revalidate: 0 }
            });
            const data = await fallback.json();
            return data.posts || [];
        }

        const data = await res.json();
        return data.posts || [];
    } catch (error) {
        console.error("Failed to fetch posts:", error.message);
        return [];
    }
}