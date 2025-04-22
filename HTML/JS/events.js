document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('event-form');
    const isEditPage = document.querySelector('.btn-delete') !== null;
    let events = JSON.parse(localStorage.getItem('events')) || [];
    
    if (isEditPage) {
      const urlParams = new URLSearchParams(window.location.search);
      const eventId = urlParams.get('id');
      const event = events.find(e => e.id === eventId);
      
      if (event) {
        document.getElementById('event-title').value = event.title;
        document.getElementById('event-category').value = event.category;
        document.getElementById('event-date').value = event.date;
        document.getElementById('event-description').value = event.description || '';
      }
      
      document.querySelector('.btn-delete').addEventListener('click', function() {
        events = events.filter(e => e.id !== eventId);
        localStorage.setItem('events', JSON.stringify(events));
        window.location.href = 'main.html';
      });
    }

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const title = document.getElementById('event-title').value;
      const category = document.getElementById('event-category').value;
      const date = document.getElementById('event-date').value;
      const description = document.getElementById('event-description').value;
      
      const eventData = {
        title,
        category,
        date,
        description,
        id: isEditPage ? new URLSearchParams(window.location.search).get('id') : Date.now().toString()
      };
      
      if (isEditPage) {
        const index = events.findIndex(e => e.id === eventData.id);
        if (index !== -1) {
          events[index] = eventData;
        }
      } else {
        events.push(eventData);
      }
      
      localStorage.setItem('events', JSON.stringify(events));
      window.location.href = 'main.html';
    });
  });