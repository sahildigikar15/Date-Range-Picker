export default function Button(props: {
    idx: number,
    onClickEvent: () => void,
    value: string,
    isSelected: boolean,
    isDisabled: boolean,
    setHoverDate: (date: number | null) => void,
    selectedDate: number | null,
    toDate: number,
    start: number | null,
    end: number | null,
    month: number,
    year: number,
    hover: number | null,
    hover2: number | null,
    isEndPicker: boolean,
    prevDate: number | null,
    prevend: boolean,
    isClickedSecond: boolean
  }) {
    const { idx, onClickEvent, value, isSelected, isDisabled, setHoverDate, selectedDate, toDate, start, end, month, year, hover, hover2, isEndPicker, prevDate, prevend, isClickedSecond } = props;
  
    let ishovered: string;
    ishovered = (start && idx > start && idx <= hover ? 'today' : '')
    if (end) {
      ishovered = (idx >= start && idx <= end) ? 'today' : ''
    } else {
      if (start && isClickedSecond && idx >= start) {
        ishovered = 'today';
      }
    }
    ishovered = !end || (idx <= end) ? ishovered : ''
  
  
    let ishovered2: string;
    ishovered2 = (start && idx > start && idx <= hover2 ? 'today' : '')
    if (end) {
      ishovered2 = (idx >= start && idx <= end) ? 'today' : ''
    }
    ishovered2 = !end || (idx <= end) ? ishovered2 : ''
  
  
    let selected = isSelected ? 'selected' : '';
  
    if (isEndPicker && hover2 && idx <= hover2 && !prevend && prevDate) {
      ishovered2 = 'today';
  
    }
    if (isEndPicker && start && prevDate && !prevend && hover2) {
      ishovered2 = (idx <= start) ? 'today' : '';
    }
    // if(!start && prevDate && idx > prevDate && !isEndPicker) {
    //   ishovered = 'today';
    // }
  
    if (ishovered != 'today' && !end && hover2 != null) {
      ishovered = 'today'
    }
  
    return (
      <>
        <button
          onClick={onClickEvent}
          className={`${!isEndPicker ? ishovered : ''} ${selected} ${isEndPicker ? ishovered2 : ''}`}
          disabled={isDisabled}
          onMouseEnter={() => setHoverDate(idx)}
          onMouseLeave={() => setHoverDate(null)}
        >
          {value}
        </button>
      </>
    )
  }