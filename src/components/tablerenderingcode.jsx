import { useState } from 'react';
import { getNextNDays } from '../utils/utils';

export const Shifts = () => {
  const initialShifts = {
    "Juanito": {
      "06/08/23": "Largo",
      "07/08/23": "Noche",
      "10/08/23": "Largo",
      "11/08/23": "Noche",
      "14/08/23": "Largo",
      "15/08/23": "Noche"
    },
    "Pepito": {
      "06/08/23": "Noche",
      "07/08/23": "Largo",
      "08/08/23": "Noche",
      "09/08/23": "Largo",
      "10/08/23": "Noche",
      "11/08/23": "Largo",
      "12/08/23": "Noche",
      "13/08/23": "Largo",
      "14/08/23": "Noche",
      "15/08/23": "Largo"
    },
    "Miguelito": {
      "06/08/23": "Largo",
      "07/08/23": "Noche",
      "08/08/23": "Largo",
      "09/08/23": "Noche",
      "10/08/23": "Largo",
      "11/08/23": "Noche",
      "12/08/23": "Largo",
      "13/08/23": "Noche",
      "14/08/23": "Largo",
      "15/08/23": "Noche"
    }
  };

  const getWeekdayLabel = (date) => {
    const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const dayIndex = date.getDay();
    return weekdays[dayIndex];
  };

  const [shifts, setShifts] = useState(initialShifts);
  const [daysToShow, setDaysToShow] = useState(10);
  // const [startDate, setStartDate] = useState(new Date().toLocaleDateString('es-CL'));
  const calendarData = getNextNDays(daysToShow, startDate);

  const handleShiftChange = (person, date, shift) => {
    setShifts(prevShifts => ({
      ...prevShifts,
      [person]: {
        ...prevShifts[person],
        [date]: shift
      }
    }));
  };

  const handleNameChange = (oldName, newName) => {
    if (shifts[oldName]) {
      const updatedShifts = { ...shifts };
      updatedShifts[newName] = updatedShifts[oldName];
      delete updatedShifts[oldName];

      setShifts(updatedShifts);
    }
  };

  const handleDateChange = (person, oldDate, newDate) => {
    if (newDate.length === 8) {
      const updatedShifts = { ...shifts };
      updatedShifts[person][newDate] = updatedShifts[person][oldDate];
      delete updatedShifts[person][oldDate];

      setShifts(updatedShifts);
    }
  };

  const handleDeleteDate = (person, date) => {
    const updatedShifts = { ...shifts };
    delete updatedShifts[person][date];

    setShifts(updatedShifts);
  };

  const handleKeyPress = (e, person, date) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur(); // Remove focus after Enter
      handleShiftChange(person, date, e.target.value);
    }
  };

  const handleDeletePerson = (person) => {
    const updatedShifts = { ...shifts };
    delete updatedShifts[person];

    setShifts(updatedShifts);
  };

  const handleAddPerson = () => {
    const newPerson = prompt("Enter new person's name:");
    if (newPerson && !shifts[newPerson]) {
      setShifts(prevShifts => ({
        ...prevShifts,
        [newPerson]: {}
      }));
    }
  };

  const handleDaysToShowChange = (e) => {
    const newDaysToShow = parseInt(e.target.value);
    if (!isNaN(newDaysToShow)) {
      setDaysToShow(newDaysToShow);
    }
  };

  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const formattedDate = `${day}/${month}`;
    setStartDate(formattedDate);
  };

  const handleTodayClick = () => {
    const today = new Date().toLocaleDateString('en-CA');
    setStartDate(today);
  };

  return (
    <div className='w-full p-4 bg-sky-300'>
      <h1>Día de inicio: {startDate}</h1>
      <div className='overflow-x-auto'>
        <thead className='bg-sky-400'>
          <tr>
            <th className='border border-sky-600 px-2 py-1 bg-sky-500 text-white font-semibold whitespace-nowrap'>
              Nombre
            </th>
            {calendarData.map((day, index) => (
              <th className='border border-sky-600 px-1 py-1 bg-sky-500 text-white font-semibold whitespace-nowrap' key={index}>
                {getWeekdayLabel(new Date(day).toLocaleDateString('es-CL'))} {day.slice(3, 5)}-{day.slice(0, 2)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(shifts).map((person, personIndex) => (
            <tr key={personIndex}>
              <td className='border border-sky-600 px-2 py-1'>
                <div className='flex items-center'>
                  <button className='text-red-600' onClick={() => handleDeletePerson(person)}>
                    X
                  </button>
                  <input
                    type='text'
                    value={person}
                    onChange={e => handleNameChange(person, e.target.value)}
                    onClick={e => e.target.select()}
                    className='w-full bg-white px-2 py-1 rounded shadow-md ml-2'
                  />
                </div>
              </td>
              {calendarData.map((day, dayIndex) => (
                <td key={dayIndex} className='border border-sky-600 px-1 py-1'>
                  <input
                    type='text'
                    value={shifts[person][day] ? shifts[person][day] : ''}
                    onChange={e => handleShiftChange(person, day, e.target.value)}
                    onClick={e => e.target.select()}
                    className='w-full bg-white px-1 py-1 rounded shadow-md'
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
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
        <label className='ml-4'>Fecha de inicio:</label>
        <div className='flex'>
          <input
            type='date'
            value={startDate}
            onChange={handleStartDateChange}
            className='ml-1 px-2 py-1 rounded'
          />
          <button onClick={handleTodayClick} className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded ml-2'>
            Hoy
          </button>
        </div>
      </div>
    </div>
  );
};
