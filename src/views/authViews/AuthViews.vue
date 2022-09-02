<template>
  <v-app v-if="this.authStore.user">
    <NavBar v-bind:items="navigationItems" />

    <v-main>
      <router-view></router-view>
    </v-main>

    <Footer />
  </v-app>
  <v-app v-else>
    <v-main class="d-flex align-content-center flex-wrap justify-center">
      <h2 class="text-center">Usuario no autenticado</h2>
      <h1 class="text-center">Inicia sesión :)</h1>
      <v-btn class="d-flex mx-auto mt-5 accent--text" width="150px" color="primary" to="/login">Iniciar sesión</v-btn>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/store/useAuthStore";

export default {
  name: "AuthViews",
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      navigationItems: [
        { name: "Calculadora", path: "/auth", action: () => {} },
        { name: "Historial", path: "/auth/history", action: () => {} },
        { name: "Mi perfil", path: "/auth/my-profile", action: () => {} },
        { name: "Cerrar sesión", path: "", action: this.logout }
      ],
      authStore: useAuthStore()
    }
  },
  methods: {
    logout() {
      this.authStore.logout();
    }
  }
}
</script>