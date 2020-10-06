const base = {
  baseURL: 'http://39.105.91.30:6669',
  baseUrl:'/api',
  proxyUrl: '/api',
  Login: '/law/userAuth/userLogin',
  Queryfile: '/law/file/select',
  appselect:'/law/appendixtype/select',
  Sensitives:'/law/sensitivewords/select',
  DelSensitives:'/law/sensitivewords/delete',
  FileSelect:'/law/file/select',
  DeleFile:'/law/file/delete',
  DelAppendix:'/law/appendix/delete',
  AddFile:'/law/file/add',
  AddAppendix:'/law/appendixtype/add',
  AddSensitive:'/law/sensitivewords/add'
  // '/law/file/select?page={0}&pageSize={1}&word={2}&type={3}&state={4}'
}

export default base
