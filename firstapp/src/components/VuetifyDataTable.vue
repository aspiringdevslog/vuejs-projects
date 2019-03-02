<template>

<v-app light class="inspire">
	<div class="vuetify-data-table">

		<v-btn color="warning" dark class="mb-2" v-on:click="clearLocal('desserts')">Clear Data</v-btn>




		<v-dialog v-model="dialog" max-width="80%">
			<template v-slot:activator="{ on }">
				<v-btn color="primary" dark class="mb-2" v-on="on">Add Dessert</v-btn>
			</template>

			<v-card>
				<v-card-title>
					<span class="headline">{{ formTitle }}</span>
				</v-card-title>

				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12 sm6 md4>
								<!-- <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field> -->
								<v-autocomplete
								label="Dessert name"
								v-model="editedItem.name"
								:items="dessertList"
								>
<!-- 									<template v-slot:append-outer>
										<v-slide-x-reverse-transition
										mode="out-in"
										>
										</v-slide-x-reverse-transition>
									</template> -->
								</v-autocomplete>
							</v-flex>

							<v-flex xs12 sm6 md4>
								<v-text-field v-model="editedItem.price" label="Price"></v-text-field>
							</v-flex>
							
							<v-flex xs12 sm6 md4>
								<v-text-field v-model="editedItem.desc" label="Description"></v-text-field>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" flat v-on:click="close">Cancel</v-btn>
					<v-btn color="blue darken-1" flat v-on:click="save">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<hr>
		<v-data-table
		:headers="headers"
		:items="desserts"
		:rows-per-page-items="rowsChoice"
		class="elevation-1"
		>
			<template v-slot:items="props">
				<!-- <td></td> -->
				<td>{{ props.item.name }}</td>
				<td>{{ props.item.price }}</td>
				<td>{{ props.item.desc }}</td>
				<td>
		          <v-icon
		            small
		            class="mr-2"
		            @click="editItem(props.item)"
		          >
		            edit
		          </v-icon>
		          <v-icon
		            small
		            @click="deleteItem(props.item)"
		          >
		            delete
		          </v-icon>
		        </td>

			</template>
		</v-data-table>

		<br>

		<v-data-table
		:headers="rankingHeaders"
		:items="rankings"
		:rows-per-page-items="rowsChoice"
		class="elevation-1"
		>
			<template v-slot:items="props">
				<!-- <td></td> -->
				<td>{{ props.item.first }}</td>
				<td>{{ props.item.second }}</td>
				<td>{{ props.item.third }}</td>
				<td>
		          <v-icon
		            small
		            @click="deleteRankedItem(props.item)"
		          >
		            delete
		          </v-icon>
		        </td>
		        </td>

			</template>
		</v-data-table>
		<br>

		<v-card>
			<v-card-title>
				<span class="headline">{{ formTitle }}</span>
			</v-card-title>

			<v-card-text>
				<v-container grid-list-md>
					<v-layout wrap>
						<v-flex xs12 sm6 md4>
							<v-autocomplete
							label="First Dessert"
							v-model="rankedDesserts.first"
							:items="dessertList"
							>
							</v-autocomplete>
						</v-flex>

						<v-flex xs12 sm6 md4>
							<v-autocomplete
							label="Second Dessert"
							v-model="rankedDesserts.second"
							:items="dessertList"
							>
							</v-autocomplete>
						</v-flex>
						
						<v-flex xs12 sm6 md4>
							<v-autocomplete
							label="Third Dessert"
							v-model="rankedDesserts.third"
							:items="dessertList"
							>
							</v-autocomplete>
						</v-flex>
					</v-layout>
				</v-container>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<!-- <v-btn color="blue darken-1" flat v-on:click="close">Cancel</v-btn> -->
				<v-btn color="blue darken-1" flat v-on:click="saveRanked">Save</v-btn>
			</v-card-actions>
		</v-card>

		
	</div>
</v-app>

</template>

