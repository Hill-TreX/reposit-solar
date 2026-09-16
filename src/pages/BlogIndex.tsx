import { Link } from "react-router-dom";
import { content } from "../content";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BlogIndexPage() {
  const blog = content.blog;
  return (
    <div>
      <Header />
      <main className="mx-auto w-full max-w-[68ch] px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{blog.title}</h1>
        <p className="mt-4 text-lg opacity-70">{blog.intro}</p>
        <div className="mt-12 flex flex-col">
          {blog.posts.map((post) => (
            <article key={post.slug} className="py-8 border-t border-current/15">
              <p className="text-sm opacity-60">{post.date}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                <Link to={"/blog/" + post.slug} className="hover:opacity-70 transition-opacity">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 opacity-75 leading-relaxed">{post.excerpt}</p>
              <Link to={"/blog/" + post.slug} className="mt-4 inline-block font-medium underline underline-offset-4">
                {blog.readMore}
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}