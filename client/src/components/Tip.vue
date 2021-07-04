<template>
	<div v-if="currentTip" class="edit-form">
		<h4>Tip</h4>
		<form>
			<div class="form-group">
				<label for="title">Title</label>
				<input
					type="text"
					class="form-control"
					id="title"
					v-model="currentTip.title"
				/>
			</div>
			<div class="form-group">
				<label for="description">Description</label>
				<input
					type="text"
					class="form-control"
					id="description"
					v-model="currentTip.description"
				/>
			</div>

			<div class="form-group">
				<label><strong>Status:</strong></label>
				{{ currentTip.published ? 'Published' : 'Pending' }}
			</div>
		</form>

		<button
			class="badge badge-primary mr-2"
			v-if="currentTip.published"
			@click="updatePublished(false)"
		>
			UnPublish
		</button>
		<button
			v-else
			class="badge badge-primary mr-2"
			@click="updatePublished(true)"
		>
			Publish
		</button>

		<button class="badge badge-danger mr-2" @click="deleteTip">
			Delete
		</button>

		<button type="submit" class="badge badge-success" @click="updateTip">
			Update
		</button>
		<p>{{ message }}</p>
	</div>

	<div v-else>
		<br />
		<p>Please click on a Tip...</p>
	</div>
</template>

<script>
import TipDataService from '../services/TipDataService';

export default {
	name: 'tip',
	data() {
		return {
			currentTip: null,
			message: '',
		};
	},
	methods: {
		getTip(id) {
			TipDataService.get(id)
				.then((response) => {
					this.currentTip = response.data;
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},

		updatePublished(status) {
			var data = {
				id: this.currentTip.id,
				title: this.currentTip.title,
				description: this.currentTip.description,
				published: status,
			};

			TipDataService.update(this.currentTip.id, data)
				.then((response) => {
					console.log(response.data);
					this.currentTip.published = status;
					this.message = 'The status was updated successfully!';
				})
				.catch((e) => {
					console.log(e);
				});
		},

		updateTip() {
			TipDataService.update(this.currentTip.id, this.currentTip)
				.then((response) => {
					console.log(response.data);
					this.message = 'The tip was updated successfully!';
				})
				.catch((e) => {
					console.log(e);
				});
		},

		deleteTip() {
			TipDataService.delete(this.currentTip.id)
				.then((response) => {
					console.log(response.data);
					this.$router.push({ name: 'tips' });
				})
				.catch((e) => {
					console.log(e);
				});
		},
	},
	mounted() {
		this.message = '';
		this.getTip(this.$route.params.id);
	},
};
</script>

<style>
.edit-form {
	max-width: 300px;
	margin: auto;
}
</style>
