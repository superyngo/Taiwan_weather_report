if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then(console.log("start service worker"));
}

const app = Vue.createApp({
  data() {
    return {
      citiesLists: [],
      weatherReports: {},
      selectedCityIndex: -1,
      reportToShow: [],
      reportOpacity: 0,
    };
  },
  methods: {
    fetchData() {
      fetch(
        "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-A093951D-5D2F-417B-9A1A-F2E01FB0D803&locationName=&elementName="
      )
        .then((response) => response.json())
        .then((data) => {
          this.weatherReports = data.records.location;
          this.citiesLists = data.records.location.map(
            (record) => record.locationName
          );
        })
        .catch((error) => console.error(error));
    },
    showReport(cityIndex) {
      this.reportOpacity = 0;
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.reportToShow[i] =
            this.weatherReports[cityIndex].weatherElement[
              i
            ].time[0].parameter.parameterName;
        }
        this.reportOpacity = 1;
      }, 150);
    },
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    selectedCityIndex: {
      deep: false,
      handler(newCityIndex) {
        this.showReport(newCityIndex);
      },
    },
  },
});
app.mount("#app");
