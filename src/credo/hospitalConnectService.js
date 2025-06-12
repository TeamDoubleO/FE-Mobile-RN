import { Buffer } from 'buffer';

global.Buffer = Buffer;

import { PeerDidNumAlgo } from '@credo-ts/core';

import '@hyperledger/aries-askar-react-native';
import 'react-native-get-random-values';
import 'react-native-quick-crypto'; // crypto 폴리필

const HOSPITAL_INVITATION_URL =
  'http://192.168.0.115:8020?oob=eyJAdHlwZSI6ICJodHRwczovL2RpZGNvbW0ub3JnL291dC1vZi1iYW5kLzEuMS9pbnZpdGF0aW9uIiwgIkBpZCI6ICIxZTE4YjUzMi1lM2QxLTQxMDEtODU3ZC05NzljY2ViZjM3NjMiLCAibGFiZWwiOiAiXHVhYzE1XHViZDgxXHVjMGJjXHVjMTMxXHViY2QxXHVjNmQwIiwgImhhbmRzaGFrZV9wcm90b2NvbHMiOiBbImh0dHBzOi8vZGlkY29tbS5vcmcvZGlkZXhjaGFuZ2UvMS4wIl0sICJhY2NlcHQiOiBbImRpZGNvbW0vYWlwMjtlbnY9cmZjMTkiXSwgInNlcnZpY2VzIjogWyJkaWQ6cGVlcjoyLlZ6Nk1rZzNzVFY0VVZjUXV6Y1ZWMlZwMlBTTVZWSFl6VzNBZWZLU0xIVXNVVEFuTVkuRXo2TFNjdVo2eUJGNDFyNWJtU2s0cDVuN2NBQ1RwSEdYVXFxMVRlMkRLS21EcmI1Vy5TZXlKcFpDSTZJaU5rYVdSamIyMXRMVEFpTENKMElqb2laR2xrTFdOdmJXMTFibWxqWVhScGIyNGlMQ0p3Y21sdmNtbDBlU0k2TUN3aWNtVmphWEJwWlc1MFMyVjVjeUk2V3lJamEyVjVMVEVpWFN3aWNpSTZXMTBzSW5NaU9pSm9kSFJ3T2k4dk1Ua3lMakUyT0M0d0xqRXhOVG80TURJd0luMCJdfQ';

export async function connectHospital(agent) {
  if (!agent) {
    return;
  }
  try {
    // Peer DID 생성
    const result = await agent.dids.create({
      method: 'peer',
      options: {
        numAlgo: PeerDidNumAlgo.InceptionKeyWithoutDoc,
      },
    });

    // OOB 초대 URL로 연결 생성
    const record = await agent.oob.receiveInvitationFromUrl(HOSPITAL_INVITATION_URL, {
      ourDid: result.didState.did,
      autoAcceptConnection: true,
      autoAcceptInvitation: true,
    });

    console.log('병원 연결/출입증 연결 완료:', record);
    return record;
  } catch (error) {
    console.error('❌ Hospital 연결 또는 VC 요청 실패: ', error);
    throw error;
  }
}
