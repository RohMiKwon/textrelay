<template>
    <div id="textrelay">
        <div v-if="isPlaying || isEnd">
            <TextRelayList />
        </div>
        <div v-else-if="isPrepare" class="only_text text">
            경기 시작 전입니다.
        </div>
        <div v-else-if="isCancel" class="only_text text">
            현지 사정으로 취소되었습니다.
        </div>
        <div v-else class="only_text error">
            <img src="/public/mobile/common/img/sports/error.png" alt="일시적인 오류가 발생하였습니다. 다시 시도 해주세요.">
            일시적인 오류가 발생하였습니다.<br>다시 시도 해주세요.
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import TextRelayList from './TextRelayList';

export default {
    name: 'TextRelaySection',
    components: {
        TextRelayList
    },
    computed: {
        ...mapState([
            'isPrepare',
            'isPlaying',
            'isCancel',
            'isEnd',
            'isError'
        ])
    }
};
</script>

<style scoped>
</style>
