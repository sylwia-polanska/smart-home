<template>
  <div id="mainTemplateContainer">
    <div id="busyIndicator" v-bind:class="{ hidden: !isBusyIndicatorVisible }">
      <img src="../assets/loading.gif" alt="loading">
    </div>
    <table v-if="devices.length > 0">
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>State</th>
      </tr>
      <tr 
        v-for="device in devices" 
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
          is turned on: <b>{{ chosenDevice.isTurnedOn }}</b><br>
          brightness: <b>{{ chosenDevice.brightness }}</b><br>
          color: <b>{{ chosenDevice.color }}</b>
      </div>
      <div v-if="chosenDevice.type === 'outlet'">
          is turned on: <b>{{ chosenDevice.isTurnedOn }}</b><br>
          power consumption: <b>{{ chosenDevice.powerConsumption }} W</b>
      </div>
      <div v-if="chosenDevice.type === 'temperatureSensor'">
          temperature: <b>{{ chosenDevice.temperature }} ℃</b><br>
      </div>
    </div>
  </div>    
</template>

<script>
import devicesJson from '../mockData/devices.json'
import devicesWithDetailsJson from '../mockData/devicesWithDetails.json'
import interact from 'interactjs';
export default{
  inject: ["interactjs"],
  data() {
    return {
      isBusyIndicatorVisible: true, 
      isModalHidden: true,
      chosenDevice: null,
      devices: []
    }
  },
  methods: {
    onChooseDevice(device){
      this.displayBusyIndicator();
      this.fetchDeviceDetails(device).then(() => {
        this.chosenDevice = device;
        this.isModalHidden = false;
        this.hideBusyIndicator();
      });      
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
    },

    fetchDevices() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.devices = devicesJson;
          resolve();
        }, 1000);
      });
    },

    fetchDeviceDetails(device) {
      return new Promise(resolve => {
        setTimeout(() => {
          const fetchedDevice = devicesWithDetailsJson
            .find(deviceFromEndpoint => deviceFromEndpoint.id === device.id);
          for (const key in fetchedDevice) {
            device[key] = fetchedDevice[key];
          }
          resolve();
        }, 1000);
      });      
    },

    displayBusyIndicator() {
      this.isBusyIndicatorVisible = true;
    },

    hideBusyIndicator() {
      this.isBusyIndicatorVisible = false;
    }
  },
  mounted() {
    this.fetchDevices().then(() => {
      this.hideBusyIndicator()
    });
    this.initDraggingForModal();
  }
}
</script>

<style scoped>
#busyIndicator {
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: #c0c0c04d;
  top: 0;
  left: 0;
}

#busyIndicator img {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;  
  margin: auto;
}

table {
  table-layout: fixed;
}

#mainTemplateContainer table {
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  border-spacing: 0;
  margin-bottom: 20px;
}

#mainTemplateContainer table td,
#mainTemplateContainer table th {
  padding: 10px;
  word-wrap: break-word;
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
  margin:auto;
  position: absolute;
  z-index: 1;
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

@media only screen and (max-width: 440px) {
  #deviceStatusPopup {
    width: 75%;
  }
}

@media only screen and (max-width: 600px) {
  #mainTemplateContainer table {
    width: 100%;
  }
}
</style>
