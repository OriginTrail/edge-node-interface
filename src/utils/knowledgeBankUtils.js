export const isNodeAnAsset = (node) => {
  return ["asset", "noImageAsset"].includes(node.type);
};
export const isNodeAUAlNode = (node) => {
  return node.type === "ualNode";
};

export const ualReg = /^(did:dkg:([a-z]+(:([0-9]*))?))\/([0-9a-zA-Z]+)\/(\d+)$/;
export const isUal = (value) => {
  if (typeof value !== "string") {
    return false;
  }

  return ualReg.test(value);
};
export const cleanUal = (ual) => {
  if (!ual) return "";
  let cleanedUal = ual.trim().toLowerCase();

  if (cleanedUal.endsWith("/")) {
    cleanedUal = cleanedUal.slice(0, -1);
  }

  return cleanedUal;
};

export const getTokenId = (value) => {
  if (!isUal(value)) {
    return null;
  }

  return `${value.match(ualReg)[2]}:${value.match(ualReg)[6]}`;
};

export const isBlankNode = (val) =>
  typeof val === "string" && val.startsWith("_:c");

export const getAddressShortForm = (address, leftHand = 4, righthand = 4) => {
  if (!address) return "";
  const addrRegEx = new RegExp(
    `^([\\s\\S]{${leftHand ?? 8}})([\\s\\S]*?)([\\s\\S]{${righthand ?? 4}})$`,
    "i",
  );
  const value = address?.match(addrRegEx);
  return value[1] + "..." + value[3];
};

export const shortenUal = (ual, { leftHand, rightHand } = {}) => {
  if (!ual) {
    return ual;
  }

  return getAddressShortForm(ual, leftHand ?? 6, rightHand ?? 9);
};

export const getUalBitsFromUAl = (ual) => {
  if (!ual) return null;
  //did:dkg:otp/0x1a061136ed9f5ed69395f18961a0a535ef4b3e5f/316149
  const matches = ual?.match(ualReg);
  if (matches) {
    return {
      network: matches[1],
      contract: matches[5],
      tokenId: matches[6],
      provenance: `${matches[2]}:${matches[6]}`,
    };
  }
  return null;
};
