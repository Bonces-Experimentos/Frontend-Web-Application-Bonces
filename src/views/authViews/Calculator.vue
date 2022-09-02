<template>
  <v-container>
    <v-form
        ref="form"
        v-model="form.isValid"
    >
      <v-container fluid>
        <h1 class="text-left mb-10">Ingreso de Datos</h1>
        <v-row>
          <v-col class="col-12 col-sm-8 col-md-5 mx-auto flex">
            <h2 class="text-center mb-10"><span>Datos del Bono</span></h2>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Método de amortización</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-select
                    v-model="form.scheduleData.methodType"
                    :items="form.items.amortizationMethods"
                    persistent-hint
                    color="accent"
                    background-color="blue-grey lighten-5"
                    solo
                    :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Tipo de moneda</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-select
                    v-model="form.scheduleData.currencyType"
                    :items="form.items.currencyTypeItems"
                    persistent-hint
                    color="accent"
                    background-color="blue-grey lighten-5"
                    solo
                    :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>


            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Valor Nominal</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                    v-model="form.scheduleData.boundData.nominalValue"
                    color="accent"
                    background-color="blue-grey lighten-5"
                    :prefix=toSymbol(this.form.scheduleData.currencyType)
                    solo
                    :rules="[rules.required,rules.isPositive]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Valor Comercial</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                    v-model="form.scheduleData.boundData.commercialValue"
                    color="accent"
                    background-color="blue-grey lighten-5"
                    :prefix=toSymbol(this.form.scheduleData.currencyType)
                    solo
                    :rules="[rules.required,rules.isPositive]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Numero de años</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                    v-model="form.scheduleData.boundData.years"
                    color="accent"
                    background-color="blue-grey lighten-5"
                    solo
                    :rules="[rules.required,rules.isInt,rules.isPositive]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Frecuencia del cupón</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-select
                    v-model="form.scheduleData.boundData.couponFrequency"
                    :items="form.items.couponFrequencyItems"
                    persistent-hint
                    color="accent"
                    background-color="blue-grey lighten-5"
                    solo
                    :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Tipo de tasa de interes</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-select
                    v-model="form.scheduleData.boundData.typeInterestRate"
                    :items="form.items.interestRateTypeItems"
                    persistent-hint
                    color="accent"
                    background-color="blue-grey lighten-5"
                    solo
                    :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>

            <v-row v-if="form.scheduleData.boundData.typeInterestRate !== '' &&
                         form.scheduleData.boundData.typeInterestRate !== 'Efectiva'">
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Capitalización</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-select
                    v-model="form.scheduleData.boundData.capitalization"
                    :items="form.items.capitalizationItems"
                    item-text="state"
                    item-value="abbr"
                    color="accent"
                    background-color="blue-grey lighten-5"
                    solo
                    :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Tasa de interés</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                    v-model="form.scheduleData.boundData.interestRate"
                    suffix="%"
                    color="accent"
                    background-color="blue-grey lighten-5"
                    solo
                    :rules="[rules.required,rules.isPositive]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Tasa anual de descuento</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                    v-model="form.scheduleData.boundData.annualDiscountRate"
                    suffix="%"
                    color="accent"
                    background-color="blue-grey lighten-5"
                    solo
                    :rules="[rules.required,rules.isPositive]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Impuesto a la Renta</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                    v-model="form.scheduleData.boundData.incomeTax"
                    suffix="%"
                    color="accent"
                    background-color="blue-grey lighten-5"
                    solo
                    :rules="[rules.required,rules.isPositive]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Fecha de emisión</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-menu
                    ref="menu"
                    v-model="form.issueDateMenu"
                    :close-on-content-click="false"
                    :return-value.sync="form.scheduleData.boundData.issue"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="form.scheduleData.boundData.issue"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        color="accent"
                        background-color="blue-grey lighten-5"
                        solo
                        :rules="[rules.required]"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="form.scheduleData.boundData.issue"
                      no-title
                      scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        @click="form.issueDateMenu = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(form.scheduleData.boundData.issue)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>

              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Tipo de periodo de gracia</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-select
                    v-model="form.scheduleData.boundData.typeOfGracePeriod"
                    :items='isAmtypeOfGracePeriodItem()'
                    persistent-hint
                    color="accent"
                    background-color="blue-grey lighten-5"
                    solo
                    :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>

            <v-row v-if="isStypePeriod()">
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Periodo de gracia</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                    v-model="form.scheduleData.boundData.gracePeriod"
                    color="accent"
                    background-color="blue-grey lighten-5"
                    solo
                    :rules="[rules.required,rules.isInt]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Inflación constante</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                    v-model="form.scheduleData.boundData.inflation"
                    suffix="%"
                    color="accent"
                    background-color="blue-grey lighten-5"
                    solo
                    :rules="[rules.required,rules.isInt]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-sm-8 col-md-5 mx-auto flex">
            <h2 class="text-center mb-10">Datos de los costes</h2>
            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">% Prima</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field

                    v-model="form.scheduleData.initialCostData.premium"
                    suffix="%"
                    color="accent"
                    background-color="blue-grey lighten-5"
                    solo
                    :rules="[rules.required,rules.isPositive]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">% Estructuración</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                    v-model="form.scheduleData.initialCostData.structuring"
                    suffix="%"
                    color="accent"
                    background-color="blue-grey lighten-5"
                    solo
                    :rules="[rules.required,rules.isPositive]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">% Colocación</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                    v-model="form.scheduleData.initialCostData.collocation"
                    color="accent"
                    background-color="blue-grey lighten-5"
                    suffix="%"
                    solo
                    :rules="[rules.required,rules.isPositive]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Flotacion</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                    v-model="form.scheduleData.initialCostData.floatation"
                    color="accent"
                    background-color="blue-grey lighten-5"
                    suffix="%"
                    solo
                    :rules="[rules.required,rules.isPositive]"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="4">
                <v-subheader class="font-weight-medium">Cavali</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-text-field
                    v-model="form.scheduleData.initialCostData.cavali"
                    color="accent"
                    background-color="blue-grey lighten-5"
                    suffix="%"
                    solo
                    :rules="[rules.required,rules.isPositive]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="col-6 col-sm-4 col-xs-8 pa-2">
            <v-btn
                v-if="!scheduleStore.loading"
                color="secondary"
                class="py-5 mb-5"
                block
                align="center"
                x-large
                @click="onSubmit"
            >
              Calcular
            </v-btn>
            <v-overlay :value="scheduleStore.loading"
                v-else
                class="flex d-flex"
            >
              <v-progress-circular
                  indeterminate
                  color="primary"
                  class="mx-auto mb-5"
              ></v-progress-circular>
            </v-overlay> 
          </v-col>

          <v-col class="col-6 col-sm-4 col-xs-8 pa-2" >
            <v-dialog
                v-model="form.dialogCleanForm"
                persistent
                max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="red lighten-1"
                    class="py-5 mb-5"
                    block
                    align="center"
                    x-large
                    v-bind="attrs"
                    v-on="on"
                >
                  Limpiar
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="text-h5">
                  ¿Está seguro de borrar el formulario?
                </v-card-title>
                <v-card-text>Se perderán todos los datos avanzados</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="red accent-3"
                      @click="form.dialogCleanForm= false"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                      color="green lighten-1"
                      @click="cleanForm()"
                  >
                    Sí
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>


      </v-container>
    </v-form>
    <v-snackbar
        v-model="scheduleStore.error"
        :timeout="timeout"
        color="red accent-2"
    >
      {{ "Uno o más datos son incorrectos y/o requeridos" }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="accent"
            text
            v-bind="attrs"
            @click="scheduleStore.error = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-container
        v-if="showResults"
    >
      <v-container>
        <h1>Resultados</h1>
        <br>
        <v-row>
          <v-col class="col-12 col-sm-8 col-md-5 mx-auto flex">
            <div>
              <h2>Resultados de la Estructuración<br>del bono</h2>
              <br>
              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">Frecuencia del Cupon</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      color="accent"
                      solo
                      readonly
                      :value="results.structuringResults.couponFrequencyDays"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">Dias Capitalización</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      color="accent"
                      solo
                      readonly
                      :value="results.structuringResults.capitalizationDays"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">Nº Periodos por año</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      color="accent"
                      solo
                      readonly
                      :value="results.structuringResults.periodsPerYear"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">Nº Total de Periodos</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      color="accent"
                      solo
                      readonly
                      :value="results.structuringResults.totalNumberOfPeriods"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">Tasa Efectiva Anual</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      suffix="%"
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectPercentDecimal(results.structuringResults.effectiveAnnualRate)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">Tasa Efectiva Semestral</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      suffix="%"
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectPercentDecimal(results.structuringResults.effectiveRate)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium"> Cok {{ form.scheduleData.boundData.couponFrequency }}
                  </v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      suffix="%"
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectPercentDecimal(results.structuringResults.cok)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">Costes Iniciales Emisor</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      color="accent"
                      :prefix=toSymbol(this.form.scheduleData.currencyType)
                      solo
                      readonly
                      :value="toCorrectValueDecimal(results.structuringResults.initialCostsEmitter)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">Costes Iniciales Bonista</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      :prefix=toSymbol(this.form.scheduleData.currencyType)
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectValueDecimal(results.structuringResults.initialCostsBondholder)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <div>
              <h2>Resultados del precio actual y<br>utilidad</h2>
              <br>
              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">Precio Actual</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      :prefix=toSymbol(this.form.scheduleData.currencyType)
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectValueDecimal(results.resultsOfCurrentPriceAndProfit.currentPrice)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">Utilidad/Pérdida</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      :prefix=toSymbol(this.form.scheduleData.currencyType)
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectValueDecimal(results.resultsOfCurrentPriceAndProfit.lostProfit)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

          </v-col>
          <v-col class="col-12 col-sm-8 col-md-5 mx-auto flex">
            <div>
              <h2>Resultados de ratios de desición</h2>
              <br>
              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">Duración</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectValueDecimal(results.resultsOfDecisionRatio.duration)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">Convexidad</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectValueDecimal(results.resultsOfDecisionRatio.convexity)"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">Total</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectValueDecimal(results.resultsOfDecisionRatio.total)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">Duración Modificada</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectValueDecimal(results.resultsOfDecisionRatio.modifiedDuration)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>

            <div>
              <h2>Resultados de los indicadores de rentabilidad</h2>
              <br>
              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">TCEA Emisor</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      suffix="%"
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectPercentDecimal(results.profitabilityResults.emitterTcea)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">TIR TCEA Emisor</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">

                  <v-text-field
                      background-color="blue-grey lighten-5"
                      suffix="%"
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectPercentDecimal(results.profitabilityResults.emitterTirTcea)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">TCEA Emisor c/Escudo</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      suffix="%"
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectPercentDecimal(results.profitabilityResults.emitterTceaWithShield)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">TIR TCEA Emisor c/Escudo</v-subheader>
                </v-col>
                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      suffix="%"
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectPercentDecimal(results.profitabilityResults.emitterTirTceaWithShield)"
                  ></v-text-field>
                </v-col>
              </v-row>


              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium">TREA Bonista</v-subheader>
                </v-col>

                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      suffix="%"
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectPercentDecimal(results.profitabilityResults.bondHolderTrea)"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="col-5 col-sm-4 pa-0">
                  <v-subheader class="font-weight-medium"> TIR TREA Bonista</v-subheader>
                </v-col>

                <v-col class="col-7 col-sm-8  pa-0">
                  <v-text-field
                      background-color="blue-grey lighten-5"
                      suffix="%"
                      color="accent"
                      solo
                      readonly
                      :value="toCorrectPercentDecimal(results.profitabilityResults.bondholderTirTrea)"
                  ></v-text-field>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-card>
          <v-card-title>
            Cronograma
            <v-spacer></v-spacer>
            <v-text-field
                v-model="quotasData.search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
              :headers="quotasData.headers"
              :items="quotasData.quotas"
              :search="quotasData.search"
              :sort-by.sync="quotasData.sortBy"
              :sort-desc.sync="quotasData.sortDesc"
          ></v-data-table>
        </v-card>
        <br>
        <v-row class="text-center">
          <v-col>
            <v-btn       
               x-large
               class="py-5 mb-5"
               align="center"
               color="success"
               dark
              v-on:click="download"
             >Exportar Cronograma &nbsp;<br>de Pagos en Excel &nbsp; &nbsp;
             <v-icon dark class="ce">
                mdi-cloud-download
             </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-container>
</template>

<script>
import {useScheduleStore} from "@/store/useScheduleStore";
import {useAuthStore} from "@/store/useAuthStore";
import {bus} from '@/main'
import {writeFile,utils}from "xlsx"


export default {
  name: "Calculator",

  data() {
    return {
      form: {
        scheduleData: {
          methodType: '',
          currencyType: '',
          boundData: {
            nominalValue: '',
            commercialValue: '',
            years: '',
            couponFrequency: '',
            daysYear: '',
            typeInterestRate: '',
            capitalization: '',
            interestRate: '',
            annualDiscountRate: '',
            incomeTax: '',
            issue: '',
            gracePeriod: '',
            typeOfGracePeriod: '',
            inflation: ''
          },
          initialCostData: {
            premium: '',
            structuring: '',
            collocation: '',
            floatation: '',
            cavali: ''
          }
        },
        items: {
          amortizationMethods: [
            'Americano',
            'Alemán',
            'Francés',
          ],
          currencyTypeItems: [
            'PEN',
            'EUR',
            'USD'
          ],
          interestRateTypeItems: [
            'Efectiva',
            'Nominal'
          ],
          couponFrequencyItems: [
            'Mensual',
            'Bimestral',
            'Trimestral',
            'Cuatrimestral',
            'Semestral',
            'Anual'
          ],
          capitalizationItems: [
            'Diario',
            'Quincenal',
            'Mensual',
            'Bimestral',
            'Trimestral',
            'Cuatrimestral',
            'Semestral',
            'Anual'
          ],

        },
        isValid: false,
        issueDateMenu: false,
        dialogCleanForm: false,
      },

      results: {
        resultsOfCurrentPriceAndProfit: Object,
        resultsOfDecisionRatio: Object,
        profitabilityResults: Object,
        structuringResults: Object,
        quotas: Object
      },
      quotasData: {
        search: '',
        sortBy: 'numberOfQuota',
        sortDesc: false,
        headers: [
          {
            text: 'Nº',
            value: 'numberOfQuota',
          },
          {text: 'Fecha Programada', value: 'scheduledDate'},
          {text: 'Inflación', value: 'inflation'},
          {text: 'Inflación del Periodo', value: 'periodInflation'},
          {text: 'Plazo de Gracia', value: 'typeOfGracePeriod'},
          {text: 'Bono', value: 'bond'},
          {text: 'Bono Indexado', value: 'indexedBond'},
          {text: 'Cupón(Interes)', value: 'coupon'},
          {text: 'Cuota', value: 'quota'},
          {text: 'Amort.', value: 'amortization'},
          {text: 'Prima', value: 'premium'},
          {text: 'Escudo', value: 'shield'},
          {text: 'Flujo emisor.', value: 'emitterStream'},
          {text: 'Flujo emisor c/escudo', value: 'emitterFlowWithShield'},
          {text: 'Flujo Bonista', value: 'boundHolderFlow'},
        ],
        quotas: []
      },

      rules: {
        required: v => !!v || 'Requerido',
        isInt: v => Number.isInteger(Number(v)) || 'Entero requerido',
        isPositive: v => Number(v) > 0 || 'Número positivo requerido',
      },
      showResults: false,
      timeout: 3000,
      userId: 0,
      scheduleCurrentData: Object,
      scheduleStore: useScheduleStore(),
      authStore: useAuthStore()
    }
  },
  methods: {
    isStypePeriod() {
      if (this.form.scheduleData.boundData.typeOfGracePeriod === 'S' ||
          this.form.scheduleData.boundData.typeOfGracePeriod === "") {
        this.form.scheduleData.boundData.gracePeriod = 0
        return false
      }
      return true
    },
    isAmtypeOfGracePeriodItem() {
      return this.form.scheduleData.methodType == 'Americano' ? ['S', 'T',] : ['S', 'T', 'P']
    },
    formatDate(date) {
      const fDate = new Date(date);
      fDate.setDate(fDate.getDate() + 1);
      return `${fDate.getDate()}/${fDate.getMonth()+1}/${fDate.getFullYear()}`;
    },
    formatDateForm(date) {
      const fDate = new Date(date);
      fDate.setDate(fDate.getDate() + 1);
      return `${fDate.getFullYear()}-${fDate.getMonth() + 1}-${fDate.getDate()}`;
    },

   download : function() {
        const data = utils.json_to_sheet(this.quotasData.quotas)
        const wb = utils.book_new()
        utils.book_append_sheet(wb, data, 'data')
        writeFile(wb,'Cronograma de Pagos.xlsx')
    },
    getMethodType(method) {
      switch (method) {
        case "Americano":
          return "AMERICAN";
        case "Francés":
          return "FRENCH";
        case "Alemán":
          return "GERMAN"
      }

    },
    getInterestRateType(interestRateType) {
      switch (interestRateType) {
        case "Efectiva":
          return "EFFECTIVE";
        case "Nominal":
          return "NOMINAL";
        default:
          return "Null";
      }
    },
    getCouponFrequency(couponFrequency) {
      switch (couponFrequency) {
        case "Mensual":
          return "MONTHLY";
        case "Bimestral":
          return "BIMONTHLY";
        case "Trimestral":
          return "QUARTERLY";
        case "Cuatrimestral":
          return "FOURMONTHLY";
        case "Semestral":
          return "SIXMONTHLY";
        case "Anual":
          return "ANNUAL";
        default:
          return "Null";
      }
    },
    getCapitalization(capitalization) {
      switch (capitalization) {
        case "Diario":
          return "DAILY";
        case "Quincenal":
          return "BIWEEKLY";
        case "Mensual":
          return "MONTHLY";
        case "Bimestral":
          return "BIMONTHLY";
        case "Trimestral":
          return "QUARTERLY";
        case "Cuatrimestral":
          return "FOURMONTHLY";
        case "Semestral":
          return "SIXMONTHLY";
        case "Anual":
          return "ANNUAL";
        default:
          return "DAILY";
      }
    },
    getConvertCapitalization(capitalization) {
      switch (capitalization) {
        case "DAILY":
          return "Diario";
        case "BIWEEKLY":
          return "Quincenal";
        case "MONTHLY":
          return "Mensual";
        case "BIMONTHLY":
          return "Bimestral";
        case "QUARTERLY":
          return "Trimestral";
        case "FOURMONTHLY":
          return "Cuatrimestral";
        case "SIXMONTHLY":
          return "Semestral";
        case "ANNUAL":
          return "Anual";
        default:
          return "Null";
      }
    },
    getConvertTypeInterestRate(typeInterestRate) {
      if (typeInterestRate == "EFFECTIVE") return "Efectiva";
      return "Nominal";
    },
    getConvertCouponFrequency(couponFrequency) {
      switch (couponFrequency) {
        case "MONTHLY":
          return "Mensual";
        case "BIMONTHLY":
          return "Bimestral";
        case "QUARTERLY":
          return "Trimestral";
        case "FOURMONTHLY":
          return "Cuatrimestral";
        case "SIXMONTHLY":
          return "Semestral";
        case "ANNUAL":
          return "Anual";
        default:
          return "Null";
      }
    },
    getConvertMethodType(method) {
      switch (method) {
        case "AMERICAN":
          return "Americano";
        case "FRENCH":
          return "Francés";
        case "GERMAN":
          return "Alemán"
      }
    },

    toSymbol(coin) {
      switch (coin) {
        case "PEN":
          return "S/";
        case "USD":
          return "$";
        case "EUR":
          return "€";
        default :
          return null
      }
    },
    convertToUpdateData(data) {
      const updateData = {
        methodType: data.methodType,
        currencyType: data.currencyType,
        updateBoundDataResource: data.createBoundDataResource,
        updateInitialCostDataResource: data.createInitialCostDataResource
      }
      return updateData
    },
    retrieveData() {
      const dataRetrieve = {
        methodType: this.getMethodType(this.form.scheduleData.methodType),
        currencyType: this.form.scheduleData.currencyType,
        createBoundDataResource: {
          nominalValue: parseFloat(this.form.scheduleData.boundData.nominalValue),
          commercialValue: parseFloat(this.form.scheduleData.boundData.commercialValue),
          years: parseInt(this.form.scheduleData.boundData.years),
          couponFrequency: this.getCouponFrequency(this.form.scheduleData.boundData.couponFrequency),
          daysYear: 360,
          typeInterestRate: this.getInterestRateType(this.form.scheduleData.boundData.typeInterestRate),
          capitalization: this.getCapitalization(this.form.scheduleData.boundData.capitalization),
          interestRate: (parseFloat(this.form.scheduleData.boundData.interestRate) / 100),
          annualDiscountRate: (parseFloat(this.form.scheduleData.boundData.annualDiscountRate) / 100),
          incomeTax: (parseFloat(this.form.scheduleData.boundData.incomeTax)) / 100,
          issue: this.form.scheduleData.boundData.issue,
          gracePeriod: parseFloat(this.form.scheduleData.boundData.gracePeriod),
          typeOfGracePeriod: this.form.scheduleData.boundData.typeOfGracePeriod,
          inflation: parseFloat(this.form.scheduleData.boundData.inflation) / 100
        },
        createInitialCostDataResource: {
          premium: (parseFloat(this.form.scheduleData.initialCostData.premium) / 100),
          structuring: (parseFloat(this.form.scheduleData.initialCostData.structuring) / 100),
          collocation: (parseFloat(this.form.scheduleData.initialCostData.collocation) / 100),
          floatation: (parseFloat(this.form.scheduleData.initialCostData.floatation) / 100),
          cavali: (parseFloat(this.form.scheduleData.initialCostData.cavali) / 100),
        }

      }
      return dataRetrieve
    },

    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.userId = this.authStore.user.id;
        if (this.scheduleCurrentData.hasOwnProperty('id')) {
          const updateData = this.convertToUpdateData(this.retrieveData());
          updateData.updateBoundDataResource.issue = new Date(updateData.updateBoundDataResource.issue)
          await this.scheduleStore.updateSchedule(this.scheduleCurrentData.id, updateData).then(() => {
            this.updateShowResultsData();
            this.showResults = true;
          })
        } else {
          const data = this.retrieveData()
          await this.scheduleStore.createSchedule(this.userId, data).then(() => {
            this.updateShowResultsData();
            this.showResults = true;
          })
        }
      } else this.scheduleStore.error = true
    },

    cleanForm() {
      this.scheduleStore.clearScheduleCalculatorForm();
      this.form.dialogCleanForm = false;
      this.showResults = false;
      this.emptyValuesForm();
    },
    initForm() {
      if (this.scheduleCurrentData.hasOwnProperty('id')) {
        this.form.scheduleData.methodType = this.getConvertMethodType(this.scheduleCurrentData.methodType)
        this.form.scheduleData.currencyType = this.scheduleCurrentData.currencyType
        this.form.scheduleData.boundData.nominalValue = this.scheduleCurrentData.boundData.nominalValue,
            this.form.scheduleData.boundData.commercialValue = this.scheduleCurrentData.boundData.commercialValue,
            this.form.scheduleData.boundData.years = this.scheduleCurrentData.boundData.years,
            this.form.scheduleData.boundData.couponFrequency = this.getConvertCouponFrequency(this.scheduleCurrentData.boundData.couponFrequency),
            this.form.scheduleData.boundData.daysYear = this.scheduleCurrentData.boundData.daysYear,
            this.form.scheduleData.boundData.typeInterestRate = this.getConvertTypeInterestRate(this.scheduleCurrentData.boundData.typeInterestRate),
            this.form.scheduleData.boundData.capitalization = this.getConvertCapitalization(this.scheduleCurrentData.boundData.capitalization),
            this.form.scheduleData.boundData.interestRate = this.toCorrectPercentDecimal((this.scheduleCurrentData.boundData.interestRate)),
            this.form.scheduleData.boundData.annualDiscountRate = this.toCorrectPercentDecimal((this.scheduleCurrentData.boundData.annualDiscountRate)),
            this.form.scheduleData.boundData.incomeTax = this.toCorrectPercentDecimal((this.scheduleCurrentData.boundData.incomeTax)),
            this.form.scheduleData.boundData.issue = this.formatDateForm(this.scheduleCurrentData.boundData.issue),
            this.form.scheduleData.boundData.gracePeriod = this.scheduleCurrentData.boundData.gracePeriod,
            this.form.scheduleData.boundData.typeOfGracePeriod = this.scheduleCurrentData.boundData.typeOfGracePeriod,
            this.form.scheduleData.boundData.inflation =  this.toCorrectPercentDecimal(this.scheduleCurrentData.boundData.inflation),
            this.form.scheduleData.initialCostData.premium = this.toCorrectPercentDecimal(this.scheduleCurrentData.initialCostData.premium),
            this.form.scheduleData.initialCostData.structuring = this.toCorrectPercentDecimal((this.scheduleCurrentData.initialCostData.structuring)),
            this.form.scheduleData.initialCostData.collocation = this.toCorrectPercentDecimal((this.scheduleCurrentData.initialCostData.collocation)),
            this.form.scheduleData.initialCostData.floatation = this.toCorrectPercentDecimal((this.scheduleCurrentData.initialCostData.floatation)),
            this.form.scheduleData.initialCostData.cavali = this.toCorrectPercentDecimal((this.scheduleCurrentData.initialCostData.cavali)),
            this.updateShowResultsData();
        this.showResults = true;
      } else {
        this.emptyValuesForm()
      }
    },
    emptyValuesForm() {
      this.form.scheduleData.methodType = '',
          this.form.scheduleData.currencyType = '',
          this.form.scheduleData.boundData.nominalValue = '',
          this.form.scheduleData.boundData.commercialValue = '',
          this.form.scheduleData.boundData.years = '',
          this.form.scheduleData.boundData.couponFrequency = '',
          this.form.scheduleData.boundData.daysYear = '',
          this.form.scheduleData.boundData.typeInterestRate = '',
          this.form.scheduleData.boundData.capitalization = '',
          this.form.scheduleData.boundData.interestRate = '',
          this.form.scheduleData.boundData.annualDiscountRate = '',
          this.form.scheduleData.boundData.incomeTax = '',
          this.form.scheduleData.boundData.issue = '',
          this.form.scheduleData.boundData.gracePeriod = '',
          this.form.scheduleData.boundData.typeOfGracePeriod = '',
          this.form.scheduleData.boundData.inflation = '',
          this.form.scheduleData.initialCostData.premium = '',
          this.form.scheduleData.initialCostData.structuring = '',
          this.form.scheduleData.initialCostData.collocation = '',
          this.form.scheduleData.initialCostData.floatation = '',
          this.form.scheduleData.initialCostData.cavali = ''
    },

    updateShowResultsData() {
      this.scheduleCurrentData = this.scheduleStore.schedule;
      this.results.resultsOfCurrentPriceAndProfit = (this.scheduleCurrentData.resultsOfCurrentPriceAndProfit);
      this.results.resultsOfDecisionRatio = this.scheduleCurrentData.resultsOfDecisionRatio;
      this.results.profitabilityResults = this.scheduleCurrentData.profitabilityResults;
      this.results.structuringResults = this.scheduleCurrentData.structuringResults;
      this.quotasData.quotas = this.scheduleCurrentData.quotas;
      this.quotasData.quotas = this.quotasData.quotas.map((_quota) => {
        var newQuota = {
          numberOfQuota: _quota.numberOfQuota,
          scheduledDate: this.formatDate(_quota.scheduledDate),
          inflation: this.toCorrectValueDecimal(_quota.inflation * 100),
          periodInflation: this.toCorrectValueDecimal(_quota.periodInflation * 100),
          typeOfGracePeriod: _quota.typeOfGracePeriod,
          bond: this.toCorrectValueDecimal(_quota.bond),
          indexedBond: this.toCorrectValueDecimal(_quota.indexedBond),
          coupon: this.toCorrectValueDecimal(_quota.coupon),
          quota: this.toCorrectValueDecimal(_quota.quota),
          amortization: this.toCorrectValueDecimal(_quota.amortization),
          premium: this.toCorrectValueDecimal(_quota.premium),
          shield: this.toCorrectValueDecimal(_quota.shield),
          emitterStream: this.toCorrectValueDecimal(_quota.emitterStream),
          emitterFlowWithShield: this.toCorrectValueDecimal(_quota.emitterFlowWithShield),
          boundHolderFlow: this.toCorrectValueDecimal(_quota.boundHolderFlow),
        }
        return newQuota
      })
      this.quotasData.quotas.sort((a,b)=>{
        return a.numberOfQuota<b.numberOfQuota ? -1 : 1
      })
    },
    toCorrectValueDecimal(n) {
      return parseFloat(n).toFixed(2);
    },
    toCorrectPercentDecimal(n) {
      return (parseFloat(n) * 100).toFixed(7);
    },

  },
  created() {
    let self = this;
    bus.$on('showAll', () => {
      self.showResults = false;
    });
  },
  mounted() {
    this.scheduleCurrentData = this.scheduleStore.schedule
    this.initForm();

  }
}
</script>
<style>
h2 {
  text-align: center;
  background-color: #A5EBE9;
  padding: 4% 10%;
  margin: 5% 0%;

}
</style>