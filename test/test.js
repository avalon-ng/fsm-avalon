const makeFSMReducer = require('fsm-reducer');
const { expect } = require('chai');
const { STATE_MAP , ACTIONS } = require('../fsm-avalon');
const { 
  NEEDED_KNIGHTS_LIST, 
  NEEDED_FAILED_LIST,
  STATUS_BEFORE_INIT,
	STATUS_INIT,
	STATUS_TEAM_BUILD,
	STATUS_TEAM_VOTING,
	STATUS_TEAM_VOTED,
	STATUS_MISSION,
	STATUS_MISSION_FINISHED,
	STATUS_GAMEOVER_SUCCESS,
  STATUS_GAMEOVER_FAIL,
	STATUS_ASSASSIN,
  ROLE_MERLIN
} = require('../config');

//const validate = require('../validate');

const { 
  initGame,
  startRound,
  buildTeam,
  vote,
  drawVotesResult,
  executeMission,
  drawMissionsResult,
  assassin
} = require('../actions');

const TEST_VALUE_DEFAULT_VOTES_7 = [0,0,0,0,0,0,0];
const TEST_VALUE_USER_7 = 
  [{
    align : 1,
    role : ROLE_MERLIN
  },{
    align : 1,
    role : 'Normal'
  },{
    align : 1,
    role : 'Normal'
  },{
    align : 1,
    role : 'Normal'
  },{
    align : -1,
    role : 'Normal'
  },{
    align : -1,
    role : 'Normal'
  },{
    align : -1,
    role : 'Normal'
  }];

const ACTION_INIT_GAME = 'ACTION_INIT_GAME';
const ACTION_START_ROUND = 'ACTION_START_ROUND';
const ACTION_BUILD_TEAM_7_1 = 'ACTION_BUILD_TEAM_7_1';
const ACTION_BUILD_TEAM_7_2 = 'ACTION_BUILD_TEAM_7_2';
const ACTION_BUILD_TEAM_7_3 = 'ACTION_BUILD_TEAM_7_3';
const ACTION_BUILD_TEAM_7_4 = 'ACTION_BUILD_TEAM_7_4';
const ACTION_BUILD_TEAM_7_5 = 'ACTION_BUILD_TEAM_7_5';
const ACTION_VOTE_1_SUCCESS = 'ACTION_VOTE_1_SUCCESS';
const ACTION_VOTE_2_SUCCESS = 'ACTION_VOTE_2_SUCCESS';
const ACTION_VOTE_3_SUCCESS = 'ACTION_VOTE_3_SUCCESS';
const ACTION_VOTE_4_SUCCESS = 'ACTION_VOTE_4_SUCCESS';
const ACTION_VOTE_5_SUCCESS = 'ACTION_VOTE_5_SUCCESS';
const ACTION_VOTE_6_SUCCESS = 'ACTION_VOTE_6_SUCCESS';
const ACTION_VOTE_7_SUCCESS = 'ACTION_VOTE_7_SUCCESS';
const ACTION_VOTE_1_FAIL = 'ACTION_VOTE_1_FAIL';
const ACTION_VOTE_2_FAIL = 'ACTION_VOTE_2_FAIL';
const ACTION_VOTE_3_FAIL = 'ACTION_VOTE_3_FAIL';
const ACTION_VOTE_4_FAIL = 'ACTION_VOTE_4_FAIL';
const ACTION_VOTE_5_FAIL = 'ACTION_VOTE_5_FAIL';
const ACTION_VOTE_6_FAIL = 'ACTION_VOTE_6_FAIL';
const ACTION_VOTE_7_FAIL = 'ACTION_VOTE_7_FAIL';
const ACTION_DRAW_VOTES_RESULT = 'ACTION_DRAW_VOTES_RESULT';

