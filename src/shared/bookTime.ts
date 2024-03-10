export function bookTime(durationInMinutes, availableTimes) {
    const durationInMilliseconds = durationInMinutes * 60000; // Convert minutes to milliseconds

    // Loop through available time slots
    for (const timeSlot of availableTimes) {
        const startTime = new Date(`2000-01-01T${timeSlot.startTime}`);
        const endTime = new Date(`2000-01-01T${timeSlot.endTime}`);

        // Check if the duration fits within the current time slot
        if (endTime.getTime() - startTime.getTime() >= durationInMilliseconds) {
            // Calculate the end time of the booked slot
            const bookedEndTime = new Date(startTime.getTime() + durationInMilliseconds);

            // Update the start time of the next available slot
            timeSlot.startTime = bookedEndTime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false});

            // Return the booked time slot
            return {
                startTime: startTime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false}),
                endTime: bookedEndTime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false})
            };
        }
    }

    // No available time slot found to book
    return null;
}
