export function getAvailableTimes(startDayTime, endDayTime, bookTimes) {
    // Convert startDayTime and endDayTime to Date objects
    let startDateTime = new Date(`2000-01-01T${startDayTime}`);
    let endDateTime = new Date(`2000-01-01T${endDayTime}`);
  
    // Initialize an array to store available times
    let availableTimes = [];
  
    // Loop through each booked time slot
    bookTimes.forEach(bookTime => {
      const bookedStartTime = new Date(`2000-01-01T${bookTime.startTime}`);
      const bookedEndTime = new Date(`2000-01-01T${bookTime.endTime}`);
  
      // Check if booked time slot overlaps with available time range
      if (bookedStartTime < endDateTime && bookedEndTime > startDateTime) {
        // Adjust available time range based on booked time slot
        if (bookedStartTime > startDateTime) {
          availableTimes.push({
            startTime: startDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
            endTime: bookedStartTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
          });
        }
        if (bookedEndTime < endDateTime) {
          startDateTime.setTime(bookedEndTime.getTime());
        } else {
          startDateTime = null; // No available time left
        }
      }
    });
  
    // Add remaining time after last booked slot if applicable
    if (startDateTime && startDateTime < endDateTime) {
      availableTimes.push({
        startTime: startDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        endTime: endDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
      });
    }
  
    return availableTimes;
  }
  