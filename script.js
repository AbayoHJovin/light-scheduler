const socket = new WebSocket('ws://localhost:8765');
const statusDisplay = document.getElementById('status');

socket.addEventListener('open', () => {
  statusDisplay.textContent = 'Status: Connected to server';
});

socket.addEventListener('message', (event) => {
  statusDisplay.textContent = `Status: ${event.data}`;
});

socket.addEventListener('close', () => {
  statusDisplay.textContent = 'Status: Disconnected from server';
});

function submitSchedule() {
  const onTimeInput = document.getElementById('on-time').value;
  const offTimeInput = document.getElementById('off-time').value;

  if (!onTimeInput || !offTimeInput) {
    statusDisplay.textContent = 'Status: Please select both ON and OFF times';
    return;
  }

  const schedulePayload = {
    onTime: onTimeInput,
    offTime: offTimeInput,
  };

  socket.send(JSON.stringify(schedulePayload));
  statusDisplay.textContent = 'Status: Schedule sent';
}
