<template>
    <div class="inning_slide swiper-container">
        <div v-if="isPlaying || isEnd" class="swiper-wrapper">
            <div class="swiper-slide" :class="getGameStatusClass(index)" v-for="index in totalInningCount" :key="index" :data-index="index">{{index}}회</div>
        </div>
        <div v-else class="swiper-wrapper">
            <div class="swiper-slide notStart" v-for="index in defaultInningTabCount" :key="index">{{index}}회</div>
        </div>
        <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import OksusuUtils from '../../../../../common/js/OksusuUtils';

let wasData = OksusuUtils.getWasData();

export default {
    name: 'InningTab',
    data () {
        return {
            swiperConfig: {
                selector: '.inning_slide',
                options: {
                    slidesPerView: 6.5,
                    spaceBetween: 0,
                    freeMode: true,
                    grabCursor: true
                }
            },
            selector: {
                prepareClass: 'notStart',
                activeClass: 'active'
            },
            autoUpdateTerm: 10000
        };
    },
    computed: {
        ...mapState([
            'isPrepare',
            'isPlaying',
            'isEnd',
            'isCancel',
            'isError',
            'defaultInningTabCount',
            'totalInningCount',
            'lastInning',
            'targetInning'
        ])
    },
    methods: {
        ...mapMutations([
            'updateInning',
            'updateGameStatus'
        ]),
        ...mapActions([
            'fetchTextRelay',
            'fetchInning'
        ]),
        getGameStatusClass (index) {
            return {
                notStart: index > parseInt(this.lastInning, 10),
                active: index === parseInt(this.targetInning, 10)
            };
        },
        updateTargetInning (targetInning) {
            this.fetchTextRelay({
                inning: targetInning
            });

            if(this.isEnd || this.isCancel) {
                this.cancelAllAutoUpdate();
                return;
            }

            if(targetInning === this.lastInning) {
                this.bindAutoUpdate();
            }else{
                this.bindAutoInningUpdate();
            }
        },
        bindAutoUpdate () {
            this.cancelAutoInningUpdate();

            if(!this.timer) {
                this.timer = setInterval(() => {
                    if(this.isEnd || this.isCancel) {
                        this.cancelAutoUpdate();
                    }else{
                        this.fetchTextRelay();
                    }
                }, this.autoUpdateTerm);
            }
        },
        bindAutoInningUpdate () {
            this.cancelAutoUpdate();

            if(!this.inningTimer) {
                this.inningTimer = setInterval(() => {
                    if(this.isEnd || this.isCancel) {
                        this.cancelAutoInningUpdate();
                    }else{
                        this.fetchInning();
                    }
                }, this.autoUpdateTerm);
            }
        },
        cancelAllAutoUpdate () {
            this.cancelAutoUpdate();
            this.cancelAutoInningUpdate();
        },
        cancelAutoUpdate () {
            if(this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        cancelAutoInningUpdate () {
            if(this.inningTimer) {
                clearInterval(this.inningTimer);
                this.inningTimer = null;
            }
        },
        changeSlidePosition () {
            let slidesPerView = Math.floor(this.swiperConfig.options.slidesPerView),
                targetInning = parseInt(this.targetInning, 10);

            if(this.isPrepare || this.isCancel || this.isError) {
                this.swiper.slideTo(0);
                return;
            }
            if(targetInning > slidesPerView) {
                this.swiper.slideTo(targetInning - slidesPerView);
            }else{
                this.swiper.slideTo(0);
            }
        }
    },
    created () {
        this.fetchTextRelay();
        this.bindAutoUpdate();
    },
    mounted () {
        let self = this,
            swiperConfig = this.swiperConfig,
            selector = this.selector;

        this.swiper = new window.Swiper(swiperConfig.selector, swiperConfig.options).on('tap', (e) => {
            let target = e.target,
                targetIndex = target.dataset.index,
                beforeActiveTarget = target.parentNode.getElementsByClassName(selector.activeClass)[0];

            if(!target.classList.contains(selector.prepareClass)) {
                if(beforeActiveTarget && (beforeActiveTarget !== target)) {
                    beforeActiveTarget.classList.remove(selector.activeClass);
                }
                target.classList.add(selector.activeClass);
                self.updateTargetInning(targetIndex);
            }
        });
        this.$nextTick(() => {
            this.changeSlidePosition();
        });
    },
    updated () {
        this.$nextTick(() => {
            this.swiper.update();
            this.changeSlidePosition();
        });
    },
    beforeDestroy () {
        this.cancelAllAutoUpdate();
    }
};
</script>

<style scoped>
@import url('../../../../../common/css/swiper.min.css');
</style>
