import { ExternalLink } from 'lucide-react';

export const YouTubeVideo = ({ id, title }) => (
  <figure>
    <div className="aspect-video rounded-3xl overflow-hidden border border-gray-100 shadow-sm bg-gray-900">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
        title={title}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
    <figcaption className="mt-3 text-sm text-gray-500 flex flex-wrap items-center gap-x-2">
      <span>{title}, from the Super Q YouTube channel.</span>
      <a
        href={`https://www.youtube.com/watch?v=${id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-primary-600 font-semibold hover:underline"
      >
        Watch on YouTube
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </figcaption>
  </figure>
);
