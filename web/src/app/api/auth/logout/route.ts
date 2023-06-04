import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  //request.url contém a url da minha aplicação
  const redirectURL = new URL('/', request.url)


  // quero salvar o token nos cookies
  // o Path neste caso implica que o cookie vai estar disponível em toda a aplicação
  return NextResponse.redirect(redirectURL, {
    //Formato para remover os cookies
    headers: {
      'Set-Cookie': `token=; Path=/; max-age=0;`
    }
  })
}