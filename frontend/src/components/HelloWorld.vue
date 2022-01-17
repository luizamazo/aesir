<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/xablot.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>
      <v-col>
         <v-file-input
          accept="json/*"
          label="Arquivo JSON"
          v-model="fileJson"
          ref="aquivoJson"
          ></v-file-input>
      </v-col>
      <v-btn class="ma-2" color="secondary" @click="uploadJSON">Enviar</v-btn>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'HelloWorld',
    data: () => ({
      fileJson: null,
    }),
    methods: {
      async uploadJSON(){
        let formData = new FormData()
        formData.append('file', 'ada')
        console.log('ha', this.fileJson)
        console.log(formData.getAll('file'));
        await axios({ url: 'generate-script', 
          headers: {"Content-Type": "multipart/form-data"}, 
          data: formData,
          method: 'POST' })
        .then(response => {
          console.log(response);
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
