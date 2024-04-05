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
    <!-- genre filter -->
    <div class="category-filter d-flex">
        <label for="filter">Filtra per categoria: </label>
        <div class="select-element">
            <select name="filter-select" id="filter" v-model="state.selectGenre" @change="$emit('useFilter')">
                <option value="all">All</option>
                <option :value="genre.id" v-for="genre in state.genresList">{{ genre.name }}</option>
            </select>
        </div>
    </div>
</template>


<style scoped>
.category-filter {
    align-items: center;
    gap: 0.5rem;

    .select-element {
        width: 100%;
        min-width: 150px;
        border: 1px solid var(--bool-lighter);
        border-radius: 5px;
        cursor: pointer;
        background-color: var(--bool-grey);

        select {
            appearance: none;
            background-color: transparent;
            color: var(--bool-lighter);
            border: none;
            padding: 0.5rem;
            width: 100%;
            cursor: inherit;

            option {
                background-color: var(--bool-grey);
                color: var(--bool-lighter);
                font-size: 1.2rem;
            }
        }
    }
}
</style>