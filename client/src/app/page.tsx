'use client';

import { Alert, Button, Flex, Input, Pagination, Space } from 'antd';
import { FormEvent, useState } from 'react';
import { MovieService } from './movie.service';
import { ApiRequest, ApiResponse } from '../../../models';
import MovieCard from './movie-card';
import Title from 'antd/es/typography/Title';

const movieService = new MovieService();

export default function Page() {
  const [response, setResponse] = useState<ApiResponse | undefined>(undefined);

  const search = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const request = Object.fromEntries(formData.entries()) as unknown as ApiRequest;
    setResponse(await movieService.search(request));
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', margin: 'auto', width: '80%', minWidth: 800 }}>
      <Title level={1}>Movies</Title>
      <form onSubmit={search}>
        <Flex gap={20}>
          <Input placeholder="Search input" name="query" />
          <Button type="primary" htmlType="submit">Search</Button>
        </Flex>
      </form>
      {response && <Alert message={`Loaded from ${response?.source}`} type="success" showIcon />}
      <Flex gap={20} wrap="wrap">
        {response?.results.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </Flex>
      <Pagination defaultCurrent={response?.page} total={response?.total_results} />
    </Space>
  )
}
