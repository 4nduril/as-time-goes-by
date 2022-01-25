import dayjs from 'dayjs'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  forwardRef,
  FunctionComponent,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import { allowedStarts, allowedUnits } from '../time-functions'

export const UnitSinceForm: FunctionComponent = () => {
  const [unit, setUnit] = useState('')
  const [start, setStart] = useState('')
  const [startDateTime, setStartDateTime] = useState('')
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [time, setTime] = useState('00:00:00')
  const [showDateInput, setShowDateInput] = useState(false)
  const dateInput = useRef(null)
  const timeInput = useRef(null)
  const router = useRouter()
  const pathUnit = router.query.unit
  const pathStart = router.query.start

  useEffect(() => {
    if (unit === '' && typeof pathUnit === 'string') {
      setUnit(pathUnit)
    }
    if (start === '' && typeof pathStart === 'string') {
      if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(pathStart)) {
        setStart('thisDate')
        setShowDateInput(true)
        setDate(pathStart.slice(0, 10))
        setTime(pathStart.slice(11))
        return
      }
      setStart(pathStart)
    }
  }, [pathUnit, pathStart, unit, start])

  const onUnitChange: React.EventHandler<
    React.ChangeEvent<HTMLSelectElement>
  > = evt => {
    setUnit(evt.currentTarget.value)
  }
  const onStartChange: React.EventHandler<
    React.ChangeEvent<HTMLSelectElement>
  > = evt => {
    if (evt.currentTarget.value !== 'thisDate') {
      setShowDateInput(false)
      setStart(evt.currentTarget.value)
      setStartDateTime('')
      return
    }
    setStart(evt.currentTarget.value)
    setShowDateInput(true)
    setStartDateTime(`${date}T${time}`)
  }
  const onDateChange: React.EventHandler<
    React.ChangeEvent<HTMLInputElement>
  > = evt => {
    setDate(evt.currentTarget.value)
  }
  const onTimeChange: React.EventHandler<
    React.ChangeEvent<HTMLInputElement>
  > = evt => {
    setTime(evt.currentTarget.value)
  }
  useEffect(() => {
    if (start === 'thisDate') setStartDateTime(`${date}T${time}`)
  }, [date, time, start])
  return (
    <div className="text-center border rounded border-pink-200 p-8 w-max">
      <div className="flex flex-col md:flex-row md:justify-center space-x-4 items-end mb-8">
        <label>
          <span className="block italic mb-4">How many of what</span>{' '}
          <Select className="mb-4 md:mb-0" value={unit} onChange={onUnitChange}>
            {['', ...allowedUnits].map(unitName => (
              <option key={unitName}>{unitName}</option>
            ))}
          </Select>
        </label>{' '}
        <span className="mb-4 md:mb-0">have gone by since</span>{' '}
        <label>
          <span className="block italic mb-4">which point in time</span>{' '}
          <Select value={start} onChange={onStartChange}>
            {[
              '',
              ...allowedStarts.filter(s => s !== 'thisDay'),
              'thisDate',
            ].map(startName => (
              <option key={startName} value={startName}>
                {startName === 'today'
                  ? startName
                  : startName
                      .slice(0, 4)
                      .concat(' ', startName.slice(4).toLowerCase())}
              </option>
            ))}
          </Select>
        </label>
        {showDateInput && (
          <div className="flex flex-col md:flex-row md:space-x-4">
            <label className="flex flex-col mt-4 md:mt-0">
              <span className="italic mb-4">date</span>{' '}
              <Input
                type="date"
                ref={dateInput}
                onChange={onDateChange}
                value={date}
              />
            </label>
            <label className="flex flex-col mt-4 md:mt-0">
              <span className="italic mb-4">time</span>{' '}
              <Input
                type="time"
                ref={timeInput}
                onChange={onTimeChange}
                value={time}
              />
            </label>
          </div>
        )}
      </div>
      {unit.length > 0 && start.length > 0 ? (
        <Link href={`/${unit}/since/${startDateTime || start}`}>
          <a
            onClick={e => e.currentTarget.blur()}
            className="border rounded-md border-pink-200 px-4 py-2 focus:ring-1 focus:ring-pink-300 focus:border-pink-300 focus:outline-none"
          >
            Go
          </a>
        </Link>
      ) : null}
    </div>
  )
}

const Select: FunctionComponent<SelectHTMLAttributes<HTMLSelectElement>> = ({
  children,
  className,
  ...rest
}) => (
  <select
    className={`bg-transparent border-pink-200 focus:border-pink-300 focus:ring-pink-300 ${className}`}
    {...rest}
  >
    {children}
  </select>
)

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function InnerInput({ className, ...rest }, ref) {
  return (
    <input
      ref={ref}
      className={`bg-transparent border-pink-200 focus:border-pink-300 focus:ring-pink-300 ${className}`}
      {...rest}
    />
  )
})
