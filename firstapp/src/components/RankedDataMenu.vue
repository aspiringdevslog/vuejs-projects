<template>

	<div class="vuetify-data-table">

		<v-card>
			<v-card-title>
				<span class="headline">Select Dessert Rankings</span>
			</v-card-title>

			<v-card-text>
				<v-container grid-list-md>
					<v-layout wrap>
						<v-flex xs12 sm6 md4>
							<v-autocomplete
							label="First Dessert"
							v-model="rankedDesserts.a"
							:items="dessertList"
							>
							</v-autocomplete>
						</v-flex>

						<v-flex xs12 sm6 md4>
							<v-autocomplete
							label="Second Dessert"
							v-model="rankedDesserts.b"
							:items="dessertList"
							>
							</v-autocomplete>
						</v-flex>
						
						<v-flex xs12 sm6 md4>
							<v-autocomplete
							label="Third Dessert"
							v-model="rankedDesserts.c"
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

</template>

<script>

	export default {
		data: function(){
			return {
				rankings: [		
				],
				editedIndex: -1,
				dialog: false,
				editedItem: { // just set up the structure for this item and headers, then the rest will follow
				},
				rankedDesserts: {

				},
				dessertList: [
					'Ice Cream', 'Chocolate Ice Cream', 'Chocolate Mud Pie', 'Chocolate Brownie', 'White Chocolate Cake', 'Dark Choclate Cake', 'Waffles with Cream Cheese', 'Waffles with Ice Cream'
				],
				dropModel: null,
			}
		},
		methods: {
		      saveRanked () {

		      	if(localStorage.getItem('rankings') != null){
		      		this.rankings = JSON.parse(localStorage.getItem('rankings'));
		      	} else {
		      		this.rankings = [];
		      	}	      	

		      	console.log(this.rankedDesserts);
		      	console.log(this.rankings);
		        this.rankings.push(this.rankedDesserts);
		        
		        console.log(this.rankings);

		        localStorage.setItem('rankings', JSON.stringify(this.rankings));
		        // localStorage.setItem('desserts', JSON.stringify(this.desserts));
		      }
		}
	}

</script>

<style scoped>

</style>