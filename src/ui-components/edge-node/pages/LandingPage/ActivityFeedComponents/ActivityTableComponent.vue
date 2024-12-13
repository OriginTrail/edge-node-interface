<template>
  <div class="table-container">
    <table class="custom-table">
      <thead>
        <tr>
          <th>Owner <span class="purple-arrow"></span></th>
          <th>UAL <span class="purple-arrow"></span></th>
          <th>Action <span class="purple-arrow"></span></th>
          <th>To <span class="purple-arrow"></span></th>
          <th>Blockchain transaction <span class="purple-arrow"></span></th>
          <th>Time <span class="purple-arrow"></span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(activity, index) in activities" :key="index">
          <td style="color: #6f6bc8">{{ activity.owner }}</td>
          <td style="color: #6f6bc8">{{ activity.ual }}</td>
          <td>{{ activity.action }}</td>
          <td style="color: #6f6bc8">{{ activity.to }}</td>
          <td style="color: #6f6bc8">{{ activity.transaction }}</td>
          <td>{{ activity.time }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ActivityTable",
  data() {
    return {
      activities: [
        {
          owner: "0x21DA3B9091F9...582",
          ual: "0x21DA3B9091F9...582",
          action: "Created",
          to: "0x21DA3B9091F9...582",
          transaction: "0xd83820x74920h93j...",
          time: "1 hour ago",
        },
        {
          owner: "0x21DA3B9091F9...582",
          ual: "0x21DA3B9091F9...582",
          action: "Ownership transferred",
          to: "0x21DA3B9091F9...582",
          transaction: "0xd83820x74920h93j...",
          time: "1 hour ago",
        },
        // Add more rows as needed
      ],
    };
  },
};
</script>

<style scoped>
.table-container {
  border: 1.5px solid rgba(139, 133, 244, 0.5);
  border-radius: 10px;
  overflow-x: auto;
}

.custom-table {
  border: 1.5px solid rgba(139, 133, 244, 0.5);
  width: 100%;
  border-collapse: collapse;
  color: #ffffff;
  font-family: "Arial", sans-serif;
}

.custom-table th {
  border-bottom: 1.5px solid rgba(139, 133, 244, 0.5);
  background: radial-gradient(
    53.33% 60.69% at 20% 50%,
    /* Centar gradijenta pomeren ka levoj strani */ #03061c 0%,
    /* Tamna boja u centru */ #1b1b34 100% /* Svetlija boja na ivicama */
  );

  padding: 10px 15px;
  text-align: left;
}

.custom-table td,
.custom-table th {
  padding: 10px 15px;
  text-align: left;

  border-bottom: 1.5px solid rgba(139, 133, 244, 0.5); /* Horizontalna donja linija */
}

.custom-table tr:first-child th {
  border-top: none; /* Uklanja gornju liniju iznad zaglavlja ako nije potrebna */
}

.custom-table tr:hover {
  background-color: #2e2e4a;
}

.custom-table td {
  color: #cfcfe3;
  font-size: 14px;
}

.purple-arrow {
  display: inline-block;
  width: 25px;
  height: 25px;
  margin-left: 8px;
  background: url("/images/icons/purple-arrow.svg") no-repeat center center;
  background-size: contain;
  float: right;
}
</style>