const ACTION_MISSION_1_SUCCESS = 'ACTION_MISSION_1_SUCCESS';
const ACTION_MISSION_2_SUCCESS = 'ACTION_MISSION_2_SUCCESS';
const ACTION_MISSION_3_SUCCESS = 'ACTION_MISSION_3_SUCCESS';
const ACTION_MISSION_4_SUCCESS = 'ACTION_MISSION_4_SUCCESS';
const ACTION_MISSION_5_SUCCESS = 'ACTION_MISSION_5_SUCCESS';
const ACTION_MISSION_6_SUCCESS = 'ACTION_MISSION_6_SUCCESS';
const ACTION_MISSION_7_SUCCESS = 'ACTION_MISSION_7_SUCCESS';
const ACTION_MISSION_1_FAIL = 'ACTION_MISSION_1_FAIL'; 
const ACTION_MISSION_2_FAIL = 'ACTION_MISSION_2_FAIL'; 
const ACTION_MISSION_3_FAIL = 'ACTION_MISSION_3_FAIL'; 
const ACTION_MISSION_4_FAIL = 'ACTION_MISSION_4_FAIL'; 
const ACTION_MISSION_5_FAIL = 'ACTION_MISSION_5_FAIL'; 
const ACTION_MISSION_6_FAIL = 'ACTION_MISSION_6_FAIL'; 
const ACTION_MISSION_7_FAIL = 'ACTION_MISSION_7_FAIL'; 

const ACTION_DRAW_MISSIONS_RESULT = 'ACTION_DRAW_MISSIONS_RESULT';

const ACTION_ASSASSIN_SUCCESS = 'ACTION_ASSASSIN_SUCCESS';
const ACTION_ASSASSIN_FAIL = 'ACTION_ASSASSIN_FAIL';

const ACTION_MAP = {
  [ACTION_INIT_GAME] : initGame({ users : TEST_VALUE_USER_7 }),
  [ACTION_START_ROUND] : startRound(),
  [ACTION_BUILD_TEAM_7_1] : buildTeam({ knights : [0,1] }),
  [ACTION_BUILD_TEAM_7_2] : buildTeam({ knights : [0,1,2] }),
  [ACTION_BUILD_TEAM_7_3] : buildTeam({ knights : [0,1,2] }),
  [ACTION_BUILD_TEAM_7_4] : buildTeam({ knights : [0,1,2,3] }),
  [ACTION_BUILD_TEAM_7_5] : buildTeam({ knights : [0,1,2,3] }),
  [ACTION_VOTE_1_SUCCESS] : vote({ index : 0 , vote : 1 }),
  [ACTION_VOTE_1_FAIL] : vote({ index : 0 , vote : -1 }),
  [ACTION_VOTE_2_SUCCESS] : vote({ index : 1 , vote : 1 }),
  [ACTION_VOTE_2_FAIL] : vote({ index : 1 , vote : -1 }),
  [ACTION_VOTE_3_SUCCESS] : vote({ index : 2 , vote : 1 }),
  [ACTION_VOTE_3_FAIL] : vote({ index : 2 , vote : -1 }),
  [ACTION_VOTE_4_SUCCESS] : vote({ index : 3 , vote : 1 }),
  [ACTION_VOTE_4_FAIL] : vote({ index : 3 , vote : -1 }),
  [ACTION_VOTE_5_SUCCESS] : vote({ index : 4 , vote : 1 }),
  [ACTION_VOTE_5_FAIL] : vote({ index : 4 , vote : -1 }),
  [ACTION_VOTE_6_SUCCESS] : vote({ index : 5 , vote : 1 }),
  [ACTION_VOTE_6_FAIL] : vote({ index : 5 , vote : -1 }),
  [ACTION_VOTE_7_SUCCESS] : vote({ index : 6 , vote : 1 }),
  [ACTION_VOTE_7_FAIL] : vote({ index : 6 , vote : -1 }),
  [ACTION_DRAW_VOTES_RESULT] : drawVotesResult(),
  [ACTION_MISSION_1_SUCCESS] : executeMission({ index : 0 , mission : 1 }),
  [ACTION_MISSION_2_SUCCESS] : executeMission({ index : 1 , mission : 1 }),
  [ACTION_MISSION_3_SUCCESS] : executeMission({ index : 2 , mission : 1 }),
  [ACTION_MISSION_4_SUCCESS] : executeMission({ index : 3 , mission : 1 }),
  [ACTION_MISSION_5_SUCCESS] : executeMission({ index : 4 , mission : 1 }),
  [ACTION_MISSION_6_SUCCESS] : executeMission({ index : 5 , mission : 1 }),
  [ACTION_MISSION_7_SUCCESS] : executeMission({ index : 6 , mission : 1 }),
  [ACTION_MISSION_1_FAIL] : executeMission({ index : 0 , mission : -1 }),
  [ACTION_MISSION_2_FAIL] : executeMission({ index : 1 , mission : -1 }),
  [ACTION_MISSION_3_FAIL] : executeMission({ index : 2 , mission : -1 }),
  [ACTION_MISSION_4_FAIL] : executeMission({ index : 3 , mission : -1 }),
  [ACTION_MISSION_5_FAIL] : executeMission({ index : 4 , mission : -1 }),
  [ACTION_MISSION_6_FAIL] : executeMission({ index : 5 , mission : -1 }),
  [ACTION_MISSION_7_FAIL] : executeMission({ index : 6 , mission : -1 }),
  [ACTION_DRAW_MISSIONS_RESULT] : drawMissionsResult(),
  [ACTION_ASSASSIN_SUCCESS] : assassin(0),
  [ACTION_ASSASSIN_FAIL] : assassin(1)
}

