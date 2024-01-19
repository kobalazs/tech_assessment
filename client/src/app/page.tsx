'use client';

import { Alert, Button, Card, Flex, Input, Pagination, Space } from 'antd';
import { useState } from 'react';
import { MovieService } from './movie.service';
import { ApiResponse } from '../../../models';
import MovieCard from './movie-card';
import Title from 'antd/es/typography/Title';

const movieService = new MovieService();

export default function Page() {
  const [response, setResponse] = useState<ApiResponse | undefined>(undefined);

  const fetchMovies = async () => {
    setResponse(await movieService.search({ query: 'pulp' }));
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', margin: 'auto', width: '80%', minWidth: 800 }}>
      <Title level={1}>Movies</Title>
      <Flex gap={20}>
        <Input placeholder="Search input" />
        <Button type="primary" onClick={fetchMovies}>Search</Button>
      </Flex>
      <Alert message="Lorem ipsum" type="success" showIcon />
      <Flex gap={20} wrap="wrap">
        {response?.results.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </Flex>
      <Pagination defaultCurrent={response?.page} total={response?.total_results} />
    </Space>
  )
}
