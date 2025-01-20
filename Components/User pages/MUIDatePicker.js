import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import TextField from '@mui/material/TextField';


const MUIDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar
        label="Select a Date"
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        // renderInput={(params) => <TextField {...params} />}
        sx={{
          width: '276px', // Fixed calendar width
          backgroundColor: 'black', // Black background
          borderRadius: '30px', // Rounded corners
          color: 'white', // Text color
          '& .MuiPickersDay-root': {
            width: '38px', // Adjust day size
            height: '38px',
            color: 'white',
            '&.Mui-selected': {
              backgroundColor: '#1976d2', // Selected day background
            },
            '&:hover': {
              backgroundColor: '#333',
            },
          },
          '& .MuiTypography-root': {
            color: 'white',
            fontSize: '16px',
          },
          '& .MuiDateCalendar-viewTransitionContainer': {
            display: 'flex',
            justifyContent: 'center',
          
          },
          '& .MuiYearPicker-root': {
            maxWidth: '200px', // Fix year picker dropdown width
          },
          '& .MuiPickersYear-root': {
            width: '90%', // Ensure year items fit within the dropdown
            color: 'white', // Year text color
            backgroundColor:'blueviolet',
            '&:hover': {
              backgroundColor: '#333', // Hover effect for years
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default MUIDatePicker;
