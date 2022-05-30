import { useState } from 'react'

import Head from 'next/head'
import { Card, Grid, Row, Text, Modal } from '@nextui-org/react'
//@ts-ignore
import lodash from 'lodash'

import { getAllPages } from '../util/airtable'

async function fetchLandscape() {
  return getAllPages('appBnNeFjIsmCH9uz', 'tblWxdcACCFP3g4Sh', {
    maxRecords: 1000,
    pageSize: 100,
    sort: [{ field: 'orderInGroup' }],
  })
}

export async function getStaticProps() {
  const tools = await fetchLandscape()

  return {
    props: {
      tools,
    },
    revalidate: 60 * 5,
  }
}

export default function Home({ tools }: { tools: Array<any> }) {
  const [visible, setVisible] = useState(false)
  const [currentItem, setCurrentItem] = useState<any>({
    name: '',
  })

  const groupedTools = lodash.groupBy(tools, (tool: any) => tool.category)
  //@ts-ignore
  const groupNames = [...new Set(tools.map((tool: any) => tool.category))]

  const closeHandler = () => {
    setVisible(false)
    console.log('closed')
  }

  const extractTwitterUsernameFromUrl = (twitterUrl: string) => {
    try {
      return twitterUrl.replace(/\/$/, '').replace('https://twitter.com/', '@')
    } catch (e) {
      return ''
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Ethereum Developer Tooling Landscape | DappCamp</title>
      </Head>

      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Body>
          <div className="pb-6">
            <img
              src={currentItem.logoUrl}
              width={'48px'}
              height={'48px'}
              className="mb-4"
              alt={currentItem.title}
            />
            <h1 className="font-bold text-xl mb-2">{currentItem.name}</h1>
            <p className="mb-2">{currentItem.description}</p>
            {extractTwitterUsernameFromUrl(currentItem.twitter) && (
              <p>
                <span className="font-semibold">Twitter:</span>{' '}
                <a
                  href={currentItem.twitter}
                  target="_blank"
                  className="text-blue-500"
                >
                  {extractTwitterUsernameFromUrl(currentItem.twitter)}
                </a>
              </p>
            )}
          </div>
        </Modal.Body>
      </Modal>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 lg:px-20 text-center">
        <h1 className="block mx-0 mt-0 mb-3 text-4xl font-bold text-gray-700 py-8">
          Ethereum Developer Tooling Landscape
        </h1>

        <div className="mb-8">
          {groupNames.map((group) => (
            <div>
              <h2 className="text-3xl text-gray-600 font-bold py-8">{group}</h2>
              <div>
                <Grid.Container gap={2} justify="flex-start">
                  {groupedTools[group].map((item: any, index: number) => (
                    <Grid xs={6} sm={3} key={index}>
                      <Card
                        hoverable
                        clickable
                        onClick={() => {
                          setVisible(true)
                          setCurrentItem(item)
                        }}
                      >
                        <Card.Body css={{ p: 0 }}>
                          <img
                            src={item.logoUrl}
                            width={'48px'}
                            height={'48px'}
                            className="mx-auto my-4"
                            // height={140}
                            alt={item.title}
                          />
                        </Card.Body>
                        <Card.Footer>
                          <Row wrap="wrap" justify="space-between">
                            <Text b>{item.name}</Text>
                          </Row>
                        </Card.Footer>
                      </Card>
                    </Grid>
                  ))}
                </Grid.Container>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
