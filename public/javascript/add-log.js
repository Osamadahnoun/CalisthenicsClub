async function newlogHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="log-title"]').value;
    const body = document.querySelector('textarea[name="log-body"]').value;
    const time = document.querySelector('input[name="log-time"]').value;
    const exercises = document.querySelector('input[name="log-exercise"]').value;
    const calories_burned = document.querySelector('input[name="log-calories"]').value;
  
    const response = await fetch(`/api/logs`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        exercises,
        time,
        calories_burned
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/workoutLog');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.create-log').addEventListener('click', newlogHandler);
  