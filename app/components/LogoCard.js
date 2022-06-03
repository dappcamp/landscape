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
      className="logo-card hover:text-blue-500"
    >
      <Card.Body css={{ p: 0 }}>
        <div className="item-logo-container my-2 mx-auto">
          <img
            src={logoUrl}
            className="item-logo"
            alt={item.title}
          />
        </div>
      </Card.Body>
      <Card.Footer style={{ padding: "8px" }}>
        <Row wrap="wrap" justify="space-between">
          <p className='font-semibold text-gray-600 text-xs text-center w-full single-line' style={{ maxWidth: "84px" }}>{item.name}</p>
        </Row>
      </Card.Footer>
    </Card>
  )
}
