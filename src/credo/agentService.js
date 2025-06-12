import { Buffer } from 'buffer';

global.Buffer = Buffer;

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

const MEDIATOR_INVITATION_URL =
  'ws://192.168.0.115:8000?oob=eyJAdHlwZSI6ICJodHRwczovL2RpZGNvbW0ub3JnL291dC1vZi1iYW5kLzEuMS9pbnZpdGF0aW9uIiwgIkBpZCI6ICJkNjg4YjkwYi0zOWFhLTQyN2MtYjk1MS1iMjRmZTYxZmExNjMiLCAibGFiZWwiOiAibWVkaWF0b3ItYWNhcHkiLCAiaGFuZHNoYWtlX3Byb3RvY29scyI6IFsiaHR0cHM6Ly9kaWRjb21tLm9yZy9kaWRleGNoYW5nZS8xLjAiXSwgImFjY2VwdCI6IFsiZGlkY29tbS9haXAyO2Vudj1yZmMxOSJdLCAic2VydmljZXMiOiBbImRpZDpwZWVyOjIuVno2TWtmRXV3U1F2cHdDRFhaTWNhTEdiTlRaWm9HeU1URnB3V0Z5d3REd3BKYUpYcS5FejZMU25qczQ3bWdnUUF1WVBGQXpOMW1FSG5QcUU4R0pOZEpyVkZYWGlrZzdXYk5TLlNleUpwWkNJNklpTmthV1JqYjIxdExUQWlMQ0owSWpvaVpHbGtMV052YlcxMWJtbGpZWFJwYjI0aUxDSndjbWx2Y21sMGVTSTZNQ3dpY21WamFYQnBaVzUwUzJWNWN5STZXeUlqYTJWNUxURWlYU3dpY2lJNlcxMHNJbk1pT2lKM2N6b3ZMekU1TWk0eE5qZ3VNQzR4TVRVNk9EQXdNQ0o5Il19';

export async function createCredoAgent() {
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
              proofFormats: [new LegacyIndyProofFormatService(), new AnonCredsProofFormatService()],
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

    await _agent.initialize();

    console.log('Agent 초기화 성공');
    return _agent; // <=== 생성된 agent 인스턴스만 리턴!
  } catch (err) {
    console.error('❌ Agent 초기화 실패:', err);
    throw err;
  }
}
