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
    <!-- mediatype filter: tv series/movies -->
    <div class="media-type-filter d-flex">
        <button class="btn tv-btn" @click="$emit('filterTv')">Serie tv</button>
        <button class="btn movie-btn" @click="$emit('filterMovie')">Film</button>
        <button class="btn reset-btn" @click="$emit('resetBtn')">Tutti</button>
    </div>
</template>


<style scoped>
.media-type-filter {
    gap: 1rem;

    .btn {
        padding: 0.5rem;
        border-radius: 5px;
        border: 1px solid var(--bool-lighter);
        background-color: var(--bool-grey);
        color: var(--bool-lighter);
        cursor: pointer;

        &:hover {
            background-color: var(--bool-dark);
        }
    }
}
</style>