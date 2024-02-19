import moment from 'moment';
export const totalTime = (inTime: Date, outTime: Date) => {
    const diffInMin = moment(outTime).diff(moment(inTime), 'minute');
    const diff = Math.floor(diffInMin / 60) + 'h:' + diffInMin % 60 +"m"
    return diff;
}