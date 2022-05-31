import React from 'react'
import { Card, Row } from '@nextui-org/react'

export default function LogoCard({ item, onClick }) {
  const logoUrl = (item.logo || []).length > 0 ? item.logo[0].url : item.logoUrl

  return (
    <Card
      hoverable
      clickable
      onClick={onClick}
      style={{ minWidth: "fit-content", padding: "2px" }}
    >
      <Card.Body css={{ p: 0 }}>
        <img
          src={logoUrl}
          width={'36px'}
          height={'36px'}
          className="mx-auto my-2"
          alt={item.title}
        />
      </Card.Body>
      <Card.Footer style={{ padding: "10px" }}>
        <Row wrap="wrap" justify="space-between">
          <p className='font-semibold text-gray-600 text-xs' style={{ maxWidth: "84px" }}>{item.name}</p>
        </Row>
      </Card.Footer>
    </Card>
  )
}
