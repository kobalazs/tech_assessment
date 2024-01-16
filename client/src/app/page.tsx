import { Alert, Button, Card, Flex, Input, Pagination, Space } from 'antd';

export default function Page() {
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', margin: 'auto', width: '80%' }}>
      <h1>Movies</h1>
      <Flex gap={20}>
        <Input placeholder="Search input" />
        <Button type="primary">Search</Button>
      </Flex>
      <Alert message="Lorem ipsum" type="success" showIcon />
      <Flex gap={20}>
        <Card title="Card title" style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Flex>
      <Pagination defaultCurrent={1} total={50} />
    </Space>
  )
}
