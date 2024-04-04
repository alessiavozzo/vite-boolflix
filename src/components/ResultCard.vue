<script>
import { state } from "../state.js"

export default {
    name: "ResultCard",
    props: {
        title: String,
        original_title: String,
        language: String,
        vote: Number,
        imageUrl: String,
        overview: String,
        id: Number
    },
    data() {
        return {
            state: state,
            stars: 5,
            onHover: false,
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
        <!-- image -->
        <div class="image" v-if="onHover === false" @mouseover="onHover = true">
            <img v-if="imageUrl !== null" :src="`${state.urlTitleImage}${imageUrl}`" :alt="`image of ${title}`">
            <img v-else src="" alt="no-image-available">
        </div>

        <!-- info -->
        <div class="info" @mouseleave="onHover = false" v-else>
            <!-- titles -->
            <div class="title"><strong>Titolo:</strong> {{ title }}</div>
            <div class="original-title" v-if="title != original_title"><strong>Titolo originale:</strong> {{
            original_title }}</div>

            <!-- language -->
            <div class="lang"><strong>Lingua: </strong>
                <span class="lang-icon" :class="`lang-icon-${language}`"></span>
            </div>

            <!-- <div class="vote">Voto: {{ vote }}/10</div> -->
            <!-- rating -->
            <div class="star-rating">
                <strong>Voto:</strong>
                <i class="fa-solid fa-star full" v-for="starsNumber in fullStars"></i>
                <i class="fa-regular fa-star empty" v-for="emptyStarsNumber in emptyStars"></i>
            </div>

            <!-- genres -->
            <div class="genres">
                <strong>Genere: </strong>
                <span class="genre" v-for="genre in state.genres[id]">
                    {{ genre.name }}
                </span>
            </div>

            <!-- actors -->
            <div class="actors">
                <strong>Cast: </strong>
                <span class="actor" v-for="(actor, index) in state.actors[id].slice(0, 5)">
                    {{ actor.name }}
                    <span v-if="index < state.actors[id].slice(0, 5).length - 1">, </span>
                </span>
            </div>

            <!-- overview -->
            <div class="overview" v-if="overview !== ''"><strong>Overview:</strong> {{ overview }}</div>

        </div>

    </li>

</template>



<style scoped>
.result-card {
    border: 1px solid var(--bool-lighter);
    color: var(--bool-lighter);
    width: 250px;
    height: 375px;
    margin-bottom: 1rem;

    &:hover {
        box-shadow: 0 0 4px 1px var(--bool-lighter);
        cursor: pointer;
    }

    .image,
    .info {
        width: 100%;
        height: 100%;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .info {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        overflow-y: auto;

        i.full {
            color: var(--bool-warning);
        }
    }
}
</style>