<script>
	export default {
		data: function(){
			return {
				rankingHeaders: [
					{
						text: 'First',
						value: 'first'
					},
					{
						text: 'Second',
						value: 'second'
					},
					{
						text: 'Third',
						value: 'third'
					},
					{
						text: 'Actions'
					}
				],
				editedIndex: -1,
				dialog: false,
				editedItem: { // just set up the structure for this item and headers, then the rest will follow
				},
				rankedDesserts: [
					// first: "",
					// second: "",
					// third: ""
				],
				rowsChoice: [
					10,25,50,100,
					{"text":"$vuetify.dataIterator.rowsPerPageAll","value":-1}
				],
				rankings: [
					// {
					// 	first: "Ice Cream",
					// 	second: "Chocolate",
					// 	third: "Mango Pudding"
					// }
				],
				headers: [
					{
						text: 'Dessert',
						value: 'name',
						align: 'left'
					},
					{
						text: 'Price',
						value: 'price'
					},
					{
						text: 'Description',
						value: 'desc'
					},
					{
						text: 'Actions',

					}
				],
				desserts: [
				],
				dessertList: [
					'Ice Cream', 'Chocolate Ice Cream', 'Chocolate Mud Pie', 'Chocolate Brownie', 'White Chocolate Cake', 'Dark Choclate Cake', 'Waffles with Cream Cheese', 'Waffles with Ice Cream'
				],
				dropModel: null,
			}
		},
		methods: {
			addDessert(){
				var tempDessert = {
					name: this.dessert.name,
					price: this.dessert.price
				};
				this.desserts.push(tempDessert);
			},
			editItem (item) {
		      this.editedIndex = this.desserts.indexOf(item)
		      this.editedItem = Object.assign({}, item)
		      this.dialog = true
		    },
		    deleteRankedItem (item) {
		      const index = this.rankedDesserts.indexOf(item)
		      confirm('Are you sure you want to delete this item?') && this.rankedDesserts.splice(index, 1)
		    },
		    deleteItem (item) {
		      const index = this.desserts.indexOf(item)
		      confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
		    },
		    close () {
		        this.dialog = false
		        setTimeout(() => {
		          this.editedItem = Object.assign({}, this.defaultItem)
		          this.editedIndex = -1
		        }, 300)
		      },
		      save () {
		        if (this.editedIndex > -1) {
		          Object.assign(this.desserts[this.editedIndex], this.editedItem)
		        } else {
		          this.desserts.push(this.editedItem)
		        }
		       	localStorage.setItem('desserts', JSON.stringify(this.desserts));
	    	
		        this.close()
		      },
		      saveRanked () {
		      	console.log(this.rankedDesserts);
		        if (this.editedIndex > -1) {
		          Object.assign(this.rankings[this.editedIndex], this.rankedDesserts)
		        } else {
		          this.rankings.push(this.rankedDesserts);
		        }
		        localStorage.setItem('rankings', JSON.stringify(this.rankings));
		        this.close()
		      },
		      clearLocal(key){
		      	localStorage.setItem(key, []);
		      	this.desserts = [];
		      }
		},
		computed: {
	      formTitle () {
	        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
	      }
	    },
	    beforeCreate(){
	    	// console.log(this.desserts);
	    	// var tempDesserts = JSON.parse(localStorage.getItem('desserts'));

	    	// this.desserts = tempDesserts;
	    	// console.log(this.desserts);
	    },
	    created() {
	    	var tempDesserts = JSON.parse(localStorage.getItem('desserts'));
	    	// console.log(tempDesserts);
	    	// console.log(this.desserts);
	    	this.desserts = tempDesserts;
	    	if(tempDesserts === null) {
	    		// localStorage.setItem('desserts', JSON.stringify(this.desserts));
	    		this.desserts = [];
	    	}

	    	var tempRankings = JSON.parse(localStorage.getItem('rankings'));
	    	// console.log(tempRankings);
	    	// console.log(this.rankings);

	    	this.rankings = tempRankings;
	    	if(tempRankings === null) {
	    		// localStorage.setItem('rankings', JSON.stringify(this.rankings));
	    		this.rankings = [];
	    	}
	    },
	    updated() {

	    },
	    beforeMount() {
	    	console.log(this.desserts);
	    }

	}
</script>

<style scoped>
.vuetify-data-table {
	width: 80%;
	margin: 0px auto;
}	

</style>