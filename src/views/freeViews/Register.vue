<template>
  <v-container class="col-12">
    <v-row>
      <div class="col-6 d-none d-md-flex img-container">
        <img alt="register-img" id="register-img" src="../../assets/register-image.png">
      </div>
      <v-form
          ref="form"
          v-model="form.isValid"
          class="col-12 col-sm-6 col-md-4 ma-auto flex pa-0"
      >
        <div class="icon mx-auto mb-5 img-container">
          <img alt="calculator" id="calculator" src="../../assets/calculator-icon.png">
        </div>

        <h2 class="text-center mb-5">Regístrate</h2>

        <v-text-field
            v-model="form.user.name"
            label="Nombres"
            color="accent"
            outlined
            :rules="rules.name"
        ></v-text-field>

        <v-text-field
            v-model="form.user.lastName"
            label="Apellidos"
            color="accent"
            outlined
            :rules="rules.lastName"
        ></v-text-field>

        <v-text-field
            v-model="form.user.email"
            label="Correo electrónico"
            color="accent"
            outlined
            :rules="rules.email"
        ></v-text-field>

        <v-text-field
            v-model="form.user.password"
            label="Contraseña"
            color="accent"
            outlined
            @click:append="form.showPassword = !form.showPassword"
            :append-icon="form.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="form.showPassword ? 'text' : 'password'"
            :rules="rules.password"
        ></v-text-field>

        <v-btn
            v-if="!authStore.loading"
            color="secondary"
            class="py-5 mb-5"
            block
            :disabled="!form.isValid"
            @click="onSubmit()"
        >
          Registrarse
        </v-btn>
        <div
            v-else
            class="flex d-flex"
        >
          <v-progress-circular
              indeterminate
              color="primary"
              class="mx-auto mb-5"
          ></v-progress-circular>
        </div>

        <p class="text-center">
          ¿Ya tienes cuenta?
          <v-btn
              text
              class="blue--text"
              to="/login"
          >
            Iniciar sesión
          </v-btn>
        </p>
      </v-form>

      <v-snackbar
          v-model="authStore.error"
          :timeout="timeout"
          color="red accent-2"
      >
        {{ "Error: Correo ya registrado" }}

        <template v-slot:action="{ attrs }">
          <v-btn
              color="accent"
              text
              v-bind="attrs"
              @click="authStore.error = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/store/useAuthStore";

export default {
  name: "Register",
  data() {
    return {
      form: {
        user: {
          name: "",
          lastName: "",
          email: "",
          password: ""
        },
        isValid: false,
        showPassword: false
      },
      rules: {
        required: v => !!v || "Requerido",
        name: [
         v => !!v || "Requerido",
         v => (v && v.length <= 25) || 'El apellido debe tener como máximo 25 caracteres',
         v =>  !/^\s/.test(v)|| 'No ingrese espacios vacio al inicio',
         v => /^([a-zA-Z ])*$/.test(v) || 'Solo ingrese letras',
         v => /^[a-zA-Z]{2,25}/.test(v) || 'Nombre inválido'
        ],
        lastName:[
         v => !!v || "Requerido",
         v => (v && v.length <= 25) || 'El apellido debe tener como máximo 25 caracteres',
         v =>  !/^\s/.test(v)|| 'No ingrese espacios vacio al inicio',
         v => /^([a-zA-Z ])*$/.test(v) || 'Solo ingrese letras',
         v => /^[a-zA-Z]{2,25}/.test(v) || 'Apellido inválido'
        ],
        email: [
          v => !!v || "Requerido",
          v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Correo inválido',
          v => (v && v.length <= 30) || 'El correo debe tener como máximo 30 caracteres'
        ],
        password: [
          v => !!v || "Requerido",
          v => (v && v.length >= 8) || 'Mínimo 8 caracteres',
          v => /([0-9])/.test(v) || 'La constraseña debe tener al menos un numero',
          v => /([A-Z])/.test(v) || 'La constraseña debe tener al menos una letra mayúscula',
          v => (v && v.length <= 20) || 'El contraseña debe tener como máximo 20 caracteres',
        ],
      },
      timeout: 3000,
      authStore: useAuthStore()
    }
  },
  methods: {
    async onSubmit() {
      await this.authStore.register(this.form.user);
    },
    initForm() {
      this.form = {
        user: {
          name: "",
          lastName: "",
          email: "",
          password: ""
        },
        isValid: false,
        showPassword: false
      };
    }
  },
  mounted() {
    this.initForm();
  }
}
</script>

<style scoped>
.icon {
  width: 100px;
  height: 100px;
  background: #A5EBE9;
  border-radius: 50%;
}

.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#calculator {
  max-width: 70px;
  margin: auto;
  display: block;
}

#register-img {
  width: 100%;
  max-width: 600px;
  margin: auto;
}
</style>