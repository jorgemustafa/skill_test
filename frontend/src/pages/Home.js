import React, {useEffect, useState} from "react";
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import axiosClient from "../utils/axios";

export default function CustomizedTimeline() {
    const [employees, setEmployees] = useState([]);

    // get employees data
    useEffect(() => {
        axiosClient.get("/api/employee")
            .then((res) => {
                setEmployees(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <Box sx={{ bgcolor: '#f4f4f4', p: 4 }}>
            <Typography variant="h4" component="h4" align="center" gutterBottom sx={{ color: '#333', pb: 4 }}>
                Employees Timeline
            </Typography>
            <Timeline position="alternate">
                {employees.map((employee) => (
                    <TimelineItem key={employee.id}>
                        <TimelineSeparator>
                            <TimelineDot color="primary" variant="outlined" sx={{ borderColor: '#3f51b5' }} />
                            <TimelineConnector sx={{ bgcolor: '#3f51b5' }} />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '30px', px: 2 }}>
                            <Typography variant="h6" component="h6" sx={{ color: '#3f51b5', pb: 1 }}>
                                {employee.name}
                            </Typography>
                            <div>
                                <Typography variant="subtitle1" color="textSecondary" component="span">
                                    Company:&nbsp;
                                </Typography>
                                <Typography variant="body1" component="span">
                                    {employee.company_name}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="subtitle1" color="textSecondary" component="span">
                                    Date Start:&nbsp;
                                </Typography>
                                <Typography variant="body1" component="span">
                                    {employee.dt_start}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="subtitle1" color="textSecondary" component="span">
                                    Date End:&nbsp;
                                </Typography>
                                <Typography variant="body1" component="span">
                                    {employee.dt_end}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="subtitle1" color="textSecondary" component="span">
                                    Vacation Days:&nbsp;
                                </Typography>
                                <Typography variant="body1" component="span">
                                    {employee.vacation_days}
                                </Typography>
                            </div>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </Box>
    );
}
