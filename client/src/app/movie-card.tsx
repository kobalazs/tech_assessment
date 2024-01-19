'use client';

import { Card } from 'antd';
import { Movie } from '../../../models';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <Card
            style={{ height: 500, width: '23%', overflow: 'hidden' }}
            cover={<img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} style={{ minHeight: 250 }} />}
        >
            <Title level={3}>{movie.title}</Title>
            <Paragraph>{movie.overview}</Paragraph>
        </Card>
    );
}
