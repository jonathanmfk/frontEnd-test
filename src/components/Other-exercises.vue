<template lang="html">
  <div class="d-flex justify-center mb-1">
    <v-col>
      <v-btn color="primary" @click="first">First exercise</v-btn>
    </v-col>
    <v-col>
      <v-btn color="primary" @click="second">Second exercise</v-btn>
      <h1>Open the console</h1>
    </v-col>
  </div>
</template>

<script>

export default {
  name: 'Other',
  data() {
    return {}
  },
  methods: {
    first() {
      const a = prompt("digite el rango inicial");
      const b = prompt("digite el rango final");
      alert(`Números primos: ${allPrimos(a, b)}`)
      function allPrimos(a, b) {
        let numerosPrimos = '';
        for (; a < b; a++) {
          if (primo(a)) {
            numerosPrimos += a + ', '
          }
        }
        return numerosPrimos;

        function primo(numero) {
          for (var i = 2; i < numero; i++) {
            if (numero % i === 0) {
              return false;
            }
          }
          return numero !== 1;
        }
      }
    },
    second() {
      let values = {
        1: {
          carrier: "CCH",
          service: "DEX",
        },
        2: {
          carrier: "CCH",
          service: "express",
        },
        3: {
          carrier: "CCH",
          service: "priority",
        },
        15: {
          carrier: "CHP",
          service: "nextday",
        },
        16: {
          carrier: "CHP",
          service: "sameday",
        },
        17: {
          carrier: "CHP",
          service: "express",
        }
      }
      let json = {
        data: {
          BUIN: [
            {
              limit: 1,
              over_carrier_service_id: 17,
              under_carrier_service_id: 17
            },
            {
              limit: 2,
              over_carrier_service_id: 15,
              under_carrier_service_id: 15
            }
          ],
          LAJA: [
            {
              limit: 2,
              over_carrier_service_id: 1,
              under_carrier_service_id: 1
            }, {
              limit: 5,
              over_carrier_service_id: 2,
              under_carrier_service_id: 2
            }, {
              limit: 1,
              over_carrier_service_id: 17,
              under_carrier_service_id: 17
            }
          ],

          LEBU: [
            {
              limit: 2,
              over_carrier_service_id: 1,
              under_carrier_service_id: 1
            }, {
              limit: 6,
              over_carrier_service_id: 3,
              under_carrier_service_id: 3
            }, {
              limit: 5,
              over_carrier_service_id: 2,
              under_carrier_service_id: 2
            }, {
              limit: 4,
              over_carrier_service_id: 16,
              under_carrier_service_id: 16
            }
          ],

          LOTA: [
            {
              limit: 2,
              over_carrier_service_id: 15,
              under_carrier_service_id: 15
            }, {
              limit: 4,
              over_carrier_service_id: 16,
              under_carrier_service_id: 16
            }, {
              limit: 1,
              over_carrier_service_id: 17,
              under_carrier_service_id: 17
            }
          ]
        }
      }
      let jsonMap = new Map(Object.entries(json.data));
      let map = new Map();
      Object.entries(json.data).forEach(([k, v]) => {
        let data = getMaxServiceLimit(v)
        map.set(k, {
          limit: data.limit,
          over: values[data.over_carrier_service_id],
          under: values[data.under_carrier_service_id],
        });
      });
      console.log(Object.fromEntries(map));
      console.log('Localidad con mayor cantidad de servicios: ', getLocationMaxService(jsonMap));
      console.log('El servicio con mayor cobertura es: ', values[getCoverage(jsonMap, new Map(Object.entries(values)))].service);

      function getMaxServiceLimit(values) {
        let maxLimit = [];
        values.forEach(element => maxLimit.push(element.limit));
        let max = getMax(maxLimit);
        let elementArry = values.filter(element => element.limit == max);
        return elementArry[0]
      }

      function getMax(values) {
        const value = values.sort((a, b) => b - a);
        return value[0]
      }

      function getLocationMaxService(jsonMap) {
        let amount = [];
        let map = new Map();
        let location = 0;
        jsonMap.forEach((v, k) => {
          map.set(k, v.length);
          amount.push(v.length)
        })
        let max = getMax(amount);
        Object.entries(Object.fromEntries(map)).forEach(([k, v]) => {
          if (v == max) {
            location = k;
          }
        });
        return location;
      }

      function getCoverage(jsonMap, values) {
        let map = new Map();
        let array = []
        let coverageService = ''
        values.forEach((v, k) => map.set(Number(k), 0));
        jsonMap.forEach((v, k) =>
          v.forEach((e) => {
            let count = map.get(e.over_carrier_service_id)
            map.set(Number(e.over_carrier_service_id), count + 1);
          })
        )
        map.forEach((v, k) => array.push(v))
        let max = getMax(array);
        map.forEach((v, k) => {
          if (v == max) {
            coverageService = k;
          }
        })
        return coverageService;
      }

    }
  }
}
</script>

<style lang="css">
</style>