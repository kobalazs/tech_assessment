'use client';

import { Alert, Button, Flex, Input, Pagination, Space } from 'antd';
import { FormEvent, useEffect, useState } from 'react';
import { MovieService } from './movie.service';
import { ApiRequest, ApiResponse } from '../../../models';
import MovieCard from './movie-card';
import Title from 'antd/es/typography/Title';

const movieService = new MovieService();

export default function Page() {
  const [request, setRequest] = useState<ApiRequest>({ query: '' });
  const [response, setResponse] = useState<ApiResponse | undefined>(undefined);

  useEffect(() => {
    async function search() {
      setResponse(await movieService.search(request));
    }
    search();
  }, [request]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setRequest(Object.fromEntries(formData.entries()) as unknown as ApiRequest);
  };

  const paginate = (page: number) => {
    setRequest({ ...request, page });
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', margin: 'auto', width: '80%', minWidth: 800 }}>
      <Title level={1}>Movies</Title>
      <form onSubmit={submit}>
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
      <Pagination current={response?.page} total={response?.total_results} onChange={paginate} showSizeChanger={false} />
    </Space>
  )
}
