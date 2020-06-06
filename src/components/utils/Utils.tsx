import moment, {Moment} from "moment";

export const DATE_TIME_PATTERN = "DD.MM.YYYY HH:mm:ss";

export const getCurrentDate = () => {
    let date: Moment = moment();
    return date.format(DATE_TIME_PATTERN);
}
