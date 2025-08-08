/**
 * Returns all IANA time zones supported by the environment, each formatted with its current GMT offset.
 *
 * @function getAllTimezonesWithGMT
 * @returns {Array<Object>} An array of objects in the format:
 *   {
 *     value: 'Region/City',
 *     label: 'Region/City (GMT±X)'
 *   }
 *
 * @example
 * const timezones = getAllTimezonesWithGMT();
 * // [
 * //   { value: 'Asia/Tokyo', label: 'Asia/Tokyo (GMT+9)' },
 * //   { value: 'Europe/London', label: 'Europe/London (GMT+1)' },
 * //   ...
 * // ]
 *
 * @description
 * This function uses the `Intl.supportedValuesOf('timeZone')` API to get all available IANA time zones.
 * It calculates each time zone's current GMT offset based on the system's local time and the target time zone.
 * The output is suitable for use in dropdowns, selectors, or other UI components requiring formatted time zone labels.
 *
 * @note
 * - Works only in environments that support `Intl.supportedValuesOf()` (e.g., modern browsers or Node.js v20+).
 * - GMT offset reflects the current date and daylight saving time where applicable.
 */


function getAllTimezonesWithGMT() {
  const now = new Date();

  const timezones = Intl.supportedValuesOf('timeZone');

  return timezones.map(tz => {
    const offsetMinutes = -1 * new Date().toLocaleString('en-US', { timeZone: tz, timeZoneName: 'short' })
      .match(/GMT([+-]\d+)/)?.[1] * 60 || 
      new Date().toLocaleTimeString('en-US', { timeZone: tz, hour12: false })
      .split(':')[0] - now.getUTCHours(); // fallback for edge cases

    const offset = new Date().toLocaleString('en-US', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZoneName: 'short'
    });

    // Calculate the offset in minutes
    const local = new Date().toLocaleString('en-US', { timeZone: tz });
    const diff = (new Date(local) - now) / 60000;
    const gmtOffset = `GMT${diff >= 0 ? '+' : ''}${Math.floor(diff / 60)}`;

    return {
      value: tz,
      label: `${tz} (${gmtOffset})`
    };
  });
}

console.log(getAllTimezonesWithGMT());
