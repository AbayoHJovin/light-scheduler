# 💡 Light Scheduler IoT Dashboard

![Dashboard Screenshot](./assets/image.png)


A lightweight web-based IoT dashboard that enables users to **schedule light ON and OFF times** remotely using **WebSockets**, **MQTT**, and **Arduino**. The system combines a frontend interface with a Python-based backend to send control commands to an Arduino, which operates a light relay.

---

## 🚀 Features

- **Web-Based UI**: User-friendly interface to select ON/OFF times for a light.
- **Real-Time Communication**: Uses WebSocket to send data from frontend to backend.
- **MQTT Integration**: Backend publishes scheduling commands to an MQTT broker.
- **Arduino Control**: A subscriber script listens to MQTT messages and sends serial commands (`1` or `0`) to an Arduino that toggles a relay.
- **Hardware Agnostic**: Can work with any relay-enabled Arduino board.

---

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Python  
  - Libraries: `websockets`, `paho-mqtt`, `pyserial`
- **Messaging Protocol**: MQTT via [Mosquitto](https://mosquitto.org/)
- **Hardware**: Arduino UNO (or compatible)

---

## ⚙️ Prerequisites

- Python 3.8 or higher
- A running [Mosquitto MQTT broker](https://mosquitto.org/download/)
- An Arduino UNO connected via USB
- Required Python libraries:
  
  ```bash
  pip install websockets paho-mqtt pyserial
  ```

---

## 💠 Setup Instructions

1. **Clone the Repository**

   ```bash
   git clone <your-repo-url>
   cd light-scheduler
   ```

2. **Install Dependencies**

   Create a `requirements.txt` file (if not already present):

   ```
   websockets
   paho-mqtt
   pyserial
   ```

   Then install:

   ```bash
   pip install -r requirements.txt
   ```

3. **Start the MQTT Broker**

   ```bash
   mosquitto
   ```

4. **Configure Serial Port**

   - Open `subscriber.py`
   - Set the correct `SERIAL_PORT` for your system  
     Example:
     - Linux/macOS: `/dev/ttyACM0`
     - Windows: `COM3`

5. **Run the Backend Services**

   - WebSocket server:

     ```bash
     python server.py
     ```

   - MQTT subscriber:

     ```bash
     python subscriber.py
     ```

6. **Serve the Frontend**

   Use Python’s simple HTTP server:

   ```bash
   python -m http.server 8000
   ```

   Then open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 💡 Usage

1. Open the web dashboard in your browser.
2. Select the desired ON and OFF times using the interface.
3. Click **Submit Schedule**.
4. The schedule is sent:
   - via **WebSocket** to the server,
   - then published to **MQTT**,
   - picked up by the **subscriber**,
   - and a command is sent to the **Arduino** through serial:
     - `'1'` for **ON**
     - `'0'` for **OFF**

---

## 🎬️ Demo

![Dashboard Screenshot](./assets/image.png)

> The Arduino must be programmed to act on serial input.  
> It should switch the relay ON for `'1'` and OFF for `'0'`.

---

## 📝 Notes

- If you're using a remote MQTT broker, update:
  - `MQTT_BROKER` in `subscriber.py`
  - the `mosquitto_pub` command in `server.py`
- Ensure the Arduino sketch supports serial input and toggles output pin based on received data.

