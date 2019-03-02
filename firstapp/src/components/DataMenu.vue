<template>

<div>
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
</div>

</template>

<script>
	export default {
		props: {

		},
		data: function(){
			return {
				editedIndex: -1,
				dialog: false,
				editedItem: { // just set up the structure for this item and headers, then the rest will follow
				},
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
		    close () {
		        this.dialog = false
		        setTimeout(() => {
		          this.editedItem = Object.assign({}, this.defaultItem)
		          this.editedIndex = -1
		        }, 300)
		      },
		      save () {

		      	if(localStorage.getItem('desserts') != null){
		      		this.desserts = JSON.parse(localStorage.getItem('desserts'));
		      	} else {
		      		this.desserts = [];
		      	}
		      	

		        if (this.editedIndex > -1) {
		          Object.assign(this.desserts[this.editedIndex], this.editedItem)
		        } else {
		          this.desserts.push(this.editedItem)
		        }
		       	localStorage.setItem('desserts', JSON.stringify(this.desserts));
	    	
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
	}
</script>

<style scoped>
.vuetify-data-table {
	width: 80%;
	margin: 0px auto;
}	

</style>