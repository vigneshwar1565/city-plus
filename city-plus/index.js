const getEvents = async () => {
    const response = await fetch('https://app.ticketmaster.com/discovery/v2/events?apikey=TATJcNIbg0oA2Hy5lvIoU0dG2NmzHcEf&locale=*').then(res => res.json());
    console.log('Events ======>',esponse);
}

getEvents();