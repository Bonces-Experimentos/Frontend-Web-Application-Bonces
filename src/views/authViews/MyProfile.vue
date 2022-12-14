<template>
  <v-container>
    <h1 class="text-center mb-16">Mi perfil</h1>
    <v-form
        class="my-auto flex"
        :readonly="!isEdit"
        :disabled="!isEdit"
        ref="form"
        v-model="form.isValid"
    >
      <v-row>
        <v-col class="col-12 col-sm-10 col-lg-6 mx-auto">
          <v-row>
            <v-col class="col-4">
              <v-subheader class="font-weight-medium">Nombre:</v-subheader>
            </v-col>
            <v-col class="col-8">
              <v-text-field
                  v-model="user.name"
                  solo
                  :rules="rules.name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-4">
              <v-subheader class="font-weight-medium">Apellido:</v-subheader>
            </v-col>
            <v-col class="col-8">
              <v-text-field
                  v-model="user.lastName"
                  solo
                  :rules="rules.lastName"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-4">
              <v-subheader class="font-weight-medium">Correo:</v-subheader>
            </v-col>
            <v-col class="col-8">
              <v-text-field
                  v-model="user.email"
                  solo
                  disabled
                  :rules="rules.email"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row
          v-if="isEdit"
          class="justify-center mt-10"
      >
        <v-btn
            v-if="!authStore.loading"
            class="mr-3"
            width="150px"
            color="secondary"
            :disabled="!form.isValid"
            @click="saveProfileData()"
        >
          Guardar
        </v-btn>
        <v-btn
            v-if="!authStore.loading"
            class="ml-3"
            width="150px"
            @click="cancelEditProfile"
        >
          Cancelar
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
      </v-row>
      <v-btn
          v-else
          class="center mt-10"
          width="150px"
          color="secondary"
          @click="() => { this.isEdit = true; }"
      >
        Editar
      </v-btn>
    </v-form>

    <v-snackbar
        v-model="authStore.error"
        :timeout="timeout"
        color="red accent-2"
    >
      {{ "Error: hubo un error al actualizar los datos" }}

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

    <v-snackbar
        v-model="successfulUpdate"
        :timeout="timeout"
        color="primary"
        content-class="accent--text"
    >
      {{ "Actualizaci??n de datos exitosa" }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="accent"
            text
            v-bind="attrs"
            @click="successfulUpdate = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { useAuthStore } from "@/store/useAuthStore";

export default {
  name: "MyProfile",
  data() {
    return {
      authStore: useAuthStore(),
      user: {},
      isEdit: false,
      timeout: 3000,
      successfulUpdate: false,
      form: {
        user: {
          name: "",
          lastName: "",
          email: "",
        },
        isValid: false,
        showPassword: false
      },
      rules: {
        required: v => !!v || "Requerido",
        name: [
         v => !!v || "Requerido",
         v => (v && v.length <= 25) || 'El nombre debe tener como m??ximo 25 caracteres',
         v =>  !/^\s/.test(v)|| 'No ingrese espacios vacio al inicio',
         v => (v && v.length >= 2) || 'Ingrese m??s de un caracter',
         v => /^([a-zA-Z ])*$/.test(v) || 'Solo ingrese letras'
        ],
        lastName:[
         v => !!v || "Requerido",
         v => (v && v.length <= 25) || 'El apellido debe tener como m??ximo 25 caracteres',
         v =>  !/^\s/.test(v)|| 'No ingrese espacios vacio al inicio',
         v => (v && v.length >= 2) || 'Ingrese m??s de un caracter',
         v => /^([a-zA-Z ])*$/.test(v) || 'Solo ingrese letras'
        ],
        email: [
          v => !!v || "Requerido",
          v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'Correo inv??lido.'
        ],
      },
      authStore: useAuthStore()
    }
  },
  methods: {
    async saveProfileData() {
      const { name, lastName, email } = this.user;
      await this.authStore.update(this.user.id, { name, lastName, email });
      if (this.authStore.error === false)
        this.successfulUpdate = true;
      this.isEdit = false;
      this.retrieveUser();
    },
    retrieveUser() {
      this.user = Object.assign({}, this.authStore.user);
    },
    cancelEditProfile() {
      this.isEdit = false;
      this.retrieveUser();
    }
  },
  mounted() {
    this.retrieveUser();
  }
}
</script>

<style scoped>
.center {
  left: 50%;
  transform: translateX(-50%);
}
</style>