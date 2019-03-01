<template>
	<div class="data-table">
		<h2>
			DIV for data table
		</h2>

		<div class="filter-table">
			<input type="text" v-model="filterCondition">
			<button v-on:click="filter(filterCondition)">Filter Data 1</button>
			<button v-on:click="clearFilter">Clear Filters</button>
		</div>

		<table>
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
	      	<tr v-for="(data, key) in dataArray" :key="key">
				<td>
	      			{{ data.second }}
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
	      	</tr>
		</table>

		<table>
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
				<td>
					<input type="text" v-model="insertData.first.details">
				</td> 
				<td>
					<input type="text" v-model="insertData.second.details">
				</td> 
				<td>
					<input type="text" v-model="insertData.third.details">
				</td> 
				<td>
					<input type="text" v-model="insertData.comment.details">
				</td>
	      	</tr>
	      	<button v-on:click="addNewData">Add Above Data</button>
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
  		dataArray: {
  			first: {
  				details: "for data 0",
  				filter: 1
  			},
  			second: {
  				details: "for data 1",
  				filter: 1
  			},
  			third: {
  				details: "for data 0",
  				filter: 1
  			},
  			comment: {
  				details: "for comments",
  				filter: 1
  			}
  		},
  		filterCondition: "cond",
  		comment: [
  			"insert comment1",
  			"insert comment2",
  			"insert comment3",
  		],
  		insertData: {
  			first: {
  				details: "for data 0",
  				filter: 1
  			},
  			second: {
  				details: "for data 1",
  				filter: 1
  			},
  			third: {
  				details: "for data 0",
  				filter: 1
  			},
  			comment: {
  				details: "for comments",
  				filter: 1
  			}
  		}
  	}
  },
  computed: {

  }, 
  methods: {
  	addNewData(){
  		var tempDataArray = JSON.parse(localStorage.getItem("dataArray"));

  		if(tempDataArray == null){
  			console.log("null");
  			localStorage.setItem("dataArray", JSON.stringify(this.insertData));
  		} else {
  			tempDataArray.add(this.insertData);
  			localStorage.setItem("dataArray", JSON.stringify(this.tempDataArray));
  		}

  		// console.log(tempDataArray);
  		// localStorage.setItem("test", JSON.stringify(this.tempDataArray));
  		// console.log(this.insertData);
  		// tempDataArray.push(this.insertData);
  		// console.log(tempDataArray);
  		// localStorage.setItem("newDataArray", JSON.stringify(this.tempDataArray));

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