const TEST_STEPS_BEFORE_INIT = [];
const TEST_STEPS_INIT = [ACTION_INIT_GAME];
const TEST_STEPS_FIRST_BUILD_TEAM = [ACTION_INIT_GAME,ACTION_START_ROUND,ACTION_BUILD_TEAM_7_1];

const TEST_STEPS_VOTES_ALL_SUCCESS = [
  ACTION_VOTE_1_FAIL,
  ACTION_VOTE_2_FAIL,
  ACTION_VOTE_3_FAIL,
  ACTION_VOTE_4_SUCCESS,
  ACTION_VOTE_5_SUCCESS,
  ACTION_VOTE_6_SUCCESS,
  ACTION_VOTE_7_SUCCESS
];

const TEST_STEPS_VOTES_ALL_FAIL = [
  ACTION_VOTE_1_FAIL,
  ACTION_VOTE_2_FAIL,
  ACTION_VOTE_3_FAIL,
  ACTION_VOTE_4_FAIL,
  ACTION_VOTE_5_SUCCESS,
  ACTION_VOTE_6_SUCCESS,
  ACTION_VOTE_7_SUCCESS
];

const TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT = TEST_STEPS_VOTES_ALL_SUCCESS.concat(ACTION_DRAW_VOTES_RESULT);
const TEST_STEPS_VOTES_ALL_FAIL_DRAWRESULT = TEST_STEPS_VOTES_ALL_FAIL.concat(ACTION_DRAW_VOTES_RESULT);
const TEST_STEPS_ONE_VOTE_ROUND = [ACTION_START_ROUND,ACTION_BUILD_TEAM_7_1];
const TEST_STEPS_ONE_VOTE_ROUND_ALL_VOTES_FAIL_DRAWRESULT = 
  TEST_STEPS_ONE_VOTE_ROUND
  .concat(TEST_STEPS_VOTES_ALL_FAIL)
  .concat(ACTION_DRAW_VOTES_RESULT);

const TEST_STEPS_VOTE_5_FAIL = 
  TEST_STEPS_INIT
  .concat(TEST_STEPS_ONE_VOTE_ROUND_ALL_VOTES_FAIL_DRAWRESULT)
  .concat(TEST_STEPS_ONE_VOTE_ROUND_ALL_VOTES_FAIL_DRAWRESULT)
  .concat(TEST_STEPS_ONE_VOTE_ROUND_ALL_VOTES_FAIL_DRAWRESULT)
  .concat(TEST_STEPS_ONE_VOTE_ROUND_ALL_VOTES_FAIL_DRAWRESULT)
  .concat(TEST_STEPS_ONE_VOTE_ROUND_ALL_VOTES_FAIL_DRAWRESULT)
  .concat(ACTION_START_ROUND);

const TEST_STEPS_MISSIONS_SUCCESS_1 = [
  ACTION_MISSION_1_SUCCESS,
  ACTION_MISSION_2_SUCCESS
]

const TEST_STEPS_MISSIONS_FAIL_1 = [
  ACTION_MISSION_1_SUCCESS,
  ACTION_MISSION_2_FAIL
]

const TEST_STEPS_MISSIONS_SUCCESS_1_DRAWRESULT = 
  TEST_STEPS_MISSIONS_SUCCESS_1.concat(ACTION_DRAW_MISSIONS_RESULT);

const TEST_STEPS_MISSIONS_FAIL_1_DRAWRESULT = 
  TEST_STEPS_MISSIONS_FAIL_1.concat(ACTION_DRAW_MISSIONS_RESULT);

