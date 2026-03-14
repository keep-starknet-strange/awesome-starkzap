import * as RPCSPEC07 from 'starknet-types-07';
import { ETransactionVersion as ETransactionVersion$1, STRUCT_EVENT as STRUCT_EVENT$1, ENUM_EVENT as ENUM_EVENT$1, EVENT_FIELD as EVENT_FIELD$1, ResourceBounds as ResourceBounds$2, EDataAvailabilityMode as EDataAvailabilityMode$1, BlockHash as BlockHash$1, TransactionHash as TransactionHash$1, Errors, ETransactionVersion2 as ETransactionVersion2$1, ETransactionVersion3 as ETransactionVersion3$1, StarknetDomain, StarknetEnumType, StarknetMerkleType, StarknetType, TypedData, TypedDataRevision, BlockWithTxReceipts, InvokedTransaction as InvokedTransaction$2, DeclaredTransaction as DeclaredTransaction$2, DeployedAccountTransaction as DeployedAccountTransaction$1, L1Message as L1Message$1, EventFilter as EventFilter$1, StarknetWindowObject, AccountChangeEventHandler, NetworkChangeEventHandler, WatchAssetParameters, AddStarknetChainParameters, Signature as Signature$1, EDAMode as EDAMode$1, EmittedEvent as EmittedEvent$1, Methods as Methods$1, Address, Permission, ChainId as ChainId$1, AccountDeploymentData, AddInvokeTransactionParameters, AddInvokeTransactionResult, AddDeclareTransactionParameters, AddDeclareTransactionResult, SpecVersion } from 'starknet-types-07';
export { StarknetDomain, StarknetEnumType, StarknetMerkleType, StarknetType, TypedData, TypedDataRevision } from 'starknet-types-07';
import * as weierstrass from '@noble/curves/abstract/weierstrass';
import { RecoveredSignatureType } from '@noble/curves/abstract/weierstrass';
import { Abi as Abi$1, TypedContract } from 'abi-wan-kanabi';
import * as ts_mixer_dist_types_types from 'ts-mixer/dist/types/types';
import * as poseidon from '@noble/curves/abstract/poseidon';
import * as json$1 from 'lossless-json';
import * as starknet from '@scure/starknet';

function _mergeNamespaces(n, m) {
  m.forEach(function (e) {
    e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
      if (k !== 'default' && !(k in n)) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  });
  return Object.freeze(n);
}

type RequestBody = {
    id: number | string;
    jsonrpc: '2.0';
    method: string;
    params?: {};
};
type ResponseBody = {
    id: number | string;
    jsonrpc: '2.0';
} & (SuccessResponseBody | ErrorResponseBody);
type SuccessResponseBody = {
    result: unknown;
};
type ErrorResponseBody = {
    error: Error$1;
};
type Error$1 = {
    code: number;
    message: string;
    data?: unknown;
};

type index$5_ErrorResponseBody = ErrorResponseBody;
type index$5_RequestBody = RequestBody;
type index$5_ResponseBody = ResponseBody;
type index$5_SuccessResponseBody = SuccessResponseBody;
declare namespace index$5 {
  export type { Error$1 as Error, index$5_ErrorResponseBody as ErrorResponseBody, index$5_RequestBody as RequestBody, index$5_ResponseBody as ResponseBody, index$5_SuccessResponseBody as SuccessResponseBody };
}

/**
 * PRIMITIVES
 */
/**
 * A field element. represented by at most 63 hex digits
 * @pattern ^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,62})$
 */
type FELT$1 = string;
/**
 * an ethereum address represented as 40 hex digits
 * @pattern ^0x[a-fA-F0-9]{40}$
 */
type ETH_ADDRESS$1 = string;
/**
 * A storage key. Represented as up to 62 hex digits, 3 bits, and 5 leading zeroes.
 * @pattern ^0x0[0-7]{1}[a-fA-F0-9]{0,62}$
 */
type STORAGE_KEY = string;
type ADDRESS = FELT$1;
type NUM_AS_HEX = string;
/**
 * 64 bit integers, represented by hex string of length at most 16
 * "pattern": "^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,15})$"
 */
type u64 = string;
/**
 * 64 bit integers, represented by hex string of length at most 32
 * "pattern": "^0x(0|[a-fA-F1-9]{1}[a-fA-F0-9]{0,31})$"
 */
type u128 = string;
type SIGNATURE = Array<FELT$1>;
type BLOCK_NUMBER$1 = number;
type BLOCK_HASH$1 = FELT$1;
type TXN_HASH$1 = FELT$1;
type CHAIN_ID = NUM_AS_HEX;
type STRUCT_ABI_TYPE = 'struct';
type EVENT_ABI_TYPE = 'event';
type FUNCTION_ABI_TYPE = 'function' | 'l1_handler' | 'constructor';
type ENTRY_POINT_TYPE = 'EXTERNAL' | 'L1_HANDLER' | 'CONSTRUCTOR';
type CALL_TYPE = 'DELEGATE' | 'LIBRARY_CALL' | 'CALL';
type TXN_STATUS = 'RECEIVED' | 'REJECTED' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1';
type SIMULATION_FLAG$1 = 'SKIP_VALIDATE' | 'SKIP_FEE_CHARGE';
type DA_MODE = 'L1' | 'L2';
type TXN_TYPE = 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT' | 'INVOKE' | 'L1_HANDLER';
type TXN_FINALITY_STATUS = 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1';
type TXN_EXECUTION_STATUS = 'SUCCEEDED' | 'REVERTED';
type BLOCK_STATUS = 'PENDING' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
type BLOCK_TAG = 'latest' | 'pending';
/**
 * READ API
 */
type EVENTS_CHUNK = {
    events: EMITTED_EVENT[];
    continuation_token?: string;
};
type RESULT_PAGE_REQUEST = {
    continuation_token?: string;
    chunk_size: number;
};
type EMITTED_EVENT = EVENT$1 & {
    block_hash: BLOCK_HASH$1;
    block_number: BLOCK_NUMBER$1;
    transaction_hash: TXN_HASH$1;
};
type EVENT$1 = {
    from_address: ADDRESS;
} & EVENT_CONTENT;
type EVENT_CONTENT = {
    keys: FELT$1[];
    data: FELT$1[];
};
type EVENT_FILTER = {
    from_block?: BLOCK_ID;
    to_block?: BLOCK_ID;
    address?: ADDRESS;
    keys?: FELT$1[][];
};
type BLOCK_ID = {
    block_hash?: BLOCK_HASH$1;
    block_number?: BLOCK_NUMBER$1;
} | BLOCK_TAG;
type SYNC_STATUS = {
    starting_block_hash: BLOCK_HASH$1;
    starting_block_num: BLOCK_NUMBER$1;
    current_block_hash: BLOCK_HASH$1;
    current_block_num: BLOCK_NUMBER$1;
    highest_block_hash: BLOCK_HASH$1;
    highest_block_num: BLOCK_NUMBER$1;
};
type NEW_CLASSES = {
    class_hash: FELT$1;
    compiled_class_hash: FELT$1;
};
type REPLACED_CLASS = {
    class_hash: FELT$1;
    contract_address: FELT$1;
};
type NONCE_UPDATE = {
    contract_address: ADDRESS;
    nonce: FELT$1;
};
type STATE_DIFF = {
    storage_diffs: CONTRACT_STORAGE_DIFF_ITEM[];
    deprecated_declared_classes: FELT$1[];
    declared_classes: NEW_CLASSES[];
    deployed_contracts: DEPLOYED_CONTRACT_ITEM[];
    replaced_classes: REPLACED_CLASS[];
    nonces: NONCE_UPDATE[];
};
type PENDING_STATE_UPDATE$1 = {
    old_root: FELT$1;
    state_diff: STATE_DIFF;
    block_hash: never;
};
type STATE_UPDATE$1 = {
    block_hash: BLOCK_HASH$1;
    old_root: FELT$1;
    new_root: FELT$1;
    state_diff: STATE_DIFF;
};
type BLOCK_BODY_WITH_TX_HASHES = {
    transactions: TXN_HASH$1[];
};
type BLOCK_BODY_WITH_TXS = {
    transactions: (TXN & {
        transaction_hash: TXN_HASH$1;
    })[];
};
type BLOCK_HEADER = {
    block_hash: BLOCK_HASH$1;
    parent_hash: BLOCK_HASH$1;
    block_number: BLOCK_NUMBER$1;
    new_root: FELT$1;
    timestamp: number;
    sequencer_address: FELT$1;
    l1_gas_price: RESOURCE_PRICE$1;
    starknet_version: string;
};
type PENDING_BLOCK_HEADER = {
    parent_hash: BLOCK_HASH$1;
    timestamp: number;
    sequencer_address: FELT$1;
    l1_gas_price: RESOURCE_PRICE$1;
    starknet_version: string;
};
type BLOCK_WITH_TX_HASHES = {
    status: BLOCK_STATUS;
} & BLOCK_HEADER & BLOCK_BODY_WITH_TX_HASHES;
type BLOCK_WITH_TXS = {
    status: BLOCK_STATUS;
} & BLOCK_HEADER & BLOCK_BODY_WITH_TXS;
type PENDING_BLOCK_WITH_TX_HASHES = BLOCK_BODY_WITH_TX_HASHES & PENDING_BLOCK_HEADER;
type PENDING_BLOCK_WITH_TXS = BLOCK_BODY_WITH_TXS & PENDING_BLOCK_HEADER;
type DEPLOYED_CONTRACT_ITEM = {
    address: FELT$1;
    class_hash: FELT$1;
};
type CONTRACT_STORAGE_DIFF_ITEM = {
    address: string;
    storage_entries: StorageDiffItem[];
};
type StorageDiffItem = {
    key: string;
    value: string;
};
type TXN = INVOKE_TXN | L1_HANDLER_TXN | DECLARE_TXN | DEPLOY_TXN | DEPLOY_ACCOUNT_TXN;
type DECLARE_TXN = DECLARE_TXN_V0 | DECLARE_TXN_V1 | DECLARE_TXN_V2 | DECLARE_TXN_V3;
type DECLARE_TXN_V0 = {
    type: 'DECLARE';
    sender_address: ADDRESS;
    max_fee: FELT$1;
    version: '0x0' | '0x100000000000000000000000000000000';
    signature: SIGNATURE;
    class_hash: FELT$1;
};
type DECLARE_TXN_V1 = {
    type: 'DECLARE';
    sender_address: ADDRESS;
    max_fee: FELT$1;
    version: '0x1' | '0x100000000000000000000000000000001';
    signature: SIGNATURE;
    nonce: FELT$1;
    class_hash: FELT$1;
};
type DECLARE_TXN_V2 = {
    type: 'DECLARE';
    sender_address: ADDRESS;
    compiled_class_hash: FELT$1;
    max_fee: FELT$1;
    version: '0x2' | '0x100000000000000000000000000000002';
    signature: SIGNATURE;
    nonce: FELT$1;
    class_hash: FELT$1;
};
type DECLARE_TXN_V3 = {
    type: 'DECLARE';
    sender_address: ADDRESS;
    compiled_class_hash: FELT$1;
    version: '0x3' | '0x100000000000000000000000000000003';
    signature: SIGNATURE;
    nonce: FELT$1;
    class_hash: FELT$1;
    resource_bounds: RESOURCE_BOUNDS_MAPPING;
    tip: u64;
    paymaster_data: FELT$1[];
    account_deployment_data: FELT$1[];
    nonce_data_availability_mode: DA_MODE;
    fee_data_availability_mode: DA_MODE;
};
type BROADCASTED_TXN = BROADCASTED_INVOKE_TXN | BROADCASTED_DECLARE_TXN | BROADCASTED_DEPLOY_ACCOUNT_TXN;
type BROADCASTED_INVOKE_TXN = INVOKE_TXN;
type BROADCASTED_DEPLOY_ACCOUNT_TXN = DEPLOY_ACCOUNT_TXN;
type BROADCASTED_DECLARE_TXN = BROADCASTED_DECLARE_TXN_V1 | BROADCASTED_DECLARE_TXN_V2 | BROADCASTED_DECLARE_TXN_V3;
type BROADCASTED_DECLARE_TXN_V1 = {
    type: 'DECLARE';
    sender_address: ADDRESS;
    max_fee: FELT$1;
    version: '0x1' | '0x100000000000000000000000000000001';
    signature: SIGNATURE;
    nonce: FELT$1;
    contract_class: DEPRECATED_CONTRACT_CLASS;
};
type BROADCASTED_DECLARE_TXN_V2 = {
    type: 'DECLARE';
    sender_address: ADDRESS;
    compiled_class_hash: FELT$1;
    max_fee: FELT$1;
    version: '0x2' | '0x100000000000000000000000000000002';
    signature: SIGNATURE;
    nonce: FELT$1;
    contract_class: CONTRACT_CLASS;
};
type BROADCASTED_DECLARE_TXN_V3 = {
    type: 'DECLARE';
    sender_address: ADDRESS;
    compiled_class_hash: FELT$1;
    version: '0x3' | '0x100000000000000000000000000000003';
    signature: SIGNATURE;
    nonce: FELT$1;
    contract_class: CONTRACT_CLASS;
    resource_bounds: RESOURCE_BOUNDS_MAPPING;
    tip: u64;
    paymaster_data: FELT$1[];
    account_deployment_data: FELT$1[];
    nonce_data_availability_mode: DA_MODE;
    fee_data_availability_mode: DA_MODE;
};
type DEPLOY_ACCOUNT_TXN = DEPLOY_ACCOUNT_TXN_V1 | DEPLOY_ACCOUNT_TXN_V3;
type DEPLOY_ACCOUNT_TXN_V1 = {
    type: 'DEPLOY_ACCOUNT';
    max_fee: FELT$1;
    version: '0x1' | '0x100000000000000000000000000000001';
    signature: SIGNATURE;
    nonce: FELT$1;
    contract_address_salt: FELT$1;
    constructor_calldata: FELT$1[];
    class_hash: FELT$1;
};
type DEPLOY_ACCOUNT_TXN_V3 = {
    type: 'DEPLOY_ACCOUNT';
    version: '0x3' | '0x100000000000000000000000000000003';
    signature: SIGNATURE;
    nonce: FELT$1;
    contract_address_salt: FELT$1;
    constructor_calldata: FELT$1[];
    class_hash: FELT$1;
    resource_bounds: RESOURCE_BOUNDS_MAPPING;
    tip: u64;
    paymaster_data: FELT$1[];
    nonce_data_availability_mode: DA_MODE;
    fee_data_availability_mode: DA_MODE;
};
type DEPLOY_TXN = {
    type: 'DEPLOY';
    version: FELT$1;
    contract_address_salt: FELT$1;
    constructor_calldata: FELT$1[];
    class_hash: FELT$1;
};
type INVOKE_TXN = INVOKE_TXN_V0 | INVOKE_TXN_V1 | INVOKE_TXN_V3;
type INVOKE_TXN_V0 = {
    type: 'INVOKE';
    max_fee: FELT$1;
    version: '0x0' | '0x100000000000000000000000000000000';
    signature: SIGNATURE;
    contract_address: ADDRESS;
    entry_point_selector: FELT$1;
    calldata: FELT$1[];
};
type INVOKE_TXN_V1 = {
    type: 'INVOKE';
    sender_address: ADDRESS;
    calldata: FELT$1[];
    max_fee: FELT$1;
    version: '0x1' | '0x100000000000000000000000000000001';
    signature: SIGNATURE;
    nonce: FELT$1;
};
type INVOKE_TXN_V3 = {
    type: 'INVOKE';
    sender_address: ADDRESS;
    calldata: FELT$1[];
    version: '0x3' | '0x100000000000000000000000000000003';
    signature: SIGNATURE;
    nonce: FELT$1;
    resource_bounds: RESOURCE_BOUNDS_MAPPING;
    tip: u64;
    paymaster_data: FELT$1[];
    account_deployment_data: FELT$1[];
    nonce_data_availability_mode: DA_MODE;
    fee_data_availability_mode: DA_MODE;
};
type L1_HANDLER_TXN = {
    version: FELT$1;
    type: 'L1_HANDLER';
    nonce: NUM_AS_HEX;
} & FUNCTION_CALL;
type COMMON_RECEIPT_PROPERTIES = {
    transaction_hash: TXN_HASH$1;
    actual_fee: FEE_PAYMENT;
    execution_status: TXN_EXECUTION_STATUS;
    finality_status: TXN_FINALITY_STATUS;
    block_hash: BLOCK_HASH$1;
    block_number: BLOCK_NUMBER$1;
    messages_sent: MSG_TO_L1[];
    revert_reason?: string;
    events: EVENT$1[];
    execution_resources: EXECUTION_RESOURCES;
};
type PENDING_COMMON_RECEIPT_PROPERTIES = {
    transaction_hash: TXN_HASH$1;
    actual_fee: FEE_PAYMENT;
    messages_sent: MSG_TO_L1[];
    events: EVENT$1[];
    revert_reason?: string;
    finality_status: 'ACCEPTED_ON_L2';
    execution_status: TXN_EXECUTION_STATUS;
    execution_resources: EXECUTION_RESOURCES;
};
type INVOKE_TXN_RECEIPT$1 = {
    type: 'INVOKE';
} & COMMON_RECEIPT_PROPERTIES;
type PENDING_INVOKE_TXN_RECEIPT$1 = {
    type: 'INVOKE';
} & PENDING_COMMON_RECEIPT_PROPERTIES;
type DECLARE_TXN_RECEIPT$1 = {
    type: 'DECLARE';
} & COMMON_RECEIPT_PROPERTIES;
type PENDING_DECLARE_TXN_RECEIPT$1 = {
    type: 'DECLARE';
} & PENDING_COMMON_RECEIPT_PROPERTIES;
type DEPLOY_ACCOUNT_TXN_RECEIPT$1 = {
    type: 'DEPLOY_ACCOUNT';
    contract_address: FELT$1;
} & COMMON_RECEIPT_PROPERTIES;
type PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT$1 = {
    type: 'DEPLOY_ACCOUNT';
    contract_address: FELT$1;
} & PENDING_COMMON_RECEIPT_PROPERTIES;
type DEPLOY_TXN_RECEIPT = {
    type: 'DEPLOY';
    contract_address: FELT$1;
} & COMMON_RECEIPT_PROPERTIES;
type L1_HANDLER_TXN_RECEIPT$1 = {
    type: 'L1_HANDLER';
    message_hash: NUM_AS_HEX;
} & COMMON_RECEIPT_PROPERTIES;
type PENDING_L1_HANDLER_TXN_RECEIPT$1 = {
    type: 'L1_HANDLER';
    message_hash: NUM_AS_HEX;
} & PENDING_COMMON_RECEIPT_PROPERTIES;
type TXN_RECEIPT = INVOKE_TXN_RECEIPT$1 | L1_HANDLER_TXN_RECEIPT$1 | DECLARE_TXN_RECEIPT$1 | DEPLOY_TXN_RECEIPT | DEPLOY_ACCOUNT_TXN_RECEIPT$1;
type PENDING_TXN_RECEIPT = PENDING_INVOKE_TXN_RECEIPT$1 | PENDING_L1_HANDLER_TXN_RECEIPT$1 | PENDING_DECLARE_TXN_RECEIPT$1 | PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT$1;
type MSG_TO_L1 = {
    from_address: FELT$1;
    to_address: FELT$1;
    payload: FELT$1[];
};
type MSG_FROM_L1 = {
    from_address: ETH_ADDRESS$1;
    to_address: ADDRESS;
    entry_point_selector: FELT$1;
    payload: FELT$1[];
};
type FUNCTION_CALL = {
    contract_address: ADDRESS;
    entry_point_selector: FELT$1;
    calldata: FELT$1[];
};
type CONTRACT_CLASS = {
    sierra_program: FELT$1[];
    contract_class_version: string;
    entry_points_by_type: {
        CONSTRUCTOR: SIERRA_ENTRY_POINT[];
        EXTERNAL: SIERRA_ENTRY_POINT[];
        L1_HANDLER: SIERRA_ENTRY_POINT[];
    };
    abi: string;
};
type DEPRECATED_CONTRACT_CLASS = {
    program: string;
    entry_points_by_type: {
        CONSTRUCTOR: DEPRECATED_CAIRO_ENTRY_POINT[];
        EXTERNAL: DEPRECATED_CAIRO_ENTRY_POINT[];
        L1_HANDLER: DEPRECATED_CAIRO_ENTRY_POINT[];
    };
    abi: CONTRACT_ABI;
};
type DEPRECATED_CAIRO_ENTRY_POINT = {
    offset: NUM_AS_HEX | number;
    selector: FELT$1;
};
type SIERRA_ENTRY_POINT = {
    selector: FELT$1;
    function_idx: number;
};
type CONTRACT_ABI = readonly CONTRACT_ABI_ENTRY[];
type CONTRACT_ABI_ENTRY = {
    selector: FELT$1;
    input: string;
    output: string;
};
type STRUCT_ABI_ENTRY = {
    type: STRUCT_ABI_TYPE;
    name: string;
    size: number;
    members: STRUCT_MEMBER[];
};
type STRUCT_MEMBER = TYPED_PARAMETER & {
    offset: number;
};
type EVENT_ABI_ENTRY = {
    type: EVENT_ABI_TYPE;
    name: string;
    keys: TYPED_PARAMETER[];
    data: TYPED_PARAMETER[];
};
type FUNCTION_STATE_MUTABILITY = 'view';
type FUNCTION_ABI_ENTRY = {
    type: FUNCTION_ABI_TYPE;
    name: string;
    inputs: TYPED_PARAMETER[];
    outputs: TYPED_PARAMETER[];
    stateMutability: FUNCTION_STATE_MUTABILITY;
};
type TYPED_PARAMETER = {
    name: string;
    type: string;
};
type SIMULATION_FLAG_FOR_ESTIMATE_FEE = 'SKIP_VALIDATE';
type PRICE_UNIT$1 = 'WEI' | 'FRI';
type FEE_ESTIMATE = {
    gas_consumed: FELT$1;
    gas_price: FELT$1;
    overall_fee: FELT$1;
    unit: PRICE_UNIT$1;
};
type FEE_PAYMENT = {
    amount: FELT$1;
    unit: PRICE_UNIT$1;
};
type RESOURCE_BOUNDS_MAPPING = {
    l1_gas: RESOURCE_BOUNDS;
    l2_gas: RESOURCE_BOUNDS;
};
type RESOURCE_BOUNDS = {
    max_amount: u64;
    max_price_per_unit: u128;
};
type RESOURCE_PRICE$1 = {
    price_in_fri: FELT$1;
    price_in_wei: FELT$1;
};
type EXECUTION_RESOURCES = {
    steps: number;
    memory_holes?: number;
    range_check_builtin_applications?: number;
    pedersen_builtin_applications?: number;
    poseidon_builtin_applications?: number;
    ec_op_builtin_applications?: number;
    ecdsa_builtin_applications?: number;
    bitwise_builtin_applications?: number;
    keccak_builtin_applications?: number;
    segment_arena_builtin?: number;
};
/**
 * TRACE API
 */
type TRANSACTION_TRACE = {
    invoke_tx_trace?: INVOKE_TXN_TRACE;
    declare_tx_trace?: DECLARE_TXN_TRACE;
    deploy_account_tx_trace?: DEPLOY_ACCOUNT_TXN_TRACE;
    l1_handler_tx_trace?: L1_HANDLER_TXN_TRACE;
};
type INVOKE_TXN_TRACE = {
    type: 'INVOKE';
    execute_invocation: FUNCTION_INVOCATION | {
        revert_reason: string;
    };
    validate_invocation?: FUNCTION_INVOCATION;
    fee_transfer_invocation?: FUNCTION_INVOCATION;
    state_diff?: STATE_DIFF;
};
type DECLARE_TXN_TRACE = {
    type: 'DECLARE';
    validate_invocation?: FUNCTION_INVOCATION;
    fee_transfer_invocation?: FUNCTION_INVOCATION;
    state_diff?: STATE_DIFF;
};
type DEPLOY_ACCOUNT_TXN_TRACE = {
    type: 'DEPLOY_ACCOUNT';
    constructor_invocation: FUNCTION_INVOCATION;
    validate_invocation?: FUNCTION_INVOCATION;
    fee_transfer_invocation?: FUNCTION_INVOCATION;
    state_diff?: STATE_DIFF;
};
type L1_HANDLER_TXN_TRACE = {
    type: 'L1_HANDLER';
    function_invocation: FUNCTION_INVOCATION;
    state_diff?: STATE_DIFF;
};
type NESTED_CALL = FUNCTION_INVOCATION;
type FUNCTION_INVOCATION = FUNCTION_CALL & {
    caller_address: string;
    class_hash: string;
    entry_point_type: ENTRY_POINT_TYPE;
    call_type: CALL_TYPE;
    result: string[];
    calls: NESTED_CALL[];
    events: ORDERED_EVENT[];
    messages: ORDERED_MESSAGE[];
    execution_resources: EXECUTION_RESOURCES;
};
type ORDERED_EVENT = {
    order: number;
    event: EVENT$1;
};
type ORDERED_MESSAGE = {
    order: number;
    message: MSG_TO_L1;
};

type components_ADDRESS = ADDRESS;
type components_BLOCK_BODY_WITH_TXS = BLOCK_BODY_WITH_TXS;
type components_BLOCK_BODY_WITH_TX_HASHES = BLOCK_BODY_WITH_TX_HASHES;
type components_BLOCK_HEADER = BLOCK_HEADER;
type components_BLOCK_ID = BLOCK_ID;
type components_BLOCK_STATUS = BLOCK_STATUS;
type components_BLOCK_TAG = BLOCK_TAG;
type components_BLOCK_WITH_TXS = BLOCK_WITH_TXS;
type components_BLOCK_WITH_TX_HASHES = BLOCK_WITH_TX_HASHES;
type components_BROADCASTED_DECLARE_TXN = BROADCASTED_DECLARE_TXN;
type components_BROADCASTED_DECLARE_TXN_V1 = BROADCASTED_DECLARE_TXN_V1;
type components_BROADCASTED_DECLARE_TXN_V2 = BROADCASTED_DECLARE_TXN_V2;
type components_BROADCASTED_DECLARE_TXN_V3 = BROADCASTED_DECLARE_TXN_V3;
type components_BROADCASTED_DEPLOY_ACCOUNT_TXN = BROADCASTED_DEPLOY_ACCOUNT_TXN;
type components_BROADCASTED_INVOKE_TXN = BROADCASTED_INVOKE_TXN;
type components_BROADCASTED_TXN = BROADCASTED_TXN;
type components_CALL_TYPE = CALL_TYPE;
type components_CHAIN_ID = CHAIN_ID;
type components_COMMON_RECEIPT_PROPERTIES = COMMON_RECEIPT_PROPERTIES;
type components_CONTRACT_ABI = CONTRACT_ABI;
type components_CONTRACT_ABI_ENTRY = CONTRACT_ABI_ENTRY;
type components_CONTRACT_CLASS = CONTRACT_CLASS;
type components_CONTRACT_STORAGE_DIFF_ITEM = CONTRACT_STORAGE_DIFF_ITEM;
type components_DA_MODE = DA_MODE;
type components_DECLARE_TXN = DECLARE_TXN;
type components_DECLARE_TXN_TRACE = DECLARE_TXN_TRACE;
type components_DECLARE_TXN_V0 = DECLARE_TXN_V0;
type components_DECLARE_TXN_V1 = DECLARE_TXN_V1;
type components_DECLARE_TXN_V2 = DECLARE_TXN_V2;
type components_DECLARE_TXN_V3 = DECLARE_TXN_V3;
type components_DEPLOYED_CONTRACT_ITEM = DEPLOYED_CONTRACT_ITEM;
type components_DEPLOY_ACCOUNT_TXN = DEPLOY_ACCOUNT_TXN;
type components_DEPLOY_ACCOUNT_TXN_TRACE = DEPLOY_ACCOUNT_TXN_TRACE;
type components_DEPLOY_ACCOUNT_TXN_V1 = DEPLOY_ACCOUNT_TXN_V1;
type components_DEPLOY_ACCOUNT_TXN_V3 = DEPLOY_ACCOUNT_TXN_V3;
type components_DEPLOY_TXN = DEPLOY_TXN;
type components_DEPLOY_TXN_RECEIPT = DEPLOY_TXN_RECEIPT;
type components_DEPRECATED_CAIRO_ENTRY_POINT = DEPRECATED_CAIRO_ENTRY_POINT;
type components_DEPRECATED_CONTRACT_CLASS = DEPRECATED_CONTRACT_CLASS;
type components_EMITTED_EVENT = EMITTED_EVENT;
type components_ENTRY_POINT_TYPE = ENTRY_POINT_TYPE;
type components_EVENTS_CHUNK = EVENTS_CHUNK;
type components_EVENT_ABI_ENTRY = EVENT_ABI_ENTRY;
type components_EVENT_ABI_TYPE = EVENT_ABI_TYPE;
type components_EVENT_CONTENT = EVENT_CONTENT;
type components_EVENT_FILTER = EVENT_FILTER;
type components_EXECUTION_RESOURCES = EXECUTION_RESOURCES;
type components_FEE_ESTIMATE = FEE_ESTIMATE;
type components_FEE_PAYMENT = FEE_PAYMENT;
type components_FUNCTION_ABI_ENTRY = FUNCTION_ABI_ENTRY;
type components_FUNCTION_ABI_TYPE = FUNCTION_ABI_TYPE;
type components_FUNCTION_CALL = FUNCTION_CALL;
type components_FUNCTION_INVOCATION = FUNCTION_INVOCATION;
type components_FUNCTION_STATE_MUTABILITY = FUNCTION_STATE_MUTABILITY;
type components_INVOKE_TXN = INVOKE_TXN;
type components_INVOKE_TXN_TRACE = INVOKE_TXN_TRACE;
type components_INVOKE_TXN_V0 = INVOKE_TXN_V0;
type components_INVOKE_TXN_V1 = INVOKE_TXN_V1;
type components_INVOKE_TXN_V3 = INVOKE_TXN_V3;
type components_L1_HANDLER_TXN = L1_HANDLER_TXN;
type components_L1_HANDLER_TXN_TRACE = L1_HANDLER_TXN_TRACE;
type components_MSG_FROM_L1 = MSG_FROM_L1;
type components_MSG_TO_L1 = MSG_TO_L1;
type components_NESTED_CALL = NESTED_CALL;
type components_NEW_CLASSES = NEW_CLASSES;
type components_NONCE_UPDATE = NONCE_UPDATE;
type components_NUM_AS_HEX = NUM_AS_HEX;
type components_ORDERED_EVENT = ORDERED_EVENT;
type components_ORDERED_MESSAGE = ORDERED_MESSAGE;
type components_PENDING_BLOCK_HEADER = PENDING_BLOCK_HEADER;
type components_PENDING_BLOCK_WITH_TXS = PENDING_BLOCK_WITH_TXS;
type components_PENDING_BLOCK_WITH_TX_HASHES = PENDING_BLOCK_WITH_TX_HASHES;
type components_PENDING_COMMON_RECEIPT_PROPERTIES = PENDING_COMMON_RECEIPT_PROPERTIES;
type components_PENDING_TXN_RECEIPT = PENDING_TXN_RECEIPT;
type components_REPLACED_CLASS = REPLACED_CLASS;
type components_RESOURCE_BOUNDS = RESOURCE_BOUNDS;
type components_RESOURCE_BOUNDS_MAPPING = RESOURCE_BOUNDS_MAPPING;
type components_RESULT_PAGE_REQUEST = RESULT_PAGE_REQUEST;
type components_SIERRA_ENTRY_POINT = SIERRA_ENTRY_POINT;
type components_SIGNATURE = SIGNATURE;
type components_SIMULATION_FLAG_FOR_ESTIMATE_FEE = SIMULATION_FLAG_FOR_ESTIMATE_FEE;
type components_STATE_DIFF = STATE_DIFF;
type components_STORAGE_KEY = STORAGE_KEY;
type components_STRUCT_ABI_ENTRY = STRUCT_ABI_ENTRY;
type components_STRUCT_ABI_TYPE = STRUCT_ABI_TYPE;
type components_STRUCT_MEMBER = STRUCT_MEMBER;
type components_SYNC_STATUS = SYNC_STATUS;
type components_StorageDiffItem = StorageDiffItem;
type components_TRANSACTION_TRACE = TRANSACTION_TRACE;
type components_TXN = TXN;
type components_TXN_EXECUTION_STATUS = TXN_EXECUTION_STATUS;
type components_TXN_FINALITY_STATUS = TXN_FINALITY_STATUS;
type components_TXN_RECEIPT = TXN_RECEIPT;
type components_TXN_STATUS = TXN_STATUS;
type components_TXN_TYPE = TXN_TYPE;
type components_TYPED_PARAMETER = TYPED_PARAMETER;
type components_u128 = u128;
type components_u64 = u64;
declare namespace components {
  export type { components_ADDRESS as ADDRESS, components_BLOCK_BODY_WITH_TXS as BLOCK_BODY_WITH_TXS, components_BLOCK_BODY_WITH_TX_HASHES as BLOCK_BODY_WITH_TX_HASHES, BLOCK_HASH$1 as BLOCK_HASH, components_BLOCK_HEADER as BLOCK_HEADER, components_BLOCK_ID as BLOCK_ID, BLOCK_NUMBER$1 as BLOCK_NUMBER, components_BLOCK_STATUS as BLOCK_STATUS, components_BLOCK_TAG as BLOCK_TAG, components_BLOCK_WITH_TXS as BLOCK_WITH_TXS, components_BLOCK_WITH_TX_HASHES as BLOCK_WITH_TX_HASHES, components_BROADCASTED_DECLARE_TXN as BROADCASTED_DECLARE_TXN, components_BROADCASTED_DECLARE_TXN_V1 as BROADCASTED_DECLARE_TXN_V1, components_BROADCASTED_DECLARE_TXN_V2 as BROADCASTED_DECLARE_TXN_V2, components_BROADCASTED_DECLARE_TXN_V3 as BROADCASTED_DECLARE_TXN_V3, components_BROADCASTED_DEPLOY_ACCOUNT_TXN as BROADCASTED_DEPLOY_ACCOUNT_TXN, components_BROADCASTED_INVOKE_TXN as BROADCASTED_INVOKE_TXN, components_BROADCASTED_TXN as BROADCASTED_TXN, components_CALL_TYPE as CALL_TYPE, components_CHAIN_ID as CHAIN_ID, components_COMMON_RECEIPT_PROPERTIES as COMMON_RECEIPT_PROPERTIES, components_CONTRACT_ABI as CONTRACT_ABI, components_CONTRACT_ABI_ENTRY as CONTRACT_ABI_ENTRY, components_CONTRACT_CLASS as CONTRACT_CLASS, components_CONTRACT_STORAGE_DIFF_ITEM as CONTRACT_STORAGE_DIFF_ITEM, components_DA_MODE as DA_MODE, components_DECLARE_TXN as DECLARE_TXN, DECLARE_TXN_RECEIPT$1 as DECLARE_TXN_RECEIPT, components_DECLARE_TXN_TRACE as DECLARE_TXN_TRACE, components_DECLARE_TXN_V0 as DECLARE_TXN_V0, components_DECLARE_TXN_V1 as DECLARE_TXN_V1, components_DECLARE_TXN_V2 as DECLARE_TXN_V2, components_DECLARE_TXN_V3 as DECLARE_TXN_V3, components_DEPLOYED_CONTRACT_ITEM as DEPLOYED_CONTRACT_ITEM, components_DEPLOY_ACCOUNT_TXN as DEPLOY_ACCOUNT_TXN, DEPLOY_ACCOUNT_TXN_RECEIPT$1 as DEPLOY_ACCOUNT_TXN_RECEIPT, components_DEPLOY_ACCOUNT_TXN_TRACE as DEPLOY_ACCOUNT_TXN_TRACE, components_DEPLOY_ACCOUNT_TXN_V1 as DEPLOY_ACCOUNT_TXN_V1, components_DEPLOY_ACCOUNT_TXN_V3 as DEPLOY_ACCOUNT_TXN_V3, components_DEPLOY_TXN as DEPLOY_TXN, components_DEPLOY_TXN_RECEIPT as DEPLOY_TXN_RECEIPT, components_DEPRECATED_CAIRO_ENTRY_POINT as DEPRECATED_CAIRO_ENTRY_POINT, components_DEPRECATED_CONTRACT_CLASS as DEPRECATED_CONTRACT_CLASS, components_EMITTED_EVENT as EMITTED_EVENT, components_ENTRY_POINT_TYPE as ENTRY_POINT_TYPE, ETH_ADDRESS$1 as ETH_ADDRESS, EVENT$1 as EVENT, components_EVENTS_CHUNK as EVENTS_CHUNK, components_EVENT_ABI_ENTRY as EVENT_ABI_ENTRY, components_EVENT_ABI_TYPE as EVENT_ABI_TYPE, components_EVENT_CONTENT as EVENT_CONTENT, components_EVENT_FILTER as EVENT_FILTER, components_EXECUTION_RESOURCES as EXECUTION_RESOURCES, components_FEE_ESTIMATE as FEE_ESTIMATE, components_FEE_PAYMENT as FEE_PAYMENT, FELT$1 as FELT, components_FUNCTION_ABI_ENTRY as FUNCTION_ABI_ENTRY, components_FUNCTION_ABI_TYPE as FUNCTION_ABI_TYPE, components_FUNCTION_CALL as FUNCTION_CALL, components_FUNCTION_INVOCATION as FUNCTION_INVOCATION, components_FUNCTION_STATE_MUTABILITY as FUNCTION_STATE_MUTABILITY, components_INVOKE_TXN as INVOKE_TXN, INVOKE_TXN_RECEIPT$1 as INVOKE_TXN_RECEIPT, components_INVOKE_TXN_TRACE as INVOKE_TXN_TRACE, components_INVOKE_TXN_V0 as INVOKE_TXN_V0, components_INVOKE_TXN_V1 as INVOKE_TXN_V1, components_INVOKE_TXN_V3 as INVOKE_TXN_V3, components_L1_HANDLER_TXN as L1_HANDLER_TXN, L1_HANDLER_TXN_RECEIPT$1 as L1_HANDLER_TXN_RECEIPT, components_L1_HANDLER_TXN_TRACE as L1_HANDLER_TXN_TRACE, components_MSG_FROM_L1 as MSG_FROM_L1, components_MSG_TO_L1 as MSG_TO_L1, components_NESTED_CALL as NESTED_CALL, components_NEW_CLASSES as NEW_CLASSES, components_NONCE_UPDATE as NONCE_UPDATE, components_NUM_AS_HEX as NUM_AS_HEX, components_ORDERED_EVENT as ORDERED_EVENT, components_ORDERED_MESSAGE as ORDERED_MESSAGE, components_PENDING_BLOCK_HEADER as PENDING_BLOCK_HEADER, components_PENDING_BLOCK_WITH_TXS as PENDING_BLOCK_WITH_TXS, components_PENDING_BLOCK_WITH_TX_HASHES as PENDING_BLOCK_WITH_TX_HASHES, components_PENDING_COMMON_RECEIPT_PROPERTIES as PENDING_COMMON_RECEIPT_PROPERTIES, PENDING_DECLARE_TXN_RECEIPT$1 as PENDING_DECLARE_TXN_RECEIPT, PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT$1 as PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT, PENDING_INVOKE_TXN_RECEIPT$1 as PENDING_INVOKE_TXN_RECEIPT, PENDING_L1_HANDLER_TXN_RECEIPT$1 as PENDING_L1_HANDLER_TXN_RECEIPT, PENDING_STATE_UPDATE$1 as PENDING_STATE_UPDATE, components_PENDING_TXN_RECEIPT as PENDING_TXN_RECEIPT, PRICE_UNIT$1 as PRICE_UNIT, components_REPLACED_CLASS as REPLACED_CLASS, components_RESOURCE_BOUNDS as RESOURCE_BOUNDS, components_RESOURCE_BOUNDS_MAPPING as RESOURCE_BOUNDS_MAPPING, RESOURCE_PRICE$1 as RESOURCE_PRICE, components_RESULT_PAGE_REQUEST as RESULT_PAGE_REQUEST, components_SIERRA_ENTRY_POINT as SIERRA_ENTRY_POINT, components_SIGNATURE as SIGNATURE, SIMULATION_FLAG$1 as SIMULATION_FLAG, components_SIMULATION_FLAG_FOR_ESTIMATE_FEE as SIMULATION_FLAG_FOR_ESTIMATE_FEE, components_STATE_DIFF as STATE_DIFF, STATE_UPDATE$1 as STATE_UPDATE, components_STORAGE_KEY as STORAGE_KEY, components_STRUCT_ABI_ENTRY as STRUCT_ABI_ENTRY, components_STRUCT_ABI_TYPE as STRUCT_ABI_TYPE, components_STRUCT_MEMBER as STRUCT_MEMBER, components_SYNC_STATUS as SYNC_STATUS, components_StorageDiffItem as StorageDiffItem, components_TRANSACTION_TRACE as TRANSACTION_TRACE, components_TXN as TXN, components_TXN_EXECUTION_STATUS as TXN_EXECUTION_STATUS, components_TXN_FINALITY_STATUS as TXN_FINALITY_STATUS, TXN_HASH$1 as TXN_HASH, components_TXN_RECEIPT as TXN_RECEIPT, components_TXN_STATUS as TXN_STATUS, components_TXN_TYPE as TXN_TYPE, components_TYPED_PARAMETER as TYPED_PARAMETER, components_u128 as u128, components_u64 as u64 };
}

interface FAILED_TO_RECEIVE_TXN {
    code: 1;
    message: 'Failed to write transaction';
}
interface NO_TRACE_AVAILABLE {
    code: 10;
    message: 'No trace available for transaction';
    data: {
        status: 'RECEIVED' | 'REJECTED';
    };
}
interface CONTRACT_NOT_FOUND {
    code: 20;
    message: 'Contract not found';
}
interface INVALID_MESSAGE_SELECTOR {
    code: 21;
    message: 'Invalid message selector';
}
interface INVALID_CALL_DATA {
    code: 22;
    message: 'Invalid call data';
}
interface BLOCK_NOT_FOUND {
    code: 24;
    message: 'Block not found';
}
interface INVALID_BLOCK_HASH {
    code: 26;
    message: 'Invalid block hash';
}
interface INVALID_TXN_INDEX {
    code: 27;
    message: 'Invalid transaction index in a block';
}
interface CLASS_HASH_NOT_FOUND {
    code: 28;
    message: 'Class hash not found';
}
interface TXN_HASH_NOT_FOUND {
    code: 29;
    message: 'Transaction hash not found';
}
interface PAGE_SIZE_TOO_BIG {
    code: 31;
    message: 'Requested page size is too big';
}
interface NO_BLOCKS {
    code: 32;
    message: 'There are no blocks';
}
interface INVALID_CONTINUATION_TOKEN {
    code: 33;
    message: 'The supplied continuation token is invalid or unknown';
}
interface TOO_MANY_KEYS_IN_FILTER {
    code: 34;
    message: 'Too many keys provided in a filter';
}
interface CONTRACT_ERROR {
    code: 40;
    message: 'Contract error';
    data: {
        revert_error: string;
    };
}
interface TRANSACTION_EXECUTION_ERROR {
    code: 41;
    message: 'Transaction execution error';
    data: {
        transaction_index: number;
        execution_error: string;
    };
}
interface CLASS_ALREADY_DECLARED {
    code: 51;
    message: 'Class already declared';
}
interface INVALID_TRANSACTION_NONCE {
    code: 52;
    message: 'Invalid transaction nonce';
}
interface INSUFFICIENT_MAX_FEE {
    code: 53;
    message: 'Max fee is smaller than the minimal transaction cost (validation plus fee transfer)';
}
interface INSUFFICIENT_ACCOUNT_BALANCE {
    code: 54;
    message: "Account balance is smaller than the transaction's max_fee";
}
interface VALIDATION_FAILURE {
    code: 55;
    message: 'Account validation failed';
    data: string;
}
interface COMPILATION_FAILED {
    code: 56;
    message: 'Compilation failed';
}
interface CONTRACT_CLASS_SIZE_IS_TOO_LARGE {
    code: 57;
    message: 'Contract class size it too large';
}
interface NON_ACCOUNT {
    code: 58;
    message: 'Sender address in not an account contract';
}
interface DUPLICATE_TX {
    code: 59;
    message: 'A transaction with the same hash already exists in the mempool';
}
interface COMPILED_CLASS_HASH_MISMATCH {
    code: 60;
    message: 'the compiled class hash did not match the one supplied in the transaction';
}
interface UNSUPPORTED_TX_VERSION {
    code: 61;
    message: 'the transaction version is not supported';
}
interface UNSUPPORTED_CONTRACT_CLASS_VERSION {
    code: 62;
    message: 'the contract class version is not supported';
}
interface UNEXPECTED_ERROR {
    code: 63;
    message: 'An unexpected error occurred';
    data: string;
}

type errors_BLOCK_NOT_FOUND = BLOCK_NOT_FOUND;
type errors_CLASS_ALREADY_DECLARED = CLASS_ALREADY_DECLARED;
type errors_CLASS_HASH_NOT_FOUND = CLASS_HASH_NOT_FOUND;
type errors_COMPILATION_FAILED = COMPILATION_FAILED;
type errors_COMPILED_CLASS_HASH_MISMATCH = COMPILED_CLASS_HASH_MISMATCH;
type errors_CONTRACT_CLASS_SIZE_IS_TOO_LARGE = CONTRACT_CLASS_SIZE_IS_TOO_LARGE;
type errors_CONTRACT_ERROR = CONTRACT_ERROR;
type errors_CONTRACT_NOT_FOUND = CONTRACT_NOT_FOUND;
type errors_DUPLICATE_TX = DUPLICATE_TX;
type errors_FAILED_TO_RECEIVE_TXN = FAILED_TO_RECEIVE_TXN;
type errors_INSUFFICIENT_ACCOUNT_BALANCE = INSUFFICIENT_ACCOUNT_BALANCE;
type errors_INSUFFICIENT_MAX_FEE = INSUFFICIENT_MAX_FEE;
type errors_INVALID_BLOCK_HASH = INVALID_BLOCK_HASH;
type errors_INVALID_CALL_DATA = INVALID_CALL_DATA;
type errors_INVALID_CONTINUATION_TOKEN = INVALID_CONTINUATION_TOKEN;
type errors_INVALID_MESSAGE_SELECTOR = INVALID_MESSAGE_SELECTOR;
type errors_INVALID_TRANSACTION_NONCE = INVALID_TRANSACTION_NONCE;
type errors_INVALID_TXN_INDEX = INVALID_TXN_INDEX;
type errors_NON_ACCOUNT = NON_ACCOUNT;
type errors_NO_BLOCKS = NO_BLOCKS;
type errors_NO_TRACE_AVAILABLE = NO_TRACE_AVAILABLE;
type errors_PAGE_SIZE_TOO_BIG = PAGE_SIZE_TOO_BIG;
type errors_TOO_MANY_KEYS_IN_FILTER = TOO_MANY_KEYS_IN_FILTER;
type errors_TRANSACTION_EXECUTION_ERROR = TRANSACTION_EXECUTION_ERROR;
type errors_TXN_HASH_NOT_FOUND = TXN_HASH_NOT_FOUND;
type errors_UNEXPECTED_ERROR = UNEXPECTED_ERROR;
type errors_UNSUPPORTED_CONTRACT_CLASS_VERSION = UNSUPPORTED_CONTRACT_CLASS_VERSION;
type errors_UNSUPPORTED_TX_VERSION = UNSUPPORTED_TX_VERSION;
type errors_VALIDATION_FAILURE = VALIDATION_FAILURE;
declare namespace errors {
  export type { errors_BLOCK_NOT_FOUND as BLOCK_NOT_FOUND, errors_CLASS_ALREADY_DECLARED as CLASS_ALREADY_DECLARED, errors_CLASS_HASH_NOT_FOUND as CLASS_HASH_NOT_FOUND, errors_COMPILATION_FAILED as COMPILATION_FAILED, errors_COMPILED_CLASS_HASH_MISMATCH as COMPILED_CLASS_HASH_MISMATCH, errors_CONTRACT_CLASS_SIZE_IS_TOO_LARGE as CONTRACT_CLASS_SIZE_IS_TOO_LARGE, errors_CONTRACT_ERROR as CONTRACT_ERROR, errors_CONTRACT_NOT_FOUND as CONTRACT_NOT_FOUND, errors_DUPLICATE_TX as DUPLICATE_TX, errors_FAILED_TO_RECEIVE_TXN as FAILED_TO_RECEIVE_TXN, errors_INSUFFICIENT_ACCOUNT_BALANCE as INSUFFICIENT_ACCOUNT_BALANCE, errors_INSUFFICIENT_MAX_FEE as INSUFFICIENT_MAX_FEE, errors_INVALID_BLOCK_HASH as INVALID_BLOCK_HASH, errors_INVALID_CALL_DATA as INVALID_CALL_DATA, errors_INVALID_CONTINUATION_TOKEN as INVALID_CONTINUATION_TOKEN, errors_INVALID_MESSAGE_SELECTOR as INVALID_MESSAGE_SELECTOR, errors_INVALID_TRANSACTION_NONCE as INVALID_TRANSACTION_NONCE, errors_INVALID_TXN_INDEX as INVALID_TXN_INDEX, errors_NON_ACCOUNT as NON_ACCOUNT, errors_NO_BLOCKS as NO_BLOCKS, errors_NO_TRACE_AVAILABLE as NO_TRACE_AVAILABLE, errors_PAGE_SIZE_TOO_BIG as PAGE_SIZE_TOO_BIG, errors_TOO_MANY_KEYS_IN_FILTER as TOO_MANY_KEYS_IN_FILTER, errors_TRANSACTION_EXECUTION_ERROR as TRANSACTION_EXECUTION_ERROR, errors_TXN_HASH_NOT_FOUND as TXN_HASH_NOT_FOUND, errors_UNEXPECTED_ERROR as UNEXPECTED_ERROR, errors_UNSUPPORTED_CONTRACT_CLASS_VERSION as UNSUPPORTED_CONTRACT_CLASS_VERSION, errors_UNSUPPORTED_TX_VERSION as UNSUPPORTED_TX_VERSION, errors_VALIDATION_FAILURE as VALIDATION_FAILURE };
}

type ValuesType<T extends ReadonlyArray<any> | ArrayLike<any> | Record<any, any>> = T extends ReadonlyArray<any> ? T[number] : T extends ArrayLike<any> ? T[number] : T extends object ? T[keyof T] : never;

/**
 * Types that are not in spec but required for UX
 */

type ContractClass$1 = CONTRACT_CLASS | DEPRECATED_CONTRACT_CLASS;
type SimulateTransaction$1 = {
    transaction_trace: TRANSACTION_TRACE;
    fee_estimation: FEE_ESTIMATE;
};
type SimulateTransactionResponse$1 = SimulateTransaction$1[];
type FeeEstimate$1 = FEE_ESTIMATE;
type TransactionWithHash$1 = TXN & {
    transaction_hash: TXN_HASH$1;
};
type BlockHashAndNumber = {
    block_hash: BLOCK_HASH$1;
    block_number: BLOCK_NUMBER$1;
};
type BlockWithTxs = BLOCK_WITH_TXS | PENDING_BLOCK_WITH_TXS;
type BlockWithTxHashes$1 = BLOCK_WITH_TX_HASHES | PENDING_BLOCK_WITH_TX_HASHES;
type StateUpdate$1 = STATE_UPDATE$1 | PENDING_STATE_UPDATE$1;
type BlockTransactionsTraces = {
    transaction_hash: FELT$1;
    trace_root: TRANSACTION_TRACE;
}[];
type Syncing = false | SYNC_STATUS;
type Events = EVENTS_CHUNK;
type EmittedEvent = EMITTED_EVENT;
type Event = EVENT$1;
type InvokedTransaction$1 = {
    transaction_hash: TXN_HASH$1;
};
type DeclaredTransaction$1 = {
    transaction_hash: TXN_HASH$1;
    class_hash: FELT$1;
};
type DeployedAccountTransaction = {
    transaction_hash: TXN_HASH$1;
    contract_address: FELT$1;
};
type ContractAddress = ADDRESS;
type Felt = FELT$1;
type Nonce$1 = FELT$1;
type TransactionHash = TXN_HASH$1;
type TransactionTrace = TRANSACTION_TRACE;
type BlockHash = BLOCK_HASH$1;
type TransactionReceipt$1 = TXN_RECEIPT | PENDING_TXN_RECEIPT;
type Receipt = TXN_RECEIPT;
type PendingReceipt = PENDING_TXN_RECEIPT;
type EventFilter = EVENT_FILTER & RESULT_PAGE_REQUEST;
type SimulationFlags$1 = Array<SIMULATION_FLAG$1>;
type L1Message = MSG_FROM_L1;
type BaseTransaction = BROADCASTED_TXN;
type ChainId = CHAIN_ID;
type Transaction = TXN;
type TransactionStatus$1 = {
    finality_status: TXN_STATUS;
    execution_status?: TXN_EXECUTION_STATUS;
};
type ResourceBounds$1 = RESOURCE_BOUNDS_MAPPING;
type FeePayment = FEE_PAYMENT;
type PriceUnit = PRICE_UNIT$1;
type StorageDiffs = Array<CONTRACT_STORAGE_DIFF_ITEM>;
type DeprecatedDeclaredClasses = Array<FELT$1>;
type NonceUpdates = NONCE_UPDATE[];
type ReplacedClasses = REPLACED_CLASS[];
declare const ETransactionType: {
    readonly DECLARE: "DECLARE";
    readonly DEPLOY: "DEPLOY";
    readonly DEPLOY_ACCOUNT: "DEPLOY_ACCOUNT";
    readonly INVOKE: "INVOKE";
    readonly L1_HANDLER: "L1_HANDLER";
};
type ETransactionType = ValuesType<typeof ETransactionType>;
declare const ESimulationFlag: {
    readonly SKIP_VALIDATE: "SKIP_VALIDATE";
    readonly SKIP_FEE_CHARGE: "SKIP_FEE_CHARGE";
};
type ESimulationFlag = ValuesType<typeof ESimulationFlag>;
declare const ETransactionStatus: {
    readonly RECEIVED: "RECEIVED";
    readonly REJECTED: "REJECTED";
    readonly ACCEPTED_ON_L2: "ACCEPTED_ON_L2";
    readonly ACCEPTED_ON_L1: "ACCEPTED_ON_L1";
};
type ETransactionStatus = ValuesType<typeof ETransactionStatus>;
declare const ETransactionFinalityStatus: {
    readonly ACCEPTED_ON_L2: "ACCEPTED_ON_L2";
    readonly ACCEPTED_ON_L1: "ACCEPTED_ON_L1";
};
type ETransactionFinalityStatus = ValuesType<typeof ETransactionFinalityStatus>;
declare const ETransactionExecutionStatus: {
    readonly SUCCEEDED: "SUCCEEDED";
    readonly REVERTED: "REVERTED";
};
type ETransactionExecutionStatus = ValuesType<typeof ETransactionExecutionStatus>;
declare const EBlockTag: {
    readonly PENDING: "pending";
    readonly LATEST: "latest";
};
type EBlockTag = ValuesType<typeof EBlockTag>;
declare const EDataAvailabilityMode: {
    readonly L1: "L1";
    readonly L2: "L2";
};
type EDataAvailabilityMode = ValuesType<typeof EDataAvailabilityMode>;
declare const EDAMode: {
    readonly L1: 0;
    readonly L2: 1;
};
type EDAMode = ValuesType<typeof EDAMode>;
/**
 * V_ Transaction versions HexString
 * F_ Fee Transaction Versions HexString (2 ** 128 + TRANSACTION_VERSION)
 */
declare const ETransactionVersion: {
    readonly V0: "0x0";
    readonly V1: "0x1";
    readonly V2: "0x2";
    readonly V3: "0x3";
    readonly F0: "0x100000000000000000000000000000000";
    readonly F1: "0x100000000000000000000000000000001";
    readonly F2: "0x100000000000000000000000000000002";
    readonly F3: "0x100000000000000000000000000000003";
};
type ETransactionVersion = ValuesType<typeof ETransactionVersion>;
/**
 * Old Transaction Versions
 */
declare const ETransactionVersion2: {
    readonly V0: "0x0";
    readonly V1: "0x1";
    readonly V2: "0x2";
    readonly F0: "0x100000000000000000000000000000000";
    readonly F1: "0x100000000000000000000000000000001";
    readonly F2: "0x100000000000000000000000000000002";
};
type ETransactionVersion2 = ValuesType<typeof ETransactionVersion2>;
/**
 * V3 Transaction Versions
 */
declare const ETransactionVersion3: {
    readonly V3: "0x3";
    readonly F3: "0x100000000000000000000000000000003";
};
type ETransactionVersion3 = ValuesType<typeof ETransactionVersion3>;

type ReadMethods = {
    starknet_specVersion: {
        params: [];
        result: string;
    };
    starknet_getBlockWithTxHashes: {
        params: {
            block_id: BLOCK_ID;
        };
        result: BlockWithTxHashes$1;
        errors: BLOCK_NOT_FOUND;
    };
    starknet_getBlockWithTxs: {
        params: {
            block_id: BLOCK_ID;
        };
        result: BlockWithTxs;
        errors: BLOCK_NOT_FOUND;
    };
    starknet_getStateUpdate: {
        params: {
            block_id: BLOCK_ID;
        };
        result: StateUpdate$1;
        errors: BLOCK_NOT_FOUND;
    };
    starknet_getStorageAt: {
        params: {
            contract_address: ADDRESS;
            key: STORAGE_KEY;
            block_id: BLOCK_ID;
        };
        result: FELT$1;
        errors: CONTRACT_NOT_FOUND | BLOCK_NOT_FOUND;
    };
    starknet_getTransactionStatus: {
        params: {
            transaction_hash: TXN_HASH$1;
        };
        result: TransactionStatus$1;
        errors: TXN_HASH_NOT_FOUND;
    };
    starknet_getTransactionByHash: {
        params: {
            transaction_hash: TXN_HASH$1;
        };
        result: TransactionWithHash$1;
        errors: TXN_HASH_NOT_FOUND;
    };
    starknet_getTransactionByBlockIdAndIndex: {
        params: {
            block_id: BLOCK_ID;
            index: number;
        };
        result: TransactionWithHash$1;
        errors: BLOCK_NOT_FOUND | INVALID_TXN_INDEX;
    };
    starknet_getTransactionReceipt: {
        params: {
            transaction_hash: TXN_HASH$1;
        };
        result: TransactionReceipt$1;
        errors: TXN_HASH_NOT_FOUND;
    };
    starknet_getClass: {
        params: {
            block_id: BLOCK_ID;
            class_hash: FELT$1;
        };
        result: ContractClass$1;
        errors: BLOCK_NOT_FOUND | CLASS_HASH_NOT_FOUND;
    };
    starknet_getClassHashAt: {
        params: {
            block_id: BLOCK_ID;
            contract_address: ADDRESS;
        };
        result: FELT$1;
        errors: BLOCK_NOT_FOUND | CONTRACT_NOT_FOUND;
    };
    starknet_getClassAt: {
        params: {
            block_id: BLOCK_ID;
            contract_address: ADDRESS;
        };
        result: ContractClass$1;
        errors: BLOCK_NOT_FOUND | CONTRACT_NOT_FOUND;
    };
    starknet_getBlockTransactionCount: {
        params: {
            block_id: BLOCK_ID;
        };
        result: number;
        errors: BLOCK_NOT_FOUND;
    };
    starknet_call: {
        params: {
            request: FUNCTION_CALL;
            block_id: BLOCK_ID;
        };
        result: FELT$1[];
        errors: CONTRACT_NOT_FOUND | CONTRACT_ERROR | BLOCK_NOT_FOUND;
    };
    starknet_estimateFee: {
        params: {
            request: BROADCASTED_TXN[];
            simulation_flags?: [SIMULATION_FLAG_FOR_ESTIMATE_FEE] | [];
            block_id: BLOCK_ID;
        };
        result: FeeEstimate$1[];
        errors: TRANSACTION_EXECUTION_ERROR | BLOCK_NOT_FOUND;
    };
    starknet_estimateMessageFee: {
        params: {
            message: MSG_FROM_L1;
            block_id: BLOCK_ID;
        };
        result: FeeEstimate$1;
        errors: CONTRACT_ERROR | BLOCK_NOT_FOUND;
    };
    starknet_blockNumber: {
        params: [];
        result: BLOCK_NUMBER$1;
        errors: NO_BLOCKS;
    };
    starknet_blockHashAndNumber: {
        params: [];
        result: BlockHashAndNumber;
        errors: NO_BLOCKS;
    };
    starknet_chainId: {
        params: [];
        result: CHAIN_ID;
    };
    starknet_syncing: {
        params: [];
        result: Syncing;
    };
    starknet_getEvents: {
        params: {
            filter: EVENT_FILTER & RESULT_PAGE_REQUEST;
        };
        result: Events;
        errors: PAGE_SIZE_TOO_BIG | INVALID_CONTINUATION_TOKEN | BLOCK_NOT_FOUND | TOO_MANY_KEYS_IN_FILTER;
    };
    starknet_getNonce: {
        params: {
            block_id: BLOCK_ID;
            contract_address: ADDRESS;
        };
        result: Nonce$1;
        errors: BLOCK_NOT_FOUND | CONTRACT_NOT_FOUND;
    };
};
type WriteMethods = {
    starknet_addInvokeTransaction: {
        params: {
            invoke_transaction: BROADCASTED_INVOKE_TXN;
        };
        result: InvokedTransaction$1;
        errors: INSUFFICIENT_ACCOUNT_BALANCE | INSUFFICIENT_MAX_FEE | INVALID_TRANSACTION_NONCE | VALIDATION_FAILURE | NON_ACCOUNT | DUPLICATE_TX | UNSUPPORTED_TX_VERSION | UNEXPECTED_ERROR;
    };
    starknet_addDeclareTransaction: {
        params: {
            declare_transaction: BROADCASTED_DECLARE_TXN;
        };
        result: DeclaredTransaction$1;
        errors: CLASS_ALREADY_DECLARED | COMPILATION_FAILED | COMPILED_CLASS_HASH_MISMATCH | INSUFFICIENT_ACCOUNT_BALANCE | INSUFFICIENT_MAX_FEE | INVALID_TRANSACTION_NONCE | VALIDATION_FAILURE | NON_ACCOUNT | DUPLICATE_TX | CONTRACT_CLASS_SIZE_IS_TOO_LARGE | UNSUPPORTED_TX_VERSION | UNSUPPORTED_CONTRACT_CLASS_VERSION | UNEXPECTED_ERROR;
    };
    starknet_addDeployAccountTransaction: {
        params: {
            deploy_account_transaction: BROADCASTED_DEPLOY_ACCOUNT_TXN;
        };
        result: DeployedAccountTransaction;
        errors: INSUFFICIENT_ACCOUNT_BALANCE | INSUFFICIENT_MAX_FEE | INVALID_TRANSACTION_NONCE | VALIDATION_FAILURE | NON_ACCOUNT | CLASS_HASH_NOT_FOUND | DUPLICATE_TX | UNSUPPORTED_TX_VERSION | UNEXPECTED_ERROR;
    };
};
type TraceMethods = {
    starknet_traceTransaction: {
        params: {
            transaction_hash: TXN_HASH$1;
        };
        result: TransactionTrace;
        errors: TXN_HASH_NOT_FOUND | NO_TRACE_AVAILABLE;
    };
    starknet_traceBlockTransactions: {
        params: {
            block_id: BLOCK_ID;
        };
        result: BlockTransactionsTraces;
        errors: BLOCK_NOT_FOUND;
    };
    starknet_simulateTransactions: {
        params: {
            block_id: BLOCK_ID;
            transactions: Array<BROADCASTED_TXN>;
            simulation_flags: Array<SIMULATION_FLAG$1>;
        };
        result: SimulateTransactionResponse$1;
        errors: BLOCK_NOT_FOUND | TRANSACTION_EXECUTION_ERROR;
    };
};
type Methods = ReadMethods & WriteMethods & TraceMethods;

/**
 * TypeScript Representation of Cairo1 v2+ Starknet Contract ABI
 *
 * starknet_metadata.json - tags/v0.5.0
 *
 * 'starknet-specs' (OpenRpc protocol types)
 * https://github.com/starkware-libs/starknet-specs
 */
type ABI = Array<FUNCTION | CONSTRUCTOR | L1_HANDLER | EVENT | STRUCT | ENUM | INTERFACE | IMPL>;
type FUNCTION = {
    type: 'function';
    name: string;
    inputs: Array<{
        name: string;
        type: string;
    }>;
    outputs?: Array<{
        type: string;
    }>;
    state_mutability: 'view' | 'external';
};
type CONSTRUCTOR = {
    type: 'constructor';
    name: 'constructor';
    inputs: Array<{
        name: string;
        type: string;
    }>;
};
type L1_HANDLER = {
    type: 'l1_handler';
    name: string;
    inputs: Array<{
        name: string;
        type: string;
    }>;
    outputs?: Array<{
        type: string;
    }>;
    state_mutability: 'view' | 'external';
};
type EVENT = {
    type: 'event';
    name: string;
} & (ENUM_EVENT | STRUCT_EVENT);
type STRUCT_EVENT = {
    kind: 'struct';
    members: Array<EVENT_FIELD>;
};
type ENUM_EVENT = {
    kind: 'enum';
    variants: Array<EVENT_FIELD>;
};
type STRUCT = {
    type: 'struct';
    name: string;
    members: Array<{
        name: string;
        type: string;
    }>;
};
type ENUM = {
    type: 'enum';
    name: string;
    variants: Array<{
        name: string;
        type: string;
    }>;
};
type INTERFACE = {
    type: 'interface';
    name: string;
    items: Array<FUNCTION>;
};
type IMPL = {
    type: 'impl';
    name: string;
    interface_name: string;
};
type EVENT_FIELD = {
    name: string;
    type: string;
    kind: 'key' | 'data' | 'nested';
};

/**
 * version 0.6.0
 */

type index$4_ABI = ABI;
type index$4_BaseTransaction = BaseTransaction;
type index$4_BlockHash = BlockHash;
type index$4_BlockHashAndNumber = BlockHashAndNumber;
type index$4_BlockTransactionsTraces = BlockTransactionsTraces;
type index$4_BlockWithTxs = BlockWithTxs;
type index$4_ChainId = ChainId;
type index$4_ContractAddress = ContractAddress;
type index$4_DeployedAccountTransaction = DeployedAccountTransaction;
type index$4_DeprecatedDeclaredClasses = DeprecatedDeclaredClasses;
type index$4_EBlockTag = EBlockTag;
type index$4_EDAMode = EDAMode;
type index$4_EDataAvailabilityMode = EDataAvailabilityMode;
type index$4_ESimulationFlag = ESimulationFlag;
type index$4_ETransactionExecutionStatus = ETransactionExecutionStatus;
type index$4_ETransactionFinalityStatus = ETransactionFinalityStatus;
type index$4_ETransactionStatus = ETransactionStatus;
type index$4_ETransactionType = ETransactionType;
type index$4_ETransactionVersion = ETransactionVersion;
type index$4_ETransactionVersion2 = ETransactionVersion2;
type index$4_ETransactionVersion3 = ETransactionVersion3;
type index$4_EmittedEvent = EmittedEvent;
type index$4_Event = Event;
type index$4_EventFilter = EventFilter;
type index$4_Events = Events;
type index$4_FeePayment = FeePayment;
type index$4_Felt = Felt;
type index$4_L1Message = L1Message;
type index$4_Methods = Methods;
type index$4_NonceUpdates = NonceUpdates;
type index$4_PendingReceipt = PendingReceipt;
type index$4_PriceUnit = PriceUnit;
type index$4_Receipt = Receipt;
type index$4_ReplacedClasses = ReplacedClasses;
type index$4_StorageDiffs = StorageDiffs;
type index$4_Syncing = Syncing;
type index$4_Transaction = Transaction;
type index$4_TransactionHash = TransactionHash;
type index$4_TransactionTrace = TransactionTrace;
declare namespace index$4 {
  export { type index$4_ABI as ABI, type index$4_BaseTransaction as BaseTransaction, type index$4_BlockHash as BlockHash, type index$4_BlockHashAndNumber as BlockHashAndNumber, type index$4_BlockTransactionsTraces as BlockTransactionsTraces, type BlockWithTxHashes$1 as BlockWithTxHashes, type index$4_BlockWithTxs as BlockWithTxs, type index$4_ChainId as ChainId, type index$4_ContractAddress as ContractAddress, type ContractClass$1 as ContractClass, type DeclaredTransaction$1 as DeclaredTransaction, type index$4_DeployedAccountTransaction as DeployedAccountTransaction, type index$4_DeprecatedDeclaredClasses as DeprecatedDeclaredClasses, type index$4_EBlockTag as EBlockTag, type index$4_EDAMode as EDAMode, type index$4_EDataAvailabilityMode as EDataAvailabilityMode, type index$4_ESimulationFlag as ESimulationFlag, type index$4_ETransactionExecutionStatus as ETransactionExecutionStatus, type index$4_ETransactionFinalityStatus as ETransactionFinalityStatus, type index$4_ETransactionStatus as ETransactionStatus, type index$4_ETransactionType as ETransactionType, type index$4_ETransactionVersion as ETransactionVersion, type index$4_ETransactionVersion2 as ETransactionVersion2, type index$4_ETransactionVersion3 as ETransactionVersion3, type index$4_EmittedEvent as EmittedEvent, errors as Errors, type index$4_Event as Event, type index$4_EventFilter as EventFilter, type index$4_Events as Events, type FeeEstimate$1 as FeeEstimate, type index$4_FeePayment as FeePayment, type index$4_Felt as Felt, type InvokedTransaction$1 as InvokedTransaction, type index$4_L1Message as L1Message, type index$4_Methods as Methods, type Nonce$1 as Nonce, type index$4_NonceUpdates as NonceUpdates, type index$4_PendingReceipt as PendingReceipt, type index$4_PriceUnit as PriceUnit, type index$4_Receipt as Receipt, type index$4_ReplacedClasses as ReplacedClasses, type ResourceBounds$1 as ResourceBounds, components as SPEC, type SimulateTransaction$1 as SimulateTransaction, type SimulateTransactionResponse$1 as SimulateTransactionResponse, type SimulationFlags$1 as SimulationFlags, type StateUpdate$1 as StateUpdate, type index$4_StorageDiffs as StorageDiffs, type index$4_Syncing as Syncing, type index$4_Transaction as Transaction, type index$4_TransactionHash as TransactionHash, type TransactionReceipt$1 as TransactionReceipt, type TransactionStatus$1 as TransactionStatus, type index$4_TransactionTrace as TransactionTrace, type TransactionWithHash$1 as TransactionWithHash };
}

var index$3 = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  JRPC: index$5,
  RPCSPEC06: index$4,
  RPCSPEC07: RPCSPEC07
}, [RPCSPEC07]);

declare const LogLevelIndex: {
    DEBUG: number;
    INFO: number;
    WARN: number;
    ERROR: number;
    FATAL: number;
    OFF: number;
};
type LogLevelIndex = ValuesType<typeof LogLevelIndex>;
type LogLevel = keyof typeof LogLevelIndex;

declare const IS_BROWSER: boolean;
/**
 * Some functions recreated from https://github.com/pedrouid/enc-utils/blob/master/src/index.ts
 * enc-utils is not a dependency to avoid using `Buffer` which only works in node and not browsers
 */
/**
 * Convert array buffer to string
 *
 * *[internal usage]*
 *
 * @param {ArrayBuffer} array The ArrayBuffer to convert to string.
 * @returns {string} The converted string.
 *
 * @example
 * ```typescript
 * const buffer = new ArrayBuffer(5);
 * const view = new Uint8Array(buffer);
 * [72, 101, 108, 108, 111].forEach((x, idx) => view[idx] = x);
 * const result = encode.arrayBufferToString(buffer);
 * // result = "Hello"
 * ```
 */
declare function arrayBufferToString(array: ArrayBuffer): string;
/**
 * Convert utf8-string to Uint8Array
 *
 * *[internal usage]*
 *
 * @param {string} str The UTF-8 string to convert.
 * @returns {Uint8Array} The encoded Uint8Array.
 *
 * @example
 * ```typescript
 * const myString = 'Hi';
 * const result = encode.utf8ToArray(myString);
 * // result = Uint8Array(2) [ 72, 105 ]
 * ```
 */
declare function utf8ToArray(str: string): Uint8Array;
/**
 * Convert utf8-string to Uint8Array
 *
 * @deprecated equivalent to 'utf8ToArray', alias will be removed
 */
declare function stringToArrayBuffer(str: string): Uint8Array;
/**
 * Convert string to array buffer (browser and node compatible)
 *
 * @param {string} a The Base64 encoded string to convert.
 * @returns {Uint8Array} The decoded Uint8Array.
 *
 * @example
 * ```typescript
 * const base64String = 'SGVsbG8='; // 'Hello' in Base64
 * const result = encode.atobUniversal(base64String);
 * // result = Uint8Array(5) [ 72, 101, 108, 108, 111 ]
 * ```
 */
declare function atobUniversal(a: string): Uint8Array;
/**
 * Convert array buffer to string (browser and node compatible)
 *
 * @param {ArrayBuffer} b The Array buffer.
 * @returns {string} The Base64 encoded string.
 *
 * @example
 * ```typescript
 * const buffer = new Uint8Array([72, 101, 108, 108, 111]); // Array with ASCII values for 'Hello'
 * const result = encode.btoaUniversal(buffer);
 * // result = "SGVsbG8="
 * ```
 */
declare function btoaUniversal(b: ArrayBuffer): string;
/**
 * Convert array buffer to hex-string
 *
 * @param {Uint8Array} buffer The encoded Uint8Array.
 * @returns {string} The hex-string
 *
 * @example
 * ```typescript
 * const buffer = new Uint8Array([72, 101, 108, 108, 111]); // Array with ASCII values for 'Hello'
 * const result = encode.buf2hex(buffer);
 * // result = "48656c6c6f"
 * ```
 */
declare function buf2hex(buffer: Uint8Array): string;
/**
 * Remove hex prefix '0x' from hex-string
 * @param hex hex-string
 * @returns {string} The hex-string
 *
 * @example
 * ```typescript
 * const hexStringWithPrefix = '0x48656c6c6f';
 * const result = encode.removeHexPrefix(hexStringWithPrefix);
 * // result: "48656c6c6f"
 * ```
 */
declare function removeHexPrefix(hex: string): string;
/**
 * Add hex prefix '0x' to base16-string
 * @param hex base16-string
 * @returns {string} The hex-string
 *
 * @example
 * ```typescript
 * const plainHexString = '48656c6c6f';
 * const result = encode.addHexPrefix(plainHexString);
 * // result: "0x48656c6c6f"
 * ```
 */
declare function addHexPrefix(hex: string): string;
/**
 * Prepend string (default with '0')
 *
 * Pads a string to a certain length with a specific string.
 * The padding can be applied only to the left of the input string.
 *
 * @param {string} str The string to pad.
 * @param {number} length The target length for the padded string.
 * @param {string} [padding='0'] The string to use for padding. Defaults to '0'.
 * @returns {string} The padded string.
 * @example
 * ```typescript
 * const myString = '1A3F';
 * const result = encode.padLeft(myString, 10);
 * // result: '0000001A3F'
 * ```
 */
declare function padLeft(str: string, length: number, padding?: string): string;
/**
 * Calculate byte length of string
 *
 * *[no internal usage]*
 *
 * Calculates the byte length of a string based on a specified byte size.
 * The function rounds up the byte count to the nearest multiple of the specified byte size.
 *
 * @param {string} str The string whose byte length is to be calculated.
 * @param {number} [byteSize='8'] The size of the byte block to round up to. Defaults to 8.
 * @returns {number} The calculated byte length, rounded to the nearest multiple of byteSize.
 *
 * @example
 * ```typescript
 * const myString = 'Hello';
 * const result = encode.calcByteLength(myString, 4);
 * // result = 8 (rounded up to the nearest multiple of 4)
 *
 * ```
 */
declare function calcByteLength(str: string, byteSize?: number): number;
/**
 * Prepend '0' to string bytes
 *
 * *[no internal usage]*
 *
 *
 * * Prepends padding to the left of a string to ensure it matches a specific byte length.
 * The function uses a specified padding character and rounds up the string length to the nearest multiple of `byteSize`.
 *
 * @param {string} str The string to be padded.
 * @param {number} [byteSize='8'] The byte block size to which the string length should be rounded up. Defaults to 8.
 * @param {string} [padding='0'] The character to use for padding. Defaults to '0'.
 * @returns {string} The padded string.
 *
 * @example
 * ```typescript
 * const myString = '123';
 * const result = encode.sanitizeBytes(myString);
 * // result: '00000123' (padded to 8 characters)
 * ```
 */
declare function sanitizeBytes(str: string, byteSize?: number, padding?: string): string;
/**
 * Sanitizes a hex-string by removing any existing '0x' prefix, padding the string with '0' to ensure it has even length,
 * and then re-adding the '0x' prefix.
 *
 * *[no internal usage]*
 * @param {string} hex hex-string
 * @returns {string} format: hex-string
 *
 * @example
 * ```typescript
 * const unevenHex = '0x23abc';
 * const result = encode.sanitizeHex(unevenHex);
 * // result = '0x023abc' (padded to ensure even length)
 * ```
 */
declare function sanitizeHex(hex: string): string;
/**
 * String transformation util
 *
 * Pascal case to screaming snake case
 *
 * @param {string} text The PascalCase string to convert.
 * @returns {string} The converted snake_case string in uppercase.
 *
 * @example
 * ```typescript
 * const pascalString = 'PascalCaseExample';
 * const result = encode.pascalToSnake(pascalString);
 * // result: 'PASCAL_CASE_EXAMPLE'
 * ```
 */
declare const pascalToSnake: (text: string) => string;
/**
 * Combine multiple Uint8Arrays into one.
 * Useful for wallet path creation.
 * @param {Uint8Array[]} uint8arrays An array of Uint8Array.
 * @returns {Uint8Array} all the Uint8Arrays joined.
 * @example
 * ```typescript
 * const path0buff = new Uint8Array([128, 0, 10, 85]);
 * const path1buff = new Uint8Array([71, 65, 233, 201]);
 * const result = encode.concatenateArrayBuffer([path0buff, path1buff]);
 * // result = Uint8Array(8) [128, 0, 10, 85, 71, 65, 233, 201]
 * ```
 */
declare function concatenateArrayBuffer(uint8arrays: Uint8Array[]): Uint8Array;

declare const encode_IS_BROWSER: typeof IS_BROWSER;
declare const encode_addHexPrefix: typeof addHexPrefix;
declare const encode_arrayBufferToString: typeof arrayBufferToString;
declare const encode_atobUniversal: typeof atobUniversal;
declare const encode_btoaUniversal: typeof btoaUniversal;
declare const encode_buf2hex: typeof buf2hex;
declare const encode_calcByteLength: typeof calcByteLength;
declare const encode_concatenateArrayBuffer: typeof concatenateArrayBuffer;
declare const encode_padLeft: typeof padLeft;
declare const encode_pascalToSnake: typeof pascalToSnake;
declare const encode_removeHexPrefix: typeof removeHexPrefix;
declare const encode_sanitizeBytes: typeof sanitizeBytes;
declare const encode_sanitizeHex: typeof sanitizeHex;
declare const encode_stringToArrayBuffer: typeof stringToArrayBuffer;
declare const encode_utf8ToArray: typeof utf8ToArray;
declare namespace encode {
  export { encode_IS_BROWSER as IS_BROWSER, encode_addHexPrefix as addHexPrefix, encode_arrayBufferToString as arrayBufferToString, encode_atobUniversal as atobUniversal, encode_btoaUniversal as btoaUniversal, encode_buf2hex as buf2hex, encode_calcByteLength as calcByteLength, encode_concatenateArrayBuffer as concatenateArrayBuffer, encode_padLeft as padLeft, encode_pascalToSnake as pascalToSnake, encode_removeHexPrefix as removeHexPrefix, encode_sanitizeBytes as sanitizeBytes, encode_sanitizeHex as sanitizeHex, encode_stringToArrayBuffer as stringToArrayBuffer, encode_utf8ToArray as utf8ToArray };
}

/**
 * Cairo Felt support storing max 31 character
 */
declare const TEXT_TO_FELT_MAX_LEN = 31;

declare const ZERO = 0n;
declare const MASK_250: bigint;
declare const MASK_31: bigint;
declare const API_VERSION = 0n;
declare const PRIME: bigint;
declare const MAX_STORAGE_ITEM_SIZE = 256n;
declare const ADDR_BOUND: bigint;
declare const RANGE_FELT: {
    readonly min: bigint;
    readonly max: bigint;
};
declare const RANGE_I128: {
    readonly min: bigint;
    readonly max: bigint;
};
declare const RANGE_U128: {
    readonly min: bigint;
    readonly max: bigint;
};
declare enum BaseUrl {
    SN_MAIN = "https://alpha-mainnet.starknet.io",
    SN_SEPOLIA = "https://alpha-sepolia.starknet.io"
}
declare enum NetworkName {
    SN_MAIN = "SN_MAIN",
    SN_SEPOLIA = "SN_SEPOLIA"
}
declare enum StarknetChainId {
    SN_MAIN = "0x534e5f4d41494e",// encodeShortString('SN_MAIN'),
    SN_SEPOLIA = "0x534e5f5345504f4c4941"
}
declare enum TransactionHashPrefix {
    DECLARE = "0x6465636c617265",// encodeShortString('declare'),
    DEPLOY = "0x6465706c6f79",// encodeShortString('deploy'),
    DEPLOY_ACCOUNT = "0x6465706c6f795f6163636f756e74",// encodeShortString('deploy_account'),
    INVOKE = "0x696e766f6b65",// encodeShortString('invoke'),
    L1_HANDLER = "0x6c315f68616e646c6572"
}
declare const enum FeeMarginPercentage {
    L1_BOUND_MAX_AMOUNT = 50,
    L1_BOUND_MAX_PRICE_PER_UNIT = 50,
    MAX_FEE = 50
}
declare const UDC: {
    readonly ADDRESS: "0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf";
    readonly ENTRYPOINT: "deployContract";
};
declare const RPC_DEFAULT_VERSION = "v0_7";
declare const RPC_NODES: {
    readonly SN_MAIN: readonly ["https://starknet-mainnet.public.blastapi.io/rpc/v0_7", "https://free-rpc.nethermind.io/mainnet-juno/v0_7"];
    readonly SN_SEPOLIA: readonly ["https://starknet-sepolia.public.blastapi.io/rpc/v0_7", "https://free-rpc.nethermind.io/sepolia-juno/v0_7"];
};
declare const OutsideExecutionCallerAny = "0x414e595f43414c4c4552";
declare const SNIP9_V1_INTERFACE_ID = "0x68cfd18b92d1907b8ba3cc324900277f5a3622099431ea85dd8089255e4181";
declare const SNIP9_V2_INTERFACE_ID = "0x1d1144bb2138366ff28d8e9ab57456b1d332ac42196230c3a602003c89872";
declare const HARDENING_BYTE = 128;
declare const HARDENING_4BYTES = 2147483648n;
declare const DEFAULT_GLOBAL_CONFIG: {
    legacyMode: boolean;
    logLevel: LogLevel;
    accountTxVersion: typeof ETransactionVersion$1.V2 | typeof ETransactionVersion$1.V3;
};
declare const SYSTEM_MESSAGES: {
    legacyTxWarningMessage: string;
};

declare const constants_ADDR_BOUND: typeof ADDR_BOUND;
declare const constants_API_VERSION: typeof API_VERSION;
type constants_BaseUrl = BaseUrl;
declare const constants_BaseUrl: typeof BaseUrl;
declare const constants_DEFAULT_GLOBAL_CONFIG: typeof DEFAULT_GLOBAL_CONFIG;
type constants_FeeMarginPercentage = FeeMarginPercentage;
declare const constants_FeeMarginPercentage: typeof FeeMarginPercentage;
declare const constants_HARDENING_4BYTES: typeof HARDENING_4BYTES;
declare const constants_HARDENING_BYTE: typeof HARDENING_BYTE;
declare const constants_IS_BROWSER: typeof IS_BROWSER;
declare const constants_MASK_250: typeof MASK_250;
declare const constants_MASK_31: typeof MASK_31;
declare const constants_MAX_STORAGE_ITEM_SIZE: typeof MAX_STORAGE_ITEM_SIZE;
type constants_NetworkName = NetworkName;
declare const constants_NetworkName: typeof NetworkName;
declare const constants_OutsideExecutionCallerAny: typeof OutsideExecutionCallerAny;
declare const constants_PRIME: typeof PRIME;
declare const constants_RANGE_FELT: typeof RANGE_FELT;
declare const constants_RANGE_I128: typeof RANGE_I128;
declare const constants_RANGE_U128: typeof RANGE_U128;
declare const constants_RPC_DEFAULT_VERSION: typeof RPC_DEFAULT_VERSION;
declare const constants_RPC_NODES: typeof RPC_NODES;
declare const constants_SNIP9_V1_INTERFACE_ID: typeof SNIP9_V1_INTERFACE_ID;
declare const constants_SNIP9_V2_INTERFACE_ID: typeof SNIP9_V2_INTERFACE_ID;
declare const constants_SYSTEM_MESSAGES: typeof SYSTEM_MESSAGES;
type constants_StarknetChainId = StarknetChainId;
declare const constants_StarknetChainId: typeof StarknetChainId;
declare const constants_TEXT_TO_FELT_MAX_LEN: typeof TEXT_TO_FELT_MAX_LEN;
type constants_TransactionHashPrefix = TransactionHashPrefix;
declare const constants_TransactionHashPrefix: typeof TransactionHashPrefix;
declare const constants_UDC: typeof UDC;
declare const constants_ZERO: typeof ZERO;
declare namespace constants {
  export { constants_ADDR_BOUND as ADDR_BOUND, constants_API_VERSION as API_VERSION, constants_BaseUrl as BaseUrl, constants_DEFAULT_GLOBAL_CONFIG as DEFAULT_GLOBAL_CONFIG, constants_FeeMarginPercentage as FeeMarginPercentage, constants_HARDENING_4BYTES as HARDENING_4BYTES, constants_HARDENING_BYTE as HARDENING_BYTE, constants_IS_BROWSER as IS_BROWSER, constants_MASK_250 as MASK_250, constants_MASK_31 as MASK_31, constants_MAX_STORAGE_ITEM_SIZE as MAX_STORAGE_ITEM_SIZE, constants_NetworkName as NetworkName, constants_OutsideExecutionCallerAny as OutsideExecutionCallerAny, constants_PRIME as PRIME, constants_RANGE_FELT as RANGE_FELT, constants_RANGE_I128 as RANGE_I128, constants_RANGE_U128 as RANGE_U128, constants_RPC_DEFAULT_VERSION as RPC_DEFAULT_VERSION, constants_RPC_NODES as RPC_NODES, constants_SNIP9_V1_INTERFACE_ID as SNIP9_V1_INTERFACE_ID, constants_SNIP9_V2_INTERFACE_ID as SNIP9_V2_INTERFACE_ID, constants_SYSTEM_MESSAGES as SYSTEM_MESSAGES, constants_StarknetChainId as StarknetChainId, constants_TEXT_TO_FELT_MAX_LEN as TEXT_TO_FELT_MAX_LEN, ETransactionVersion$1 as TRANSACTION_VERSION, constants_TransactionHashPrefix as TransactionHashPrefix, constants_UDC as UDC, constants_ZERO as ZERO };
}

declare const ec_weierstrass: typeof weierstrass;
declare namespace ec {
  export { starknet as starkCurve, ec_weierstrass as weierstrass };
}

type CairoEnumRaw = Record<string, any>;
/**
 * Class to handle Cairo custom Enum
 * @param enumContent object containing the variants and its content. Example :
 *  {Success: 234, Warning: undefined, Error: undefined}.
 *  Only one variant with a value, object, array.
 * @returns an instance representing a Cairo custom Enum.
 * @example
 * ```typescript
 * const myCairoEnum = new CairoCustomEnum( {Success: undefined, Warning: "0x7f32ea", Error: undefined})
 * ```
 */
declare class CairoCustomEnum {
    /**
     * direct readonly access to variants of the Cairo Custom Enum.
     * @returns a value of type any
     * @example
     * ```typescript
     * const successValue = myCairoEnum.variant.Success;
     */
    readonly variant: CairoEnumRaw;
    /**
     * @param enumContent an object with the variants as keys and the content as value. Only one content shall be defined.
     */
    constructor(enumContent: CairoEnumRaw);
    /**
     *
     * @returns the content of the valid variant of a Cairo custom Enum.
     */
    unwrap(): any;
    /**
     *
     * @returns the name of the valid variant of a Cairo custom Enum.
     */
    activeVariant(): string;
}

declare const CairoOptionVariant: {
    readonly Some: 0;
    readonly None: 1;
};
type CairoOptionVariant = ValuesType<typeof CairoOptionVariant>;
/**
 * Class to handle Cairo Option
 * @param variant CairoOptionVariant.Some or CairoOptionVariant.None
 * @param content value of type T.
 * @returns an instance representing a Cairo Option.
 * @example
 * ```typescript
 * const myOption = new CairoOption<BigNumberish>(CairoOptionVariant.Some, "0x54dda8");
 * ```
 */
declare class CairoOption<T> {
    readonly Some?: T;
    readonly None?: boolean;
    constructor(variant: CairoOptionVariant | number, content?: T);
    /**
     *
     * @returns the content of the valid variant of a Cairo custom Enum.
     *  If None, returns 'undefined'.
     */
    unwrap(): T | undefined;
    /**
     *
     * @returns true if the valid variant is 'isSome'.
     */
    isSome(): boolean;
    /**
     *
     * @returns true if the valid variant is 'isNone'.
     */
    isNone(): boolean;
}

declare const CairoResultVariant: {
    readonly Ok: 0;
    readonly Err: 1;
};
type CairoResultVariant = ValuesType<typeof CairoResultVariant>;
/**
 * Class to handle Cairo Result
 * @param variant CairoResultVariant.Ok or CairoResultVariant.Err
 * @param resultContent value of type T or U.
 * @returns an instance representing a Cairo Result.
 * @example
 * ```typescript
 * const myOption = new CairoResult<BigNumberish, CustomError>(CairoResultVariant.Ok, "0x54dda8");
 * ```
 */
declare class CairoResult<T, U> {
    readonly Ok?: T;
    readonly Err?: U;
    constructor(variant: CairoResultVariant | number, resultContent: T | U);
    /**
     *
     * @returns the content of the valid variant of a Cairo Result.
     */
    unwrap(): T | U;
    /**
     *
     * @returns true if the valid variant is 'Ok'.
     */
    isOk(): boolean;
    /**
     *
     * @returns true if the valid variant is 'isErr'.
     */
    isErr(): boolean;
}

type CairoEnum = CairoCustomEnum | CairoOption<any> | CairoResult<any, any>;

/** ABI */
type Abi = ReadonlyArray<FunctionAbi | AbiEvent | AbiStruct | InterfaceAbi | any>;
type AbiEntry = {
    name: string;
    type: 'felt' | 'felt*' | 'event' | string;
};
type EventEntry = {
    name: string;
    type: 'felt' | 'felt*' | string;
    kind: 'key' | 'data';
};
type FunctionAbiType = 'function' | 'l1_handler' | 'constructor';
type FunctionAbi = {
    inputs: AbiEntry[];
    name: string;
    outputs: AbiEntry[];
    stateMutability?: 'view';
    state_mutability?: string;
    type: FunctionAbiType;
};
type AbiStructs = {
    [name: string]: AbiStruct;
};
type AbiStruct = {
    members: (AbiEntry & {
        offset: number;
    })[];
    name: string;
    size: number;
    type: 'struct';
};
type AbiInterfaces = {
    [name: string]: InterfaceAbi;
};
type InterfaceAbi = {
    items: FunctionAbi[];
    name: string;
    type: 'interface';
};
type AbiEnums = {
    [name: string]: AbiEnum;
};
type AbiEnum = {
    variants: (AbiEntry & {
        offset: number;
    })[];
    name: string;
    size: number;
    type: 'enum';
};
type AbiEvents = {
    [hash: string]: AbiEvent;
};
type AbiEvent = CairoEvent | LegacyEvent;
type CairoEvent = CairoEventDefinition | AbiEvents;
type CairoEventDefinition = STRUCT_EVENT$1 & {
    name: string;
    type: 'event';
};
type CairoEventVariant = ENUM_EVENT$1 & {
    name: string;
    type: string;
};
type LegacyEvent = {
    name: string;
    type: 'event';
    data: EVENT_FIELD$1[];
    keys: EVENT_FIELD$1[];
};

/** LEGACY CONTRACT */
/**
 * format produced after compressing 'program' property
 */
type LegacyContractClass = {
    program: CompressedProgram;
    entry_points_by_type: EntryPointsByType;
    abi: Abi;
};
/**
 * format produced after compiling .cairo to .json
 */
type LegacyCompiledContract = Omit<LegacyContractClass, 'program'> & {
    program: Program;
};
/** SUBTYPES */
type Builtins = string[];
type CompressedProgram = string;
type EntryPointsByType = {
    CONSTRUCTOR: ContractEntryPointFields[];
    EXTERNAL: ContractEntryPointFields[];
    L1_HANDLER: ContractEntryPointFields[];
};
type ContractEntryPointFields = {
    selector: string;
    offset: string | number;
    builtins?: Builtins;
};
interface Program extends Record<string, any> {
    builtins: string[];
    data: string[];
}

/** SYSTEM TYPES */
type CairoAssembly = {
    prime: string;
    compiler_version: string;
    bytecode: ByteCode;
    hints: any[];
    pythonic_hints?: PythonicHints;
    bytecode_segment_lengths?: number[];
    entry_points_by_type: EntryPointsByType;
};
/** COMPILED CONTRACT */
/**
 * format produced after starknet-compile .cairo to .json
 *
 * sierra_program is hex array
 */
type CompiledSierra = {
    sierra_program: ByteCode;
    sierra_program_debug_info?: SierraProgramDebugInfo;
    contract_class_version: string;
    entry_points_by_type: SierraEntryPointsByType;
    abi: Abi;
};
/**
 * format produced after compressing 'sierra_program', stringifies 'abi' property and omit sierra_program_debug_info
 *
 * CompressedCompiledSierra
 */
type SierraContractClass = Omit<CompiledSierra, 'abi' | 'sierra_program_debug_info'> & {
    sierra_program: string;
    abi: string;
};
type CompiledSierraCasm = CairoAssembly;
/** SUBTYPES */
type ByteCode = string[];
type PythonicHints = [number, string[]][];
type SierraProgramDebugInfo = {
    type_names: [number, string][];
    libfunc_names: [number, string][];
    user_func_names: [number, string][];
};
type SierraEntryPointsByType = {
    CONSTRUCTOR: SierraContractEntryPointFields[];
    EXTERNAL: SierraContractEntryPointFields[];
    L1_HANDLER: SierraContractEntryPointFields[];
};
type SierraContractEntryPointFields = {
    selector: string;
    function_idx: number;
};

/**
 * format produced after compressing compiled contract
 *
 * CompressedCompiledContract
 */
type ContractClass = LegacyContractClass | SierraContractClass;
/**
 * format produced after compile .cairo to .json
 */
type CompiledContract = LegacyCompiledContract | CompiledSierra;
/**
 * Compressed or decompressed Cairo0 or Cairo1 Contract
 */
type CairoContract = ContractClass | CompiledContract;
declare const EntryPointType: {
    readonly EXTERNAL: "EXTERNAL";
    readonly L1_HANDLER: "L1_HANDLER";
    readonly CONSTRUCTOR: "CONSTRUCTOR";
};
type EntryPointType = ValuesType<typeof EntryPointType>;

type WeierstrassSignatureType = weierstrass.SignatureType;
type ArraySignatureType = string[];
type Signature = ArraySignatureType | WeierstrassSignatureType;
type BigNumberish = string | number | bigint;
type ByteArray = {
    data: BigNumberish[];
    pending_word: BigNumberish;
    pending_word_len: BigNumberish;
};
/**
 * Compiled calldata ready to be sent
 *
 * decimal-string array
 */
type Calldata = string[] & {
    readonly __compiled__?: true;
};
/**
 * Represents an integer in the range [0, 2^256)
 */
interface Uint256 {
    low: BigNumberish;
    high: BigNumberish;
}
/**
 * Represents an integer in the range [0, 2^256)
 */
interface Uint512 {
    limb0: BigNumberish;
    limb1: BigNumberish;
    limb2: BigNumberish;
    limb3: BigNumberish;
}
/**
 * BigNumberish array
 *
 * use CallData.compile() to convert to Calldata
 */
type RawCalldata = BigNumberish[];
/**
 * Hexadecimal-string array
 */
type HexCalldata = string[];
type AllowArray<T> = T | T[];
type OptionalPayload<T> = {
    payload: T;
} | T;
type RawArgs = RawArgsObject | RawArgsArray;
type RawArgsObject = {
    [inputName: string]: MultiType | MultiType[] | RawArgs;
};
type RawArgsArray = Array<MultiType | MultiType[] | RawArgs>;
type MultiType = BigNumberish | Uint256 | object | boolean | CairoEnum;
type UniversalDeployerContractPayload = {
    classHash: BigNumberish;
    salt?: string;
    unique?: boolean;
    constructorCalldata?: RawArgs;
};
type DeployAccountContractPayload = {
    classHash: string;
    constructorCalldata?: RawArgs;
    addressSalt?: BigNumberish;
    contractAddress?: string;
};
type DeployAccountContractTransaction = Omit<DeployAccountContractPayload, 'contractAddress'> & {
    signature?: Signature;
};
type DeclareContractPayload = {
    contract: CompiledContract | string;
    classHash?: string;
    casm?: CompiledSierraCasm;
    compiledClassHash?: string;
};
/**
 * DeclareContractPayload with classHash or contract defined
 */
type ContractClassIdentifier = DeclareContractPayload | {
    classHash: string;
};
type CompleteDeclareContractPayload = {
    contract: CompiledContract | string;
    classHash: string;
    casm?: CompiledSierraCasm;
    compiledClassHash?: string;
};
type DeclareAndDeployContractPayload = Omit<UniversalDeployerContractPayload, 'classHash'> & DeclareContractPayload;
type DeclareContractTransaction = {
    contract: ContractClass;
    senderAddress: string;
    signature?: Signature;
    compiledClassHash?: string;
};
type CallDetails = {
    contractAddress: string;
    calldata?: RawArgs | Calldata;
    entrypoint?: string;
};
type Invocation = CallDetails & {
    signature?: Signature;
};
type Call = CallDetails & {
    entrypoint: string;
};
type CairoVersion = '0' | '1' | undefined;
type CompilerVersion = '0' | '1' | '2' | undefined;
type InvocationsDetails = {
    nonce?: BigNumberish;
    maxFee?: BigNumberish;
    version?: BigNumberish;
} & Partial<V3TransactionDetails>;
type V3TransactionDetails = {
    nonce: BigNumberish;
    version: BigNumberish;
    resourceBounds: ResourceBounds$2;
    tip: BigNumberish;
    paymasterData: BigNumberish[];
    accountDeploymentData: BigNumberish[];
    nonceDataAvailabilityMode: EDataAvailabilityMode$1;
    feeDataAvailabilityMode: EDataAvailabilityMode$1;
};
/**
 * Contain all additional details params
 */
type Details = {
    nonce: BigNumberish;
    maxFee: BigNumberish;
    version: BigNumberish;
    chainId: StarknetChainId;
};
type InvocationsDetailsWithNonce = (InvocationsDetails & {
    nonce: BigNumberish;
}) | V3TransactionDetails;
declare const TransactionType: {
    readonly DECLARE: "DECLARE";
    readonly DEPLOY: "DEPLOY";
    readonly DEPLOY_ACCOUNT: "DEPLOY_ACCOUNT";
    readonly INVOKE: "INVOKE_FUNCTION";
};
type TransactionType = ValuesType<typeof TransactionType>;
/**
 * new statuses are defined by props: finality_status and execution_status
 * to be #deprecated
 */
declare const TransactionStatus: {
    readonly NOT_RECEIVED: "NOT_RECEIVED";
    readonly RECEIVED: "RECEIVED";
    readonly ACCEPTED_ON_L2: "ACCEPTED_ON_L2";
    readonly ACCEPTED_ON_L1: "ACCEPTED_ON_L1";
    readonly REJECTED: "REJECTED";
    readonly REVERTED: "REVERTED";
};
type TransactionStatus = ValuesType<typeof TransactionStatus>;
declare const TransactionFinalityStatus: {
    readonly NOT_RECEIVED: "NOT_RECEIVED";
    readonly RECEIVED: "RECEIVED";
    readonly ACCEPTED_ON_L2: "ACCEPTED_ON_L2";
    readonly ACCEPTED_ON_L1: "ACCEPTED_ON_L1";
};
type TransactionFinalityStatus = ValuesType<typeof TransactionFinalityStatus>;
declare const TransactionExecutionStatus: {
    readonly REJECTED: "REJECTED";
    readonly REVERTED: "REVERTED";
    readonly SUCCEEDED: "SUCCEEDED";
};
type TransactionExecutionStatus = ValuesType<typeof TransactionExecutionStatus>;
declare const BlockStatus: {
    readonly PENDING: "PENDING";
    readonly ACCEPTED_ON_L1: "ACCEPTED_ON_L1";
    readonly ACCEPTED_ON_L2: "ACCEPTED_ON_L2";
    readonly REJECTED: "REJECTED";
};
type BlockStatus = ValuesType<typeof BlockStatus>;
declare const BlockTag: {
    readonly PENDING: "pending";
    readonly LATEST: "latest";
};
type BlockTag = ValuesType<typeof BlockTag>;
type BlockNumber = BlockTag | null | number;
/**
 * hex string and BigInt are detected as block hashes
 *
 * decimal string and number are detected as block numbers
 *
 * text string are detected as block tag
 *
 * null return 'pending' block tag
 */
type BlockIdentifier = BlockNumber | BigNumberish;
/**
 * items used by AccountInvocations
 */
type AccountInvocationItem = (({
    type: typeof TransactionType.DECLARE;
} & DeclareContractTransaction) | ({
    type: typeof TransactionType.DEPLOY_ACCOUNT;
} & DeployAccountContractTransaction) | ({
    type: typeof TransactionType.INVOKE;
} & Invocation)) & InvocationsDetailsWithNonce;
/**
 * Complete invocations array with account details (internal type from account -> provider)
 */
type AccountInvocations = AccountInvocationItem[];
/**
 * Invocations array user provide to bulk method (simulate)
 */
type Invocations = Array<({
    type: typeof TransactionType.DECLARE;
} & OptionalPayload<DeclareContractPayload>) | ({
    type: typeof TransactionType.DEPLOY;
} & OptionalPayload<AllowArray<UniversalDeployerContractPayload>>) | ({
    type: typeof TransactionType.DEPLOY_ACCOUNT;
} & OptionalPayload<DeployAccountContractPayload>) | ({
    type: typeof TransactionType.INVOKE;
} & OptionalPayload<AllowArray<Call>>)>;
type Tupled = {
    element: any;
    type: string;
};
type Args = {
    [inputName: string]: BigNumberish | BigNumberish[] | ParsedStruct | ParsedStruct[];
};
type ParsedStruct = {
    [key: string]: BigNumberish | BigNumberish[] | ParsedStruct | Uint256;
};
type waitForTransactionOptions = {
    retryInterval?: number;
    successStates?: Array<TransactionFinalityStatus | TransactionExecutionStatus>;
    errorStates?: Array<TransactionFinalityStatus | TransactionExecutionStatus>;
};
type getSimulateTransactionOptions = {
    blockIdentifier?: BlockIdentifier;
    skipValidate?: boolean;
    skipExecute?: boolean;
    skipFeeCharge?: boolean;
};
type getContractVersionOptions = {
    blockIdentifier?: BlockIdentifier;
    compiler?: boolean;
};
type getEstimateFeeBulkOptions = {
    blockIdentifier?: BlockIdentifier;
    skipValidate?: boolean;
};
interface CallStruct {
    to: string;
    selector: string;
    calldata: string[];
}
/**
 * Represent Contract version
 */
type ContractVersion = {
    /** version of the cairo language */
    cairo: CairoVersion;
    /** version of the cairo compiler used to compile the contract */
    compiler: CompilerVersion;
};

interface ProviderOptions extends RpcProviderOptions {
}
type RpcProviderOptions = {
    nodeUrl?: string | NetworkName;
    retries?: number;
    transactionRetryIntervalFallback?: number;
    headers?: object;
    blockIdentifier?: BlockIdentifier;
    chainId?: StarknetChainId;
    specVersion?: string;
    default?: boolean;
    waitMode?: boolean;
    baseFetch?: WindowOrWorkerGlobalScope['fetch'];
    feeMarginPercentage?: {
        l1BoundMaxAmount: number;
        l1BoundMaxPricePerUnit: number;
        maxFee: number;
    };
    batch?: false | number;
};

type Simplify<T> = {
    [K in keyof T]: T[K];
} & {};
type RequiredKeysOf<T extends object> = Exclude<{
    [K in keyof T]: T extends Record<K, T[K]> ? K : never;
}[keyof T], undefined>;
type ArrayElement<T> = T extends Array<infer U> ? U : never;
type MergeProperties<T1 extends Record<any, any>, T2 extends Record<any, any>> = {
    [K in RequiredKeysOf<T1> & RequiredKeysOf<T2>]: Merge<T1[K], T2[K]>;
} & {
    [K in keyof T1 & keyof T2]?: Merge<T1[K], T2[K]>;
} & {
    [K in Exclude<keyof T1, keyof T2>]?: T1[K];
} & {
    [K in Exclude<keyof T2, keyof T1>]?: T2[K];
};
type Merge<T1, T2> = Simplify<T1 extends Array<any> ? T2 extends Array<any> ? Array<Merge<ArrayElement<T1>, ArrayElement<T2>>> : T1 : T2 extends Array<any> ? T2 : T1 extends object ? T2 extends object ? MergeProperties<T1, T2> : T1 : T2 extends object ? T2 : T1 | T2>;
type BLOCK_HASH = Merge<BLOCK_HASH$1, RPCSPEC07.SPEC.BLOCK_HASH>;
type BLOCK_NUMBER = Merge<BLOCK_NUMBER$1, RPCSPEC07.SPEC.BLOCK_NUMBER>;
type FELT = Merge<FELT$1, RPCSPEC07.SPEC.FELT>;
type TXN_HASH = Merge<TXN_HASH$1, RPCSPEC07.SPEC.TXN_HASH>;
type PRICE_UNIT = Merge<PRICE_UNIT$1, RPCSPEC07.SPEC.PRICE_UNIT>;
type RESOURCE_PRICE = Merge<RESOURCE_PRICE$1, RPCSPEC07.SPEC.RESOURCE_PRICE>;
type SIMULATION_FLAG = Merge<SIMULATION_FLAG$1, RPCSPEC07.SPEC.SIMULATION_FLAG>;
type STATE_UPDATE = Merge<STATE_UPDATE$1, RPCSPEC07.SPEC.STATE_UPDATE>;
type PENDING_STATE_UPDATE = Merge<PENDING_STATE_UPDATE$1, RPCSPEC07.SPEC.PENDING_STATE_UPDATE>;
type INVOKE_TXN_RECEIPT = Merge<INVOKE_TXN_RECEIPT$1, RPCSPEC07.SPEC.INVOKE_TXN_RECEIPT & RPCSPEC07.BlockHashAndNumber>;
type DECLARE_TXN_RECEIPT = Merge<DECLARE_TXN_RECEIPT$1, RPCSPEC07.SPEC.DECLARE_TXN_RECEIPT & RPCSPEC07.BlockHashAndNumber>;
type DEPLOY_ACCOUNT_TXN_RECEIPT = Merge<DEPLOY_ACCOUNT_TXN_RECEIPT$1, RPCSPEC07.SPEC.DEPLOY_ACCOUNT_TXN_RECEIPT & RPCSPEC07.BlockHashAndNumber>;
type L1_HANDLER_TXN_RECEIPT = Merge<L1_HANDLER_TXN_RECEIPT$1, RPCSPEC07.SPEC.L1_HANDLER_TXN_RECEIPT & RPCSPEC07.BlockHashAndNumber>;
type PENDING_INVOKE_TXN_RECEIPT = Merge<PENDING_INVOKE_TXN_RECEIPT$1, RPCSPEC07.SPEC.INVOKE_TXN_RECEIPT>;
type PENDING_DECLARE_TXN_RECEIPT = Merge<PENDING_DECLARE_TXN_RECEIPT$1, RPCSPEC07.SPEC.DECLARE_TXN_RECEIPT>;
type PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT = Merge<PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT$1, RPCSPEC07.SPEC.DEPLOY_ACCOUNT_TXN_RECEIPT>;
type PENDING_L1_HANDLER_TXN_RECEIPT = Merge<PENDING_L1_HANDLER_TXN_RECEIPT$1, RPCSPEC07.SPEC.L1_HANDLER_TXN_RECEIPT>;
type BlockWithTxHashes = Merge<BlockWithTxHashes$1, RPCSPEC07.BlockWithTxHashes>;
type ContractClassPayload = Merge<ContractClass$1, RPCSPEC07.ContractClass>;
type DeclaredTransaction = Merge<DeclaredTransaction$1, RPCSPEC07.DeclaredTransaction>;
type FeeEstimate = Merge<FEE_ESTIMATE, RPCSPEC07.SPEC.FEE_ESTIMATE>;
type InvokedTransaction = Merge<InvokedTransaction$1, RPCSPEC07.InvokedTransaction>;
type ResourceBounds = Merge<ResourceBounds$1, RPCSPEC07.ResourceBounds>;
type SimulateTransaction = Merge<SimulateTransaction$1, RPCSPEC07.SimulateTransaction>;
type TransactionReceipt = Merge<TransactionReceipt$1, RPCSPEC07.TransactionReceipt>;
type TransactionWithHash = Merge<TransactionWithHash$1, RPCSPEC07.TransactionWithHash>;

/**
 * Common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */

type GetBlockResponse = PendingBlock | Block$1;
type PendingBlock = {
    status: 'PENDING';
    parent_hash: BLOCK_HASH;
    timestamp: number;
    sequencer_address: FELT;
    l1_gas_price: RESOURCE_PRICE;
    starknet_version: string;
    transactions: TXN_HASH[];
};
type Block$1 = {
    status: 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';
    block_hash: BLOCK_HASH;
    parent_hash: BLOCK_HASH;
    block_number: BLOCK_NUMBER;
    new_root: FELT;
    timestamp: number;
    sequencer_address: FELT;
    l1_gas_price: RESOURCE_PRICE;
    starknet_version: string;
    transactions: TXN_HASH[];
};
interface MessageToL1 {
    to_address: string;
    payload: Array<string>;
}
type RevertedTransactionReceiptResponse = {
    type?: TransactionType | any;
    execution_status: typeof TransactionExecutionStatus.REVERTED | any;
    finality_status: TransactionFinalityStatus | any;
    status?: TransactionStatus;
    actual_fee: string;
    block_hash?: string;
    block_number?: BlockNumber;
    transaction_hash: string;
    transaction_index?: number;
    messages_sent: Array<MessageToL1>;
    events: any[];
    revert_reason?: string;
};
type RejectedTransactionReceiptResponse = {
    status: typeof TransactionStatus.REJECTED;
    transaction_failure_reason: {
        code: string;
        error_message: string;
    };
};
type GetTxReceiptResponseWithoutHelper = SuccessfulTransactionReceiptResponse | RevertedTransactionReceiptResponse | RejectedTransactionReceiptResponse;
type SuccessfulTransactionReceiptResponse = InvokeTransactionReceiptResponse | DeployTransactionReceiptResponse | DeclareTransactionReceiptResponse;
type GetTransactionResponse = TransactionWithHash;
type InvokeTransactionReceiptResponse = INVOKE_TXN_RECEIPT | PENDING_INVOKE_TXN_RECEIPT;
type DeclareTransactionReceiptResponse = DECLARE_TXN_RECEIPT | PENDING_DECLARE_TXN_RECEIPT;
type DeployTransactionReceiptResponse = InvokeTransactionReceiptResponse;
type DeployAccountTransactionReceiptResponse = DEPLOY_ACCOUNT_TXN_RECEIPT | PENDING_DEPLOY_ACCOUNT_TXN_RECEIPT;
type L1HandlerTransactionReceiptResponse = L1_HANDLER_TXN_RECEIPT | PENDING_L1_HANDLER_TXN_RECEIPT;
interface EstimateFeeResponse {
    gas_consumed: bigint;
    overall_fee: bigint;
    gas_price: bigint;
    unit: PRICE_UNIT;
    suggestedMaxFee: bigint;
    resourceBounds: ResourceBounds;
    data_gas_consumed: bigint;
    data_gas_price: bigint;
}
type EstimateFeeResponseBulk = Array<EstimateFeeResponse>;
type InvokeFunctionResponse = InvokedTransaction;
type DeclareContractResponse = DeclaredTransaction;
type CallContractResponse = string[];
type Storage = FELT;
type Nonce = string;

type SimulationFlags = Array<SIMULATION_FLAG>;
type SimulatedTransaction = SimulateTransaction & {
    suggestedMaxFee: bigint;
    resourceBounds: ResourceBounds;
};
type SimulateTransactionResponse = SimulatedTransaction[];
type StateUpdateResponse = StateUpdate | PendingStateUpdate;
type StateUpdate = STATE_UPDATE;
type PendingStateUpdate = PENDING_STATE_UPDATE;
/**
 * Standardized type
 *
 * Cairo0 program compressed and Cairo1 sierra_program decompressed
 *
 * abi Abi
 *
 * CompiledSierra without '.sierra_program_debug_info'
 */
type ContractClassResponse = LegacyContractClass | Omit<CompiledSierra, 'sierra_program_debug_info'>;

interface EstimateFee extends EstimateFeeResponse {
}
type UniversalSuggestedFee = {
    maxFee: BigNumberish;
    resourceBounds: ResourceBounds$2;
};
type EstimateFeeBulk = Array<EstimateFee>;
type AccountInvocationsFactoryDetails = {
    versions: Array<`${ETransactionVersion$1}`>;
    nonce?: BigNumberish;
    blockIdentifier?: BlockIdentifier;
    skipValidate?: boolean;
} & Partial<V3TransactionDetails>;
interface UniversalDetails {
    nonce?: BigNumberish;
    blockIdentifier?: BlockIdentifier;
    maxFee?: BigNumberish;
    tip?: BigNumberish;
    paymasterData?: BigNumberish[];
    accountDeploymentData?: BigNumberish[];
    nonceDataAvailabilityMode?: EDataAvailabilityMode$1;
    feeDataAvailabilityMode?: EDataAvailabilityMode$1;
    version?: BigNumberish;
    resourceBounds?: ResourceBounds$2;
    skipValidate?: boolean;
}
interface EstimateFeeDetails extends UniversalDetails {
}
interface DeployContractResponse {
    contract_address: string;
    transaction_hash: string;
}
type MultiDeployContractResponse = {
    contract_address: Array<string>;
    transaction_hash: string;
};
type DeployContractUDCResponse = {
    contract_address: string;
    transaction_hash: string;
    address: string;
    deployer: string;
    unique: string;
    classHash: string;
    calldata_len: string;
    calldata: Array<string>;
    salt: string;
};
type DeclareDeployUDCResponse = {
    declare: {
        class_hash: BigNumberish;
    } & Partial<DeclareTransactionReceiptResponse>;
    deploy: DeployContractUDCResponse;
};
type SimulateTransactionDetails = {
    nonce?: BigNumberish;
    blockIdentifier?: BlockIdentifier;
    skipValidate?: boolean;
    skipExecute?: boolean;
} & Partial<V3TransactionDetails>;
type EstimateFeeAction = {
    type: typeof TransactionType.INVOKE;
    payload: AllowArray<Call>;
} | {
    type: typeof TransactionType.DECLARE;
    payload: DeclareContractPayload;
} | {
    type: typeof TransactionType.DEPLOY_ACCOUNT;
    payload: DeployAccountContractPayload;
} | {
    type: typeof TransactionType.DEPLOY;
    payload: UniversalDeployerContractPayload;
};
type StarkProfile = {
    name?: string;
    profilePicture?: string;
    discord?: string;
    twitter?: string;
    github?: string;
    proofOfPersonhood?: boolean;
};

declare const ValidateType: {
    readonly DEPLOY: "DEPLOY";
    readonly CALL: "CALL";
    readonly INVOKE: "INVOKE";
};
type ValidateType = ValuesType<typeof ValidateType>;
declare const Uint: {
    readonly u8: "core::integer::u8";
    readonly u16: "core::integer::u16";
    readonly u32: "core::integer::u32";
    readonly u64: "core::integer::u64";
    readonly u128: "core::integer::u128";
    readonly u256: "core::integer::u256";
    readonly u512: "core::integer::u512";
};
type Uint = ValuesType<typeof Uint>;
declare const Literal: {
    readonly ClassHash: "core::starknet::class_hash::ClassHash";
    readonly ContractAddress: "core::starknet::contract_address::ContractAddress";
    readonly Secp256k1Point: "core::starknet::secp256k1::Secp256k1Point";
    readonly U96: "core::internal::bounded_int::BoundedInt::<0, 79228162514264337593543950335>";
};
type Literal = ValuesType<typeof Literal>;
declare const ETH_ADDRESS = "core::starknet::eth_address::EthAddress";
declare const NON_ZERO_PREFIX = "core::zeroable::NonZero::";

type AsyncContractFunction<T = any> = (...args: ArgsOrCalldataWithOptions) => Promise<T>;
type ContractFunction = (...args: ArgsOrCalldataWithOptions) => any;
type Result = {
    [key: string]: any;
} | Result[] | bigint | string | boolean | CairoEnum;
type ArgsOrCalldata = RawArgsArray | [Calldata] | Calldata;
type ArgsOrCalldataWithOptions = ArgsOrCalldata & ContractOptions;
type ContractOptions = {
    blockIdentifier?: BlockIdentifier;
    parseRequest?: boolean;
    parseResponse?: boolean;
    formatResponse?: {
        [key: string]: any;
    };
    maxFee?: BigNumberish;
    nonce?: BigNumberish;
    signature?: Signature;
    addressSalt?: string;
};
type CallOptions = Pick<ContractOptions, 'blockIdentifier' | 'parseRequest' | 'parseResponse' | 'formatResponse'>;
type InvokeOptions = Pick<ContractOptions, 'maxFee' | 'nonce' | 'signature' | 'parseRequest'>;
type ParsedEvent = {
    [name: string]: ParsedStruct;
} & {
    block_hash?: BlockHash$1;
    block_number?: BlockNumber;
    transaction_hash?: TransactionHash$1;
};
type ParsedEvents = Array<ParsedEvent>;

type RPC_ERROR_SET = {
    FAILED_TO_RECEIVE_TXN: Errors.FAILED_TO_RECEIVE_TXN;
    NO_TRACE_AVAILABLE: Errors.NO_TRACE_AVAILABLE;
    CONTRACT_NOT_FOUND: Errors.CONTRACT_NOT_FOUND;
    BLOCK_NOT_FOUND: Errors.BLOCK_NOT_FOUND;
    INVALID_TXN_INDEX: Errors.INVALID_TXN_INDEX;
    CLASS_HASH_NOT_FOUND: Errors.CLASS_HASH_NOT_FOUND;
    TXN_HASH_NOT_FOUND: Errors.TXN_HASH_NOT_FOUND;
    PAGE_SIZE_TOO_BIG: Errors.PAGE_SIZE_TOO_BIG;
    NO_BLOCKS: Errors.NO_BLOCKS;
    INVALID_CONTINUATION_TOKEN: Errors.INVALID_CONTINUATION_TOKEN;
    TOO_MANY_KEYS_IN_FILTER: Errors.TOO_MANY_KEYS_IN_FILTER;
    CONTRACT_ERROR: Errors.CONTRACT_ERROR;
    TRANSACTION_EXECUTION_ERROR: Errors.TRANSACTION_EXECUTION_ERROR;
    CLASS_ALREADY_DECLARED: Errors.CLASS_ALREADY_DECLARED;
    INVALID_TRANSACTION_NONCE: Errors.INVALID_TRANSACTION_NONCE;
    INSUFFICIENT_MAX_FEE: Errors.INSUFFICIENT_MAX_FEE;
    INSUFFICIENT_ACCOUNT_BALANCE: Errors.INSUFFICIENT_ACCOUNT_BALANCE;
    VALIDATION_FAILURE: Errors.VALIDATION_FAILURE;
    COMPILATION_FAILED: Errors.COMPILATION_FAILED;
    CONTRACT_CLASS_SIZE_IS_TOO_LARGE: Errors.CONTRACT_CLASS_SIZE_IS_TOO_LARGE;
    NON_ACCOUNT: Errors.NON_ACCOUNT;
    DUPLICATE_TX: Errors.DUPLICATE_TX;
    COMPILED_CLASS_HASH_MISMATCH: Errors.COMPILED_CLASS_HASH_MISMATCH;
    UNSUPPORTED_TX_VERSION: Errors.UNSUPPORTED_TX_VERSION;
    UNSUPPORTED_CONTRACT_CLASS_VERSION: Errors.UNSUPPORTED_CONTRACT_CLASS_VERSION;
    UNEXPECTED_ERROR: Errors.UNEXPECTED_ERROR;
};
type RPC_ERROR = RPC_ERROR_SET[keyof RPC_ERROR_SET];

interface OutsideExecutionOptions {
    /** authorized executer of the transaction(s):  Hex address or "ANY_CALLER" or shortString.encodeShortString(constants.OutsideExecutionCallerAny) */
    caller: string;
    /** Unix timestamp of the beginning of the timeframe */
    execute_after: BigNumberish;
    /** Unix timestamp of the end of the timeframe */
    execute_before: BigNumberish;
}
interface OutsideCall {
    to: string;
    selector: BigNumberish;
    calldata: RawArgs;
}
interface OutsideExecution {
    caller: string;
    nonce: BigNumberish;
    execute_after: BigNumberish;
    execute_before: BigNumberish;
    calls: OutsideCall[];
}
interface OutsideTransaction {
    outsideExecution: OutsideExecution;
    signature: Signature;
    signerAddress: BigNumberish;
    version: OutsideExecutionVersion;
}
declare const OutsideExecutionTypesV1: {
    StarkNetDomain: {
        name: string;
        type: string;
    }[];
    OutsideExecution: {
        name: string;
        type: string;
    }[];
    OutsideCall: {
        name: string;
        type: string;
    }[];
};
declare const OutsideExecutionTypesV2: {
    StarknetDomain: {
        name: string;
        type: string;
    }[];
    OutsideExecution: {
        name: string;
        type: string;
    }[];
    Call: {
        name: string;
        type: string;
    }[];
};
declare enum OutsideExecutionVersion {
    UNSUPPORTED = "0",
    V1 = "1",
    V2 = "2"
}

type InvocationsSignerDetails = (V2InvocationsSignerDetails | V3InvocationsSignerDetails) & {
    version: `${ETransactionVersion$1}`;
    skipValidate?: boolean;
};
type V2InvocationsSignerDetails = {
    walletAddress: string;
    cairoVersion: CairoVersion;
    chainId: StarknetChainId;
    nonce: BigNumberish;
    maxFee: BigNumberish;
    version: `${ETransactionVersion2$1}`;
};
type V3InvocationsSignerDetails = V3TransactionDetails & {
    walletAddress: string;
    cairoVersion: CairoVersion;
    chainId: StarknetChainId;
    version: `${ETransactionVersion3$1}`;
};
type DeclareSignerDetails = (V3DeclareSignerDetails | V2DeclareSignerDetails) & {
    version: `${ETransactionVersion$1}`;
};
type V2DeclareSignerDetails = Required<InvocationsDetails> & {
    classHash: string;
    compiledClassHash?: string;
    senderAddress: string;
    chainId: StarknetChainId;
    version: `${ETransactionVersion2$1}`;
};
type V3DeclareSignerDetails = V3TransactionDetails & {
    classHash: string;
    compiledClassHash: string;
    senderAddress: string;
    chainId: StarknetChainId;
    version: `${ETransactionVersion3$1}`;
};
type DeployAccountSignerDetails = V2DeployAccountSignerDetails | V3DeployAccountSignerDetails;
type V2DeployAccountSignerDetails = Required<DeployAccountContractPayload> & Required<InvocationsDetails> & {
    contractAddress: BigNumberish;
    chainId: StarknetChainId;
    version: `${ETransactionVersion2$1}`;
};
type V3DeployAccountSignerDetails = Required<DeployAccountContractPayload> & V3TransactionDetails & {
    contractAddress: BigNumberish;
    chainId: StarknetChainId;
    version: `${ETransactionVersion3$1}`;
};
type LedgerPathCalculation = (accountId: number, applicationName: string) => Uint8Array;

type TransactionStatusReceiptSets = {
    success: SuccessfulTransactionReceiptResponse;
    reverted: RevertedTransactionReceiptResponse;
    rejected: RejectedTransactionReceiptResponse;
    error: Error;
};
type TransactionReceiptStatus = keyof TransactionStatusReceiptSets;
type TransactionReceiptValue = TransactionStatusReceiptSets[TransactionReceiptStatus];
type TransactionReceiptCallbacksDefined = {
    [key in TransactionReceiptStatus]: (response: TransactionStatusReceiptSets[key]) => void;
};
type TransactionReceiptCallbacksDefault = Partial<TransactionReceiptCallbacksDefined> & {
    _: () => void;
};
type TransactionReceiptCallbacks = TransactionReceiptCallbacksDefined | TransactionReceiptCallbacksDefault;
type TransactionReceiptUtilityInterface = {
    readonly statusReceipt: TransactionReceiptStatus;
    readonly value: TransactionReceiptValue;
    match(callbacks: TransactionReceiptCallbacks): void;
} & {
    [key in `is${Capitalize<TransactionReceiptStatus>}`]: () => boolean;
};

type index$2_Abi = Abi;
type index$2_AbiEntry = AbiEntry;
type index$2_AbiEnum = AbiEnum;
type index$2_AbiEnums = AbiEnums;
type index$2_AbiEvent = AbiEvent;
type index$2_AbiEvents = AbiEvents;
type index$2_AbiInterfaces = AbiInterfaces;
type index$2_AbiStruct = AbiStruct;
type index$2_AbiStructs = AbiStructs;
type index$2_AccountInvocationItem = AccountInvocationItem;
type index$2_AccountInvocations = AccountInvocations;
type index$2_AccountInvocationsFactoryDetails = AccountInvocationsFactoryDetails;
type index$2_AllowArray<T> = AllowArray<T>;
type index$2_Args = Args;
type index$2_ArgsOrCalldata = ArgsOrCalldata;
type index$2_ArgsOrCalldataWithOptions = ArgsOrCalldataWithOptions;
type index$2_ArraySignatureType = ArraySignatureType;
type index$2_AsyncContractFunction<T = any> = AsyncContractFunction<T>;
type index$2_BigNumberish = BigNumberish;
type index$2_BlockIdentifier = BlockIdentifier;
type index$2_BlockNumber = BlockNumber;
type index$2_BlockStatus = BlockStatus;
type index$2_BlockTag = BlockTag;
type index$2_BlockWithTxHashes = BlockWithTxHashes;
type index$2_Builtins = Builtins;
type index$2_ByteArray = ByteArray;
type index$2_ByteCode = ByteCode;
type index$2_CairoAssembly = CairoAssembly;
type index$2_CairoContract = CairoContract;
type index$2_CairoEnum = CairoEnum;
type index$2_CairoEvent = CairoEvent;
type index$2_CairoEventDefinition = CairoEventDefinition;
type index$2_CairoEventVariant = CairoEventVariant;
type index$2_CairoVersion = CairoVersion;
type index$2_Call = Call;
type index$2_CallContractResponse = CallContractResponse;
type index$2_CallDetails = CallDetails;
type index$2_CallOptions = CallOptions;
type index$2_CallStruct = CallStruct;
type index$2_Calldata = Calldata;
type index$2_CompiledContract = CompiledContract;
type index$2_CompiledSierra = CompiledSierra;
type index$2_CompiledSierraCasm = CompiledSierraCasm;
type index$2_CompilerVersion = CompilerVersion;
type index$2_CompleteDeclareContractPayload = CompleteDeclareContractPayload;
type index$2_CompressedProgram = CompressedProgram;
type index$2_ContractClass = ContractClass;
type index$2_ContractClassIdentifier = ContractClassIdentifier;
type index$2_ContractClassPayload = ContractClassPayload;
type index$2_ContractClassResponse = ContractClassResponse;
type index$2_ContractEntryPointFields = ContractEntryPointFields;
type index$2_ContractFunction = ContractFunction;
type index$2_ContractOptions = ContractOptions;
type index$2_ContractVersion = ContractVersion;
type index$2_DeclareAndDeployContractPayload = DeclareAndDeployContractPayload;
type index$2_DeclareContractPayload = DeclareContractPayload;
type index$2_DeclareContractResponse = DeclareContractResponse;
type index$2_DeclareContractTransaction = DeclareContractTransaction;
type index$2_DeclareDeployUDCResponse = DeclareDeployUDCResponse;
type index$2_DeclareSignerDetails = DeclareSignerDetails;
type index$2_DeclareTransactionReceiptResponse = DeclareTransactionReceiptResponse;
type index$2_DeployAccountContractPayload = DeployAccountContractPayload;
type index$2_DeployAccountContractTransaction = DeployAccountContractTransaction;
type index$2_DeployAccountSignerDetails = DeployAccountSignerDetails;
type index$2_DeployAccountTransactionReceiptResponse = DeployAccountTransactionReceiptResponse;
type index$2_DeployContractResponse = DeployContractResponse;
type index$2_DeployContractUDCResponse = DeployContractUDCResponse;
type index$2_DeployTransactionReceiptResponse = DeployTransactionReceiptResponse;
type index$2_Details = Details;
declare const index$2_ETH_ADDRESS: typeof ETH_ADDRESS;
type index$2_EntryPointType = EntryPointType;
type index$2_EntryPointsByType = EntryPointsByType;
type index$2_EstimateFee = EstimateFee;
type index$2_EstimateFeeAction = EstimateFeeAction;
type index$2_EstimateFeeBulk = EstimateFeeBulk;
type index$2_EstimateFeeDetails = EstimateFeeDetails;
type index$2_EstimateFeeResponse = EstimateFeeResponse;
type index$2_EstimateFeeResponseBulk = EstimateFeeResponseBulk;
type index$2_EventEntry = EventEntry;
type index$2_FeeEstimate = FeeEstimate;
type index$2_FunctionAbi = FunctionAbi;
type index$2_GetBlockResponse = GetBlockResponse;
type index$2_GetTransactionResponse = GetTransactionResponse;
type index$2_GetTxReceiptResponseWithoutHelper = GetTxReceiptResponseWithoutHelper;
type index$2_HexCalldata = HexCalldata;
type index$2_InterfaceAbi = InterfaceAbi;
type index$2_Invocation = Invocation;
type index$2_Invocations = Invocations;
type index$2_InvocationsDetails = InvocationsDetails;
type index$2_InvocationsDetailsWithNonce = InvocationsDetailsWithNonce;
type index$2_InvocationsSignerDetails = InvocationsSignerDetails;
type index$2_InvokeFunctionResponse = InvokeFunctionResponse;
type index$2_InvokeOptions = InvokeOptions;
type index$2_InvokeTransactionReceiptResponse = InvokeTransactionReceiptResponse;
type index$2_L1HandlerTransactionReceiptResponse = L1HandlerTransactionReceiptResponse;
type index$2_LedgerPathCalculation = LedgerPathCalculation;
type index$2_LegacyCompiledContract = LegacyCompiledContract;
type index$2_LegacyContractClass = LegacyContractClass;
type index$2_LegacyEvent = LegacyEvent;
type index$2_Literal = Literal;
type index$2_MessageToL1 = MessageToL1;
type index$2_MultiDeployContractResponse = MultiDeployContractResponse;
type index$2_MultiType = MultiType;
declare const index$2_NON_ZERO_PREFIX: typeof NON_ZERO_PREFIX;
type index$2_Nonce = Nonce;
type index$2_OptionalPayload<T> = OptionalPayload<T>;
type index$2_OutsideCall = OutsideCall;
type index$2_OutsideExecution = OutsideExecution;
type index$2_OutsideExecutionOptions = OutsideExecutionOptions;
declare const index$2_OutsideExecutionTypesV1: typeof OutsideExecutionTypesV1;
declare const index$2_OutsideExecutionTypesV2: typeof OutsideExecutionTypesV2;
type index$2_OutsideExecutionVersion = OutsideExecutionVersion;
declare const index$2_OutsideExecutionVersion: typeof OutsideExecutionVersion;
type index$2_OutsideTransaction = OutsideTransaction;
type index$2_ParsedEvent = ParsedEvent;
type index$2_ParsedEvents = ParsedEvents;
type index$2_ParsedStruct = ParsedStruct;
type index$2_PendingBlock = PendingBlock;
type index$2_PendingStateUpdate = PendingStateUpdate;
type index$2_Program = Program;
type index$2_ProviderOptions = ProviderOptions;
type index$2_PythonicHints = PythonicHints;
type index$2_RPC_ERROR = RPC_ERROR;
type index$2_RPC_ERROR_SET = RPC_ERROR_SET;
type index$2_RawArgs = RawArgs;
type index$2_RawArgsArray = RawArgsArray;
type index$2_RawArgsObject = RawArgsObject;
type index$2_RawCalldata = RawCalldata;
type index$2_RejectedTransactionReceiptResponse = RejectedTransactionReceiptResponse;
type index$2_Result = Result;
type index$2_RevertedTransactionReceiptResponse = RevertedTransactionReceiptResponse;
type index$2_RpcProviderOptions = RpcProviderOptions;
type index$2_SIMULATION_FLAG = SIMULATION_FLAG;
type index$2_SierraContractClass = SierraContractClass;
type index$2_SierraContractEntryPointFields = SierraContractEntryPointFields;
type index$2_SierraEntryPointsByType = SierraEntryPointsByType;
type index$2_SierraProgramDebugInfo = SierraProgramDebugInfo;
type index$2_Signature = Signature;
type index$2_SimulateTransactionDetails = SimulateTransactionDetails;
type index$2_SimulateTransactionResponse = SimulateTransactionResponse;
type index$2_SimulatedTransaction = SimulatedTransaction;
type index$2_SimulationFlags = SimulationFlags;
type index$2_StarkProfile = StarkProfile;
declare const index$2_StarknetDomain: typeof StarknetDomain;
declare const index$2_StarknetEnumType: typeof StarknetEnumType;
declare const index$2_StarknetMerkleType: typeof StarknetMerkleType;
declare const index$2_StarknetType: typeof StarknetType;
type index$2_StateUpdate = StateUpdate;
type index$2_StateUpdateResponse = StateUpdateResponse;
type index$2_Storage = Storage;
type index$2_SuccessfulTransactionReceiptResponse = SuccessfulTransactionReceiptResponse;
type index$2_TransactionExecutionStatus = TransactionExecutionStatus;
type index$2_TransactionFinalityStatus = TransactionFinalityStatus;
type index$2_TransactionReceipt = TransactionReceipt;
type index$2_TransactionReceiptCallbacks = TransactionReceiptCallbacks;
type index$2_TransactionReceiptCallbacksDefault = TransactionReceiptCallbacksDefault;
type index$2_TransactionReceiptCallbacksDefined = TransactionReceiptCallbacksDefined;
type index$2_TransactionReceiptStatus = TransactionReceiptStatus;
type index$2_TransactionReceiptUtilityInterface = TransactionReceiptUtilityInterface;
type index$2_TransactionReceiptValue = TransactionReceiptValue;
type index$2_TransactionStatus = TransactionStatus;
type index$2_TransactionStatusReceiptSets = TransactionStatusReceiptSets;
type index$2_TransactionType = TransactionType;
type index$2_Tupled = Tupled;
declare const index$2_TypedData: typeof TypedData;
declare const index$2_TypedDataRevision: typeof TypedDataRevision;
type index$2_Uint = Uint;
type index$2_Uint256 = Uint256;
type index$2_Uint512 = Uint512;
type index$2_UniversalDeployerContractPayload = UniversalDeployerContractPayload;
type index$2_UniversalDetails = UniversalDetails;
type index$2_UniversalSuggestedFee = UniversalSuggestedFee;
type index$2_V2DeclareSignerDetails = V2DeclareSignerDetails;
type index$2_V2DeployAccountSignerDetails = V2DeployAccountSignerDetails;
type index$2_V2InvocationsSignerDetails = V2InvocationsSignerDetails;
type index$2_V3DeclareSignerDetails = V3DeclareSignerDetails;
type index$2_V3DeployAccountSignerDetails = V3DeployAccountSignerDetails;
type index$2_V3InvocationsSignerDetails = V3InvocationsSignerDetails;
type index$2_V3TransactionDetails = V3TransactionDetails;
type index$2_ValidateType = ValidateType;
type index$2_WeierstrassSignatureType = WeierstrassSignatureType;
type index$2_getContractVersionOptions = getContractVersionOptions;
type index$2_getEstimateFeeBulkOptions = getEstimateFeeBulkOptions;
type index$2_getSimulateTransactionOptions = getSimulateTransactionOptions;
type index$2_waitForTransactionOptions = waitForTransactionOptions;
declare namespace index$2 {
  export { type index$2_Abi as Abi, type index$2_AbiEntry as AbiEntry, type index$2_AbiEnum as AbiEnum, type index$2_AbiEnums as AbiEnums, type index$2_AbiEvent as AbiEvent, type index$2_AbiEvents as AbiEvents, type index$2_AbiInterfaces as AbiInterfaces, type index$2_AbiStruct as AbiStruct, type index$2_AbiStructs as AbiStructs, type index$2_AccountInvocationItem as AccountInvocationItem, type index$2_AccountInvocations as AccountInvocations, type index$2_AccountInvocationsFactoryDetails as AccountInvocationsFactoryDetails, type index$2_AllowArray as AllowArray, type index$2_Args as Args, type index$2_ArgsOrCalldata as ArgsOrCalldata, type index$2_ArgsOrCalldataWithOptions as ArgsOrCalldataWithOptions, type index$2_ArraySignatureType as ArraySignatureType, type index$2_AsyncContractFunction as AsyncContractFunction, type index$2_BigNumberish as BigNumberish, type Block$1 as Block, type index$2_BlockIdentifier as BlockIdentifier, type index$2_BlockNumber as BlockNumber, type index$2_BlockStatus as BlockStatus, type index$2_BlockTag as BlockTag, type index$2_BlockWithTxHashes as BlockWithTxHashes, type index$2_Builtins as Builtins, type index$2_ByteArray as ByteArray, type index$2_ByteCode as ByteCode, type index$2_CairoAssembly as CairoAssembly, type index$2_CairoContract as CairoContract, type index$2_CairoEnum as CairoEnum, type index$2_CairoEvent as CairoEvent, type index$2_CairoEventDefinition as CairoEventDefinition, type index$2_CairoEventVariant as CairoEventVariant, type index$2_CairoVersion as CairoVersion, type index$2_Call as Call, type index$2_CallContractResponse as CallContractResponse, type index$2_CallDetails as CallDetails, type index$2_CallOptions as CallOptions, type index$2_CallStruct as CallStruct, type index$2_Calldata as Calldata, type index$2_CompiledContract as CompiledContract, type index$2_CompiledSierra as CompiledSierra, type index$2_CompiledSierraCasm as CompiledSierraCasm, type index$2_CompilerVersion as CompilerVersion, type index$2_CompleteDeclareContractPayload as CompleteDeclareContractPayload, type index$2_CompressedProgram as CompressedProgram, type index$2_ContractClass as ContractClass, type index$2_ContractClassIdentifier as ContractClassIdentifier, type index$2_ContractClassPayload as ContractClassPayload, type index$2_ContractClassResponse as ContractClassResponse, type index$2_ContractEntryPointFields as ContractEntryPointFields, type index$2_ContractFunction as ContractFunction, type index$2_ContractOptions as ContractOptions, type index$2_ContractVersion as ContractVersion, type index$2_DeclareAndDeployContractPayload as DeclareAndDeployContractPayload, type index$2_DeclareContractPayload as DeclareContractPayload, type index$2_DeclareContractResponse as DeclareContractResponse, type index$2_DeclareContractTransaction as DeclareContractTransaction, type index$2_DeclareDeployUDCResponse as DeclareDeployUDCResponse, type index$2_DeclareSignerDetails as DeclareSignerDetails, type index$2_DeclareTransactionReceiptResponse as DeclareTransactionReceiptResponse, type index$2_DeployAccountContractPayload as DeployAccountContractPayload, type index$2_DeployAccountContractTransaction as DeployAccountContractTransaction, type index$2_DeployAccountSignerDetails as DeployAccountSignerDetails, type index$2_DeployAccountTransactionReceiptResponse as DeployAccountTransactionReceiptResponse, type index$2_DeployContractResponse as DeployContractResponse, type index$2_DeployContractUDCResponse as DeployContractUDCResponse, type index$2_DeployTransactionReceiptResponse as DeployTransactionReceiptResponse, type index$2_Details as Details, index$2_ETH_ADDRESS as ETH_ADDRESS, type index$2_EntryPointType as EntryPointType, type index$2_EntryPointsByType as EntryPointsByType, type index$2_EstimateFee as EstimateFee, type index$2_EstimateFeeAction as EstimateFeeAction, type index$2_EstimateFeeBulk as EstimateFeeBulk, type index$2_EstimateFeeDetails as EstimateFeeDetails, type index$2_EstimateFeeResponse as EstimateFeeResponse, type index$2_EstimateFeeResponseBulk as EstimateFeeResponseBulk, type index$2_EventEntry as EventEntry, type index$2_FeeEstimate as FeeEstimate, type index$2_FunctionAbi as FunctionAbi, type index$2_GetBlockResponse as GetBlockResponse, type index$2_GetTransactionResponse as GetTransactionResponse, type index$2_GetTxReceiptResponseWithoutHelper as GetTxReceiptResponseWithoutHelper, type index$2_HexCalldata as HexCalldata, type index$2_InterfaceAbi as InterfaceAbi, type index$2_Invocation as Invocation, type index$2_Invocations as Invocations, type index$2_InvocationsDetails as InvocationsDetails, type index$2_InvocationsDetailsWithNonce as InvocationsDetailsWithNonce, type index$2_InvocationsSignerDetails as InvocationsSignerDetails, type index$2_InvokeFunctionResponse as InvokeFunctionResponse, type index$2_InvokeOptions as InvokeOptions, type index$2_InvokeTransactionReceiptResponse as InvokeTransactionReceiptResponse, type index$2_L1HandlerTransactionReceiptResponse as L1HandlerTransactionReceiptResponse, type index$2_LedgerPathCalculation as LedgerPathCalculation, type index$2_LegacyCompiledContract as LegacyCompiledContract, type index$2_LegacyContractClass as LegacyContractClass, type index$2_LegacyEvent as LegacyEvent, type index$2_Literal as Literal, type index$2_MessageToL1 as MessageToL1, type index$2_MultiDeployContractResponse as MultiDeployContractResponse, type index$2_MultiType as MultiType, index$2_NON_ZERO_PREFIX as NON_ZERO_PREFIX, type index$2_Nonce as Nonce, type index$2_OptionalPayload as OptionalPayload, type index$2_OutsideCall as OutsideCall, type index$2_OutsideExecution as OutsideExecution, type index$2_OutsideExecutionOptions as OutsideExecutionOptions, index$2_OutsideExecutionTypesV1 as OutsideExecutionTypesV1, index$2_OutsideExecutionTypesV2 as OutsideExecutionTypesV2, index$2_OutsideExecutionVersion as OutsideExecutionVersion, type index$2_OutsideTransaction as OutsideTransaction, type index$2_ParsedEvent as ParsedEvent, type index$2_ParsedEvents as ParsedEvents, type index$2_ParsedStruct as ParsedStruct, type index$2_PendingBlock as PendingBlock, type index$2_PendingStateUpdate as PendingStateUpdate, type index$2_Program as Program, type index$2_ProviderOptions as ProviderOptions, type index$2_PythonicHints as PythonicHints, index$3 as RPC, type index$2_RPC_ERROR as RPC_ERROR, type index$2_RPC_ERROR_SET as RPC_ERROR_SET, type index$2_RawArgs as RawArgs, type index$2_RawArgsArray as RawArgsArray, type index$2_RawArgsObject as RawArgsObject, type index$2_RawCalldata as RawCalldata, type index$2_RejectedTransactionReceiptResponse as RejectedTransactionReceiptResponse, type index$2_Result as Result, type index$2_RevertedTransactionReceiptResponse as RevertedTransactionReceiptResponse, type index$2_RpcProviderOptions as RpcProviderOptions, type index$2_SIMULATION_FLAG as SIMULATION_FLAG, type index$2_SierraContractClass as SierraContractClass, type index$2_SierraContractEntryPointFields as SierraContractEntryPointFields, type index$2_SierraEntryPointsByType as SierraEntryPointsByType, type index$2_SierraProgramDebugInfo as SierraProgramDebugInfo, type index$2_Signature as Signature, type index$2_SimulateTransactionDetails as SimulateTransactionDetails, type index$2_SimulateTransactionResponse as SimulateTransactionResponse, type index$2_SimulatedTransaction as SimulatedTransaction, type index$2_SimulationFlags as SimulationFlags, type index$2_StarkProfile as StarkProfile, index$2_StarknetDomain as StarknetDomain, index$2_StarknetEnumType as StarknetEnumType, index$2_StarknetMerkleType as StarknetMerkleType, index$2_StarknetType as StarknetType, type index$2_StateUpdate as StateUpdate, type index$2_StateUpdateResponse as StateUpdateResponse, type index$2_Storage as Storage, type index$2_SuccessfulTransactionReceiptResponse as SuccessfulTransactionReceiptResponse, type index$2_TransactionExecutionStatus as TransactionExecutionStatus, type index$2_TransactionFinalityStatus as TransactionFinalityStatus, type index$2_TransactionReceipt as TransactionReceipt, type index$2_TransactionReceiptCallbacks as TransactionReceiptCallbacks, type index$2_TransactionReceiptCallbacksDefault as TransactionReceiptCallbacksDefault, type index$2_TransactionReceiptCallbacksDefined as TransactionReceiptCallbacksDefined, type index$2_TransactionReceiptStatus as TransactionReceiptStatus, type index$2_TransactionReceiptUtilityInterface as TransactionReceiptUtilityInterface, type index$2_TransactionReceiptValue as TransactionReceiptValue, type index$2_TransactionStatus as TransactionStatus, type index$2_TransactionStatusReceiptSets as TransactionStatusReceiptSets, type index$2_TransactionType as TransactionType, type index$2_Tupled as Tupled, index$2_TypedData as TypedData, index$2_TypedDataRevision as TypedDataRevision, type index$2_Uint as Uint, type index$2_Uint256 as Uint256, type index$2_Uint512 as Uint512, type index$2_UniversalDeployerContractPayload as UniversalDeployerContractPayload, type index$2_UniversalDetails as UniversalDetails, type index$2_UniversalSuggestedFee as UniversalSuggestedFee, type index$2_V2DeclareSignerDetails as V2DeclareSignerDetails, type index$2_V2DeployAccountSignerDetails as V2DeployAccountSignerDetails, type index$2_V2InvocationsSignerDetails as V2InvocationsSignerDetails, type index$2_V3DeclareSignerDetails as V3DeclareSignerDetails, type index$2_V3DeployAccountSignerDetails as V3DeployAccountSignerDetails, type index$2_V3InvocationsSignerDetails as V3InvocationsSignerDetails, type index$2_V3TransactionDetails as V3TransactionDetails, type index$2_ValidateType as ValidateType, type index$2_WeierstrassSignatureType as WeierstrassSignatureType, type index$2_getContractVersionOptions as getContractVersionOptions, type index$2_getEstimateFeeBulkOptions as getEstimateFeeBulkOptions, type index$2_getSimulateTransactionOptions as getSimulateTransactionOptions, type index$2_waitForTransactionOptions as waitForTransactionOptions };
}

declare class RpcChannel$1 {
    nodeUrl: string;
    headers: object;
    requestId: number;
    readonly blockIdentifier: BlockIdentifier;
    readonly retries: number;
    readonly waitMode: boolean;
    private chainId?;
    private specVersion?;
    private transactionRetryIntervalFallback?;
    private batchClient?;
    private baseFetch;
    constructor(optionsOrProvider?: RpcProviderOptions);
    private get transactionRetryIntervalDefault();
    setChainId(chainId: StarknetChainId): void;
    fetch(method: string, params?: object, id?: string | number): Promise<Response>;
    protected errorHandler(method: string, params: any, rpcError?: Error$1, otherError?: any): void;
    protected fetchEndpoint<T extends keyof Methods>(method: T, params?: Methods[T]['params']): Promise<Methods[T]['result']>;
    getChainId(): Promise<StarknetChainId>;
    getSpecVersion(): Promise<string>;
    getNonceForAddress(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<string>;
    /**
     * Get the most recent accepted block hash and number
     */
    getBlockLatestAccepted(): Promise<BlockHashAndNumber>;
    /**
     * Get the most recent accepted block number
     * redundant use getBlockLatestAccepted();
     * @returns Number of the latest block
     */
    getBlockNumber(): Promise<number>;
    getBlockWithTxHashes(blockIdentifier?: BlockIdentifier): Promise<BlockWithTxHashes$1>;
    getBlockWithTxs(blockIdentifier?: BlockIdentifier): Promise<BlockWithTxs>;
    getBlockStateUpdate(blockIdentifier?: BlockIdentifier): Promise<StateUpdate$1>;
    getBlockTransactionsTraces(blockIdentifier?: BlockIdentifier): Promise<BlockTransactionsTraces>;
    getBlockTransactionCount(blockIdentifier?: BlockIdentifier): Promise<number>;
    getTransactionByHash(txHash: BigNumberish): Promise<TransactionWithHash$1>;
    getTransactionByBlockIdAndIndex(blockIdentifier: BlockIdentifier, index: number): Promise<TransactionWithHash$1>;
    getTransactionReceipt(txHash: BigNumberish): Promise<TransactionReceipt$1>;
    getTransactionTrace(txHash: BigNumberish): Promise<TRANSACTION_TRACE>;
    /**
     * Get the status of a transaction
     */
    getTransactionStatus(transactionHash: BigNumberish): Promise<TransactionStatus$1>;
    /**
     * @param invocations AccountInvocations
     * @param simulateTransactionOptions blockIdentifier and flags to skip validation and fee charge<br/>
     * - blockIdentifier<br/>
     * - skipValidate (default false)<br/>
     * - skipFeeCharge (default true)<br/>
     */
    simulateTransaction(invocations: AccountInvocations, simulateTransactionOptions?: getSimulateTransactionOptions): Promise<SimulateTransactionResponse$1>;
    waitForTransaction(txHash: BigNumberish, options?: waitForTransactionOptions): Promise<TXN_RECEIPT>;
    getStorageAt(contractAddress: BigNumberish, key: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<string>;
    getClassHashAt(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<string>;
    getClass(classHash: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<ContractClass$1>;
    getClassAt(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<ContractClass$1>;
    getEstimateFee(invocations: AccountInvocations, { blockIdentifier, skipValidate }: getEstimateFeeBulkOptions): Promise<FEE_ESTIMATE[]>;
    invoke(functionInvocation: Invocation, details: InvocationsDetailsWithNonce): Promise<InvokedTransaction$1>;
    declare({ contract, signature, senderAddress, compiledClassHash }: DeclareContractTransaction, details: InvocationsDetailsWithNonce): Promise<TXN_RECEIPT | DeclaredTransaction$1>;
    deployAccount({ classHash, constructorCalldata, addressSalt, signature }: DeployAccountContractTransaction, details: InvocationsDetailsWithNonce): Promise<TXN_RECEIPT | DeployedAccountTransaction>;
    callContract(call: Call, blockIdentifier?: BlockIdentifier): Promise<string[]>;
    /**
     * NEW: Estimate the fee for a message from L1
     * @param message Message From L1
     */
    estimateMessageFee(message: L1Message, blockIdentifier?: BlockIdentifier): Promise<FEE_ESTIMATE>;
    /**
     * Returns an object about the sync status, or false if the node is not synching
     * @returns Object with the stats data
     */
    getSyncingStats(): Promise<Syncing>;
    /**
     * Returns all events matching the given filter
     * @returns events and the pagination of the events
     */
    getEvents(eventFilter: EventFilter): Promise<EVENTS_CHUNK>;
    buildTransaction(invocation: AccountInvocationItem, versionType?: 'fee' | 'transaction'): BaseTransaction;
}

declare namespace rpc_0_6 {
  export { RpcChannel$1 as RpcChannel };
}

declare class RpcChannel {
    nodeUrl: string;
    headers: object;
    requestId: number;
    readonly blockIdentifier: BlockIdentifier;
    readonly retries: number;
    readonly waitMode: boolean;
    private chainId?;
    private specVersion?;
    private transactionRetryIntervalFallback?;
    private batchClient?;
    private baseFetch;
    constructor(optionsOrProvider?: RpcProviderOptions);
    private get transactionRetryIntervalDefault();
    setChainId(chainId: StarknetChainId): void;
    fetch(method: string, params?: object, id?: string | number): Promise<Response>;
    protected errorHandler(method: string, params: any, rpcError?: Error$1, otherError?: any): void;
    protected fetchEndpoint<T extends keyof RPCSPEC07.Methods>(method: T, params?: RPCSPEC07.Methods[T]['params']): Promise<RPCSPEC07.Methods[T]['result']>;
    getChainId(): Promise<StarknetChainId>;
    getSpecVersion(): Promise<string>;
    getNonceForAddress(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<string>;
    /**
     * Get the most recent accepted block hash and number
     */
    getBlockLatestAccepted(): Promise<RPCSPEC07.BlockHashAndNumber>;
    /**
     * Get the most recent accepted block number
     * redundant use getBlockLatestAccepted();
     * @returns Number of the latest block
     */
    getBlockNumber(): Promise<number>;
    getBlockWithTxHashes(blockIdentifier?: BlockIdentifier): Promise<RPCSPEC07.BlockWithTxHashes>;
    getBlockWithTxs(blockIdentifier?: BlockIdentifier): Promise<RPCSPEC07.BlockWithTxs>;
    getBlockWithReceipts(blockIdentifier?: BlockIdentifier): Promise<RPCSPEC07.BlockWithTxReceipts>;
    getBlockStateUpdate(blockIdentifier?: BlockIdentifier): Promise<RPCSPEC07.StateUpdate>;
    getBlockTransactionsTraces(blockIdentifier?: BlockIdentifier): Promise<RPCSPEC07.BlockTransactionsTraces>;
    getBlockTransactionCount(blockIdentifier?: BlockIdentifier): Promise<number>;
    getTransactionByHash(txHash: BigNumberish): Promise<RPCSPEC07.TransactionWithHash>;
    getTransactionByBlockIdAndIndex(blockIdentifier: BlockIdentifier, index: number): Promise<RPCSPEC07.TransactionWithHash>;
    getTransactionReceipt(txHash: BigNumberish): Promise<RPCSPEC07.API.SPEC.TXN_RECEIPT_WITH_BLOCK_INFO>;
    getTransactionTrace(txHash: BigNumberish): Promise<RPCSPEC07.API.SPEC.TRANSACTION_TRACE>;
    /**
     * Get the status of a transaction
     */
    getTransactionStatus(transactionHash: BigNumberish): Promise<RPCSPEC07.TransactionStatus>;
    /**
     * @param invocations AccountInvocations
     * @param simulateTransactionOptions blockIdentifier and flags to skip validation and fee charge<br/>
     * - blockIdentifier<br/>
     * - skipValidate (default false)<br/>
     * - skipFeeCharge (default true)<br/>
     */
    simulateTransaction(invocations: AccountInvocations, simulateTransactionOptions?: getSimulateTransactionOptions): Promise<RPCSPEC07.SimulateTransactionResponse>;
    waitForTransaction(txHash: BigNumberish, options?: waitForTransactionOptions): Promise<RPCSPEC07.API.SPEC.TXN_RECEIPT>;
    getStorageAt(contractAddress: BigNumberish, key: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<string>;
    getClassHashAt(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<string>;
    getClass(classHash: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<RPCSPEC07.ContractClass>;
    getClassAt(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<RPCSPEC07.ContractClass>;
    getEstimateFee(invocations: AccountInvocations, { blockIdentifier, skipValidate }: getEstimateFeeBulkOptions): Promise<RPCSPEC07.API.SPEC.FEE_ESTIMATE[]>;
    invoke(functionInvocation: Invocation, details: InvocationsDetailsWithNonce): Promise<RPCSPEC07.InvokedTransaction>;
    declare({ contract, signature, senderAddress, compiledClassHash }: DeclareContractTransaction, details: InvocationsDetailsWithNonce): Promise<RPCSPEC07.DeclaredTransaction | RPCSPEC07.API.SPEC.TXN_RECEIPT>;
    deployAccount({ classHash, constructorCalldata, addressSalt, signature }: DeployAccountContractTransaction, details: InvocationsDetailsWithNonce): Promise<RPCSPEC07.API.SPEC.TXN_RECEIPT | RPCSPEC07.DeployedAccountTransaction>;
    callContract(call: Call, blockIdentifier?: BlockIdentifier): Promise<string[]>;
    /**
     * NEW: Estimate the fee for a message from L1
     * @param message Message From L1
     */
    estimateMessageFee(message: RPCSPEC07.L1Message, blockIdentifier?: BlockIdentifier): Promise<RPCSPEC07.API.SPEC.FEE_ESTIMATE>;
    /**
     * Returns an object about the sync status, or false if the node is not synching
     * @returns Object with the stats data
     */
    getSyncingStats(): Promise<RPCSPEC07.Syncing>;
    /**
     * Returns all events matching the given filter
     * @returns events and the pagination of the events
     */
    getEvents(eventFilter: RPCSPEC07.EventFilter): Promise<RPCSPEC07.API.SPEC.EVENTS_CHUNK>;
    buildTransaction(invocation: AccountInvocationItem, versionType?: 'fee' | 'transaction'): RPCSPEC07.BaseTransaction;
}

type rpc_0_7_RpcChannel = RpcChannel;
declare const rpc_0_7_RpcChannel: typeof RpcChannel;
declare namespace rpc_0_7 {
  export { rpc_0_7_RpcChannel as RpcChannel };
}

/**
 * Utility that analyses transaction receipt response and provides helpers to process it
 * @example
 * ```typescript
 * const responseTx = new ReceiptTx(receipt);
 * responseTx.match({
 *   success: (txR: SuccessfulTransactionReceiptResponse) => { },
 *   rejected: (txR: RejectedTransactionReceiptResponse) => { },
 *   reverted: (txR: RevertedTransactionReceiptResponse) => { },
 *   error: (err: Error) => { },
 * });
 * responseTx.match({
 *   success: (txR: SuccessfulTransactionReceiptResponse) => { },
 *   _: () => { },
 * }
 * ```
 */
declare class ReceiptTx implements TransactionReceiptUtilityInterface {
    readonly statusReceipt: TransactionReceiptStatus;
    readonly value: TransactionReceiptValue;
    constructor(receipt: GetTxReceiptResponseWithoutHelper);
    match(callbacks: TransactionReceiptCallbacks): void;
    isSuccess(): this is SuccessfulTransactionReceiptResponse;
    isReverted(): this is RevertedTransactionReceiptResponse;
    isRejected(): this is RejectedTransactionReceiptResponse;
    isError(): boolean;
    static isSuccess(transactionReceipt: GetTxReceiptResponseWithoutHelper): transactionReceipt is SuccessfulTransactionReceiptResponse;
    static isReverted(transactionReceipt: GetTxReceiptResponseWithoutHelper): transactionReceipt is RevertedTransactionReceiptResponse;
    static isRejected(transactionReceipt: GetTxReceiptResponseWithoutHelper): transactionReceipt is RejectedTransactionReceiptResponse;
}
type GetTransactionReceiptResponse = GetTxReceiptResponseWithoutHelper & ReceiptTx;

declare abstract class ResponseParser {
    abstract parseGetBlockResponse(res: BlockWithTxHashes): GetBlockResponse;
    abstract parseGetTransactionResponse(res: any): GetTransactionResponse;
    abstract parseGetTransactionReceiptResponse(res: any): GetTransactionReceiptResponse;
    abstract parseFeeEstimateResponse(res: FeeEstimate[]): EstimateFeeResponse;
    abstract parseCallContractResponse(res: any): CallContractResponse;
    abstract parseInvokeFunctionResponse(res: any): InvokeFunctionResponse;
    abstract parseDeployContractResponse(res: any): DeployContractResponse;
    abstract parseDeclareContractResponse(res: any): DeclareContractResponse;
    abstract parseSimulateTransactionResponse(res: any): SimulateTransactionResponse;
}

/**
 * Map RPC Response to common interface response
 * Intersection (sequencer response ∩ (∪ rpc responses))
 */

declare class RPCResponseParser implements Omit<ResponseParser, 'parseDeclareContractResponse' | 'parseDeployContractResponse' | 'parseInvokeFunctionResponse' | 'parseGetTransactionReceiptResponse' | 'parseGetTransactionResponse' | 'parseCallContractResponse'> {
    private margin;
    constructor(margin?: RpcProviderOptions['feeMarginPercentage']);
    private estimatedFeeToMaxFee;
    private estimateFeeToBounds;
    parseGetBlockResponse(res: BlockWithTxHashes): GetBlockResponse;
    parseTransactionReceipt(res: TransactionReceipt): GetTxReceiptResponseWithoutHelper;
    parseFeeEstimateResponse(res: FeeEstimate[]): EstimateFeeResponse;
    parseFeeEstimateBulkResponse(res: FeeEstimate[]): EstimateFeeResponseBulk;
    parseSimulateTransactionResponse(res: any): SimulateTransactionResponse;
    parseContractClassResponse(res: ContractClassPayload): ContractClassResponse;
    parseL1GasPriceResponse(res: BlockWithTxHashes): string;
}

declare abstract class ProviderInterface {
    abstract channel: RpcChannel | RpcChannel$1;
    /**
     * Gets the Starknet chain Id
     *
     * @returns the chain Id
     */
    abstract getChainId(): Promise<StarknetChainId>;
    /**
     * Calls a function on the Starknet contract.
     *
     * @param call transaction to be called
     * @param blockIdentifier block identifier
     * @returns the result of the function on the smart contract.
     */
    abstract callContract(call: Call, blockIdentifier?: BlockIdentifier): Promise<CallContractResponse>;
    /**
     * Gets the block information
     *
     * @param blockIdentifier block identifier
     * @returns the block object
     */
    abstract getBlock(blockIdentifier?: 'pending'): Promise<PendingBlock>;
    abstract getBlock(blockIdentifier: 'latest'): Promise<Block$1>;
    abstract getBlock(blockIdentifier: BlockIdentifier): Promise<GetBlockResponse>;
    /**
     * Gets the contract class of the deployed contract.
     *
     * @param contractAddress - contract address
     * @param blockIdentifier - block identifier
     * @returns Contract class of compiled contract
     */
    abstract getClassAt(contractAddress: string, blockIdentifier?: BlockIdentifier): Promise<ContractClassResponse>;
    /**
     * Gets the price of l1 gas in the block
     *
     * @param blockIdentifier block identifier
     * @returns gas price of the block
     */
    abstract getL1GasPrice(blockIdentifier: BlockIdentifier): Promise<string>;
    /**
     * Get L1 message hash from L2 transaction hash
     * @param {BigNumberish} l2TxHash L2 transaction hash
     * @returns {string} Hex string of L1 message hash
     * @example
     * In Sepolia Testnet :
     * ```typescript
     * const result = provider.getL1MessageHash('0x28dfc05eb4f261b37ddad451ff22f1d08d4e3c24dc646af0ec69fa20e096819');
     * // result = '0x55b3f8b6e607fffd9b4d843dfe8f9b5c05822cd94fcad8797deb01d77805532a'
     * ```
     */
    abstract getL1MessageHash(l2TxHash: BigNumberish): Promise<string>;
    /**
     * Returns the contract class hash in the given block for the contract deployed at the given address
     *
     * @param contractAddress - contract address
     * @param blockIdentifier - block identifier
     * @returns Class hash
     */
    abstract getClassHashAt(contractAddress: string, blockIdentifier?: BlockIdentifier): Promise<string>;
    /**
     * Returns the contract class deployed under the given class hash.
     *
     * @param classHash - class hash
     * @returns Contract class of compiled contract
     */
    abstract getClassByHash(classHash: string): Promise<ContractClassResponse>;
    /**
     * Returns the nonce associated with the given address in the given block
     *
     * @param contractAddress - contract address
     * @returns the hex nonce
     */
    abstract getNonceForAddress(contractAddress: string, blockIdentifier?: BlockIdentifier): Promise<Nonce>;
    /**
     * Get the value of the storage (contract's variable) at the given address and key
     *
     * @param contractAddress
     * @param key - from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP)
     * @param blockIdentifier - block identifier
     * @returns the value of the storage variable
     */
    abstract getStorageAt(contractAddress: string, key: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<Storage>;
    /**
     * Gets the transaction information from a tx id.
     *
     * @param transactionHash
     * @returns the transaction object \{ transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? \}
     */
    abstract getTransaction(transactionHash: BigNumberish): Promise<GetTransactionResponse>;
    /**
     * Gets the transaction receipt from a tx hash.
     *
     * @param transactionHash
     * @returns the transaction receipt object
     */
    abstract getTransactionReceipt(transactionHash: BigNumberish): Promise<GetTransactionReceiptResponse>;
    /**
     * Deploys a given compiled Account contract (json) to starknet
     *
     * @param payload payload to be deployed containing:
     * - compiled contract code
     * - constructor calldata
     * - address salt
     * @returns a confirmation of sending a transaction on the starknet contract
     */
    abstract deployAccountContract(payload: DeployAccountContractPayload, details: InvocationsDetailsWithNonce): Promise<DeployContractResponse>;
    /**
     * Invokes a function on starknet
     * @deprecated This method won't be supported as soon as fees are mandatory. Should not be used outside of Account class
     *
     * @param invocation the invocation object containing:
     * - contractAddress - the address of the contract
     * - entrypoint - the entrypoint of the contract
     * - calldata - (defaults to []) the calldata
     * - signature - (defaults to []) the signature
     * @param details - optional details containing:
     * - nonce - optional nonce
     * - version - optional version
     * - maxFee - optional maxFee
     * @returns response from addTransaction
     */
    abstract invokeFunction(invocation: Invocation, details: InvocationsDetailsWithNonce): Promise<InvokeFunctionResponse>;
    /**
     * Declares a given compiled contract (json) to starknet
     * @param transaction transaction payload to be deployed containing:
     * - compiled contract code
     * - sender address
     * - signature
     * @param details Invocation Details containing:
     * - nonce
     * - optional version
     * - optional maxFee
     * @returns a confirmation of sending a transaction on the starknet contract
     */
    abstract declareContract(transaction: DeclareContractTransaction, details: InvocationsDetailsWithNonce): Promise<DeclareContractResponse>;
    /**
     * Estimates the fee for a given INVOKE transaction
     * @deprecated Please use getInvokeEstimateFee or getDeclareEstimateFee instead. Should not be used outside of Account class
     *
     * @param invocation the invocation object containing:
     * - contractAddress - the address of the contract
     * - entrypoint - the entrypoint of the contract
     * - calldata - (defaults to []) the calldata
     * - signature - (defaults to []) the signature
     * @param details - optional details containing:
     * - nonce - optional nonce
     * - version - optional version
     * @param blockIdentifier - (optional) block identifier
     * @param skipValidate - (optional) skip cairo __validate__ method
     * @returns the estimated fee
     */
    abstract getEstimateFee(invocation: Invocation, details: InvocationsDetailsWithNonce, blockIdentifier?: BlockIdentifier, skipValidate?: boolean): Promise<EstimateFeeResponse>;
    /**
     * Estimates the fee for a given INVOKE transaction
     *
     * @param invocation the invocation object containing:
     * - contractAddress - the address of the contract
     * - entrypoint - the entrypoint of the contract
     * - calldata - (defaults to []) the calldata
     * - signature - (defaults to []) the signature
     * @param details - optional details containing:
     * - nonce - optional nonce
     * - version - optional version
     * @param blockIdentifier - (optional) block identifier
     * @param skipValidate - (optional) skip cairo __validate__ method
     * @returns the estimated fee
     */
    abstract getInvokeEstimateFee(invocation: Invocation, details: InvocationsDetailsWithNonce, blockIdentifier?: BlockIdentifier, skipValidate?: boolean): Promise<EstimateFeeResponse>;
    /**
     * Estimates the fee for a given DECLARE transaction
     *
     * @param transaction transaction payload to be declared containing:
     * - compiled contract code
     * - sender address
     * - signature - (defaults to []) the signature
     * @param details - optional details containing:
     * - nonce
     * - version - optional version
     * - optional maxFee
     * @param blockIdentifier - (optional) block identifier
     * @param skipValidate - (optional) skip cairo __validate__ method
     * @returns the estimated fee
     */
    abstract getDeclareEstimateFee(transaction: DeclareContractTransaction, details: InvocationsDetailsWithNonce, blockIdentifier?: BlockIdentifier, skipValidate?: boolean): Promise<EstimateFeeResponse>;
    /**
     * Estimates the fee for a given DEPLOY_ACCOUNT transaction
     *
     * @param transaction transaction payload to be deployed containing:
     * - classHash
     * - constructorCalldata
     * - addressSalt
     * - signature - (defaults to []) the signature
     * @param details - optional details containing:
     * - nonce
     * - version - optional version
     * - optional maxFee
     * @param blockIdentifier - (optional) block identifier
     * @param skipValidate - (optional) skip cairo __validate__ method
     * @returns the estimated fee
     */
    abstract getDeployAccountEstimateFee(transaction: DeployAccountContractTransaction, details: InvocationsDetailsWithNonce, blockIdentifier?: BlockIdentifier, skipValidate?: boolean): Promise<EstimateFeeResponse>;
    /**
     * Estimates the fee for a list of INVOKE transaction
     *
     * @param invocations AccountInvocations - Complete invocations array with account details
     * @param options getEstimateFeeBulkOptions
     * - (optional) blockIdentifier - BlockIdentifier
     * @returns the estimated fee
     */
    abstract getEstimateFeeBulk(invocations: AccountInvocations, options?: getEstimateFeeBulkOptions): Promise<EstimateFeeResponseBulk>;
    /**
     * Wait for the transaction to be accepted
     * @param txHash - transaction hash
     * @param options waitForTransactionOptions
     * - (optional) retryInterval: number | undefined;
     * - (optional) successStates: TransactionStatus[] | undefined;
     * @return GetTransactionReceiptResponse
     */
    abstract waitForTransaction(txHash: BigNumberish, options?: waitForTransactionOptions): Promise<GetTransactionReceiptResponse>;
    /**
     * Simulates the transaction and returns the transaction trace and estimated fee.
     *
     * @param invocations AccountInvocations - Complete invocations array with account details
     * @param options - getSimulateTransactionOptions
     *  - (optional) blockIdentifier - block identifier
     *  - (optional) skipValidate - skip cairo __validate__ method
     *  - (optional) skipExecute - skip cairo __execute__ method
     * @returns an array of transaction trace and estimated fee
     */
    abstract getSimulateTransaction(invocations: AccountInvocations, options?: getSimulateTransactionOptions): Promise<SimulateTransactionResponse>;
    /**
     * Gets the state changes in a specific block (result of executing the requested block)
     *
     * @param blockIdentifier - block identifier
     * @returns StateUpdateResponse
     */
    abstract getStateUpdate(blockIdentifier?: BlockIdentifier): Promise<StateUpdateResponse>;
    /**
     * Gets the contract version from the provided address
     * @param contractAddress string
     * @param classHash undefined
     * @param options - getContractVersionOptions
     *   - (optional) compiler - (default true) extract compiler version using type tactic from abi
     *   - (optional) blockIdentifier - block identifier
     */
    abstract getContractVersion(contractAddress: string, classHash?: undefined, options?: getContractVersionOptions): Promise<ContractVersion>;
    /**
     * Gets the contract version from the provided address
     * @param contractAddress undefined
     * @param classHash
     * @param options - getContractVersionOptions
     *   - (optional) compiler - (default true) extract compiler version using type tactic from abi
     *   - (optional) blockIdentifier - block identifier
     */
    abstract getContractVersion(contractAddress: undefined, classHash: string, options?: getContractVersionOptions): Promise<ContractVersion>;
}

declare class RpcProvider$1 implements ProviderInterface {
    responseParser: RPCResponseParser;
    channel: RpcChannel | RpcChannel$1;
    constructor(optionsOrProvider?: RpcProviderOptions | ProviderInterface | RpcProvider$1);
    fetch(method: string, params?: object, id?: string | number): Promise<Response>;
    getChainId(): Promise<StarknetChainId>;
    getSpecVersion(): Promise<string>;
    getNonceForAddress(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<string>;
    getBlock(): Promise<PendingBlock>;
    getBlock(blockIdentifier: 'pending'): Promise<PendingBlock>;
    getBlock(blockIdentifier: 'latest'): Promise<Block$1>;
    getBlock(blockIdentifier?: BlockIdentifier): Promise<GetBlockResponse>;
    /**
     * Get the most recent accepted block hash and number
     */
    getBlockLatestAccepted(): Promise<BlockHashAndNumber>;
    /**
     * Get the most recent accepted block number
     * redundant use getBlockLatestAccepted();
     * @returns Number of the latest block
     */
    getBlockNumber(): Promise<number>;
    getBlockWithTxHashes(blockIdentifier?: BlockIdentifier): Promise<BlockWithTxHashes$1>;
    getBlockWithTxs(blockIdentifier?: BlockIdentifier): Promise<BlockWithTxs>;
    /**
     * Pause the execution of the script until a specified block is created.
     * @param {BlockIdentifier} blockIdentifier bloc number (BigNumberish) or 'pending' or 'latest'.
     * Use of 'latest" or of a block already created will generate no pause.
     * @param {number} [retryInterval] number of milliseconds between 2 requests to the node
     * @example
     * ```typescript
     * await myProvider.waitForBlock();
     * // wait the creation of the pending block
     * ```
     */
    waitForBlock(blockIdentifier?: BlockIdentifier, retryInterval?: number): Promise<void>;
    getL1GasPrice(blockIdentifier?: BlockIdentifier): Promise<string>;
    getL1MessageHash(l2TxHash: BigNumberish): Promise<string>;
    getBlockWithReceipts(blockIdentifier?: BlockIdentifier): Promise<BlockWithTxReceipts>;
    getStateUpdate: {
        (): Promise<PendingStateUpdate>;
        (blockIdentifier: "pending"): Promise<PendingStateUpdate>;
        (blockIdentifier: "latest"): Promise<StateUpdate>;
        (blockIdentifier?: BlockIdentifier): Promise<StateUpdateResponse>;
    };
    getBlockStateUpdate(): Promise<PendingStateUpdate>;
    getBlockStateUpdate(blockIdentifier: 'pending'): Promise<PendingStateUpdate>;
    getBlockStateUpdate(blockIdentifier: 'latest'): Promise<StateUpdate>;
    getBlockStateUpdate(blockIdentifier?: BlockIdentifier): Promise<StateUpdateResponse>;
    getBlockTransactionsTraces(blockIdentifier?: BlockIdentifier): Promise<BlockTransactionsTraces>;
    getBlockTransactionCount(blockIdentifier?: BlockIdentifier): Promise<number>;
    /**
     * Return transactions from pending block
     * @deprecated Instead use getBlock(BlockTag.PENDING); (will be removed in next minor version)
     * Utility method, same result can be achieved using getBlockWithTxHashes(BlockTag.pending);
     */
    getPendingTransactions(): Promise<TransactionWithHash$1[]>;
    getTransaction(txHash: BigNumberish): Promise<TransactionWithHash$1>;
    getTransactionByHash(txHash: BigNumberish): Promise<TransactionWithHash$1>;
    getTransactionByBlockIdAndIndex(blockIdentifier: BlockIdentifier, index: number): Promise<TransactionWithHash$1>;
    getTransactionReceipt(txHash: BigNumberish): Promise<GetTransactionReceiptResponse>;
    getTransactionTrace(txHash: BigNumberish): Promise<TRANSACTION_TRACE>;
    /**
     * Get the status of a transaction
     */
    getTransactionStatus(transactionHash: BigNumberish): Promise<TransactionStatus$1>;
    /**
     * @param invocations AccountInvocations
     * @param options blockIdentifier and flags to skip validation and fee charge<br/>
     * - blockIdentifier<br/>
     * - skipValidate (default false)<br/>
     * - skipFeeCharge (default true)<br/>
     */
    getSimulateTransaction(invocations: AccountInvocations, options?: getSimulateTransactionOptions): Promise<SimulateTransactionResponse>;
    waitForTransaction(txHash: BigNumberish, options?: waitForTransactionOptions): Promise<GetTransactionReceiptResponse>;
    getStorageAt(contractAddress: BigNumberish, key: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<string>;
    getClassHashAt(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<string>;
    getClassByHash(classHash: BigNumberish): Promise<LegacyContractClass | Omit<CompiledSierra, "sierra_program_debug_info">>;
    getClass(classHash: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<LegacyContractClass | Omit<CompiledSierra, "sierra_program_debug_info">>;
    getClassAt(contractAddress: BigNumberish, blockIdentifier?: BlockIdentifier): Promise<LegacyContractClass | Omit<CompiledSierra, "sierra_program_debug_info">>;
    getContractVersion(contractAddress: BigNumberish, classHash?: undefined, options?: getContractVersionOptions): Promise<ContractVersion>;
    getContractVersion(contractAddress: undefined, classHash: BigNumberish, options?: getContractVersionOptions): Promise<ContractVersion>;
    /**
     * @deprecated use get*type*EstimateFee (will be refactored based on type after sequencer deprecation)
     */
    getEstimateFee(invocation: Invocation, invocationDetails: InvocationsDetailsWithNonce, blockIdentifier?: BlockIdentifier, skipValidate?: boolean): Promise<EstimateFeeResponse>;
    getInvokeEstimateFee(invocation: Invocation, invocationDetails: InvocationsDetailsWithNonce, blockIdentifier?: BlockIdentifier, skipValidate?: boolean): Promise<EstimateFeeResponse>;
    getDeclareEstimateFee(invocation: DeclareContractTransaction, details: InvocationsDetailsWithNonce, blockIdentifier?: BlockIdentifier, skipValidate?: boolean): Promise<EstimateFeeResponse>;
    getDeployAccountEstimateFee(invocation: DeployAccountContractTransaction, details: InvocationsDetailsWithNonce, blockIdentifier?: BlockIdentifier, skipValidate?: boolean): Promise<EstimateFeeResponse>;
    getEstimateFeeBulk(invocations: AccountInvocations, options: getEstimateFeeBulkOptions): Promise<EstimateFeeResponseBulk>;
    invokeFunction(functionInvocation: Invocation, details: InvocationsDetailsWithNonce): Promise<InvokedTransaction$2>;
    declareContract(transaction: DeclareContractTransaction, details: InvocationsDetailsWithNonce): Promise<DeclaredTransaction$2>;
    deployAccountContract(transaction: DeployAccountContractTransaction, details: InvocationsDetailsWithNonce): Promise<DeployedAccountTransaction$1>;
    callContract(call: Call, blockIdentifier?: BlockIdentifier): Promise<string[]>;
    /**
     * NEW: Estimate the fee for a message from L1
     * @param message Message From L1
     */
    estimateMessageFee(message: L1Message$1, blockIdentifier?: BlockIdentifier): Promise<FEE_ESTIMATE>;
    /**
     * Returns an object about the sync status, or false if the node is not synching
     * @returns Object with the stats data
     */
    getSyncingStats(): Promise<Syncing>;
    /**
     * Returns all events matching the given filter
     * @returns events and the pagination of the events
     */
    getEvents(eventFilter: EventFilter$1): Promise<EVENTS_CHUNK>;
    /**
     * Verify in Starknet a signature of a TypedData object or of a given hash.
     * @param {BigNumberish | TypedData} message TypedData object to be verified, or message hash to be verified.
     * @param {Signature} signature signature of the message.
     * @param {BigNumberish} accountAddress address of the account that has signed the message.
     * @param {string} [signatureVerificationFunctionName] if account contract with non standard account verification function name.
     * @param { okResponse: string[]; nokResponse: string[]; error: string[] } [signatureVerificationResponse] if account contract with non standard response of verification function.
     * @returns
     * ```typescript
     * const myTypedMessage: TypedMessage = .... ;
     * const messageHash = typedData.getMessageHash(myTypedMessage,accountAddress);
     * const sign: WeierstrassSignatureType = ec.starkCurve.sign(messageHash, privateKey);
     * const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
     * const result1 = myRpcProvider.verifyMessageInStarknet(myTypedMessage, sign, accountAddress);
     * const result2 = myRpcProvider.verifyMessageInStarknet(messageHash, sign, accountAddress);
     * // result1 = result2 = true
     * ```
     */
    verifyMessageInStarknet(message: BigNumberish | TypedData, signature: Signature, accountAddress: BigNumberish, signatureVerificationFunctionName?: string, signatureVerificationResponse?: {
        okResponse: string[];
        nokResponse: string[];
        error: string[];
    }): Promise<boolean>;
    /**
     * Test if class is already declared from ContractClassIdentifier
     * Helper method using getClass
     * @param ContractClassIdentifier
     * @param blockIdentifier
     */
    isClassDeclared(contractClassIdentifier: ContractClassIdentifier, blockIdentifier?: BlockIdentifier): Promise<boolean>;
    /**
     * Build bulk invocations with auto-detect declared class
     * 1. Test if class is declared if not declare it preventing already declared class error and not declared class errors
     * 2. Order declarations first
     * @param invocations
     */
    prepareInvocations(invocations: Invocations): Promise<Invocations>;
}

declare class StarknetId {
    getStarkName(address: BigNumberish, StarknetIdContract?: string): Promise<string>;
    getAddressFromStarkName(name: string, StarknetIdContract?: string): Promise<string>;
    getStarkProfile(address: BigNumberish, StarknetIdContract?: string, StarknetIdIdentityContract?: string, StarknetIdVerifierContract?: string, StarknetIdPfpContract?: string, StarknetIdPopContract?: string, StarknetIdMulticallContract?: string): Promise<StarkProfile>;
    static getStarkName(provider: ProviderInterface, address: BigNumberish, StarknetIdContract?: string): Promise<string>;
    static getAddressFromStarkName(provider: ProviderInterface, name: string, StarknetIdContract?: string): Promise<string>;
    static getStarkProfile(provider: ProviderInterface, address: BigNumberish, StarknetIdContract?: string, StarknetIdIdentityContract?: string, StarknetIdVerifierContract?: string, StarknetIdPfpContract?: string, StarknetIdPopContract?: string, StarknetIdMulticallContract?: string): Promise<StarkProfile>;
}

declare const RpcProvider_base: ts_mixer_dist_types_types.Class<any[], RpcProvider$1 & StarknetId, typeof RpcProvider$1 & typeof StarknetId>;
declare class RpcProvider extends RpcProvider_base {
}

declare function fixStack(target: Error, fn?: Function): void;
declare function fixProto(target: Error, prototype: {}): void;
declare class CustomError extends Error {
    name: string;
    constructor(message?: string);
}
declare class LibraryError extends CustomError {
}
declare class RpcError<BaseErrorT extends RPC_ERROR = RPC_ERROR> extends LibraryError {
    readonly baseError: BaseErrorT;
    readonly request: {
        method: string;
        params: any;
    };
    constructor(baseError: BaseErrorT, method: string, params: any);
    get code(): 1 | 10 | 20 | 24 | 27 | 28 | 29 | 31 | 32 | 33 | 34 | 40 | 41 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63;
    /**
     * Verifies the underlying RPC error, also serves as a type guard for the _baseError_ property
     * @example
     * ```typescript
     * SomeError.isType('UNEXPECTED_ERROR');
     * ```
     */
    isType<N extends keyof RPC_ERROR_SET, C extends RPC_ERROR_SET[N]['code']>(typeName: N): this is RpcError<RPC_ERROR_SET[N] & {
        code: C;
    }>;
}

declare const defaultProvider: RpcProvider$1;

declare abstract class SignerInterface {
    /**
     * Method to get the public key of the signer
     *
     * @returns {string} hex-string
     * @example
     * ```typescript
     * const mySigner = new Signer("0x123");
     * const result = await mySigner.getPubKey();
     * // result = "0x566d69d8c99f62bc71118399bab25c1f03719463eab8d6a444cd11ece131616"
     * ```
     */
    abstract getPubKey(): Promise<string>;
    /**
     * Signs a JSON object for off-chain usage with the private key and returns the signature.
     * This adds a message prefix so it can't be interchanged with transactions
     *
     * @param {TypedData} typedData JSON object to be signed
     * @param {string} accountAddress Hex string of the account's address
     * @returns {Promise<Signature>} the signature of the message
     * @example
     * ```typescript
     * const mySigner = new Signer("0x123");
     *     const myTypedData: TypedData = {
     *         domain: {name: "Example DApp",
     *           chainId: constants.StarknetChainId.SN_SEPOLIA,
     *           version: "0.0.3"},
     *         types: {StarkNetDomain: [
     *             { name: "name", type: "string" },
     *             { name: "chainId", type: "felt" },
     *             { name: "version", type: "string" }],
     *           Message: [{ name: "message", type: "felt" }]},
     *         primaryType: "Message", message: {message: "1234"}};
     *     const result = await mySigner.signMessage(myTypedData,"0x5d08a4e9188429da4e993c9bf25aafe5cd491ee2b501505d4d059f0c938f82d");
     * // result = Signature {r: 684915484701699003335398790608214855489903651271362390249153620883122231253n,
     * // s: 1399150959912500412309102776989465580949387575375484933432871778355496929189n, recovery: 1}
     * ```
  
     */
    abstract signMessage(typedData: TypedData, accountAddress: string): Promise<Signature>;
    /**
     * Signs transactions with the private key and returns the signature
     *
     * @param {Call[]} transactions array of Call objects
     * @param {InvocationsSignerDetails} transactionsDetail InvocationsSignerDetails object
     * @returns {Promise<Signature>} the signature of the transaction
     * @example
     * ```typescript
     * const mySigner = new Signer("0x123");
     * const calls: Call[] = [{
     *     contractAddress: "0x1234567890123456789012345678901234567890",
     *     entrypoint: "functionName",
     *     calldata: [1, 2, 3]
     * }];
     * const transactionsDetail: InvocationsSignerDetails = {
     *     walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
     *     chainId: constants.StarknetChainId.SN_MAIN,
     *     cairoVersion: "1",
     *     maxFee: '0x1234567890abcdef',
     *     version: "0x0", nonce: 1};
     * const result = await mySigner.signTransaction(calls, transactionsDetail);
     * // result = Signature {r: 304910226421970384958146916800275294114105560641204815169249090836676768876n,
     * //   s: 1072798866000813654190523783606274062837012608648308896325315895472901074693n, recovery: 0}
     * ```
     */
    abstract signTransaction(transactions: Call[], transactionsDetail: InvocationsSignerDetails): Promise<Signature>;
    /**
     * Signs a DEPLOY_ACCOUNT transaction with the private key and returns the signature
     *
     * @param {DeployAccountSignerDetails} transaction to deploy an account contract
     * @returns {Promise<Signature>} the signature of the transaction to deploy an account
     * @example
     * ```typescript
     * const mySigner = new Signer("0x123");
     * const myDeployAcc: DeployAccountSignerDetails = {
     *   contractAddress: "0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641",
     *   version: "0x2", chainId: constants.StarknetChainId.SN_SEPOLIA,
     *   classHash: "0x5f3614e8671257aff9ac38e929c74d65b02d460ae966cd826c9f04a7fa8e0d4",
     *   constructorCalldata: [1, 2],addressSalt: 1234,
     *   nonce: 45, maxFee: 10 ** 15, tip: 0, paymasterData: [],accountDeploymentData: [],
     *   nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
     *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
     *   resourceBounds: stark.estimateFeeToBounds(constants.ZERO),
     * }
     * const result = await mySigner.signDeployAccountTransaction(myDeployAcc);
     * // result = Signature {r: 2871311234341436528393212130310036951068553852419934781736214693308640202748n,
     * //  s: 1746271646048888422437132495446973163454853863041370993384284773665861377605n, recovery: 1}
     * ```
     */
    abstract signDeployAccountTransaction(transaction: DeployAccountSignerDetails): Promise<Signature>;
    /**
     * Signs a DECLARE transaction with the private key and returns the signature
     *
     * @param {DeclareSignerDetails} transaction to declare a class
     * @returns {Promise<Signature>} the signature of the transaction to declare a class
     * @example
     * ```typescript
     * const mySigner = new Signer("0x123");
     * const myDeclare: DeclareSignerDetails = {
     *   version: "0x2", chainId: constants.StarknetChainId.SN_SEPOLIA,
     *   senderAddress: "0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641",
     *   classHash: "0x5f3614e8671257aff9ac38e929c74d65b02d460ae966cd826c9f04a7fa8e0d4",
     *   nonce: 45, maxFee: 10 ** 15, tip: 0, paymasterData: [], accountDeploymentData: [],
     *   nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
     *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
     *   resourceBounds: stark.estimateFeeToBounds(constants.ZERO),
  }
     * const result = await mySigner.signDeclareTransaction(myDeclare);
     * // result = Signature {r: 2432056944313955951711774394836075930010416436707488863728289188289211995670n,
     * //  s: 3407649393310177489888603098175002856596469926897298636282244411990343146307n, recovery: 1}
     * ```
     */
    abstract signDeclareTransaction(transaction: DeclareSignerDetails): Promise<Signature>;
}

declare class Signer implements SignerInterface {
    protected pk: Uint8Array | string;
    constructor(pk?: Uint8Array | string);
    getPubKey(): Promise<string>;
    signMessage(typedData: TypedData, accountAddress: string): Promise<Signature>;
    signTransaction(transactions: Call[], details: InvocationsSignerDetails): Promise<Signature>;
    signDeployAccountTransaction(details: DeployAccountSignerDetails): Promise<Signature>;
    signDeclareTransaction(details: DeclareSignerDetails): Promise<Signature>;
    protected signRaw(msgHash: string): Promise<Signature>;
}

/**
 * Signer for accounts using Ethereum signature
 */
declare class EthSigner implements SignerInterface {
    protected pk: string;
    constructor(pk?: Uint8Array | string);
    /**
     * provides the Ethereum full public key (without parity prefix)
     * @returns an hex string : 64 first characters are Point X coordinate. 64 last characters are Point Y coordinate.
     */
    getPubKey(): Promise<string>;
    signMessage(typedData: TypedData, accountAddress: string): Promise<Signature>;
    signTransaction(transactions: Call[], details: InvocationsSignerDetails): Promise<Signature>;
    signDeployAccountTransaction(details: DeployAccountSignerDetails): Promise<Signature>;
    signDeclareTransaction(details: DeclareSignerDetails): Promise<Signature>;
    /**
     * Serialize the signature in conformity with starknet::eth_signature::Signature
     * @param ethSignature secp256k1 signature from Noble curves library
     * @return an array of felts, representing a Cairo Eth Signature.
     */
    protected formatEthSignature(ethSignature: RecoveredSignatureType): ArraySignatureType;
}

type _Transport = any;
/**
 * Signer for accounts using a Ledger Nano S+/X signature (Starknet Ledger APP version 1.1.1)
 *
 * The Ledger has to be connected, unlocked and the Starknet APP has to be selected prior of use of this class.
 */
declare class LedgerSigner111<Transport extends Record<any, any> = any> implements SignerInterface {
    readonly transporter: Transport;
    protected _transporter: _Transport;
    readonly accountID: number;
    readonly eip2645applicationName: string;
    readonly pathBuffer: Uint8Array;
    protected appVersion: string;
    protected pubKey: string;
    protected fullPubKey: string;
    /**
     * constructor of the LedgerSigner class.
     * @param {Transport} transport 5 transports are available to handle USB, bluetooth, Node, Web, Mobile.
     * See Guides for more details.
     * @param {number} accountID ID of Ledger Nano (can handle 2**31 accounts).
     * @param {string} [eip2645application='LedgerW'] A wallet is defined by an ERC2645 derivation path (6 items),
     * and one item is the `application` and can be customized.
     * Default value is `LedgerW`.
     * @param {LedgerPathCalculation} [pathFunction=getLedgerPathBuffer111]
     * defines the function that will calculate the path. By default `getLedgerPathBuffer111` is selected.
     * @example
     * ```typescript
     * import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";
     * const myNodeTransport = await TransportNodeHid.create();
     * const myLedgerSigner = new LedgerSigner111(myNodeTransport, 0);
     * ```
     */
    constructor(transport: Transport, accountID: number, eip2645application?: string, pathFunction?: LedgerPathCalculation);
    /**
     * provides the Starknet public key
     * @returns an hex string : 64 characters are Point X coordinate.
     * @example
     * ```typescript
     * const result = await myLedgerSigner.getPubKey();
     * // result= "0x03681417ba3e1f050dd3ccdceb8d22b5e44fa70ee7844d472c6a768bded5174e"
     * ```
     */
    getPubKey(): Promise<string>;
    /**
     * provides the full public key (with parity prefix)
     * @returns an hex string : 2 first characters are the parity, the 64 following characters are Point X coordinate. 64 last characters are Point Y coordinate.
     * @example
     * ```typescript
     * const result = await myLedgerSigner.getFullPubKey();
     * // result= "0x0403681417ba3e1f050dd3ccdceb8d22b5e44fa70ee7844d472c6a768bded5174e03cbc86f805dcfcb0c1922dd4daf181afa289d86223a18bc856276615bcc7787"
     * ```
     */
    getFullPubKey(): Promise<string>;
    /**
     * Returns the version of the Starknet APP implemented in the Ledger.
     * @returns {string} version.
     * @example
     * ```typescript
     * const result = await myLedgerSigner.getAppVersion();
     * // result= "1.1.1"
     * ```
     */
    getAppVersion(): Promise<string>;
    /**
     * Sign a TypedData message (SNIP-12) in a Ledger.
     * @param {typedDataToHash} typedDataToHash A TypedData message compatible with SNIP-12.
     * @param {string} accountAddress Signer account address (Hex or num string)
     * @returns {Signature} The signed message.
     * @example
     * ```typescript
     * const result = myLedgerSigner.signMessage(snip12Message, account0.address);
     * // result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
     * // s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
     * // recovery: 0}
     * ```
     */
    signMessage(typedDataToHash: TypedData, accountAddress: string): Promise<Signature>;
    /**
     * Sign in a Ledger a V1 or a V3 transaction. This is a blind sign on the Ledger screen.
     * @param {Call1[]} transactions An array of `Call` transactions (generated for example by `myContract.populate()`).
     * @param {InvocationsSignerDetails} transactionsDetail An object that includes all the necessary inputs to hash the transaction. Can be `V2InvocationsSignerDetails` or `V3InvocationsSignerDetails` type.
     * @returns {Signature} The signed transaction.
     * @example
     * ```typescript
     * const txDetailsV3: V3InvocationsSignerDetails = {
     * chainId: constants.StarknetChainId.SN_MAIN,
     * nonce: "28",
     * accountDeploymentData: [],
     * paymasterData: [],
     * cairoVersion: "1",
     * feeDataAvailabilityMode: "L1",
     * nonceDataAvailabilityMode: "L1",
     * resourceBounds: {
     *   l1_gas: {
     *     max_amount: "0x2a00",
     *     max_price_per_unit: "0x5c00000"
     *   },
     *   l2_gas: {
     *     max_amount: "0x00",
     *     max_price_per_unit: "0x00"
     *   },
     * },
     * tip: 0,
     * version: "0x3",
     * walletAddress: account0.address
     * }
     * const result = myLedgerSigner.signTransaction([call0, call1], txDetailsV3);
     * // result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
     * // s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
     * // recovery: 0}
     * ```
     */
    signTransaction(transactions: Call[], transactionsDetail: InvocationsSignerDetails): Promise<Signature>;
    /**
     * Sign in a Ledger the deployment of a new account. This is a blind sign on the Ledger screen.
     * @param {DeployAccountSignerDetails} details An object that includes all necessary data to calculate the Hash. It can be `V2DeployAccountSignerDetails` or `V3DeployAccountSignerDetails` types.
     * @returns {Signature} The deploy account signature.
     * @example
     * ```typescript
     * const result = myLedgerSigner.signDeployAccountTransaction(details);
     * // result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
     * // s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
     * // recovery: 0}
     * ```
     */
    signDeployAccountTransaction(details: DeployAccountSignerDetails): Promise<Signature>;
    /**
     * Sign in a Ledger the declaration of a new class. This is a blind sign on the Ledger screen.
     * @param {DeclareSignerDetails} details An object that includes all necessary data to calculate the Hash. It can be `V3DeclareSignerDetails` or `V2DeclareSignerDetails` types.
     * @returns {Signature} The declare Signature.
     * @example
     * ```typescript
     * const result = myLedgerSigner.signDeclareTransaction(details);
     * // result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
     * // s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
     * // recovery: 0}
     * ```
     */
    signDeclareTransaction(details: DeclareSignerDetails): Promise<Signature>;
    /**
     * Internal function to sign a hash in a Ledger Nano.
     * This is a blind sign in the Ledger ; no display of what you are signing.
     */
    protected signRaw(msgHash: string): Promise<Signature>;
    /** internal function to get both the Starknet public key and the full public key */
    protected getPublicKeys(): Promise<void>;
}
/**
 * Format the Ledger wallet path to an Uint8Array
 * for a Ledger Starknet DAPP v1.1.1.
 *
 * EIP2645 path = 2645'/starknet/application/0/accountId/0
 * @param {number} accountId Id of account. < 2**31.
 * @param {string} [applicationName='LedgerW'] utf8 string of application name.
 * @returns an Uint8array of 24 bytes.
 * @example
 * ```typescript
 * const result = getLedgerPathBuffer111(0);
 * // result = Uint8Array(24) [
 *   128,   0,  10,  85,  71, 65, 233, 201,
 *    43, 206, 231, 219,   0,  0,   0,   0,
 *     0,   0,   0,   0,   0,  0,   0,   0
 * ]
 * ```
 */
declare function getLedgerPathBuffer111(accountId: number, applicationName?: string): Uint8Array;

/**
 * Signer for accounts using a Ledger Nano S+/X signature (Starknet Ledger APP version 2.2.1).
 *
 * The Ledger has to be connected, unlocked and the Starknet APP has to be selected prior of use of this class.
 */
declare class LedgerSigner221<Transport extends Record<any, any> = any> extends LedgerSigner111 implements SignerInterface {
    /**
     * constructor of the LedgerSigner class.
     * @param {Transport} transport 5 transports are available to handle USB, bluetooth, Node, Web, Mobile.
     * See Guides for more details.
     * @param {number} accountID ID of Ledger Nano (can handle 2**31 accounts).
     * @param {string} [eip2645application='LedgerW'] A wallet is defined by an ERC2645 derivation path (6 items).
     * One item is called `application` and can be customized.
     * Default value is `LedgerW`.
     * @param {LedgerPathCalculation} [pathFunction=getLedgerPathBuffer221]
     * defines the function that will calculate the path. By default `getLedgerPathBuffer221` is selected.
     *
     * If you are using APP v2.2.1 with an account created with the v1.1.1, you need to use :
     * ```typescript
     * const myLedgerSigner = new LedgerSigner211(myNodeTransport, 0, undefined, getLedgerPathBuffer111);
     * ```
     * @example
     * ```typescript
     * import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";
     * const myNodeTransport = await TransportNodeHid.create();
     * const myLedgerSigner = new LedgerSigner211(myNodeTransport, 0);
     * ```
     */
    constructor(transport: Transport, accountID: number, eip2645application?: string, pathFunction?: LedgerPathCalculation);
    /**
     * Sign in a Ledger a V1 or a V3 transaction. The details are displayed on the Ledger screen.
     * @param {Call[]} transactions An array of `Call` transactions (generated for example by `myContract.populate()`).
     * @param {InvocationsSignerDetails} transactionsDetail An object that includes all the necessary inputs to hash the transaction. Can be `V2InvocationsSignerDetails` or `V3InvocationsSignerDetails` type.
     * @returns {Signature} The signed transaction.
     * @example
     * ```typescript
     * const txDetailsV3: V3InvocationsSignerDetails = {
     * chainId: constants.StarknetChainId.SN_MAIN,
     * nonce: "28",
     * accountDeploymentData: [],
     * paymasterData: [],
     * cairoVersion: "1",
     * feeDataAvailabilityMode: "L1",
     * nonceDataAvailabilityMode: "L1",
     * resourceBounds: {
     *   l1_gas: {
     *     max_amount: "0x2a00",
     *     max_price_per_unit: "0x5c00000"
     *   },
     *   l2_gas: {
     *     max_amount: "0x00",
     *     max_price_per_unit: "0x00"
     *   },
     * },
     * tip: 0,
     * version: "0x3",
     * walletAddress: account0.address
     * }
     * const result = myLedgerSigner.signTransaction([call0, call1], txDetailsV3);
     * // result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
     * // s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
     * // recovery: 0}
     * ```
     */
    signTransaction(transactions: Call[], transactionsDetail: InvocationsSignerDetails): Promise<Signature>;
    /**
     * Sign in a Ledger the deployment of a new account. The details are displayed on the Ledger screen.
     * @param {DeployAccountSignerDetails} details An object that includes all necessary data to calculate the Hash. It can be `V2DeployAccountSignerDetails` or `V3DeployAccountSignerDetails` types.
     * @returns {Signature} The deploy account signature.
     * @example
     * ```typescript
     * const result = myLedgerSigner.signDeployAccountTransaction(details);
     * // result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
     * // s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
     * // recovery: 0}
     * ```
     */
    signDeployAccountTransaction(details: DeployAccountSignerDetails): Promise<Signature>;
    /**
     * Internal function to convert a bigNumberish to an Uint8array of 256 bits
     * @param {BigNumberish} input input value
     * @returns {Uint8Array} a Uint8Array containing 32 bytes.
     */
    protected convertBnToLedger(input: BigNumberish): Uint8Array;
    /**
     * Internal function to decode the response of the Ledger signature
     * @param {Uint8Array} respSign the Buffer response of the Ledger
     * @returns { hash: bigint; signature: Signature } transaction hash & signature
     */
    protected decodeSignatureLedger(respSign: Uint8Array): {
        hash: bigint;
        signature: Signature;
    };
    /** Internal function to convert a Call to an array of Uint8Array.
     * @param {Call} call A Call to convert.
     * @return {Uint8Array[]} Call encoded in an array of Uint8Array (each containing 7 u256).
     */
    protected encodeCall(call: Call): Uint8Array[];
    /**
     * Ask the Ledger Nano to display and sign a Starknet V1 transaction.
     * @param {V2InvocationsSignerDetails} txDetails All the details needed for a txV1.
     * @param {Call[]} calls array of Starknet invocations
     * @returns an object including the transaction Hash and the signature
     * @example
     * ```typescript
     * const calls: Call[] = [{contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
     *      entrypoint: "transfer",
     *      calldata:["0x11f5fc2a92ac03434a7937fe982f5e5293b65ad438a989c5b78fb8f04a12016",
     *        "0x9184e72a000", "0x0"]}];
     * const txDet: V2InvocationsSignerDetails = {
     *    walletAddress: txDetails.accountAddress,
     *    chainId: constants.StarknetChainId.SN_MAIN,
     *    cairoVersion: "1", maxFee: txDetails.max_fee,
     *    nonce: txDetails.nonce, version: "0x1"
     *  };
     * const res = await myLedgerSigner.signTxV1(txDet, calls);
     * // res = {hash:
     * //   signature:
     * // }
     * ```
     */
    signTxV1(txDetails: V2InvocationsSignerDetails, calls: Call[]): Promise<{
        hash: bigint;
        signature: Signature;
    }>;
    /**
     * Ask to the Ledger Nano to display and sign a Starknet V3 transaction.
     * @param {V3InvocationsSignerDetails} txDetails All the details needed for a txV3.
     * @param {Call[]} calls array of Starknet invocations
     * @returns an object including the transaction Hash and the signature
     * @example
     * ```typescript
     * const calls: Call[] = [{contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
     *      entrypoint: "transfer",
     *      calldata:["0x11f5fc2a92ac03434a7937fe982f5e5293b65ad438a989c5b78fb8f04a12016",
     *        "0x9184e72a000", "0x0"]}];
     * const txDetailsV3: V3InvocationsSignerDetails = {
     *   chainId: constants.StarknetChainId.SN_MAIN,
     *   nonce: "28", accountDeploymentData: [],
     *   paymasterData: [], cairoVersion: "1",
     *   feeDataAvailabilityMode: "L1", nonceDataAvailabilityMode: "L1",
     *   resourceBounds: {
     *     l1_gas: { max_amount: "0x2a00", max_price_per_unit: "0x5c00000"
     *     },
     *     l2_gas: { max_amount: "0x00", max_price_per_unit: "0x00"},
     *   }, tip: 0, version: "0x3", walletAddress: account0.address
     *  };
     * const res = await myLedgerSigner.signTxV3(txDetailsV3, calls);
     * // res = {hash:
     * //   signature:
     * // }
     * ```
     */
    signTxV3(txDetails: V3InvocationsSignerDetails, calls: Call[]): Promise<{
        hash: bigint;
        signature: Signature;
    }>;
    /**
     * Ask the Ledger Nano to display and sign a Starknet V1 account deployment.
     * @param {V2DeployAccountSignerDetails} deployAccountDetail All the details needed for a V1 deploy account.
     * @returns an object including the transaction Hash and the signature
     * @example
     * ```typescript
     * const deployData: V2DeployAccountSignerDetails =
     * {
     *  tip: 0, paymasterData: [], accountDeploymentData: [],
     *  nonceDataAvailabilityMode: 'L1', feeDataAvailabilityMode: 'L1',
     *  resourceBounds: {
     *    l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
     *    l1_gas: { max_amount: '0x0', max_price_per_unit: '0x0' }
     *   },
     *  classHash: '0x540d7f5ec7ecf317e68d48564934cb99259781b1ee3cedbbc37ec5337f8e688',
     *  constructorCalldata: [
     *    '89832696000889662999767022750851886674077821293893187900664573372145410755'
     *  ],
     *  contractAddress: '0x32c60fba64eb96831d064bbb2319375b7b7381543abe66da872e4344bcd72a0',
     *  addressSalt: '0x0032d7efe2a9232f9b463e7206c68fdea4aeb13fec0cb308c6ba1d197d5922c3',
     *  chainId: '0x534e5f5345504f4c4941', maxFee: 55050000000000n,
     *  version: '0x1', nonce: 0n
     *}
     * const res = await myLedgerSigner.signDeployAccountV1(deployData);
     * // res = {hash:
     * //   signature:
     * // }
     * ```
     */
    signDeployAccountV1(deployAccountDetail: V2DeployAccountSignerDetails): Promise<{
        hash: bigint;
        signature: Signature;
    }>;
    /**
     *Ask the Ledger Nano to display and sign a Starknet V3 account deployment.
     * @param {V3DeployAccountSignerDetails} deployAccountDetail All the details needed for a V3 deploy account.
     * @returns an object including the transaction Hash and the signature
     * @example
     * ```typescript
     * const deployData: V3DeployAccountSignerDetails =
     * {
     *  tip: 0, paymasterData: [], accountDeploymentData: [],
     *  nonceDataAvailabilityMode: 'L1', feeDataAvailabilityMode: 'L1',
     *  resourceBounds: {
     *    l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
     *    l1_gas: { max_amount: '0x226', max_price_per_unit: '0x22ecb25c00' }
     *   },
     *  classHash: '0x540d7f5ec7ecf317e68d48564934cb99259781b1ee3cedbbc37ec5337f8e688',
     *  constructorCalldata: [
     *    '3571125127744830445572285574469842579401255431821644822726857471463672199621'
     *  ],
     *  contractAddress: '0x4ca062add1cf12a107be1107af17981cf6e544a24d987693230ea481d3d5e34',
     *  addressSalt: '0x07e52f68e3160e1ef698211cdf6d3792368fe347e7e2d4a8ace14d9b248f39c5',
     *  chainId: '0x534e5f5345504f4c4941', maxFee: 0,
     *  version: '0x3', nonce: 0n
     *}
     * const res = await myLedgerSigner.signDeployAccountV3(deployData);
     * // res = {hash:
     * //   signature:
     * // }
     * ```
     */
    signDeployAccountV3(deployAccountDetail: V3DeployAccountSignerDetails): Promise<{
        hash: bigint;
        signature: Signature;
    }>;
}
/**
 * Format the Ledger wallet path to an Uint8Array.
 * for a Ledger Starknet DAPP v2.2.0
 * EIP2645 path = 2645'/starknet'/application'/0'/accountId'/0
 * @param {number} accountId Id of account. < 2**31.
 * @param {string} [applicationName='LedgerW'] utf8 string of application name.
 * @returns an Uint8array of 24 bytes.
 * @example
 * ```typescript
 * const result = getLedgerPathBuffer211(0);
 * // result = Uint8Array(24) [
 *   128,   0,  10,  85, 199, 65, 233, 201,
 *   171, 206, 231, 219, 128,  0,   0,   0,
 *   128,   0,   0,   0,   0,  0,   0,   0
 * ]
 * ```
 */
declare function getLedgerPathBuffer221(accountId: number, applicationName?: string): Uint8Array;

declare abstract class AccountInterface extends ProviderInterface {
    abstract address: string;
    abstract signer: SignerInterface;
    abstract cairoVersion: CairoVersion;
    /**
     * Estimate Fee for executing an INVOKE transaction on starknet
     *
     * @param calls the invocation object containing:
     * - contractAddress - the address of the contract
     * - entrypoint - the entrypoint of the contract
     * - calldata? - (defaults to []) the calldata
     *
     * @param estimateFeeDetails -
     * - blockIdentifier?
     * - nonce? = 0
     * - skipValidate? - default true
     * - tip? - prioritize order of transactions in the mempool.
     * - accountDeploymentData? - deploy an account contract (substitution for deploy account transaction)
     * - paymasterData? - entity other than the transaction sender to pay the transaction fees(EIP-4337)
     * - nonceDataAvailabilityMode? - allows users to choose their preferred data availability mode (Volition)
     * - feeDataAvailabilityMode? - allows users to choose their preferred data availability mode (Volition)
     * - version? - specify ETransactionVersion - V3 Transactions fee is in fri, oldV transactions fee is in wei
     *
     * @returns response from estimate_fee
     */
    abstract estimateInvokeFee(calls: AllowArray<Call>, estimateFeeDetails?: EstimateFeeDetails): Promise<EstimateFeeResponse>;
    /**
     * Estimate Fee for executing a DECLARE transaction on starknet
     *
     * @param contractPayload the payload object containing:
     * - contract - the compiled contract to be declared
     * - casm? - compiled cairo assembly. Cairo1(casm or compiledClassHash are required)
     * - classHash? - the class hash of the compiled contract. Precalculate for faster execution.
     * - compiledClassHash?: class hash of the cairo assembly. Cairo1(casm or compiledClassHash are required)
     *
     * @param estimateFeeDetails -
     * - blockIdentifier?
     * - nonce? = 0
     * - skipValidate? - default true
     * - tip? - prioritize order of transactions in the mempool.
     * - accountDeploymentData? - deploy an account contract (substitution for deploy account transaction)
     * - paymasterData? - entity other than the transaction sender to pay the transaction fees(EIP-4337)
     * - nonceDataAvailabilityMode? - allows users to choose their preferred data availability mode (Volition)
     * - feeDataAvailabilityMode? - allows users to choose their preferred data availability mode (Volition)
     * - version? - specify ETransactionVersion - V3 Transactions fee is in fri, oldV transactions fee is in wei
     *
     * @returns response from estimate_fee
     */
    abstract estimateDeclareFee(contractPayload: DeclareContractPayload, estimateFeeDetails?: EstimateFeeDetails): Promise<EstimateFeeResponse>;
    /**
     * Estimate Fee for executing a DEPLOY_ACCOUNT transaction on starknet
     *
     * @param contractPayload -
     * - classHash - the class hash of the compiled contract.
     * - constructorCalldata? - constructor data;
     * - contractAddress? - future account contract address. Precalculate for faster execution.
     * - addressSalt? - salt used for calculation of the contractAddress. Required if contractAddress is provided.
     *
     * @param estimateFeeDetails -
     * - blockIdentifier?
     * - nonce? = 0
     * - skipValidate? - default true
     * - tip? - prioritize order of transactions in the mempool.
     * - paymasterData? - entity other than the transaction sender to pay the transaction fees(EIP-4337)
     * - nonceDataAvailabilityMode? - allows users to choose their preferred data availability mode (Volition)
     * - feeDataAvailabilityMode? - allows users to choose their preferred data availability mode (Volition)
     * - version? - specify ETransactionVersion - V3 Transactions fee is in fri, oldV transactions fee is in wei
     *
     * @returns response from estimate_fee
     */
    abstract estimateAccountDeployFee(contractPayload: DeployAccountContractPayload, estimateFeeDetails?: EstimateFeeDetails): Promise<EstimateFeeResponse>;
    /**
     * Estimate Fee for executing a UDC DEPLOY transaction on starknet
     * This is different from the normal DEPLOY transaction as it goes through the Universal Deployer Contract (UDC)
  
    * @param deployContractPayload array or singular
     * - classHash: computed class hash of compiled contract
     * - salt: address salt
     * - unique: bool if true ensure unique salt
     * - constructorCalldata: constructor calldata
     *
     * @param estimateFeeDetails -
     * - blockIdentifier?
     * - nonce?
     * - skipValidate? - default true
     * - tip? - prioritize order of transactions in the mempool.
     * - accountDeploymentData? - deploy an account contract (substitution for deploy account transaction)
     * - paymasterData? - entity other than the transaction sender to pay the transaction fees(EIP-4337)
     * - nonceDataAvailabilityMode? - allows users to choose their preferred data availability mode (Volition)
     * - feeDataAvailabilityMode? - allows users to choose their preferred data availability mode (Volition)
     * - version? - specify ETransactionVersion - V3 Transactions fee is in fri, oldV transactions fee is in wei
     */
    abstract estimateDeployFee(deployContractPayload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[], estimateFeeDetails?: EstimateFeeDetails): Promise<EstimateFeeResponse>;
    /**
     * Estimate Fee for executing a list of transactions on starknet
     * Contract must be deployed for fee estimation to be possible
     *
     * @param invocations array of transaction object containing :
     * - type - the type of transaction : 'DECLARE' | (multi)'DEPLOY' | (multi)'INVOKE_FUNCTION' | 'DEPLOY_ACCOUNT'
     * - payload - the payload of the transaction
     *
     *  @param details -
     * - blockIdentifier?
     * - nonce?
     * - skipValidate? - default true
     * - tip? - prioritize order of transactions in the mempool.
     * - accountDeploymentData? - deploy an account contract (substitution for deploy account transaction)
     * - paymasterData? - entity other than the transaction sender to pay the transaction fees(EIP-4337)
     * - nonceDataAvailabilityMode? - allows users to choose their preferred data availability mode (Volition)
     * - feeDataAvailabilityMode? - allows users to choose their preferred data availability mode (Volition)
     * - version? - specify ETransactionVersion - V3 Transactions fee is in fri, oldV transactions fee is in wei
     *
     * @returns response from estimate_fee
     */
    abstract estimateFeeBulk(invocations: Invocations, details?: EstimateFeeDetails): Promise<EstimateFeeResponseBulk>;
    /**
     * Gets Suggested Max Fee based on the transaction type
     *
     * @param  {EstimateFeeAction} estimateFeeAction
     * @param  {EstimateFeeDetails} details
     * @returns EstimateFee (...response, resourceBounds, suggestedMaxFee)
     */
    abstract getSuggestedFee(estimateFeeAction: EstimateFeeAction, details: EstimateFeeDetails): Promise<EstimateFee>;
    /**
     * Simulates an array of transaction and returns an array of transaction trace and estimated fee.
     *
     * @param invocations Invocations containing:
     * - type - transaction type: DECLARE, (multi)DEPLOY, DEPLOY_ACCOUNT, (multi)INVOKE_FUNCTION
     * @param details SimulateTransactionDetails
     *
     * @returns response from simulate_transaction
     */
    abstract simulateTransaction(invocations: Invocations, details?: SimulateTransactionDetails): Promise<SimulateTransactionResponse>;
    /**
     * Invoke execute function in account contract
     *
     * @param transactions the invocation object or an array of them, containing:
     * - contractAddress - the address of the contract
     * - entrypoint - the entrypoint of the contract
     * - calldata - (defaults to []) the calldata
     * - signature - (defaults to []) the signature
     * @param {InvocationsDetails} transactionsDetail Additional optional parameters for the transaction
     *
     * @returns response from addTransaction
     */
    abstract execute(transactions: AllowArray<Call>, transactionsDetail?: InvocationsDetails): Promise<InvokeFunctionResponse>;
    /**
     * @deprecated
     * @param transactions the invocation object or an array of them, containing:
     * - contractAddress - the address of the contract
     * - entrypoint - the entrypoint of the contract
     * - calldata - (defaults to []) the calldata
     * - signature - (defaults to []) the signature
     * @param abis (optional) the abi of the contract for better displaying
     * @param {InvocationsDetails} transactionsDetail Additional optional parameters for the transaction
     * * @returns response from addTransaction
     */
    abstract execute(transactions: AllowArray<Call>, abis?: Abi[], transactionsDetail?: InvocationsDetails): Promise<InvokeFunctionResponse>;
    /**
     * Declares a given compiled contract (json) to starknet
     *
     * @param contractPayload transaction payload to be deployed containing:
     * - contract: compiled contract code
     * - (optional) classHash: computed class hash of compiled contract. Pre-compute it for faster execution.
     * - (required for Cairo1 without compiledClassHash) casm: CompiledContract | string;
     * - (optional for Cairo1 with casm) compiledClassHash: compiled class hash from casm. Pre-compute it for faster execution.
     * @param transactionsDetail - InvocationsDetails
     *
     * @returns a confirmation of sending a transaction on the starknet contract
     */
    abstract declare(contractPayload: DeclareContractPayload, transactionsDetail?: InvocationsDetails): Promise<DeclareContractResponse>;
    /**
     * Deploys a declared contract to starknet - using Universal Deployer Contract (UDC)
     * support multicall
     *
     * @param payload -
     * - classHash: computed class hash of compiled contract
     * - [constructorCalldata] contract constructor calldata
     * - [salt=pseudorandom] deploy address salt
     * - [unique=true] ensure unique salt
     * @param details - InvocationsDetails
     *
     * @returns
     * - contract_address[]
     * - transaction_hash
     */
    abstract deploy(payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[], details?: InvocationsDetails): Promise<MultiDeployContractResponse>;
    /**
     * Simplify deploy simulating old DeployContract with same response + UDC specific response
     * Internal wait for L2 transaction, support multicall
     *
     * @param payload -
     * - classHash: computed class hash of compiled contract
     * - [constructorCalldata] contract constructor calldata
     * - [salt=pseudorandom] deploy address salt
     * - [unique=true] ensure unique salt
     * @param details - InvocationsDetails
     *
     * @returns
     *  - contract_address
     *  - transaction_hash
     *  - address
     *  - deployer
     *  - unique
     *  - classHash
     *  - calldata_len
     *  - calldata
     *  - salt
     */
    abstract deployContract(payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[], details?: InvocationsDetails): Promise<DeployContractUDCResponse>;
    /**
     * Declares and Deploy a given compiled contract (json) to starknet using UDC
     * Internal wait for L2 transaction, do not support multicall
     * Method will pass even if contract is already declared (internal using DeclareIfNot)
     *
     * @param payload
     * - contract: compiled contract code
     * - [casm=cairo1]: CairoAssembly | undefined;
     * - [compiledClassHash]: string | undefined;
     * - [classHash]: computed class hash of compiled contract
     * - [constructorCalldata] contract constructor calldata
     * - [salt=pseudorandom] deploy address salt
     * - [unique=true] ensure unique salt
     * @param details - InvocationsDetails
     *
     * @returns
     * - declare
     *    - transaction_hash
     * - deploy
     *    - contract_address
     *    - transaction_hash
     *    - address
     *    - deployer
     *    - unique
     *    - classHash
     *    - calldata_len
     *    - calldata
     *    - salt
     */
    abstract declareAndDeploy(payload: DeclareAndDeployContractPayload, details?: InvocationsDetails): Promise<DeclareDeployUDCResponse>;
    /**
     * Deploy the account on Starknet
     *
     * @param contractPayload transaction payload to be deployed containing:
     * - classHash: computed class hash of compiled contract
     * - optional constructor calldata
     * - optional address salt
     * - optional contractAddress
     * @param transactionsDetail - InvocationsDetails
     *
     * @returns a confirmation of sending a transaction on the starknet contract
     */
    abstract deployAccount(contractPayload: DeployAccountContractPayload, transactionsDetail?: InvocationsDetails): Promise<DeployContractResponse>;
    /**
     * Signs a TypedData object for off-chain usage with the Starknet private key and returns the signature
     * This adds a message prefix so it can't be interchanged with transactions
     *
     * @param typedData - TypedData object to be signed
     * @returns the signature of the TypedData object
     * @throws {Error} if typedData is not a valid TypedData
     */
    abstract signMessage(typedData: TypedData): Promise<Signature>;
    /**
     * Hash a TypedData object with Pedersen hash and return the hash
     * This adds a message prefix so it can't be interchanged with transactions
     *
     * @param typedData - TypedData object to be hashed
     * @returns the hash of the TypedData object
     * @throws {Error} if typedData is not a valid TypedData
     */
    abstract hashMessage(typedData: TypedData): Promise<string>;
    /**
     * Gets the nonce of the account with respect to a specific block
     *
     * @param  {BlockIdentifier} blockIdentifier - optional blockIdentifier. Defaults to 'pending'
     * @returns nonce of the account
     */
    abstract getNonce(blockIdentifier?: BlockIdentifier): Promise<Nonce>;
}

declare class Account extends RpcProvider implements AccountInterface {
    signer: SignerInterface;
    address: string;
    cairoVersion: CairoVersion;
    readonly transactionVersion: typeof ETransactionVersion$1.V2 | typeof ETransactionVersion$1.V3;
    constructor(providerOrOptions: ProviderOptions | ProviderInterface, address: string, pkOrSigner: Uint8Array | string | SignerInterface, cairoVersion?: CairoVersion, transactionVersion?: typeof ETransactionVersion$1.V2 | typeof ETransactionVersion$1.V3);
    protected getPreferredVersion(type12: ETransactionVersion$1, type3: ETransactionVersion$1): ETransactionVersion$1;
    getNonce(blockIdentifier?: BlockIdentifier): Promise<Nonce>;
    protected getNonceSafe(nonce?: BigNumberish): Promise<bigint>;
    /**
     * Retrieves the Cairo version from the network and sets `cairoVersion` if not already set in the constructor.
     * @param classHash if provided detects Cairo version from classHash, otherwise from the account address
     */
    getCairoVersion(classHash?: string): Promise<CairoVersion>;
    estimateFee(calls: AllowArray<Call>, estimateFeeDetails?: UniversalDetails): Promise<EstimateFee>;
    estimateInvokeFee(calls: AllowArray<Call>, details?: UniversalDetails): Promise<EstimateFee>;
    estimateDeclareFee(payload: DeclareContractPayload, details?: UniversalDetails): Promise<EstimateFee>;
    estimateAccountDeployFee({ classHash, addressSalt, constructorCalldata, contractAddress, }: DeployAccountContractPayload, details?: UniversalDetails): Promise<EstimateFee>;
    estimateDeployFee(payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[], details?: UniversalDetails): Promise<EstimateFee>;
    estimateFeeBulk(invocations: Invocations, details?: UniversalDetails): Promise<EstimateFeeBulk>;
    simulateTransaction(invocations: Invocations, details?: SimulateTransactionDetails): Promise<SimulateTransactionResponse>;
    execute(transactions: AllowArray<Call>, transactionsDetail?: UniversalDetails): Promise<InvokeFunctionResponse>;
    execute(transactions: AllowArray<Call>, abis?: Abi[], transactionsDetail?: UniversalDetails): Promise<InvokeFunctionResponse>;
    /**
     * First check if contract is already declared, if not declare it
     * If contract already declared returned transaction_hash is ''.
     * Method will pass even if contract is already declared
     * @param transactionsDetail (optional)
     */
    declareIfNot(payload: DeclareContractPayload, transactionsDetail?: UniversalDetails): Promise<DeclareContractResponse>;
    declare(payload: DeclareContractPayload, details?: UniversalDetails): Promise<DeclareContractResponse>;
    deploy(payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[], details?: UniversalDetails): Promise<MultiDeployContractResponse>;
    deployContract(payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[], details?: UniversalDetails): Promise<DeployContractUDCResponse>;
    declareAndDeploy(payload: DeclareAndDeployContractPayload, details?: UniversalDetails): Promise<DeclareDeployUDCResponse>;
    deploySelf: ({ classHash, constructorCalldata, addressSalt, contractAddress: providedContractAddress, }: DeployAccountContractPayload, details?: UniversalDetails) => Promise<DeployContractResponse>;
    deployAccount({ classHash, constructorCalldata, addressSalt, contractAddress: providedContractAddress, }: DeployAccountContractPayload, details?: UniversalDetails): Promise<DeployContractResponse>;
    signMessage(typedData: TypedData): Promise<Signature>;
    hashMessage(typedData: TypedData): Promise<string>;
    /**
     * @deprecated To replace by `myRpcProvider.verifyMessageInStarknet()`
     */
    verifyMessageHash(hash: BigNumberish, signature: Signature, signatureVerificationFunctionName?: string, signatureVerificationResponse?: {
        okResponse: string[];
        nokResponse: string[];
        error: string[];
    }): Promise<boolean>;
    /**
     * @deprecated To replace by `myRpcProvider.verifyMessageInStarknet()`
     */
    verifyMessage(typedData: TypedData, signature: Signature, signatureVerificationFunctionName?: string, signatureVerificationResponse?: {
        okResponse: string[];
        nokResponse: string[];
        error: string[];
    }): Promise<boolean>;
    /**
     * Verify if an account is compatible with SNIP-9 outside execution, and with which version of this standard.
     * @returns {OutsideExecutionVersion} Not compatible, V1, V2.
     * @example
     * ```typescript
     * const result = myAccount.getSnip9Version();
     * // result = "V1"
     * ```
     */
    getSnip9Version(): Promise<OutsideExecutionVersion>;
    /**
     * Verify if a SNIP-9 nonce has not yet been used by the account.
     * @param {BigNumberish} nonce SNIP-9 nonce to test.
     * @returns  {boolean} true if SNIP-9 nonce not yet used.
     * @example
     * ```typescript
     * const result = myAccount.isValidSnip9Nonce(1234);
     * // result = true
     * ```
     */
    isValidSnip9Nonce(nonce: BigNumberish): Promise<boolean>;
    /**
     * Outside transaction needs a specific SNIP-9 nonce, that we get in this function.
     * A SNIP-9 nonce can be any number not yet used ; no ordering is needed.
     * @returns  {string} an Hex string of a SNIP-9 nonce.
     * @example
     * ```typescript
     * const result = myAccount.getSnip9Nonce();
     * // result = "0x28a612590dbc36927933c8ee0f357eee639c8b22b3d3aa86949eed3ada4ac55"
     * ```
     */
    getSnip9Nonce(): Promise<string>;
    /**
     * Creates an object containing transaction(s) that can be executed by an other account with` Account.executeFromOutside()`, called Outside Transaction.
     * @param {OutsideExecutionOptions} options Parameters of the transaction(s).
     * @param {AllowArray<Call>} calls Transaction(s) to execute.
     * @param {OutsideExecutionVersion} [version] SNIP-9 version of the Account that creates the outside transaction.
     * @param {BigNumberish} [nonce] Outside Nonce.
     * @returns {OutsideTransaction} and object that can be used in `Account.executeFromOutside()`
     * @example
     * ```typescript
     * const now_seconds = Math.floor(Date.now() / 1000);
     * const callOptions: OutsideExecutionOptions = {
        caller: executorAccount.address, execute_after: now_seconds - 3600, execute_before: now_seconds + 3600 };
     * const call1: Call = { contractAddress: ethAddress, entrypoint: 'transfer', calldata: {
     *     recipient: recipientAccount.address, amount: cairo.uint256(100) } };
     * const outsideTransaction1: OutsideTransaction = await signerAccount.getOutsideTransaction(callOptions, call3);
     * // result = {
     * // outsideExecution: {
     * // caller: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
     * // nonce: '0x28a612590dbc36927933c8ee0f357eee639c8b22b3d3aa86949eed3ada4ac55',
     * // execute_after: 1723650229, execute_before: 1723704229, calls: [[Object]] },
     * // signature: Signature {
     * // r: 67518627037915514985321278857825384106482999609634873287406612756843916814n,
     * // s: 737198738569840639192844101690009498983611654458636624293579534560862067709n, recovery: 0 },
     * // signerAddress: '0x655f8fd7c4013c07cf12a92184aa6c314d181443913e21f7e209a18f0c78492',
     * // version: '2'
     * // }
     * ```
     */
    getOutsideTransaction(options: OutsideExecutionOptions, calls: AllowArray<Call>, version?: OutsideExecutionVersion, nonce?: BigNumberish): Promise<OutsideTransaction>;
    /**
     * An account B executes a transaction that has been signed by an account A.
     * Fees are paid by B.
     * @param {AllowArray<OutsideTransaction>} outsideTransaction the signed transaction generated by `Account.getOutsideTransaction()`.
     * @param {UniversalDetails} [opts] same options than `Account.execute()`.
     * @returns {InvokeFunctionResponse} same response than `Account.execute()`.
     * @example
     * ```typescript
     * const outsideTransaction1: OutsideTransaction = await signerAccount.getOutsideTransaction(callOptions, call1);
     * const outsideTransaction2: OutsideTransaction = await signerAccount.getOutsideTransaction(callOptions4, call4);
     * const result = await myAccount.executeFromOutside([
        outsideTransaction1,
        outsideTransaction2,
      ]);
     * // result = { transaction_hash: '0x11233...`}
     * ```
     */
    executeFromOutside(outsideTransaction: AllowArray<OutsideTransaction>, opts?: UniversalDetails): Promise<InvokeFunctionResponse>;
    protected getUniversalSuggestedFee(version: ETransactionVersion$1, { type, payload }: EstimateFeeAction, details: UniversalDetails): Promise<UniversalSuggestedFee>;
    getSuggestedFee({ type, payload }: EstimateFeeAction, details: UniversalDetails): Promise<EstimateFee>;
    buildInvocation(call: Array<Call>, details: InvocationsSignerDetails): Promise<Invocation>;
    buildDeclarePayload(payload: DeclareContractPayload, details: InvocationsSignerDetails): Promise<DeclareContractTransaction>;
    buildAccountDeployPayload({ classHash, addressSalt, constructorCalldata, contractAddress: providedContractAddress, }: DeployAccountContractPayload, details: InvocationsSignerDetails): Promise<DeployAccountContractTransaction>;
    buildUDCContractPayload(payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[]): Call[];
    accountInvocationsFactory(invocations: Invocations, details: AccountInvocationsFactoryDetails): Promise<AccountInvocations>;
    getStarkName(address?: BigNumberish, // default to the wallet address
    StarknetIdContract?: string): Promise<string>;
}

interface StarknetWalletProvider extends StarknetWindowObject {
}

declare class WalletAccount extends Account implements AccountInterface {
    walletProvider: StarknetWalletProvider;
    /**
     * @deprecated Use static method WalletAccount.connect or WalletAccount.connectSilent instead. Constructor {@link WalletAccount.(format:2)}.
     */
    constructor(providerOrOptions: ProviderOptions | ProviderInterface, walletProvider: StarknetWalletProvider, cairoVersion?: CairoVersion);
    constructor(providerOrOptions: ProviderOptions | ProviderInterface, walletProvider: StarknetWalletProvider, cairoVersion?: CairoVersion, address?: string);
    /**
     * WALLET EVENTS
     */
    onAccountChange(callback: AccountChangeEventHandler): void;
    onNetworkChanged(callback: NetworkChangeEventHandler): void;
    /**
     * WALLET SPECIFIC METHODS
     */
    requestAccounts(silentMode?: boolean): Promise<string[]>;
    getPermissions(): Promise<"accounts"[]>;
    switchStarknetChain(chainId: StarknetChainId): Promise<boolean>;
    watchAsset(asset: WatchAssetParameters): Promise<boolean>;
    addStarknetChain(chain: AddStarknetChainParameters): Promise<boolean>;
    /**
     * ACCOUNT METHODS
     */
    execute(calls: AllowArray<Call>): Promise<RPCSPEC07.AddInvokeTransactionResult>;
    declare(payload: DeclareContractPayload): Promise<RPCSPEC07.AddDeclareTransactionResult>;
    deploy(payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[]): Promise<MultiDeployContractResponse>;
    signMessage(typedData: TypedData): Promise<Signature$1>;
    static connect(provider: ProviderInterface, walletProvider: StarknetWalletProvider, cairoVersion?: CairoVersion, silentMode?: boolean): Promise<WalletAccount>;
    static connectSilent(provider: ProviderInterface, walletProvider: StarknetWalletProvider, cairoVersion?: CairoVersion): Promise<WalletAccount>;
}

declare module 'abi-wan-kanabi' {
    interface Config<OptionT = any, ResultT = any, ErrorT = any> {
        FeltType: BigNumberish;
        U256Type: number | bigint | Uint256;
        U512Type: BigNumberish;
        Secp256k1PointType: BigNumberish;
        Option: CairoOption<OptionT>;
        Tuple: Record<number, BigNumberish | object | boolean>;
        Result: CairoResult<ResultT, ErrorT>;
        Enum: CairoCustomEnum;
        Calldata: RawArgs | Calldata;
        CallOptions: CallOptions;
        InvokeOptions: InvokeOptions;
        InvokeFunctionResponse: InvokeFunctionResponse;
    }
}
type TypedContractV2$1<TAbi extends Abi$1> = TypedContract<TAbi> & ContractInterface;
declare abstract class ContractInterface {
    abstract abi: Abi;
    abstract address: string;
    abstract providerOrAccount: ProviderInterface | AccountInterface;
    abstract deployTransactionHash?: string;
    readonly functions: {
        [name: string]: AsyncContractFunction;
    };
    readonly callStatic: {
        [name: string]: AsyncContractFunction;
    };
    readonly populateTransaction: {
        [name: string]: ContractFunction;
    };
    readonly estimateFee: {
        [name: string]: ContractFunction;
    };
    readonly [key: string]: AsyncContractFunction | any;
    /**
     * Saves the address of the contract deployed on network that will be used for interaction
     *
     * @param address - address of the contract
     */
    abstract attach(address: string): void;
    /**
     * Attaches to new Provider or Account
     *
     * @param providerOrAccount - new Provider or Account to attach to
     */
    abstract connect(providerOrAccount: ProviderInterface | AccountInterface): void;
    /**
     * Resolves when contract is deployed on the network or when no deployment transaction is found
     *
     * @returns Promise that resolves when contract is deployed on the network or when no deployment transaction is found
     * @throws When deployment fails
     */
    abstract deployed(): Promise<ContractInterface>;
    /**
     * Calls a method on a contract
     *
     * @param method name of the method
     * @param args Array of the arguments for the call
     * @param options optional blockIdentifier
     * @returns Result of the call as an array with key value pars
     */
    abstract call(method: string, args?: ArgsOrCalldata, options?: CallOptions): Promise<Result>;
    /**
     * Invokes a method on a contract
     *
     * @param method name of the method
     * @param args Array of the arguments for the invoke or Calldata
     * @param options
     * @returns Add Transaction Response
     */
    abstract invoke(method: string, args?: ArgsOrCalldata, options?: InvokeOptions): Promise<InvokeFunctionResponse>;
    /**
     * Estimates a method on a contract
     *
     * @param method name of the method
     * @param args Array of the arguments for the call or Calldata
     * @param options optional blockIdentifier
     */
    abstract estimate(method: string, args?: ArgsOrCalldata, options?: {
        blockIdentifier?: BlockIdentifier;
    }): Promise<EstimateFeeResponse>;
    /**
     * Calls a method on a contract
     *
     * @param method name of the method
     * @param args Array of the arguments for the call or Calldata
     * @returns Invocation object
     */
    abstract populate(method: string, args?: ArgsOrCalldata): Invocation;
    /**
     * Parse contract events of a GetTransactionReceiptResponse received from waitForTransaction. Based on contract's abi
     *
     * @param receipt transaction receipt
     * @returns Events parsed
     */
    abstract parseEvents(receipt: GetTransactionReceiptResponse): ParsedEvents;
    /**
     * tells if the contract comes from a Cairo 1 contract
     *
     * @returns TRUE if the contract comes from a Cairo1 contract
     * @example
     * ```typescript
     * const isCairo1: boolean = myContract.isCairo1();
     * ```
     */
    abstract isCairo1(): boolean;
    /**
     * Retrieves the version of the contract (cairo version & compiler version)
     */
    abstract getVersion(): Promise<ContractVersion>;
    /**
     * Returns a typed instance of ContractV2 based on the supplied ABI.
     *
     * @param {TAbi} tAbi - The ABI (Abstract Binary Interface) of the ContractV2.
     * @return {TypedContractV2<TAbi>} - A typed instance of ContractV2.
     */
    abstract typedv2<TAbi extends Abi$1>(tAbi: TAbi): TypedContractV2$1<TAbi>;
}

type TypedContractV2<TAbi extends Abi$1> = TypedContract<TAbi> & Contract;
declare const splitArgsAndOptions: (args: ArgsOrCalldataWithOptions) => {
    args: ArgsOrCalldata;
    options: ContractOptions;
} | {
    args: ArgsOrCalldata;
    options?: ContractOptions;
};
declare function getCalldata(args: RawArgs, callback: Function): Calldata;
declare class Contract implements ContractInterface {
    abi: Abi;
    address: string;
    providerOrAccount: ProviderInterface | AccountInterface;
    deployTransactionHash?: string;
    protected readonly structs: {
        [name: string]: AbiStruct;
    };
    protected readonly events: AbiEvents;
    readonly functions: {
        [name: string]: AsyncContractFunction;
    };
    readonly callStatic: {
        [name: string]: AsyncContractFunction;
    };
    readonly populateTransaction: {
        [name: string]: ContractFunction;
    };
    readonly estimateFee: {
        [name: string]: ContractFunction;
    };
    readonly [key: string]: AsyncContractFunction | any;
    private callData;
    /**
     * Contract class to handle contract methods
     *
     * @param abi - Abi of the contract object
     * @param address (optional) - address to connect to
     * @param providerOrAccount (optional) - Provider or Account to attach to
     */
    constructor(abi: Abi, address: string, providerOrAccount?: ProviderInterface | AccountInterface);
    attach(address: string): void;
    connect(providerOrAccount: ProviderInterface | AccountInterface): void;
    deployed(): Promise<Contract>;
    call(method: string, args?: ArgsOrCalldata, { parseRequest, parseResponse, formatResponse, blockIdentifier, }?: CallOptions): Promise<Result>;
    invoke(method: string, args?: ArgsOrCalldata, { parseRequest, maxFee, nonce, signature }?: InvokeOptions): Promise<InvokeFunctionResponse>;
    estimate(method: string, args?: ArgsOrCalldata): Promise<EstimateFeeResponse>;
    populate(method: string, args?: RawArgs): Call;
    parseEvents(receipt: GetTransactionReceiptResponse): ParsedEvents;
    isCairo1(): boolean;
    getVersion(): Promise<ContractVersion>;
    typedv2<TAbi extends Abi$1>(tAbi: TAbi): TypedContractV2<TAbi>;
}

type ContractFactoryParams = {
    compiledContract: CompiledContract;
    account: any;
    casm?: CairoAssembly;
    classHash?: string;
    compiledClassHash?: string;
    abi?: Abi;
};
declare class ContractFactory {
    compiledContract: CompiledContract;
    account: AccountInterface;
    abi: Abi;
    classHash?: string;
    casm?: CairoAssembly;
    compiledClassHash?: string;
    private CallData;
    /**
     * @param params CFParams
     *  - compiledContract: CompiledContract;
     *  - account: AccountInterface;
     *  - casm?: CairoAssembly;
     *  - classHash?: string;
     *  - compiledClassHash?: string;
     *  - abi?: Abi;
     */
    constructor(params: ContractFactoryParams);
    /**
     * Deploys contract and returns new instance of the Contract
     *
     * If contract is not declared it will first declare it, and then deploy
     */
    deploy(...args: ArgsOrCalldataWithOptions): Promise<Contract>;
    /**
     * Attaches to new Account
     *
     * @param account - new Account to attach to
     */
    connect(account: AccountInterface): ContractFactory;
    /**
     * Attaches current abi and account to the new address
     */
    attach(address: string): Contract;
}

/**
 * Calculate the hex-string Starknet Keccak hash for a given BigNumberish
 *
 * @param value value to hash
 * @returns hex-string Keccak hash
 * @example
 * ```typescript
 * const result = keccakBn('0xabc');
 * // result = '0x11cf08aac85935e32397f410e48217a127b6855d41b1e3877eb4179c0904b77'
 * ```
 */
declare function keccakBn(value: BigNumberish): string;
/**
 * Calculate the BigInt Starknet Keccak hash for a given string
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L38)
 *
 * @param str value to hash
 * @returns BigInt Keccak hash
 * @example
 * ```typescript
 * const result = starknetKeccak('test').toString();
 * // result = '61835310290161785288773114225739080147441215596947647498723774891619563096'
 * ```
 */
declare function starknetKeccak(str: string): bigint;
/**
 * Calculate the hex-string selector for a given abi function name
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L46)
 *
 * @param funcName abi function name
 * @returns hex-string selector
 * @example
 * ```typescript
 * const result = getSelectorFromName('myFunction');
 * // result = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
 * ```
 */
declare function getSelectorFromName(funcName: string): string;
/**
 * Calculate the hex-string selector from a given abi function name or of any representation of number.
 *
 * @param value ascii-string | hex-string | dec-string | number | BigInt
 * @returns hex-string selector
 * @example
 * ```typescript
 * const selector1: string = getSelector("myFunction");
 * // selector1 = "0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8"
 *
 * const selector2: string = getSelector("0x123abc");
 * // selector2 = "0x123abc"
 *
 * const selector3: string = getSelector("123456");
 * // selector3 = "0x1e240"
 *
 * const selector4: string = getSelector(123456n);
 * // selector4 = "0x1e240"
 * ```
 */
declare function getSelector(value: string | BigNumberish): string;
/**
 * Solidity hash of an array of uint256
 * @param {BigNumberish[]} params an array of uint256 numbers
 * @returns the hash of the array of Solidity uint256
 * @example
 * ```typescript
 * const result = hash.solidityUint256PackedKeccak256(['0x100', '200', 300, 400n]);
 * // result = '0xd1e6cb422b65269603c491b0c85463295edabebfb2a6844e4fdc389ff1dcdd97'
 * ```
 */
declare function solidityUint256PackedKeccak256(params: BigNumberish[]): string;
/**
 * Calculate the L2 message hash related by a message L1->L2
 * @param {BigNumberish} l1FromAddress L1 account address that paid the message.
 * @param {BigNumberish} l2ToAddress L2 contract address to execute.
 * @param {string | BigNumberish} l2Selector can be a function name ("bridge_withdraw") or a number (BigNumberish).
 * @param {RawCalldata} l2Calldata an array of BigNumberish of the raw parameters passed to the above function.
 * @param {BigNumberish} l1Nonce The nonce of the L1 account.
 * @returns {string} hex-string of the L2 transaction hash
 * @example
 * ```typescript
 * const l1FromAddress = "0x0000000000000000000000008453fc6cd1bcfe8d4dfc069c400b433054d47bdc";
 * const l2ToAddress = 2158142789748719025684046545159279785659305214176670733242887773692203401023n;
 * const l2Selector = 774397379524139446221206168840917193112228400237242521560346153613428128537n;
 * const payload = [
 *     4543560n,
 *    829565602143178078434185452406102222830667255948n,
 *     3461886633118033953192540141609307739580461579986333346825796013261542798665n,
 *     9000000000000000n,
 *     0n,
 * ];
 * const l1Nonce = 8288n;
 * const result = hash.getL2MessageHash(l1FromAddress, l2ToAddress, l2Selector, payload, l1Nonce);
 * // result = "0x2e350fa9d830482605cb68be4fdb9f0cb3e1f95a0c51623ac1a5d1bd997c2090"
 * ```
 */
declare function getL2MessageHash(l1FromAddress: BigNumberish, l2ToAddress: BigNumberish, l2Selector: string | BigNumberish, l2Calldata: BigNumberish[], l1Nonce: BigNumberish): string;

declare const selector_getL2MessageHash: typeof getL2MessageHash;
declare const selector_getSelector: typeof getSelector;
declare const selector_getSelectorFromName: typeof getSelectorFromName;
declare const selector_keccakBn: typeof keccakBn;
declare const selector_solidityUint256PackedKeccak256: typeof solidityUint256PackedKeccak256;
declare const selector_starknetKeccak: typeof starknetKeccak;
declare namespace selector {
  export { selector_getL2MessageHash as getL2MessageHash, selector_getSelector as getSelector, selector_getSelectorFromName as getSelectorFromName, selector_keccakBn as keccakBn, selector_solidityUint256PackedKeccak256 as solidityUint256PackedKeccak256, selector_starknetKeccak as starknetKeccak };
}

/**
 * Calculate Hashes for v0 - v2 transactions
 */

/**
 * Compute pedersen hash from data
 * @returns format: hex-string - pedersen hash
 */
declare function computeHashOnElements$1(data: BigNumberish[]): string;
/**
 * Calculate transaction pedersen hash for common properties
 *
 * Following implementation is based on this python [implementation #](https://github.com/starkware-libs/cairo-lang/blob/b614d1867c64f3fb2cf4a4879348cfcf87c3a5a7/src/starkware/starknet/core/os/transaction_hash/transaction_hash.py)
 * @returns format: hex-string
 */
declare function calculateTransactionHashCommon$1(txHashPrefix: TransactionHashPrefix, version: BigNumberish, contractAddress: BigNumberish, entryPointSelector: BigNumberish, calldata: RawCalldata, maxFee: BigNumberish, chainId: StarknetChainId, additionalData?: BigNumberish[]): string;
/**
 * Calculate declare transaction hash
 * @param classHash hex-string
 * @param compiledClassHash hex-string
 * @returns format: hex-string
 */
declare function calculateDeclareTransactionHash$2(classHash: string, senderAddress: BigNumberish, version: BigNumberish, maxFee: BigNumberish, chainId: StarknetChainId, nonce: BigNumberish, compiledClassHash?: string): string;
/**
 * Calculate deploy_account transaction hash
 * @returns format: hex-string
 */
declare function calculateDeployAccountTransactionHash$2(contractAddress: BigNumberish, classHash: BigNumberish, constructorCalldata: RawCalldata, salt: BigNumberish, version: BigNumberish, maxFee: BigNumberish, chainId: StarknetChainId, nonce: BigNumberish): string;
/**
 * Calculate invoke transaction hash
 * @returns format: hex-string
 */
declare function calculateTransactionHash(contractAddress: BigNumberish, version: BigNumberish, calldata: RawCalldata, maxFee: BigNumberish, chainId: StarknetChainId, nonce: BigNumberish): string;
/**
 * Calculate the L2 transaction hash generated by a message L1->L2
 * @param {BigNumberish} l1FromAddress L1 account address that paid the message.
 * @param {BigNumberish} l2ToAddress L2 contract address to execute.
 * @param {string | BigNumberish} l2Selector can be a function name ("bridge_withdraw") or a number (BigNumberish).
 * @param {RawCalldata} l2Calldata an array of BigNumberish of the raw parameters passed to the above function.
 * @param {BigNumberish} l2ChainId L2 chain ID : from constants.StarknetChainId.xxx
 * @param {BigNumberish} l1Nonce The nonce of the L1 account.
 * @returns {string} hex-string of the L2 transaction hash
 * @example
 * ```typescript
 * const l1FromAddress = "0x0000000000000000000000008453fc6cd1bcfe8d4dfc069c400b433054d47bdc";
 * const l2ToAddress = 2158142789748719025684046545159279785659305214176670733242887773692203401023n;
 * const l2Selector = 774397379524139446221206168840917193112228400237242521560346153613428128537n;
 * const payload = [
 *     4543560n,
 *    829565602143178078434185452406102222830667255948n,
 *     3461886633118033953192540141609307739580461579986333346825796013261542798665n,
 *     9000000000000000n,
 *     0n,
 * ];
 * const l1Nonce = 8288n;
 * const result = hash.calculateL2MessageTxHash(l1FromAddress, l2ToAddress, l2Selector, payload, constants.StarknetChainId.SN_SEPOLIA, l1Nonce);
 * // result = "0x67d959200d65d4ad293aa4b0da21bb050a1f669bce37d215c6edbf041269c07"
 * ```
 */
declare function calculateL2MessageTxHash(l1FromAddress: BigNumberish, l2ToAddress: BigNumberish, l2Selector: string | BigNumberish, l2Calldata: RawCalldata, l2ChainId: StarknetChainId, l1Nonce: BigNumberish): string;

declare const v2_calculateL2MessageTxHash: typeof calculateL2MessageTxHash;
declare const v2_calculateTransactionHash: typeof calculateTransactionHash;
declare namespace v2 {
  export { calculateDeclareTransactionHash$2 as calculateDeclareTransactionHash, calculateDeployAccountTransactionHash$2 as calculateDeployAccountTransactionHash, v2_calculateL2MessageTxHash as calculateL2MessageTxHash, v2_calculateTransactionHash as calculateTransactionHash, calculateTransactionHashCommon$1 as calculateTransactionHashCommon, computeHashOnElements$1 as computeHashOnElements };
}

/**
 * Transaction Hash based on Transaction Version
 */

type CalcV2InvokeTxHashArgs = {
    senderAddress: BigNumberish;
    version: `${ETransactionVersion2$1}`;
    compiledCalldata: Calldata;
    maxFee: BigNumberish;
    chainId: StarknetChainId;
    nonce: BigNumberish;
};
type CalcV3InvokeTxHashArgs = {
    senderAddress: BigNumberish;
    version: `${ETransactionVersion3$1}`;
    compiledCalldata: Calldata;
    chainId: StarknetChainId;
    nonce: BigNumberish;
    accountDeploymentData: BigNumberish[];
    nonceDataAvailabilityMode: EDAMode$1;
    feeDataAvailabilityMode: EDAMode$1;
    resourceBounds: ResourceBounds$2;
    tip: BigNumberish;
    paymasterData: BigNumberish[];
};
type CalcInvokeTxHashArgs = CalcV2InvokeTxHashArgs | CalcV3InvokeTxHashArgs;
declare function calculateInvokeTransactionHash$1(args: CalcInvokeTxHashArgs): string;
type CalcV2DeclareTxHashArgs = {
    classHash: string;
    senderAddress: BigNumberish;
    version: `${ETransactionVersion2$1}`;
    maxFee: BigNumberish;
    chainId: StarknetChainId;
    nonce: BigNumberish;
    compiledClassHash?: string;
};
type CalcV3DeclareTxHashArgs = {
    classHash: string;
    compiledClassHash: string;
    senderAddress: BigNumberish;
    version: `${ETransactionVersion3$1}`;
    chainId: StarknetChainId;
    nonce: BigNumberish;
    accountDeploymentData: BigNumberish[];
    nonceDataAvailabilityMode: EDAMode$1;
    feeDataAvailabilityMode: EDAMode$1;
    resourceBounds: ResourceBounds$2;
    tip: BigNumberish;
    paymasterData: BigNumberish[];
};
type CalcDeclareTxHashArgs = CalcV2DeclareTxHashArgs | CalcV3DeclareTxHashArgs;
declare function calculateDeclareTransactionHash$1(args: CalcDeclareTxHashArgs): string;
type CalcV2DeployAccountTxHashArgs = {
    contractAddress: BigNumberish;
    classHash: BigNumberish;
    constructorCalldata: Calldata;
    salt: BigNumberish;
    version: `${ETransactionVersion2$1}`;
    maxFee: BigNumberish;
    chainId: StarknetChainId;
    nonce: BigNumberish;
};
type CalcV3DeployAccountTxHashArgs = {
    contractAddress: BigNumberish;
    classHash: BigNumberish;
    compiledConstructorCalldata: Calldata;
    salt: BigNumberish;
    version: `${ETransactionVersion3$1}`;
    chainId: StarknetChainId;
    nonce: BigNumberish;
    nonceDataAvailabilityMode: EDAMode$1;
    feeDataAvailabilityMode: EDAMode$1;
    resourceBounds: ResourceBounds$2;
    tip: BigNumberish;
    paymasterData: BigNumberish[];
};
type CalcDeployAccountTxHashArgs = CalcV2DeployAccountTxHashArgs | CalcV3DeployAccountTxHashArgs;
declare function calculateDeployAccountTransactionHash$1(args: CalcDeployAccountTxHashArgs): string;

/**
 * Class Hash
 */

declare function computePedersenHash(a: BigNumberish, b: BigNumberish): string;
declare function computePoseidonHash(a: BigNumberish, b: BigNumberish): string;
/**
 * Compute Pedersen hash from data
 *
 * @param {BigNumberish[]} data Array of data to compute Pedersen hash on
 * @returns {string} hex-string of Pedersen hash
 *
 * @example
 * ```typescript
 * const result = hash.computeHashOnElements(['0xabc', '0x123', '0xabc123'])
 * // result = 0x148141e8f7db29d005a0187669a56f0790d7e8c2c5b2d780e4d8b9e436a5521
 * ```
 */
declare function computeHashOnElements(data: BigNumberish[]): string;
declare const computePedersenHashOnElements: typeof computeHashOnElements;
declare function computePoseidonHashOnElements(data: BigNumberish[]): string;
/**
 * Calculate contract address from class hash
 *
 * @param {BigNumberish} salt Salt to be used for hashing
 * @param {BigNumberish} classHash Class hash of contract to generate address for
 * @param {RawArgs} constructorCalldata Call data for contract constructor
 * @param {BigNumberish} deployerAddress Address of contract deployer
 * @returns {string} hex-string
 * @example
 * ```typescript
 * const result = hash.calculateContractAddressFromHash(1234, 0x1cf4fe5d37868d25524cdacb89518d88bf217a9240a1e6fde71cc22c429e0e3, [1234, true, false], 0x052fb1a9ab0db3c4f81d70fea6a2f6e55f57c709a46089b25eeec0e959db3695);
 * // result = 0x5fb03d3a88d8e474976932f927ff6a9e332e06ed36642ea3e8c7e38bf010f76
 * ```
 */
declare function calculateContractAddressFromHash(salt: BigNumberish, classHash: BigNumberish, constructorCalldata: RawArgs, deployerAddress: BigNumberish): string;
/**
 * Format json-string without spaces to conform starknet json-string
 * @param {string} json json-string without spaces
 * @returns {string} json-string with additional spaces after `:` and `,`
 * @example
 * ```typescript
 * const result = hash.formatSpaces("{'onchain':true,'isStarknet':true}");
 * // result = "{'onchain': true, 'isStarknet': true}"
 * ```
 */
declare function formatSpaces(json: string): string;
/**
 * Compute hinted class hash for legacy compiled contract (Cairo 0)
 * @param {LegacyCompiledContract} compiledContract
 * @returns {string} hex-string
 * @example
 * ```typescript
 * const compiledCairo0 = json.parse(fs.readFileSync("./cairo0contract.json").toString("ascii"));
 * const result=hash.computeHintedClassHash(compiledCairo0);
 * // result = "0x293eabb06955c0a1e55557014675aa4e7a1fd69896147382b29b2b6b166a2ac"
 * ``` */
declare function computeHintedClassHash(compiledContract: LegacyCompiledContract): string;
/**
 * Computes the class hash for legacy compiled contract (Cairo 0)
 * @param {LegacyCompiledContract | string} contract legacy compiled contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledCairo0 = json.parse(fs.readFileSync("./cairo0contract.json").toString("ascii"));
 * const result=hash.computeLegacyContractClassHash(compiledCairo0);
 * // result = "0x4a5cae61fa8312b0a3d0c44658b403d3e4197be80027fd5020ffcdf0c803331"
 * ```
 */
declare function computeLegacyContractClassHash(contract: LegacyCompiledContract | string): string;
/**
 * Compute hash of the bytecode for Sierra v1.5.0 onwards (Cairo 2.6.0)
 * Each segment is Poseidon hashed.
 * The global hash is : 1 + PoseidonHash(len0, h0, len1, h1, ...)
 * @param {CompiledSierraCasm} casm compiled Sierra CASM file content.
 * @returns {bigint} the bytecode hash as bigint.
 * @example
 * ```typescript
 * const compiledCasm = json.parse(fs.readFileSync("./contractC260.casm.json").toString("ascii"));
 * const result = hash.hashByteCodeSegments(compiledCasm);
 * // result = 80499149343908132326491548897246987792410240503053732367044713070598981699n
 * ```
 */
declare function hashByteCodeSegments(casm: CompiledSierraCasm): bigint;
/**
 * Compute compiled class hash for contract (Cairo 1)
 * @param {CompiledSierraCasm} casm Cairo 1 compiled contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledCasm = json.parse(fs.readFileSync("./cairo260.casm.json").toString("ascii"));
 * const result = hash.computeCompiledClassHash(compiledCasm);
 * // result = "0x4087905743b4fa2b3affc1fc71333f1390c8c5d1e8ea47d6ba70786de3fc01a"
```
 */
declare function computeCompiledClassHash(casm: CompiledSierraCasm): string;
/**
 * Compute sierra contract class hash (Cairo 1)
 * @param {CompiledSierra} sierra Cairo 1 Sierra contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledSierra = json.parse(fs.readFileSync("./cairo260.sierra.json").toString("ascii"));
 * const result = hash.computeSierraContractClassHash(compiledSierra);
 * // result = "0x67b6b4f02baded46f02feeed58c4f78e26c55364e59874d8abfd3532d85f1ba"
```
 */
declare function computeSierraContractClassHash(sierra: CompiledSierra): string;
/**
 * Compute ClassHash (sierra or legacy) based on provided contract
 * @param {CompiledContract | string} contract Cairo 1 contract content
 * @returns {string} hex-string of class hash
 * @example
 * ```typescript
 * const compiledSierra = json.parse(fs.readFileSync("./cairo260.sierra.json").toString("ascii"));
 * const result = hash.computeContractClassHash(compiledSierra);
 * // result = "0x67b6b4f02baded46f02feeed58c4f78e26c55364e59874d8abfd3532d85f1ba"
```
 */
declare function computeContractClassHash(contract: CompiledContract | string): string;

/**
 * Hashes Exports
 */

declare const index$1_calculateContractAddressFromHash: typeof calculateContractAddressFromHash;
declare const index$1_calculateL2MessageTxHash: typeof calculateL2MessageTxHash;
declare const index$1_computeCompiledClassHash: typeof computeCompiledClassHash;
declare const index$1_computeContractClassHash: typeof computeContractClassHash;
declare const index$1_computeHashOnElements: typeof computeHashOnElements;
declare const index$1_computeHintedClassHash: typeof computeHintedClassHash;
declare const index$1_computeLegacyContractClassHash: typeof computeLegacyContractClassHash;
declare const index$1_computePedersenHash: typeof computePedersenHash;
declare const index$1_computePedersenHashOnElements: typeof computePedersenHashOnElements;
declare const index$1_computePoseidonHash: typeof computePoseidonHash;
declare const index$1_computePoseidonHashOnElements: typeof computePoseidonHashOnElements;
declare const index$1_computeSierraContractClassHash: typeof computeSierraContractClassHash;
declare const index$1_formatSpaces: typeof formatSpaces;
declare const index$1_getL2MessageHash: typeof getL2MessageHash;
declare const index$1_getSelector: typeof getSelector;
declare const index$1_getSelectorFromName: typeof getSelectorFromName;
declare const index$1_hashByteCodeSegments: typeof hashByteCodeSegments;
declare const index$1_keccakBn: typeof keccakBn;
declare const index$1_poseidon: typeof poseidon;
declare const index$1_solidityUint256PackedKeccak256: typeof solidityUint256PackedKeccak256;
declare const index$1_starknetKeccak: typeof starknetKeccak;
declare namespace index$1 {
  export { index$1_calculateContractAddressFromHash as calculateContractAddressFromHash, calculateDeclareTransactionHash$1 as calculateDeclareTransactionHash, calculateDeployAccountTransactionHash$1 as calculateDeployAccountTransactionHash, calculateInvokeTransactionHash$1 as calculateInvokeTransactionHash, index$1_calculateL2MessageTxHash as calculateL2MessageTxHash, index$1_computeCompiledClassHash as computeCompiledClassHash, index$1_computeContractClassHash as computeContractClassHash, index$1_computeHashOnElements as computeHashOnElements, index$1_computeHintedClassHash as computeHintedClassHash, index$1_computeLegacyContractClassHash as computeLegacyContractClassHash, index$1_computePedersenHash as computePedersenHash, index$1_computePedersenHashOnElements as computePedersenHashOnElements, index$1_computePoseidonHash as computePoseidonHash, index$1_computePoseidonHashOnElements as computePoseidonHashOnElements, index$1_computeSierraContractClassHash as computeSierraContractClassHash, index$1_formatSpaces as formatSpaces, index$1_getL2MessageHash as getL2MessageHash, index$1_getSelector as getSelector, index$1_getSelectorFromName as getSelectorFromName, index$1_hashByteCodeSegments as hashByteCodeSegments, index$1_keccakBn as keccakBn, index$1_poseidon as poseidon, index$1_solidityUint256PackedKeccak256 as solidityUint256PackedKeccak256, index$1_starknetKeccak as starknetKeccak };
}

/**
 * Calculate Hashes for v3 transactions
 */

declare function hashDAMode(nonceDAMode: BigNumberish, feeDAMode: BigNumberish): bigint;
/**
 * Encode the L1&L2 gas limits of a V3 transaction
 * @param {ResourceBounds} bounds object including the limits for L1 & L2 gas
 * @returns {bigint} encoded data
 */
declare function encodeResourceBoundsL1(bounds: ResourceBounds$2): bigint;
/**
 * Encode the L2 bound of a V3 transaction
 * @param {ResourceBounds} bounds
 * {l1_gas: {max_amount: u64, max_price_per_unit: u128},
 *  l2_gas: {max_amount: u64, max_price_per_unit: u128}}
}
 * @returns {bigint} encoded data
 */
declare function encodeResourceBoundsL2(bounds: ResourceBounds$2): bigint;
declare function hashFeeField(tip: BigNumberish, bounds: ResourceBounds$2): bigint;
declare function calculateTransactionHashCommon(txHashPrefix: TransactionHashPrefix, version: BigNumberish, senderAddress: BigNumberish, chainId: StarknetChainId, nonce: BigNumberish, tip: BigNumberish, paymasterData: BigNumberish[], nonceDataAvailabilityMode: EDAMode$1, feeDataAvailabilityMode: EDAMode$1, resourceBounds: ResourceBounds$2, additionalData?: BigNumberish[]): string;
/**
 * Calculate v3 deploy_account transaction hash
 * @returns format: hex-string
 */
declare function calculateDeployAccountTransactionHash(contractAddress: BigNumberish, classHash: BigNumberish, compiledConstructorCalldata: Calldata, salt: BigNumberish, version: BigNumberish, chainId: StarknetChainId, nonce: BigNumberish, nonceDataAvailabilityMode: EDAMode$1, feeDataAvailabilityMode: EDAMode$1, resourceBounds: ResourceBounds$2, tip: BigNumberish, paymasterData: BigNumberish[]): string;
/**
 * Calculate v3 declare transaction hash
 * @returns format: hex-string
 */
declare function calculateDeclareTransactionHash(classHash: string, compiledClassHash: string, senderAddress: BigNumberish, version: BigNumberish, chainId: StarknetChainId, nonce: BigNumberish, accountDeploymentData: BigNumberish[], nonceDataAvailabilityMode: EDAMode$1, feeDataAvailabilityMode: EDAMode$1, resourceBounds: ResourceBounds$2, tip: BigNumberish, paymasterData: BigNumberish[]): string;
/**
 * Calculate v3 invoke transaction hash
 * @returns format: hex-string
 */
declare function calculateInvokeTransactionHash(senderAddress: BigNumberish, version: BigNumberish, compiledCalldata: Calldata, chainId: StarknetChainId, nonce: BigNumberish, accountDeploymentData: BigNumberish[], nonceDataAvailabilityMode: EDAMode$1, feeDataAvailabilityMode: EDAMode$1, resourceBounds: ResourceBounds$2, tip: BigNumberish, paymasterData: BigNumberish[]): string;

declare const v3_calculateDeclareTransactionHash: typeof calculateDeclareTransactionHash;
declare const v3_calculateDeployAccountTransactionHash: typeof calculateDeployAccountTransactionHash;
declare const v3_calculateInvokeTransactionHash: typeof calculateInvokeTransactionHash;
declare const v3_calculateTransactionHashCommon: typeof calculateTransactionHashCommon;
declare const v3_encodeResourceBoundsL1: typeof encodeResourceBoundsL1;
declare const v3_encodeResourceBoundsL2: typeof encodeResourceBoundsL2;
declare const v3_hashDAMode: typeof hashDAMode;
declare const v3_hashFeeField: typeof hashFeeField;
declare namespace v3 {
  export { v3_calculateDeclareTransactionHash as calculateDeclareTransactionHash, v3_calculateDeployAccountTransactionHash as calculateDeployAccountTransactionHash, v3_calculateInvokeTransactionHash as calculateInvokeTransactionHash, v3_calculateTransactionHashCommon as calculateTransactionHashCommon, v3_encodeResourceBoundsL1 as encodeResourceBoundsL1, v3_encodeResourceBoundsL2 as encodeResourceBoundsL2, v3_hashDAMode as hashDAMode, v3_hashFeeField as hashFeeField };
}

/**
 * Convert JSON string to JSON object
 *
 * NOTE: the String() wrapping is used so the behavior conforms to JSON.parse()
 * which can accept simple data types but is not represented in the default typing
 *
 * @param str JSON string
 * @return {object} Parsed json object
 * @example
 * ```typescript
 * const str = '[123, 12.3, 11223344556677889900]';
 * const result = parse(str);
 * // result = [123, 12.3, 11223344556677890048n]
 * ```
 */
declare const parse: (str: string) => any;
/**
 * Convert JSON string to JSON object with all numbers as bigint
 * @param str JSON string
 * @return {object} Parsed json object
 * @example
 * ```typescript
 * const str = '[123, 12.3, 1234567890]';
 * const result = parseAlwaysAsBig(str);
 * // result = [123n, 12.3, 1234567890n]
 * ```
 */
declare const parseAlwaysAsBig: (str: string) => any;
/**
 * Convert JSON object to JSON string
 *
 * NOTE: the not-null assertion is used so the return type conforms to JSON.stringify()
 * which can also return undefined but is not represented in the default typing
 *
 * @param value JSON object
 * @param [replacer] Function that alters the behavior of the stringification process
 * @param [space] Used to insert white space into the output JSON string
 * @param [numberStringifiers] Function used to stringify numbers (returning undefined will delete the property from the object)
 * @return {string} JSON string
 * @example
 * ```typescript
 * const value = [123, 12.3, 1234567890];
 * const result = stringify(value);
 * // result = '[123,12.3,1234567890]'
 * ```
 */
declare const stringify: (value: unknown, replacer?: any, space?: string | number | undefined, numberStringifiers?: json$1.NumberStringifier[] | undefined) => string;
/** @deprecated equivalent to 'stringify', alias will be removed */
declare const stringifyAlwaysAsBig: (value: unknown, replacer?: any, space?: string | number | undefined, numberStringifiers?: json$1.NumberStringifier[] | undefined) => string;

declare const json_parse: typeof parse;
declare const json_parseAlwaysAsBig: typeof parseAlwaysAsBig;
declare const json_stringify: typeof stringify;
declare const json_stringifyAlwaysAsBig: typeof stringifyAlwaysAsBig;
declare namespace json {
  export { json_parse as parse, json_parseAlwaysAsBig as parseAlwaysAsBig, json_stringify as stringify, json_stringifyAlwaysAsBig as stringifyAlwaysAsBig };
}

/**
 * Test if string is hex-string
 *
 * @param hex hex-string
 * @returns {boolean} true if the input string is a hexadecimal string, false otherwise
 * @example
 * ```typescript
 * const hexString1 = "0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914";
 * const result1 = isHex(hexString1);
 * // result1 = true
 *
 * const hexString2 = "2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914";
 * const result2 = isHex(hexString2);
 * // result2 = false
 * ```
 */
declare function isHex(hex: string): boolean;
/**
 * Convert BigNumberish to bigint
 *
 * @param {BigNumberish} value value to convert
 * @returns {BigInt} converted value
 * @example
 * ```typescript
 * const str = '123';
 * const result = toBigInt(str);
 * // result = 123n
 * ```
 */
declare function toBigInt(value: BigNumberish): bigint;
/**
 * Convert BigNumberish to hex-string
 *
 * @param {BigNumberish} value value to convert
 * @returns {string} converted number in hex-string format
 * @example
 * ```typescript
 * toHex(100); // '0x64'
 * toHex('200'); // '0xc8'
 * ```
 */
declare function toHex(value: BigNumberish): string;
/**
 * Alias of ToHex
 */
declare const toHexString: typeof toHex;
/**
 * Convert BigNumberish to storage-key-string
 *
 * Same as toHex but conforming to the STORAGE_KEY pattern `^0x0[0-7]{1}[a-fA-F0-9]{0,62}$`.
 *
 * A storage key is represented as up to 62 hex digits, 3 bits, and 5 leading zeroes:
 * `0x0 + [0-7] + 62 hex = 0x + 64 hex`
 * @returns format: storage-key-string
 * @example
 * ```typescript
 * toStorageKey(0x123); // '0x0000000000000000000000000000000000000000000000000000000000000123'
 * toStorageKey(123); // '0x000000000000000000000000000000000000000000000000000000000000007b'
 * toStorageKey('test'); // 'Error'
 * ```
 */
declare function toStorageKey(number: BigNumberish): string;
/**
 * Convert BigNumberish to hex format 0x + 64 hex chars
 *
 * Similar as toStorageKey but conforming to exactly 0x(64 hex chars).
 *
 * @returns format: hex-0x(64)-string
 * @example
 * ```typescript
 * toHex64(123); // '0x000000000000000000000000000000000000000000000000000000000000007b'
 * toHex64(123n); // '0x000000000000000000000000000000000000000000000000000000000000007b'
 * toHex64('test'); // 'Error'
 * ```
 */
declare function toHex64(number: BigNumberish): string;
/**
 * Convert hexadecimal string to decimal string
 *
 * @param {string} hex hex-string to convert
 * @returns {string} converted number in decimal string format
 * @example
 * ```typescript
 * hexToDecimalString('64'); // '100'
 * hexToDecimalString('c8'); // '200'
 * ```
 */
declare function hexToDecimalString(hex: string): string;
/**
 * Remove hex-string leading zeroes and lowercase it
 *
 * @param {string} hex hex-string
 * @returns {string} updated string in hex-string format
 * @example
 * ```typescript
 * cleanHex('0x00023AB'); // '0x23ab'
 * ```
 */
declare function cleanHex(hex: string): string;
/**
 * Asserts input is equal to or greater then lowerBound and lower then upperBound.
 *
 * The `inputName` parameter is used in the assertion message.
 * @param input Value to check
 * @param lowerBound Lower bound value
 * @param upperBound Upper bound value
 * @param inputName Name of the input for error message
 * @throws Error if input is out of range
 * @example
 * ```typescript
 * const input1:BigNumberish = 10;
 * assertInRange(input1, 5, 20, 'value')
 *
 * const input2: BigNumberish = 25;
 * assertInRange(input2, 5, 20, 'value');
 * // throws Error: Message not signable, invalid value length.
 * ```
 */
declare function assertInRange(input: BigNumberish, lowerBound: BigNumberish, upperBound: BigNumberish, inputName?: string): void;
/**
 * Convert BigNumberish array to decimal string array
 *
 * @param {BigNumberish[]} data array of big-numberish elements
 * @returns {string[]} array of decimal strings
 * @example
 * ```typescript
 * const data = [100, 200n];
 * const result = bigNumberishArrayToDecimalStringArray(data);
 * // result = ['100', '200']
 * ```
 */
declare function bigNumberishArrayToDecimalStringArray(data: BigNumberish[]): string[];
/**
 * Convert BigNumberish array to hexadecimal string array
 *
 * @param {BigNumberish[]} data array of big-numberish elements
 * @returns array of hex-strings
 * @example
 * ```typescript
 * const data = [100, 200n];
 * const result = bigNumberishArrayToHexadecimalStringArray(data);
 * // result = ['0x64', '0xc8']
 * ```
 */
declare function bigNumberishArrayToHexadecimalStringArray(data: BigNumberish[]): string[];
/**
 * Test if string is a whole number (0, 1, 2, 3...)
 *
 * @param {string} str string to test
 * @returns {boolean}: true if string is a whole number, false otherwise
 * @example
 * ```typescript
 * isStringWholeNumber('100'); // true
 * isStringWholeNumber('10.0'); // false
 * isStringWholeNumber('test'); // false
 * ```
 */
declare function isStringWholeNumber(str: string): boolean;
/**
 * Convert string to decimal string
 *
 * @param {string} str string to convert
 * @returns converted string in decimal format
 * @throws str needs to be a number string in hex or whole number format
 * @example
 * ```typescript
 * const result = getDecimalString("0x1a");
 * // result = "26"
 *
 * const result2 = getDecimalString("Hello");
 * // throws Error: "Hello needs to be a hex-string or whole-number-string"
 * ```
 */
declare function getDecimalString(str: string): string;
/**
 * Convert string to hexadecimal string
 *
 * @param {string} str string to convert
 * @returns converted hex-string
 * @throws str needs to be a number string in hex or whole number format
 * @example
 * ```typescript
 * const result = getHexString("123");
 * // result = "0x7b"
 *
 * const result2 = getHexString("Hello");
 * // throws Error: Hello needs to be a hex-string or whole-number-string
 * ```
 */
declare function getHexString(str: string): string;
/**
 * Convert string array to hex-string array
 *
 * @param {Array<string>} array array of string elements
 * @returns array of converted elements in hex-string format
 * @example
 * ```typescript
 * const data = ['100', '200', '0xaa'];
 * const result = getHexStringArray(data);
 * // result = ['0x64', '0xc8', '0xaa']
 * ```
 */
declare function getHexStringArray(array: Array<string>): string[];
/**
 * Convert boolean to "0" or "1"
 *
 * @param value The boolean value to be converted.
 * @returns {boolean} Returns true if the value is a number, otherwise returns false.
 * @example
 * ```typescript
 * const result = toCairoBool(true);
 * // result ="1"
 *
 * const result2 = toCairoBool(false);
 * // result2 = "0"
 * ```
 */
declare function toCairoBool(value: boolean): string;
/**
 * Convert hex-string to an array of Bytes (Uint8Array)
 *
 * @param {string} str hex-string
 * @returns {Uint8Array} array containing the converted elements
 * @throws str must be a hex-string
 * @example
 * ```typescript
 * let result;
 *
 * result = hexToBytes('0x64');
 * // result = [100]
 *
 * result = hexToBytes('test');
 * // throws Error: test needs to be a hex-string
 * ```
 */
declare function hexToBytes(str: string): Uint8Array;
/**
 * Adds a percentage amount to the value
 *
 * @param number value to be modified
 * @param percent integer as percent ex. 50 for 50%
 * @returns {bigint} modified value
 * @example
 * ```typescript
 * addPercent(100, 50); // 150n
 * addPercent(100, 100); // 200n
 * addPercent(200, 50); // 300n
 * addPercent(200, -50); // 100n
 * addPercent(200, -100); // 0n
 * addPercent(200, -150); // -100n
 * ```
 */
declare function addPercent(number: BigNumberish, percent: number): bigint;
/**
 * Calculate the sha256 hash of an utf8 string, then encode the
 * result in an uint8Array of 4 elements.
 * Useful in wallet path calculation.
 * @param {string} str utf8 string (hex string not handled).
 * @returns a uint8Array of 4 bytes.
 * @example
 * ```typescript
 * const ledgerPathApplicationName = 'LedgerW';
 * const path2Buffer = num.stringToSha256ToArrayBuff4(ledgerPathApplicationName);
 * // path2Buffer = Uint8Array(4) [43, 206, 231, 219]
 * ```
 */
declare function stringToSha256ToArrayBuff4(str: string): Uint8Array;
/**
 * Checks if a given value is of BigNumberish type.
 * 234, 234n, "234", "0xea" are valid
 * @param {unknown} input a value
 * @returns {boolean} true if type of input is `BigNumberish`
 * @example
 * ```typescript
 * const res = num.isBigNumberish("ZERO");
 * // res = false
 *  ```
 */
declare function isBigNumberish(input: unknown): input is BigNumberish;

type num_BigNumberish = BigNumberish;
declare const num_addPercent: typeof addPercent;
declare const num_assertInRange: typeof assertInRange;
declare const num_bigNumberishArrayToDecimalStringArray: typeof bigNumberishArrayToDecimalStringArray;
declare const num_bigNumberishArrayToHexadecimalStringArray: typeof bigNumberishArrayToHexadecimalStringArray;
declare const num_cleanHex: typeof cleanHex;
declare const num_getDecimalString: typeof getDecimalString;
declare const num_getHexString: typeof getHexString;
declare const num_getHexStringArray: typeof getHexStringArray;
declare const num_hexToBytes: typeof hexToBytes;
declare const num_hexToDecimalString: typeof hexToDecimalString;
declare const num_isBigNumberish: typeof isBigNumberish;
declare const num_isHex: typeof isHex;
declare const num_isStringWholeNumber: typeof isStringWholeNumber;
declare const num_stringToSha256ToArrayBuff4: typeof stringToSha256ToArrayBuff4;
declare const num_toBigInt: typeof toBigInt;
declare const num_toCairoBool: typeof toCairoBool;
declare const num_toHex: typeof toHex;
declare const num_toHex64: typeof toHex64;
declare const num_toHexString: typeof toHexString;
declare const num_toStorageKey: typeof toStorageKey;
declare namespace num {
  export { type num_BigNumberish as BigNumberish, num_addPercent as addPercent, num_assertInRange as assertInRange, num_bigNumberishArrayToDecimalStringArray as bigNumberishArrayToDecimalStringArray, num_bigNumberishArrayToHexadecimalStringArray as bigNumberishArrayToHexadecimalStringArray, num_cleanHex as cleanHex, num_getDecimalString as getDecimalString, num_getHexString as getHexString, num_getHexStringArray as getHexStringArray, num_hexToBytes as hexToBytes, num_hexToDecimalString as hexToDecimalString, num_isBigNumberish as isBigNumberish, num_isHex as isHex, num_isStringWholeNumber as isStringWholeNumber, num_stringToSha256ToArrayBuff4 as stringToSha256ToArrayBuff4, num_toBigInt as toBigInt, num_toCairoBool as toCairoBool, num_toHex as toHex, num_toHex64 as toHex64, num_toHexString as toHexString, num_toStorageKey as toStorageKey };
}

/**
 * Transforms a list of Calls, each with their own calldata, into
 * two arrays: one with the entry points, and one with the concatenated calldata
 * @param {Call[]} calls the list of calls to transform.
 * @returns {callArray: ParsedStruct[], calldata: BigNumberish[]} An object containing two arrays: callArray and calldata.
 * @example
 * ```typescript
 * const calls: Call[] = [
 * 	{
 * 		contractAddress: "0x1234567890123456789012345678901234567890",
 * 		entrypoint: "functionName",
 * 		calldata: [1,2,3]
 * 	},
 * 	{
 * 		contractAddress: "0x0987654321098765432109876543210987654321",
 * 		entrypoint: "anotherFunction",
 * 		calldata: [4,5,6]
 * 	}
 * ];
 * const result = transaction.transformCallsToMulticallArrays(calls);
 * // result = {
 * // callArray: [
 * // { to: "0x1234567890123456789012345678901234567890", selector: "1234567890",
 * // data_offset: "0", data_len: "3" },
 * // { to: "0x0987654321098765432109876543210987654321", selector: "1234567890",
 * // data_offset: "0987654321", data_offset: "3", data_len: "3"}
 * // ], calldata: [1, 2, 3, 4, 5, 6]
 * // }
 * ```
 */
declare const transformCallsToMulticallArrays: (calls: Call[]) => {
    callArray: ParsedStruct[];
    calldata: Calldata;
};
/**
 * Transforms a list of calls into the Cairo 0 `__execute__` calldata.
 * @param {Call[]} calls the list of calls to transform
 * @returns {Calldata} the Cairo 0 `__execute__` calldata
 * @example
 * ```typescript
 * const calls: Call[] = [
 * 	{
 * 		contractAddress: "0x1234567890123456789012345678901234567890",
 * 		entrypoint: "functionName",
 * 		calldata: [1, 2, 3]
 * 	},
 * 	{
 * 		contractAddress: "0x0987654321098765432109876543210987654321",
 * 		entrypoint: "anotherFunction",
 * 		calldata: [4, 5, 6]
 * 	}
 * ];
 * const result = transaction.fromCallsToExecuteCalldata(calls);
 * // result = ['2', '103929005307130220006098923584552504982110632080',
 * //   '784552248838722632831848474045274978537388011177294206940059575485454596699', '0',
 * //   '3', '54400338722927882010739357306608455014511100705',
 * //   '836430224577382061379420368022192503799782058803937958828224424676927281484',
 * //   '3', '3', '6', '1', '2', '3', '4', '5', '6']
 * ```
 */
declare const fromCallsToExecuteCalldata: (calls: Call[]) => Calldata;
/**
 * Transforms a list of calls into the Cairo 0 `__execute__` calldata including nonce.
 * @deprecated
 */
declare const fromCallsToExecuteCalldataWithNonce: (calls: Call[], nonce: BigNumberish) => Calldata;
/**
 * Format Data inside Calls
 * @deprecated Not required for getting execute Calldata
 */
declare const transformCallsToMulticallArrays_cairo1: (calls: Call[]) => CallStruct[];
/**
 * Transforms a list of calls into the Cairo 1 `__execute__` calldata.
 * @param {Call[]} calls the list of calls to transform.
 * @returns {Calldata} the Cairo 1 `__execute__` calldata.
 * @example
 * ```typescript
 * const calls: Call[] = [
 * 	{
 * 		contractAddress: "0x1234567890123456789012345678901234567890",
 * 		entrypoint: "functionName",
 * 		calldata: [1, 2, 3]
 * 	},
 * 	{
 * 		contractAddress: "0x0987654321098765432109876543210987654321",
 * 		entrypoint: "anotherFunction",
 * 		calldata: [4, 5, 6]
 * 	}
 * ];
 * const result = transaction.fromCallsToExecuteCalldata_cairo1(calls);
 * // result = ['2', '103929005307130220006098923584552504982110632080',
 * //   '784552248838722632831848474045274978537388011177294206940059575485454596699',
 * //   '3', '1', '2', '3', '54400338722927882010739357306608455014511100705',
 * //   '836430224577382061379420368022192503799782058803937958828224424676927281484',
 * //   '3', '4', '5', '6']
 * ```
 */
declare const fromCallsToExecuteCalldata_cairo1: (calls: Call[]) => Calldata;
/**
 * Create `__execute__` Calldata from Calls based on Cairo versions.
 * @param {Call[]} calls the list of calls to transform
 * @param {CairoVersion} cairoVersion the Cairo version
 * @returns {Calldata} the `__execute__` calldata.
 * @example
 * ```typescript
 * const calls: Call[] = [
 * 	{
 * 		contractAddress: "0x1234567890123456789012345678901234567890",
 * 		entrypoint: "functionName",
 * 		calldata: [1, 2, 3]
 * 	},
 * 	{
 * 		contractAddress: "0x0987654321098765432109876543210987654321",
 * 		entrypoint: "anotherFunction",
 * 		calldata: [4, 5, 6]
 * 	}
 * ];
 * const result = transaction.getExecuteCalldata(calls, '1');
 * // result = ['2', '103929005307130220006098923584552504982110632080',
 * //   '784552248838722632831848474045274978537388011177294206940059575485454596699',
 * //   '3', '1', '2', '3', '54400338722927882010739357306608455014511100705',
 * //   '836430224577382061379420368022192503799782058803937958828224424676927281484',
 * //   '3', '4', '5', '6']
 * ```
 */
declare const getExecuteCalldata: (calls: Call[], cairoVersion?: CairoVersion) => Calldata;
/**
 * Builds a UDCCall object.
 *
 * @param {UniversalDeployerContractPayload | UniversalDeployerContractPayload[]} payload the payload data for the UDCCall. Can be a single payload object or an array of payload objects.
 * @param {string} address the address to be used in the UDCCall
 * @returns { calls: Call[], addresses: string[] } the UDCCall object containing an array of calls and an array of addresses.
 * @example
 * ```typescript
 * const payload: UniversalDeployerContractPayload = {
 * classHash: "0x1234567890123456789012345678901234567890",
 * salt: "0x0987654321098765432109876543210987654321",
 * unique:true,
 * constructorCalldata: [1, 2, 3]
 * };
 * const address = "0xABCDEF1234567890ABCDEF1234567890ABCDEF12";
 * const result  = transaction.buildUDCCall(payload, address);
 * // result = {
 * // 	calls: [
 * //			{
 * //			contractAddress: "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
 * //			entrypoint: "functionName",
 * //			calldata: [classHash, salt, true, 3, 1, 2, 3]
 * //		}],
 * //	addresses: ["0x6fD084B56a7EDc5C06B3eB40f97Ae5A0C707A865"]
 * // }
 * ```
 */
declare function buildUDCCall(payload: UniversalDeployerContractPayload | UniversalDeployerContractPayload[], address: string): {
    calls: {
        contractAddress: "0x041a78e741e5af2fec34b695679bc6891742439f7afb8484ecd7766661ad02bf";
        entrypoint: "deployContract";
        calldata: BigNumberish[];
    }[];
    addresses: string[];
};
/**
 * Return transaction versions based on version type, default version type is 'transaction'.
 * @param {'fee' | 'transaction'} [versionType] the type of version ("fee" or "transaction")
 * @returns {v1: ETransactionVersion, v2: ETransactionVersion, v3: ETransactionVersion} an object containing the transaction versions.
 * @example
 * ```typescript
 * const result = transaction.getVersionsByType('fee');
 * // result = {
 * //   v1: '0x100000000000000000000000000000001',
 * //   v2: '0x100000000000000000000000000000002',
 * //   v3: '0x100000000000000000000000000000003'
 * // }
 * ```
 */
declare function getVersionsByType(versionType?: 'fee' | 'transaction'): {
    v1: "0x100000000000000000000000000000001";
    v2: "0x100000000000000000000000000000002";
    v3: "0x100000000000000000000000000000003";
} | {
    v1: "0x1";
    v2: "0x2";
    v3: "0x3";
};

declare const transaction_buildUDCCall: typeof buildUDCCall;
declare const transaction_fromCallsToExecuteCalldata: typeof fromCallsToExecuteCalldata;
declare const transaction_fromCallsToExecuteCalldataWithNonce: typeof fromCallsToExecuteCalldataWithNonce;
declare const transaction_fromCallsToExecuteCalldata_cairo1: typeof fromCallsToExecuteCalldata_cairo1;
declare const transaction_getExecuteCalldata: typeof getExecuteCalldata;
declare const transaction_getVersionsByType: typeof getVersionsByType;
declare const transaction_transformCallsToMulticallArrays: typeof transformCallsToMulticallArrays;
declare const transaction_transformCallsToMulticallArrays_cairo1: typeof transformCallsToMulticallArrays_cairo1;
declare namespace transaction {
  export { transaction_buildUDCCall as buildUDCCall, transaction_fromCallsToExecuteCalldata as fromCallsToExecuteCalldata, transaction_fromCallsToExecuteCalldataWithNonce as fromCallsToExecuteCalldataWithNonce, transaction_fromCallsToExecuteCalldata_cairo1 as fromCallsToExecuteCalldata_cairo1, transaction_getExecuteCalldata as getExecuteCalldata, transaction_getVersionsByType as getVersionsByType, transaction_transformCallsToMulticallArrays as transformCallsToMulticallArrays, transaction_transformCallsToMulticallArrays_cairo1 as transformCallsToMulticallArrays_cairo1 };
}

type V3Details = Required<Pick<UniversalDetails, 'tip' | 'paymasterData' | 'accountDeploymentData' | 'nonceDataAvailabilityMode' | 'feeDataAvailabilityMode' | 'resourceBounds'>>;
/**
 * Compress compiled Cairo 0 program
 *
 * [Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)
 * @param {Program | string} jsonProgram Representing the compiled Cairo 0 program
 * @return {CompressedProgram} Compressed Cairo 0 program
 * @example
 * ```typescript
 * const contractCairo0 = json.parse(fs.readFileSync("./cairo0contract.json").toString("ascii"));
 * const result = stark.compressProgram(contractCairo0);
 * // result = "H4sIAAAAAAAAA+1dC4/bOJL+K4aBu01me7r5EEUyixzQk/TuB..."
 * ```
 */
declare function compressProgram(jsonProgram: Program | string): CompressedProgram;
/**
 * Decompress compressed compiled Cairo 0 program
 * @param {CompressedProgram | CompressedProgram[]} base64 Compressed Cairo 0 program
 * @returns Parsed decompressed compiled Cairo 0 program
 * @example
 * ```typescript
 * const contractCairo0 = json.parse(fs.readFileSync("./cairo0contract.json").toString("ascii"));
 * const compressedCairo0 = stark.compressProgram(contractCairo0);
 * const result = stark.decompressProgram(compressedCairo0);
 * // result = {
 * //   abi: [
 * //     {
 * //       inputs: [Array],
 * //       name: 'increase_balance',
 * //       outputs: [],
 * //       type: 'function'
 * //     }
 * //   ],
 * //   entry_points_by_type: { CONSTRUCTOR: [], EXTERNAL: [ [Object], [Object] ], L1_HANDLER: [] },
 * //   program: {
 * //     attributes: [],
 * //     builtins: [ 'pedersen', 'range_check' ],
 * //     compiler_version: '0.10.2',
 * //     data: [
 * //       '0x480680017fff8000',
 * // ...
 * ```
 */
declare function decompressProgram(base64: CompressedProgram | CompressedProgram[]): any;
/**
 * Random Address based on random keyPair
 * @returns {string} an hex string of a random Starknet address
 * @example
 * ```typescript
 * const result = stark.randomAddress();
 * // result = "0x51fc8126a13cd5ddb29a71ca399cb1e814f086f5af1b502d7151c14929554f"
 * ```
 */
declare function randomAddress(): string;
/**
 * Lowercase and hex prefix string
 *
 * @deprecated Not used internally, naming is confusing based on functionality
 */
declare function makeAddress(input: string): string;
/**
 * Format Signature to standard type (hex array)
 * @param {Signature} [sig]
 * @returns {ArraySignatureType} Custom hex string array
 * @throws {Error} if sig not defined, or wrong format
 * @example
 * ```typescript
 * const signature = ec.starkCurve.sign("0x12de34", "0x3487123eac");
 * const result = stark.formatSignature(signature);
 * // result = ['0xba8eecee2d69c417e8c6a20cf331c821f716b58ba9e47166c7476afdb38997',
 * //  '0x69ef7438c94104839a6e2aa2385482a77399d2f46e894ae4f50ab6d69239d1c']
 * ```
 */
declare function formatSignature(sig?: Signature): ArraySignatureType;
/**
 * Format Signature to decimal string array
 * @param {Signature} [sig]
 * @returns {ArraySignatureType} Custom hex string array
 * @throws {Error} if sig not defined, or wrong format
 * @example
 * ```typescript
 * const signature = ec.starkCurve.sign("0x12de34", "0x3487123eac");
 * const result = stark.signatureToDecimalArray(signature);
 * // result = ['329619989660444495690615805546674399714973829707166906185976654753023887767',
 * //  '2994745480203297689255012826403147585778741462125743754529207781488706428188']
 * ```
 */
declare function signatureToDecimalArray(sig?: Signature): ArraySignatureType;
/**
 * Format Signature to hex string array
 * @param {Signature} [sig]
 * @returns {ArraySignatureType} Custom hex string array
 * @throws {Error} if sig not defined, or wrong format
 * @example
 * ```typescript
 * const signature = ec.starkCurve.sign("0x12de34", "0x3487123eac");
 * const result = stark.signatureToHexArray(signature);
 * // result = ['0xba8eecee2d69c417e8c6a20cf331c821f716b58ba9e47166c7476afdb38997',
 * //  '0x69ef7438c94104839a6e2aa2385482a77399d2f46e894ae4f50ab6d69239d1c']
 * ```
 */
declare function signatureToHexArray(sig?: Signature): ArraySignatureType;
/**
 * Convert estimated fee to max fee including a margin
 * @param {BigNumberish} estimatedFee - The estimated fee
 * @param {number} [overhead = feeMarginPercentage.MAX_FEE] - The overhead added to the gas
 * @returns {bigint} The maximum fee with the margin
 * @example
 * ```typescript
 * const result = stark.estimatedFeeToMaxFee("8982300000000", 50);
 * // result = "13473450000000n"
 * ```
 */
declare function estimatedFeeToMaxFee(estimatedFee: BigNumberish, overhead?: number): bigint;
/**
 * Calculates the maximum resource bounds for fee estimation.
 *
 * @param {FeeEstimate | 0n} estimate The estimate for the fee. If a BigInt is provided, the returned bounds will be set to '0x0'.
 * @param {number} [amountOverhead = feeMarginPercentage.L1_BOUND_MAX_AMOUNT] - The percentage overhead added to the gas consumed or overall fee amount.
 * @param {number} [priceOverhead = feeMarginPercentage.L1_BOUND_MAX_PRICE_PER_UNIT] The percentage overhead added to the gas price per unit.
 * @returns {ResourceBounds} The maximum resource bounds for fee estimation.
 * @throws {Error} If the estimate object is undefined or does not have the required properties.
 * @example
 * ```typescript
 * const feeEstimated: FeeEstimate = {
  gas_consumed: "0x3456a",
  gas_price: "0xa45567567567ae4",
  overall_fee: "0x2198F463A77A899A5668",
  unit: "WEI"
};
const result = stark.estimateFeeToBounds(feeEstimated, 70, 50);
 * // result = {
 * //   l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
 * //   l1_gas: { max_amount: '0x58f9a', max_price_per_unit: '0xf6801b01b01b856' }
 * // }
 * ```
 */
declare function estimateFeeToBounds(estimate: FeeEstimate | 0n, amountOverhead?: number, priceOverhead?: number): ResourceBounds$2;
/**
 * Converts the data availability mode from EDataAvailabilityMode to EDAMode.
 *
 * @param {EDataAvailabilityMode} dam The data availability mode to be converted.
 * @return {EDAMode} The converted data availability mode.
 * @throws {Error} If the data availability mode is not a valid value.
 * @example
 * ```typescript
 * const result = stark.intDAM(RPC.EDataAvailabilityMode.L1);
 * // result = 0
 * ```
 */
declare function intDAM(dam: EDataAvailabilityMode$1): EDAMode$1;
/**
 * Convert to ETransactionVersion or throw an error.
 * Return providedVersion is specified else return defaultVersion
 * @param {BigNumberish} defaultVersion default estimate transaction version
 * @param {BigNumberish} [providedVersion] estimate transaction version
 * @returns {ETransactionVersion} if providedVersion is not provided, returns the default estimate version, else return the provided version
 * @throws {Error} if estimate transaction version or default estimate transaction version is unknown
 * @example
 * ```typescript
 * const result = stark.toTransactionVersion("0x100000000000000000000000000000003", stark.toFeeVersion(2));
 * // result = "0x100000000000000000000000000000002"
 * ```
 */
declare function toTransactionVersion(defaultVersion: BigNumberish, providedVersion?: BigNumberish): ETransactionVersion$1;
/**
 * Convert Transaction version to Fee version or throw an error
 * @param {BigNumberish} [providedVersion] 0..3 number representing the transaction version
 * @returns {ETransactionVersion | undefined} the fee estimation version corresponding to the transaction version provided
 * @throws {Error} if the transaction version is unknown
 * @example
 * ```typescript
 * const result = stark.toFeeVersion(2);
 * // result = "0x100000000000000000000000000000002"
 * ```
 */
declare function toFeeVersion(providedVersion?: BigNumberish): ETransactionVersion$1 | undefined;
/**
 * Return provided or default v3 tx details
 * @param {UniversalDetails} details details of the transaction
 * @return {V3Details} an object including the V3 transaction details.
 * @example
 * ```typescript
 * const detail: UniversalDetails = { tip: 3456n };
 * const result = stark.v3Details(detail);
 * // result = {
 * //   tip: 3456n,
 * //   paymasterData: [],
 * //   accountDeploymentData: [],
 * //   nonceDataAvailabilityMode: 'L1',
 * //   feeDataAvailabilityMode: 'L1',
 * //   resourceBounds: {
 * //     l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
 * //     l1_gas: { max_amount: '0x0', max_price_per_unit: '0x0' }
 * //   }
 * // }
 * ```
 */
declare function v3Details(details: UniversalDetails): V3Details;
/**
 * It will reduce V2 to V1, else (V3) stay the same
 * F2 -> F1
 * V2 -> V1
 * F3 -> F3
 * V3 -> V3
 * @param {ETransactionVersion} providedVersion
 * @returns {ETransactionVersion} if v2 then returns v1. if v3 then return v3
 * @example
 * ```typescript
 * const result = stark.reduceV2(constants.TRANSACTION_VERSION.V2);
 * // result = "0x1"
 * ```
 */
declare function reduceV2(providedVersion: ETransactionVersion$1): ETransactionVersion$1;
/**
 * get the hex string of the full public key related to a Starknet private key.
 * @param {BigNumberish} privateKey a 252 bits private key.
 * @returns {string} an hex string of a 520 bit number, representing the full public key related to `privateKey`.
 * @example
 * ```typescript
 * const result = ec.getFullPublicKey("0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535");
 * // result = "0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf"
 * ```
 */
declare function getFullPublicKey(privateKey: BigNumberish): string;

declare const stark_compressProgram: typeof compressProgram;
declare const stark_decompressProgram: typeof decompressProgram;
declare const stark_estimateFeeToBounds: typeof estimateFeeToBounds;
declare const stark_estimatedFeeToMaxFee: typeof estimatedFeeToMaxFee;
declare const stark_formatSignature: typeof formatSignature;
declare const stark_getFullPublicKey: typeof getFullPublicKey;
declare const stark_intDAM: typeof intDAM;
declare const stark_makeAddress: typeof makeAddress;
declare const stark_randomAddress: typeof randomAddress;
declare const stark_reduceV2: typeof reduceV2;
declare const stark_signatureToDecimalArray: typeof signatureToDecimalArray;
declare const stark_signatureToHexArray: typeof signatureToHexArray;
declare const stark_toFeeVersion: typeof toFeeVersion;
declare const stark_toTransactionVersion: typeof toTransactionVersion;
declare const stark_v3Details: typeof v3Details;
declare namespace stark {
  export { stark_compressProgram as compressProgram, stark_decompressProgram as decompressProgram, stark_estimateFeeToBounds as estimateFeeToBounds, stark_estimatedFeeToMaxFee as estimatedFeeToMaxFee, stark_formatSignature as formatSignature, stark_getFullPublicKey as getFullPublicKey, stark_intDAM as intDAM, stark_makeAddress as makeAddress, stark_randomAddress as randomAddress, stark_reduceV2 as reduceV2, stark_signatureToDecimalArray as signatureToDecimalArray, stark_signatureToHexArray as signatureToHexArray, stark_toFeeVersion as toFeeVersion, stark_toTransactionVersion as toTransactionVersion, stark_v3Details as v3Details };
}

/**
 * Get random Ethereum private Key.
 * @returns an Hex string
 * @example
 * ```typescript
 * const myPK: string = randomAddress()
 * // result = "0xf04e69ac152fba37c02929c2ae78c9a481461dda42dbc6c6e286be6eb2a8ab83"
 * ```
 */
declare function ethRandomPrivateKey(): string;
/**
 * Get a string formatted for an Ethereum address, without uppercase characters.
 * @param {BigNumberish} address Address of an Ethereum account.
 * @returns an Hex string coded on 20 bytes
 * @example
 * ```typescript
 * const myEthAddress: string = validateAndParseEthAddress("0x8359E4B0152ed5A731162D3c7B0D8D56edB165")
 * // result = "0x008359e4b0152ed5a731162d3c7b0d8d56edb165"
 * ```
 */
declare function validateAndParseEthAddress(address: BigNumberish): string;

declare const eth_ethRandomPrivateKey: typeof ethRandomPrivateKey;
declare const eth_validateAndParseEthAddress: typeof validateAndParseEthAddress;
declare namespace eth {
  export { eth_ethRandomPrivateKey as ethRandomPrivateKey, eth_validateAndParseEthAddress as validateAndParseEthAddress };
}

declare class MerkleTree {
    leaves: string[];
    branches: string[][];
    root: string;
    hashMethod: (a: BigNumberish, b: BigNumberish) => string;
    /**
     * Create a Merkle tree
     *
     * @param leafHashes hex-string array
     * @param hashMethod hash method to use, default: Pedersen
     * @returns created Merkle tree
     * @example
     * ```typescript
     * const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
     * const tree = new MerkleTree(leaves);
     * // tree = {
     * //   branches: [['0x5bb9440e2...', '0x262697b88...', ...], ['0x38118a340...', ...], ...],
     * //   leaves: ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'],
     * //   root: '0x7f748c75e5bdb7ae28013f076b8ab650c4e01d3530c6e5ab665f9f1accbe7d4',
     * //   hashMethod: [Function computePedersenHash],
     * // }
     * ```
     */
    constructor(leafHashes: string[], hashMethod?: (a: BigNumberish, b: BigNumberish) => string);
    /** @ignore */
    private build;
    /**
     * Calculate hash from ordered a and b, Pedersen hash default
     *
     * @param a first value
     * @param b second value
     * @param hashMethod hash method to use, default: Pedersen
     * @returns result of the hash function
     * @example
     * ```typescript
     * const result1 = MerkleTree.hash('0xabc', '0xdef');
     * // result1 = '0x484f029da7914ada038b1adf67fc83632364a3ebc2cd9349b41ab61626d9e82'
     *
     * const customHashMethod = (a, b) => `custom_${a}_${b}`;
     * const result2 = MerkleTree.hash('0xabc', '0xdef', customHashMethod);
     * // result2 = 'custom_2748_3567'
     * ```
     */
    static hash(a: BigNumberish, b: BigNumberish, hashMethod?: (a: BigNumberish, b: BigNumberish) => string): string;
    /**
     * Calculates the merkle membership proof path
     *
     * @param leaf hex-string
     * @param branch hex-string array
     * @param hashPath hex-string array
     * @returns collection of merkle proof hex-string hashes
     * @example
     * ```typescript
     * const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
     * const tree = new MerkleTree(leaves);
     * const result = tree.getProof('0x3');
     * // result = [
     * //   '0x4',
     * //   '0x5bb9440e27889a364bcb678b1f679ecd1347acdedcbf36e83494f857cc58026',
     * //   '0x8c0e46dd2df9aaf3a8ebfbc25408a582ad7fa7171f0698ddbbc5130b4b4e60',
     * // ]
     * ```
     */
    getProof(leaf: string, branch?: string[], hashPath?: string[]): string[];
}
/**
 * Tests a Merkle tree path
 *
 * @param root hex-string
 * @param leaf hex-string
 * @param path hex-string array
 * @param hashMethod hash method to use, default: Pedersen
 * @returns true if the path is valid, false otherwise
 * @example
 * ```typescript
 * const leaves = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6', '0x7'];
 * const tree = new MerkleTree(leaves);
 * const result = proofMerklePath(tree.root, '0x3', [
 *   '0x4',
 *   '0x5bb9440e27889a364bcb678b1f679ecd1347acdedcbf36e83494f857cc58026',
 *   '0x8c0e46dd2df9aaf3a8ebfbc25408a582ad7fa7171f0698ddbbc5130b4b4e60',
 * ]);
 * // result = true
 * ```
 */
declare function proofMerklePath(root: string, leaf: string, path: string[], hashMethod?: (a: BigNumberish, b: BigNumberish) => string): boolean;

type merkle_MerkleTree = MerkleTree;
declare const merkle_MerkleTree: typeof MerkleTree;
declare const merkle_proofMerklePath: typeof proofMerklePath;
declare namespace merkle {
  export { merkle_MerkleTree as MerkleTree, merkle_proofMerklePath as proofMerklePath };
}

/**
 * Singular class handling cairo u256 data type
 */

declare const UINT_128_MAX: bigint;
declare const UINT_256_MAX: bigint;
declare const UINT_256_MIN = 0n;
declare const UINT_256_LOW_MAX = 340282366920938463463374607431768211455n;
declare const UINT_256_HIGH_MAX = 340282366920938463463374607431768211455n;
declare const UINT_256_LOW_MIN = 0n;
declare const UINT_256_HIGH_MIN = 0n;
declare class CairoUint256 {
    low: bigint;
    high: bigint;
    static abiSelector: string;
    /**
     * Default constructor (Lib usage)
     * @param bigNumberish BigNumberish value representing uin256
     */
    constructor(bigNumberish: BigNumberish);
    /**
     * Direct props initialization (Api response)
     */
    constructor(low: BigNumberish, high: BigNumberish);
    /**
     * Initialization from Uint256 object
     */
    constructor(uint256: Uint256);
    /**
     * Validate if BigNumberish can be represented as Unit256
     */
    static validate(bigNumberish: BigNumberish): bigint;
    /**
     * Validate if low and high can be represented as Unit256
     */
    static validateProps(low: BigNumberish, high: BigNumberish): {
        low: bigint;
        high: bigint;
    };
    /**
     * Check if BigNumberish can be represented as Unit256
     */
    static is(bigNumberish: BigNumberish): boolean;
    /**
     * Check if provided abi type is this data type
     */
    static isAbiType(abiType: string): boolean;
    /**
     * Return bigint representation
     */
    toBigInt(): bigint;
    /**
     * Return Uint256 structure with HexString props
     * {low: HexString, high: HexString}
     */
    toUint256HexString(): {
        low: string;
        high: string;
    };
    /**
     * Return Uint256 structure with DecimalString props
     * {low: DecString, high: DecString}
     */
    toUint256DecimalString(): {
        low: string;
        high: string;
    };
    /**
     * Return api requests representation witch is felt array
     */
    toApiRequest(): string[];
}

/**
 * Convert Uint256 to bigint
 * Legacy support Export
 * @param {Uint256} uint256 Uint256 value to convert to bigint
 * @returns {bigint} BigInt representation of the input Uint256
 * @example
 * ```typescript
 * const uint256Value: Uint256 = {low: 1234567890, high: 1};
 * const result = uint256.uint256ToBN(uint256Value);
 * // result = 340282366920938463463374607433002779346n
 * ```
 */
declare function uint256ToBN(uint256: Uint256): bigint;
/**
 * Test BigNumberish is in the range[0, 2**256-1]
 * Legacy support Export
 * @param {BigNumberish} bn value to test
 * @returns {boolean} True if the input value is in the range[0, 2**256-1], false otherwise
 * @example
 * ```typescript
 * const result = uint256.isUint256(12345n);
 * // result = true
 * const result1 = uint256.isUint256(-1);
 * // result1 = false
 * ```
 */
declare function isUint256(bn: BigNumberish): boolean;
/**
 * Convert BigNumberish (string | number | bigint) to Uint256
 * Legacy support Export
 * @param {BigNumberish} bn value to convert to Uint256
 * @returns {Uint256} Uint256 object representing the BigNumberish value
 * @example
 * ```typescript
 * const result = uint256.bnToUint256(1000000000n);
 * // result = {"low": "0x3b9aca00", "high": "0x0"}
 * ```
 */
declare function bnToUint256(bn: BigNumberish): Uint256;

declare const uint256$1_UINT_128_MAX: typeof UINT_128_MAX;
declare const uint256$1_UINT_256_MAX: typeof UINT_256_MAX;
declare const uint256$1_bnToUint256: typeof bnToUint256;
declare const uint256$1_isUint256: typeof isUint256;
declare const uint256$1_uint256ToBN: typeof uint256ToBN;
declare namespace uint256$1 {
  export { uint256$1_UINT_128_MAX as UINT_128_MAX, uint256$1_UINT_256_MAX as UINT_256_MAX, uint256$1_bnToUint256 as bnToUint256, uint256$1_isUint256 as isUint256, uint256$1_uint256ToBN as uint256ToBN };
}

/**
 * Test if string contains only ASCII characters (string can be ascii text)
 * @param {string} str The string to test
 * @returns {boolean} Returns true if the string contains only ASCII characters, otherwise false
 * @example
 * ```typescript
 * const result = shortString.isASCII("Hello, world!");
 * // result = true
 * const result = shortString.isASCII("Hello, 世界!");
 * // result = false
 * ```
 */
declare function isASCII(str: string): boolean;
/**
 * Test if a string is a Cairo short string (string with less or equal 31 characters)
 * @param {string} str the string to test
 * @returns {boolean} Returns true if the string has less than or equal to 31 characters, otherwise false.
 * @example
 * ```typescript
 * const result = shortString.isShortString("Hello, world!");
 * // result = true
 * ```
 */
declare function isShortString(str: string): boolean;
/**
 * Test if string contains only numbers (string can be converted to decimal integer number)
 * @param {string} str the string to test.
 * @returns {boolean} Returns true if the string contains only numbers, otherwise false.
 * @example
 * ```typescript
 * const result = shortString.isDecimalString("12345");
 * // result = true
 * const result = shortString.isDecimalString("12a45");
 * // result = false
 * ```
 */
declare function isDecimalString(str: string): boolean;
/**
 * Test if value is a pure string text, and not a hex string or number string
 * @param {any} val the value to test
 * @returns {boolean} returns true if the value is a free-form string text, otherwise false
 * @example
 * ```typescript
 * const result = shortString.isText("Hello, world!");
 * // result = true
 * const result = shortString.isText("0x7aec92f706");
 * // result = false
 * ```
 */
declare function isText(val: any): boolean;
/**
 * Test if value is short text
 * @param {any} val - The item to test
 * @returns {boolean} Returns true if the value is a short text (string has less or equal 31 characters), otherwise false
 * @example
 * ```typescript
 * const result = shortString.isShortText("Hello, world!");
 * // result = true
 * ```
 */
declare const isShortText: (val: any) => boolean;
/**
 * Test if value is long text
 * @param {any} val the value to test
 * @returns {boolean} returns true if the value is a long text(string has more than 31 characters), otherwise false.
 * @example
 * ```typescript
 * const result = shortString.isLongText("Hello, world! this is some random long string to enable you test isLongText function.");
 * // result = true
 * ```
 */
declare const isLongText: (val: any) => boolean;
/**
 * Split long text (string greater than 31 characters) into short strings (string lesser or equal 31 characters)
 * @param {string} longStr the long text (string greater than 31 characters) to split
 * @returns {string[]} an array of short strings (string lesser or equal 31 characters).
 * @example
 * ```typescript
 * const result = shortString.splitLongString("Hello, world! we just testing splitLongString function.");
 * // result = [ 'Hello, world! we just testing s', 'plitLongString function.' ]
 * ```
 */
declare function splitLongString(longStr: string): string[];
/**
 * Convert an ASCII short string to a hexadecimal string.
 * @param {string} str short string (ASCII string, 31 characters max)
 * @returns {string} hex-string with 248 bits max
 * @example
 * ```typescript
 * const result = shortString.encodeShortString("uri/pict/t38.jpg");
 * // result = "0x7572692f706963742f7433382e6a7067"
 * ```
 */
declare function encodeShortString(str: string): string;
/**
 * Convert a hexadecimal or decimal string to an ASCII string.
 * @param {string} str representing a 248 bit max number (ex. "0x1A4F64EA56" or "236942575435676423")
 * @returns {string} short string; 31 characters max
 * @example
 * ```typescript
 * const result = shortString.decodeShortString("0x7572692f706963742f7433382e6a7067");
 * // result = "uri/pict/t38.jpg"
 * ```
 */
declare function decodeShortString(str: string): string;

declare const shortString_decodeShortString: typeof decodeShortString;
declare const shortString_encodeShortString: typeof encodeShortString;
declare const shortString_isASCII: typeof isASCII;
declare const shortString_isDecimalString: typeof isDecimalString;
declare const shortString_isLongText: typeof isLongText;
declare const shortString_isShortString: typeof isShortString;
declare const shortString_isShortText: typeof isShortText;
declare const shortString_isText: typeof isText;
declare const shortString_splitLongString: typeof splitLongString;
declare namespace shortString {
  export { shortString_decodeShortString as decodeShortString, shortString_encodeShortString as encodeShortString, shortString_isASCII as isASCII, shortString_isDecimalString as isDecimalString, shortString_isLongText as isLongText, shortString_isShortString as isShortString, shortString_isShortText as isShortText, shortString_isText as isText, shortString_splitLongString as splitLongString };
}

interface Context {
    parent?: string;
    key?: string;
}
/**
 * Validates that `data` matches the EIP-712 JSON schema.
 */
declare function validateTypedData(data: unknown): data is TypedData;
/**
 * Prepares the selector for later use, if it's not already in correct format.
 * The selector in correct format is the starknet_keccak hash of the function name, encoded in ASCII.
 *
 * @param {string} selector - The selector to be prepared.
 * @returns {string} The prepared selector.
 *
 * @example
 * ```typescript
 * const result1 = prepareSelector('0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8');
 * // result1 = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
 *
 * const result2 =  prepareSelector('myFunction');
 * // result2 = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
 * ```
 */
declare function prepareSelector(selector: string): string;
/**
 * Checks if the given Starknet type is a Merkle tree type.
 *
 * @param {StarknetType} type - The StarkNet type to check.
 *
 * @returns {boolean} - True if the type is a Merkle tree type, false otherwise.
 *
 * @example
 * ```typescript
 * const type = { name: 'test', type: 'merkletree',};
 * const result1 = isMerkleTreeType(type);
 * // result1 = true
 *
 * const type2 = {name: 'test', type: 'non-merkletree',};
 * const result2 =  isMerkleTreeType(type2);
 * // result2 = false
 * ```
 */
declare function isMerkleTreeType(type: StarknetType): type is StarknetMerkleType;
/**
 * Get the dependencies of a struct type. If a struct has the same dependency multiple times, it's only included once
 * in the resulting array.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to get dependencies for.
 * @param {string[]} [dependencies=[]] - The array to store dependencies.
 * @param {string} [contains=''] - The type contained within the struct.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {string[]} The array of dependencies.
 */
declare function getDependencies(types: TypedData['types'], type: string, dependencies?: string[], contains?: string, revision?: TypedDataRevision): string[];
/**
 * Encode a type to a string. All dependent types are alphabetically sorted.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to encode.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {string} The encoded string.
 *
 * @example
 * ```typescript
 * import typedDataExample from '../../__mocks__/typedData/baseExample.json';
 *
 * const result = encodeType(typedDataExample.types, 'Mail');
 * // result = "Mail(from:Person,to:Person,contents:felt)Person(name:felt,wallet:felt)";
 * ```
 */
declare function encodeType(types: TypedData['types'], type: string, revision?: TypedDataRevision): string;
/**
 * Get a type string as hash.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to hash.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {string} The hash.
 *
 * @example
 * ```typescript
 * import typedDataExample from '../../__mocks__/typedData/baseExample.json';
 *
 * const result = getTypeHash(typedDataExample.types, 'StarkNetDomain');
 * // result = "0x1bfc207425a47a5dfa1a50a4f5241203f50624ca5fdf5e18755765416b8e288";
 * ```
 */
declare function getTypeHash(types: TypedData['types'], type: string, revision?: TypedDataRevision): string;
/**
 * Encodes a single value to an ABI serialisable string, number or Buffer. Returns the data as a tuple, which consists of
 * an array of ABI compatible types, and an array of corresponding values.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to encode.
 * @param {unknown} data - The data to encode.
 * @param {Context} [ctx={}] - The context of the encoding process.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {[string, string]} The ABI compatible type and corresponding value.
 *
 * @example
 * ```typescript
 * import { getSelectorFromName } from '../../src/utils/hash';
 *
 * const selector = 'transfer';
 * const selectorHash = getSelectorFromName(selector);
 * const result1 = encodeValue({}, 'felt', selectorHash);
 *
 * // result1 = ['felt', '0x83afd3f4caedc6eebf44246fe54e38c95e3179a5ec9ea81740eca5b482d12e']
 * ```
 */
declare function encodeValue(types: TypedData['types'], type: string, data: unknown, ctx?: Context, revision?: TypedDataRevision): [string, string];
/**
 * Encode the data to an ABI encoded Buffer. The data should be a key -> value object with all the required values.
 * All dependent types are automatically encoded.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to encode.
 * @param {TypedData['message']} data - The data to encode.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {[string[], string[]]} The ABI compatible types and corresponding values.
 */
declare function encodeData<T extends TypedData>(types: T['types'], type: string, data: T['message'], revision?: TypedDataRevision): [string[], string[]];
/**
 * Get encoded data as a hash. The data should be a key -> value object with all the required values.
 * All dependent types are automatically encoded.
 *
 * @param {TypedData['types']} types - The types object containing all defined types.
 * @param {string} type - The name of the type to hash.
 * @param {TypedData['message']} data - The data to hash.
 * @param {Revision} [revision=Revision.Legacy] - The revision of the TypedData.
 *
 * @returns {string} The hash of the encoded data.
 *
 * @example
 * ```typescript
 * import exampleBaseTypes from '../../__mocks__/typedData/example_baseTypes.json';
 *
 * const result = getStructHash(
 *    exampleBaseTypes.types,
 *    'StarknetDomain',
 *    exampleBaseTypes.domain as StarknetDomain,
 *    TypedDataRevision.ACTIVE
 *  );
 *  // result = "0x555f72e550b308e50c1a4f8611483a174026c982a9893a05c185eeb85399657";
 * ```
 */
declare function getStructHash<T extends TypedData>(types: T['types'], type: string, data: T['message'], revision?: TypedDataRevision): string;
/**
 * Get the SNIP-12 encoded message to sign, from the typedData object.
 *
 * @param {TypedData} typedData - The TypedData object.
 * @param {BigNumberish} account - The account to sign the message.
 *
 * @returns {string} The hash of the message to sign.
 * @throws Will throw an error if the typedData does not match the JSON schema.
 *
 * @example
 * ```typescript
 * const exampleAddress = "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826";
 * const typedDataStringExample = {
 *  types: {
 *    StarkNetDomain: [
 *      { name: 'name', type: 'felt' },
 *      { name: 'version', type: 'felt' },
 *      { name: 'chainId', type: 'felt' },
 *    ],
 *    Person: [
 *      { name: 'name', type: 'felt' },
 *      { name: 'wallet', type: 'felt' },
 *    ],
 *    String: [
 *      { name: 'len', type: 'felt' },
 *      { name: 'data', type: 'felt*' },
 *    ],
 *    Mail: [
 *      { name: 'from', type: 'Person' },
 *      { name: 'to', type: 'Person' },
 *      { name: 'contents', type: 'String' },
 *    ],
 *  },
 *  primaryType: 'Mail',
 *  domain: {
 *    name: 'StarkNet Mail',
 *    version: '1',
 *    chainId: 1,
 *  },
 *  message: {
 *    from: {
 *      name: 'Cow',
 *      wallet: exampleAddress,
 *    },
 *    to: {
 *      name: 'Bob',
 *      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
 *    },
 *    contents: stringToStringStruct(
 *      'this is way longer than just 32 characters, to test if that is possible within a typedData struct.'
 *    ),
 *  },
 * };
 *
 * const result = getMessageHash(typedDataStringExample, exampleAddress);
 * // result = "0x70338fb11b8f70b68b261de8a322bcb004bd85e88ac47d9147982c7f5ac66fd"
 * ```
 */
declare function getMessageHash(typedData: TypedData, account: BigNumberish): string;
/**
 * Checks if a signed EIP712 message is related to an account.
 * Valid for a standard Starknet signature.
 * @param {BigNumberish | TypedData} message a TypedMessage message, or the hash of an EIP712 message (SNIP-12).
 * @param {Signature} signature a WeierstrassSignatureType signature, or an array of 2 strings.
 * @param {BigNumberish} fullPublicKey a number coded on 520 bits (from ec.getFullPublicKey()).
 * @param {BigNumberish} [accountAddress] address of the account that has signed the message. Not needed with a message hash is provided in `message`
 * @returns {boolean} true if the message is verified.
 * @example
 * ```typescript
 * const myTypedMessage: TypedMessage = .... ;
 * const sign: Signature = ["0x123...abc", "0x345...def"];
 * const fullPubK = "0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf";
 * const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
 * const result1 = typedData.verifyMessage(myTypedMessage, sign, fullPubK, accountAddress);
 * const result2 = typedData.verifyMessage(messageHash, sign, fullPubK);
 * // result1 = result2 = true
 * ```
 */
declare function verifyMessage(message: TypedData, signature: Signature, fullPublicKey: BigNumberish, accountAddress: BigNumberish): boolean;
declare function verifyMessage(message: BigNumberish, signature: Signature, fullPublicKey: BigNumberish): boolean;

declare const typedData_StarknetDomain: typeof StarknetDomain;
declare const typedData_StarknetEnumType: typeof StarknetEnumType;
declare const typedData_StarknetMerkleType: typeof StarknetMerkleType;
declare const typedData_StarknetType: typeof StarknetType;
declare const typedData_TypedData: typeof TypedData;
declare const typedData_TypedDataRevision: typeof TypedDataRevision;
declare const typedData_encodeData: typeof encodeData;
declare const typedData_encodeType: typeof encodeType;
declare const typedData_encodeValue: typeof encodeValue;
declare const typedData_getDependencies: typeof getDependencies;
declare const typedData_getMessageHash: typeof getMessageHash;
declare const typedData_getStructHash: typeof getStructHash;
declare const typedData_getTypeHash: typeof getTypeHash;
declare const typedData_isMerkleTreeType: typeof isMerkleTreeType;
declare const typedData_prepareSelector: typeof prepareSelector;
declare const typedData_validateTypedData: typeof validateTypedData;
declare const typedData_verifyMessage: typeof verifyMessage;
declare namespace typedData {
  export { typedData_StarknetDomain as StarknetDomain, typedData_StarknetEnumType as StarknetEnumType, typedData_StarknetMerkleType as StarknetMerkleType, typedData_StarknetType as StarknetType, typedData_TypedData as TypedData, typedData_TypedDataRevision as TypedDataRevision, typedData_encodeData as encodeData, typedData_encodeType as encodeType, typedData_encodeValue as encodeValue, typedData_getDependencies as getDependencies, typedData_getMessageHash as getMessageHash, typedData_getStructHash as getStructHash, typedData_getTypeHash as getTypeHash, typedData_isMerkleTreeType as isMerkleTreeType, typedData_prepareSelector as prepareSelector, typedData_validateTypedData as validateTypedData, typedData_verifyMessage as verifyMessage };
}

/**
 * Decodes an array of BigInts into a string using the given algorithm.
 * @param {bigint[]} encoded The encoded array of BigInts.
 * @return {string} The decoded string.
 * @example
 * ```typescript
 * const result = starknetId.useDecoded([3015206943634620n]);
 * // result = "starknetjs.stark"
 * ```
 */
declare function useDecoded(encoded: bigint[]): string;
/**
 * Encodes a string into a bigint value.
 *
 * @param {string} decoded The string to be encoded.
 * @returns {bigint} The encoded bigint value.
 * @example
 * ```typescript
 * const result = starknetId.useEncoded("starknet.js");
 * // result = 3015206943634620n
 * ```
 */
declare function useEncoded(decoded: string): bigint;
declare const StarknetIdContract: {
    readonly MAINNET: "0x6ac597f8116f886fa1c97a23fa4e08299975ecaf6b598873ca6792b9bbfb678";
    readonly TESTNET_SEPOLIA: "0x154bc2e1af9260b9e66af0e9c46fc757ff893b3ff6a85718a810baf1474";
};
/**
 * Returns the Starknet ID contract address based on the provided chain ID.
 *
 * @param {StarknetChainId} chainId The chain ID of the Starknet network.
 * @return {string} The Starknet ID contract address.
 * @throws {Error} Throws an error if the Starknet ID contract is not deployed on the network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x154bc2e1af9260b9e66af0e9c46fc757ff893b3ff6a85718a810baf1474"
 * ```
 */
declare function getStarknetIdContract(chainId: StarknetChainId): string;
declare const StarknetIdIdentityContract: {
    readonly MAINNET: "0x05dbdedc203e92749e2e746e2d40a768d966bd243df04a6b712e222bc040a9af";
    readonly TESTNET_SEPOLIA: "0x3697660a0981d734780731949ecb2b4a38d6a58fc41629ed611e8defda";
};
/**
 * Returns the Starknet ID identity contract address for the given chain ID.
 *
 * @param {StarknetChainId} chainId The chain ID for the specified network.
 *
 * @return {string} The Starknet ID identity contract address for the specified network.
 *
 * @throws {Error} If the Starknet ID verifier contract is not deployed on the network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdIdentityContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x3697660a0981d734780731949ecb2b4a38d6a58fc41629ed611e8defda"
 * ```
 */
declare function getStarknetIdIdentityContract(chainId: StarknetChainId): string;
declare const StarknetIdMulticallContract = "0x034ffb8f4452df7a613a0210824d6414dbadcddce6c6e19bf4ddc9e22ce5f970";
/**
 * Returns the Starknet.id multicall contract address based on the provided chainId.
 *
 * @param {StarknetChainId} chainId - The chainId of the network.
 * @return {string} - The address of the Starknet.id multicall contract.
 * @throws {Error} - If the Starknet.id multicall contract is not deployed on the network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdMulticallContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x034ffb8f4452df7a613a0210824d6414dbadcddce6c6e19bf4ddc9e22ce5f970"
 * ```
 */
declare function getStarknetIdMulticallContract(chainId: StarknetChainId): string;
declare const StarknetIdVerifierContract: {
    readonly MAINNET: "0x07d14dfd8ee95b41fce179170d88ba1f0d5a512e13aeb232f19cfeec0a88f8bf";
    readonly TESTNET_SEPOLIA: "0x60B94fEDe525f815AE5E8377A463e121C787cCCf3a36358Aa9B18c12c4D566";
};
/**
 * Returns the address of the Starknet ID Verifier contract based on the specified chain ID.
 *
 * @param {StarknetChainId} chainId - The ID of the Starknet chain.
 * @return {string} - The address of the Starknet ID Verifier contract.
 * @throws {Error} - If the Starknet ID Verifier contract is not deployed on the specified network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdVerifierContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x60B94fEDe525f815AE5E8377A463e121C787cCCf3a36358Aa9B18c12c4D566"
 * ```
 */
declare function getStarknetIdVerifierContract(chainId: StarknetChainId): string;
declare const StarknetIdPfpContract: {
    readonly MAINNET: "0x070aaa20ec4a46da57c932d9fd89ca5e6bb9ca3188d3df361a32306aff7d59c7";
    readonly TESTNET_SEPOLIA: "0x9e7bdb8dabd02ea8cfc23b1d1c5278e46490f193f87516ed5ff2dfec02";
};
/**
 * Retrieves the contract address of the Starknet.id profile picture verifier contract based on the given chain ID.
 *
 * @param {StarknetChainId} chainId - The chain ID of the network.
 * @returns {string} - The contract address of the Starknet.id profile picture verifier contract.
 * @throws {Error} - Throws an error if the Starknet.id profile picture verifier contract is not yet deployed on the network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdPfpContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x9e7bdb8dabd02ea8cfc23b1d1c5278e46490f193f87516ed5ff2dfec02"
 * ```
 */
declare function getStarknetIdPfpContract(chainId: StarknetChainId): string;
declare const StarknetIdPopContract: {
    readonly MAINNET: "0x0293eb2ba9862f762bd3036586d5755a782bd22e6f5028320f1d0405fd47bff4";
    readonly TESTNET_SEPOLIA: "0x15ae88ae054caa74090b89025c1595683f12edf7a4ed2ad0274de3e1d4a";
};
/**
 * Retrieves the Starknet ID Proof of Personhood (IdPop) verifier contract address for the given chain ID.
 *
 * @param {StarknetChainId} chainId - The chain ID of the Starknet network.
 * @return {string} - The Starknet ID Pop contract address.
 * @throws {Error} - If the Starknet ID Pop contract is not deployed on the specified network.
 * @example
 * ```typescript
 * const result = starknetId.getStarknetIdPopContract(constants.StarknetChainId.SN_SEPOLIA);
 * // result = "0x15ae88ae054caa74090b89025c1595683f12edf7a4ed2ad0274de3e1d4a"
 * ```
 */
declare function getStarknetIdPopContract(chainId: StarknetChainId): string;
/**
 * Returns a CairoCustomEnum object.
 *
 * Functions to build CairoCustomEnum for multiCall contracts
 * @param {Object} [staticEx] An optional object defining the "Static" value of the CairoCustomEnum.
 * @param {number[]} [ifEqual] An optional array defining the "IfEqual" value of the CairoCustomEnum.
 * @param {number[]} [ifNotEqual] An optional array defining the "IfNotEqual" value of the CairoCustomEnum.
 * @return {CairoCustomEnum} - The created CairoCustomEnum object.
 * @example
 * ```typescript
 * const result: CairoCustomEnum = starknetId.execution(undefined, [1, 2, 3], undefined);
 * // result = CairoCustomEnum {
 * //   variant: {
 * //     Static: undefined,
 * //     IfEqual: { '0': 1, '1': 2, '2': 3 },
 * //     IfNotEqual: undefined
 * //   }
 * // }
 * ```
 */
declare function execution(staticEx: {} | undefined, ifEqual?: number[] | undefined, ifNotEqual?: number[] | undefined): CairoCustomEnum;
/**
 * Creates a new instance of CairoCustomEnum.
 *
 * @param {BigNumberish} [hardcoded] The hardcoded value for the CairoCustomEnum.
 * @param {number[]} [reference] The reference array for the CairoCustomEnum.
 * @returns {CairoCustomEnum} The new instance of CairoCustomEnum.
 * @example
 * ```typescript
 * const result: CairoCustomEnum = starknetId.dynamicFelt(undefined, [1, 2]);
 * // result = CairoCustomEnum {
 * //  variant: { Hardcoded: undefined, Reference: { '0': 1, '1': 2 } }
 * // }
 * ```
 */
declare function dynamicFelt(hardcoded: BigNumberish | undefined, reference?: number[] | undefined): CairoCustomEnum;
/**
 * Creates a new instance of CairoCustomEnum with the given parameters.
 * @param {BigNumberish} [hardcoded] The hardcoded value.
 * @param {BigNumberish[]} [reference] The reference value (optional).
 * @param {BigNumberish[]} [arrayReference] The array reference value (optional).
 * @return {CairoCustomEnum} The new instance of CairoCustomEnum.
 * @example
 * ```typescript
 * const result: CairoCustomEnum = starknetId.dynamicCallData(undefined, [1, 2], undefined);
 * // result = CairoCustomEnum {
 * //   variant: {
 * //     Hardcoded: undefined,
 * //     Reference: { '0': 1, '1': 2 },
 * //     ArrayReference: undefined
 * //   }
 * // }
 * ```
 */
declare function dynamicCallData(hardcoded: BigNumberish | undefined, reference?: BigNumberish[] | undefined, arrayReference?: BigNumberish[] | undefined): CairoCustomEnum;
/**
 * Check if a given string is a valid Starknet.id domain.
 *
 * @param {string} domain - The domain string to validate.
 * @returns {boolean} - True if the domain is a valid Starknet.id domain, false otherwise.
 * @example
 * ```typescript
 * const result = starknetId.isStarkDomain("example.stark");
 * // result = true
 *
 * const result2 = starknetId.isStarkDomain("invalid-domain");
 * // result2 = false
 * ```
 */
declare function isStarkDomain(domain: string): boolean;

declare const starknetId_StarknetIdContract: typeof StarknetIdContract;
declare const starknetId_StarknetIdIdentityContract: typeof StarknetIdIdentityContract;
declare const starknetId_StarknetIdMulticallContract: typeof StarknetIdMulticallContract;
declare const starknetId_StarknetIdPfpContract: typeof StarknetIdPfpContract;
declare const starknetId_StarknetIdPopContract: typeof StarknetIdPopContract;
declare const starknetId_StarknetIdVerifierContract: typeof StarknetIdVerifierContract;
declare const starknetId_dynamicCallData: typeof dynamicCallData;
declare const starknetId_dynamicFelt: typeof dynamicFelt;
declare const starknetId_execution: typeof execution;
declare const starknetId_getStarknetIdContract: typeof getStarknetIdContract;
declare const starknetId_getStarknetIdIdentityContract: typeof getStarknetIdIdentityContract;
declare const starknetId_getStarknetIdMulticallContract: typeof getStarknetIdMulticallContract;
declare const starknetId_getStarknetIdPfpContract: typeof getStarknetIdPfpContract;
declare const starknetId_getStarknetIdPopContract: typeof getStarknetIdPopContract;
declare const starknetId_getStarknetIdVerifierContract: typeof getStarknetIdVerifierContract;
declare const starknetId_isStarkDomain: typeof isStarkDomain;
declare const starknetId_useDecoded: typeof useDecoded;
declare const starknetId_useEncoded: typeof useEncoded;
declare namespace starknetId {
  export { starknetId_StarknetIdContract as StarknetIdContract, starknetId_StarknetIdIdentityContract as StarknetIdIdentityContract, starknetId_StarknetIdMulticallContract as StarknetIdMulticallContract, starknetId_StarknetIdPfpContract as StarknetIdPfpContract, starknetId_StarknetIdPopContract as StarknetIdPopContract, starknetId_StarknetIdVerifierContract as StarknetIdVerifierContract, starknetId_dynamicCallData as dynamicCallData, starknetId_dynamicFelt as dynamicFelt, starknetId_execution as execution, starknetId_getStarknetIdContract as getStarknetIdContract, starknetId_getStarknetIdIdentityContract as getStarknetIdIdentityContract, starknetId_getStarknetIdMulticallContract as getStarknetIdMulticallContract, starknetId_getStarknetIdPfpContract as getStarknetIdPfpContract, starknetId_getStarknetIdPopContract as getStarknetIdPopContract, starknetId_getStarknetIdVerifierContract as getStarknetIdVerifierContract, starknetId_isStarkDomain as isStarkDomain, starknetId_useDecoded as useDecoded, starknetId_useEncoded as useEncoded };
}

/**
 * Helper - Async Sleep for 'delay' time
 *
 * @param {number} delay - Number of milliseconds to delay
 * @returns {Promise<unknown>}
 * @example
 * ```typescript
 * await provider.wait(1000) // 1000 milliseconds == 1 second
 * ```
 */
declare function wait(delay: number): Promise<unknown>;
/**
 * Create Sierra compressed Contract Class from a given Compiled Sierra
 *
 * CompiledSierra -> SierraContractClass
 *
 * @param {CompiledSierra} contract sierra code from the Cairo compiler
 * @returns {SierraContractClass} compressed Sierra
 * @example
 * ```typescript
 * const result = provider.createSierraContractClass({
    "sierra_program": [
        "0x1",
        "0x4",
        "0x0",
        "0x2",
        "0x4",
        "0x1",
        "0x3b4",
        "0x4c",
        "0x65",
        "0x52616e6765436865636b",...})
 * // result = {sierra_program: 'H4sIAAAAAAAAA6x9WZbsrI7uVGqd53qgb8ZynwzYY7jDv5JAAmxHZuQ+96yq/L0jIzEINZ8axP/5j/q/+j//+z/wH9f/o/p/zPbh+Iot49+u9v8G3//rTdDhDDF4Z0MKPthQ+m+S2v6n1S//638VvdXW2PQ6RvxuDG+jiybCXKJ7Hef6ZRi9E+Q89WmKLilfqbrsL6PUCf8...}
 * ```
 */
declare function createSierraContractClass(contract: CompiledSierra): SierraContractClass;
/**
 * Create a compressed contract from a given compiled Cairo 0 & 1 contract or a string.
 * @param {CompiledContract | string} contract - Compiled Cairo 0 or Cairo 1 contract, or string
 * @returns {ContractClass} Cairo 0 or Cairo 1 compressed contract
 * @example
 * ```typescript
 * const result = provider.parseContract({
    "sierra_program": [
        "0x1",
        "0x4",
        "0x0",
        "0x2",
        "0x4",
        "0x1",
        "0x3b4",
        "0x4c",
        "0x65",
        "0x52616e6765436865636b",...})
 * // result = {sierra_program: 'H4sIAAAAAAAAA6x9WZbsrI7uVGqd53qgb8ZynwzYY7jDv5JAAmxHZuQ+96yq/L0jIzEINZ8axP/5j/q/+j//+z/wH9f/o/p/zPbh+Iot49+u9v8G3//rTdDhDDF4Z0MKPthQ+m+S2v6n1S//638VvdXW2PQ6RvxuDG+jiybCXKJ7Hef6ZRi9E+Q89WmKLilfqbrsL6PUCf8...}
 * ```
 */
declare function parseContract(contract: CompiledContract | string): ContractClass;
/**
 * Return randomly select available public node
 * @param {NetworkName} networkName NetworkName
 * @param {boolean} mute mute public node warning
 * @returns {string} default node url
 * @example
 * ```typescript
 * const result= provider.getDefaultNodeUrl(constants.NetworkName.SN_MAIN,false);
 * // console : "Using default public node url, please provide nodeUrl in provider options!"
 * // result = "https://starknet-mainnet.public.blastapi.io/rpc/v0_7"
 * ```
 */
declare const getDefaultNodeUrl: (networkName?: NetworkName, mute?: boolean) => string;
declare const validBlockTags: ("latest" | "pending")[];
/**
 * This class is formatting the identifier of a block.
 *
 * hex string and BigInt are detected as block hashes. identifier return { block_hash: hash }
 *
 * decimal string and number are detected as block numbers. identifier return { block_number: number }
 *
 * text string are detected as block tag. identifier return tag
 *
 * null is detected as 'pending' block tag. identifier return 'pending'
 * @example
 * ```typescript
 * const result = new provider.Block(null).identifier;
 * // result = "pending"
 * ```
 */
declare class Block {
    /**
     * @param {BlockIdentifier} hash if not null, contains the block hash
     */
    hash: BlockIdentifier;
    /**
     * @param {BlockIdentifier} number if not null, contains the block number
     */
    number: BlockIdentifier;
    /**
     * @param {BlockIdentifier} tag if not null, contains "pending" or "latest"
     */
    tag: BlockIdentifier;
    private setIdentifier;
    /**
     * Create a Block instance
     * @param {BlockIdentifier} _identifier  hex string and BigInt are detected as block hashes.
     * decimal string and number are detected as block numbers.
     * text string are detected as block tag.
     * null is considered as a 'pending' block tag.
     */
    constructor(_identifier: BlockIdentifier);
    /**
     * @returns {any} the identifier as a string
     * @example
     * ```typescript
     * const result = new provider.Block(123456n).queryIdentifier;
     * // result = "blockHash=0x1e240"
     * ```
     */
    get queryIdentifier(): any;
    /**
     * @returns {any} the identifier as an object
     * @example
     * ```typescript
     * const result = new provider.Block(56789).identifier;
     * // result = { block_number: 56789 }
     * ```
     */
    get identifier(): any;
    /**
     * change the identifier of an existing Block instance
     * @example
     * ```typescript
     * const myBlock = new provider.Block("latest");
     * myBlock.identifier ="0x3456789abc";
     * const result = myBlock.identifier;
     * // result = { block_hash: '0x3456789abc' }
     * ```
     */
    set identifier(_identifier: BlockIdentifier);
    valueOf: () => BlockIdentifier;
    toString: () => BlockIdentifier;
}
/**
 * Check if the given transaction details is a V3 transaction.
 *
 * @param {InvocationsDetailsWithNonce} details The transaction details to be checked.
 * @return {boolean} Returns true if the transaction is a V3 transaction, otherwise false.
 * @example
 * ```typescript
 * const invocation: InvocationsDetailsWithNonce = {
 *   nonce: 1,
 *   version: 3,
 *   maxFee: 10 ** 15,
 *   feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
 *   tip: 10 ** 13,
 *   paymasterData: [],
 *   resourceBounds: {
 *       l1_gas: { max_amount: num.toHex(10 ** 14), max_price_per_unit: num.toHex(50) },
 *       l2_gas: { max_amount: num.toHex(0), max_price_per_unit: num.toHex(0) }}};
 * const result = provider.isV3Tx(invocation);
 * // result = true
 * ```
 */
declare function isV3Tx(details: InvocationsDetailsWithNonce): details is V3TransactionDetails;
/**
 * Determines if the given response matches the specified version.
 *
 * @param {('0.5' | '0.6' | '0.7')} version The version to compare against the response.
 * @param {string} response The response to check against the version.
 * @returns {boolean} True if the response matches the version, false otherwise.
 * @example
 * ``` typescript
 * const result = provider.isVersion("0.7","0_7");
 * // result = false
 * ```
 */
declare function isVersion(version: '0.5' | '0.6' | '0.7', response: string): boolean;
/**
 * Guard Pending Block
 * @param {GetBlockResponse} response answer of myProvider.getBlock()
 * @return {boolean} true if block is the pending block
 * @example
 * ```typescript
 * const block = await myProvider.getBlock("pending");
 * const result = provider.isPendingBlock(block);
 * // result = true
 * ```
 */
declare function isPendingBlock(response: GetBlockResponse): response is PendingBlock;
/**
 * Guard Pending Transaction
 * @param {GetTransactionReceiptResponse} response transaction Receipt
 * @return {boolean} true if the transaction is part of the pending block
 * @example
 * ```typescript
 * const block = await myProvider.getBlockWithTxs("pending");
 * const txR = await myProvider.getTransactionReceipt(block.transactions[0].transaction_hash);
 * const result = provider.isPendingTransaction(txR);
 * // result = true
 * ```
 */
declare function isPendingTransaction(response: GetTransactionReceiptResponse): boolean;
/**
 * Guard Pending State Update
 * @param {StateUpdateResponse} response State of a block
 * @return {boolean} true if the block is pending
 * @example
 * ```typescript
 * const state: StateUpdateResponse = await myProvider.getStateUpdate("pending");
 * const result = provider.isPendingStateUpdate(state);
 * // result = true
 * ```
 */
declare function isPendingStateUpdate(response: StateUpdateResponse): response is PendingStateUpdate;

type provider_Block = Block;
declare const provider_Block: typeof Block;
declare const provider_createSierraContractClass: typeof createSierraContractClass;
declare const provider_getDefaultNodeUrl: typeof getDefaultNodeUrl;
declare const provider_isPendingBlock: typeof isPendingBlock;
declare const provider_isPendingStateUpdate: typeof isPendingStateUpdate;
declare const provider_isPendingTransaction: typeof isPendingTransaction;
declare const provider_isV3Tx: typeof isV3Tx;
declare const provider_isVersion: typeof isVersion;
declare const provider_parseContract: typeof parseContract;
declare const provider_validBlockTags: typeof validBlockTags;
declare const provider_wait: typeof wait;
declare namespace provider {
  export { provider_Block as Block, provider_createSierraContractClass as createSierraContractClass, provider_getDefaultNodeUrl as getDefaultNodeUrl, provider_isPendingBlock as isPendingBlock, provider_isPendingStateUpdate as isPendingStateUpdate, provider_isPendingTransaction as isPendingTransaction, provider_isV3Tx as isV3Tx, provider_isVersion as isVersion, provider_parseContract as parseContract, provider_validBlockTags as validBlockTags, provider_wait as wait };
}

/**
 * Check if an ABI entry is related to events.
 * @param {AbiEntry} object an Abi entry
 * @returns {boolean} true if this Abi Entry is related to an event
 * @example
 * ```typescript
 * // use of a transaction receipt
 * ```
 */
declare function isAbiEvent(object: AbiEntry): boolean;
/**
 * Retrieves the events from the given ABI (from Cairo 0 or Cairo 1 contract).
 *
 * Is able to handle Cairo 1 events nested in Cairo components.
 * @param {Abi} abi - The ABI to extract events from.
 * @return {AbiEvents} - An object containing the hashes and the definition of the events.
 * @example
 * ```typescript
 * const result = events.getAbiEvents(abi);
 * // result = {
 * //   '0x22ea134d4126804c60797e633195f8c9aa5fd6d1567e299f4961d0e96f373ee':
 * //    { '0x34e55c1cd55f1338241b50d352f0e91c7e4ffad0e4271d64eb347589ebdfd16': {
 * //     kind: 'struct', type: 'event',
 * //     name: 'ka::ExComponent::ex_logic_component::Mint',
 * //     members: [{
 * //      name: 'spender',
 * //      type: 'core::starknet::contract_address::ContractAddress',
 * //      kind: 'key'},
 * //      { name: 'value', type: 'core::integer::u256', kind: 'data' }]},
 * // ...
 * ```
 */
declare function getAbiEvents(abi: Abi): AbiEvents;
/**
 * Parse raw events and structure them into response object based on a contract structs and defined events
 * @param {RPC.Event[]} providerReceivedEvents Array of raw events
 * @param {AbiEvents} abiEvents Events defined in the abi
 * @param {AbiStructs} abiStructs Structs defined in the abi
 * @param {AbiEnums} abiEnums Enums defined in the abi
 * @returns {ParsedEvents} parsed events corresponding to the abi
 * @example
 * ```typescript
 * const abiEvents = events.getAbiEvents(sierra.abi);
 * const abiStructs =  CallData.getAbiStruct(sierra.abi);
 * const abiEnums = CallData.getAbiEnum(sierra.abi);
 * const result = events.parseEvents(myEvents, abiEvents, abiStructs, abiEnums);
 * // result = [{test::ExCh::ex_ch::Trade: {
      maker: 7548613724711489396448209137n,
      taker: 6435850562375218974960297344n,
      router_maker: 0n,
    }}]
 * ```
 */
declare function parseEvents(providerReceivedEvents: EmittedEvent$1[], abiEvents: AbiEvents, abiStructs: AbiStructs, abiEnums: AbiEnums): ParsedEvents;
/**
 * Parse Transaction Receipt Event from UDC invoke transaction and
 * create DeployContractResponse compatible response with addition of the UDC Event data
 * @param {InvokeTransactionReceiptResponse} txReceipt
 *
 * @returns {DeployContractUDCResponse} parsed UDC event data
 */
declare function parseUDCEvent(txReceipt: InvokeTransactionReceiptResponse): DeployContractUDCResponse;

declare const index_getAbiEvents: typeof getAbiEvents;
declare const index_isAbiEvent: typeof isAbiEvent;
declare const index_parseEvents: typeof parseEvents;
declare const index_parseUDCEvent: typeof parseUDCEvent;
declare namespace index {
  export { index_getAbiEvents as getAbiEvents, index_isAbiEvent as isAbiEvent, index_parseEvents as parseEvents, index_parseUDCEvent as parseUDCEvent };
}

/**
 * Converts a Call object to an OutsideCall object that can be used for an Outside Execution.
 * @param {Call} call transaction to proceed.
 * @returns {OutsideCall} transaction formatted in conformity to SNIP-9
 * @example
 * ```typescript
 * const call1: Call = {
 *    contractAddress: '0x0123',
 *    entrypoint: 'transfer',
 *    calldata: { recipient: '0xabcd', amount: cairo.uint256(10) },
 *  };
 *  const result = outsideExecution.getOutsideCall(call1);
 *  // result = {
 *  //  to: '0x0123',
 *  //  selector: getSelectorFromName(call1.entrypoint),
 *  //  calldata: ['43981', '10', '0'],
 *  //}
 * ```
 */
declare function getOutsideCall(call: Call): OutsideCall;
/**
 * Build a TypedData message that will be used for an Outside execution.
 * @param {string} chainId  The encoded string of the name of network.
 * @param {OutsideExecutionOptions} options Parameters related to an Outside Execution.
 * @param {BigNumberish} nonce Outside execution nonce (not to confuse with normal transaction nonce).
 * @param {Call[]} myCalls transaction(s) to proceed.
 * @param {OutsideExecutionVersion} version SNIP-9 V1 or V2.
 * @returns {TypedData} SNIP-12 message conform to SNIP-9.
 * @example
 * ```typescript
 * const callOptions: OutsideExecutionOptions = {
 *    caller: '0x1234',
 *    execute_after: 100,
 *    execute_before: 200,
 *  };
 *  const result: TypedData = outsideExecution.getTypedData(
 *    constants.StarknetChainId.SN_SEPOLIA,
 *    callOptions,
 *    21,
 *    [call1],
 *    EOutsideExecutionVersion.V2
 *  );
 *  // result = {
 *  //  domain: {
 *  //    chainId: '0x534e5f5345504f4c4941',
 *  //    name: 'Account.execute_from_outside',
 *  //    revision: '1',
 *  //    version: '2',
 *  //  },
 *  //  message: {
 *  //    Caller: '0x1234',
 *  //  ...
 * ```
 */
declare function getTypedData(chainId: string, options: OutsideExecutionOptions, nonce: BigNumberish, myCalls: Call[], version: OutsideExecutionVersion): TypedData;
/**
 * Builds a Calldata for the execute_from_outside() entrypoint.
 * @param {OutsideTransaction} outsideTransaction an object that contains all the data for a Outside Execution.
 * @returns {Calldata} The Calldata related to this Outside transaction
 * @example
 * ```typescript
 * const outsideTransaction: OutsideTransaction = {
 *     outsideExecution: {
 *      caller: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
 *      nonce: '0x7d0b4b4fce4b236e63d2bb5fc321935d52935cd3b268248cf9cf29c496bd0ae',
 *      execute_after: 500, execute_before: 600,
 *      calls: [{ to: '0x678', selector: '0x890', calldata: [12, 13] }],
 *    },
 *    signature: ['0x123', '0x456'],
 *    signerAddress: '0x3b278ebae434f283f9340587a7f2dd4282658ac8e03cb9b0956db23a0a83657',
 *    version: EOutsideExecutionVersion.V2,
 *  };
 *
 *  const result: Calldata = outsideExecution.buildExecuteFromOutsideCallData(outsideTransaction);
 * // result =      ['2846891009026995430665703316224827616914889274105712248413538305735679628945',
 * //   '3534941323322368687588030484849371698982661160919690922146419787802417549486',
 * //   '500', '600', '1', '1656', '2192', '2', '12', '13', '2', '291', '1110']
 * ```
 */
declare function buildExecuteFromOutsideCallData(outsideTransaction: OutsideTransaction): Calldata;
/**
 * Builds a Call for execute(), estimateFee() and simulateTransaction() functions.
 * @param {AllowArray<OutsideTransaction>} outsideTransaction an object that contains all the data for an Outside Execution.
 * @returns {Call[]} The Call related to this Outside transaction
 * @example
 * ```typescript
 * const outsideTransaction: OutsideTransaction = {
 *     outsideExecution: {
 *      caller: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
 *      nonce: '0x7d0b4b4fce4b236e63d2bb5fc321935d52935cd3b268248cf9cf29c496bd0ae',
 *      execute_after: 500, execute_before: 600,
 *      calls: [{ to: '0x678', selector: '0x890', calldata: [12, 13] }],
 *    },
 *    signature: ['0x123', '0x456'],
 *    signerAddress: '0x3b278ebae434f283f9340587a7f2dd4282658ac8e03cb9b0956db23a0a83657',
 *    version: EOutsideExecutionVersion.V2,
 *  };
 *
 *  const result: Call[] = outsideExecution.buildExecuteFromOutsideCall(outsideTransaction);
 * // result = [{contractAddress: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
 * //   entrypoint: 'execute_from_outside_v2',
 * //   calldata: [ ... ],
 * // }]
 * ```
 */
declare function buildExecuteFromOutsideCall(outsideTransaction: AllowArray<OutsideTransaction>): Call[];

declare const outsideExecution_buildExecuteFromOutsideCall: typeof buildExecuteFromOutsideCall;
declare const outsideExecution_buildExecuteFromOutsideCallData: typeof buildExecuteFromOutsideCallData;
declare const outsideExecution_getOutsideCall: typeof getOutsideCall;
declare const outsideExecution_getTypedData: typeof getTypedData;
declare namespace outsideExecution {
  export { outsideExecution_buildExecuteFromOutsideCall as buildExecuteFromOutsideCall, outsideExecution_buildExecuteFromOutsideCallData as buildExecuteFromOutsideCallData, outsideExecution_getOutsideCall as getOutsideCall, outsideExecution_getTypedData as getTypedData };
}

/**
 * Implementation of ERC165 introspection.
 * Verify if a contract has implemented some standard functionalities.
 * @param {RpcProvider} provider the provider to access to Starknet.
 * @param {BigNumberish} contractAddress the address of the contract to check.
 * @param {BigNumberish} interfaceId the hash of the functionality to check.
 * @returns {boolean} true if the interfaceId is implemented in this contract.
 * @example
 * ```typescript
 * const snip9InterfaceV2Id = constants.SNIP9_V2_INTERFACE_ID;
 * const result = src5.supportsInterface(myProvider, accountContractAddress, snip9InterfaceV2Id);
 * // result = true
 * ```
 */
declare function supportsInterface(provider: RpcProvider, contractAddress: BigNumberish, interfaceId: BigNumberish): Promise<boolean>;

declare const src5_supportsInterface: typeof supportsInterface;
declare namespace src5 {
  export { src5_supportsInterface as supportsInterface };
}

type BatchClientOptions = {
    nodeUrl: string;
    headers: object;
    interval: number;
    baseFetch: NonNullable<RpcProviderOptions['baseFetch']>;
};
declare class BatchClient {
    nodeUrl: string;
    headers: object;
    interval: number;
    requestId: number;
    private pendingRequests;
    private batchPromises;
    private delayTimer?;
    private delayPromise?;
    private delayPromiseResolve?;
    private baseFetch;
    constructor(options: BatchClientOptions);
    private wait;
    private addPendingRequest;
    private sendBatch;
    /**
     * Automatically batches and fetches JSON-RPC calls in a single request.
     * @param method Method to call
     * @param params Method parameters
     * @param id JSON-RPC Request ID
     * @returns JSON-RPC Response
     */
    fetch<T extends keyof Methods$1, TResponse extends ResponseBody & {
        result?: Methods$1[T]['result'];
        error?: Error$1;
    }>(method: T, params?: Methods$1[T]['params'], id?: string | number): Promise<TResponse>;
}

/**
 * Singular class handling cairo u512 data type
 */

declare const UINT_512_MAX: bigint;
declare const UINT_512_MIN = 0n;
declare const UINT_128_MIN = 0n;
declare class CairoUint512 {
    limb0: bigint;
    limb1: bigint;
    limb2: bigint;
    limb3: bigint;
    static abiSelector: string;
    /**
     * Default constructor (Lib usage)
     * @param bigNumberish BigNumberish value representing u512
     */
    constructor(bigNumberish: BigNumberish);
    /**
     * Direct props initialization (Api response)
     */
    constructor(limb0: BigNumberish, limb1: BigNumberish, limb2: BigNumberish, limb3: BigNumberish);
    /**
     * Initialization from Uint512 object
     */
    constructor(uint512: Uint512);
    /**
     * Validate if BigNumberish can be represented as Uint512
     */
    static validate(bigNumberish: BigNumberish): bigint;
    /**
     * Validate if limbs can be represented as Uint512
     */
    static validateProps(limb0: BigNumberish, limb1: BigNumberish, limb2: BigNumberish, limb3: BigNumberish): {
        limb0: bigint;
        limb1: bigint;
        limb2: bigint;
        limb3: bigint;
    };
    /**
     * Check if BigNumberish can be represented as Uint512
     */
    static is(bigNumberish: BigNumberish): boolean;
    /**
     * Check if provided abi type is this data type
     */
    static isAbiType(abiType: string): boolean;
    /**
     * Return bigint representation
     */
    toBigInt(): bigint;
    /**
     * Return Uint512 structure with HexString props
     * limbx: HexString
     */
    toUint512HexString(): {
        limb0: string;
        limb1: string;
        limb2: string;
        limb3: string;
    };
    /**
     * Return Uint512 structure with DecimalString props
     * limbx DecString
     */
    toUint512DecimalString(): {
        limb0: string;
        limb1: string;
        limb2: string;
        limb3: string;
    };
    /**
     * Return api requests representation witch is felt array
     */
    toApiRequest(): string[];
}

declare class CairoFixedArray {
    /**
     * JS array representing a Cairo fixed array.
     */
    readonly content: any[];
    /**
     * Cairo fixed array type.
     */
    readonly arrayType: string;
    /**
     * Create an instance representing a Cairo fixed Array.
     * @param {any[]} content JS array representing a Cairo fixed array.
     * @param {string} arrayType Cairo fixed array type.
     */
    constructor(content: any[], arrayType: string);
    /**
     * Retrieves the array size from the given type string representing a Cairo fixed array.
     * @param {string} type - The Cairo fixed array type.
     * @returns {number} The array size.
     * @example
     * ```typescript
     * const result = CairoFixedArray.getFixedArraySize("[core::integer::u32; 8]");
     * // result = 8
     * ```
     */
    static getFixedArraySize(type: string): number;
    /**
     * Retrieves the Cairo fixed array size from the CairoFixedArray instance.
     * @returns {number} The fixed array size.
     * @example
     * ```typescript
     * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]");
     * const result = fArray.getFixedArraySize();
     * // result = 3
     * ```
     */
    getFixedArraySize(): number;
    /**
     * Retrieve the Cairo content type from a Cairo fixed array type.
     * @param {string} type - The type string.
     * @returns {string} The fixed-array type.
     * @example
     * ```typescript
     * const result = CairoFixedArray.getFixedArrayType("[core::integer::u32; 8]");
     * // result = "core::integer::u32"
     * ```
     */
    static getFixedArrayType: (type: string) => string;
    /**
     * Retrieve the Cairo content type of the Cairo fixed array.
     * @returns {string} The fixed-array content type.
     * @example
     * ```typescript
     * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]");
     * const result = fArray.getFixedArrayType();
     * // result = "core::integer::u32"
     * ```
     */
    getFixedArrayType(): string;
    /**
     * Create an object from a Cairo fixed array.
     * Be sure to have an array length conform to the ABI.
     * To be used with CallData.compile().
     * @param {Array<any>} input JS array representing a Cairo fixed array.
     * @returns {Object} a specific struct representing a fixed Array.
     * @example
     * ```typescript
     * const result = CairoFixedArray.compile([10,20,30]);
     * // result = { '0': 10, '1': 20, '2': 30 }
     * ```
     */
    static compile(input: Array<any>): Object;
    /**
     * Generate an object from the Cairo fixed array instance.
     * To be used with CallData.compile().
     * @returns a specific struct representing a fixed array.
     * @example
     * ```typescript
     * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]");
     * const result = fArray.compile();
     * // result = { '0': 10, '1': 20, '2': 30 }
     * ```
     */
    compile(): Object;
    /**
     * Checks if the given Cairo type is a fixed-array type.
     *
     * @param {string} type - The type to check.
     * @returns - `true` if the type is a fixed array type, `false` otherwise.
     * ```typescript
     * const result = CairoFixedArray.isTypeFixedArray("[core::integer::u32; 8]");
     * // result = true
     */
    static isTypeFixedArray(type: string): boolean;
}

/**
 * Format a hex number to '0x' and 64 characters, adding leading zeros if necessary.
 *
 * @param {BigNumberish} address
 * @returns {string} Hex string : 0x followed by 64 characters. No upper case characters in the response.
 * @example
 * ```typescript
 * const address = "0x90591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf";
 * const result = addAddressPadding(address);
 * // result = "0x0000090591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf"
 * ```
 */
declare function addAddressPadding(address: BigNumberish): string;
/**
 * Check the validity of a Starknet address, and format it as a hex number : '0x' and 64 characters, adding leading zeros if necessary.
 *
 * @param {BigNumberish} address
 * @returns {string} Hex string : 0x followed by 64 characters. No upper case characters in the response.
 * @throws address argument must be a valid address inside the address range bound
 * @example
 * ```typescript
 * const address = "0x90591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf";
 * const result = validateAndParseAddress(address);
 * // result = "0x0000090591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf"
 * ```
 */
declare function validateAndParseAddress(address: BigNumberish): string;
/**
 * Convert an address to her checksum representation which uses a specific pattern of uppercase and lowercase letters within
 * a given address to reduce the risk of errors introduced from typing an address or cut and paste issues.
 * @param {BigNumberish} address
 * @returns {string} Hex string : 0x followed by 64 characters. Mix of uppercase and lowercase
 * @example
 * ```typescript
 * const address = "0x90591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf";
 * const result = getChecksumAddress(address);
 * // result = "0x0000090591D9fA3EfC87067d95a643f8455E0b8190eb8Cb7bFd39e4fb7571fDF"
 * ```
 */
declare function getChecksumAddress(address: BigNumberish): string;
/**
 * If the casing of an address is mixed, it is a Checksum Address, which uses a specific pattern of uppercase and lowercase letters within
 * a given address to reduce the risk of errors introduced from typing an address or cut and paste issues.
 *
 * @param address string
 * @returns true if the ChecksumAddress is valid
 * @example
 * ```typescript
 * const address = "0x0000090591D9fA3EfC87067d95a643f8455E0b8190eb8Cb7bFd39e4fb7571fDF";
 * const result = validateChecksumAddress(address);
 * // result = true
 * ```
 */
declare function validateChecksumAddress(address: string): boolean;

declare abstract class AbiParserInterface {
    /**
     * Helper to calculate inputs length from abi
     * @param abiMethod FunctionAbi
     * @return number
     */
    abstract methodInputsLength(abiMethod: FunctionAbi): number;
    /**
     *
     * @param name string
     * @return FunctionAbi | undefined
     */
    abstract getMethod(name: string): FunctionAbi | undefined;
    /**
     * Return Abi in legacy format
     * @return Abi
     */
    abstract getLegacyFormat(): Abi;
}

/**
 * Checks if the given name ends with "_len".
 *
 * @param {string} name - The name to be checked.
 * @returns - True if the name ends with "_len", false otherwise.
 */
declare const isLen: (name: string) => boolean;
/**
 * Checks if a given type is felt.
 *
 * @param {string} type - The type to check.
 * @returns - True if the type is felt, false otherwise.
 */
declare const isTypeFelt: (type: string) => type is "felt" | "core::felt252";
/**
 * Checks if the given type is an array type.
 *
 * @param {string} type - The type to check.
 * @returns - `true` if the type is an array type, `false` otherwise.
 */
declare const isTypeArray: (type: string) => boolean;
/**
 * Checks if the given type is a tuple type.
 *
 * @param {string} type - The type to be checked.
 * @returns - `true` if the type is a tuple type, otherwise `false`.
 */
declare const isTypeTuple: (type: string) => boolean;
/**
 * Checks whether a given type is a named tuple.
 *
 * @param {string} type - The type to be checked.
 * @returns - True if the type is a named tuple, false otherwise.
 */
declare const isTypeNamedTuple: (type: string) => boolean;
/**
 * Checks if a given type is a struct.
 *
 * @param {string} type - The type to check for existence.
 * @param {AbiStructs} structs - The collection of structs to search in.
 * @returns - True if the type exists in the structs, false otherwise.
 */
declare const isTypeStruct: (type: string, structs: AbiStructs) => boolean;
/**
 * Checks if a given type is an enum.
 *
 * @param {string} type - The type to check.
 * @param {AbiEnums} enums - The enumeration to search in.
 * @returns - True if the type exists in the enumeration, otherwise false.
 */
declare const isTypeEnum: (type: string, enums: AbiEnums) => boolean;
/**
 * Determines if the given type is an Option type.
 *
 * @param {string} type - The type to check.
 * @returns - True if the type is an Option type, false otherwise.
 */
declare const isTypeOption: (type: string) => boolean;
/**
 * Checks whether a given type starts with 'core::result::Result::'.
 *
 * @param {string} type - The type to check.
 * @returns - True if the type starts with 'core::result::Result::', false otherwise.
 */
declare const isTypeResult: (type: string) => boolean;
/**
 * Checks if the given value is a valid Uint type.
 *
 * @param {string} type - The value to check.
 * @returns - Returns true if the value is a valid Uint type, otherwise false.
 */
declare const isTypeUint: (type: string) => boolean;
/**
 * Checks if the given type is `uint256`.
 *
 * @param {string} type - The type to be checked.
 * @returns - Returns true if the type is `uint256`, otherwise false.
 */
declare const isTypeUint256: (type: string) => boolean;
/**
 * Checks if the given type is a literal type.
 *
 * @param {string} type - The type to check.
 * @returns - True if the type is a literal type, false otherwise.
 */
declare const isTypeLiteral: (type: string) => boolean;
/**
 * Checks if the given type is a boolean type.
 *
 * @param {string} type - The type to be checked.
 * @returns - Returns true if the type is a boolean type, otherwise false.
 */
declare const isTypeBool: (type: string) => type is "core::bool";
/**
 * Checks if the provided type is equal to 'core::starknet::contract_address::ContractAddress'.
 * @param {string} type - The type to be checked.
 * @returns - true if the type matches 'core::starknet::contract_address::ContractAddress', false otherwise.
 */
declare const isTypeContractAddress: (type: string) => type is "core::starknet::contract_address::ContractAddress";
/**
 * Determines if the given type is an Ethereum address type.
 *
 * @param {string} type - The type to check.
 * @returns - Returns true if the given type is 'core::starknet::eth_address::EthAddress', otherwise false.
 */
declare const isTypeEthAddress: (type: string) => type is "core::starknet::eth_address::EthAddress";
/**
 * Checks if the given type is 'core::bytes_31::bytes31'.
 *
 * @param {string} type - The type to check.
 * @returns - True if the type is 'core::bytes_31::bytes31', false otherwise.
 */
declare const isTypeBytes31: (type: string) => type is "core::bytes_31::bytes31";
/**
 * Checks if the given type is equal to the 'core::byte_array::ByteArray'.
 *
 * @param {string} type - The type to check.
 * @returns - True if the given type is equal to 'core::byte_array::ByteArray', false otherwise.
 */
declare const isTypeByteArray: (type: string) => type is "core::byte_array::ByteArray";
/**
 * Checks if the given type is equal to the u96 type
 *
 * @param {string} type - The type to check.
 * @returns - True if the given type is equal to u96, false otherwise.
 */
declare const isTypeU96: (type: string) => type is "core::internal::bounded_int::BoundedInt::<0, 79228162514264337593543950335>";
declare const isTypeSecp256k1Point: (type: string) => type is "core::starknet::secp256k1::Secp256k1Point";
declare const isCairo1Type: (type: string) => boolean;
/**
 * Retrieves the array type from the given type string.
 *
 * Works also for core::zeroable::NonZero type.
 * @param {string} type - The type string.
 * @returns - The array type.
 */
declare const getArrayType: (type: string) => string;
/**
 * Test if an ABI comes from a Cairo 1 contract
 * @param abi representing the interface of a Cairo contract
 * @returns TRUE if it is an ABI from a Cairo1 contract
 * @example
 * ```typescript
 * const isCairo1: boolean = isCairo1Abi(myAbi: Abi);
 * ```
 */
declare function isCairo1Abi(abi: Abi): boolean;
/**
 * Checks if the given type is a NonZero type.
 *
 * @param {string} type The type to check.
 * @returns `true` if the type is NonZero type, `false` otherwise.
 * @example
 * ```typescript
 * const result = cairo.isTypeNonZero("core::zeroable::NonZero::<u8>");
 * //result = true
 * ```
 */
declare function isTypeNonZero(type: string): boolean;
/**
 * Return ContractVersion (Abi version) based on Abi
 * or undefined for unknown version
 * @param abi
 * @returns string
 */
declare function getAbiContractVersion(abi: Abi): ContractVersion;
/**
 * named tuple cairo type is described as js object {}
 * struct cairo type are described as js object {}
 * array cairo type are described as js array []
 */
/**
 * Create Uint256 Cairo type (helper for common struct type)
 * @example
 * ```typescript
 * uint256('892349863487563453485768723498');
 * ```
 */
declare const uint256: (it: BigNumberish) => Uint256;
/**
 * Create Uint512 Cairo type (helper for common struct type)
 * @param it BigNumberish representation of a 512 bits unsigned number
 * @returns Uint512 struct
 * @example
 * ```typescript
 * uint512('345745685892349863487563453485768723498');
 * ```
 */
declare const uint512: (it: BigNumberish) => Uint512;
/**
 * Create unnamed tuple Cairo type (helper same as common struct type)
 * @example
 * ```typescript
 * tuple(1, '0x101', 16);
 * ```
 */
declare const tuple: (...args: (BigNumberish | object | boolean)[]) => Record<number, BigNumberish | object | boolean>;
/**
 * Create felt Cairo type (cairo type helper)
 * @returns format: felt-string
 */
declare function felt(it: BigNumberish): string;

declare const cairo_felt: typeof felt;
declare const cairo_getAbiContractVersion: typeof getAbiContractVersion;
declare const cairo_getArrayType: typeof getArrayType;
declare const cairo_isCairo1Abi: typeof isCairo1Abi;
declare const cairo_isCairo1Type: typeof isCairo1Type;
declare const cairo_isLen: typeof isLen;
declare const cairo_isTypeArray: typeof isTypeArray;
declare const cairo_isTypeBool: typeof isTypeBool;
declare const cairo_isTypeByteArray: typeof isTypeByteArray;
declare const cairo_isTypeBytes31: typeof isTypeBytes31;
declare const cairo_isTypeContractAddress: typeof isTypeContractAddress;
declare const cairo_isTypeEnum: typeof isTypeEnum;
declare const cairo_isTypeEthAddress: typeof isTypeEthAddress;
declare const cairo_isTypeFelt: typeof isTypeFelt;
declare const cairo_isTypeLiteral: typeof isTypeLiteral;
declare const cairo_isTypeNamedTuple: typeof isTypeNamedTuple;
declare const cairo_isTypeNonZero: typeof isTypeNonZero;
declare const cairo_isTypeOption: typeof isTypeOption;
declare const cairo_isTypeResult: typeof isTypeResult;
declare const cairo_isTypeSecp256k1Point: typeof isTypeSecp256k1Point;
declare const cairo_isTypeStruct: typeof isTypeStruct;
declare const cairo_isTypeTuple: typeof isTypeTuple;
declare const cairo_isTypeU96: typeof isTypeU96;
declare const cairo_isTypeUint: typeof isTypeUint;
declare const cairo_isTypeUint256: typeof isTypeUint256;
declare const cairo_tuple: typeof tuple;
declare const cairo_uint256: typeof uint256;
declare const cairo_uint512: typeof uint512;
declare namespace cairo {
  export { cairo_felt as felt, cairo_getAbiContractVersion as getAbiContractVersion, cairo_getArrayType as getArrayType, cairo_isCairo1Abi as isCairo1Abi, cairo_isCairo1Type as isCairo1Type, cairo_isLen as isLen, cairo_isTypeArray as isTypeArray, cairo_isTypeBool as isTypeBool, cairo_isTypeByteArray as isTypeByteArray, cairo_isTypeBytes31 as isTypeBytes31, cairo_isTypeContractAddress as isTypeContractAddress, cairo_isTypeEnum as isTypeEnum, cairo_isTypeEthAddress as isTypeEthAddress, cairo_isTypeFelt as isTypeFelt, cairo_isTypeLiteral as isTypeLiteral, cairo_isTypeNamedTuple as isTypeNamedTuple, cairo_isTypeNonZero as isTypeNonZero, cairo_isTypeOption as isTypeOption, cairo_isTypeResult as isTypeResult, cairo_isTypeSecp256k1Point as isTypeSecp256k1Point, cairo_isTypeStruct as isTypeStruct, cairo_isTypeTuple as isTypeTuple, cairo_isTypeU96 as isTypeU96, cairo_isTypeUint as isTypeUint, cairo_isTypeUint256 as isTypeUint256, cairo_tuple as tuple, cairo_uint256 as uint256, cairo_uint512 as uint512 };
}

/**
 * convert a Cairo ByteArray to a JS string
 * @param myByteArray Cairo representation of a LongString
 * @returns a JS string
 * @example
 * ```typescript
 * const myByteArray = {
 *    data: [],
 *    pending_word: '0x414243444546474849',
 *    pending_word_len: 9
 * }
 * const result: String = stringFromByteArray(myByteArray); // ABCDEFGHI
 * ```
 */
declare function stringFromByteArray(myByteArray: ByteArray): string;
/**
 * convert a JS string to a Cairo ByteArray
 * @param targetString a JS string
 * @returns Cairo representation of a LongString
 * @example
 * ```typescript
 * const myByteArray: ByteArray = byteArrayFromString("ABCDEFGHI");
 * ```
 * Result is :
 * {
 *    data: [],
 *    pending_word: '0x414243444546474849',
 *    pending_word_len: 9
 * }
 */
declare function byteArrayFromString(targetString: string): ByteArray;

declare const byteArray_byteArrayFromString: typeof byteArrayFromString;
declare const byteArray_stringFromByteArray: typeof stringFromByteArray;
declare namespace byteArray {
  export { byteArray_byteArrayFromString as byteArrayFromString, byteArray_stringFromByteArray as stringFromByteArray };
}

/**
 * Parse one field of the calldata by using input field from the abi for that method
 *
 * @param argsIterator - Iterator for value of the field
 * @param input  - input(field) information from the abi that will be used to parse the data
 * @param structs - structs from abi
 * @param enums - enums from abi
 * @return {string | string[]} - parsed arguments in format that contract is expecting
 *
 * @example
 * const abiEntry = { name: 'test', type: 'struct' };
 * const abiStructs: AbiStructs = {
 *  struct: {
 *    members: [
 *        {
 *          name: 'test_name',
 *          type: 'test_type',
 *          offset: 1,
 *        },
 *    ],
 *    size: 2,
 *    name: 'cairo__struct',
 *    type: 'struct',
 *   },
 * };
 *
 * const abiEnums: AbiEnums = {
 *   enum: {
 *     variants: [
 *       {
 *         name: 'test_name',
 *         type: 'cairo_struct_variant',
 *         offset: 1,
 *       },
 *     ],
 *     size: 2,
 *     name: 'test_cairo',
 *     type: 'enum',
 *   },
 * };
 *
 * const args = [{ test_name: 'test' }];
 * const argsIterator = args[Symbol.iterator]();
 * const parsedField = parseCalldataField(
 *   argsIterator,
 *   abiEntry,
 *   abiStructs,
 *   abiEnums
 * );
 * // parsedField === ['1952805748']
 */
declare function parseCalldataField(argsIterator: Iterator<any>, input: AbiEntry, structs: AbiStructs, enums: AbiEnums): string | string[];

declare class CallData {
    abi: Abi;
    parser: AbiParserInterface;
    protected readonly structs: AbiStructs;
    protected readonly enums: AbiEnums;
    constructor(abi: Abi);
    /**
     * Validate arguments passed to the method as corresponding to the ones in the abi
     * @param type ValidateType - type of the method
     * @param method string - name of the method
     * @param args ArgsOrCalldata - arguments that are passed to the method
     */
    validate(type: ValidateType, method: string, args?: ArgsOrCalldata): void;
    /**
     * Compile contract callData with abi
     * Parse the calldata by using input fields from the abi for that method
     * @param method string - method name
     * @param argsCalldata RawArgs - arguments passed to the method. Can be an array of arguments (in the order of abi definition), or an object constructed in conformity with abi (in this case, the parameter can be in a wrong order).
     * @return Calldata - parsed arguments in format that contract is expecting
     * @example
     * ```typescript
     * const calldata = myCallData.compile("constructor", ["0x34a", [1, 3n]]);
     * ```
     * ```typescript
     * const calldata2 = myCallData.compile("constructor", {list:[1, 3n], balance:"0x34"}); // wrong order is valid
     * ```
     */
    compile(method: string, argsCalldata: RawArgs): Calldata;
    /**
     * Compile contract callData without abi
     * @param rawArgs RawArgs representing cairo method arguments or string array of compiled data
     * @returns Calldata
     */
    static compile(rawArgs: RawArgs): Calldata;
    /**
     * Parse elements of the response array and structuring them into response object
     * @param method string - method name
     * @param response string[] - response from the method
     * @return Result - parsed response corresponding to the abi
     */
    parse(method: string, response: string[]): Result;
    /**
     * Format cairo method response data to native js values based on provided format schema
     * @param method string - cairo method name
     * @param response string[] - cairo method response
     * @param format object - formatter object schema
     * @returns Result - parsed and formatted response object
     */
    format(method: string, response: string[], format: object): Result;
    /**
     * Helper to extract structs from abi
     * @param abi Abi
     * @returns AbiStructs - structs from abi
     */
    static getAbiStruct(abi: Abi): AbiStructs;
    /**
     * Helper to extract enums from abi
     * @param abi Abi
     * @returns AbiEnums - enums from abi
     */
    static getAbiEnum(abi: Abi): AbiEnums;
    /**
     * Helper: Compile HexCalldata | RawCalldata | RawArgs
     * @param rawCalldata HexCalldata | RawCalldata | RawArgs
     * @returns Calldata
     */
    static toCalldata(rawCalldata?: RawArgs): Calldata;
    /**
     * Helper: Convert raw to HexCalldata
     * @param raw HexCalldata | RawCalldata | RawArgs
     * @returns HexCalldata
     */
    static toHex(raw?: RawArgs): HexCalldata;
    /**
     * Parse the elements of a contract response and structure them into one or several Result.
     * In Cairo 0, arrays are not supported.
     * @param typeCairo string or string[] - Cairo type name, ex : "hello::hello::UserData"
     * @param response string[] - serialized data corresponding to typeCairo.
     * @return Result or Result[] - parsed response corresponding to typeData.
     * @example
     * const res2=helloCallData.decodeParameters("hello::hello::UserData",["0x123456","0x1"]);
     * result = { address: 1193046n, is_claimed: true }
     */
    decodeParameters(typeCairo: AllowArray<string>, response: string[]): AllowArray<Result>;
}

/**
 * Checks if a given contract is in Sierra (Safe Intermediate Representation) format.
 *
 * @param {CairoContract | string} contract - The contract to check. Can be either a CairoContract object or a string representation of the contract.
 * @return {boolean} - Returns true if the contract is a Sierra contract, otherwise false.
 * @example
 * ```typescript
 * const result = isSierra(contract);
 * // result = true | false
 * ```
 */
declare function isSierra(contract: CairoContract | string): contract is SierraContractClass | CompiledSierra;
/**
 * Extracts contract hashes from `DeclareContractPayload`.
 *
 * @param {DeclareContractPayload} payload - The payload containing contract information.
 * @return {CompleteDeclareContractPayload} - The `CompleteDeclareContractPayload` with extracted contract hashes.
 * @throws {Error} - If extraction of compiledClassHash or classHash fails.
 * @example
 * ```typescript
 * const result = extractContractHashes(contract);
 * // result = {
 * //   contract: ...,
 * //   classHash: ...,
 * //   casm: ...,
 * //   compiledClassHash: ...,
 * // }
 * ```
 */
declare function extractContractHashes(payload: DeclareContractPayload): CompleteDeclareContractPayload;
/**
 * Helper to redeclare response Cairo0 contract
 */
declare function contractClassResponseToLegacyCompiledContract(ccr: ContractClassResponse): LegacyCompiledContract;

/**
 * Convert strk to fri or fri to strk
 * @example
 * ```typescript
 * units(1000n, 'fri') // '0.000000000000001' strk
 * units('1', 'strk') // '1000000000000000000' fri
 * ```
 */
declare function units(amount: string | bigint, simbol?: 'fri' | 'strk'): string;

/**
 * Request Permission for wallet account, return addresses that are allowed by user
 * @param {boolean} [silent_mode=false] false: request user interaction allowance. true: return only pre-allowed
 * @returns allowed accounts addresses
 */
declare function requestAccounts(swo: StarknetWindowObject, silent_mode?: boolean): Promise<Address[]>;
/**
 * Request Permission for wallet account
 * @returns allowed accounts addresses
 */
declare function getPermissions(swo: StarknetWindowObject): Promise<Permission[]>;
/**
 * Request adding ERC20 Token to Wallet List
 * @param asset WatchAssetParameters
 * @returns boolean
 */
declare function watchAsset(swo: StarknetWindowObject, asset: WatchAssetParameters): Promise<boolean>;
/**
 * Request adding custom Starknet chain
 * @param chain AddStarknetChainParameters
 * @returns boolean
 */
declare function addStarknetChain(swo: StarknetWindowObject, chain: AddStarknetChainParameters): Promise<boolean>;
/**
 * Request Wallet Network change
 * @param chainId StarknetChainId
 * @returns boolean
 */
declare function switchStarknetChain(swo: StarknetWindowObject, chainId: ChainId$1): Promise<boolean>;
/**
 * Request the current chain ID from the wallet.
 * @returns The current Starknet chain ID.
 */
declare function requestChainId(swo: StarknetWindowObject): Promise<ChainId$1>;
/**
 * Get deployment data for a contract.
 * @returns The deployment data result.
 */
declare function deploymentData(swo: StarknetWindowObject): Promise<AccountDeploymentData>;
/**
 * Add an invoke transaction to the wallet.
 * @param params The parameters required for the invoke transaction.
 * @returns The result of adding the invoke transaction.
 */
declare function addInvokeTransaction(swo: StarknetWindowObject, params: AddInvokeTransactionParameters): Promise<AddInvokeTransactionResult>;
/**
 * Add a declare transaction to the wallet.
 * @param params The parameters required for the declare transaction.
 * @returns The result of adding the declare transaction.
 */
declare function addDeclareTransaction(swo: StarknetWindowObject, params: AddDeclareTransactionParameters): Promise<AddDeclareTransactionResult>;
/**
 * Sign typed data using the wallet.
 * @param swo the starknet (wallet) window object to request the signature.
 * @param typedData The typed data to sign.
 * @returns An array of signatures as strings.
 */
declare function signMessage(swo: StarknetWindowObject, typedData: TypedData): Promise<Signature$1>;
/**
 * Get the list of supported specifications.
 * @returns An array of supported specification strings.
 */
declare function supportedSpecs(swo: StarknetWindowObject): Promise<SpecVersion[]>;
/**
 * Attaches an event handler function to the "accountsChanged" event of a StarknetWindowObject.
 * When the accounts are changed, the specified callback function will be called.
 *
 * @param {StarknetWindowObject} swo - The StarknetWindowObject to attach the event handler to.
 * @param {AccountChangeEventHandler} callback - The function to be called when the accounts are changed.
 *                                              It will receive the changed accounts as a parameter.
 * @returns {void}
 */
declare function onAccountChange(swo: StarknetWindowObject, callback: AccountChangeEventHandler): void;
/**
 * Register a callback function to be called when the network is changed.
 *
 * @param {StarknetWindowObject} swo - The StarknetWindowObject instance.
 * @param {NetworkChangeEventHandler} callback - The callback function to be called when the network is changed.
 * @return {void}
 */
declare function onNetworkChanged(swo: StarknetWindowObject, callback: NetworkChangeEventHandler): void;

declare const connect_addDeclareTransaction: typeof addDeclareTransaction;
declare const connect_addInvokeTransaction: typeof addInvokeTransaction;
declare const connect_addStarknetChain: typeof addStarknetChain;
declare const connect_deploymentData: typeof deploymentData;
declare const connect_getPermissions: typeof getPermissions;
declare const connect_onAccountChange: typeof onAccountChange;
declare const connect_onNetworkChanged: typeof onNetworkChanged;
declare const connect_requestAccounts: typeof requestAccounts;
declare const connect_requestChainId: typeof requestChainId;
declare const connect_signMessage: typeof signMessage;
declare const connect_supportedSpecs: typeof supportedSpecs;
declare const connect_switchStarknetChain: typeof switchStarknetChain;
declare const connect_watchAsset: typeof watchAsset;
declare namespace connect {
  export { connect_addDeclareTransaction as addDeclareTransaction, connect_addInvokeTransaction as addInvokeTransaction, connect_addStarknetChain as addStarknetChain, connect_deploymentData as deploymentData, connect_getPermissions as getPermissions, connect_onAccountChange as onAccountChange, connect_onNetworkChanged as onNetworkChanged, connect_requestAccounts as requestAccounts, connect_requestChainId as requestChainId, connect_signMessage as signMessage, connect_supportedSpecs as supportedSpecs, connect_switchStarknetChain as switchStarknetChain, connect_watchAsset as watchAsset };
}

type DefaultConfig = typeof DEFAULT_GLOBAL_CONFIG;
type CustomConfig = {
    [key: string]: any;
};
type ConfigData = DefaultConfig & CustomConfig;
declare class Configuration {
    private static instance;
    private config;
    private constructor();
    private initialize;
    static getInstance(): Configuration;
    get<K extends keyof DefaultConfig>(key: K): DefaultConfig[K];
    get(key: string, defaultValue?: any): any;
    set<K extends keyof DefaultConfig>(key: K, value: DefaultConfig[K]): void;
    set(key: string, value: any): void;
    update(configData: Partial<DefaultConfig> & CustomConfig): void;
    getAll(): ConfigData;
    reset(): void;
    delete<K extends keyof DefaultConfig>(key: K): void;
    delete(key: string): void;
    hasKey<K extends keyof DefaultConfig>(key: K): boolean;
    hasKey(key: string): boolean;
}
declare const config: Configuration;

/**
 * Logging class providing different levels of log
 */
declare class Logger {
    private static instance;
    private config;
    private constructor();
    static getInstance(): Logger;
    private getTimestamp;
    private shouldLog;
    private formatMessage;
    private log;
    /**
     * debug will be displayed when LogLevel level is set to DEBUG(5)
     */
    debug(message: string, data?: any): void;
    /**
     * info will be displayed when LogLevel level is set to DEBUG(5), INFO(4)
     */
    info(message: string, data?: any): void;
    /**
     * warn will be displayed when LogLevel level is set to DEBUG(5), INFO(4), WARN(3)
     */
    warn(message: string, data?: any): void;
    /**
     * error will be displayed when LogLevel level is set to DEBUG(5), INFO(4), WARN(3), ERROR(2)
     */
    error(message: string, data?: any): void;
    /**
     * fatal will be displayed when LogLevel level is set to DEBUG(5), INFO(4), WARN(3), ERROR(2), FATAL(1)
     */
    fatal(message: string, data?: any): void;
    /**
     * Set the logging level you would like system to display
     * * 5 DEBUG  - show all logs
     * * 4 INFO
     * * 3 WARN
     * * 2 ERROR
     * * 1 FATAL
     * * 0 OFF    - disable logs
     */
    setLogLevel(level: LogLevel): void;
    getLogLevel(): LogLevel;
    /**
     *
     * @returns logs levels displayed on the configured LogLevel
     */
    getEnabledLogLevels(): string[];
}
/**
 * Logger instance, use for the system logging.
 * Higher the logger level index, higher the LogLevel required to display log.
 * Default should be INFO
 *
 * DEBUG: 5,
 * INFO: 4,
 * WARN: 3,
 * ERROR: 2,
 * FATAL: 1,
 */
declare const logger: Logger;

/**
 * Main
 */

/** @deprecated prefer the 'num' naming */
declare const number: typeof num;

export { type Abi, type AbiEntry, type AbiEnum, type AbiEnums, type AbiEvent, type AbiEvents, type AbiInterfaces, type AbiStruct, type AbiStructs, Account, AccountInterface, type AccountInvocationItem, type AccountInvocations, type AccountInvocationsFactoryDetails, type AllowArray, type Args, type ArgsOrCalldata, type ArgsOrCalldataWithOptions, type ArraySignatureType, type AsyncContractFunction, BatchClient, type BatchClientOptions, type BigNumberish, type Block$1 as Block, type BlockIdentifier, type BlockNumber, BlockStatus, BlockTag, type BlockWithTxHashes, type Builtins, type ByteArray, type ByteCode, type CairoAssembly, type CairoContract, CairoCustomEnum, type CairoEnum, type CairoEnumRaw, type CairoEvent, type CairoEventDefinition, type CairoEventVariant, CairoFixedArray, CairoOption, CairoOptionVariant, CairoResult, CairoResultVariant, CairoUint256, CairoUint512, type CairoVersion, type Call, type CallContractResponse, CallData, type CallDetails, type CallOptions, type CallStruct, type Calldata, type CompiledContract, type CompiledSierra, type CompiledSierraCasm, type CompilerVersion, type CompleteDeclareContractPayload, type CompressedProgram, Contract, type ContractClass, type ContractClassIdentifier, type ContractClassPayload, type ContractClassResponse, type ContractEntryPointFields, ContractFactory, type ContractFactoryParams, type ContractFunction, ContractInterface, type ContractOptions, type ContractVersion, CustomError, type DeclareAndDeployContractPayload, type DeclareContractPayload, type DeclareContractResponse, type DeclareContractTransaction, type DeclareDeployUDCResponse, type DeclareSignerDetails, type DeclareTransactionReceiptResponse, type DeployAccountContractPayload, type DeployAccountContractTransaction, type DeployAccountSignerDetails, type DeployAccountTransactionReceiptResponse, type DeployContractResponse, type DeployContractUDCResponse, type DeployTransactionReceiptResponse, type Details, ETH_ADDRESS, EntryPointType, type EntryPointsByType, type EstimateFee, type EstimateFeeAction, type EstimateFeeBulk, type EstimateFeeDetails, type EstimateFeeResponse, type EstimateFeeResponseBulk, EthSigner, type EventEntry, type FeeEstimate, type FunctionAbi, type GetBlockResponse, type GetTransactionReceiptResponse, type GetTransactionResponse, type GetTxReceiptResponseWithoutHelper, type HexCalldata, type InterfaceAbi, type Invocation, type Invocations, type InvocationsDetails, type InvocationsDetailsWithNonce, type InvocationsSignerDetails, type InvokeFunctionResponse, type InvokeOptions, type InvokeTransactionReceiptResponse, type L1HandlerTransactionReceiptResponse, type LedgerPathCalculation, LedgerSigner111 as LedgerSigner, LedgerSigner111, LedgerSigner221, type LegacyCompiledContract, type LegacyContractClass, type LegacyEvent, LibraryError, Literal, type LogLevel, LogLevelIndex, type MessageToL1, type MultiDeployContractResponse, type MultiType, NON_ZERO_PREFIX, type Nonce, type OptionalPayload, type OutsideCall, type OutsideExecution, type OutsideExecutionOptions, OutsideExecutionTypesV1, OutsideExecutionTypesV2, OutsideExecutionVersion, type OutsideTransaction, type ParsedEvent, type ParsedEvents, type ParsedStruct, type PendingBlock, type PendingStateUpdate, type Program, RpcProvider as Provider, ProviderInterface, type ProviderOptions, type PythonicHints, index$3 as RPC, rpc_0_6 as RPC06, rpc_0_7 as RPC07, RPCResponseParser, type RPC_ERROR, type RPC_ERROR_SET, type RawArgs, type RawArgsArray, type RawArgsObject, type RawCalldata, ReceiptTx, type RejectedTransactionReceiptResponse, ResponseParser, type Result, type RevertedTransactionReceiptResponse, RpcChannel, RpcError, RpcProvider, type RpcProviderOptions, type SIMULATION_FLAG, type SierraContractClass, type SierraContractEntryPointFields, type SierraEntryPointsByType, type SierraProgramDebugInfo, type Signature, Signer, SignerInterface, type SimulateTransactionDetails, type SimulateTransactionResponse, type SimulatedTransaction, type SimulationFlags, type StarkProfile, type StateUpdate, type StateUpdateResponse, type Storage, type SuccessfulTransactionReceiptResponse, TransactionExecutionStatus, TransactionFinalityStatus, type TransactionReceipt, type TransactionReceiptCallbacks, type TransactionReceiptCallbacksDefault, type TransactionReceiptCallbacksDefined, type TransactionReceiptStatus, type TransactionReceiptUtilityInterface, type TransactionReceiptValue, TransactionStatus, type TransactionStatusReceiptSets, TransactionType, type Tupled, type TypedContractV2, UINT_128_MAX, UINT_128_MIN, UINT_256_HIGH_MAX, UINT_256_HIGH_MIN, UINT_256_LOW_MAX, UINT_256_LOW_MIN, UINT_256_MAX, UINT_256_MIN, UINT_512_MAX, UINT_512_MIN, Uint, type Uint256, type Uint512, type UniversalDeployerContractPayload, type UniversalDetails, type UniversalSuggestedFee, type V2DeclareSignerDetails, type V2DeployAccountSignerDetails, type V2InvocationsSignerDetails, type V3DeclareSignerDetails, type V3DeployAccountSignerDetails, type V3InvocationsSignerDetails, type V3TransactionDetails, ValidateType, WalletAccount, type WeierstrassSignatureType, addAddressPadding, byteArray, cairo, config, constants, contractClassResponseToLegacyCompiledContract, defaultProvider, ec, encode, eth, index as events, extractContractHashes, fixProto, fixStack, getCalldata, getChecksumAddress, type getContractVersionOptions, type getEstimateFeeBulkOptions, getLedgerPathBuffer111 as getLedgerPathBuffer, getLedgerPathBuffer111, getLedgerPathBuffer221, type getSimulateTransactionOptions, index$1 as hash, isSierra, json, logger, merkle, num, number, outsideExecution, parseCalldataField, provider, selector, shortString, splitArgsAndOptions, src5, stark, starknetId, transaction, typedData, index$2 as types, uint256$1 as uint256, units, v2 as v2hash, v3 as v3hash, validateAndParseAddress, validateChecksumAddress, type waitForTransactionOptions, connect as wallet };
