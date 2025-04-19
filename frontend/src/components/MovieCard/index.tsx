// src/components/MovieCard.tsx

interface MovieCardProps {
  title: string;
  description: string;
  genre: string;
  year: number;
  imageUrl: string;
}

export default function MovieCard({
  title,
  description,
  genre,
  year,
  imageUrl,
}: MovieCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden transition transform hover:scale-105 hover:shadow-xl w-full max-w-sm mx-auto">
      <img src={imageUrl} alt={title} className="w-full h-64 object-cover" />

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

        <div className="flex justify-between text-sm text-gray-500 mt-4">
          <span>{genre}</span>
          <span>{year}</span>
        </div>
      </div>
    </div>
  );
}
