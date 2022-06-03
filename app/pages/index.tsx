import { useState } from 'react'

import Head from 'next/head'
import { Modal } from '@nextui-org/react'
//@ts-ignore
import lodash from 'lodash'

import LogoCard from '../components/LogoCard'
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
    revalidate: 60,
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
  }

  const extractTwitterUsernameFromUrl = (twitterUrl: string) => {
    try {
      return twitterUrl.replace(/\/$/, '').replace('https://twitter.com/', '@')
    } catch (e) {
      return ''
    }
  }

  const cleanUrl = (websiteUrl: string) => {
    try {
      return websiteUrl
        .replace(/\/$/, '')
        .replace('https://', '')
        .replace('www.', '')
    } catch (e) {
      return ''
    }
  }

  const currentItemLogoUrl =
    (currentItem?.logo || []).length > 0
      ? currentItem?.logo[0]?.url
      : currentItem?.logoUrl

  return (
    <div className="">
      <Head>
        <title>Ethereum Developer Tooling Landscape | DappCamp</title>
      </Head>
      <Modal
        closeButton
        width="480px"
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        style={{ marginLeft: '16px', marginRight: '16px' }}
      >
        <Modal.Body>
          <div className="pb-6">
            <img
              src={currentItemLogoUrl}
              width={'48px'}
              height={'48px'}
              className="mb-4"
              alt={currentItem.title}
            />
            <h1 className="font-bold text-xl mb-2">{currentItem.full_name || currentItem.name}</h1>
            <p className="mb-3">{currentItem.description}</p>
            <div className="text-sm flex flex-col gap-2">
              <div className="detail">
                {cleanUrl(currentItem.website) && (
                  <p>
                    <span className="font-semibold block mb-0.5 ">Website</span>{' '}
                    <a
                      href={currentItem.website}
                      target="_blank"
                      className="text-blue-500 hover:font-semibold"
                    >
                      {cleanUrl(currentItem.website)}
                    </a>
                  </p>
                )}
              </div>
              <div className="detail">
                {extractTwitterUsernameFromUrl(currentItem.twitter) && (
                  <p>
                    <span className="font-semibold block mb-0.5 ">Twitter</span>{' '}
                    <a
                      href={currentItem.twitter}
                      target="_blank"
                      className="text-blue-500 hover:font-semibold"
                    >
                      {extractTwitterUsernameFromUrl(currentItem.twitter)}
                    </a>
                  </p>
                )}
              </div>
              <div className="detail">
                {cleanUrl(currentItem.github) && (
                  <p>
                    <span className="font-semibold block mb-0.5 ">GitHub</span>{' '}
                    <a
                      href={currentItem.github}
                      target="_blank"
                      className="text-blue-500 hover:font-semibold"
                    >
                      {cleanUrl(currentItem.github)}
                    </a>
                  </p>
                )}
              </div>
              <div className="detail">
                {cleanUrl(currentItem.crunchbase) && (
                  <p>
                    <span className="font-semibold block mb-0.5 ">
                      Crunchbase
                    </span>{' '}
                    <a
                      href={currentItem.crunchbase}
                      target="_blank"
                      className="text-blue-500 hover:font-semibold"
                    >
                      {cleanUrl(currentItem.crunchbase)}
                    </a>
                  </p>
                )}
              </div>
              <div className="detail">
                {currentItem.funding && (
                  <p>
                    <span className="font-semibold block mb-0.5 ">Funding</span>{' '}
                    {currentItem.funding}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <main className="max-w-10xl mx-auto px-4 py-4 lg:py-6 lg:px-8 flex flex-col">
        <div>
          <div className="flex flex-wrap flex-col lg:flex-row w-full items-baseline lg:pb-6 lg:pt-4 position-relative">
            <div className="mb-2 lg:mb-0">
              <img
                className="w-36 lg:w-36 h-auto"
                src="https://www.dappcamp.xyz/dappcamp_logo.png"
                alt="DappCamp Logo"
              />
            </div>
            <div className="lg:text-center flex-1">
              <h1 className="block text-xl md:text-2xl xl:text-3xl font-bold text-gray-800">
                Ethereum Developer Tooling Landscape
              </h1>
              <p className="w-full hidden xl:block text-gray-600 text-xs max-w-2xl lg:mx-auto">
                {`This landscape represents a comprehensive list of tools that developers use when developing smart contracts on Ethereum and EVM-compatible chains. Scroll horizontally and vertically to view the whole landscape.`}
              </p>
            </div>
            <div className="mb-2 lg:mb-0 hidden lg:block">
              <img
                className="w-36 lg:w-36 h-auto opacity-0"
                src="https://www.dappcamp.xyz/dappcamp_logo.png"
                alt="DappCamp Logo"
              />
            </div>
          </div>
        </div>
        <div
          style={{ width: '100%', overflow: 'scroll' }}
          className="px-2 mt-4 lg:my-0 flex-1"
        >
          <div
            className="mb-8 grid grid-cols-4 gap-x-8 gap-y-12 px-4 text-center"
            style={{
              width: 'max-content',
              height: 'max-content',
            }}
          >
            {groupNames.map((group, index) => (
              <div key={index}>
                <h2 className="text-md font-bold pb-1">{group}</h2>
                <div>
                  <div className="grid grid-cols-3 gap-2 items-center justify-center">
                    {groupedTools[group].map((item: any, index: number) => (
                      <LogoCard
                        item={item}
                        onClick={() => {
                          setVisible(true)
                          setCurrentItem(item)
                        }}
                        key={index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
