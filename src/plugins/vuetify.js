import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#A5EBE9",
                secondary: "#323349",
                accent: "#12090A"
            }
        }
    }
});
