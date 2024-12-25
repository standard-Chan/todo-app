// hash 함수 : 현재 날짜와 업무 내용으로 키 생성
const generateUniqueKey = async (date, str) => {
  const input = `${date}-${str}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};

export default generateUniqueKey;