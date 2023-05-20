import { api } from "@component/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
 // http://localhost:3000/api/auth/callback?code=1064deae593f22476fa5
 // o searchParams representa o que vem depois do path callback, no caso vai existir apeans o code
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  // const redirectTo = request.cookies.get('redirectTo')?.value

  const registerResponse = await api.post('/register', {
    code,
  })
  //request.url contém a url da minha aplicação
  const redirectURL = new URL('/', request.url)

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30

  const { token } = registerResponse.data

  // console.log(token)

  // quero salvar o token nos cookies
  // o Path neste caso implica que o cookie vai estar disponível em toda a aplicação
  return NextResponse.redirect(redirectURL, {
    headers: {
     'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`
    }
  })
}