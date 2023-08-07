import React, { useState } from 'react';
import { formatToTwoDigits, getExampleData, getNextNDays } from '../utils/utils';

export const Shifts = () => {
  const [shiftData, setShiftData] = useState(getExampleData());
  const [daysToShow, setDaysToShow] = useState(8);
  let today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [formatStartDate, setFormatStartDate] = useState(
    startDate.toLocaleDateString('es-Latn')
  );

  const [nextDays, setNextDays] = useState(
    getNextNDays(daysToShow, startDate)
  );

  const getWeekdayLabel = (date) => {
    const weekdays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
    const dayIndex = date;
    return weekdays[dayIndex];
  };

  const handleShiftChange = (personName, date, shift) => {
    setShiftData(prevShiftData => {
      const updatedShifts = prevShiftData.map(person => {
        if (person.name === personName) {
          const updatedShifts = { ...person.shifts };
          if (shift === '') {
            delete updatedShifts[date];
          } else {
            updatedShifts[date] = shift;
          }
          return {
            ...person,
            shifts: updatedShifts
          };
        }
        return person;
      });
      return updatedShifts;
    });
  };

  const handleNameChange = (personName, newName) => {
    setShiftData(prevShiftData => {
      const updatedShifts = prevShiftData.map(person => {
        if (person.name === personName) {
          return {
            ...person,
            name: newName
          };
        }
        return person;
      });
      return updatedShifts;
    });
  };

  const handleDeleteDate = (personName, date) => {
    if (shiftData[personName] && shiftData[personName].shifts[date]) {
      const updatedShiftData = { ...shiftData };
      delete updatedShiftData[personName].shifts[date];

      setShiftData(updatedShiftData);
    }
  };

  const handleDeletePerson = (personName) => {
    if (shiftData[personName]) {
      const updatedShiftData = { ...shiftData };
      delete updatedShiftData[personName];

      setShiftData(updatedShiftData);
    }
  };

  const handleAddPerson = () => {
    const newPersonName = prompt("Enter new person's name:");
    if (newPersonName && !shiftData[newPersonName]) {
      const newPerson = {
        name: newPersonName,
        shifts: {}
      };
      setShiftData(prevShiftData => [...prevShiftData, newPerson]);
    }
  };


  const handleDaysToShowChange = (e) => {
    const newDaysToShow = parseInt(e.target.value);
    if (!isNaN(newDaysToShow)) {
      setDaysToShow(newDaysToShow);
      setNextDays(getNextNDays(newDaysToShow, startDate)); // Update the nextDays based on the new value
    }
  };

  const handleTodayClick = () => {
    const today = new Date().toLocaleDateString('en-CA');
    setStartDate(today);
    setFormatStartDate(new Date().toLocaleDateString('es-Latn')); // Update the formatStartDate display
    setNextDays(getNextNDays(daysToShow, today)); // Update the nextDays based on the new startDate
  };

  const stringToColor = (str, white = false, lightness = 50) => {
    if (white && str === '') {
      return 'rgb(255, 255, 255)';
    }
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
    const adjustedColor = `#${color}`.padEnd(7, '0'); // Ensure color is 6 characters long
    return `${adjustedColor}${Math.floor(lightness).toString(16).padStart(2, '0')}`; // Add lightness as last two characters
  };

  return (
    <>
      <div className='w-full p-4 bg-sky-300'>
        <h1>Día de inicio: {formatStartDate}</h1>
        <div className='overflow-x-auto'>
          <table>
            <thead className='bg-sky-400'>
              <tr>
                <th className='border border-sky-600 px-2 py-1 bg-sky-500 text-white font-semibold whitespace-nowrap'>
                  Nombre
                </th>
                <th className='border border-sky-600 px-2 py-1 bg-sky-500 text-white font-semibold whitespace-nowrap'>
                  Sala #
                </th>
                {nextDays.map((dateObj, index) => (
                  <th
                    className='border border-sky-600 px-1 py-1 bg-sky-500 text-white font-semibold whitespace-nowrap'
                    key={index}
                  >
                    {getWeekdayLabel(dateObj.getDay())} {dateObj.toLocaleDateString('es-Latn')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.values(shiftData).map((person, personIndex) => (
                <tr key={personIndex}>
                  <td className='border border-sky-600 px-2 py-1 w-40'>
                    <div className='flex items-center'>
                      <button className='text-red-600' onClick={() => handleDeletePerson(person.name)}>
                        X
                      </button>
                      <input
                        type='text'
                        value={person.name}
                        onChange={e => handleNameChange(person.name, e.target.value)}
                        onClick={e => e.target.select()}
                        className='w-full bg-white px-2 py-1 rounded shadow-md ml-2'
                      />
                    </div>
                  </td>
                  <td className='border border-sky-600 px-2 py-1'>{person.group}</td>
                  {nextDays.map((dateObj, dayIndex) => {
                    const formattedDate = formatToTwoDigits(dateObj.getDate()) + '/' + formatToTwoDigits(dateObj.getMonth() + 1) + '/' + dateObj.getFullYear().toString().substring(2);
                    return (
                      <td key={dayIndex} className='border border-sky-600 px-1 py-1'>
                        <input
                          type='text'
                          value={person.shifts[formattedDate] || ''}
                          onChange={e => handleShiftChange(person.name, formattedDate, e.target.value)}
                          onClick={e => e.target.select()}
                          className='w-full bg-white px-1 py-1 rounded shadow-md'
                          style={{ backgroundColor: stringToColor(person.shifts[formattedDate] || '', true, 60) }}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}

            </tbody>
          </table>
        </div>
        <div className='mt-4 flex flex-row items-center'>
          <button onClick={handleAddPerson} className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded'>
            Agregar profesional
          </button>
          <label className='ml-4'>Días a mostrar:</label>
          <input
            type='number'
            value={daysToShow}
            onChange={handleDaysToShowChange}
            className='w-20 ml-1 px-2 py-1 rounded'
          />
          <span className='ml-2'>Días</span> {/* Display the span of days */}
        </div>
      </div>
      <h1 className='m-4'>Vista de sólo lectura</h1>
      <div className='w-full p-4 bg-sky-300'>
        <h1>Día de inicio: {formatStartDate}</h1>
        <div className='overflow-x-auto'>
          <table>
            <thead className='bg-sky-400'>
              <tr>
                <th className='border border-sky-600 px-2 py-1 bg-sky-500 text-white font-semibold whitespace-nowrap'>
                  Nombre
                </th>
                <th className='border border-sky-600 px-2 py-1 bg-sky-500 text-white font-semibold whitespace-nowrap'>
                  Sala #
                </th>
                {nextDays.map((dateObj, index) => (
                  <th
                    className='border border-sky-600 px-1 py-1 bg-sky-500 text-white font-semibold whitespace-nowrap'
                    key={index}
                  >
                    {getWeekdayLabel(dateObj.getDay())} {dateObj.toLocaleDateString('es-Latn')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.values(shiftData).map((person, personIndex) => (
                <tr key={personIndex}>
                  <td className='border border-sky-600 px-2 py-1 w-40'>
                    <div className='flex items-center'>
                      {person.name}
                    </div>
                  </td>
                  <td className='border border-sky-600 px-2 py-1'>{person.group}</td>
                  {nextDays.map((dateObj, dayIndex) => {
                    const formattedDate = formatToTwoDigits(dateObj.getDate()) + '/' + formatToTwoDigits(dateObj.getMonth() + 1) + '/' + dateObj.getFullYear().toString().substring(2);
                    return (
                      <td key={dayIndex} className='border border-sky-600 px-1 py-1' style={{ backgroundColor: stringToColor(person.shifts[formattedDate] || '', false, 90) }}>
                        {person.shifts[formattedDate] || ''}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <h2 className='m-4'>JSON Object View</h2>
      <div className='p-4 bg-gray-100'>
        <textarea
          className='w-full h-96 p-2 bg-white border rounded shadow-md'
          value={JSON.stringify(shiftData, null, 2)}
          readOnly
        />
      </div>
    </>
  )
}