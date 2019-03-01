<template>
	<div class="data-row">

    <tr><data-cell v-bind="dataCellParams"></data-cell></tr>
    <data-cell v-bind="dataCellParams"></data-cell>
    <data-cell v-bind="dataCellParams"></data-cell>
    <data-cell v-bind="dataCellParams"></data-cell>
<!--     	<tr v-for="(data, key) in dataArray" :key="key">
    		<td v-if="data.first.filter">
    			{{ data.first.details }} 
    		</td>
    		<td v-if="!data.first.filter">
    			{{  }}
    		</td>
    		<td>
    			{{ data.second }}
    		</td>	   
    		<td>
    			{{ data.third }}
    		</td>	 
    		<td>
    			{{ data.comment }}
    			<input type="text" v-model="comment[key]">
    			<button v-on:click="addComment(key)">Add comment</button>
    		</td>	  		
    	</tr> -->
	</div>
</template>

<script>

import DataCell from './DataCell.vue'

export default {
  name: 'DataRow',
  props: {
    dataKey: Number,
    datacClumn: Number
  },
  components: {
    'data-cell': DataCell
  },
  data: function(){
  	return {
  		dataArray: [],
  		comment: [
  			"insert comment1",
  			"insert comment2",
  			"insert comment3",
  		],
      dataCellParams: {
        dataKey : 0,
        dataHeader : "first"
      }
  	}
  },
  computed: {

  }, 
  methods: {
  	addComment(key){
  		this.dataArray[key].comment = this.comment[key];
  		// comment does not save directly into the data, need some way to store the json and load it through life cycle hooks
  	},
  		
  },
  beforeMount(){
  	this.dataArray = JSON.parse(localStorage.getItem("dataArray"));
  },
  created(){
  	// this.dataArrayBackup = this.dataArray; // first make a copy of the original data array
  },
  updated(){
  	console.log("updated");
  	localStorage.setItem("dataArray", JSON.stringify(this.dataArray));	
  }


}
</script>

<style scoped>

.data-table {
	margin: 0 auto;
	width: 80%;
	min-height: 80vh;
	background-color: #f2f2f2;
	padding: 10px;
}

table {
	margin: 0 auto;
	width: 90%;
}

th {
	border: solid #000 0.5px;
	width: 33%;
}

td {
	border: solid #000 0.5px;
}

</style>
