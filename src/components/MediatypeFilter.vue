<script>
import { state } from "../state.js"

export default {
    name: "MediatypeFilter",
    emits: ["filterTv", "filterMovie", "resetBtn"],
    data() {
        return {
            state: state
        }
    }

}
</script>


<template>
    <div class="media-type-filter">
        <button class="tv-btn" @click="$emit('filterTv')">Serie tv</button>
        <button class="movie-btn" @click="$emit('filterMovie')">Film</button>
        <button class="reset-btn" @click="$emit('resetBtn')">Tutti</button>
    </div>
</template>


<style scoped></style>