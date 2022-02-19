<template>
  <div id="mainTemplateContainer">
    <table>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>State</th>
      </tr>
      <tr v-for="device in mockedDevices.allDevices" :key="device.id">
        <td>{{ device.name }}</td>
        <td>{{ device.type }}</td>
        <td>{{ device.connectionState }}</td>
      </tr>
    </table>    
  </div>    
</template>

<script>
export default{
  data() {
    return {
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
    }
  },
  mounted() {
    this.mixAllDevicesInOneArray();
  }
}

</script>

<style scoped>
#mainTemplateContainer table {
  margin: auto;
  margin-top: 100px;
  border-spacing: 0;
}
#mainTemplateContainer table td,
#mainTemplateContainer table th {
  padding: 10px;
}
#mainTemplateContainer table th {
  border-bottom: 1px solid black;
}
#mainTemplateContainer table tr:hover td {
  background-color: black;
  color: white;
  cursor: pointer;
}
</style>
