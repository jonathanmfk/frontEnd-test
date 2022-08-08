<template lang="html">
  <div>
    <div class="d-flex justify-center mb-1">
      <v-col>
        <router-link :to="{ name: '/exercises' }">
          <v-btn color="primary">
            Other exercises
          </v-btn>
        </router-link>
      </v-col>
    </div>
    <v-container grid-list-md>

      <v-layout row wrap>
        <div v-for="character in characters">
          <v-flex xs12 sm10 md15>
            <v-card width="374">
              <v-img height="250" :src="getImg(character.thumbnail.path)"></v-img>

              <v-card-title>{{ character.name }}</v-card-title>
              <v-card-text>
                <div class="my-4 text-subtitle-1">
                  {{ formateDate(character.modified) }}
                </div>
                <v-tooltip top v-if="!!character.description">
                  <template v-slot:activator="{ on, attrs }">
                    <div class="paragraph" v-bind="attrs" v-on="on">{{ character.description }}</div>
                  </template>
                  <span>{{ character.description }}</span>
                </v-tooltip>
                <div class="paragraph" v-else>{{ 'Without description' }}</div>
              </v-card-text>

              <v-card-actions>
                <router-link :to="{ name: '/character', params: { id: character.id } }">
                  <v-btn color="deep-purple lighten-2" text @click="reserve">
                    Detalles
                  </v-btn>
                </router-link>
              </v-card-actions>
            </v-card>

          </v-flex>
        </div>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Characters",

  mounted() {
    if (this.characters.length == 0) {
      this.$store.dispatch('getCharacters');
      if (this.character.length > 0) {
        this.characters.forEach(element => {
          if (this.character[0].id == element.id) {
            element = this.character[0];
          }
        });
      }
    }
  },
  computed: {
    ...mapState(['characters', 'character'])
  },
  methods: {

    reserve() {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
    formateDate(dateString) {
      let dateFormat = new Date(dateString)
      let date, month, year;

      date = dateFormat.getDate();
      month = dateFormat.getMonth() + 1;
      year = dateFormat.getFullYear();

      date = date
        .toString()
        .padStart(2, '0');

      month = month
        .toString()
        .padStart(2, '0');

      return `${date}/${month}/${year}`;
    },
    getImg(link) {
      return `${link}/standard_fantastic.jpg`
    }
  }
}
</script>

<style lang="css">
.paragraph {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>