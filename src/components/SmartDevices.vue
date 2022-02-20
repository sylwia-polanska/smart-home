<template>
  <div id="mainTemplateContainer">
    <table>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>State</th>
      </tr>
      <tr 
        v-for="device in mockedDevices.allDevices" 
        :key="device.id" 
        @click="onChooseDevice(device)">
        <td>{{ device.name }}</td>
        <td>{{ device.type }}</td>
        <td>{{ device.connectionState }}</td>
      </tr>
    </table>    
    <div v-if="chosenDevice" id="deviceStatusPopup" v-bind:class="{ hidden: isModalHidden }">
      <div class="closeDialogButton" @click="onCloseDialog()">X</div>
      <div v-if="chosenDevice.type === 'bulb'">
          is turned on: {{ chosenDevice.isTurnedOn }} <br>
          brightness: {{ chosenDevice.brightness }} <br>
          color: {{ chosenDevice.color }}
      </div>
      <div v-if="chosenDevice.type === 'outlet'">
          is turned on: {{ chosenDevice.isTurnedOn }} <br>
          power consumption: {{ chosenDevice.powerConsumption }} W
      </div>
      <div v-if="chosenDevice.type === 'temperatureSensor'">
          temperature: {{ chosenDevice.temperature }}℃ <br>
      </div>
    </div>
  </div>    
</template>

<script>
import interact from 'interactjs';
export default{
  inject: ["interactjs"],
  data() {
    return {
      isModalHidden: true,
      chosenDevice: null,
      mockedDevices: {
        allDevices: [],
        smartBulbs: [
          {
            type: 'bulb',
            id: '45255',
            name: 'bulb1',
            connectionState: 'connected', 
            isTurnedOn: true,
            brightness: 92,
            color: 'blue'
          },
          {
            type: 'bulb',
            id: '23423',
            name: 'bulb2',
            connectionState: 'connected', 
            isTurnedOn: true,
            brightness: 90,
            color: 'green'
          }
        ],
        smartOutlets: [
          {
            type: 'outlet',
            id: '34535',
            name: 'outlet1',
            connectionState: 'disconnected',
            isTurnedOn: 'false',
            powerConsumption: 20,
          }
        ],
        SmartTemperatureSensor: [
          {
            type: 'temperatureSensor',
            id: '34342',
            name: 'temperaturesensor',
            connectionState: 'poorConnection',
            temperature: 25,
          }
        ]
      }
    }
  },
  methods: {
    mixAllDevicesInOneArray() {
      this.mockedDevices.allDevices.push(...this.mockedDevices.smartBulbs);
      this.mockedDevices.allDevices.push(...this.mockedDevices.smartOutlets);
      this.mockedDevices.allDevices.push(...this.mockedDevices.SmartTemperatureSensor);
    },

    onChooseDevice(device){
      this.chosenDevice = device;
      this.isModalHidden = false;
    },

    onCloseDialog() {
      this.isModalHidden = true;
    },

    initDraggingForModal() {
      const position = { x: 0, y: 0 };
      interact('#deviceStatusPopup').draggable({
        listeners: {
          move (event) {
            position.x += event.dx;
            position.y += event.dy;
            event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
          }
        }
      });
    }
  },
  mounted() {
    this.mixAllDevicesInOneArray();
    this.initDraggingForModal();
  }
}
</script>

<style scoped>
#mainTemplateContainer table {
  margin: auto;
  margin-top: 100px;
  border-spacing: 0;
  margin-bottom: 20px;
}

#mainTemplateContainer table td,
#mainTemplateContainer table th {
  padding: 10px;
}

#mainTemplateContainer table th {
  border-bottom: 1px solid black;
}

#mainTemplateContainer table tr:hover td {
  background-color: #a8aaad;
  color: white;
  cursor: pointer;
}

#deviceStatusPopup {
  width: 400px;
  height: 100px;
  border: 1px solid black;
  border-radius: 5px;
  margin: auto;
  position: absolute;
  z-index: 1;
  margin: auto;
  top: 0; left: 0; bottom: 0; right: 0;
  padding-top: 30px;
  background-color: white;
  overflow: auto;
  touch-action: none;
  user-select: none;
}

#deviceStatusPopup .closeDialogButton {
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
}

.hidden {
  display: none;
}
</style>
