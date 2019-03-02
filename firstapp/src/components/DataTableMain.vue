<template>
	<div class="data-table">
		<h2>
			DIV for data table
		</h2>

		<div class="filter-table">
			<input type="text" v-model="filterCondition">
			<button v-on:click="filter(filterCondition)">Filter Data 1</button>
			<button v-on:click="clearFilter">Clear Filters</button>
			<button v-on:click="addFiller">Add Filler Data</button>
		</div>

		<table >
			<th>
				Key
			</th>
			<th>
	        	Data 1
	      	</th>
	      	<th>
	      		Data 2
	      	</th>
	      	<th>
	      		Data 3
	      	</th>
	      	<th>
	      		Comments
	      	</th>
	      	<tr>
	      		
	      	</tr>
	      	<tr v-for="(data, key) in dataArray" :key="key">
	      		<td>
	      			{{ key}}
	      		</td>
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
	      		<button v-on:click="deleteRow(key)">Delete Row</button>
	      	</tr>

	      	<tr>
	      		<td>
	      			{{ lastKeyInDataArray }}
	      		</td>
	      		<td>
	      			{{ insertDataArray[0].first.details }}
	      			<input v-model="insertDataArray[0].first.details">
	      		</td>
	      		<td>
	      			{{ insertDataArray[0].second }}
	      			<input v-model="insertDataArray[0].second">
	      		</td>
	      		<td>
	      			
	      		</td>
	      		<td>
	      			{{ insertDataArray[0].comment }}
	      			<input v-model="insertDataArray[0].comment">
	      		</td>
	      		<button v-on:click="addData(lastKeyInDataArray)">Add data</button>
	      	</tr>
		</table>




	</div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    msg: String
  },
  data: function(){
  	return {
  		dataArray: [
  			{
  				first: {
  					details: "random data under first column",
  					filter: 1,
  				},
  				second: "2nd column data",
  				comment: "nil"
  			},
  			{
  				first: {
  					details: "random data under 1st column",
  					filter: 1,
  				},
  				second: "2nd column data",
  				comment: "nil"
  			},
  			{
  				first: {
  					details: "random data",
  					filter: 1,
  				},
  				second: "2nd column data",
  				comment: "nil"
  			},
  		],
  		insertDataArray: [
  			{
  				first: {
  					details: "filler",
  					filter: 1,
  				},
  				second: "insert data",
  				comment: "nil"
  			}
  		],
  		filterCondition: "cond",
  		comment: [
  			"insert comment1",
  			"insert comment2",
  			"insert comment3",
  		],
  		lastKeyInDataArray: 0
  	}
  },
  computed: {

  }, 
  methods: {
  	deleteRow(key){
  		this.dataArray.pop();
  	},
  	changeData(){
  		for(var data in this.dataArray){
  			this.dataArray.third = "Hello";
  		}
  	},clearFilter(){
  		for(var data in this.dataArray){
  			this.dataArray[data].first.filter = 1;
  		}
  	},
  	filter(condition){
  		// this.dataArray = this.dataArrayBackup; // first retrieve the original data
  		this.clearFilter();

  		for(var data in this.dataArray){
  			var string = this.dataArray[data].first.details; 

  			if(!string.includes(condition)){
  				this.dataArray[data].first.filter  = 0;
  				console.log(" does not include condition");
  			}
  		}
  	},
  	addComment(key){
  		this.dataArray[key].comment = this.comment[key];
  		localStorage.setItem("dataArray", JSON.stringify(this.dataArray));
  		// comment does not save directly into the data, need some way to store the json and load it through life cycle hooks
  	},
  	addFiller(){
  		this.dataArray[this.lastKeyInDataArray] = this.insertDataArray[0];
  		localStorage.setItem("dataArray", JSON.stringify(this.dataArray));
  		this.lastKeyInDataArray ++;
  	},
  	addData(key){
  		console.log("add");
  		console.log(key);
  		this.dataArray[this.lastKeyInDataArray] = this.insertDataArray[0];
  		localStorage.setItem("dataArray", JSON.stringify(this.dataArray));
  		this.lastKeyInDataArray ++;
  	}
	
},
beforeMount(){
	if(JSON.parse(localStorage.getItem("dataArray")) == null){

	} else {
		this.dataArray = JSON.parse(localStorage.getItem("dataArray"));
		this.lastKeyInDataArray = this.dataArray.length;
		console.log(this.lastKeyInDataArray);
	}
	
},
created(){
	// this.dataArrayBackup = this.dataArray; // first make a copy of the original data array
},
updated(){
	// console.log("updated");
	// localStorage.setItem("dataArray", JSON.stringify(this.dataArray));	
	// this.dataArray = JSON.parse(localStorage.getItem("dataArray"));
},

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
	/*width: 33%;*/
}

td {
	border: solid #000 0.5px;
}

</style>
