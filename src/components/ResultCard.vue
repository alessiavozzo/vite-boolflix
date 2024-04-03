<script>
import { state } from "../state.js"
export default {
    name: "ResultCard",
    props: {
        title: String,
        original_title: String,
        language: String,
        vote: Number
    },
    data() {
        return {
            state: state
        }
    },
}
</script>

<template>

    <li class="movie">
        <div class="title">Titolo: {{ title }}</div>
        <div class="original-title">Titolo originale: {{ original_title }}</div>
        <div class="lang">Lingua:
            <span class="lang-icon" :class="`lang-icon-${language}`"></span>
        </div>
        <div class="vote">Voto: {{ vote }}</div>

    </li>

</template>



<style scoped></style>