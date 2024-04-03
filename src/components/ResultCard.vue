<script>
import { state } from "../state.js"
export default {
    name: "ResultCard",
    props: {
        title: String,
        original_title: String,
        language: String,
        vote: Number,
        imageUrl: String
    },
    data() {
        return {
            state: state,
            stars: 5
        }
    },
    computed: {
        fullStars() {
            return Math.ceil(this.vote / 2)
        },
        emptyStars() {
            return this.stars - this.fullStars
        }
    }
}
</script>

<template>

    <li class="result-card">
        <img v-if="imageUrl !== null" :src="`${state.urlTitleImage}${imageUrl}`" :alt="`image of ${title}`">
        <img v-else src="" alt="no-image-available">
        <div class="title">Titolo: {{ title }}</div>
        <div class="original-title">Titolo originale: {{ original_title }}</div>
        <div class="lang">Lingua:
            <span class="lang-icon" :class="`lang-icon-${language}`"></span>
        </div>
        <div class="vote">Voto: {{ vote }}/10</div>
        <div class="star-rating">
            <i class="fa-solid fa-star" v-for="starsNumber in fullStars"></i>
            <i class="fa-regular fa-star" v-for="emptyStarsNumber in emptyStars"></i>
        </div>

    </li>

</template>



<style scoped></style>