const TEST_STEPS_MISSIONS_SUCCESS_2_DRAWRESULT = [
  ACTION_MISSION_1_SUCCESS,
  ACTION_MISSION_2_SUCCESS,
  ACTION_MISSION_3_SUCCESS,
  ACTION_DRAW_MISSIONS_RESULT
]
const TEST_STEPS_MISSIONS_FAIL_2_DRAWRESULT = [
  ACTION_MISSION_1_SUCCESS,
  ACTION_MISSION_2_FAIL,
  ACTION_MISSION_3_FAIL,
  ACTION_DRAW_MISSIONS_RESULT
]
const TEST_STEPS_MISSIONS_SUCCESS_3_DRAWRESULT = [
  ACTION_MISSION_1_SUCCESS,
  ACTION_MISSION_2_SUCCESS,
  ACTION_MISSION_3_SUCCESS,
  ACTION_DRAW_MISSIONS_RESULT
]
const TEST_STEPS_MISSIONS_FAIL_3_DRAWRESULT = [
  ACTION_MISSION_1_SUCCESS,
  ACTION_MISSION_2_FAIL,
  ACTION_MISSION_3_SUCCESS,
  ACTION_DRAW_MISSIONS_RESULT
]
const TEST_STEPS_MISSIONS_SUCCESS_4_DRAWRESULT = [
  ACTION_MISSION_1_SUCCESS,
  ACTION_MISSION_2_SUCCESS,
  ACTION_MISSION_3_SUCCESS,
  ACTION_MISSION_4_FAIL,
  ACTION_DRAW_MISSIONS_RESULT
]
const TEST_STEPS_MISSIONS_FAIL_4_DRAWRESULT = [
  ACTION_MISSION_1_SUCCESS,
  ACTION_MISSION_2_SUCCESS,
  ACTION_MISSION_3_FAIL,
  ACTION_MISSION_4_FAIL,
  ACTION_DRAW_MISSIONS_RESULT
]
const TEST_STEPS_MISSIONS_SUCCESS_5_DRAWRESULT = [
  ACTION_MISSION_1_SUCCESS,
  ACTION_MISSION_2_SUCCESS,
  ACTION_MISSION_3_SUCCESS,
  ACTION_MISSION_4_SUCCESS,
  ACTION_DRAW_MISSIONS_RESULT
]
const TEST_STEPS_MISSIONS_FAIL_5_DRAWRESULT = [
  ACTION_MISSION_1_SUCCESS,
  ACTION_MISSION_2_SUCCESS,
  ACTION_MISSION_3_FAIL,
  ACTION_MISSION_4_SUCCESS,
  ACTION_DRAW_MISSIONS_RESULT
]

const TEST_STEPS_ASSASSIN = 
  TEST_STEPS_FIRST_BUILD_TEAM
  .concat(TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT)
  .concat(TEST_STEPS_MISSIONS_SUCCESS_1_DRAWRESULT)
  .concat([
    ACTION_START_ROUND,
    ACTION_BUILD_TEAM_7_2  
  ])
  .concat(TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT)
  .concat(TEST_STEPS_MISSIONS_SUCCESS_2_DRAWRESULT)
  .concat([
    ACTION_START_ROUND,
    ACTION_BUILD_TEAM_7_3  
  ])
  .concat(TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT)
  .concat(TEST_STEPS_MISSIONS_SUCCESS_3_DRAWRESULT)
  .concat(ACTION_START_ROUND);

const reducer = makeFSMReducer(STATE_MAP,ACTIONS);

const testHelper = (state, testSteps) => {
  let _state, _testSteps;

  if ( state !== undefined && testSteps === undefined ) {
    _testSteps = typeof state === 'string' ? [state] : state.slice(0);
    _state = reducer(undefined,{});
  } else {
    _testSteps = typeof testSteps === 'string' ? [testSteps] : testSteps.slice(0);
    _state = Object.assign({},state);
  }

  _testSteps.forEach((el) => {
    _state = reducer(_state,ACTION_MAP[el]);
  })

  return _state;
}

