import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import 'date-fns'

// With this component you can choose the time for your booking
// When clicked it opens up a clock where you can pick the hour according to the opening hours of the restaurant in half hour intervals

function PickTime(props) {

    const onKeyDown = (e) => {
        e.preventDefault();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                <center>
                    <TimePicker
                        minTime={new Date(0, 0, 0, 10)}
                        maxTime={new Date(0, 0, 0, 22, 1)}
                        label="Select Time"
                        value={props.time}
                        onChange={props.setTime}
                        shouldDisableTime={(timeValue, clockType) => {
                            if (clockType === 'minutes' && (timeValue < 30 && timeValue > 0 || timeValue > 30)) {
                                return true;
                            }
                            return false;
                        }}
                        renderInput={(params) => (
                            <TextField onKeyDown={onKeyDown} {...params} />
                        )}
                    />
                </center>
            </Stack>
        </LocalizationProvider>
    );
}

export default PickTime
