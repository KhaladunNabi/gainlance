import type { ContentBlock } from '@/lib/types';

export function ArticleContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="article-content">
      {blocks.map((block, i) => {
        if (block.type === 'heading') {
          return <h2 key={i}>{block.text}</h2>;
        }
        return <p key={i}>{block.text}</p>;
      })}
    </div>
  );
}
