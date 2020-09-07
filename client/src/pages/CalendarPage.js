import React, { useState, useContext,useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import './CalendarPage.css'
import TaskListContext from './TaskListContext'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'; // needs additional webpack config!
import { Calendar } from '@fullcalendar/core';
import bootstrapPlugin from '@fullcalendar/bootstrap';

export default function CalendarPage(){
    const calendarComponentRef = React.createRef();
    const context = useContext(TaskListContext)
    const [taskList,setTaskList] = useState([])
    const [calendarWeekends,setCalendarWeekends] = useState(true)
    const [calendarEvents,setCalendarEvents] = useState(taskList)

    const toggleWeekends = () => {
        setCalendarWeekends(!calendarWeekends)
    }
    const gotoPast = () => {
        let calendarApi = calendarComponentRef.current.getApi()
        calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    }
    const handleDateClick = (arg) => {
            setCalendarEvents(calendarEvents.concat({ // creates a new array
                title: 'New Event',
                start: arg.date,
                allDay: arg.allDay,
            }))
    }

    useEffect(() => {
        setTaskList(Object.values(context.taskDetails).map((task) => {
        if (task.status === "complete") {
            return { title: task.name, date: task.dueDate, textColor: "red"} 
        } else if (task.status === "new") {
            return { title: task.name, date: task.dueDate, textColor: "blue" }}
        }))
    }, [context.taskDetails])

    useEffect(()=>{
        setCalendarEvents(taskList)
    },[taskList])
    console.log(taskList)

    return (
            <div className='demo-app'>
                <div className='demo-app-top'>
                    <button onClick={toggleWeekends}>toggle weekends</button>&nbsp;
          <button onClick={gotoPast}>go to a date in the past</button>&nbsp;
          (also, click a date/time to add an event)
        </div>
                <div className='demo-app-calendar'>
                    <FullCalendar
                        defaultView="dayGridMonth"
                        header={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin]}
                        ref={calendarComponentRef}
                        weekends={calendarWeekends}
                        events={calendarEvents}
                        dateClick={handleDateClick}
                    />
                </div>
            </div>
        )
}