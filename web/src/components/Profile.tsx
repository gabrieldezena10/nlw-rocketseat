import { getUser } from '../lib/auth'
import Image from 'next/image'
/*
eu quero acessar as minhas informações pelo token jwt quee foi criado pela assinatura da payload que eu enviei pelo backend
Neste caso foi enviado o nome, avatarUrl e sub(= id)
É preciso usar a biblioteca jwt-decode para entender esse toker e extrair as informações dele
*/

export function Profile() {
  const { name, avatarUrl } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      {/* o next/image não carrega imagens externas de qualquer endereço, deve-se configurar o next.config */}
      <Image
        src={avatarUrl}
        width={40}
        height={40}
        alt=""
        className="h-10 w-10 rounded-full"
      />

      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <a
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
        >
          Quero sair
        </a>
      </p>
    </div>
  )
}