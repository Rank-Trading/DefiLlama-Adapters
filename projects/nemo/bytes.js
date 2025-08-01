const hexToBytes = (hex) => Array.from(Buffer.from(hex.replace(/^0x/, ""), 'hex'));

const textToBytes = (value) => new TextEncoder().encode(value);

const toU64 = (value) => toLittleEndian(BigInt(value), 8);

const toU128 = (value) => toLittleEndian(BigInt(value), 16);

function toLittleEndian(bigint, size) {
  let result = new Uint8Array(size);
  let i = 0;
  while (bigint > 0) {
    result[i] = Number(bigint % BigInt(256));
    bigint = bigint / BigInt(256);
    i += 1;
  }
  return result;
}

function desU64(data, offset = 0) {
  const dataView = new DataView(Uint8Array.from(data).buffer);
  let value1 = dataView.getUint32(offset, true);
  let value2 = dataView.getUint32(offset + 4, true);
  return (BigInt(value2) << BigInt(32)) | BigInt(value1);
}

function desU128(data, offset = 0) {
  const dataView = new DataView(Uint8Array.from(data).buffer);
  let value1 = dataView.getUint32(offset, true);
  let value2 = dataView.getUint32(offset + 4, true);
  let value3 = dataView.getUint32(offset + 8, true);
  let value4 = dataView.getUint32(offset + 12, true);
  return (BigInt(value4) << BigInt(96)) | (BigInt(value3) << BigInt(64)) | (BigInt(value2) << BigInt(32)) | BigInt(value1);
}

module.exports = {
  hexToBytes,
  toU64,
  toU128,
  textToBytes,
  desU64,
  desU128,
};
