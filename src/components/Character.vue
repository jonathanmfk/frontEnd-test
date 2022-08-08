<template lang="html">
  <div>
    <div class="d-flex justify-center mb-1">
      <v-card v-if="!loading" width="374" class="pa-2">
        <v-img height="250" :src="url">
          <v-container>
            <v-layout>
              <v-flex>
                <v-btn color="primary" @click="goBack">Back</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <div v-for="char in character">
          <v-form>
            <v-container>
              <v-col cols="12">
                <v-text-field v-model="char.name" label="Name Hero" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea v-model="char.description" color="teal">
                  <template v-slot:label>
                    <div>
                      Description <small>(optional)</small>
                    </div>
                  </template>
                </v-textarea>
              </v-col>

              <v-col cols="12">
                <v-file-input v-model="image" :rules="rules" accept="image/png, image/jpeg, image/jpg"
                  placeholder="Pick an avatar" prepend-icon="mdi-camera" @change="addImage" label="Avatar">
                </v-file-input>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="newImgUrl" label="Thumbnail" @change="getImgUrl" required></v-text-field>
              </v-col>
            </v-container>
          </v-form>

          <v-card-actions>
            <v-btn color="deep-purple lighten-2" text @click="save">
              Save
            </v-btn>
            <v-btn color="deep-purple lighten-2" text @click="goBackAndSafe">
              Save and exit
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { PUBLIC_KEY } from '@/api/marvel';
import axios from 'axios';
import { mapState } from 'vuex'

export default {
  name: 'Character',
  data() {
    return {
      loading: true,
      image: null,
      newImgUrl: '',
      url: '',
      size: 'standard_xlarge.jpg',
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
    }
  },
  mounted() {
    this.getCharacter()
  },
  computed: {
    ...mapState(['characters', 'character'])
  },
  methods: {
    getCharacter() {
      this.loading = true;
      axios
        .get(`http://gateway.marvel.com/v1/public/characters/${this.$route.params.id}?apikey=${PUBLIC_KEY}`)
        .then((result) => {
          this.$store.dispatch('getCharacter', result.data.data.results);
          this.getImage();
          this.loading = false;
        })
        .catch((error) => console.error(error));
    },
    getImage: function () {
      this.url = `${this.character[0].thumbnail.path}/${this.size}` //colocar tal cual
    },
    getImgUrl() {
      const http = 'http:'
      const https = 'https'
      const format = ['.jpg', '.png', '.bmp', 'jpeg']
      let searchHttp = this.newImgUrl.substring(0, 5);
      let formatImg = this.newImgUrl.substring(this.newImgUrl.length - 5, this.newImgUrl.length)
      searchHttp = searchHttp.toLowerCase();
      formatImg = formatImg.toLowerCase();

      if (searchHttp.includes(http) ||
        searchHttp.includes(https) &&
        formatImg.includes(format[0]) ||
        formatImg.includes(format[1]) ||
        formatImg.includes(format[2]) ||
        formatImg.includes(format[3])
      ) {
        this.url = this.newImgUrl;
      } else {
        this.url = `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/${this.size}`
      }
      this.character[0].thumbnail.path = this.url;
    },
    addImage(file) {
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const imgObj = new Image()
          imgObj.src = e.target.result
          this.url = imgObj
        }
        if (file) {
          reader.readAsDataURL(file)
        }
      } else {
        this.url = `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/${this.size}`
      }
      this.character[0].thumbnail.path = this.url;
    },
    save() {
      if (this.characters.length > 0) {
        this.characters.forEach(element => {
          if (this.character[0].id == element.id) {
            element = this.character[0];
          }
        });
        console.log(this.characters);
        console.log(this.character);
      }
    },
    goBackAndSafe() {
      if (this.characters.length > 0) {
        this.characters.forEach(element => {
          if (this.character[0].id == element.id) {
            element = this.character[0];
          }
        });
        console.log(this.characters);
        console.log(this.character);
      }
      this.$router.push('/')
    },
    goBack() {
      this.$router.push('/')
    },
  }
}
</script>

<style lang="css">
</style>