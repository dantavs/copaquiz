import ReactMarkdown from 'react-markdown';
import { getPostBySlug } from '@/lib/posts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  return (
    <>
      <Header />
      <main className="container" style={{ padding: '2rem 1rem', minHeight: '70vh' }}>
        <article className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius)' }}>
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
