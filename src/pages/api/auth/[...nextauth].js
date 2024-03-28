import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // 인증 로직을 구현합니다.
        const { username, password } = credentials
        console.log(credentials)        
        // 예를 들어, 사용자를 데이터베이스에서 찾아 비밀번호를 비교하는 등의 로직을 수행합니다.
        // const user = { id: 1, name: 'John Doe', email: 'john@example.com' }
        if (username === 'jwk' && password === 'jwk') {
          return Promise.resolve(true)
        } else {
          return Promise.resolve(null)
        }
      }
    })
  ],
  session:{
    maxAge:60,
  }
})