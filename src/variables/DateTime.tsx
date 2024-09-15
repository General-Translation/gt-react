import { formatDateTime } from 'generaltranslation';
import getI18NConfig from '../utils/getI18NConfig';
import getLocale from '../request/getLocale';

/**
 * The `<DateTime>` component renders a formatted date or time string, allowing customization of the name, default value, and formatting options.
 * It utilizes the current locale and optional format settings to display the date.
 *
 * @example
 * ```jsx
 * <DateTime
 *    name="createdAt"
 * >
 *    {new Date()}
 * </DateTime>
 * ```
 *
 * @param {any} [children] - Optional content (typically a date) to render inside the component.
 * @param {string} [name="date"] - Optional name for the date field, used for metadata purposes.
 * @param {string|number|Date} [defaultValue] - The default value for the date. Can be a string, number (timestamp), or `Date` object.
 * @param {Intl.DateTimeFormatOptions} [options={}] - Optional formatting options for the date, following `Intl.DateTimeFormatOptions` specifications.
 * @returns {JSX.Element} The formatted date or time component.
 */
function DateTime({ children, name = "date", defaultValue, options = {}, ...props }: {
    children?: any;
    name?: string;
    defaultValue?: any; // The default value which can be number, string, or Date
    options?: Intl.DateTimeFormatOptions; // Optional formatting options for the date
    [key: string]: any
}): JSX.Element {

    const I18NConfig = getI18NConfig();
    const locales = [ getLocale(), I18NConfig.getDefaultLocale() ];

    // Extract general translation data from props
    const { "data-generaltranslation": generaltranslation } = props;

    // Determine the default value to use
    if (typeof children !== 'undefined' && typeof defaultValue === 'undefined') {
        defaultValue = children;
    }
    if (!defaultValue) {
        return (
            <span 
                data-generaltranslation={generaltranslation} 
                data-gt-variable-name={name} 
                data-gt-variable-type={"date"} 
                data-gt-variable-options={options}
            />
        )
    }

    // Convert defaultValue to a Date object if it's a Unix time, string, or Date object
    let dateValue: Date | undefined;
    
    if (typeof defaultValue === 'number') {
        dateValue = new Date(defaultValue * 1000); // Assuming Unix time is in seconds
    } else if (typeof defaultValue === 'string') {
        dateValue = new Date(defaultValue);
    } else if (defaultValue instanceof Date) {
        dateValue = defaultValue;
    }

    // Format the date according to the locale and options
    const dateString = dateValue ? formatDateTime({ value: dateValue, languages: locales, options }) : '';
    const formattedValue = dateString.replace(/[\u200F\u202B\u202E]/g, '')

    // Render the formatted date within a span element
    return (
        <span 
            data-generaltranslation={generaltranslation} 
            data-gt-variable-name={name} 
            data-gt-variable-type={"date"} 
            data-gt-variable-options={options}
            data-gt-unformatted-value={isValidDate(dateValue) ? dateValue : undefined}
        >
            {formattedValue}
        </span>
    );
};

DateTime.gtTransformation = "variable-datetime"

export default DateTime;

/**
 * Checks if the input is a valid date object or a string that can be converted to a date.
 * @param {any} input - The input to check.
 * @returns {boolean} - Returns true if the input is a valid date, false otherwise.
 */
function isValidDate(input: any): boolean {
    const date = new Date(input);
    return !isNaN(date.getTime());
}