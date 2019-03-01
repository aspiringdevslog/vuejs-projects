<template>
	<div class="data-table">
		<h2>
			DIV for data table
		</h2>
	</div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    msg: String
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

</style>
