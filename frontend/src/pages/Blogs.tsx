import { Appbar } from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    return (
        <div>
            <Appbar /> 
            <div className="flex justify-center">
                <div>
                    {loading ? (
                        <>
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                        </>
                    ) : (
                        blogs.map(blog => (
                            <BlogCard
                                key={blog.id} // Assuming blog.id is unique
                                id={blog.id} //this is string
                                authorName={blog.author?.name || "Anonymous"} // Use optional chaining to avoid errors if author is not available
                                title={blog.title}
                                content={blog.content}
                                publishedDate={"2nd Feb 2024"}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
