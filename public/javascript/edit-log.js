async function editLogHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="log-title"]').value.trim();
    const body = document.querySelector('textarea[name="log-body"]').value.trim();
    const time = document.querySelector('input[name="log-time"]').value.trim();
    const exercises = document.querySelector('input[name="log-exercise"]').value.trim();
    const calories_burned = document.querySelector('input[name="log-calories"]').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/logs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            body,
            time,
            exercises,
            calories_burned
        }),
        headers: {
            'Content-Type': 'application/json'
          }
    });

    if (response.ok) {
        document.location.replace('/workoutlog');
      } else {
        alert(response.statusText);
      }
    }
  
  document.querySelector('.save-log-btn').addEventListener('click', editLogHandler);
  