// @ts-nocheck

/**
 * x-date-picker 繁体多语言
 * @param pickersTranslations
 * @returns
 */
export const getPickersLocalization = (pickersTranslations) => ({
    components: {
        MuiLocalizationProvider: {
            defaultProps: {
                localeText: { ...pickersTranslations },
            },
        },
    },
})

const views = {
    hours: '小時',
    minutes: '分鐘',
    seconds: '秒',
}

const zhHKPickers = {
    // Calendar navigation
    previousMonth: '上個月',
    nextMonth: '下個月',

    // View navigation
    openPreviousView: '前一個視圖',
    openNextView: '下一個視圖',
    calendarViewSwitchingButtonAriaLabel: (view) => (view === 'year' ? '年視圖已打開，切換為行事曆視圖' : '行事曆視圖已打開，切換為年視圖'),

    // DateRange placeholders
    start: '開始',
    end: '結束',

    // Action bar
    cancelButtonLabel: '取消',
    clearButtonLabel: '清除',
    okButtonLabel: '確認',
    todayButtonLabel: '今天',

    // Toolbar titles
    // datePickerToolbarTitle: 'Select date',
    // dateTimePickerToolbarTitle: 'Select date & time',
    // timePickerToolbarTitle: 'Select time',
    // dateRangePickerToolbarTitle: 'Select date range',

    // Clock labels
    clockLabelText: (view, time, adapter) =>
        `Select ${views[view]}. ${time === null ? '未選擇時間' : `已選擇${adapter.format(time, 'fullTime')}`}`,
    hoursClockNumberText: (hours) => `${hours}小時`,
    minutesClockNumberText: (minutes) => `${minutes}分鐘`,
    secondsClockNumberText: (seconds) => `${seconds}秒`,

    // Calendar labels
    // calendarWeekNumberHeaderLabel: 'Week number',
    // calendarWeekNumberHeaderText: '#',
    // calendarWeekNumberAriaLabelText: weekNumber => `Week ${weekNumber}`,
    // calendarWeekNumberText: weekNumber => `${weekNumber}`,

    // Open picker labels
    openDatePickerDialogue: (value, utils) =>
        value !== null && utils.isValid(value) ? `選擇日期，已選擇${utils.format(value, 'fullDate')}` : '選擇日期',
    openTimePickerDialogue: (value, utils) =>
        value !== null && utils.isValid(value) ? `選擇時間，已選擇${utils.format(value, 'fullTime')}` : '選擇時間',

    // Table labels
    timeTableLabel: '選擇時間',
    dateTableLabel: '選擇日期',

    // Field section placeholders
    // fieldYearPlaceholder: params => 'Y'.repeat(params.digitAmount),
    // fieldMonthPlaceholder: params => params.contentType === 'letter' ? 'MMMM' : 'MM',
    // fieldDayPlaceholder: () => 'DD',
    // fieldWeekDayPlaceholder: params => params.contentType === 'letter' ? 'EEEE' : 'EE',
    // fieldHoursPlaceholder: () => 'hh',
    // fieldMinutesPlaceholder: () => 'mm',
    // fieldSecondsPlaceholder: () => 'ss',
    // fieldMeridiemPlaceholder: () => 'aa',
}

export const zhHK = getPickersLocalization(zhHKPickers)
