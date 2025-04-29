import asyncio
import websockets
import json
import subprocess

async def handle_connection(websocket, path):
    try:
        async for message in websocket:
            data = json.loads(message)
            on_time = data['onTime']
            off_time = data['offTime']
            
            # Publish to MQTT
            subprocess.run(['mosquitto_pub', '-h', 'localhost', '-t', 'light/schedule', '-m', 
                           f'{{"onTime":"{on_time}","offTime":"{off_time}"}}'])
            
            await websocket.send('Schedule received and published to MQTT')
    except Exception as e:
        await websocket.send(f'Error: {str(e)}')

start_server = websockets.serve(handle_connection, 'localhost', 8765)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()