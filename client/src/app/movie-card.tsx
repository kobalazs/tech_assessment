
import { Card } from 'antd';
import { Movie } from '../../../models';
import Meta from 'antd/es/card/Meta';

export default function MovieCard({ movie }: { movie: Movie }) {
    function getImageSrc(): string {
        if (movie.poster_path) {
            return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        }
        return `https://placehold.co/500x400?text=${encodeURIComponent(movie.title)}`
    }

    return (
        <Card
            style={{ height: 400, width: '23%', overflow: 'hidden' }}
            cover={<img src={getImageSrc()} alt={movie.title} style={{ height: 200, width: '100%', objectFit: 'cover' }} />}
        >
            <Meta title={movie.title} description={movie.overview} />
        </Card>
    );
}
