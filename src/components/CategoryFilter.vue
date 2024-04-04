<script>
import { state } from "../state.js"

export default {
    name: "CateogoryFilter",
    emits: ["useFilter"],
    data() {
        return {
            state: state
        }
    }
}
</script>


<template>
    <div class="category-filter">
        <label for="filter">filtra</label>
        <select name="" id="filter" v-model="state.selectGenre" @change="$emit('useFilter')">
            <option value="all">All</option>
            <option :value="genre.id" v-for="genre in state.genresList">{{ genre.name }}</option>
        </select>
    </div>
</template>


<style scoped></style>