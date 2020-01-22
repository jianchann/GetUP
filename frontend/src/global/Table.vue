<template>
  <b-table
    :data="data"
    :columns="this.columns"
    selectable
    focusable
    :mobile-cards="false"
    @select="selected"
  ></b-table>
</template>

<script>
const colsched = [
  {
    field: "time_slot",
    label: "Time",
    width: "130"
  },
  {
    field: "id",
    label: "ID",
    visible: false
  },
  {
    field: "title",
    label: "Segment",
    centered: true
  },
  {
    field: "speaker",
    label: "Speaker",
    centered: true
  }
];

const colbooth = [
  {
    field: "position_slot",
    label: "Slot",
    centered: true
  },
  {
    field: "id",
    label: "ID",
    visible: false
  },
  {
    field: "company",
    label: "Company",
    centered: true
  }
];

const Table = {
  props: {
    data: {
      type: Array,
      default: null
    },
    schedule: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return { columns: null };
  },
  methods: {
    selected(row) {
      var id = row.id;
      if (this.schedule) {
        this.$router.push("/schedule/" + id);
      } else {
        this.$router.push("/booths/" + id);
      }
    }
  },
  created() {
    if (this.schedule) {
      this.columns = colsched;
    } else {
      this.columns = colbooth;
    }
    // this.read();
  }
};
export default Table;
</script>