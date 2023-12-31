import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { BsArrowsCollapse, BsArrowsExpand } from 'react-icons/bs'

const POPULATION_RANGE_MIN = 0
const POPULATION_RANGE_MAX = 15_000_000
const AREA_RANGE_MIN = 0
const AREA_RANGE_MAX = 100_000

interface Props {
  filterId: number | null
  setFilterId: (filterId: number | null) => void
  filterName: string | null
  setFilterName: (filterName: string | null) => void
  filterCapital: string | null
  setFilterCapital: (filterCapital: string | null) => void
  filterPopulationMin: number | null
  setFilterPopulationMin: (filterPopulationMin: number | null) => void
  filterPopulationMax: number | null
  setFilterPopulationMax: (filterPopulationMax: number | null) => void
  filterAreaMin: number | null
  setFilterAreaMin: (filterAreaMin: number | null) => void
  filterAreaMax: number | null
  setFilterAreaMax: (filterAreaMax: number | null) => void
}

export default function PrefectureFilter (props: Props): React.JSX.Element {
  const {
    filterId,
    setFilterId,
    filterName,
    setFilterName,
    filterCapital,
    setFilterCapital,
    filterPopulationMin,
    setFilterPopulationMin,
    filterPopulationMax,
    setFilterPopulationMax,
    filterAreaMin,
    setFilterAreaMin,
    filterAreaMax,
    setFilterAreaMax
  } = props

  const [filterisOpen, setFilterisOpen] = useState<boolean>(false)

  const [tmpFilterId, setTmpFilterId] = useState<number | null>(filterId)
  const [tmpFilterName, setTmpFilterName] = useState<string | null>(filterName)
  const [tmpFilterCapital, setTmpFilterCapital] = useState<string | null>(filterCapital)
  const [tmpFilterPopulationMin, setTmpFilterPopulationMin] = useState<number | null>(filterPopulationMin)
  const [tmpFilterPopulationMax, setTmpFilterPopulationMax] = useState<number | null>(filterPopulationMax)
  const [tmpFilterAreaMin, setTmpFilterAreaMin] = useState<number | null>(filterAreaMin)
  const [tmpFilterAreaMax, setTmpFilterAreaMax] = useState<number | null>(filterAreaMax)

  useEffect(() => {
    setTmpFilterId(filterId)
    setTmpFilterName(filterName)
    setTmpFilterCapital(filterCapital)
    setTmpFilterPopulationMin(filterPopulationMin)
    setTmpFilterPopulationMax(filterPopulationMax)
    setTmpFilterAreaMin(filterAreaMin)
    setTmpFilterAreaMax(filterAreaMax)
  }, [filterId, filterName, filterCapital, filterPopulationMin, filterPopulationMax, filterAreaMin, filterAreaMax])

  if (!filterisOpen) {
    return (
      <>
        <div className='bg-light p-3'>
          <BsArrowsExpand onClick={
            () => {
              setFilterisOpen(true)
            }
          } role='button' />
        </div>
      </>
    )
  }

  return (
    <>
      <div className='bg-light p-3'>
        <BsArrowsCollapse onClick={
          () => {
            setFilterisOpen(false)
          }
        } role='button' />
        <hr />
        <Form.Group className='mb-3'>
          <Form.Label>ID</Form.Label>
          <Form.Control
            type='number'
            placeholder='ID'
            value={tmpFilterId ?? ''}
            onChange={(e) => { setTmpFilterId(e.target.value !== '' ? Number(e.target.value) : null) }}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Name'
            value={tmpFilterName ?? ''}
            onChange={(e) => { setTmpFilterName(e.target.value) }}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Capital</Form.Label>
          <Form.Control
            type='text'
            placeholder='Capital'
            value={tmpFilterCapital ?? ''}
            onChange={(e) => { setTmpFilterCapital(e.target.value) }}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Population Min</Form.Label>
          <div className='d-flex align-items-center'>
            <Form.Control
              className='me-3'
              type='range'
              placeholder='Population Min'
              min={POPULATION_RANGE_MIN}
              max={POPULATION_RANGE_MAX}
              value={tmpFilterPopulationMin ?? ''}
              onChange={(e) => { setTmpFilterPopulationMin(e.target.value !== '' ? Number(e.target.value) : null) }}
            />
            <div>
              {tmpFilterPopulationMin?.toLocaleString() ?? ''}
            </div>
          </div>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Population Max</Form.Label>
          <div className='d-flex align-items-center'>
            <Form.Control
              className='me-3'
              type='range'
              placeholder='Population Max'
              min={POPULATION_RANGE_MIN}
              max={POPULATION_RANGE_MAX}
              value={tmpFilterPopulationMax ?? ''}
              onChange={(e) => { setTmpFilterPopulationMax(e.target.value !== '' ? Number(e.target.value) : null) }}
            />
            <div>
              {tmpFilterPopulationMax?.toLocaleString() ?? ''}
            </div>
          </div>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Area Min</Form.Label>
            <div className='d-flex align-items-center'>
            <Form.Control
              type='range'
              min={AREA_RANGE_MIN}
              max={AREA_RANGE_MAX}
              placeholder='Area Min'
              value={tmpFilterAreaMin ?? ''}
              onChange={(e) => { setTmpFilterAreaMin(e.target.value !== '' ? Number(e.target.value) : null) }}
            />
            <div>
              {tmpFilterAreaMin?.toLocaleString() ?? ''}
            </div>
          </div>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Area Max</Form.Label>
          <div className='d-flex align-items-center'>
            <Form.Control
              type='range'
              min={AREA_RANGE_MIN}
              max={AREA_RANGE_MAX}
              placeholder='Area Max'
              value={tmpFilterAreaMax ?? ''}
              onChange={(e) => { setTmpFilterAreaMax(e.target.value !== '' ? Number(e.target.value) : null) }}
            />
            <div>
              {tmpFilterAreaMax?.toLocaleString() ?? ''}
            </div>
          </div>
        </Form.Group>
        <div>
          <Button
            variant='primary'
            onClick={() => {
              setFilterId(tmpFilterId)
              setFilterName(tmpFilterName)
              setFilterCapital(tmpFilterCapital)
              setFilterPopulationMin(tmpFilterPopulationMin)
              setFilterPopulationMax(tmpFilterPopulationMax)
              setFilterAreaMin(tmpFilterAreaMin)
              setFilterAreaMax(tmpFilterAreaMax)
            }}
          >
            Filter
          </Button>
          <Button
            variant='secondary'
            className='ms-3'
            onClick={() => {
              setTmpFilterId(null)
              setTmpFilterName(null)
              setTmpFilterCapital(null)
              setTmpFilterPopulationMin(null)
              setTmpFilterPopulationMax(null)
              setTmpFilterAreaMin(null)
              setTmpFilterAreaMax(null)
              setFilterId(null)
              setFilterName(null)
              setFilterCapital(null)
              setFilterPopulationMin(null)
              setFilterPopulationMax(null)
              setFilterAreaMin(null)
              setFilterAreaMax(null)
            }}
          >
            Clear
          </Button>
        </div>
        <hr />
        <Table className='mt-3'>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{filterId?.toLocaleString() ?? '<Not filtered>'}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{filterName ?? '<Not filtered>'}</td>
            </tr>
            <tr>
              <td>Capital</td>
              <td>{filterCapital ?? '<Not filtered>'}</td>
            </tr>
            <tr>
              <td>Population Min</td>
              <td>{filterPopulationMin?.toLocaleString() ?? '<Not filtered>'}</td>
            </tr>
            <tr>
              <td>Population Max</td>
              <td>{filterPopulationMax?.toLocaleString() ?? '<Not filtered>'}</td>
            </tr>
            <tr>
              <td>Area Min</td>
              <td>{filterAreaMin?.toLocaleString() ?? '<Not filtered>'}</td>
            </tr>
            <tr>
              <td>Area Max</td>
              <td>{filterAreaMax?.toLocaleString() ?? '<Not filtered>'}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  )
}
