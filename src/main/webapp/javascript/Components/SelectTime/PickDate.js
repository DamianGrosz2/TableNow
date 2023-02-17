import React from "react"
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import 'date-fns'

// With this component you can choose the time for your booking
// When clicked it opens up a calendar where you can pick the current day or a day in the future

function PickDate(props) {

    const onKeyDown = (e) => {
        e.preventDefault();
    };
    function disableWeekends(date) {
        // Disable today and tomorrow
        return date.getDate()  === new Date().getDate();

    }
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <center>
                        <DesktopDatePicker
                            disablePast={true}
                            shouldDisableDate={disableWeekends}
                            variant="inline"
                            inputFormat="dd.MM.yyyy"
                            margin="normal"
                            id="date-picker"
                            label="Select Day"
                            value={props.date}
                            onChange={props.setDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            renderInput={(params) => (
                                <TextField onKeyDown={onKeyDown} {...params} />
                            )}
                        />
                    </center>
                </Stack>
            </LocalizationProvider>
        </div>
    )
}

export default PickDate