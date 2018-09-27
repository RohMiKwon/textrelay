import Vue from 'vue';
import Vuex from 'vuex';
import fetchTextRelay from './api';

Vue.use(Vuex);

const DEFAULT_INNING_TAB_COUNT = 9;

export const store = new Vuex.Store({
    state: {
        gameStatusName: {
            '01': 'isPrepare', // 경기 시작전
            '02': 'isPlaying', // 경기 중
            '03': 'isEnd', // 경기 종료
            '04': 'isCancel', // 경기 취소
            '05': 'isCancel', // 경기 취소
            99: 'isError' // 에러 예외처리
        },
        gameStatus: '', // 경기 상태 코드번호
        isPrepare: false,
        isPlaying: false,
        isCancel: false,
        isEnd: false,
        isError: false,
        defaultInningTabCount: DEFAULT_INNING_TAB_COUNT,
        totalInningCount: DEFAULT_INNING_TAB_COUNT,
        lastInning: '', // 현재 진행중이거나 마지막으로 진행된 이닝
        targetInning: '', // 사용자가 이닝탭에서 선택한 이닝
        cacheGrids: [], // 캐시된 전체 그리드 데이터
        grids: [] // 현재 보여질 그리드 데이터
    },
    mutations: {
        updateGameStatus (state, payload) {
            let statusName = state.gameStatusName[payload.gameStatus];

            state.gameStatus = payload.gameStatus;

            Object.keys(state.gameStatusName).map((key) => {
                if(state.gameStatusName[key] === statusName) {
                    state[statusName] = true;
                }else{
                    state[state.gameStatusName[key]] = false;
                }
                return true;
            });
        },
        updateInning (state, payload) {
            state.lastInning = payload.lastInning;
            state.targetInning = payload.targetInning;

            if(state.lastInning >= DEFAULT_INNING_TAB_COUNT) {
                state.totalInningCount = parseInt(state.lastInning, 10);
            }
        },
        updateGrids (state, payload) {
            state.grids = payload.grids;
        },
        updateCacheGrids (state, payload) {
            state.cacheGrids[payload.index] = payload.grids;
            state.grids = payload.grids;
        }
    },
    actions: {
        fetchTextRelay ({ commit, state }, payload) {
            let isEndInning = false,
                isCachedGrids = false,
                grids = null;

            if(payload) {
                isEndInning = state.isEnd || (parseInt((payload.inning), 10) < parseInt(state.lastInning, 10));
                grids = state.cacheGrids[payload.inning];
                isCachedGrids = grids && grids.length > 0;

                if(isEndInning && isCachedGrids) {
                    commit('updateInning', {
                        lastInning: state.lastInning,
                        targetInning: payload.inning
                    });
                    commit('updateGrids', {
                        grids: grids
                    });
                    return true;
                }
            }
            return fetchTextRelay(payload).then((response) => {
                let data = response.data;

                if(data.result === 'OK') {
                    commit('updateGameStatus', {
                        gameStatus: data.game_status
                    });
                    commit('updateInning', {
                        lastInning: data.last_inning,
                        targetInning: data.target_inning
                    });
                    if(isEndInning) {
                        commit('updateCacheGrids', {
                            index: data.target_inning,
                            grids: data.grids
                        });
                    }else{
                        commit('updateGrids', {
                            grids: data.grids
                        });
                    }
                }
            }).catch((error) => {
                commit('updateGameStatus', {
                    gameStatus: 99
                });
            });
        },
        fetchInning ({ commit, state }) {
            return fetchTextRelay().then((response) => {
                let data = response.data;

                if(data.result === 'OK') {
                    commit('updateGameStatus', {
                        gameStatus: data.game_status
                    });
                    commit('updateInning', {
                        lastInning: data.last_inning,
                        targetInning: state.targetInning
                    });
                }
            }).catch((error) => {
                commit('updateGameStatus', {
                    gameStatus: 99
                });
            });
        }
    }
});

export default store;
