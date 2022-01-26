async function deleteLogHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
    
    const response = await fetch(`/api/logs/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        document.location.replace('/workoutlog');
      } else {
        alert(response.statusText);
      }      
  
  }
  
  document.querySelector('.delete-log-btn').addEventListener('click', deleteLogHandler);
  