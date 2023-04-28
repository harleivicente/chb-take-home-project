const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const partitionKey = event?.partitionKey;

  // no Input
  if (!event) return TRIVIAL_PARTITION_KEY;

  // partition Key
  if (partitionKey) return normalizePartitionKey(partitionKey);

  // no partition key
  const hash = crypto.createHash("sha3-512");
  const eventAsString = JSON.stringify(event);
  return hash.update(eventAsString).digest("hex");

};


const normalizePartitionKey = (key) => {
  const MAX_PARTITION_KEY_LENGTH = 256;
  let normalizedKey = key;

  if (typeof normalizedKey !== "string") {
    normalizedKey = JSON.stringify(key);
  }

  if (normalizedKey.length > MAX_PARTITION_KEY_LENGTH) {
    normalizedKey = crypto.createHash("sha3-512").update(normalizedKey).digest("hex");
  }

  return normalizedKey;
}