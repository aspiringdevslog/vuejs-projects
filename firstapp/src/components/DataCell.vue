<template>
	<div class="data-cell">
    		<td v-if="dataArray[dataKey][dataHeader].filter">
    			{{ dataArray[dataKey][dataHeader].details }} 
    		</td>
    		<td v-if="!dataArray[dataKey][dataHeader].filter">
    			{{  }}
    		</td>  		
	</div>
</template>

<script>
export default {
  name: 'DataRow',
  props: {
    dataKey: Number,
    dataHeader: String
  },
  data: function(){
  	return {
  		dataArray: [],
  		comment: [
  			"insert comment1",
  			"insert comment2",
  			"insert comment3",
  		]
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
     // console.log(this.dataKey);
     // console.log(this.dataHeader);

     // var localDataKey = this.dataKey;
     // var localDataHeader = this.dataHeader;
     // console.log(this.dataArray[localDataKey][localDataHeader].details);
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


</style>
