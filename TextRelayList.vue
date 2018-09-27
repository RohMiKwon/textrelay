<template>
    <div class="text_broadcast">
        <div v-for="(grid, index) in grids" :key="index">
            <div class="match_state" v-if="isTeamAttack(grid.info_type)">{{ grid.text }}</div>
            <div class="player_change" v-if="isPlayerReplacement(grid.info_type)">
                <p>{{ grid.text }}</p>
            </div>
            <div class="player_state" v-if="isBatterInfo(grid.info_type)">
                <div class="state_wrap clearfix">
                    <div class="player_thumb">
                        <img :src=grid.img_url :alt=grid.text>
                    </div>
                    <div class="player_info">
                        <p class="name">{{ grid.text }}</p>
                        <p class="result" :class="getHighlightClass(result)" v-for="(result, index) in grid.result" :key="index">{{ result.text }}</p>
                        <ul class="ball_count clearfix">
                            <li v-for="(relay, index) in grid.relay" :key="index">{{ relay.text }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'TextRelayList',
    computed: {
        ...mapState([
            'grids'
        ])
    },
    methods: {
        isTeamAttack (infoType) {
            return infoType === '01';
        },
        isPlayerReplacement (infoType) {
            return infoType === '02';
        },
        isBatterInfo (infoType) {
            return infoType === '03';
        },
        getHighlightClass (result) {
            return {
                highlight: result.result_type === '02' || ''
            };
        }
    }
};
</script>

<style scoped>
</style>
