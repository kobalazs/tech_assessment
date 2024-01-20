'use client';

import { Alert, Button, Flex, Input, Pagination, Space } from 'antd';
import { FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import { MovieService } from './movie.service';
import { ApiRequest, ApiResponse } from '../../../models';
import MovieCard from './movie-card';
import Title from 'antd/es/typography/Title';

const movieService = new MovieService();

export default function Page() {
  const [request, setRequest] = useState<ApiRequest | undefined>(undefined);
  const [response, setResponse] = useState<ApiResponse | undefined>(undefined);
  let debounceTimeout: number | undefined;

  useEffect(() => {
    async function search() {
      if (!request) return;
      setResponse(await movieService.search(request));
    }
    search();
  }, [request]);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement)['value'];
    if (value.length >= 3) {
      clearTimeout(debounceTimeout);
      debounceTimeout = window.setTimeout(() => setRequest({ query: value, page: 1 }), 500);
    }
  }

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setRequest({ ...Object.fromEntries(formData.entries()) as unknown as ApiRequest, page: 1 });
  };

  const paginate = (page: number) => {
    if (!request) return;
    setRequest({ ...request, page });
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', margin: 'auto', width: '80%', minWidth: 800 }}>
      <Title level={1}>Movies</Title>
      <form onSubmit={submit}>
        <Flex gap={20}>
          <Input placeholder="Search input" name="query" onKeyUp={handleKeyUp} />
          <Button type="primary" htmlType="submit">Search</Button>
        </Flex>
      </form>
      {response && <Alert message={`Loaded from ${response?.source}`} type="success" showIcon />}
      <Flex gap={20} wrap="wrap">
        {response?.results.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </Flex>
      {response && <Pagination current={response?.page} total={response?.total_results} onChange={paginate} pageSize={20} showSizeChanger={false} />}
    </Space>
  )
}
