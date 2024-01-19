'use client';

import { Alert, Button, Card, Flex, Input, Pagination, Space } from 'antd';
import { useState } from 'react';
import { MovieService } from './movie.service';
import { Movie } from '../../../models';

const movieService = new MovieService();

export default function Page() {
  const [movies, setMovies] = useState<Array<Movie>>([]);

  const fetchMovies = async () => {
    const response = await movieService.search({ query: 'pulp' });
    console.log(response);
    setMovies(response?.results ?? []);
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', margin: 'auto', width: '80%' }}>
      <h1>Movies</h1>
      <Flex gap={20}>
        <Input placeholder="Search input" />
        <Button type="primary" onClick={fetchMovies}>Search</Button>
      </Flex>
      <Alert message="Lorem ipsum" type="success" showIcon />
      <Flex gap={20} wrap="wrap">
        {movies.map((movie) => (<Card key={movie.id} title={movie.title} style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        ))}
      </Flex>
      <Pagination defaultCurrent={1} total={50} />
    </Space>
  )
}
