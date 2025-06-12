import 'react-native-get-random-values';
import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import base64url from 'base64url';
import bs58 from 'bs58';
import axios from 'axios';
import RNFS from 'react-native-fs';

global.Buffer = Buffer;

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Agent,
  OutOfBandModule,
  ConnectionsModule,
  CredentialsModule,
  HttpOutboundTransport,
  WsOutboundTransport,
  AutoAcceptCredential,
  MediationRecipientModule,
  AgentEventTypes,
  MessagePickupModule,
  MediatorPickupStrategy,
  PeerDidNumAlgo,
  V2CredentialProtocol, // 병원이 Issue-Credential v2 사용 시
  JsonLdCredentialFormatService, // 병원이 JSON-LD VC를 보내는 경우   // ← 여기서 AnonCreds 포맷 서비스 임포트
  DidCommMimeType,
  ProofsModule,
  V2ProofProtocol,
  AutoAcceptProof,
  DidsModule,
} from '@credo-ts/core';

import { AskarModule } from '@credo-ts/askar';
import {
  AnonCredsModule,
  AnonCredsCredentialFormatService,
  AnonCredsProofFormatService,
  LegacyIndyProofFormatService,
  LegacyIndyCredentialFormatService,
} from '@credo-ts/anoncreds';
import {
  IndyVdrAnonCredsRegistry,
  IndyVdrIndyDidRegistrar,
  IndyVdrIndyDidResolver,
} from '@credo-ts/indy-vdr';
import { agentDependencies } from '@credo-ts/react-native';
import '@hyperledger/aries-askar-react-native';
import 'react-native-get-random-values';
import 'react-native-quick-crypto'; // crypto 폴리필
// 지갑 정보
const walletId = 'test-wallet-id-1';
const walletKey = 'testkey00000000000000000000000000';

// 병원 ACAPY OOB 초대 URL 예시
const HOSPITAL_INVITATION_URL =
  'http://192.168.0.115:8020?oob=eyJAdHlwZSI6ICJodHRwczovL2RpZGNvbW0ub3JnL291dC1vZi1iYW5kLzEuMS9pbnZpdGF0aW9uIiwgIkBpZCI6ICJmZThjNmRjYi1jMTRhLTQwOTUtYjIwMy04NDA1NWNlZWUwZGMiLCAibGFiZWwiOiAiXHVhYzE1XHViZDgxXHVjMGJjXHVjMTMxXHViY2QxXHVjNmQwIiwgImhhbmRzaGFrZV9wcm90b2NvbHMiOiBbImh0dHBzOi8vZGlkY29tbS5vcmcvZGlkZXhjaGFuZ2UvMS4wIl0sICJhY2NlcHQiOiBbImRpZGNvbW0vYWlwMjtlbnY9cmZjMTkiXSwgInNlcnZpY2VzIjogWyJkaWQ6cGVlcjoyLlZ6Nk1rdWNORFd2aU1LWWlLYUptaXRSNHVVaTV6Q3RVbkNvaTZ2WUt0dzZ3cHEyWTQuRXo2TFNrb2h1ZXIxTHk0eG1HODFBN3FLR3JuazRhcFdpQ1gzWnBNbzZBcXlBWVk5Uy5TZXlKcFpDSTZJaU5rYVdSamIyMXRMVEFpTENKMElqb2laR2xrTFdOdmJXMTFibWxqWVhScGIyNGlMQ0p3Y21sdmNtbDBlU0k2TUN3aWNtVmphWEJwWlc1MFMyVjVjeUk2V3lJamEyVjVMVEVpWFN3aWNpSTZXMTBzSW5NaU9pSm9kSFJ3T2k4dk1Ua3lMakUyT0M0d0xqRXhOVG80TURJd0luMCJdfQ';

// Mediator ACAPY OOB 초대 URL 예시
const MEDIATOR_INVITATION_URL =
  'ws://192.168.0.115:8000?oob=eyJAdHlwZSI6ICJodHRwczovL2RpZGNvbW0ub3JnL291dC1vZi1iYW5kLzEuMS9pbnZpdGF0aW9uIiwgIkBpZCI6ICI2NzVhNDg1Yi1kMDg4LTQwOGMtYjdlZi03YTEzNTJhYjJiMGIiLCAibGFiZWwiOiAibWVkaWF0b3ItYWNhcHkiLCAiaGFuZHNoYWtlX3Byb3RvY29scyI6IFsiaHR0cHM6Ly9kaWRjb21tLm9yZy9kaWRleGNoYW5nZS8xLjAiXSwgImFjY2VwdCI6IFsiZGlkY29tbS9haXAyO2Vudj1yZmMxOSJdLCAic2VydmljZXMiOiBbImRpZDpwZWVyOjIuVno2TWtlWENld3Z5cG51dTYyeWNHWTFCYkxCQnBQWkJrbzVDY3NCU1FiaGdianREYi5FejZMU3JNcmdtSFNubkN4cVZDQlVjRERXRDJ0ZkdTdjk3R3RCa05oa0xlS0t2Z1pvLlNleUpwWkNJNklpTmthV1JqYjIxdExUQWlMQ0owSWpvaVpHbGtMV052YlcxMWJtbGpZWFJwYjI0aUxDSndjbWx2Y21sMGVTSTZNQ3dpY21WamFYQnBaVzUwUzJWNWN5STZXeUlqYTJWNUxURWlYU3dpY2lJNlcxMHNJbk1pT2lKM2N6b3ZMekU1TWk0eE5qZ3VNQzR4TVRVNk9EQXdNQ0o5Il19';

