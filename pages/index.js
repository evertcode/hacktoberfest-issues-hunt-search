import Head from 'next/head'
import { useState, useMemo } from 'react'
import ProgressBar from '@badrap/bar-of-progress'
import hacktoberfest from 'hacktoberfest-issue-hunt'
import useField from '../hooks/useField'
import Table from '../components/Table'

const progress = new ProgressBar({
  size: 4,
  color: '#C43800',
  className: 'z-50',
  delay: 100
})

export default function Home ({ data }) {
  const [issues, setIssues] = useState([])
  const colums = useMemo(() => [
    {
      Header: 'Title',
      accessor: 'title',
      Cell: ({ row }) => (
        <a
          href={row.original.link}
          title={row.values.title}
          className='text-blue-400'
          target='_blank'
          rel='noopener noreferrer'
        >
          {row.values.title}
        </a>
      )
    },
    {
      Header: 'Labels',
      accessor: 'labels'
    },
    {
      Header: 'Comments',
      accessor: 'comments'
    },
    {
      Header: 'State',
      accessor: 'state'
    }
  ])

  const language = useField({ type: 'text' })
  const labels = useField({ type: 'text' })

  const handleSearch = () => {
    const params = {
      language: language.value,
      labels: labels.value
    }

    const query = Object.keys(params)
      .map(key => {
        const val = params[key]
        return val ? encodeURIComponent(key) + '=' + encodeURIComponent(val) : null
      })
      .filter(val => val)
      .join('&')

    progress.start()
    fetch('/api/issues?' + query)
      .then(res => res.json())
      .then(res => {
        setIssues(res)
        progress.finish()
      })
      .catch(error => {
        progress.finish()
        console.log(error)
      })
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>Hacktoberfest Issues Search</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col w-full flex-1 py-2 px-2 md:px-10 overflow-x-hidden md:overflow-auto text-center'>
        <h1 className='font-extrabold text-3xl px-8 md:px-0 text-vermilion-500'>Hacktoberfest Issues Search</h1>

        <div className='flex md:space-x-4 pt-10 px-8 md:px-0 flex-col md:flex-row gap-2'>
          <input {...language} className='w-full rounded p-2' placeholder='Language' />
          <input {...labels} className='w-full rounded p-2' placeholder='Labels' />
          <button onClick={handleSearch} className='flex items-center justify-center rounded-lg md:rounded-none bg-vermilion-500 px-4 py-2 text-white hover:bg-vermilion-400'>
            Search
          </button>
        </div>

        <div className='flex flex-col w-full pt-10 space-y-4'>
          {issues.length ? <Table columns={colums} data={issues} /> : <Table columns={colums} data={data} />}
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps () {
  const { GITHUB_TOKEN } = process.env
  const data = await hacktoberfest({
    token: GITHUB_TOKEN
  })

  return {
    props: {
      data
    }
  }
}
