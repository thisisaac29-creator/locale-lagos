import { openingHours, site } from '@/data/site'

const weekdayToIndex: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

export interface LagosTime {
  dayIndex: number
  minutes: number
}

/** Current wall-clock time in Africa/Lagos, independent of the visitor's timezone. */
export function lagosTime(date = new Date()): LagosTime {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: site.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)

  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? ''
  return {
    dayIndex: weekdayToIndex[get('weekday')] ?? 0,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

function toMinutes(value: string): number {
  const [hour, minute] = value.split(':').map(Number)
  return hour * 60 + (minute || 0)
}

export function isOpenNow(date = new Date()): boolean {
  const { dayIndex, minutes } = lagosTime(date)
  const today = openingHours.find((_, index) => index === dayIndex)
  if (!today || today.closed || !today.open || !today.close) return false
  return minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)
}

export function isWithin(event: { days?: number[]; start?: string; end?: string }, date = new Date()): boolean {
  const { dayIndex, minutes } = lagosTime(date)
  if (event.days && !event.days.includes(dayIndex)) return false
  if (event.start && minutes < toMinutes(event.start)) return false
  if (event.end && minutes >= toMinutes(event.end)) return false
  return true
}
