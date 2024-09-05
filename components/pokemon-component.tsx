'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { generalizedAIPoweredPokemonQuery, streamAIAnalysis } from '@/server/actions/pokemon-ai'
import { DynamicTable, TableData } from './dynamic-table'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { readStreamableValue } from 'ai/rsc'

export function PokemonComponent() {
  const [inputValue, setInputValue] = useState('')
  const [outputData, setOutput] = useState<TableData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setAnalysis('')
    try {
      const result = await generalizedAIPoweredPokemonQuery(inputValue)
      setOutput(result)
      const { output } = await streamAIAnalysis(inputValue, result.query, result.rows)
      
      for await (const delta of readStreamableValue(output)) {
        setAnalysis(currentAnalysis => `${currentAnalysis}${delta}`)
      }
    } finally {
      setIsLoading(false)
      setInputValue('')
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 space-y-6 bg-gradient-to-br from-blue-100 to-red-100 rounded-lg shadow-lg h-full flex flex-col relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url("/pokeballbg.svg")',
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px',
        }}
      />
      
      <div className="relative z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 transform -skew-y-6 shadow-xl"></div>
        <div className="flex bg-white rounded-lg shadow-lg p-6 border-4 border-blue-500  max-height-[500px]">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-600 z-50">AI Pokédex</h2>
          <p className="text-gray-700 text-center animate-bounce">
            Gotta catch &apos;em all!
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div className="relative">
          <Input
            type="text"
            placeholder="Ask your Pokemon related question!"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border-2 border-yellow-400 rounded-full focus:outline-none focus:border-blue-500 transition-colors bg-white bg-opacity-75"
            disabled={isLoading}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
        </div>
        <Button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Thinking...
            </>
          ) : (
            'Ask!'
          )}
        </Button>
      </form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative h-[175px] bg-white bg-opacity-75 rounded-lg p-6 shadow-lg border-2 border-yellow-400 overflow-hidden z-10"
      >
        <div className="h-full overflow-auto">
          <h3 className="text-xl font-bold mb-4 text-blue-600">Analysis</h3>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-full"
              >
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </motion.div>
            ) : analysis ? (
              <motion.div
                key="analysis"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-800"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {analysis}
                </ReactMarkdown>
              </motion.div>
            ) : (
              <motion.p
                key="instruction"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-800 font-medium text-center"
              >
                Ask a question to see the analysis here!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden bg-white rounded-lg p-6 shadow-lg border-2 border-yellow-400"
      >

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-32"
            >
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </motion.div>
          ) : outputData ? (
            <motion.div
              key="table"
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <DynamicTable data={outputData} />
            </motion.div>
          ) : (
            <motion.p
              key="instruction"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative text-gray-800 font-medium text-center break-words"
            >
              Ask a question about a Pokémon! Be as in depth and technical as possible!
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}