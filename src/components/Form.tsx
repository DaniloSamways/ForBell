import React, { useState } from "react"

export default function Form() {
  const [data, setData] = useState({ phrase: '', question: '', loading: false })
  const [link, setLink] = useState('');

  const copyLink = () => {
    navigator.clipboard.writeText(link);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleChange = (name: string, value: any) => {
    setData({ ...data, [name]: value })
  }

  const handleButton = async () => {
    if (!data.phrase || !data.question || data.question.length < 7 || data.phrase.length < 7) return;

    handleChange('loading', true)
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: `{"phrase": "${data.phrase}", "question": "${data.question}"}`
    };

    await fetch('https://for-bell-api.vercel.app/', options)
      .then(response => response.json())
      .then(response => { setLink("https://with-love-for-bell.vercel.app/" + response.id); handleChange('loading', false) })
  }

  return (
    <div className="flex flex-col w-full min-h-screen items-center pt-14 gap-4">
      <h1 className="text-xl font-semibold">Crie sua mensagem</h1>
      {!link ? (
        <>
          <div className="flex flex-col gap-1">
            <label>Pergunta</label>
            <input
              placeholder="Namora comigo?..."
              className="placeholder:text-red-300 border-2 border-gray-300 rounded-md px-4 py-1 w-96 bg-inherit"
              type="text"
              value={data.question}
              name="question"
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label>Mensagem</label>
            <input
              placeholder="Eu te amo..."
              className="placeholder:text-red-300 border-2 border-gray-300 rounded-md px-4 py-1 w-96 bg-inherit"
              type="text"
              value={data.phrase}
              name="phrase"
              onChange={handleOnChange}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-1">
          <label>Link</label>
          <input
            className="placeholder:text-red-300 border-2 border-gray-300 rounded-md px-4 py-1 w-96 bg-inherit"
            type="text"
            disabled
            value={link}
          />
        </div>
      )}

      <button
        disabled={data.loading}
        onClick={!link ? handleButton : copyLink}
        className="bg-tertiary text-secondary font-bold px-6 py-2 rounded border-primary border-r-2 border-b-2 active:bg-secondary active:color-tertiary transition-colors duration-300 disabled:cursor-default disabled:backdrop-brightness-90"
      >
        {!link ? "Gerar Link" : "Copiar Link"}
      </button>
    </div>
  )
}