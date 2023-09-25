import { 
    DPCalendar, 
    useContextCalendars, 
    useContextDays, 
    useContextDaysPropGetters, 
    DPDay, 
    DPTime, 
    useContextTime, 
    useContextTimePropGetters,
    useContextDatePickerOffsetPropGetters
} from '@rehookify/datepicker';
import React, { FC, ReactNode } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { Theme } from '../../../theme';
import { defaultTheme } from '../../../theme/theme';

const getDayClassName = (
    className: string,
    theme: Theme,
    { selected, disabled, inCurrentMonth, now }: DPDay
) => {
    if (now) className += ' outline outline-[1px]';

    if (disabled) return className + ' opacity-10 cursor-not-allowed';

    if (selected) return className + ' ring ring-inset text-white opacity-100';

    if (!inCurrentMonth) return className + ' opacity-30';
    
    return className;
}

const getTimesClassName = (
    className: string,
    { selected, disabled }: DPTime
) => {
    if (disabled) return className + ' opacity-25 cursor-not-allowed';
    if (selected) return className + ' opacity-100';
    return className + ' opacity-20';
}

interface CalendarProps {
    prevButton?: ReactNode;
    nextButton?: ReactNode;
    calendar: DPCalendar;
    theme?: Theme;
}

const DatePicker: FC<CalendarProps> = ({ prevButton, nextButton, calendar, theme }) => {
    const swapTheme: Theme = { ...defaultTheme, ...theme };
    const { selectedDates } = useContextDays();
    const { weekDays } = useContextCalendars();
    const { dayButton } = useContextDaysPropGetters();
    const { days, month, year } = calendar;
    const { time } = useContextTime();
    const { timeButton } = useContextTimePropGetters();
    
    return (
        <div className='space-y-2'>
            <div 
                className='pt-8 p-4'
                style={{
                    backgroundColor: swapTheme.accentBackgroundColor,
                    borderRadius: swapTheme.secondaryBorderRadius,
                    borderWidth: swapTheme.accentBorderWidth,
                    borderColor: swapTheme.accentBorderColor,
                    color: swapTheme.primaryText
                }}
            >
                <div className='flex grow items-center justify-center pb-8'>
                    {prevButton}
                    <p className="text-center text-sm w-48 font-medium">{month + ' ' + year}</p>
                    {nextButton}
                </div>
                <div className="grid grid-cols-7 gap-y-2 mb-2 items-center h-8">
                    {weekDays.map((d) => (
                        <p 
                            className="text-xs text-center"
                            key={d}
                        >
                            {d}
                        </p>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-x-1 gap-y-1">
                    {days.map((d) => (
                        <button 
                            key={d.$date.toString()} 
                            className={getDayClassName("py-2 px-2 text-sm", swapTheme, d)}
                            style={{
                                borderRadius: swapTheme.accentBorderRadius,
                                backgroundColor: d.selected ? swapTheme.lightBrandColor : 'transparent',
                                "--tw-ring-color": swapTheme.brandColor,
                                outlineColor: swapTheme.accentBorderColor
                            }}
                            {...dayButton(d)}
                        >
                            {d.day}
                        </button>
                    ))}
                </div>
            </div>
            <div 
                className='relative px-6 py-3'
                style={{
                    borderTopLeftRadius: swapTheme.secondaryBorderRadius,
                    borderTopRightRadius: swapTheme.secondaryBorderRadius,
                    borderBottomLeftRadius: swapTheme.timeSelectBottomBorderRadius,
                    borderBottomRightRadius: swapTheme.timeSelectBottomBorderRadius,
                    backgroundColor: swapTheme.accentBackgroundColor,
                    borderRadius: swapTheme.secondaryBorderRadius,
                    borderWidth: swapTheme.accentBorderWidth,
                    borderColor: swapTheme.accentBorderColor,
                    color: swapTheme.primaryText
                }}
            >
                <div className='flex space-x-4 fade-edges'>
                    <div 
                        className='flex flex-col w-full items-end overflow-y-scroll h-36 snap-y hide-scrollbar py-16 pr-3'
                    >
                        {
                            time
                                .filter(t => selectedDates[0] && t.$date.getMinutes() === selectedDates[0].getMinutes())
                                .map((t) => (
                                    <button
                                        className={getTimesClassName("snap-center text-3xl font-medium monospace-font", t)} {...timeButton(t)}
                                        key={t.$date.toString()}
                                        style={{
                                            color: t.selected ? swapTheme.primaryText : ''
                                        }}
                                    >
                                        {t.$date.getHours()}
                                    </button>
                                ))
                        }
                    </div>
                    <p className='flex grow items-center justify-center text-3xl font-medium opacity-50'>
                        :
                    </p>
                    <div className='flex flex-col w-full items-start overflow-y-scroll h-36 snap-y hide-scrollbar py-16 pl-3'>
                        {time
                            .filter(t => selectedDates[0] && t.$date.getHours() === selectedDates[0].getHours())
                            .map((t) => (
                                <button 
                                    className={getTimesClassName("snap-center text-3xl font-medium monospace-font", t)} {...timeButton(t)}
                                    key={t.$date.toString()}
                                    style={{
                                        color: t.selected ? swapTheme.primaryText : ''
                                    }}
                                >
                                    {t.$date.getMinutes() < 10 ? ('0' + t.$date.getMinutes()) : t.$date.getMinutes()}
                                </button>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface DateTimeSelectProps {
    theme?: Theme;
}

const DateTimeSelect = ({ theme }: DateTimeSelectProps) => {
    const { calendars } = useContextCalendars();
    const { subtractOffset, addOffset } = useContextDatePickerOffsetPropGetters()

    return (
        <div className="pt-4">
            <DatePicker
                prevButton={
                    <button {...subtractOffset({ months: 1 })}>
                        <IoChevronBack />
                    </button>
                }
                nextButton={
                    <button {...addOffset({ months: 1 })}>
                        <IoChevronForward />
                    </button>
                }
                calendar={calendars[0]}
                theme={theme}
            />
        </div>
    )
}

export default DateTimeSelect;
