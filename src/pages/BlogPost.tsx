import { Link, useParams } from "react-router-dom";
import { content } from "../content";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BlogPostPage() {
  const { slug } = useParams();
  const blog = content.blog;
  const post = blog.posts.find((p) => p.slug === slug);

  return (
    <div>
      <Header />
      <main className="mx-auto w-full max-w-[68ch] px-6 py-16 md:py-24">
        {post ? (
          <article>
            <p className="text-sm opacity-60">{post.date}</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">{post.title}</h1>
            <div className="mt-8 flex flex-col gap-5">
              {post.body.map((para, i) => (
                <p key={i} className="text-lg leading-relaxed opacity-85">{para}</p>
              ))}
            </div>
          </article>
        ) : (
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{blog.missingTitle}</h1>
            <p className="mt-3 opacity-75">{blog.missingBody}</p>
          </div>
        )}
        <Link to="/blog" className="mt-12 inline-block font-medium underline underline-offset-4">
          {blog.backToIndex}
        </Link>
      </main>
      <Footer />
    </div>
  );
}