describe('basic 7 people game',()=>{

  describe('before init',() => {
    const state = testHelper(TEST_STEPS_BEFORE_INIT);
    it('should return correct state',()=>{
      expect(state.status).equal(STATUS_BEFORE_INIT);
    })
  })

  describe('init game',() => {
    const state = testHelper(TEST_STEPS_INIT);
    const { status, value } = state; 
    it('should return correct state',() => {
      expect(status).equal(STATUS_INIT);
      expect(value.users).deep.equal(TEST_VALUE_USER_7);
      expect(value.config.isSetGoddess).equal(false);
      expect(value.goddessResults).deep.equal([6]);
      expect(value.neededKnights).deep.equal(NEEDED_KNIGHTS_LIST[7]);
      expect(value.neededFails).deep.equal(NEEDED_FAILED_LIST[7]);
      expect(value.failedVotes).equal(0);
      expect(value.captain).equal(-1);
    })
  })

  describe('start round',() => {
    describe('not end game',() => {
      const state = testHelper(TEST_STEPS_INIT.concat(ACTION_START_ROUND));
      const { status, value } = state; 
      it('should return correct state',() => {
        expect(status).equal(STATUS_TEAM_BUILD);
        expect(value.votes).deep.equal(TEST_VALUE_DEFAULT_VOTES_7);
        expect(value.captain).equal(0);
      });
    })

    describe('end game',() => {
      const state = testHelper(TEST_STEPS_FIRST_BUILD_TEAM.concat(TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT));

      describe('all fail votes 5 times',() => {
        const state = testHelper(TEST_STEPS_VOTE_5_FAIL);
        const { status, value } = state; 
        it('should return correct state',() => {
          expect(status).equal(STATUS_GAMEOVER_FAIL);
          expect(value.failedVotes).equal(5);
          expect(value.votesResult).equal(false);
          expect(value.captain).equal(5);
        });
      })

      describe('reach 3 missions fail',() => {
        let _state = testHelper(state,
          TEST_STEPS_MISSIONS_FAIL_1_DRAWRESULT
          .concat([
            ACTION_START_ROUND,
            ACTION_BUILD_TEAM_7_2  
          ])
          .concat(TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT)
          .concat(TEST_STEPS_MISSIONS_FAIL_2_DRAWRESULT)
          .concat([
            ACTION_START_ROUND,
            ACTION_BUILD_TEAM_7_3  
          ])
          .concat(TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT)
          .concat(TEST_STEPS_MISSIONS_SUCCESS_3_DRAWRESULT)
          .concat([
            ACTION_START_ROUND,
            ACTION_BUILD_TEAM_7_4  
          ])
          .concat(TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT)
          .concat(TEST_STEPS_MISSIONS_SUCCESS_4_DRAWRESULT)
          .concat([
            ACTION_START_ROUND,
            ACTION_BUILD_TEAM_7_5  
          ])
          .concat(TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT)
          .concat(TEST_STEPS_MISSIONS_FAIL_5_DRAWRESULT)
          .concat(ACTION_START_ROUND));
        it('should return correct state',() => {
          const { status, value } = _state;
          expect(status).equal(STATUS_GAMEOVER_FAIL);
        })
      })
      describe('reach 3 missions success',() => {
        let _state = testHelper(state,
          TEST_STEPS_MISSIONS_FAIL_1_DRAWRESULT
          .concat([
            ACTION_START_ROUND,
            ACTION_BUILD_TEAM_7_2  
          ])
          .concat(TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT)
          .concat(TEST_STEPS_MISSIONS_FAIL_2_DRAWRESULT)
          .concat([
            ACTION_START_ROUND,
            ACTION_BUILD_TEAM_7_3  
          ])
          .concat(TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT)
          .concat(TEST_STEPS_MISSIONS_SUCCESS_3_DRAWRESULT)
          .concat([
            ACTION_START_ROUND,
            ACTION_BUILD_TEAM_7_4  
          ])
          .concat(TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT)
          .concat(TEST_STEPS_MISSIONS_SUCCESS_4_DRAWRESULT)
          .concat([
            ACTION_START_ROUND,
            ACTION_BUILD_TEAM_7_5  
          ])
          .concat(TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT)
          .concat(TEST_STEPS_MISSIONS_SUCCESS_5_DRAWRESULT)
          .concat(ACTION_START_ROUND));
        it('should return correct state',() => {
          const { status, value } = _state;
          expect(status).equal(STATUS_ASSASSIN);
        })
      });
    })
  })

  describe('choose knights',() => {
    const state = testHelper(TEST_STEPS_FIRST_BUILD_TEAM);
    const { status, value } = state; 
    it('should return correct state',() => {
      expect(status).equal(STATUS_TEAM_VOTING);
      expect(value.votes).deep.equal(TEST_VALUE_DEFAULT_VOTES_7);
      expect(value.captain).equal(0);
    })
  })

  describe('vote', () => {
    const state = testHelper(TEST_STEPS_FIRST_BUILD_TEAM);
    const { status, value } = state; 
    describe('one user vote', () => {    
      const _state = testHelper(state,ACTION_VOTE_1_SUCCESS);  
      const { status, value } = _state; 
      it('should return correct state', () => {
        expect(status).equal(STATUS_TEAM_VOTING);
        expect(value.votes[0]).equal(1);
        expect(value.votes[1]).equal(0);
        expect(value.votes[2]).equal(0);
      })
    });
    describe('all user vote',() => {
      const _state = testHelper(state,TEST_STEPS_VOTES_ALL_SUCCESS);
      const { status, value } = _state; 
      it('should return correct state',()=>{
        expect(status).equal(STATUS_TEAM_VOTED);
      })
    });
  })

  describe('draw vote result',() => {
    const state = testHelper(TEST_STEPS_FIRST_BUILD_TEAM);
    describe('vote failed',() => {
      const _state = testHelper(state,TEST_STEPS_VOTES_ALL_FAIL.concat(ACTION_DRAW_VOTES_RESULT));
      const { status, value } = _state; 
      it('should return correct state',() => {
        expect(status).equal(STATUS_INIT);
        expect(value.failedVotes).equal(1);
        expect(value.votesResult).equal(false);
      });
    })
    describe('vote succeed',() => {
      const _state = testHelper(state,TEST_STEPS_VOTES_ALL_SUCCESS.concat(ACTION_DRAW_VOTES_RESULT));
      const { status, value } = _state; 
      it('should return correct state',() => {
        expect(status).equal(STATUS_MISSION);
        expect(value.failedVotes).equal(0);
        expect(value.votesResult).equal(true);
        expect(value.missions).deep.equal([0,0,undefined,undefined,undefined,undefined,undefined]);
      });
    })
  })

  
  describe('excute mission',() => {
    const state = testHelper(TEST_STEPS_FIRST_BUILD_TEAM.concat(TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT));
    describe('do one mission',() => {      
      it('should return correct state',() => {
        const _state = testHelper(state,ACTION_MISSION_2_SUCCESS);
        const { status, value } = _state;
        expect(status).equal(STATUS_MISSION);
        expect(value.missions[0]).equal(0);
        expect(value.missions[1]).equal(1);
        expect(value.missions[2]).equal(undefined);
      })
    })
    describe('do all missions',() => {
      it('should return correct state',() => {
        const _state = testHelper(state,[
          ACTION_MISSION_1_SUCCESS,
          ACTION_MISSION_2_SUCCESS
        ]);
        const { status, value } = _state; 
        expect(status).equal(STATUS_MISSION_FINISHED);
      })
    })
  })

  describe('draw missions result',() => {
    const state = testHelper(TEST_STEPS_FIRST_BUILD_TEAM.concat(TEST_STEPS_VOTES_ALL_SUCCESS_DRAWRESULT));
    describe('mission success',() => {
      const _state = testHelper(state,[
        ACTION_MISSION_1_SUCCESS,
        ACTION_MISSION_2_SUCCESS,
        ACTION_DRAW_MISSIONS_RESULT
      ]);
      it('should return correct state',() => {
        const { status, value } = _state;
        expect(status).equal(STATUS_INIT);
        expect(value.missionResults).deep.equal([{ result : true , failAmount : 0 , successAmount : 2 }]);
      })
    })
    describe('mission fail',() => {
      const _state = testHelper(state,[
        ACTION_MISSION_1_SUCCESS,
        ACTION_MISSION_2_FAIL,
        ACTION_DRAW_MISSIONS_RESULT
      ]);
      it('should return correct state',() => {
        const { status, value } = _state;
        expect(status).equal(STATUS_INIT);
        expect(value.missionResults).deep.equal([{ result : false , failAmount : 1 , successAmount : 1 }]);
      })
    })
  })

  describe('assassin', () => {
    const state = testHelper(TEST_STEPS_ASSASSIN);
    describe('assassin correct', () => {
      const _state = testHelper(state,ACTION_ASSASSIN_SUCCESS);
      it('should return correct state',() => {
        const { status, value } = _state;
        expect(status).equal(STATUS_GAMEOVER_FAIL);
      })
    })
    describe('assassin fail', () => {
      const _state = testHelper(state,ACTION_ASSASSIN_FAIL);
      it('should return correct state',() => {
        const { status, value } = _state;
        expect(status).equal(STATUS_GAMEOVER_SUCCESS);
      })
    })
  })

})
