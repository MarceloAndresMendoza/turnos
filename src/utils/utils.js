export const getNextNDays = (n, startDate) => {
    const dateArray = [];
    let currentDate = new Date(startDate);

    for (let i = 0; i < n; i++) {
        const newDate = new Date(currentDate); // Create a new Date object
        dateArray.push(newDate);
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
}


export const formatToTwoDigits = (number) => {
    return number.toString().padStart(2, '0');
}

export const getExampleData = () => {
    return [
        {
            "name": "Juanito",
            "group": "UCI-1",
            "shifts": {
                "06/08/23": "Largo",
                "10/08/23": "Largo",
                "11/08/23": "Noche",
                "14/08/23": "Largo",
                "15/08/23": "Noche",
                "08/08/23": "Largo",
                "18/08/23": "Largo",
                "22/08/23": "Largo",
                "19/08/23": "Noche",
                "23/08/23": "Noche"
            }
        },
        {
            "name": "Pepito",
            "group": "UCI-1",
            "shifts": {
                "07/08/23": "Largo",
                "08/08/23": "Noche",
                "11/08/23": "Largo",
                "12/08/23": "Noche",
                "15/08/23": "Largo",
                "16/08/23": "Noche",
                "19/08/23": "Largo",
                "23/08/23": "Largo",
                "20/08/23": "Noche",
                "24/08/23": "Noche"
            }
        },
        {
            "name": "Alejandro",
            "group": "UCI-1",
            "shifts": {
                "06/08/23": "Largo",
                "07/08/23": "Noche",
                "10/08/23": "Largo",
                "11/08/23": "Noche",
                "14/08/23": "Largo",
                "15/08/23": "Noche",
                "18/08/23": "Largo",
                "22/08/23": "Largo",
                "19/08/23": "Noche",
                "23/08/23": "Noche"
            }
        },
        {
            "name": "Marcelo",
            "group": "UCI-2",
            "shifts": {
                "09/08/23": "Largo",
                "10/08/23": "Noche",
                "13/08/23": "Largo",
                "14/08/23": "Noche",
                "17/08/23": "Largo",
                "21/08/23": "Largo",
                "25/08/23": "Largo",
                "18/08/23": "Noche",
                "22/08/23": "Noche"
            }
        },
        {
            "name": "Rodrigo",
            "group": "UCI-2",
            "shifts": {
                "07/08/23": "Largo",
                "08/08/23": "Noche",
                "11/08/23": "Largo",
                "12/08/23": "Noche",
                "13/08/23": "Noche",
                "15/08/23": "Largo",
                "19/08/23": "Largo",
                "23/08/23": "Largo",
                "16/08/23": "Noche",
                "20/08/23": "Noche",
                "24/08/23": "Noche"
            }
        },
        {
            "name": "Daniela",
            "group": "UCI-2",
            "shifts": {
                "07/08/23": "Largo",
                "08/08/23": "Largo",
                "09/08/23": "Noche",
                "11/08/23": "Largo",
                "12/08/23": "Noche",
                "13/08/23": "Noche",
                "15/08/23": "Largo",
                "19/08/23": "Largo",
                "23/08/23": "Largo",
                "16/08/23": "Noche",
                "20/08/23": "Noche",
                "24/08/23": "Noche"
            }
        },
        {
            "name": "César",
            "shifts": {
                "07/08/23": "Diurno",
                "08/08/23": "Diurno",
                "09/08/23": "Diurno",
                "10/08/23": "Diurno",
                "11/08/23": "Diurno",
                "14/08/23": "Diurno",
                "15/08/23": "Diurno",
                "16/08/23": "Diurno",
                "17/08/23": "Diurno",
                "18/08/23": "Diurno",
                "21/08/23": "Diurno",
                "22/08/23": "Diurno",
                "23/08/23": "Diurno",
                "24/08/23": "Diurno",
                "25/08/23": "Diurno"
            }
        }
    ]
}