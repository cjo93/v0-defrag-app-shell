export function isQAFromHeaders(headers: Headers): boolean {
  try {
    const h = headers.get('x-defrag-qa')
    if (h === '1') return true
    const cookie = headers.get('cookie')
    if (cookie && cookie.includes('defrag_qa=1')) return true
    if (process.env.ENABLE_QA_MODE === '1') return true
  } catch (e) {
    // noop
  }
  return false
}

