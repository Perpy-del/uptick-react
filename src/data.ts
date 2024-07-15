export interface RecentPostsInterface {
    name: string;
    date: string;
}

export const categoriesData = ["World", "Technology", "Design", "Development", "BioTech"]

export const recentPosts: Array<RecentPostsInterface> = [
    {
        name: "Example blog post title",
        date: "January 15, 2024"
    },
    {
        name: "This is another blog post title",
        date: "January 14, 2024"
    },
    {
        name: "Longer blog post title: This one has multiple lines!",
        date: "January 15, 2024"
    },
]