import { useEffect, useState } from 'react'
import Head from 'next/head'

import { Checkbox } from '@nextui-org/react'
import DatePicker from 'react-datepicker'
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
  const [selected, setSelected] = useState([])
  const [startDate, setStartDate] = useState(new Date('2012/01/01'))
  const [endDate, setEndDate] = useState(new Date())

  const orgAndRepo = 'dappcamp/landscape'
  const githubLink = 'https://github.com/' + orgAndRepo
  const starsImage = `https://img.shields.io/github/stars/${orgAndRepo}?style=social`

  useEffect(() => {
    const startYear = startDate.getFullYear()
    const endYear = endDate.getFullYear()

    const filteredTools = data.filter(
      (tool) =>
        tool.launch_year &&
        tool.launch_year >= startYear &&
        tool.launch_year <= endYear
    )
    const groupByResult = lodash.groupBy(filteredTools, (tool) => tool.category)
    const categoryNames = [
      ...new Set(filteredTools.map((tool) => tool.category)),
    ]
    const categoriesData = categoryNames.map((category) => ({
      name: category,
      items: groupByResult[category],
    }))
    setCategories(categoriesData)
  }, [startDate, endDate])

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
          <div className="flex flex-wrap flex-col lg:flex-row w-full items-baseline lg:pb-2 lg:pt-1 position-relative">
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
        <div className="lg:pb-4 flex flex-col xl:flex-row xl:items-center gap-1 xl:gap-6 justify-center">
          <Checkbox.Group
            defaultValue={[]}
            value={selected}
            onChange={setSelected}
          >
            <Checkbox value="show" size={'xs'}>
              Show launch year
            </Checkbox>
          </Checkbox.Group>
          <div className="flex gap-2 items-center">
            <p className="text-sm ">Launched in</p>
            <div className="flex items-left w-40">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showYearPicker
                dateFormat="yyyy"
                startDate={startDate}
                endDate={endDate}
                style={{ maxWidth: '120px' }}
              />
              <p className="px-1">-</p>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showYearPicker
                dateFormat="yyyy"
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
              />
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
                        showLaunchYear={selected.length > 0}
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
