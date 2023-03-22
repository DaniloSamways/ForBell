import { useState } from "react"

export default function Form() {
  const [phrase, setPhrase] = useState('');
  const [link, setLink] = useState('');

  const copyLink = () => {
    navigator.clipboard.writeText(link);
  }

  const handleButton = async () => {
    if (!phrase || phrase.length < 7) return;

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: `{"phrase": "${phrase}"}`
    };

    await fetch('http://localhost:3333/', options)
      .then(response => response.json())
      .then(response => setLink("http://localhost:3000/" + response.id))
  }

  return (
    <div className="flex flex-col w-full min-h-screen items-center pt-14 gap-4">
      <h1 className="text-xl font-semibold">Crie sua mensagem</h1>
      <input
        placeholder="Digite sua mensagem aqui"
        className="placeholder:text-gray-300 border-2 border-gray-300 rounded-md px-4 py-1 w-96 bg-inherit"
        type="text"
        value={!link ? phrase : link}

        disabled={link !== ''}
        onChange={(e) => setPhrase(e.target.value)}
      />
      <button
        onClick={!link ? handleButton : copyLink}
        className="bg-tertiary text-secondary font-bold px-6 py-2 rounded border-primary border-r-2 border-b-2 active:bg-secondary active:color-tertiary transition-colors duration-300"
      >
        {!link ? "Gerar Link" : "Copiar Link"}
      </button>
    </div>
  )
}