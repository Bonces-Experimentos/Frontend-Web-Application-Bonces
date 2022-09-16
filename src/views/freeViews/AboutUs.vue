<template>
  <v-container style="max-width: 1500px">
    <v-row class="mt-5 justify-center">
      <v-col class="col-12 col-sm-8 col-md-8 col-lg-6 col-lg-6 pa-0 ma-0">
        <v-img src="../../assets/about-us-presentation.png"></v-img>
      </v-col>
      <v-col class="col-12 col-sm-8 col-md-4 col-lg-6 primary flex d-flex align-center justify-center">
        <div style="max-width: 400px;">
          <h1 class="text-center mb-5">Propósito</h1>
          <p class="text-justify ma-auto text-h6 text-md-h5">
            Esta página está diseñada para calcular el flujo de caja e indicadores financieros de un bono corporativo
            desde la perspectiva de un bonista o inversor mediante el método Francés, Americano y Alemán.
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-row class="col-12 mt-5 mb-3">
        <h1 class="text-center flex">Grupo de trabajo</h1>
      </v-row>
      <v-row class="col-12 justify-center">
        <v-col class="col-12 col-sm-6 col-md-4">
          <v-card flat>
            <v-img src="../../assets/franklin-profile.png"></v-img>
            <v-card-actions>
              <a
                  href="https://www.linkedin.com/in/franklin-s%C3%A1nchez-72b21915a/"
                  target="_blank"
                  class="secondary--text blue-grey lighten-5 flex text-center"
                  style="width: auto"
              >
                <v-avatar rounded>
                  <v-img
                      alt=""
                      src="../../assets/linkedIn.png"
                  ></v-img>
                </v-avatar>
                Franklin Sanchez Serrano
              </a>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-4">
          <v-card flat>
            <v-img src="../../assets/luis-profile.png"></v-img>
            <v-card-actions>
              <a
                  href="https://www.linkedin.com/in/luis-porras25/"
                  target="_blank"
                  class="secondary--text blue-grey lighten-5 flex text-center"
                  style="width: auto"
              >
                <v-avatar rounded>
                  <v-img
                      alt=""
                      src="../../assets/linkedIn.png"
                  ></v-img>
                </v-avatar>
                Luis Alfredo Porras Tarifeño
              </a>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-4">
          <v-card flat>
            <v-img src="../../assets/sayda-profile.png"></v-img>
            <v-card-actions>
              <a
                  href="https://www.linkedin.com/in/sayda-nayeli-bravo-lliuya-b0913b239/"
                  target="_blank"
                  class="secondary--text blue-grey lighten-5 flex text-center"
                  style="width: auto"
              >
                <v-avatar rounded>
                  <v-img
                      alt=""
                      src="../../assets/linkedIn.png"
                  ></v-img>
                </v-avatar>
                Sayda Nayeli Bravo Lliuya
              </a>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col class="col-12 col-sm-6 col-md-4">
          <v-card flat>
            <v-img src="../../assets/alexander-profile.png"></v-img>
            <v-card-actions>
              <a
                  href="https://www.linkedin.com/in/alexander-fausto-medina-cortez-a6409b1b1/"
                  target="_blank"
                  class="secondary--text blue-grey lighten-5 flex text-center"
                  style="width: auto"
              >
                <v-avatar rounded>
                  <v-img
                      alt=""
                      src="../../assets/linkedIn.png"
                  ></v-img>
                </v-avatar>
                Alexander Fausto Medina Cortez
              </a>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-row>

  </v-container>
</template>

<script>

export default {
  name: "AboutUs"
}
</script>

<style scoped>
</style>