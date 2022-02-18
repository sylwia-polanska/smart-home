<template>
  <div>
    <div class="devicesList">
      <h1>Name</h1>
      <ul id="devicesName">
        <li>a</li>
      </ul>
    </div>
    <div class="devicesList">
      <h1>Type</h1>
      <ul id="devicesType">
        <li>a</li>
      </ul>
    </div>
    <div class="devicesList">
      <h1>State</h1>
      <ul id="devicesConnectionState">
        <li>a</li>
      </ul>
    </div>
  </div>
    
</template>

<script>

</script>

<style scoped>
  .devicesList {
    height: 400px;
    border: solid 1px black;
    border-left: none;
    display: inline-block;
    list-style-type: none;
    margin-top: 250px
  }

  .devicesList:first-of-type {
    border-left: solid 1px black;
  }

  #devicesType, #devicesConnectionState{
    width: 80px;
  }

  #devicesName {
    width: 120px
  }

  h1 {
    font-size: 20px;
    margin-top: 15px;
    display: inline-block;
  }

  ul {
    margin: 0;
    list-style-type: none;
    padding-left: 10px;
    text-align: left;
    text-transform: capitalize;
    font-size: 15px;
  }

  #devicesName li {
    cursor: pointer;
  }


</style>
