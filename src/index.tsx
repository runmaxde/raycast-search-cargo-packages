import { List } from '@raycast/api'
import { useState } from 'react'
import fetchPackages from './fetchPackages'
import type { ICreate } from './typings'

export default function PackageList() {
  const [results, setResults] = useState<ICreate[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearch = async (searchString: string) => {
    setLoading(true)

    const response = await fetchPackages(searchString)

    setResults(response)
    setLoading(false)
  }

  return (
    <List
      isLoading={loading}
      searchBarPlaceholder={`Search a package at create.io ...`}
      onSearchTextChange={handleSearch}
      throttle={true}
    >
      {results.map((item: ICreate) => {
        return <PackageItem key={item.name} item={item} />
      })}
    </List>
  )
}

function PackageItem({ item }: { item: ICreate }) {
  return (
    <List.Item
      key={item.name}
      id={item.name}
      title={item.name}
      subtitle={item.description}
      accessoryTitle={item.version}
    />
  )
}
