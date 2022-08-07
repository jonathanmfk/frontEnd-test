import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { PUBLIC_KEY } from '@/api/marvel';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		characters: [],
		character: []
	},
	getters: {},
	mutations: {
		getCharacters(state, characters) {
			state.characters = characters;
		},

		getCharacter(state, character) {
			state.character = character;
		}
	},
	actions: {
		getCharacters: async function({ commit }) {
			try {
				let result = await axios.get(`http://gateway.marvel.com/v1/public/characters?apikey=${PUBLIC_KEY}`);
				let characters = result.data.data.results;
				commit('getCharacters', characters);
			} catch (error) {
				console.error(error);
			}
		},

		getCharacter: function({ commit }, character) {
			commit('getCharacter', character)
		}
	},
	modules: {}
});
