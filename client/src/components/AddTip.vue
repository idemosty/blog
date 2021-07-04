<template>
	<div class="submit-form">
		<div v-if="!submitted">
			<div class="form-group">
				<label for="title">Title</label>
				<input
					type="text"
					class="form-control"
					id="title"
					required
					v-model="tip.title"
					name="title"
				/>
			</div>

			<div class="form-group">
				<label for="description">Description</label>
				<input
					class="form-control"
					id="description"
					required
					v-model="tip.description"
					name="description"
				/>
			</div>

			<button @click="saveTip" class="">Submit</button>
		</div>

		<div v-else>
			<h4>You submitted successfully!</h4>
			<button class="" @click="newTip">Add</button>
		</div>
	</div>
</template>

<script>
import TipDataService from '../services/TipDataService';

export default {
	name: 'add-tip',
	data() {
		return {
			tip: {
				id: null,
				title: '',
				description: '',
				published: false,
			},
			submitted: false,
		};
	},
	methods: {
		saveTip() {
			let data = {
				title: this.tip.title,
				description: this.tip.description,
			};

			TipDataService.create(data)
				.then((response) => {
					this.tip.id = response.data.id;
					console.log(response.data);
					this.submitted = true;
				})
				.catch((e) => {
					console.log(e);
				});
		},

		newTip() {
			this.submitted = false;
			this.tip = {};
		},
	},
};
</script>

<style>
.submit-form {
	max-width: 300px;
	margin: auto;
}
</style>
