<template>
	<div class="list row">
		<div class="col-md-8">
			<div class="input-group mb-3">
				<input
					type="text"
					class="form-control"
					placeholder="Search by title"
					v-model="title"
				/>
				<div class="input-group-append">
					<button class="" type="button" @click="searchTitle">
						Search
					</button>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<h4>Tips List</h4>
			<ul class="list-group">
				<li
					class="list-group-item"
					:class="{ active: index == currentIndex }"
					v-for="(tip, index) in tips"
					:key="index"
					@click="setActiveTip(tip, index)"
				>
					{{ tip.title }}
				</li>
			</ul>

			<button class="m-3" @click="removeAllTips">
				Remove All
			</button>
		</div>
		<div class="col-md-6">
			<div v-if="currentTip">
				<h4>Tip</h4>
				<div>
					<label><strong>Title:</strong></label> {{ currentTip.title }}
				</div>
				<div>
					<label><strong>Description:</strong></label>
					{{ currentTip.description }}
				</div>
				<div>
					<label><strong>Status:</strong></label>
					{{ currentTip.published ? 'Published' : 'Pending' }}
				</div>

				<router-link
					:to="'/tips/' + currentTip.id"
					class="badge badge-warning"
				>
					Edit
				</router-link>
			</div>
			<div v-else>
				<br />
				<p>Please click on a Tip...</p>
			</div>
		</div>
	</div>
</template>

<script>
import TipDataService from '../services/TipDataService';

export default {
	name: 'tips-list',
	data() {
		return {
			tips: [],
			currentTip: null,
			currentIndex: -1,
			title: '',
		};
	},
	methods: {
		retrieveTips() {
			TipDataService.getAll()
				.then((response) => {
					this.tips = response.data;
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},

		refreshList() {
			this.retrieveTips();
			this.currentTip = null;
			this.currentIndex = -1;
		},

		setActiveTip(tip, index) {
			this.currentTip = tip;
			this.currentIndex = tip ? index : -1;
		},

		removeAllTips() {
			TipDataService.deleteAll()
				.then((response) => {
					console.log(response.data);
					this.refreshList();
				})
				.catch((e) => {
					console.log(e);
				});
		},

		searchTitle() {
			TipDataService.findByTitle(this.title)
				.then((response) => {
					this.tips = response.data;
					this.setActiveTip(null);
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		},
	},
	mounted() {
		this.retrieveTips();
	},
};
</script>

<style>
.list {
	text-align: left;
	max-width: 750px;
	margin: auto;
}
</style>
