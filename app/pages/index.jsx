import { useState } from 'react'
import Head from 'next/head'

import lodash from 'lodash'

import LogoCard from '../components/LogoCard'
import ToolModal from '../components/ToolModal'

import data from '../data/landscape.json'

const groupByResult = lodash.groupBy(data, (tool) => tool.category)
const categoryNames = [...new Set(data.map((tool) => tool.category))]
const categoriesData = categoryNames.map((category) => ({
  name: category,
  items: groupByResult[category],
}))

export default function Home() {
  const [categories, setCategories] = useState(categoriesData)
  const [visible, setVisible] = useState(false)
  const [currentItem, setCurrentItem] = useState({
    name: '',
  })

  const orgAndRepo = 'dappcamp/landscape'
  const githubLink = 'https://github.com/' + orgAndRepo
  const starsImage = `https://img.shields.io/github/stars/${orgAndRepo}?style=social`

  return (
    <div className="">
      <Head>
        <title>Ethereum Developer Tooling Landscape | DappCamp</title>
      </Head>
      <ToolModal
        visible={visible}
        setVisible={setVisible}
        currentItem={currentItem}
      />
      <main className="max-w-10xl mx-auto px-4 py-4 lg:py-6 lg:px-8 flex flex-col">
        <div>
          <div className="flex flex-wrap flex-col lg:flex-row w-full items-baseline lg:pb-6 lg:pt-2 position-relative">
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
              <p className="w-full hidden xl:block text-gray-600 text-xs lg:mx-auto">
                {`This landscape represents a comprehensive list of tools that developers use when developing smart contracts on Ethereum and EVM-compatible chains.`}
                <br />
                {`Scroll horizontally and vertically to view the whole landscape. Click on any tool to view additional details.`}
              </p>
            </div>
            <div className="mb-2 mt-2 lg:mt-0 lg:mb-0 lg:block">
              <a className="inline-block h-4" href={githubLink}>
                <img src={starsImage} alt="GitHub Stars Count" />
              </a>
            </div>
          </div>
        </div>
        <div className="px-2 mt-4 lg:my-0 flex-1 w-full overflow-scroll">
          <div
            className="mb-8 grid grid-cols-4 gap-x-12 gap-y-16 px-4 text-center"
            style={{
              width: 'max-content',
              height: 'max-content',
            }}
          >
            {categories.map((category, index) => (
              <div key={index}>
                <h2 className="text-md font-bold pb-1">{category.name}</h2>
                <div>
                  <div className="grid grid-cols-3 gap-2 items-center justify-center">
                    {category.items.map((item, index) => (
                      <LogoCard
                        item={item}
                        onClick={() => {
                          setVisible(true)
                          setCurrentItem(item)
                        }}
                        key={index}
                        showLaunchYear={true}
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
