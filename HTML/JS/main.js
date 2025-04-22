document.addEventListener('DOMContentLoaded', function() {
    const eventsGrid = document.getElementById('events-grid');
    const sortSelect = document.getElementById('sort-by');
    const filterSelect = document.getElementById('filter-by');
    let events = JSON.parse(localStorage.getItem('events')) || [];

    function renderEvents() {
        eventsGrid.innerHTML = '';
        
        if (events.length === 0) {
            eventsGrid.innerHTML = '<div class="no-events">Нет событий. Добавьте первое событие!</div>';
            return;
        }

        let filteredEvents = [...events];
        const filterValue = filterSelect.value;
        if (filterValue !== 'all') {
            filteredEvents = filteredEvents.filter(event => event.category === filterValue);
        }
        
        const sortValue = sortSelect.value;
        filteredEvents.sort((a, b) => {
            switch (sortValue) {
                case 'date-asc':
                    return new Date(a.date) - new Date(b.date);
                case 'date-desc':
                    return new Date(b.date) - new Date(a.date);
                case 'title-asc':
                    return a.title.localeCompare(b.title);
                case 'title-desc':
                    return b.title.localeCompare(a.title);
                default:
                    return 0;
            }
        });

        filteredEvents.forEach(event => {
            const card = document.createElement('div');
            card.className = 'event-card';
            card.dataset.id = event.id;
            card.dataset.category = event.category;
            
            card.innerHTML = `
                <h3 class="event-title">${event.title}</h3>
                <p class="event-date">${formatDate(event.date)}</p>
                ${event.description ? `<p class="event-description">${event.description}</p>` : ''}
                <span class="event-category ${event.category}">${getCategoryName(event.category)}</span>
            `;
            
            card.addEventListener('click', () => {
                window.location.href = `editEvent.html?id=${event.id}`;
            });

            card.style.opacity = '0';
            eventsGrid.appendChild(card);
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease';
                card.style.opacity = '1';
            }, 10);
        });
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    }
    
    function getCategoryName(category) {
        const categories = {
            work: 'Работа',
            personal: 'Личное',
            family: 'Семья',
            other: 'Другое'
        };
        return categories[category] || category;
    }

    sortSelect.addEventListener('change', renderEvents);
    filterSelect.addEventListener('change', renderEvents);

    renderEvents();
});