//=============================================================================================================================================================================
export default function CredoTestPage() {
  // ---- 상태 변수들 ----
  const [agent, setAgent] = useState(null);
  const [peerDid, setPeerDid] = useState(null);
  const [connStatus, setConnStatus] = useState(''); // 현재 진행 상태
  const [vcContent, setVcContent] = useState(null); // 수신된 VC JSON

  // ---- Agent 한 번만 초기화해 둠 ----
  useEffect(() => {
    (async () => {
      try {
        const _agent = new Agent({
          config: {
            label: 'KeyWeCredo',
            walletConfig: { id: walletId, key: walletKey },
            autoUpdateStorageOnStartup: true,
            didCommMimeType: DidCommMimeType.V1,
            // mediatorPollingInterval: 5000,
          },
          dependencies: agentDependencies,
          modules: {
            askar: new AskarModule({}),
            connections: new ConnectionsModule({
              autoAcceptConnection: true,
            }),
            outOfBand: new OutOfBandModule(),
            anoncreds: new AnonCredsModule({
              registries: [new IndyVdrAnonCredsRegistry()],
              anoncreds: require('@hyperledger/anoncreds-react-native'),
            }),
            dids: new DidsModule({
              registrars: [new IndyVdrIndyDidRegistrar()],
              resolvers: [new IndyVdrIndyDidResolver()],
            }),
            credentials: new CredentialsModule({
              autoAcceptCredentials: AutoAcceptCredential.Always,
              credentialProtocols: [
                new V2CredentialProtocol({
                  credentialFormats: [
                    new JsonLdCredentialFormatService(),
                    new AnonCredsCredentialFormatService(),
                    new LegacyIndyCredentialFormatService(),
                  ],
                }),
              ],
            }),
            proofs: new ProofsModule({
              autoAcceptProofs: AutoAcceptProof.ContentApproved,
              proofProtocols: [
                new V2ProofProtocol({
                  proofFormats: [
                    new LegacyIndyProofFormatService(),
                    new AnonCredsProofFormatService(),
                  ],
                }),
              ],
            }),
            mediationRecipient: new MediationRecipientModule({
              mediatorInvitationUrl: MEDIATOR_INVITATION_URL,
            }),
            messagePickup: new MessagePickupModule({
              mediatorPickupStrategy: MediatorPickupStrategy.Implicit,
            }),
          },
        });
        _agent.registerOutboundTransport(new HttpOutboundTransport());
        _agent.registerOutboundTransport(new WsOutboundTransport());

        _agent.events.on(AgentEventTypes.AgentMessageReceived, (event) => {
          console.log(
            '📨 Mediator로부터 원시 메시지 수신 (암호화된 상태):',
            JSON.stringify(event.payload, null, 2),
          );
        });
        _agent.events.on(AgentEventTypes.AgentMessageProcessed, ({ payload }) => {
          console.log('🔓 복호화된 메시지:', payload.message);
        });

        // HTTP/Ws transport 등록

        await _agent.initialize();

        console.log('Agent 초기화 성공');
        setAgent(_agent);
        setConnStatus('Agent 초기화 완료');
      } catch (err) {
        console.error('❌ Agent 초기화 실패:', err);
        setConnStatus(`Agent 초기화 실패: ${err.message || String(err)}`);
      }
    })();
  }, []);
  //========================================================================================================================
  const connectHospital = async () => {
    if (!agent) {
      return;
    }
    try {
      const result = await agent.dids.create({
        method: 'peer',
        options: {
          numAlgo: PeerDidNumAlgo.InceptionKeyWithoutDoc,
        },
      });

      const record = await agent.oob.receiveInvitationFromUrl(HOSPITAL_INVITATION_URL, {
        ourDid: result.didState.did,
        autoAcceptConnection: true,
        autoAcceptInvitation: true,
      });
    } catch (error) {
      console.error('❌ Hospital 연결 또는 VC 요청 실패:', error);
      setConnStatus(`Hospital 연결/VC 요청 실패: ${error.message || String(error)}`);
    }
  };

  // 아래는 단순하게 UI 예시 (페이지에서 직접 버튼으로 호출)
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>Credo Agent 테스트</Text>
      <Text style={{ marginBottom: 16 }}>상태: {connStatus}</Text>
      <Button title="병원 연결 및 VC 요청" onPress={connectHospital} />
      {vcContent && (
        <ScrollView>
          <Text selectable>{JSON.stringify(vcContent, null, 2)}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
